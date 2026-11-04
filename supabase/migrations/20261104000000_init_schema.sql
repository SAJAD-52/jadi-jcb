-- ====================================================================
-- JADIJCB: Automated Cloud Database Schema & Migrations
-- Moroccan Heavy Construction Equipment & Spare Parts Marketplace
-- Target: Supabase (PostgreSQL with Row Level Security RLS)
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUMS
CREATE TYPE user_role AS ENUM ('owner', 'client', 'admin');
CREATE TYPE subscription_status_type AS ENUM ('trial', 'active', 'expired', 'locked');
CREATE TYPE machine_listing_type AS ENUM ('rent', 'sale', 'both');
CREATE TYPE machine_condition_type AS ENUM ('new', 'excellent', 'good', 'fair');
CREATE TYPE booking_status_type AS ENUM ('pending', 'active', 'completed', 'cancelled');
CREATE TYPE machine_category_type AS ENUM (
  'backhoe_loader',      -- جرافة حفارة (JCB 3CX/4CX)
  'crawler_excavator',   -- حفارة مجنزرة (Pelle sur chenilles)
  'wheel_loader',        -- شاحنة تعبئة (Chargeuse sur pneus)
  'bulldozer',           -- جرافة تمهيد (Bouteur)
  'motor_grader',        -- ممهدة طرق (Niveleuse)
  'dump_truck',          -- شاحنة قلابة (Camion Benne)
  'telescopic_handler',  -- رافعة تلسكوبية (Télescopique)
  'spare_parts'          -- قطع غيار هيدروليكية ومحركات
);

-- 3. PROFILES / FLEET OWNERS TABLE (Auth via Phone / WhatsApp)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  phone_number VARCHAR(25) NOT NULL UNIQUE, -- Moroccan Phone (+212 6... / +212 7...)
  full_name VARCHAR(120) NOT NULL,
  company_name VARCHAR(150),
  ice_number VARCHAR(20), -- Moroccan Identifiant Commun de l'Entreprise (ICE)
  rc_number VARCHAR(30),  -- Registre de Commerce
  city VARCHAR(60) NOT NULL DEFAULT 'Casablanca',
  role user_role NOT NULL DEFAULT 'owner',
  subscription_status subscription_status_type NOT NULL DEFAULT 'trial',
  trial_ends_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '72 hours'),
  is_verified BOOLEAN NOT NULL DEFAULT false,
  avatar_url TEXT,
  whatsapp_direct VARCHAR(25),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for phone lookups and trial verification
CREATE INDEX IF NOT EXISTS idx_profiles_phone ON public.profiles(phone_number);
CREATE INDEX IF NOT EXISTS idx_profiles_trial ON public.profiles(trial_ends_at, subscription_status);

-- 4. MACHINES & SPARE PARTS TABLE (Dual-mode: Rent & Sale)
CREATE TABLE IF NOT EXISTS public.machines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title_ar VARCHAR(200) NOT NULL,
  title_fr VARCHAR(200) NOT NULL,
  category machine_category_type NOT NULL,
  brand VARCHAR(60) NOT NULL, -- JCB, Caterpillar, Komatsu, Volvo, Liebherr, etc.
  model VARCHAR(60) NOT NULL,
  year_of_manufacture INT NOT NULL,
  hours_operated INT DEFAULT 0,
  listing_type machine_listing_type NOT NULL DEFAULT 'both',
  condition machine_condition_type NOT NULL DEFAULT 'excellent',
  
  -- Rental pricing (MAD / الدرهم المغربي)
  hourly_rate_mad NUMERIC(10, 2),
  daily_rate_mad NUMERIC(10, 2),
  monthly_rate_mad NUMERIC(10, 2),
  with_operator BOOLEAN NOT NULL DEFAULT true, -- هل الآلة مع السائق (Chauffeur inclus)
  fuel_included BOOLEAN NOT NULL DEFAULT false, -- المحروقات على المكتري
  
  -- Sale pricing (MAD)
  sale_price_mad NUMERIC(12, 2),
  is_negotiable BOOLEAN NOT NULL DEFAULT true,
  
  -- Location in Morocco
  city VARCHAR(60) NOT NULL, -- الدار البيضاء، طنجة، مراكش، أكادير، فاس، etc.
  region VARCHAR(80) NOT NULL,
  latitude DOUBLE PRECISION DEFAULT 33.5731,
  longitude DOUBLE PRECISION DEFAULT -7.5898,
  exact_site_address TEXT,
  
  -- Media & Specs
  images TEXT[] NOT NULL DEFAULT '{}',
  description_ar TEXT,
  description_fr TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  view_count INT NOT NULL DEFAULT 0,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_machines_category ON public.machines(category);
CREATE INDEX IF NOT EXISTS idx_machines_city ON public.machines(city);
CREATE INDEX IF NOT EXISTS idx_machines_listing_type ON public.machines(listing_type);
CREATE INDEX IF NOT EXISTS idx_machines_owner ON public.machines(owner_id);

-- 5. BOOKINGS / RENTAL CONTRACTS (Active rentals with live countdown timers)
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  machine_id UUID NOT NULL REFERENCES public.machines(id) ON DELETE RESTRICT,
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  project_site_city VARCHAR(60) NOT NULL,
  project_site_details TEXT,
  
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  
  rental_rate_type VARCHAR(20) NOT NULL DEFAULT 'daily', -- 'hourly', 'daily', 'monthly'
  unit_rate_mad NUMERIC(10, 2) NOT NULL,
  total_units NUMERIC(8, 2) NOT NULL,
  total_amount_mad NUMERIC(12, 2) NOT NULL,
  deposit_mad NUMERIC(10, 2) DEFAULT 0,
  
  status booking_status_type NOT NULL DEFAULT 'pending',
  contract_pdf_url TEXT,
  notes TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_machine ON public.bookings(machine_id);
CREATE INDEX IF NOT EXISTS idx_bookings_timer ON public.bookings(start_time, end_time, status);

-- 6. REAL-TIME INTERNAL CONVERSATIONS & MESSAGES
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  machine_id UUID REFERENCES public.machines(id) ON DELETE SET NULL,
  participant_one UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  participant_two UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  last_message_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_conv_participants 
  ON public.conversations(LEAST(participant_one, participant_two), GREATEST(participant_one, participant_two), machine_id);

CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation ON public.messages(conversation_id, created_at);

-- 7. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.machines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Profiles: Public read for marketplace sellers; write only by account owner
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE USING (auth.uid() = auth_user_id);

-- Machines: Public read for marketplace buyers; write only by machine owner
CREATE POLICY "Public machines are viewable by everyone" 
  ON public.machines FOR SELECT USING (true);

CREATE POLICY "Owners can insert their machines" 
  ON public.machines FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = owner_id AND (auth_user_id = auth.uid() OR auth_user_id IS NULL))
  );

CREATE POLICY "Owners can update their machines" 
  ON public.machines FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = owner_id AND (auth_user_id = auth.uid() OR auth_user_id IS NULL))
  );

CREATE POLICY "Owners can delete their machines" 
  ON public.machines FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = owner_id AND (auth_user_id = auth.uid() OR auth_user_id IS NULL))
  );

-- Bookings: Viewable and modifiable only by participants (owner or client)
CREATE POLICY "Users can view their own bookings" 
  ON public.bookings FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE (id = owner_id OR id = client_id) 
      AND (auth_user_id = auth.uid() OR auth_user_id IS NULL)
    )
  );

CREATE POLICY "Clients can create bookings" 
  ON public.bookings FOR INSERT WITH CHECK (true);

CREATE POLICY "Participants can update booking status" 
  ON public.bookings FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE (id = owner_id OR id = client_id) 
      AND (auth_user_id = auth.uid() OR auth_user_id IS NULL)
    )
  );

-- Conversations & Messages: Viewable only by participants
CREATE POLICY "Participants can view their conversations" 
  ON public.conversations FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE (id = participant_one OR id = participant_two) 
      AND (auth_user_id = auth.uid() OR auth_user_id IS NULL)
    )
  );

CREATE POLICY "Participants can view messages" 
  ON public.messages FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.conversations c
      JOIN public.profiles p ON (p.id = c.participant_one OR p.id = c.participant_two)
      WHERE c.id = messages.conversation_id 
      AND (p.auth_user_id = auth.uid() OR p.auth_user_id IS NULL)
    )
  );

CREATE POLICY "Participants can insert messages" 
  ON public.messages FOR INSERT WITH CHECK (true);

-- 8. TRIGGERS: Automatic updated_at timestamp update
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_modtime
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();

CREATE TRIGGER update_machines_modtime
  BEFORE UPDATE ON public.machines
  FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();

CREATE TRIGGER update_bookings_modtime
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();

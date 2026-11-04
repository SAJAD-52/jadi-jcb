export type UserRole = 'owner' | 'client' | 'admin';

export type SubscriptionStatus = 'trial' | 'active' | 'expired' | 'locked';

export type MachineListingType = 'rent' | 'sale' | 'both';

export type MachineCondition = 'new' | 'excellent' | 'good' | 'fair';

export type BookingStatus = 'pending' | 'active' | 'completed' | 'cancelled';

export type MachineCategory =
  | 'backhoe_loader'      // جرافة حفارة (JCB 3CX/4CX)
  | 'crawler_excavator'   // حفارة مجنزرة (Pelle sur chenilles)
  | 'wheel_loader'        // شاحنة تعبئة (Chargeuse)
  | 'bulldozer'           // جرافة تمهيد (Bouteur)
  | 'motor_grader'        // ممهدة طرق (Niveleuse)
  | 'dump_truck'          // شاحنة قلابة (Camion Benne)
  | 'telescopic_handler'  // رافعة تلسكوبية (Télescopique)
  | 'spare_parts';        // قطع غيار هيدروليكية ومحركات

export interface Profile {
  id: string;
  phoneNumber: string; // WhatsApp / Phone (e.g. +212 661-123456)
  fullName: string;
  companyName?: string;
  iceNumber?: string; // Identifiant Commun de l'Entreprise
  rcNumber?: string;
  city: string;
  role: UserRole;
  subscriptionStatus: SubscriptionStatus;
  trialEndsAt: string; // ISO string
  isVerified: boolean;
  avatarUrl?: string;
  whatsappDirect?: string;
  createdAt: string;
}

export interface Machine {
  id: string;
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  ownerCompany?: string;
  titleAr: string;
  titleFr: string;
  category: MachineCategory;
  brand: string;
  model: string;
  yearOfManufacture: number;
  hoursOperated: number;
  listingType: MachineListingType;
  condition: MachineCondition;
  
  // Rental Rates in Moroccan Dirhams (MAD)
  hourlyRateMad?: number;
  dailyRateMad?: number;
  monthlyRateMad?: number;
  withOperator: boolean;
  fuelIncluded: boolean;
  
  // Sale Price in MAD
  salePriceMad?: number;
  isNegotiable: boolean;
  
  // Location
  city: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  exactAddress?: string;
  
  // Media & Specs
  images: string[];
  descriptionAr: string;
  descriptionFr: string;
  specs: {
    enginePowerHp?: number;
    operatingWeightKg?: number;
    bucketCapacityM3?: number;
    diggingDepthM?: number;
  };
  isAvailable: boolean;
  viewCount: number;
  createdAt: string;
}

export interface Booking {
  id: string;
  machineId: string;
  machineTitle: string;
  ownerId: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  projectCity: string;
  projectSiteDetails: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string (for live countdown)
  rentalRateType: 'hourly' | 'daily' | 'monthly';
  unitRateMad: number;
  totalUnits: number;
  totalAmountMad: number;
  depositMad: number;
  status: BookingStatus;
  notes?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  machineId?: string;
  machineTitle?: string;
  participantOneId: string;
  participantTwoId: string;
  participantOneName: string;
  participantTwoName: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface MoroccanCityInfo {
  id: string;
  nameAr: string;
  nameFr: string;
  regionAr: string;
  regionFr: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  machineCount: number;
}

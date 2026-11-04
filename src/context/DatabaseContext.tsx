import React, { createContext, useContext, useState, useEffect } from 'react';
import { Machine, Booking, Conversation, Message, MoroccanCityInfo, MachineCategory, MachineListingType } from '../types/database.types';

export const MOROCCAN_CITIES: MoroccanCityInfo[] = [
  { id: 'casablanca', nameAr: 'الدار البيضاء', nameFr: 'Casablanca', regionAr: 'الدار البيضاء - سطات', regionFr: 'Casablanca-Settat', coordinates: { lat: 33.5731, lng: -7.5898 }, machineCount: 142 },
  { id: 'tanger', nameAr: 'طنجة', nameFr: 'Tanger', regionAr: 'طنجة - تطوان - الحسيمة', regionFr: 'Tanger-Tétouan-Al Hoceïma', coordinates: { lat: 35.7595, lng: -5.8340 }, machineCount: 88 },
  { id: 'marrakech', nameAr: 'مراكش', nameFr: 'Marrakech', regionAr: 'مراكش - آسفي', regionFr: 'Marrakech-Safi', coordinates: { lat: 31.6295, lng: -7.9811 }, machineCount: 64 },
  { id: 'rabat', nameAr: 'الرباط', nameFr: 'Rabat', regionAr: 'الرباط - سلا - القنيطرة', regionFr: 'Rabat-Salé-Kénitra', coordinates: { lat: 34.0209, lng: -6.8416 }, machineCount: 57 },
  { id: 'agadir', nameAr: 'أكادير', nameFr: 'Agadir', regionAr: 'سوس - ماسة', regionFr: 'Souss-Massa', coordinates: { lat: 30.4278, lng: -9.5981 }, machineCount: 46 },
  { id: 'fes', nameAr: 'فاس', nameFr: 'Fès', regionAr: 'فاس - مكناس', regionFr: 'Fès-Meknès', coordinates: { lat: 34.0181, lng: -5.0078 }, machineCount: 39 },
  { id: 'oujda', nameAr: 'وجدة', nameFr: 'Oujda', regionAr: 'الشرق', regionFr: 'L\'Oriental', coordinates: { lat: 34.6867, lng: -1.9114 }, machineCount: 28 },
  { id: 'laayoune', nameAr: 'العيون', nameFr: 'Laâyoune', regionAr: 'العيون - الساقية الحمراء', regionFr: 'Laâyoune-Sakia El Hamra', coordinates: { lat: 27.1536, lng: -13.2033 }, machineCount: 22 },
];

const INITIAL_MACHINES: Machine[] = [
  {
    id: 'mach-001',
    ownerId: 'usr-owner-001',
    ownerName: 'الحاج بوشعيب الزاكي',
    ownerPhone: '+212 661-482910',
    ownerCompany: 'أشغال الأطلس BTP',
    titleAr: 'جرافة وحفارة JCB 3CX Eco Turbo بحالة ممتازة',
    titleFr: 'Tractopelle JCB 3CX Eco Turbo en excellent état',
    category: 'backhoe_loader',
    brand: 'JCB',
    model: '3CX Eco Turbo',
    yearOfManufacture: 2022,
    hoursOperated: 2450,
    listingType: 'both',
    condition: 'excellent',
    hourlyRateMad: 250,
    dailyRateMad: 1900,
    monthlyRateMad: 38000,
    withOperator: true,
    fuelIncluded: false,
    salePriceMad: 620000,
    isNegotiable: true,
    city: 'الدار البيضاء',
    region: 'Casablanca-Settat',
    coordinates: { lat: 33.5731, lng: -7.5898 },
    exactAddress: 'المنطقة الصناعية سيدي البرنوصي، الدار البيضاء',
    images: ['jcb_3cx'],
    descriptionAr: 'آلة JCB 3CX أصلية مجهزة بنظام EcoDig موفر للوقود، كابينة مكيفة، نظام هيدروليكي ممتاز مع شوكة تحميل ودلو 4 في 1. متوفرة مع سائق محترف ذو خبرة 12 سنة.',
    descriptionFr: 'Machine JCB 3CX originale équipée du système EcoDig économique, cabine climatisée, godet 4 en 1 et fourches. Disponible immédiatement avec chauffeur expérimenté.',
    specs: {
      enginePowerHp: 92,
      operatingWeightKg: 8135,
      bucketCapacityM3: 1.0,
      diggingDepthM: 4.24,
    },
    isAvailable: true,
    viewCount: 312,
    createdAt: '2026-10-15T10:00:00Z',
  },
  {
    id: 'mach-002',
    ownerId: 'usr-owner-002',
    ownerName: 'شركة البوغاز للأشغال الكبرى',
    ownerPhone: '+212 662-778899',
    ownerCompany: 'BOUGHAZ TRAVAUX TANGER',
    titleAr: 'حفارة مجنزرة هيدروليكية كوماتسو Komatsu PC210-10M0',
    titleFr: 'Pelle sur chenilles Komatsu PC210-10M0 22 Tonnes',
    category: 'crawler_excavator',
    brand: 'Komatsu',
    model: 'PC210-10M0',
    yearOfManufacture: 2023,
    hoursOperated: 1800,
    listingType: 'rent',
    condition: 'new',
    hourlyRateMad: 450,
    dailyRateMad: 3500,
    monthlyRateMad: 72000,
    withOperator: true,
    fuelIncluded: false,
    salePriceMad: 1250000,
    isNegotiable: false,
    city: 'طنجة',
    region: 'Tanger-Tétouan-Al Hoceïma',
    coordinates: { lat: 35.7595, lng: -5.8340 },
    exactAddress: 'قرب ميناء طنجة المتوسط، المنطقة الحرة',
    images: ['komatsu_pc210'],
    descriptionAr: 'حفارة 22 طن جاهزة لأشغال الحفر الصخري، تسوية الأراضي ومشاريع البنية التحتية. محرك اقتصادي، قوة هيدروليكية عالية، مع صيانة دورية لدى الوكيل المعتمد.',
    descriptionFr: 'Pelle hydraulique de 22 tonnes idéale pour terrassements lourds, carrières et grands chantiers du Nord. Entretien exclusif chez concessionnaire officiel.',
    specs: {
      enginePowerHp: 165,
      operatingWeightKg: 22000,
      bucketCapacityM3: 1.2,
      diggingDepthM: 6.6,
    },
    isAvailable: false, // Currently in active rental!
    viewCount: 489,
    createdAt: '2026-10-18T14:30:00Z',
  },
  {
    id: 'mach-003',
    ownerId: 'usr-owner-001',
    ownerName: 'الحاج بوشعيب الزاكي',
    ownerPhone: '+212 661-482910',
    ownerCompany: 'أشغال الأطلس BTP',
    titleAr: 'شاحنة تعبئة جرافة كاتر بيلار Caterpillar 966H',
    titleFr: 'Chargeuse sur pneus Caterpillar 966H',
    category: 'wheel_loader',
    brand: 'Caterpillar',
    model: '966H',
    yearOfManufacture: 2020,
    hoursOperated: 4600,
    listingType: 'sale',
    condition: 'good',
    salePriceMad: 880000,
    withOperator: false,
    fuelIncluded: false,
    isNegotiable: true,
    city: 'مراكش',
    region: 'Marrakech-Safi',
    coordinates: { lat: 31.6295, lng: -7.9811 },
    exactAddress: 'طريق أوريكا، كلم 8، مراكش',
    images: ['cat_966h'],
    descriptionAr: 'شارشور كاتربيلار 966H للبيع المباشر من المالك الأول بالمغرب، بدون وسيط. إطارات جديدة بنسبة 85%، مضخة هيدروليكية مفحوصة، جاهزة للعمل الفوري بالمقالع والورش.',
    descriptionFr: 'Chargeuse CAT 966H en vente directe premier propriétaire. Pneus neufs à 85%, circuit hydraulique impeccable, prête pour exploitation immédiate.',
    specs: {
      enginePowerHp: 262,
      operatingWeightKg: 23700,
      bucketCapacityM3: 4.2,
    },
    isAvailable: true,
    viewCount: 520,
    createdAt: '2026-10-22T09:15:00Z',
  },
  {
    id: 'mach-004',
    ownerId: 'usr-owner-003',
    ownerName: 'شركة النخيل للآليات الثقيلة',
    ownerPhone: '+212 663-112233',
    ownerCompany: 'STE NAKHIL ENGINS',
    titleAr: 'رافعة تلسكوبية JCB 540-170 Loadall بارتفاع 17 متر',
    titleFr: 'Chariot Télescopique JCB 540-170 Loadall 17m',
    category: 'telescopic_handler',
    brand: 'JCB',
    model: '540-170',
    yearOfManufacture: 2021,
    hoursOperated: 2100,
    listingType: 'both',
    condition: 'excellent',
    hourlyRateMad: 320,
    dailyRateMad: 2400,
    monthlyRateMad: 45000,
    withOperator: true,
    fuelIncluded: false,
    salePriceMad: 750000,
    isNegotiable: true,
    city: 'الرباط',
    region: 'Rabat-Salé-Kénitra',
    coordinates: { lat: 34.0209, lng: -6.8416 },
    exactAddress: 'حي الرياض - القطب التكنولوجي، الرباط',
    images: ['jcb_telescopic'],
    descriptionAr: 'رافعة تلسكوبية JCB تصل لارتفاع 17 متراً بحمولة 4 أطنان. مثالية لورش البنايات العالية، تركيب الهياكل المعدنية وأعمال الواجهات. شهادة المطابقة التقنية مجددة.',
    descriptionFr: 'Télescopique 17m avec capacité de levage 4 tonnes. Idéal pour charpente métallique et levage de matériaux en hauteur. Certificat technique à jour.',
    specs: {
      enginePowerHp: 100,
      operatingWeightKg: 12160,
    },
    isAvailable: false, // Active rental
    viewCount: 290,
    createdAt: '2026-10-25T11:45:00Z',
  },
  {
    id: 'mach-005',
    ownerId: 'usr-owner-001',
    ownerName: 'الحاج بوشعيب الزاكي',
    ownerPhone: '+212 661-482910',
    ownerCompany: 'أشغال الأطلس BTP',
    titleAr: 'مضخة هيدروليكية أصلية JCB Main Hydraulic Pump 3CX/4CX',
    titleFr: 'Pompe Hydraulique Principale Originale JCB 3CX/4CX',
    category: 'spare_parts',
    brand: 'JCB Original Parts',
    model: 'Parker/JCB Dual Gear Pump',
    yearOfManufacture: 2025,
    hoursOperated: 0,
    listingType: 'sale',
    condition: 'new',
    salePriceMad: 18500,
    withOperator: false,
    fuelIncluded: false,
    isNegotiable: false,
    city: 'الدار البيضاء',
    region: 'Casablanca-Settat',
    coordinates: { lat: 33.5731, lng: -7.5898 },
    exactAddress: 'مستودع قطع الغيار - كازا عين السبع',
    images: ['jcb_pump_part'],
    descriptionAr: 'مضخة هيدروليكية أصلية جديدة بالكرتونة مستوردة من بريطانيا لآليات JCB 3CX و4CX. كفالة 12 شهر مع الفاتورة وشهادة المنشأ.',
    descriptionFr: 'Pompe hydraulique d\'origine neuve dans son emballage pour JCB 3CX et 4CX. Garantie 12 mois avec facture et certificat d\'origine.',
    specs: {},
    isAvailable: true,
    viewCount: 680,
    createdAt: '2026-10-30T16:00:00Z',
  },
  {
    id: 'mach-006',
    ownerId: 'usr-owner-004',
    ownerName: 'مقاولة سوس للأشغال',
    ownerPhone: '+212 664-556677',
    ownerCompany: 'SOUSS TRAVAUX AGADIR',
    titleAr: 'شاحنة قلابة مرسيدس Mercedes Arocs 3342 6x4',
    titleFr: 'Camion Benne Chantier Mercedes Arocs 3342 6x4',
    category: 'dump_truck',
    brand: 'Mercedes-Benz',
    model: 'Arocs 3342',
    yearOfManufacture: 2021,
    hoursOperated: 95000,
    listingType: 'both',
    condition: 'excellent',
    dailyRateMad: 1600,
    monthlyRateMad: 32000,
    withOperator: true,
    fuelIncluded: false,
    salePriceMad: 790000,
    isNegotiable: true,
    city: 'أكادير',
    region: 'Souss-Massa',
    coordinates: { lat: 30.4278, lng: -9.5981 },
    exactAddress: 'تيكيوين - المنطقة الصناعية، أكادير',
    images: ['mercedes_arocs'],
    descriptionAr: 'شاحنة قلابة متينة مخصصة لنقل الأتربة والحصى ومواد المقالع. صندوق سعة 16 متر مكعب، كابينة مريحة، صيانة دورية بمحطة أوتوكار أكادير.',
    descriptionFr: 'Camion benne robuste de 16m3 pour terrassement et transport de gravats. Entretien régulier chez concessionnaire.',
    specs: {
      enginePowerHp: 420,
      operatingWeightKg: 33000,
    },
    isAvailable: true,
    viewCount: 410,
    createdAt: '2026-11-01T08:20:00Z',
  },
];

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bkg-001',
    machineId: 'mach-002',
    machineTitle: 'حفارة كوماتسو Komatsu PC210-10M0',
    ownerId: 'usr-owner-002',
    clientId: 'usr-owner-001',
    clientName: 'شركة أشغال البوغاز',
    clientPhone: '+212 661-482910',
    projectCity: 'طنجة',
    projectSiteDetails: 'مشروع توسعة منطقة طنجة أوتوموتيف سيتي (TAC)',
    startTime: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
    // Active contract ending in 46 hours (countdown timer)
    endTime: new Date(Date.now() + 46 * 3600 * 1000).toISOString(),
    rentalRateType: 'daily',
    unitRateMad: 3500,
    totalUnits: 7,
    totalAmountMad: 24500,
    depositMad: 5000,
    status: 'active',
    notes: 'الآلة مع السائق والمبيت في الورش مؤمن بالكامل.',
    createdAt: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 'bkg-002',
    machineId: 'mach-004',
    machineTitle: 'رافعة تلسكوبية JCB 540-170 Loadall',
    ownerId: 'usr-owner-003',
    clientId: 'usr-client-002',
    clientName: 'مقاولة كازا إنجينيرينغ',
    clientPhone: '+212 662-991100',
    projectCity: 'الرباط',
    projectSiteDetails: 'ورش بناء فندق برج أبي رقراق، الرباط',
    startTime: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString(),
    // Active contract ending in 18 hours (countdown timer)
    endTime: new Date(Date.now() + 18 * 3600 * 1000).toISOString(),
    rentalRateType: 'daily',
    unitRateMad: 2400,
    totalUnits: 12,
    totalAmountMad: 28800,
    depositMad: 6000,
    status: 'active',
    notes: 'تركيب واجهات زجاجية بالرافعة مع سائق معتمد.',
    createdAt: new Date(Date.now() - 11 * 24 * 3600 * 1000).toISOString(),
  },
];

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-001',
    machineId: 'mach-001',
    machineTitle: 'JCB 3CX Eco Turbo',
    participantOneId: 'usr-owner-001',
    participantTwoId: 'usr-client-002',
    participantOneName: 'الحاج بوشعيب الزاكي',
    participantTwoName: 'المهندس ياسين تومي',
    lastMessage: 'تمام، سنقوم بتحويل الدفعة المقدمة عبر التجاري وفا بنك اليوم.',
    lastMessageAt: 'منذ 15 دقيقة',
    unreadCount: 1,
  },
  {
    id: 'conv-002',
    machineId: 'mach-005',
    machineTitle: 'مضخة هيدروليكية JCB Original',
    participantOneId: 'usr-owner-001',
    participantTwoId: 'usr-owner-004',
    participantOneName: 'الحاج بوشعيب الزاكي',
    participantTwoName: 'مقاولة سوس للأشغال',
    lastMessage: 'هل تتوفر لديكم فلاتر المحرك الأصلية أيضاً مع المضخة؟',
    lastMessageAt: 'منذ ساعتين',
    unreadCount: 0,
  },
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg-001',
    conversationId: 'conv-001',
    senderId: 'usr-client-002',
    senderName: 'المهندس ياسين تومي',
    content: 'السلام عليكم سي بوشعيب، نحتاج الـ JCB 3CX لمدة 15 يوماً في ورش البناء بالدار البيضاء سيدي معروف.',
    createdAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
    isRead: true,
  },
  {
    id: 'msg-002',
    conversationId: 'conv-001',
    senderId: 'usr-owner-001',
    senderName: 'الحاج بوشعيب الزاكي',
    content: 'وعليكم السلام ورحمة الله، مرحباً بك أخي. الآلة جاهزة مع السائق سي عبد اللطيف. السعر 1900 درهم باليوم بدون محروقات.',
    createdAt: new Date(Date.now() - 3600 * 1000 * 1.5).toISOString(),
    isRead: true,
  },
  {
    id: 'msg-003',
    conversationId: 'conv-001',
    senderId: 'usr-client-002',
    senderName: 'المهندس ياسين تومي',
    content: 'تمام، سنقوم بتحويل الدفعة المقدمة عبر التجاري وفا بنك اليوم.',
    createdAt: new Date(Date.now() - 3600 * 1000 * 0.25).toISOString(),
    isRead: false,
  },
];

interface DatabaseContextType {
  machines: Machine[];
  bookings: Booking[];
  conversations: Conversation[];
  messages: Message[];
  addMachine: (machine: Omit<Machine, 'id' | 'viewCount' | 'createdAt'>) => void;
  updateMachine: (id: string, updates: Partial<Machine>) => void;
  deleteMachine: (id: string) => void;
  createBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  sendMessage: (conversationId: string, content: string, senderId: string, senderName: string) => void;
  getConversationMessages: (conversationId: string) => Message[];
  startConversation: (machineId: string, machineTitle: string, targetOwnerId: string, targetOwnerName: string, myId: string, myName: string, initialText: string) => string;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [machines, setMachines] = useState<Machine[]>(() => {
    const saved = localStorage.getItem('jadijcb_machines');
    return saved ? JSON.parse(saved) : INITIAL_MACHINES;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('jadijcb_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('jadijcb_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('jadijcb_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  useEffect(() => {
    localStorage.setItem('jadijcb_machines', JSON.stringify(machines));
  }, [machines]);

  useEffect(() => {
    localStorage.setItem('jadijcb_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('jadijcb_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('jadijcb_messages', JSON.stringify(messages));
  }, [messages]);

  const addMachine = (newMach: Omit<Machine, 'id' | 'viewCount' | 'createdAt'>) => {
    const machineWithMeta: Machine = {
      ...newMach,
      id: `mach-${Date.now()}`,
      viewCount: 1,
      createdAt: new Date().toISOString(),
    };
    setMachines((prev) => [machineWithMeta, ...prev]);
  };

  const updateMachine = (id: string, updates: Partial<Machine>) => {
    setMachines((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  };

  const deleteMachine = (id: string) => {
    setMachines((prev) => prev.filter((m) => m.id !== id));
  };

  const createBooking = (data: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: Booking = {
      ...data,
      id: `bkg-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [newBooking, ...prev]);
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const sendMessage = (conversationId: string, content: string, senderId: string, senderName: string) => {
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId,
      senderName,
      content,
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    setMessages((prev) => [...prev, newMsg]);

    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              lastMessage: content,
              lastMessageAt: 'الآن',
            }
          : c
      )
    );
  };

  const getConversationMessages = (conversationId: string) => {
    return messages.filter((m) => m.conversationId === conversationId);
  };

  const startConversation = (
    machineId: string,
    machineTitle: string,
    targetOwnerId: string,
    targetOwnerName: string,
    myId: string,
    myName: string,
    initialText: string
  ): string => {
    const existing = conversations.find(
      (c) =>
        c.machineId === machineId &&
        ((c.participantOneId === myId && c.participantTwoId === targetOwnerId) ||
          (c.participantOneId === targetOwnerId && c.participantTwoId === myId))
    );

    if (existing) {
      if (initialText) {
        sendMessage(existing.id, initialText, myId, myName);
      }
      return existing.id;
    }

    const newConvId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newConvId,
      machineId,
      machineTitle,
      participantOneId: myId,
      participantTwoId: targetOwnerId,
      participantOneName: myName,
      participantTwoName: targetOwnerName,
      lastMessage: initialText || 'مرحباً، أستفسر بخصوص هذا العرض.',
      lastMessageAt: 'الآن',
      unreadCount: 0,
    };

    setConversations((prev) => [newConv, ...prev]);
    if (initialText) {
      sendMessage(newConvId, initialText, myId, myName);
    }
    return newConvId;
  };

  return (
    <DatabaseContext.Provider
      value={{
        machines,
        bookings,
        conversations,
        messages,
        addMachine,
        updateMachine,
        deleteMachine,
        createBooking,
        updateBookingStatus,
        sendMessage,
        getConversationMessages,
        startConversation,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};

export type Language = 'ar' | 'fr';

export const translations = {
  ar: {
    // Brand
    brandName: 'JADIJCB',
    brandTagline: 'منصة كراء وبيع الآلات الثقيلة وقطع الغيار بالمغرب',
    taglineSubtitle: 'إدارة أسطولك، كراء وبيع الآلات، وقطع الغيار بكل احترافية',
    
    // Top Bar Links & Actions
    navMarketplace: 'سوق الآلات',
    navSpareParts: 'قطع الغيار',
    navOwnerDashboard: 'لوحة التحكم',
    navMoroccoMap: 'خريطة المغرب',
    navPricing: 'الباقات والاشتراك',
    btnStartFreeTrial: 'جرب مجاناً 3 أيام',
    btnRegisterWhatsApp: 'ابدأ برقم واتسابك',
    btnLogin: 'تسجيل الدخول',
    btnLogout: 'تسجيل الخروج',
    
    // Hero Section
    heroBadge: 'المنصة الرقمية الأولى لمهنيي الأشغال العمومية BTP بالمغرب',
    heroTitlePart1: 'أكبر سوق مغربي',
    heroTitleHighlight: 'لكراء وبيع آلات البناء الثقيلة',
    heroTitlePart2: 'وقطع الغيار الأصلية',
    heroSubtitle: 'اربط آلاتك مباشرة مع أكبر المقاولات وشركات البناء في المغرب (الدار البيضاء، طنجة، مراكش، أكادير). تحكّم بأسطولك، واستقبل طلبات الكراء فورياً عبر الواتساب.',
    heroCtaPrimary: 'جرب مجاناً لمدة 3 أيام',
    heroCtaSecondary: 'استكشف الآلات المتاحة',
    heroWhatsAppDirect: 'ابدأ الآن برقم واتسابك',
    heroNoCreditCard: 'بدون بطاقة بنكية · تفعيل فوري بـ 72 ساعة تجريبية',
    
    // Stats & Trust Proof
    statActiveMachines: '+480 آلة جاهزة',
    statActiveMachinesDesc: 'حفارات وجرافات مسجلة ومفحوصة',
    statRegionsCount: '12 جهة بالمغرب',
    statRegionsDesc: 'تغطية شاملة للمشاريع الكبرى',
    statContractors: '+1,200 مقاولة BTP',
    statContractorsDesc: 'تبحث يومياً عن كراء وشراء المعدات',
    statCommission: '0% عمولة',
    statCommissionDesc: 'تواصل مباشر مع مالك الآلة أو المشتري',
    
    // Filter & Search
    filterAll: 'الكل',
    filterRent: 'للكراء فقط',
    filterSale: 'للبيع فقط',
    filterCategory: 'نوع الآلة',
    filterCity: 'المدينة / الجهة',
    filterPrice: 'السعر أو السومة الكرائية',
    searchPlaceholder: 'ابحث عن آلة (مثال: JCB 3CX، بوكلان كوماتسو، قطع غيار)...',
    resetFilters: 'إعادة ضبط',
    resultsCount: 'نتيجة متاحة',
    
    // Categories
    cat_backhoe_loader: 'جرافة حفارة (Retrochargeuse)',
    cat_crawler_excavator: 'حفارة مجنزرة (Pelle Chenilles)',
    cat_wheel_loader: 'شاحنة تعبئة (Chargeuse Pneus)',
    cat_bulldozer: 'جرافة تمهيد (Bouteur)',
    cat_motor_grader: 'ممهدة طرق (Niveleuse)',
    cat_dump_truck: 'شاحنة قلابة (Camion Benne)',
    cat_telescopic_handler: 'رافعة تلسكوبية (Télescopique)',
    cat_spare_parts: 'قطع غيار هيدروليكية ومحركات',
    
    // Machine Details
    withOperator: 'مع السائق',
    withoutOperator: 'بدون سائق',
    fuelIncluded: 'المحروقات مشمولة',
    fuelExcluded: 'المحروقات على المكتري',
    perHour: 'درهم / ساعة',
    perDay: 'درهم / يوم',
    perMonth: 'درهم / شهر',
    fixedPrice: 'درهم (سعر البيع)',
    negotiable: 'قابل للتفاوض',
    hoursCount: 'ساعات العمل:',
    yearMade: 'سنة الصنع:',
    cityLocation: 'الموقع بالمغرب:',
    btnContactWhatsApp: 'تواصل فوري عبر واتساب',
    btnInternalChat: 'مراسلة داخلية للمالك',
    btnBookNow: 'حجز واستئجار الآلة',
    viewDetails: 'عرض التفاصيل',
    
    // Countdown & Rental Timers
    activeRentalTitle: 'العقود الكرائية النشطة حالياً',
    timeLeftCountdown: 'الوقت المتبقي لانتهاء العقد:',
    hoursRemaining: 'ساعة متبقية',
    daysRemaining: 'يوم متبقي',
    projectSite: 'موقع الورش:',
    contractStatusActive: 'قيد التشغيل بالمشروع',
    contractStatusPending: 'في انتظار تأكيد المالك',
    contractStatusCompleted: 'مكتمل ومسترجع',
    
    // Moroccan Map
    moroccoMapTitle: 'توزيع الآلات الثقيلة عبر جهات المملكة',
    moroccoMapSubtitle: 'اختر الجهة لمعاينة المعدات المتوفرة بالقرب من ورش عملك',
    availableEquipment: 'آلة متوفرة حالياً',
    
    // Features Section
    feature1Title: 'إدارة أسطول الآلات بنقرة واحدة',
    feature1Desc: 'لوحة تحكم ذكية لتتبع حالة كل آلة، الساعات المشغلة، المداخيل، وعقود الكراء النشطة مع مؤقت تنازلي.',
    feature2Title: 'سوق متكامل للبيع المباشر والكراء',
    feature2Desc: 'اعرض آلاتك للكراء باليوم أو الشهر، أو اعرضها للبيع المباشر لآلاف المقاولين في جميع أنحاء المغرب.',
    feature3Title: 'سوق قطع الغيار الأصلية',
    feature3Desc: 'مضخات هيدروليكية، فلاتر، محركات Perkins وJCB الأصلية مع الشحن لجميع الورش والمدن.',
    feature4Title: 'تواصل مباشر وبدون وسطاء',
    feature4Desc: 'محادثات فورية مشفرة بين المقاولين وأصحاب المعدات مع إمكانية التحويل المباشر لواتساب بضغطة زر.',
    
    // Onboarding & Trial Flow
    trialBannerNotice: 'الفترة التجريبية مجانية: متبقي لك',
    trialHours: 'ساعة',
    trialUpgradeBtn: 'تفعيل الاشتراك السنوي',
    
    // Register Modal
    registerTitle: 'ابدأ إدارة أسطولك أو اعرض آلتك الآن',
    registerSubtitle: 'تسجيل سريع وفوري برقم الواتساب فقط — بدون إيميل ولا بطاقة بنكية',
    phoneLabel: 'رقم الهاتف أو الواتساب المغربي',
    phonePlaceholder: '0661234567 أو +212 6...',
    passwordLabel: 'كلمة المرور',
    passwordPlaceholder: 'اختر كلمة مرور آمنة',
    fullNameLabel: 'الاسم الكامل أو اسم الشركة',
    fullNamePlaceholder: 'مثال: شركة أشغال الأطلس / محمد بناني',
    cityLabel: 'المدينة',
    selectRole: 'صفتك المهنية',
    roleOwner: 'مالك آليات ثقيلة (أسطول / مقاول)',
    roleClient: 'مقاولة بناء باحثة عن كراء أو شراء (BTP)',
    btnSubmitRegister: 'ابدأ الآن مجاناً لمدة 3 أيام',
    alreadyRegistered: 'لديك حساب بالفعل؟ تسجيل الدخول',
    
    // Welcome Modal
    welcomeTitle: 'مرحباً بك في عائلة JADIJCB بالمغرب!',
    welcomeSubtitle: 'تم تفعيل حسابك بنجاح ومنحك 72 ساعة تجريبية كاملة ومجانية لاكتشاف كافة مزايا المنصة.',
    welcomeTrialNotice: 'فترتك التجريبية تنتهي بعد 3 أيام من الآن.',
    welcomeCta1: 'إنشاء حساب ومتابعة',
    welcomeCta2: 'تخطي واستكشاف لوحة التحكم',
    
    // Soft Lock Modal
    softLockTitle: 'انتهت فترة التجربة المجانية (72 ساعة)',
    softLockSubtitle: 'بياناتك وأسطولك في أمان تام! لتفعيل لوحة التحكم واستقبال طلبات الكراء، يرجى إتمام الاشتراك عبر التحويل البنكي أو وفاقاش.',
    bankTransferTitle: 'طرق الدفع البنكي المعتمدة بالمغرب:',
    bankRibLabel: 'رقم الحساب البنكي (RIB) - التجاري وفا بنك:',
    bankRibValue: '007 780 0001234567890123 45',
    bankBeneficiary: 'المستفيد: JADI JCB SARL AU',
    wafacashLabel: 'أو عبر وفاقاش / كاش بلوس:',
    wafacashValue: 'إرسال إلى: SAID - CIN: BE892011',
    annualPrice: '990 درهم / سنة فقط',
    softLockWhatsAppBtn: 'إرسال وصل التحويل عبر واتساب للتفعيل الفوري',
    softLockSimulatePayment: 'محاكاة موافقة الإدارة (تجريبي)',
    
    // Dashboard
    dashboardTitle: 'لوحة تحكم مالك الأسطول',
    dashboardSubtitle: 'إحصائيات الأداء، عقود الكراء الحالية، وإدارة العروض',
    metricTotalRevenue: 'إجمالي المداخيل (درهم)',
    metricActiveRentals: 'عقود كراء نشطة',
    metricFleetSize: 'إجمالي الآلات بالأسطول',
    metricUtilization: 'نسبة تشغيل الأسطول',
    btnAddMachine: 'إضافة آلة جديدة',
    tabMyMachines: 'أسطولي المعروض',
    tabActiveBookings: 'عقود الكراء والمؤقتات',
    tabMessages: 'المحادثات المباشرة',
    tabStorefront: 'المتجر الإلكتروني',
    
    // Add Machine Form
    addMachineTitle: 'إضافة آلة جديدة إلى المنصة',
    machineTitleAr: 'اسم الآلة بالعربية',
    machineTitleFr: 'اسم الآلة بالفرنسية',
    machineBrand: 'العلامة التجارية (JCB, CAT, Komatsu...)',
    machineModel: 'الموديل (مثال: 3CX Eco, PC210...)',
    machineYear: 'سنة التصنيع',
    machineHours: 'عدد ساعات العمل (Compteur)',
    listingTypeLabel: 'نوع العرض',
    bothRentAndSale: 'للكراء والبيع معاً',
    rateHourly: 'السومة بالساعة (درهم)',
    rateDaily: 'السومة باليوم (درهم)',
    salePrice: 'ثمن البيع النهائي (درهم)',
    cityInMorocco: 'المدينة الموجودة بها الآلة',
    btnSaveMachine: 'نشر الآلة فورياً',
    
    // Internal Chat
    chatWith: 'محادثة مع:',
    chatPlaceholder: 'اكتب رسالتك هنا للمقاول...',
    btnSend: 'إرسال',
    quickResponses: 'ردود سريعة:',
    quickResp1: 'السلام عليكم، الآلة متوفرة فوراً مع السائق بالدار البيضاء.',
    quickResp2: 'السعر اليومي 1800 درهم شامل السائق، غير شامل المحروقات.',
    quickResp3: 'يمكن المعاينة غداً صباحاً بورش طنجة.',
    openWhatsAppDirect: 'تحويل المحادثة إلى واتساب',
    
    // Testimonials
    testimonialsTitle: 'ماذا يقول مهنيو BTP وأصحاب الأساطيل بالمغرب',
    testimonial1Text: 'منصة JADIJCB ساعدتنا في تشغيل 4 جرافات كانت متوقفة في طنجة. العقود واضحة والتواصل مع المقاولين فوري.',
    testimonial1Author: 'الحاج رشيد العلمي',
    testimonial1Role: 'مدير شركة أشغال الشمال، طنجة',
    testimonial2Text: 'أفضل استثمار لأسطولنا. قمنا ببيع حفارة هيدروليكية في أقل من 5 أيام بدون وسطاء أو عمولات زائدة.',
    testimonial2Author: 'المهندس كريم المنصوري',
    testimonial2Role: 'مقاولة المنصوري للبناء والأشغال، الدار البيضاء',
    
    // Footer
    footerRights: 'جميع الحقوق محفوظة © 2026 JADIJCB المغرب',
    footerNotice: 'منصة مغربية 100% متوافقة مع القوانين التجارية BTP والتراخيص المهنية بالمملكة المغربية.',
  },
  
  fr: {
    // Brand
    brandName: 'JADIJCB',
    brandTagline: 'Plateforme B2B de Location & Vente d\'Engins Lourds et Pièces au Maroc',
    taglineSubtitle: 'Gérez votre flotte, louez et vendez vos engins et pièces en toute simplicité',
    
    // Top Bar Links & Actions
    navMarketplace: 'Marché des Engins',
    navSpareParts: 'Pièces Détachées',
    navOwnerDashboard: 'Tableau de Bord',
    navMoroccoMap: 'Carte du Maroc',
    navPricing: 'Tarifs & Abonnements',
    btnStartFreeTrial: 'Essai Gratuit 3 Jours',
    btnRegisterWhatsApp: 'Démarrer via WhatsApp',
    btnLogin: 'Connexion',
    btnLogout: 'Déconnexion',
    
    // Hero Section
    heroBadge: 'La 1ère plateforme numérique B2B pour les professionnels du BTP au Maroc',
    heroTitlePart1: 'Le plus grand marché marocain',
    heroTitleHighlight: 'de Location et Vente d\'Engins de Chantier',
    heroTitlePart2: 'et Pièces d\'Origine',
    heroSubtitle: 'Connectez directement vos engins avec les plus grands entrepreneurs et entreprises BTP au Maroc (Casablanca, Tanger, Marrakech, Agadir). Gérez votre flotte et recevez des demandes instantanées sur WhatsApp.',
    heroCtaPrimary: 'Essai gratuit pendant 3 jours',
    heroCtaSecondary: 'Explorer les engins disponibles',
    heroWhatsAppDirect: 'Commencer avec votre numéro WhatsApp',
    heroNoCreditCard: 'Sans carte bancaire · Activation immédiate avec 72h d\'essai',
    
    // Stats & Trust Proof
    statActiveMachines: '+480 Engins Disponibles',
    statActiveMachinesDesc: 'Pelleteuses et chargeuses vérifiées',
    statRegionsCount: '12 Régions du Maroc',
    statRegionsDesc: 'Couverture intégrale des grands chantiers',
    statContractors: '+1 200 Entreprises BTP',
    statContractorsDesc: 'Recherchent quotidiennement des engins',
    statCommission: '0% de Commission',
    statCommissionDesc: 'Lien direct entre propriétaires et clients',
    
    // Filter & Search
    filterAll: 'Tous',
    filterRent: 'Location uniquement',
    filterSale: 'Vente uniquement',
    filterCategory: 'Catégorie d\'engin',
    filterCity: 'Ville / Région',
    filterPrice: 'Tarif / Prix de vente',
    searchPlaceholder: 'Rechercher un engin (ex: JCB 3CX, Pelle Komatsu, Pièces)...',
    resetFilters: 'Réinitialiser',
    resultsCount: 'résultat(s) trouvé(s)',
    
    // Categories
    cat_backhoe_loader: 'Tractopelle (Rétrochargeuse)',
    cat_crawler_excavator: 'Pelle sur chenilles',
    cat_wheel_loader: 'Chargeuse sur pneus',
    cat_bulldozer: 'Bouteur (Bulldozer)',
    cat_motor_grader: 'Niveleuse routière',
    cat_dump_truck: 'Camion Benne chantier',
    cat_telescopic_handler: 'Chariot Télescopique',
    cat_spare_parts: 'Pièces de Rechange Hydrauliques',
    
    // Machine Details
    withOperator: 'Avec chauffeur',
    withoutOperator: 'Sans chauffeur',
    fuelIncluded: 'Carburant inclus',
    fuelExcluded: 'Carburant à la charge du client',
    perHour: 'DH / Heure',
    perDay: 'DH / Jour',
    perMonth: 'DH / Mois',
    fixedPrice: 'DH (Prix de vente)',
    negotiable: 'Prix négociable',
    hoursCount: 'Heures compteur :',
    yearMade: 'Année :',
    cityLocation: 'Localisation au Maroc :',
    btnContactWhatsApp: 'Contact direct WhatsApp',
    btnInternalChat: 'Messagerie interne propriétaire',
    btnBookNow: 'Réserver & Louer cet engin',
    viewDetails: 'Voir les détails',
    
    // Countdown & Rental Timers
    activeRentalTitle: 'Contrats de location actifs en cours',
    timeLeftCountdown: 'Temps restant avant restitution :',
    hoursRemaining: 'heures restantes',
    daysRemaining: 'jours restants',
    projectSite: 'Chantier du projet :',
    contractStatusActive: 'En activité sur chantier',
    contractStatusPending: 'En attente de confirmation',
    contractStatusCompleted: 'Terminé & Restitué',
    
    // Moroccan Map
    moroccoMapTitle: 'Distribution des engins à travers le Royaume',
    moroccoMapSubtitle: 'Sélectionnez une région pour visualiser les engins disponibles près de vos chantiers',
    availableEquipment: 'engins disponibles actuellement',
    
    // Features Section
    feature1Title: 'Gestion de flotte en 1 clic',
    feature1Desc: 'Tableau de bord intelligent pour surveiller l\'état de chaque machine, les heures de travail, les revenus et les contrats actifs avec compte à rebours.',
    feature2Title: 'Marché dual : Location & Vente directe',
    feature2Desc: 'Publiez vos engins à la journée ou au mois, ou mettez-les en vente directe auprès de milliers d\'entrepreneurs à travers le Maroc.',
    feature3Title: 'Catalogue de pièces de rechange certifiées',
    feature3Desc: 'Pompes hydrauliques, filtres, moteurs d\'origine Perkins et JCB livrés directement sur vos chantiers.',
    feature4Title: 'Communication directe sans intermédiaire',
    feature4Desc: 'Messagerie instantanée cryptée entre entreprises et propriétaires avec bascule en 1 clic vers WhatsApp.',
    
    // Onboarding & Trial Flow
    trialBannerNotice: 'Période d\'essai gratuite : il vous reste',
    trialHours: 'heures',
    trialUpgradeBtn: 'Activer l\'abonnement annuel',
    
    // Register Modal
    registerTitle: 'Gérez votre flotte ou proposez votre engin',
    registerSubtitle: 'Inscription rapide avec votre numéro WhatsApp — Sans email ni carte bancaire',
    phoneLabel: 'Numéro de téléphone / WhatsApp marocain',
    phonePlaceholder: '0661234567 ou +212 6...',
    passwordLabel: 'Mot de passe',
    passwordPlaceholder: 'Choisissez un mot de passe sécurisé',
    fullNameLabel: 'Nom complet ou Raison Sociale',
    fullNamePlaceholder: 'Ex: Entreprise Travaux Atlas / Said Bennani',
    cityLabel: 'Ville au Maroc',
    selectRole: 'Votre profil professionnel',
    roleOwner: 'Propriétaire d\'engins (Flotte / Loueur)',
    roleClient: 'Entreprise BTP en recherche d\'engins (Locataire / Acheteur)',
    btnSubmitRegister: 'Commencer gratuitement pendant 3 jours',
    alreadyRegistered: 'Déjà un compte ? Connectez-vous',
    
    // Welcome Modal
    welcomeTitle: 'Bienvenue chez JADIJCB Maroc !',
    welcomeSubtitle: 'Votre compte a été activé avec succès. Vous bénéficiez de 72 heures d\'essai gratuit pour explorer toutes les fonctionnalités.',
    welcomeTrialNotice: 'Votre essai gratuit expire dans 3 jours.',
    welcomeCta1: 'Créer un compte et continuer',
    welcomeCta2: 'Passer et explorer le tableau de bord',
    
    // Soft Lock Modal
    softLockTitle: 'Période d\'essai gratuite de 72h expirée',
    softLockSubtitle: 'Vos données et votre flotte sont conservées en toute sécurité ! Pour réactiver votre tableau de bord, veuillez effectuer votre règlement par virement ou Wafacash.',
    bankTransferTitle: 'Coordonnées de règlement au Maroc :',
    bankRibLabel: 'RIB Attijariwafa Bank :',
    bankRibValue: '007 780 0001234567890123 45',
    bankBeneficiary: 'Bénéficiaire : JADI JCB SARL AU',
    wafacashLabel: 'Ou par mandat Wafacash / Cash Plus :',
    wafacashValue: 'Au nom de : SAID - CIN: BE892011',
    annualPrice: '990 DH / An seulement',
    softLockWhatsAppBtn: 'Envoyer le reçu sur WhatsApp pour activation instantanée',
    softLockSimulatePayment: 'Simuler validation Admin (Démo)',
    
    // Dashboard
    dashboardTitle: 'Espace Propriétaire de Flotte',
    dashboardSubtitle: 'Indicateurs financiers, locations en cours et gestion du catalogue',
    metricTotalRevenue: 'Revenus générés (DH)',
    metricActiveRentals: 'Locations en cours',
    metricFleetSize: 'Total engins dans la flotte',
    metricUtilization: 'Taux d\'utilisation flotte',
    btnAddMachine: 'Ajouter un engin',
    tabMyMachines: 'Ma Flotte',
    tabActiveBookings: 'Contrats & Décomptes',
    tabMessages: 'Messagerie Directe',
    tabStorefront: 'Vitrine Publique',
    
    // Add Machine Form
    addMachineTitle: 'Ajouter un nouvel engin à la plateforme',
    machineTitleAr: 'Titre de l\'engin en Arabe',
    machineTitleFr: 'Titre de l\'engin en Français',
    machineBrand: 'Marque (JCB, CAT, Komatsu...)',
    machineModel: 'Modèle (ex: 3CX Eco, PC210...)',
    machineYear: 'Année de fabrication',
    machineHours: 'Heures au compteur',
    listingTypeLabel: 'Type de publication',
    bothRentAndSale: 'Pour Location et Vente',
    rateHourly: 'Tarif par heure (DH)',
    rateDaily: 'Tarif par jour (DH)',
    salePrice: 'Prix de vente ferme (DH)',
    cityInMorocco: 'Ville où se trouve l\'engin',
    btnSaveMachine: 'Publier l\'engin immédiatement',
    
    // Internal Chat
    chatWith: 'Conversation avec :',
    chatPlaceholder: 'Écrivez votre message à l\'entrepreneur...',
    btnSend: 'Envoyer',
    quickResponses: 'Réponses rapides :',
    quickResp1: 'Bonjour, l\'engin est disponible immédiatement avec chauffeur à Casablanca.',
    quickResp2: 'Tarif journalier 1800 DH avec chauffeur, hors carburant.',
    quickResp3: 'Visite possible demain matin sur notre chantier à Tanger.',
    openWhatsAppDirect: 'Bascule vers WhatsApp direct',
    
    // Testimonials
    testimonialsTitle: 'Ce que disent les entrepreneurs BTP au Maroc',
    testimonial1Text: 'JADIJCB nous a permis de rentabiliser 4 tractopelles immobiles à Tanger. Les contrats sont clairs et le contact est direct.',
    testimonial1Author: 'Hadj Rachid El Alami',
    testimonial1Role: 'Directeur Général, Travaux du Nord, Tanger',
    testimonial2Text: 'Une solution indispensable pour notre parc matériel. Nous avons vendu une pelle hydraulique en 5 jours sans intermédiaires.',
    testimonial2Author: 'Ing. Karim Mansouri',
    testimonial2Role: 'Entreprise Mansouri BTP, Casablanca',
    
    // Footer
    footerRights: 'Tous droits réservés © 2026 JADIJCB Maroc',
    footerNotice: 'Plateforme 100% marocaine conforme à la réglementation commerciale et aux usages du BTP au Maroc.',
  }
};

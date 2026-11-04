import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useDatabase, MOROCCAN_CITIES } from '../../context/DatabaseContext';
import { MachineCategory, MachineListingType, MachineCondition } from '../../types/database.types';
import { X, Plus, Check, ShieldCheck, MapPin, DollarSign, Wrench } from 'lucide-react';

interface AddMachineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddMachineModal: React.FC<AddMachineModalProps> = ({ isOpen, onClose }) => {
  const { t, isRtl } = useLanguage();
  const { user } = useAuth();
  const { addMachine } = useDatabase();

  const [titleAr, setTitleAr] = useState('');
  const [titleFr, setTitleFr] = useState('');
  const [category, setCategory] = useState<MachineCategory>('backhoe_loader');
  const [brand, setBrand] = useState('JCB');
  const [model, setModel] = useState('3CX Eco');
  const [year, setYear] = useState(2023);
  const [hours, setHours] = useState(1500);
  const [listingType, setListingType] = useState<MachineListingType>('both');
  const [condition, setCondition] = useState<MachineCondition>('excellent');
  
  const [dailyRate, setDailyRate] = useState<number>(1800);
  const [hourlyRate, setHourlyRate] = useState<number>(240);
  const [salePrice, setSalePrice] = useState<number>(550000);
  const [withOperator, setWithOperator] = useState(true);
  const [city, setCity] = useState('الدار البيضاء');
  const [descriptionAr, setDescriptionAr] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    addMachine({
      ownerId: user.id,
      ownerName: user.fullName,
      ownerPhone: user.phoneNumber,
      ownerCompany: user.companyName,
      titleAr: titleAr || `${brand} ${model} في ${city}`,
      titleFr: titleFr || `${brand} ${model} à ${city}`,
      category,
      brand,
      model,
      yearOfManufacture: Number(year),
      hoursOperated: Number(hours),
      listingType,
      condition,
      dailyRateMad: Number(dailyRate) || undefined,
      hourlyRateMad: Number(hourlyRate) || undefined,
      salePriceMad: Number(salePrice) || undefined,
      withOperator,
      fuelIncluded: false,
      isNegotiable: true,
      city,
      region: 'المغرب',
      coordinates: { lat: 33.5731, lng: -7.5898 },
      images: ['jcb_3cx'],
      descriptionAr: descriptionAr || 'آلة ممتازة جاهزة للعمل الفوري بورش البناء والأشغال العمومية.',
      descriptionFr: 'Machine en excellent état disponible pour chantier BTP.',
      specs: {},
      isAvailable: true,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100 my-8"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <button
          onClick={onClose}
          className="absolute top-5 end-5 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center">
            <Plus className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">
              {t('addMachineTitle')}
            </h3>
            <p className="text-xs text-slate-400">
              {isRtl ? 'أدخل تفاصيل الآلة أو قطع الغيار لنشرها فورياً لآلاف المقاولين' : 'Publiez votre matériel instantanément'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Titles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {t('machineTitleAr')}
              </label>
              <input
                type="text"
                required
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                placeholder="مثال: جرافة JCB 3CX بحالة الوكالة"
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {t('machineTitleFr')}
              </label>
              <input
                type="text"
                value={titleFr}
                onChange={(e) => setTitleFr(e.target.value)}
                placeholder="Ex: Tractopelle JCB 3CX état neuf"
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Category & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {t('filterCategory')}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MachineCategory)}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="backhoe_loader">JCB 3CX/4CX (Retrochargeuse)</option>
                <option value="crawler_excavator">حفارة مجنزرة (Pelle Chenilles)</option>
                <option value="wheel_loader">شاحنة تعبئة (Chargeuse Pneus)</option>
                <option value="telescopic_handler">رافعة تلسكوبية (Télescopique)</option>
                <option value="dump_truck">شاحنة قلابة (Camion Benne)</option>
                <option value="spare_parts">قطع غيار أصلية (Pièces détachées)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {t('machineBrand')}
              </label>
              <input
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="JCB, Caterpillar, Komatsu..."
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {t('machineModel')}
              </label>
              <input
                type="text"
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="3CX, PC210, 966H..."
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Year, Hours & City */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {t('machineYear')}
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white tabular-nums focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {t('machineHours')}
              </label>
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white tabular-nums focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {t('cityInMorocco')}
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {MOROCCAN_CITIES.map((c) => (
                  <option key={c.id} value={isRtl ? c.nameAr : c.nameFr}>
                    {isRtl ? c.nameAr : c.nameFr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pricing: Rental Rates & Sale Price in MAD */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-amber-400 block">
              {isRtl ? 'الأسعار والسومة الكرائية (بالدرهم المغربي MAD)' : 'Tarification en Dirhams Marocains (DH)'}
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  {t('rateDaily')}
                </label>
                <input
                  type="number"
                  value={dailyRate}
                  onChange={(e) => setDailyRate(Number(e.target.value))}
                  placeholder="1900"
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white tabular-nums focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  {t('rateHourly')}
                </label>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  placeholder="250"
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white tabular-nums focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  {t('salePrice')}
                </label>
                <input
                  type="number"
                  value={salePrice}
                  onChange={(e) => setSalePrice(Number(e.target.value))}
                  placeholder="600000"
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white tabular-nums focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="withOperator"
                checked={withOperator}
                onChange={(e) => setWithOperator(e.target.checked)}
                className="rounded border-slate-700 text-amber-500 focus:ring-amber-500"
              />
              <label htmlFor="withOperator" className="text-xs text-slate-300 cursor-pointer">
                {t('withOperator')} (Chauffeur professionnel inclus)
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            {t('btnSaveMachine')}
          </button>
        </form>
      </div>
    </div>
  );
};

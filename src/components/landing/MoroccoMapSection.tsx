import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { MOROCCAN_CITIES } from '../../context/DatabaseContext';
import { MoroccanCityInfo } from '../../types/database.types';
import { MapPin, Truck, ChevronRight, CheckCircle2 } from 'lucide-react';

interface MoroccoMapSectionProps {
  onSelectCityFilter?: (cityName: string) => void;
}

export const MoroccoMapSection: React.FC<MoroccoMapSectionProps> = ({ onSelectCityFilter }) => {
  const { t, isRtl } = useLanguage();
  const [selectedCity, setSelectedCity] = useState<MoroccanCityInfo>(MOROCCAN_CITIES[0]);

  const handleCityClick = (city: MoroccanCityInfo) => {
    setSelectedCity(city);
    if (onSelectCityFilter) {
      onSelectCityFilter(isRtl ? city.nameAr : city.nameFr);
    }
  };

  return (
    <section className="py-16 border-b border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-wider block mb-2">
            {isRtl ? 'التغطية الجغرافية الوطنية' : 'Couverture Nationale'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
            {t('moroccoMapTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {t('moroccoMapSubtitle')}
          </p>
        </div>

        {/* Map View & Regional Hub Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Moroccan Map Graphic (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
            <div className="text-xs font-semibold text-slate-400 mb-4 flex items-center justify-between">
              <span>{isRtl ? 'خريطة انتشار الآلات بالمملكة المغربية' : 'Carte des engins au Maroc'}</span>
              <span className="text-amber-400 font-bold tabular-nums">
                {MOROCCAN_CITIES.reduce((acc, c) => acc + c.machineCount, 0)} {t('availableEquipment')}
              </span>
            </div>

            {/* Stylized Moroccan Map SVG with Interactive Region Coordinates */}
            <div className="relative w-full aspect-[16/10] bg-slate-950 rounded-2xl border border-slate-800/80 p-4 flex items-center justify-center">
              <svg viewBox="0 0 600 420" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Simplified Stylized Morocco Coastline & Landmass */}
                <path
                  d="M180 30 Q240 20 300 25 L340 35 L420 50 L480 70 L480 140 L450 180 L400 220 L350 250 L300 280 L230 330 L180 380 L120 400 L80 390 L110 320 L130 250 L150 180 L140 100 L180 30 Z"
                  fill="#0F172A"
                  stroke="#334155"
                  strokeWidth="2"
                  className="filter drop-shadow-md"
                />
                
                {/* Regional boundaries subtle accents */}
                <path d="M180 30 L320 80 M240 100 L420 120 M200 180 L350 200 M160 250 L300 270" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M120 400 L230 330" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Ocean and Atlas Mountains subtle styling */}
                <text x="50" y="80" fill="#334155" fontSize="12" fontWeight="bold" fontFamily="sans-serif">المحيط الأطلسي</text>
                <text x="360" y="30" fill="#334155" fontSize="11" fontWeight="bold" fontFamily="sans-serif">البحر الأبيض المتوسط</text>

                {/* City Interactive Hotspots (Plotted geographically for Morocco) */}
                {/* Tanger */}
                <g 
                  onClick={() => handleCityClick(MOROCCAN_CITIES.find(c => c.id === 'tanger')!)} 
                  className="cursor-pointer group"
                >
                  <circle cx="310" cy="40" r={selectedCity.id === 'tanger' ? 9 : 6} fill={selectedCity.id === 'tanger' ? '#F59E0B' : '#64748B'} className="transition-all" />
                  <circle cx="310" cy="40" r={selectedCity.id === 'tanger' ? 16 : 0} fill="#F59E0B" fillOpacity="0.2" className="animate-ping" />
                  <text x="325" y="44" fill={selectedCity.id === 'tanger' ? '#F59E0B' : '#94A3B8'} fontSize="11" fontWeight="bold">طنجة (88)</text>
                </g>

                {/* Rabat */}
                <g 
                  onClick={() => handleCityClick(MOROCCAN_CITIES.find(c => c.id === 'rabat')!)} 
                  className="cursor-pointer group"
                >
                  <circle cx="245" cy="85" r={selectedCity.id === 'rabat' ? 9 : 6} fill={selectedCity.id === 'rabat' ? '#F59E0B' : '#64748B'} />
                  <text x="180" y="89" fill={selectedCity.id === 'rabat' ? '#F59E0B' : '#94A3B8'} fontSize="11" fontWeight="bold">الرباط (57)</text>
                </g>

                {/* Casablanca (Hub Center) */}
                <g 
                  onClick={() => handleCityClick(MOROCCAN_CITIES.find(c => c.id === 'casablanca')!)} 
                  className="cursor-pointer group"
                >
                  <circle cx="220" cy="110" r={selectedCity.id === 'casablanca' ? 12 : 8} fill={selectedCity.id === 'casablanca' ? '#F59E0B' : '#E2E8F0'} />
                  <circle cx="220" cy="110" r="18" fill="#F59E0B" fillOpacity="0.3" className="animate-pulse" />
                  <text x="110" y="115" fill={selectedCity.id === 'casablanca' ? '#F59E0B' : '#FFFFFF'} fontSize="12" fontWeight="black">الدار البيضاء (142)</text>
                </g>

                {/* Fès */}
                <g 
                  onClick={() => handleCityClick(MOROCCAN_CITIES.find(c => c.id === 'fes')!)} 
                  className="cursor-pointer group"
                >
                  <circle cx="330" cy="95" r={selectedCity.id === 'fes' ? 9 : 6} fill={selectedCity.id === 'fes' ? '#F59E0B' : '#64748B'} />
                  <text x="345" y="99" fill={selectedCity.id === 'fes' ? '#F59E0B' : '#94A3B8'} fontSize="11" fontWeight="bold">فاس (39)</text>
                </g>

                {/* Oujda */}
                <g 
                  onClick={() => handleCityClick(MOROCCAN_CITIES.find(c => c.id === 'oujda')!)} 
                  className="cursor-pointer group"
                >
                  <circle cx="450" cy="90" r={selectedCity.id === 'oujda' ? 9 : 6} fill={selectedCity.id === 'oujda' ? '#F59E0B' : '#64748B'} />
                  <text x="395" y="75" fill={selectedCity.id === 'oujda' ? '#F59E0B' : '#94A3B8'} fontSize="11" fontWeight="bold">وجدة (28)</text>
                </g>

                {/* Marrakech */}
                <g 
                  onClick={() => handleCityClick(MOROCCAN_CITIES.find(c => c.id === 'marrakech')!)} 
                  className="cursor-pointer group"
                >
                  <circle cx="205" cy="175" r={selectedCity.id === 'marrakech' ? 10 : 7} fill={selectedCity.id === 'marrakech' ? '#F59E0B' : '#64748B'} />
                  <text x="125" y="180" fill={selectedCity.id === 'marrakech' ? '#F59E0B' : '#94A3B8'} fontSize="11" fontWeight="bold">مراكش (64)</text>
                </g>

                {/* Agadir */}
                <g 
                  onClick={() => handleCityClick(MOROCCAN_CITIES.find(c => c.id === 'agadir')!)} 
                  className="cursor-pointer group"
                >
                  <circle cx="165" cy="240" r={selectedCity.id === 'agadir' ? 10 : 7} fill={selectedCity.id === 'agadir' ? '#F59E0B' : '#64748B'} />
                  <text x="95" y="245" fill={selectedCity.id === 'agadir' ? '#F59E0B' : '#94A3B8'} fontSize="11" fontWeight="bold">أكادير (46)</text>
                </g>

                {/* Laâyoune */}
                <g 
                  onClick={() => handleCityClick(MOROCCAN_CITIES.find(c => c.id === 'laayoune')!)} 
                  className="cursor-pointer group"
                >
                  <circle cx="115" cy="350" r={selectedCity.id === 'laayoune' ? 9 : 6} fill={selectedCity.id === 'laayoune' ? '#F59E0B' : '#64748B'} />
                  <text x="45" y="355" fill={selectedCity.id === 'laayoune' ? '#F59E0B' : '#94A3B8'} fontSize="11" fontWeight="bold">العيون (22)</text>
                </g>
              </svg>
            </div>
          </div>

          {/* City Details Spotlight (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-slate-900 border border-amber-500/30 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold">
                  {isRtl ? selectedCity.regionAr : selectedCity.regionFr}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedCity.coordinates.lat.toFixed(2)}° N, {selectedCity.coordinates.lng.toFixed(2)}° W
                </span>
              </div>

              <h3 className="text-2xl font-black text-white mb-2">
                {isRtl ? selectedCity.nameAr : selectedCity.nameFr}
              </h3>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-black text-amber-500 tabular-nums">
                  {selectedCity.machineCount}
                </span>
                <span className="text-xs text-slate-400">
                  {isRtl ? 'آلة مسجلة وجاهزة للعمل' : 'engins prêts sur chantiers'}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{isRtl ? 'أكثر الآلات طلباً بالمنطقة:' : 'Engins les plus demandés :'}</span>
                  <span className="font-bold text-amber-300">JCB 3CX · Pelle 22T · 966H</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{isRtl ? 'متوسط السومة اليومية:' : 'Tarif journalier moyen :'}</span>
                  <span className="font-bold text-white tabular-nums">1,800 - 3,500 DH</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{isRtl ? 'سرعة التوصيل للورش:' : 'Délai moyen livraison :'}</span>
                  <span className="font-bold text-emerald-400">{isRtl ? 'أقل من 3 ساعات' : '< 3 heures'}</span>
                </div>
              </div>

              <div className="mt-5">
                <button
                  onClick={() => onSelectCityFilter?.(isRtl ? selectedCity.nameAr : selectedCity.nameFr)}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Truck className="w-4 h-4" />
                  <span>
                    {isRtl ? `معاينة آلات ${selectedCity.nameAr}` : `Voir les engins à ${selectedCity.nameFr}`}
                  </span>
                </button>
              </div>
            </div>

            {/* Quick list of other cities */}
            <div className="grid grid-cols-4 gap-2">
              {MOROCCAN_CITIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleCityClick(c)}
                  className={`p-2 rounded-xl text-center border text-xs transition-colors cursor-pointer ${
                    selectedCity.id === c.id
                      ? 'bg-amber-500 text-slate-950 font-black border-amber-500'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="truncate">{isRtl ? c.nameAr : c.nameFr}</div>
                  <div className="text-[10px] opacity-80 tabular-nums">({c.machineCount})</div>
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

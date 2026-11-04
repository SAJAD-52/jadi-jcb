import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useDatabase, MOROCCAN_CITIES } from '../../context/DatabaseContext';
import { Machine, MachineListingType, MachineCategory } from '../../types/database.types';
import { MachinerySvg } from '../common/MachinerySvg';
import { Search, MapPin, Phone, ShieldCheck, ArrowRight, ArrowLeft, Filter, Tag, CheckCircle2 } from 'lucide-react';
import { MachineDetailModal } from '../marketplace/MachineDetailModal';

interface MarketplacePreviewProps {
  initialCityFilter?: string;
  onOpenChat: (convId: string) => void;
}

export const MarketplacePreview: React.FC<MarketplacePreviewProps> = ({ initialCityFilter = '', onOpenChat }) => {
  const { t, isRtl } = useLanguage();
  const { machines } = useDatabase();

  const [listingTypeFilter, setListingTypeFilter] = useState<'all' | 'rent' | 'sale'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>(initialCityFilter);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);

  // Sync initialCityFilter if passed
  React.useEffect(() => {
    if (initialCityFilter) {
      setSelectedCity(initialCityFilter);
    }
  }, [initialCityFilter]);

  const filteredMachines = useMemo(() => {
    return machines.filter((m) => {
      // Type filter
      if (listingTypeFilter === 'rent' && m.listingType === 'sale') return false;
      if (listingTypeFilter === 'sale' && m.listingType === 'rent') return false;

      // Category filter
      if (selectedCategory !== 'all' && m.category !== selectedCategory) return false;

      // City filter
      if (selectedCity && !m.city.toLowerCase().includes(selectedCity.toLowerCase())) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = m.titleAr.toLowerCase().includes(query) || m.titleFr.toLowerCase().includes(query);
        const matchesBrand = m.brand.toLowerCase().includes(query) || m.model.toLowerCase().includes(query);
        const matchesCity = m.city.toLowerCase().includes(query);
        if (!matchesTitle && !matchesBrand && !matchesCity) return false;
      }

      return true;
    });
  }, [machines, listingTypeFilter, selectedCategory, selectedCity, searchQuery]);

  const handleWhatsAppDirect = (e: React.MouseEvent, m: Machine) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `السلام عليكم، أتواصل معك بخصوص إعلان ${m.titleAr} (${m.brand} ${m.model}) المعروض في منصة JADIJCB في ${m.city}.`
    );
    const phone = m.ownerPhone.replace(/[^\d+]/g, '');
    window.open(`https://wa.me/${phone.replace('+', '')}?text=${text}`, '_blank');
  };

  return (
    <section id="marketplace" className="py-16 border-b border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-amber-500 uppercase tracking-wider block mb-1">
              {isRtl ? 'سوق الآليات والمعدات الثقيلة' : 'Marché B2B du Matériel'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {isRtl ? 'استكشف آلات البناء وقطع الغيار المتاحة' : 'Engins de Chantier & Pièces Disponibles'}
            </h2>
          </div>
          <div className="text-xs text-slate-400 font-medium">
            <span className="font-bold text-amber-400 tabular-nums">{filteredMachines.length}</span> {t('resultsCount')}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 mb-8 space-y-4">
          
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* 1. Mode Segmented Control: All / Rent / Sale */}
            <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 shrink-0">
              <button
                onClick={() => setListingTypeFilter('all')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  listingTypeFilter === 'all'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t('filterAll')}
              </button>

              <button
                onClick={() => setListingTypeFilter('rent')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  listingTypeFilter === 'rent'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t('filterRent')}
              </button>

              <button
                onClick={() => setListingTypeFilter('sale')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  listingTypeFilter === 'sale'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t('filterSale')}
              </button>
            </div>

            {/* 2. Live Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-slate-500">
                <Search className="w-4 h-4 text-amber-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full ps-9 pe-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* 3. City Filter Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="ps-8 pe-6 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="">{isRtl ? 'جميع مدن المغرب' : 'Toutes les villes'}</option>
                  {MOROCCAN_CITIES.map((c) => (
                    <option key={c.id} value={isRtl ? c.nameAr : c.nameFr}>
                      {isRtl ? c.nameAr : c.nameFr} ({c.machineCount})
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none text-amber-500">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Reset filter button if active */}
              {(selectedCity || searchQuery || listingTypeFilter !== 'all' || selectedCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSelectedCity('');
                    setSearchQuery('');
                    setListingTypeFilter('all');
                    setSelectedCategory('all');
                  }}
                  className="px-3 py-2 text-xs text-slate-400 hover:text-white underline cursor-pointer whitespace-nowrap"
                >
                  {t('resetFilters')}
                </button>
              )}
            </div>

          </div>

          {/* Quick Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer font-medium ${
                selectedCategory === 'all'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {isRtl ? 'كافة الفئات' : 'Toutes catégories'}
            </button>
            <button
              onClick={() => setSelectedCategory('backhoe_loader')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer font-medium ${
                selectedCategory === 'backhoe_loader'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              JCB 3CX/4CX
            </button>
            <button
              onClick={() => setSelectedCategory('crawler_excavator')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer font-medium ${
                selectedCategory === 'crawler_excavator'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {isRtl ? 'حفارات بوكلان' : 'Pelles Chenilles'}
            </button>
            <button
              onClick={() => setSelectedCategory('wheel_loader')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer font-medium ${
                selectedCategory === 'wheel_loader'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {isRtl ? 'شاحنات تعبئة 966H' : 'Chargeuses'}
            </button>
            <button
              onClick={() => setSelectedCategory('spare_parts')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer font-medium ${
                selectedCategory === 'spare_parts'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {isRtl ? 'قطع غيار هيدروليكية' : 'Pièces Hydrauliques'}
            </button>
          </div>

        </div>

        {/* Machine Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMachines.map((machine) => (
            <div
              key={machine.id}
              onClick={() => setSelectedMachine(machine)}
              className="group rounded-3xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 p-5 flex flex-col justify-between cursor-pointer shadow-lg hover:shadow-xl hover:shadow-amber-500/5"
            >
              <div>
                {/* Header Metadata: Unboxed text with typographic separators */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-400 uppercase tracking-wider">
                      {machine.brand}
                    </span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>{machine.model}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="font-mono">{machine.yearOfManufacture}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>{machine.city}</span>
                  </div>
                </div>

                {/* Machine Illustration Container */}
                <div className="relative h-44 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800/80 p-3 mb-4 flex items-center justify-center overflow-hidden">
                  <MachinerySvg
                    type={machine.category}
                    className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Availability status */}
                  <div className="absolute top-2 end-2">
                    {machine.isAvailable ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {isRtl ? 'جاهزة للعمل' : 'Disponible'}
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        {isRtl ? 'في ورش كراء نشط' : 'En location'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white mb-2 line-clamp-1 group-hover:text-amber-400 transition-colors">
                  {isRtl ? machine.titleAr : machine.titleFr}
                </h3>

                {/* Specs inline */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                  {machine.withOperator && (
                    <>
                      <span>{t('withOperator')}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                    </>
                  )}
                  {machine.hoursOperated > 0 && (
                    <span>{machine.hoursOperated.toLocaleString()} {isRtl ? 'ساعة' : 'h'}</span>
                  )}
                </div>
              </div>

              {/* Pricing & Quick Action */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    {machine.dailyRateMad ? (
                      <div>
                        <span className="text-xs text-slate-500 block">
                          {isRtl ? 'كراء يومي' : 'Location / jour'}
                        </span>
                        <span className="text-lg font-black text-amber-400 tabular-nums">
                          {machine.dailyRateMad.toLocaleString()} {isRtl ? 'درهم' : 'DH'}
                        </span>
                      </div>
                    ) : machine.salePriceMad ? (
                      <div>
                        <span className="text-xs text-slate-500 block">
                          {isRtl ? 'سعر البيع' : 'Prix de vente'}
                        </span>
                        <span className="text-lg font-black text-white tabular-nums">
                          {machine.salePriceMad.toLocaleString()} {isRtl ? 'درهم' : 'DH'}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  {machine.salePriceMad && machine.dailyRateMad && (
                    <div className="text-right rtl:text-left text-[11px] text-slate-400">
                      <span>{isRtl ? 'أو بيع:' : 'Ou vente :'} </span>
                      <span className="text-white font-bold tabular-nums">
                        {machine.salePriceMad.toLocaleString()} DH
                      </span>
                    </div>
                  )}
                </div>

                {/* Dual Buttons: WhatsApp direct + Details */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={(e) => handleWhatsAppDirect(e, machine)}
                    className="py-2 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>واتساب</span>
                  </button>

                  <button
                    onClick={() => setSelectedMachine(machine)}
                    className="py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>{t('viewDetails')}</span>
                    {isRtl ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {filteredMachines.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800">
            <p className="text-slate-400 text-sm mb-3">
              {isRtl ? 'لم نجد آلات تطابق معايير البحث الحالية' : 'Aucun engin ne correspond à vos critères.'}
            </p>
            <button
              onClick={() => {
                setSelectedCity('');
                setSearchQuery('');
                setListingTypeFilter('all');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
            >
              {t('resetFilters')}
            </button>
          </div>
        )}

      </div>

      {/* Detail & Booking Modal */}
      <MachineDetailModal
        machine={selectedMachine}
        onClose={() => setSelectedMachine(null)}
        onOpenChat={onOpenChat}
      />
    </section>
  );
};

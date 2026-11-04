import React, { useState } from 'react';
import { Machine } from '../../types/database.types';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useDatabase } from '../../context/DatabaseContext';
import { MachinerySvg } from '../common/MachinerySvg';
import { X, MapPin, Phone, ShieldCheck, Calendar, Clock, Check, MessageSquare, Calculator } from 'lucide-react';

interface MachineDetailModalProps {
  machine: Machine | null;
  onClose: () => void;
  onOpenChat: (convId: string) => void;
}

export const MachineDetailModal: React.FC<MachineDetailModalProps> = ({ machine, onClose, onOpenChat }) => {
  const { t, isRtl } = useLanguage();
  const { user, setShowRegisterModal } = useAuth();
  const { createBooking, startConversation } = useDatabase();

  const [rentalDays, setRentalDays] = useState(5);
  const [withOperator, setWithOperator] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [projectSite, setProjectSite] = useState('');

  if (!machine) return null;

  const dailyRate = machine.dailyRateMad || 2000;
  const calculatedTotal = dailyRate * rentalDays;

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `السلام عليكم، أتواصل معك بخصوص إعلان: ${machine.titleAr} (${machine.brand} ${machine.model}) المعروض في منصة JADIJCB في مدينة ${machine.city}.`
    );
    const phone = machine.ownerPhone.replace(/[^\d+]/g, '');
    window.open(`https://wa.me/${phone.replace('+', '')}?text=${text}`, '_blank');
  };

  const handleStartInternalChat = () => {
    if (!user) {
      setShowRegisterModal(true);
      return;
    }
    const initialText = `السلام عليكم، أود الاستفسار عن كراء ${machine.titleAr} في ورش العمل بمدينة ${machine.city}.`;
    const convId = startConversation(
      machine.id,
      machine.titleAr,
      machine.ownerId,
      machine.ownerName,
      user.id,
      user.fullName,
      initialText
    );
    onClose();
    onOpenChat(convId);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setShowRegisterModal(true);
      return;
    }

    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + rentalDays * 24 * 3600 * 1000);

    createBooking({
      machineId: machine.id,
      machineTitle: machine.titleAr,
      ownerId: machine.ownerId,
      clientId: user.id,
      clientName: user.fullName,
      clientPhone: user.phoneNumber,
      projectCity: machine.city,
      projectSiteDetails: projectSite || `ورش بناء بمدينة ${machine.city}`,
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
      rentalRateType: 'daily',
      unitRateMad: dailyRate,
      totalUnits: rentalDays,
      totalAmountMad: calculatedTotal,
      depositMad: Math.round(calculatedTotal * 0.2), // 20% standard deposit in Morocco
      notes: withOperator ? 'مع السائق' : 'بدون سائق',
    });

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100 my-8"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 end-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Strip */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded bg-amber-500 text-slate-950 font-black text-xs uppercase">
            {machine.brand} · {machine.model}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span>{machine.city}</span>
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {t('yearMade')} {machine.yearOfManufacture}
          </span>
          {machine.hoursOperated > 0 && (
            <span className="text-xs text-slate-400 font-mono">
              {t('hoursCount')} {machine.hoursOperated} h
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-black text-white mb-4">
          {isRtl ? machine.titleAr : machine.titleFr}
        </h2>

        {/* Grid: Image graphic & specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Machine Graphic Box */}
          <div className="relative rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 p-4 h-64 flex items-center justify-center overflow-hidden">
            <MachinerySvg type={machine.category} className="w-full h-full object-contain filter drop-shadow-lg" />
            <div className="absolute bottom-3 start-3 px-2 py-1 rounded bg-slate-950/80 text-[11px] text-amber-400 font-bold border border-slate-800 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{isRtl ? 'فحص تقني معتمد' : 'Contrôle technique OK'}</span>
            </div>
          </div>

          {/* Pricing & Owner Card */}
          <div className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              {/* Rental Price */}
              {machine.dailyRateMad && (
                <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">
                      {isRtl ? 'السومة الكرائية اليومية' : 'Tarif de location journalier'}
                    </span>
                    <span className="text-2xl font-black text-amber-400 tabular-nums">
                      {machine.dailyRateMad.toLocaleString()} {isRtl ? 'درهم / يوم' : 'DH / Jour'}
                    </span>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 font-bold">
                    {machine.withOperator ? t('withOperator') : t('withoutOperator')}
                  </span>
                </div>
              )}

              {/* Sale Price */}
              {machine.salePriceMad && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">
                      {isRtl ? 'ثمن البيع النهائي' : 'Prix de vente direct'}
                    </span>
                    <span className="text-xl font-black text-white tabular-nums">
                      {machine.salePriceMad.toLocaleString()} {isRtl ? 'درهم' : 'DH'}
                    </span>
                  </div>
                  {machine.isNegotiable && (
                    <span className="text-[11px] text-emerald-400 font-medium">
                      {t('negotiable')}
                    </span>
                  )}
                </div>
              )}

              {/* Owner Info */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">{isRtl ? 'مالك الآلة:' : 'Propriétaire :'}</span>
                  <span className="font-bold text-white">{machine.ownerName}</span>
                </div>
                {machine.ownerCompany && (
                  <div className="flex items-center justify-between text-slate-400">
                    <span>{isRtl ? 'الشركة:' : 'Société :'}</span>
                    <span>{machine.ownerCompany}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-slate-400">
                  <span>{isRtl ? 'المدينة:' : 'Ville :'}</span>
                  <span className="text-amber-400 font-medium">{machine.city}</span>
                </div>
              </div>
            </div>

            {/* Direct Contact CTAs */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={handleWhatsAppInquiry}
                className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{isRtl ? 'واتساب المالك' : 'WhatsApp direct'}</span>
              </button>

              <button
                onClick={handleStartInternalChat}
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
              >
                <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                <span>{isRtl ? 'مراسلة داخلية' : 'Chat interne'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            {isRtl ? 'المواصفات الفنية وتفاصيل العرض' : 'Spécifications et description'}
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
            {isRtl ? machine.descriptionAr : machine.descriptionFr}
          </p>
        </div>

        {/* Interactive Rental Booking & Calculator Form (If rentable) */}
        {machine.dailyRateMad && (
          <form onSubmit={handleConfirmBooking} className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-amber-500" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  {isRtl ? 'حاسبة وحجز الكراء المباشر' : 'Simulateur & Réservation directe'}
                </h4>
              </div>
              <div className="text-xs text-amber-400 font-bold tabular-nums">
                {isRtl ? `المجموع التقديري: ${calculatedTotal.toLocaleString()} درهم` : `Total estimé : ${calculatedTotal.toLocaleString()} DH`}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  {isRtl ? 'عدد أيام الكراء' : 'Nombre de jours'}
                </label>
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={rentalDays}
                  onChange={(e) => setRentalDays(Number(e.target.value) || 1)}
                  className="w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white tabular-nums focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  {isRtl ? 'عنوان ورش العمل' : 'Chantier de destination'}
                </label>
                <input
                  type="text"
                  required
                  value={projectSite}
                  onChange={(e) => setProjectSite(e.target.value)}
                  placeholder={isRtl ? 'مثال: مشروع سيدي معروف، كازا' : 'Ex: Chantier Sidi Maârouf, Casa'}
                  className="w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/20"
                >
                  {bookingSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-slate-950" />
                      <span>{isRtl ? 'تم إرسال طلب الحجز بنجاح!' : 'Demande envoyée !'}</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>{t('btnBookNow')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

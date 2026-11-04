import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useDatabase } from '../../context/DatabaseContext';
import { Booking } from '../../types/database.types';
import { Clock, MapPin, Phone, CheckCircle2, AlertCircle, FileText, Calendar } from 'lucide-react';

export const BookingsTracker: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const { bookings, updateBookingStatus } = useDatabase();
  const [now, setNow] = useState(Date.now());

  // Update timer ticks every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 10000);
    return () => clearInterval(timer);
  }, []);

  const getRemainingTime = (endTimeIso: string) => {
    const end = new Date(endTimeIso).getTime();
    const diff = end - now;

    if (diff <= 0) {
      return { expired: true, text: isRtl ? 'انتهت مدة العقد' : 'Contrat expiré' };
    }

    const totalHours = Math.floor(diff / (1000 * 3600));
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;

    if (days > 0) {
      return {
        expired: false,
        text: `${days} ${t('daysRemaining')} و ${hours} ${t('trialHours')}`,
        days,
        hours,
      };
    }
    return {
      expired: false,
      text: `${hours} ${t('hoursRemaining')}`,
      days: 0,
      hours,
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-white">
            {t('activeRentalTitle')}
          </h3>
          <p className="text-xs text-slate-400">
            {isRtl ? 'تتبع فوري لمواعيد إرجاع الآلات والمستحقات المالية في ورشات العمل' : 'Suivi en temps réel des restitutions et paiements'}
          </p>
        </div>
        <div className="text-xs text-amber-400 font-bold tabular-nums">
          {bookings.filter((b) => b.status === 'active').length} {isRtl ? 'عقود نشطة حالياً' : 'contrats actifs'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {bookings.map((b) => {
          const countdown = getRemainingTime(b.endTime);

          return (
            <div
              key={b.id}
              className={`p-5 rounded-2xl border transition-all ${
                b.status === 'active'
                  ? 'bg-slate-900 border-amber-500/40 shadow-lg'
                  : 'bg-slate-900/50 border-slate-800'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {b.machineTitle}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="text-amber-400 font-medium">{b.clientName}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-500" />
                      {b.projectCity}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${
                    b.status === 'active'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : b.status === 'pending'
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {b.status === 'active' ? t('contractStatusActive') : b.status}
                </span>
              </div>

              {/* Countdown Timer Strip */}
              {b.status === 'active' && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <Clock className="w-4 h-4 text-amber-500 animate-pulse" />
                    <span className="text-slate-400">{t('timeLeftCountdown')}</span>
                  </div>
                  <div className={`text-xs font-black tabular-nums ${countdown.expired ? 'text-rose-400' : 'text-amber-400'}`}>
                    {countdown.text}
                  </div>
                </div>
              )}

              {/* Financials in MAD */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">
                    {isRtl ? 'السومة' : 'Tarif'}
                  </span>
                  <span className="font-bold text-white tabular-nums">
                    {b.unitRateMad} DH
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">
                    {isRtl ? 'المدة' : 'Durée'}
                  </span>
                  <span className="font-bold text-white tabular-nums">
                    {b.totalUnits} {isRtl ? 'أيام' : 'Jours'}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">
                    {isRtl ? 'المجموع' : 'Total'}
                  </span>
                  <span className="font-bold text-amber-400 tabular-nums">
                    {b.totalAmountMad.toLocaleString()} DH
                  </span>
                </div>
              </div>

              {/* Site Notes */}
              <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 mb-4">
                <span className="font-semibold text-slate-300">{t('projectSite')}</span> {b.projectSiteDetails}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                <a
                  href={`tel:${b.clientPhone.replace(/\s+/g, '')}`}
                  className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <span>{b.clientPhone}</span>
                </a>

                {b.status === 'active' && (
                  <button
                    onClick={() => updateBookingStatus(b.id, 'completed')}
                    className="py-1.5 px-3 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 text-xs font-bold transition-colors cursor-pointer"
                  >
                    {isRtl ? 'تأكيد استرجاع الآلة' : 'Confirmer restitution'}
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

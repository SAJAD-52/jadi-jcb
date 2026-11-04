import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle2, Clock, Sparkles, ArrowLeft, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';

interface WelcomeModalProps {
  onGoToDashboard: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onGoToDashboard }) => {
  const { t, isRtl } = useLanguage();
  const { showWelcomeModal, setShowWelcomeModal, user, trialHoursLeft } = useAuth();

  if (!showWelcomeModal) return null;

  const handleCta1Continue = () => {
    setShowWelcomeModal(false);
    onGoToDashboard();
  };

  const handleCta2Skip = () => {
    setShowWelcomeModal(false);
    onGoToDashboard();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100 overflow-hidden"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Subtle decorative construction pattern */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Header Icon */}
        <div className="flex justify-center mb-5">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/25">
              <Sparkles className="w-8 h-8 text-slate-950" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-slate-900">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-black text-white tracking-tight mb-2">
            {t('welcomeTitle')}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
            {t('welcomeSubtitle')}
          </p>
        </div>

        {/* 72-Hour Free Trial Spotlight Card */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 mb-6 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">
              {isRtl ? 'رقم الهاتف المسجل:' : 'Numéro enregistré :'}
            </span>
            <span className="text-amber-400 font-bold font-mono">
              {user?.phoneNumber || '+212 6...'}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">
              {isRtl ? 'الرصيد التجريبي المجاني:' : 'Crédit d\'essai gratuit :'}
            </span>
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold tabular-nums">
              <Clock className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>72 {t('trialHours')} (3 {isRtl ? 'أيام كاملة' : 'jours'})</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-900 flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              {isRtl
                ? 'يمكنك الآن نشر آلاتك، استلام طلبات الكراء، وتتبع الأسطول بدون أي قيود.'
                : 'Vous pouvez désormais publier vos engins et recevoir des demandes sans restriction.'}
            </span>
          </div>
        </div>

        {/* The Two Mandatory CTAs */}
        <div className="space-y-3">
          {/* CTA 1: "إنشاء حساب ومتابعة" / "Créer un compte et continuer" */}
          <button
            onClick={handleCta1Continue}
            className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <span>{t('welcomeCta1')}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>

          {/* CTA 2: "تخطي واستكشاف لوحة التحكم" / "Passer et explorer le tableau de bord" */}
          <button
            onClick={handleCta2Skip}
            className="w-full py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-700/50"
          >
            <span>{t('welcomeCta2')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

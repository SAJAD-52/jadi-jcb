import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Lock, Phone, CreditCard, CheckCircle2, ShieldAlert, Sparkles, Building2, Copy, Check } from 'lucide-react';

export const SoftLockModal: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const { showSoftLockModal, setShowSoftLockModal, user, upgradeSubscription, restoreActiveTrial } = useAuth();
  const [copied, setCopied] = React.useState(false);

  if (!showSoftLockModal) return null;

  const ribNumber = '007 780 0001234567890123 45';

  const handleCopyRib = () => {
    navigator.clipboard.writeText(ribNumber.replace(/\s+/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppReceipt = () => {
    const text = encodeURIComponent(
      `السلام عليكم إدارة JADIJCB، أرسل لكم وصل تجديد اشتراك أسطول الآليات لرقم الهاتف: ${user?.phoneNumber || ''}`
    );
    window.open(`https://wa.me/212661482910?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-amber-500/50 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Soft Lock Badge */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-lg">
            <Lock className="w-7 h-7 text-amber-500" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-black text-white tracking-tight">
            {t('softLockTitle')}
          </h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            {t('softLockSubtitle')}
          </p>
        </div>

        {/* Pricing Offer */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-slate-900 border border-amber-500/30 mb-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-amber-400 font-bold uppercase block">
              {isRtl ? 'اشتراك أصحاب الأساطيل السنوي' : 'Abonnement Annuel Flotte'}
            </span>
            <span className="text-lg font-black text-white tabular-nums">
              990 {isRtl ? 'درهم / سنة' : 'DH / An'}
            </span>
          </div>
          <span className="text-[11px] px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-black">
            {isRtl ? 'عروض غير محدودة' : 'Illimité'}
          </span>
        </div>

        {/* Bank & Wafacash Details for Offline Moroccan Payment */}
        <div className="space-y-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs mb-6">
          <div className="flex items-center gap-2 text-slate-300 font-bold border-b border-slate-800 pb-2">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>{t('bankTransferTitle')}</span>
          </div>

          <div>
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span>{t('bankRibLabel')}</span>
              <button
                onClick={handleCopyRib}
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? (isRtl ? 'تم النسخ' : 'Copié') : (isRtl ? 'نسخ RIB' : 'Copier')}</span>
              </button>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-amber-300 font-bold text-center tracking-wider text-xs select-all">
              {ribNumber}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {t('bankBeneficiary')}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-900">
            <span className="text-slate-400 block mb-0.5">{t('wafacashLabel')}</span>
            <span className="text-slate-200 font-semibold">{t('wafacashValue')}</span>
          </div>
        </div>

        {/* WhatsApp Receipt Submission Button */}
        <button
          onClick={handleWhatsAppReceipt}
          className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-colors cursor-pointer mb-3"
        >
          <Phone className="w-4 h-4" />
          <span>{t('softLockWhatsAppBtn')}</span>
        </button>

        {/* Simulation / Dev Unlocks for easy testing */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-800 text-[11px]">
          <button
            onClick={() => upgradeSubscription()}
            className="text-amber-400 hover:text-amber-300 underline font-semibold cursor-pointer"
          >
            {t('softLockSimulatePayment')}
          </button>
          <button
            onClick={() => restoreActiveTrial()}
            className="text-slate-400 hover:text-white cursor-pointer"
          >
            {isRtl ? 'إعادة ضبط 72 ساعة' : 'Réinitialiser 72h'}
          </button>
          <button
            onClick={() => setShowSoftLockModal(false)}
            className="text-slate-500 hover:text-slate-300 cursor-pointer"
          >
            {isRtl ? 'إغلاق مؤقت' : 'Fermer'}
          </button>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Phone, ArrowLeft, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export const CtaBanner: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const { registerWithPhone, setShowRegisterModal } = useAuth();
  const [quickPhone, setQuickPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPhone.trim()) {
      setShowRegisterModal(true);
      return;
    }
    setLoading(true);
    try {
      await registerWithPhone(quickPhone, '123456', 'مالك أسطول جديد', 'owner', 'الدار البيضاء');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="pricing" className="py-16 bg-slate-950 border-b border-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/40 p-8 sm:p-12 overflow-hidden shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Copy (7 cols) */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold mb-4">
                <Clock className="w-3.5 h-3.5 animate-pulse" />
                <span>{isRtl ? 'عرض الانطلاق بالمغرب: 72 ساعة تجربة مجانية كاملة' : 'Offre Maroc : 72h d\'essai gratuit'}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
                {isRtl ? 'هل تملك آليات بناء ثقيلة؟ شغل أسطولك بأعلى عائد' : 'Propriétaire d\'engins lourds ? Rentabilisez votre matériel'}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 max-w-xl">
                {isRtl
                  ? 'انضم إلى مئات أصحاب المعدات بالمغرب. اعرض جرافاتك وحفاراتك للكراء باليوم أو البيع المباشر، وتلقى طلبات المقاولين فورياً على الواتساب وبدون عمولات.'
                  : 'Rejoignez des centaines de loueurs et propriétaires d\'engins au Maroc. Publiez vos pelleteuses et chargeuses et recevez des demandes directes sans commission.'}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>{isRtl ? 'تسجيل برقم الواتساب فقط' : 'Numéro WhatsApp uniquement'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>{isRtl ? 'بدون التزام أو بطاقة بنكية' : 'Sans carte bancaire'}</span>
                </div>
              </div>
            </div>

            {/* Quick Registration Form (5 cols) */}
            <div className="lg:col-span-5 bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-sm font-bold text-white mb-2">
                {t('heroWhatsAppDirect')}
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                {isRtl ? 'أدخل رقم هاتفك وسيتم تفعيل لوحة التحكم فورياً:' : 'Saisissez votre numéro pour activer votre accès :'}
              </p>

              <form onSubmit={handleQuickSubmit} className="space-y-3">
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-slate-500">
                    <Phone className="w-4 h-4 text-amber-500" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={quickPhone}
                    onChange={(e) => setQuickPhone(e.target.value)}
                    placeholder="0661234567"
                    className="w-full ps-10 pe-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 tabular-nums"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Phone className="w-4 h-4" />
                  <span>{t('btnStartFreeTrial')}</span>
                  {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </form>

              <div className="mt-3 text-center">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(true)}
                  className="text-[11px] text-amber-400/90 hover:text-amber-300 underline cursor-pointer"
                >
                  {isRtl ? 'أو اختر تخصيص بيانات الشركة والمدينة أولاً' : 'Ou renseigner la société et la ville'}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

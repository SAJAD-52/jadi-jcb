import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { MachinerySvg } from '../common/MachinerySvg';
import { Phone, CheckCircle2, Clock, MapPin, ArrowLeft, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

interface HeroSectionProps {
  onExploreMarketplace: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreMarketplace }) => {
  const { t, isRtl } = useLanguage();
  const { setShowRegisterModal } = useAuth();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-slate-900 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950">
      {/* Background Subtle Industrial Glow */}
      <div className="absolute top-0 start-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Moroccan BTP Trust Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>{t('heroBadge')}</span>
          </div>
        </div>

        {/* 2-Column Split: Hero Headline & CTAs on Left/Right, Interactive JCB Hero Visual on Adjacent */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Main Copy (7 cols) */}
          <div className="lg:col-span-7 text-center lg:text-start rtl:lg:text-right">
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.2] mb-5 text-balance">
              {t('heroTitlePart1')}{' '}
              <span className="text-amber-500 underline decoration-amber-500/40 decoration-4 underline-offset-8">
                {t('heroTitleHighlight')}
              </span>{' '}
              {t('heroTitlePart2')}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8 font-normal">
              {t('heroSubtitle')}
            </p>

            {/* Strategic High-Converting CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 justify-center lg:justify-start mb-6">
              {/* Primary CTA: "جرب مجاناً لمدة 3 أيام" */}
              <button
                onClick={() => setShowRegisterModal(true)}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm tracking-tight transition-all shadow-xl shadow-amber-500/20 hover:scale-[1.02] flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-slate-950" />
                <span>{t('heroCtaPrimary')}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

              {/* Secondary CTA: "استكشف الآلات المتاحة" */}
              <button
                onClick={onExploreMarketplace}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-sm transition-all border border-slate-700/80 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>{t('heroCtaSecondary')}</span>
              </button>
            </div>

            {/* Micro-Trust Guarantees */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500" />
                <span>{isRtl ? 'بدون بطاقة بنكية' : 'Sans carte bancaire'}</span>
              </div>
              <span className="text-slate-700">·</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>{isRtl ? '72 ساعة تجربة كاملة لجميع الميزات' : '72h d\'essai gratuit complet'}</span>
              </div>
              <span className="text-slate-700">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{isRtl ? 'تسجيل فوري برقم الواتساب فقط' : 'Numéro WhatsApp uniquement'}</span>
              </div>
            </div>

          </div>

          {/* Interactive JCB Machinery Visual Showcase Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl p-5 overflow-hidden jcb-glow">
              
              {/* Machine Header Strip */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 text-[11px] font-bold rounded bg-amber-500 text-slate-950 uppercase tracking-wider">
                    JCB 3CX Eco
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {isRtl ? 'جاهزة للكراء الفوري' : 'Disponible de suite'}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>{isRtl ? 'الدار البيضاء' : 'Casablanca'}</span>
                </div>
              </div>

              {/* Machinery Graphic Container */}
              <div className="relative h-56 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800/80 flex items-center justify-center p-4 overflow-hidden group">
                <MachinerySvg type="jcb_3cx" className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300" />
                
                {/* Floating Operator Badge */}
                <div className="absolute bottom-3 start-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-sm border border-slate-800 text-[11px] text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('withOperator')} (12 سنة خبرة)</span>
                </div>
              </div>

              {/* Dual Rate Breakdown */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-medium">
                    {isRtl ? 'السومة الكرائية اليومية' : 'Tarif Location / Jour'}
                  </span>
                  <span className="text-base font-black text-amber-400 tabular-nums">
                    1,900 {isRtl ? 'درهم' : 'DH'}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-medium">
                    {isRtl ? 'سعر البيع المباشر' : 'Prix de Vente Direct'}
                  </span>
                  <span className="text-base font-black text-white tabular-nums">
                    620,000 {isRtl ? 'درهم' : 'DH'}
                  </span>
                </div>
              </div>

              {/* Quick Action Button */}
              <div className="mt-3">
                <button
                  onClick={() => setShowRegisterModal(true)}
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{t('btnRegisterWhatsApp')}</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

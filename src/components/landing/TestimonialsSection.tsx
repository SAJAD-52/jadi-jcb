import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { t, isRtl } = useLanguage();

  return (
    <section className="py-20 border-b border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-wider block mb-2">
            {isRtl ? 'شهادات مهنيي البناء' : 'Témoignages Clients'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {t('testimonialsTitle')}
          </h2>
        </div>

        {/* 2 Verified Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Testimonial 1 */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 relative">
            <Quote className="w-8 h-8 text-amber-500/20 mb-4" />
            <p className="text-sm text-slate-200 leading-relaxed mb-6 italic">
              "{t('testimonial1Text')}"
            </p>
            <div className="flex items-center gap-3 border-t border-slate-800/80 pt-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 text-xs">
                {isRtl ? 'ح.ر' : 'RA'}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{t('testimonial1Author')}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </h4>
                <p className="text-[11px] text-slate-400">{t('testimonial1Role')}</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 relative">
            <Quote className="w-8 h-8 text-amber-500/20 mb-4" />
            <p className="text-sm text-slate-200 leading-relaxed mb-6 italic">
              "{t('testimonial2Text')}"
            </p>
            <div className="flex items-center gap-3 border-t border-slate-800/80 pt-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 text-xs">
                {isRtl ? 'ك.م' : 'KM'}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{t('testimonial2Author')}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </h4>
                <p className="text-[11px] text-slate-400">{t('testimonial2Role')}</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

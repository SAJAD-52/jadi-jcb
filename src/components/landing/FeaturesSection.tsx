import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { LayoutDashboard, ArrowLeftRight, Wrench, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const { t, isRtl } = useLanguage();

  const features = [
    {
      index: '01',
      title: t('feature1Title'),
      desc: t('feature1Desc'),
      icon: LayoutDashboard,
      highlight: isRtl ? 'مؤقت تنازلي للعقود' : 'Compte à rebours',
    },
    {
      index: '02',
      title: t('feature2Title'),
      desc: t('feature2Desc'),
      icon: ArrowLeftRight,
      highlight: isRtl ? 'تسعير مزدوج (يومي / بيع)' : 'Tarification duale',
    },
    {
      index: '03',
      title: t('feature3Title'),
      desc: t('feature3Desc'),
      icon: Wrench,
      highlight: isRtl ? 'شهادة منشأ أصلية' : 'Certificat d\'origine',
    },
    {
      index: '04',
      title: t('feature4Title'),
      desc: t('feature4Desc'),
      icon: MessageSquare,
      highlight: isRtl ? 'تحويل فوري للواتساب' : 'Bascule WhatsApp',
    },
  ];

  return (
    <section className="py-20 border-b border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-wider block mb-2">
            {isRtl ? 'الحلول الرقمية المتكاملة لقطاع BTP' : 'Plateforme Digitale Intégrée'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
            {isRtl ? 'مصممة خصيصاً لتحديات المقاولين وأصحاب الآليات بالمغرب' : 'Conçue pour les Entreprises et Propriétaires d\'Engins au Maroc'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {t('taglineSubtitle')}
          </p>
        </div>

        {/* Features 4-Column Grid with Editorial Indexes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.index}
                className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-amber-500" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-600">
                      {feat.index}.
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {feat.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-semibold text-amber-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>{feat.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Truck, MapPin, Building, Percent } from 'lucide-react';

export const TrustProofSection: React.FC = () => {
  const { t, isRtl } = useLanguage();

  const stats = [
    {
      icon: Truck,
      value: t('statActiveMachines'),
      desc: t('statActiveMachinesDesc'),
    },
    {
      icon: MapPin,
      value: t('statRegionsCount'),
      desc: t('statRegionsDesc'),
    },
    {
      icon: Building,
      value: t('statContractors'),
      desc: t('statContractorsDesc'),
    },
    {
      icon: Percent,
      value: t('statCommission'),
      desc: t('statCommissionDesc'),
    },
  ];

  return (
    <section className="py-12 border-b border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="flex flex-col p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-amber-500/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight tabular-nums mb-1">
                  {item.value}
                </h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

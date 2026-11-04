import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, Phone, MapPin, Wrench, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, isRtl } = useLanguage();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Brand & Moroccan Mission */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center font-black text-slate-950 text-sm">
                JCB
              </div>
              <span className="text-lg font-black text-white">
                JADI<span className="text-amber-500">JCB</span> Maroc
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {t('taglineSubtitle')}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{isRtl ? 'عقود كراء رقمية مطابقة لمعايير BTP' : 'Contrats BTP conformes'}</span>
            </div>
          </div>

          {/* Col 2: Moroccan Cities Covered */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>{isRtl ? 'المدن والجهات المخدومة' : 'Villes & Régions'}</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>{isRtl ? 'الدار البيضاء الكبرى (سيدي البرنوصي / المحمدية)' : 'Casablanca & Mohammedia'}</li>
              <li>{isRtl ? 'طنجة وميناء طنجة المتوسط' : 'Tanger & Tanger Med Port'}</li>
              <li>{isRtl ? 'مراكش والجهة الجنوبية' : 'Marrakech & Sud'}</li>
              <li>{isRtl ? 'الرباط، سلا والقنيطرة' : 'Rabat, Salé & Kénitra'}</li>
              <li>{isRtl ? 'أكادير وسوس ماسة' : 'Agadir & Souss-Massa'}</li>
            </ul>
          </div>

          {/* Col 3: Key Machinery & Spare Parts */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-amber-500" />
              <span>{isRtl ? 'الآليات وقطع الغيار' : 'Engins & Pièces'}</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>JCB 3CX Eco Turbo (Retrochargeuse)</li>
              <li>Komatsu & CAT Pelles Hydrauliques</li>
              <li>Chargeuses sur pneus (966H / WA380)</li>
              <li>Télescopiques JCB 540-170 (17m)</li>
              <li>{isRtl ? 'مضخات وفلاتر JCB الأصلية' : 'Pièces d\'origine JCB & Perkins'}</li>
            </ul>
          </div>

          {/* Col 4: Contact & Verification */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{isRtl ? 'الدعم وخدمة المقاولين' : 'Support BTP Maroc'}</span>
            </h4>
            <div className="space-y-2 text-xs">
              <p className="text-slate-300 font-medium">WhatsApp Direct: +212 661 482 910</p>
              <p className="text-slate-400">Casablanca Business Hub, Maroc</p>
              <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-900">
                <span>ICE: 002938102000041</span> · <span>RC Casa: 593021</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{t('footerRights')}</p>
          <p className="text-center sm:text-right text-[11px] text-slate-600">
            {t('footerNotice')}
          </p>
        </div>
      </div>
    </footer>
  );
};

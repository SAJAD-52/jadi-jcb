import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { X, Phone, Lock, User, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { UserRole } from '../../types/database.types';

export const RegisterModal: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const { showRegisterModal, setShowRegisterModal, registerWithPhone } = useAuth();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [city, setCity] = useState('الدار البيضاء');
  const [role, setRole] = useState<UserRole>('owner');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!showRegisterModal) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Phone validation for Moroccan numbers (+212 / 06 / 07)
    const cleanPhone = phone.trim().replace(/[\s-]/g, '');
    if (cleanPhone.length < 9) {
      setError(isRtl ? 'يرجى إدخال رقم هاتف أو واتساب مغربي صحيح (مثال: 0661234567)' : 'Veuillez saisir un numéro marocain valide (ex: 0661234567)');
      return;
    }

    if (!password || password.length < 4) {
      setError(isRtl ? 'كلمة المرور يجب أن تتكون من 4 أحرف أو أرقام على الأقل' : 'Mot de passe de 4 caractères minimum requis');
      return;
    }

    setLoading(true);
    try {
      await registerWithPhone(cleanPhone, password, fullName, role, city);
    } catch {
      setError(isRtl ? 'حدث خطأ أثناء التسجيل، يرجى المحاولة ثانية' : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowRegisterModal(false)}
          className="absolute top-5 end-5 p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 mb-3 font-black text-xl">
            JCB
          </div>
          <h3 className="text-xl font-black text-white tracking-tight">
            {t('registerTitle')}
          </h3>
          <p className="text-xs text-slate-400 mt-1.5">
            {t('registerSubtitle')}
          </p>
        </div>

        {/* Benefits Strip */}
        <div className="flex items-center justify-between p-3 mb-6 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{isRtl ? 'فترة تجريبية 72 ساعة مجانية' : 'Essai 72h gratuit'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{isRtl ? 'بدون بريد إلكتروني' : 'Sans email'}</span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Phone / WhatsApp (PRIMARY REQUIRED FIELD) */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {t('phoneLabel')} <span className="text-amber-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-slate-500">
                <Phone className="w-4 h-4 text-amber-500" />
              </div>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t('phonePlaceholder')}
                className="w-full ps-10 pe-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 tabular-nums"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {isRtl ? 'سيتم ربط طلبات الكراء مباشرة برقم الواتساب هذا' : 'Les demandes de location arriveront directement sur ce numéro'}
            </p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {t('passwordLabel')} <span className="text-amber-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-slate-500">
                <Lock className="w-4 h-4 text-amber-500" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('passwordPlaceholder')}
                className="w-full ps-10 pe-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Full Name / Company Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {t('fullNameLabel')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-slate-500">
                  <User className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t('fullNamePlaceholder')}
                  className="w-full ps-10 pe-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {t('cityLabel')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-slate-500">
                  <MapPin className="w-4 h-4 text-slate-400" />
                </div>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full ps-10 pe-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="الدار البيضاء">الدار البيضاء (Casablanca)</option>
                  <option value="طنجة">طنجة (Tanger)</option>
                  <option value="مراكش">مراكش (Marrakech)</option>
                  <option value="الرباط">الرباط (Rabat)</option>
                  <option value="أكادير">أكادير (Agadir)</option>
                  <option value="فاس">فاس (Fès)</option>
                  <option value="وجدة">وجدة (Oujda)</option>
                  <option value="العيون">العيون (Laâyoune)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Role selector */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {t('selectRole')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('owner')}
                className={`p-3 text-xs rounded-xl border text-center transition-all ${
                  role === 'owner'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {t('roleOwner')}
              </button>

              <button
                type="button"
                onClick={() => setRole('client')}
                className={`p-3 text-xs rounded-xl border text-center transition-all ${
                  role === 'client'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {t('roleClient')}
              </button>
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? '...' : t('btnSubmitRegister')}
          </button>
        </form>

        <p className="text-center text-[11px] text-slate-500 mt-4 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{isRtl ? 'حماية بياناتك مضمونة وفق القانون المغربي 09-08' : 'Conforme à la loi marocaine 09-08 sur les données'}</span>
        </p>
      </div>
    </div>
  );
};

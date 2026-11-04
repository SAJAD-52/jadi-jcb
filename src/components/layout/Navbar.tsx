import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Shield, Clock, Globe, User, PhoneCall, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'marketplace' | 'dashboard' | 'map';
  setCurrentView: (view: 'landing' | 'marketplace' | 'dashboard' | 'map') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView }) => {
  const { language, toggleLanguage, t, isRtl } = useLanguage();
  const {
    user,
    isAuthenticated,
    isTrialActive,
    trialHoursLeft,
    setShowRegisterModal,
    logout,
    switchDemoUser,
  } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      {/* Top Bar 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark (Single Element) */}
        <button
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-2.5 text-left rtl:text-right cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center font-black text-slate-950 text-xl tracking-tighter shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            JCB
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-white flex items-center gap-1 whitespace-nowrap">
              JADI<span className="text-amber-500">JCB</span>
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 border border-amber-500/30">
                MA
              </span>
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 Concise Single-Line Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => setCurrentView('marketplace')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-400 ${
              currentView === 'marketplace' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            {t('navMarketplace')}
          </button>

          <button
            onClick={() => setCurrentView('map')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-400 ${
              currentView === 'map' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            {t('navMoroccoMap')}
          </button>

          <button
            onClick={() => setCurrentView('dashboard')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-400 flex items-center gap-1.5 ${
              currentView === 'dashboard' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-amber-500" />
            {t('navOwnerDashboard')}
          </button>

          <a
            href="#pricing"
            onClick={(e) => {
              if (currentView !== 'landing') {
                e.preventDefault();
                setCurrentView('landing');
                setTimeout(() => {
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="transition-colors whitespace-nowrap shrink-0 hover:text-amber-400"
          >
            {t('navPricing')}
          </a>
        </nav>

        {/* Zone 3: Actions & Language Switcher */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Toggle: Arabic / French */}
          <button
            onClick={toggleLanguage}
            title={language === 'ar' ? 'Passer en Français' : 'التحويل إلى العربية'}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-colors whitespace-nowrap shrink-0"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'ar' ? 'Français' : 'العربية'}</span>
          </button>

          {/* User state or Register CTA */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              {/* Trial badge with hours remaining */}
              {isTrialActive && (
                <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 tabular-nums whitespace-nowrap shrink-0">
                  <Clock className="w-3 h-3 text-amber-400 animate-pulse" />
                  <span>
                    {trialHoursLeft} {t('trialHours')} {t('filterRent') === 'للكراء فقط' ? 'تجريبية' : 'essai'}
                  </span>
                </div>
              )}

              {/* Dashboard view shortcut */}
              <button
                onClick={() => setCurrentView('dashboard')}
                className="px-3.5 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors shadow-sm flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{user.fullName.split(' ')[0]}</span>
                <span className="sm:hidden">{t('navOwnerDashboard')}</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowRegisterModal(true)}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors shadow-md shadow-amber-500/15 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t('btnStartFreeTrial')}</span>
            </button>
          )}

          {/* Quick role switch for demo / evaluation */}
          <div className="hidden xl:flex items-center border-s border-slate-800 ps-3 gap-1">
            <span className="text-[11px] text-slate-500 whitespace-nowrap">دور:</span>
            <button
              onClick={() => switchDemoUser('owner')}
              className={`text-[11px] px-1.5 py-0.5 rounded ${
                user?.role === 'owner' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              مالك
            </button>
            <button
              onClick={() => switchDemoUser('client')}
              className={`text-[11px] px-1.5 py-0.5 rounded ${
                user?.role === 'client' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              مكتري
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};

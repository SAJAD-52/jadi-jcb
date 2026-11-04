import React, { useState } from 'react';
import { useLanguage } from './context/LanguageContext';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/landing/HeroSection';
import { TrustProofSection } from './components/landing/TrustProofSection';
import { MarketplacePreview } from './components/landing/MarketplacePreview';
import { MoroccoMapSection } from './components/landing/MoroccoMapSection';
import { FeaturesSection } from './components/landing/FeaturesSection';
import { TestimonialsSection } from './components/landing/TestimonialsSection';
import { CtaBanner } from './components/landing/CtaBanner';
import { OwnerDashboard } from './components/dashboard/OwnerDashboard';
import { RegisterModal } from './components/auth/RegisterModal';
import { WelcomeModal } from './components/auth/WelcomeModal';
import { SoftLockModal } from './components/auth/SoftLockModal';

export const AppContent: React.FC = () => {
  const { isRtl } = useLanguage();
  const [currentView, setCurrentView] = useState<'landing' | 'marketplace' | 'dashboard' | 'map'>('landing');
  const [selectedCityFilter, setSelectedCityFilter] = useState('');
  const [activeChatConvId, setActiveChatConvId] = useState<string | undefined>(undefined);

  const handleCitySelect = (cityName: string) => {
    setSelectedCityFilter(cityName);
    setCurrentView('marketplace');
  };

  const handleOpenChat = (convId: string) => {
    setActiveChatConvId(convId);
    setCurrentView('dashboard');
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans ${isRtl ? 'text-right' : 'text-left'}`}>
      {/* 3-Zone Top Bar Navigation */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <>
            <HeroSection onExploreMarketplace={() => setCurrentView('marketplace')} />
            <TrustProofSection />
            <MarketplacePreview initialCityFilter={selectedCityFilter} onOpenChat={handleOpenChat} />
            <MoroccoMapSection onSelectCityFilter={handleCitySelect} />
            <FeaturesSection />
            <TestimonialsSection />
            <CtaBanner />
          </>
        )}

        {currentView === 'marketplace' && (
          <div className="py-8">
            <MarketplacePreview initialCityFilter={selectedCityFilter} onOpenChat={handleOpenChat} />
          </div>
        )}

        {currentView === 'map' && (
          <div className="py-8">
            <MoroccoMapSection onSelectCityFilter={handleCitySelect} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
              <MarketplacePreview initialCityFilter={selectedCityFilter} onOpenChat={handleOpenChat} />
            </div>
          </div>
        )}

        {currentView === 'dashboard' && (
          <OwnerDashboard
            onExplorePublicMarketplace={() => setCurrentView('marketplace')}
            activeChatConvId={activeChatConvId}
          />
        )}
      </main>

      {/* Moroccan BTP Footer */}
      <Footer />

      {/* Modals & Flow Controls */}
      <RegisterModal />
      <WelcomeModal onGoToDashboard={() => setCurrentView('dashboard')} />
      <SoftLockModal />
    </div>
  );
};

export const App: React.FC = () => {
  return <AppContent />;
};

export default App;

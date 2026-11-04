import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile, SubscriptionStatus, UserRole } from '../types/database.types';

interface AuthContextType {
  user: Profile | null;
  isAuthenticated: boolean;
  isTrialActive: boolean;
  trialHoursLeft: number;
  trialMinutesLeft: number;
  isSoftLocked: boolean;
  showWelcomeModal: boolean;
  setShowWelcomeModal: (show: boolean) => void;
  showRegisterModal: boolean;
  setShowRegisterModal: (show: boolean) => void;
  showSoftLockModal: boolean;
  setShowSoftLockModal: (show: boolean) => void;
  registerWithPhone: (phoneNumber: string, password: string, fullName: string, role: UserRole, city: string) => Promise<boolean>;
  loginWithPhone: (phoneNumber: string, password: string) => Promise<boolean>;
  logout: () => void;
  upgradeSubscription: () => void;
  simulateTrialExpiration: () => void;
  restoreActiveTrial: () => void;
  switchDemoUser: (role: UserRole) => void;
}

const DEFAULT_DEMO_OWNER: Profile = {
  id: 'usr-owner-001',
  phoneNumber: '+212 661-482910',
  fullName: 'الحاج بوشعيب الزاكي (أشغال الأطلس)',
  companyName: 'STE ATLAS ENGINS SARL',
  iceNumber: '001928374000082',
  rcNumber: 'RC 49201 Casablanca',
  city: 'Casablanca',
  role: 'owner',
  subscriptionStatus: 'trial',
  trialEndsAt: new Date(Date.now() + 68 * 3600 * 1000).toISOString(), // ~68 hours left in trial
  isVerified: true,
  whatsappDirect: '+212661482910',
  createdAt: new Date().toISOString(),
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(() => {
    const saved = localStorage.getItem('jadijcb_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_DEMO_OWNER;
      }
    }
    return DEFAULT_DEMO_OWNER;
  });

  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSoftLockModal, setShowSoftLockModal] = useState(false);
  const [trialTimeRemaining, setTrialTimeRemaining] = useState({ hours: 72, minutes: 0 });

  // Save user changes to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('jadijcb_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('jadijcb_user');
    }
  }, [user]);

  // Real-time trial countdown calculation
  useEffect(() => {
    if (!user || !user.trialEndsAt) return;

    const calculateRemaining = () => {
      const now = new Date().getTime();
      const end = new Date(user.trialEndsAt).getTime();
      const diffMs = end - now;

      if (diffMs <= 0) {
        setTrialTimeRemaining({ hours: 0, minutes: 0 });
        if (user.subscriptionStatus === 'trial') {
          // Trigger soft lock when trial finishes
          setUser((prev) => prev ? { ...prev, subscriptionStatus: 'locked' } : null);
          setShowSoftLockModal(true);
        }
      } else {
        const totalMinutes = Math.floor(diffMs / (1000 * 60));
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        setTrialTimeRemaining({ hours, minutes });
      }
    };

    calculateRemaining();
    const interval = setInterval(calculateRemaining, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, [user]);

  const isAuthenticated = !!user;
  const isSoftLocked = user?.subscriptionStatus === 'locked' || user?.subscriptionStatus === 'expired';
  const isTrialActive = user?.subscriptionStatus === 'trial' && trialTimeRemaining.hours >= 0;

  // Simplified Onboarding with phone number only (NO email required)
  const registerWithPhone = async (
    phoneNumber: string,
    _password: string,
    fullName: string,
    role: UserRole,
    city: string
  ): Promise<boolean> => {
    // 72 hours trial starts now
    const trialEndsAt = new Date(Date.now() + 72 * 3600 * 1000).toISOString();

    const newProfile: Profile = {
      id: `usr-${Date.now()}`,
      phoneNumber: phoneNumber.trim(),
      fullName: fullName.trim() || 'مقاول جديد',
      companyName: role === 'owner' ? `شركة ${fullName.trim()} للآليات` : 'مقاولة BTP',
      city: city || 'الدار البيضاء',
      role,
      subscriptionStatus: 'trial',
      trialEndsAt,
      isVerified: false,
      whatsappDirect: phoneNumber.replace(/\s+/g, ''),
      createdAt: new Date().toISOString(),
    };

    setUser(newProfile);
    setShowRegisterModal(false);
    // Display welcome modal with the two required CTAs
    setShowWelcomeModal(true);
    return true;
  };

  const loginWithPhone = async (phoneNumber: string, _password: string): Promise<boolean> => {
    if (user && user.phoneNumber === phoneNumber) {
      return true;
    }
    // Demo auto-login
    const loggedProfile: Profile = {
      ...DEFAULT_DEMO_OWNER,
      phoneNumber,
    };
    setUser(loggedProfile);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  // Simulating Admin verification of manual bank transfer (RIB / Wafacash)
  const upgradeSubscription = () => {
    if (!user) return;
    setUser({
      ...user,
      subscriptionStatus: 'active',
      isVerified: true,
    });
    setShowSoftLockModal(false);
  };

  // Simulation controls for testing the 72h soft lock
  const simulateTrialExpiration = () => {
    if (!user) return;
    setUser({
      ...user,
      subscriptionStatus: 'locked',
      trialEndsAt: new Date(Date.now() - 3600 * 1000).toISOString(),
    });
    setShowSoftLockModal(true);
  };

  const restoreActiveTrial = () => {
    if (!user) return;
    setUser({
      ...user,
      subscriptionStatus: 'trial',
      trialEndsAt: new Date(Date.now() + 72 * 3600 * 1000).toISOString(),
    });
    setShowSoftLockModal(false);
  };

  const switchDemoUser = (role: UserRole) => {
    if (role === 'owner') {
      setUser(DEFAULT_DEMO_OWNER);
    } else if (role === 'client') {
      setUser({
        id: 'usr-client-002',
        phoneNumber: '+212 662-991100',
        fullName: 'المهندس ياسين تومي (شركة كازا أشغال)',
        companyName: 'CASA TRAVAUX BTP',
        iceNumber: '002819034000019',
        city: 'Casablanca',
        role: 'client',
        subscriptionStatus: 'active',
        trialEndsAt: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString(),
        isVerified: true,
        whatsappDirect: '+212662991100',
        createdAt: new Date().toISOString(),
      });
    } else {
      setUser({
        id: 'usr-admin-003',
        phoneNumber: '+212 600-000000',
        fullName: 'إدارة JADIJCB المركزية',
        companyName: 'JADI JCB SARL AU',
        city: 'Casablanca',
        role: 'admin',
        subscriptionStatus: 'active',
        trialEndsAt: new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString(),
        isVerified: true,
        whatsappDirect: '+212600000000',
        createdAt: new Date().toISOString(),
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isTrialActive,
        trialHoursLeft: trialTimeRemaining.hours,
        trialMinutesLeft: trialTimeRemaining.minutes,
        isSoftLocked,
        showWelcomeModal,
        setShowWelcomeModal,
        showRegisterModal,
        setShowRegisterModal,
        showSoftLockModal,
        setShowSoftLockModal,
        registerWithPhone,
        loginWithPhone,
        logout,
        upgradeSubscription,
        simulateTrialExpiration,
        restoreActiveTrial,
        switchDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

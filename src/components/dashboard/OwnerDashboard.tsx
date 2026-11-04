import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useDatabase } from '../../context/DatabaseContext';
import { MachinerySvg } from '../common/MachinerySvg';
import { BookingsTracker } from './BookingsTracker';
import { ChatModule } from './ChatModule';
import { AddMachineModal } from './AddMachineModal';
import {
  TrendingUp,
  Truck,
  Clock,
  Plus,
  MessageSquare,
  AlertTriangle,
  Lock,
  Sparkles,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Eye,
  Store,
} from 'lucide-react';

interface OwnerDashboardProps {
  onExplorePublicMarketplace: () => void;
  activeChatConvId?: string;
}

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ onExplorePublicMarketplace, activeChatConvId }) => {
  const { t, isRtl } = useLanguage();
  const {
    user,
    isTrialActive,
    trialHoursLeft,
    trialMinutesLeft,
    isSoftLocked,
    setShowSoftLockModal,
    simulateTrialExpiration,
    restoreActiveTrial,
  } = useAuth();

  const { machines, bookings, updateMachine, deleteMachine } = useDatabase();

  const [activeTab, setActiveTab] = useState<'fleet' | 'bookings' | 'messages' | 'storefront'>(
    activeChatConvId ? 'messages' : 'fleet'
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Financial calculations
  const myMachines = machines.filter((m) => m.ownerId === user?.id || user?.role === 'admin');
  const activeBookings = bookings.filter((b) => b.ownerId === user?.id && b.status === 'active');
  const totalRevenue = bookings
    .filter((b) => b.ownerId === user?.id && (b.status === 'active' || b.status === 'completed'))
    .reduce((acc, b) => acc + b.totalAmountMad, 0);

  const utilizationRate = myMachines.length > 0
    ? Math.round((activeBookings.length / myMachines.length) * 100)
    : 0;

  const handleToggleAvailability = (machineId: string, current: boolean) => {
    updateMachine(machineId, { isAvailable: !current });
  };

  return (
    <div className="py-8 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Soft Lock Alert Banner if Trial Expired */}
        {isSoftLocked && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/40 text-rose-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-rose-400 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white">
                  {t('softLockTitle')}
                </h4>
                <p className="text-xs text-rose-300/80">
                  {isRtl ? 'الميزات مقيدة جزئياً. أتمم الاشتراك البنكي للمتابعة دون انقطاع.' : 'Fonctionnalités restreintes. Veuillez régler votre abonnement.'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSoftLockModal(true)}
              className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors shrink-0 cursor-pointer shadow-md"
            >
              {t('trialUpgradeBtn')}
            </button>
          </div>
        )}

        {/* 72-Hour Active Trial Notice Strip */}
        {isTrialActive && !isSoftLocked && (
          <div className="mb-6 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-amber-300">
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>
                {t('trialBannerNotice')}{' '}
                <strong className="font-mono text-amber-400 font-bold tabular-nums">
                  {trialHoursLeft} {t('trialHours')} و {trialMinutesLeft} دقيقة
                </strong>{' '}
                {isRtl ? 'لاكتشاف كافة الميزات.' : 'pour tester toutes les options.'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSoftLockModal(true)}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] transition-colors cursor-pointer"
              >
                {t('trialUpgradeBtn')}
              </button>
              {/* Test mode button for evaluating the soft lock */}
              <button
                onClick={simulateTrialExpiration}
                title="Test 72h expiration"
                className="px-2 py-1 text-[10px] text-slate-400 hover:text-white underline cursor-pointer"
              >
                {isRtl ? 'محاكاة انتهاء 72 ساعة' : 'Simuler expiration'}
              </button>
            </div>
          </div>
        )}

        {/* Dashboard Header & Profile */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-900">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {t('dashboardTitle')}
              </h1>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">
                {isRtl ? 'موثق BTP' : 'Vérifié BTP'}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {user?.fullName} · {user?.companyName || 'أشغال المغرب'} · {user?.city}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>{t('btnAddMachine')}</span>
            </button>
          </div>
        </div>

        {/* Split View: Financial Metrics Row (4 Metrics adhering to strict tabular discipline) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* Revenue */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">{t('metricTotalRevenue')}</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white tabular-nums">
              {totalRevenue.toLocaleString()}{' '}
              <span className="text-xs font-normal text-slate-400">{isRtl ? 'درهم' : 'DH'}</span>
            </div>
            <span className="text-[10px] text-emerald-400 mt-1 block">
              {isRtl ? 'مدفوعات مؤمنة ومباشرة' : 'Paiements directs vérifiés'}
            </span>
          </div>

          {/* Active Rentals */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">{t('metricActiveRentals')}</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-amber-400 tabular-nums">
              {activeBookings.length}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {isRtl ? 'عقود جارية في الورش' : 'En activité sur chantier'}
            </span>
          </div>

          {/* Fleet Size */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">{t('metricFleetSize')}</span>
              <Truck className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-white tabular-nums">
              {myMachines.length}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {isRtl ? 'آلات ومعدات مسجلة' : 'Engins enregistrés'}
            </span>
          </div>

          {/* Fleet Utilization Rate */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">{t('metricUtilization')}</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-emerald-400 tabular-nums">
              {utilizationRate}%
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {isRtl ? 'كفاءة تشغيل الأسطول' : 'Taux d\'occupation'}
            </span>
          </div>

        </div>

        {/* Dashboard Tabs Control */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-6 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('fleet')}
            className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'fleet'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>{t('tabMyMachines')} ({myMachines.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'bookings'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{t('tabActiveBookings')} ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'messages'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t('tabMessages')}</span>
          </button>

          <button
            onClick={() => setActiveTab('storefront')}
            className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'storefront'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>{t('tabStorefront')}</span>
          </button>
        </div>

        {/* Tab 1: Fleet Management */}
        {activeTab === 'fleet' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myMachines.map((mach) => (
                <div
                  key={mach.id}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    {/* Top strip */}
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                      <span className="font-bold text-amber-400 uppercase">
                        {mach.brand} · {mach.model}
                      </span>
                      <span className="flex items-center gap-1 text-slate-300">
                        <MapPin className="w-3 h-3 text-amber-500" />
                        {mach.city}
                      </span>
                    </div>

                    {/* Machine Graphic */}
                    <div className="h-36 rounded-xl bg-slate-950 border border-slate-800/80 p-2 mb-3 flex items-center justify-center">
                      <MachinerySvg type={mach.category} className="w-full h-full object-contain" />
                    </div>

                    <h4 className="text-sm font-bold text-white mb-2">
                      {isRtl ? mach.titleAr : mach.titleFr}
                    </h4>

                    {/* Rates */}
                    <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                      {mach.dailyRateMad && (
                        <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                          <span className="text-[10px] text-slate-500 block">
                            {isRtl ? 'كراء يومي' : 'Location/j'}
                          </span>
                          <span className="font-black text-amber-400 tabular-nums">
                            {mach.dailyRateMad.toLocaleString()} DH
                          </span>
                        </div>
                      )}
                      {mach.salePriceMad && (
                        <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                          <span className="text-[10px] text-slate-500 block">
                            {isRtl ? 'بيع مباشر' : 'Vente'}
                          </span>
                          <span className="font-black text-white tabular-nums">
                            {mach.salePriceMad.toLocaleString()} DH
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions: Toggle availability, delete */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <button
                      onClick={() => handleToggleAvailability(mach.id, mach.isAvailable)}
                      className="flex items-center gap-1.5 text-slate-300 hover:text-white cursor-pointer"
                    >
                      {mach.isAvailable ? (
                        <>
                          <ToggleRight className="w-5 h-5 text-emerald-400" />
                          <span className="text-[11px] text-emerald-400">{isRtl ? 'متاحة للطلب' : 'Actif'}</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-5 h-5 text-slate-600" />
                          <span className="text-[11px] text-slate-500">{isRtl ? 'غير متوفرة حالياً' : 'Indisponible'}</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => deleteMachine(mach.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Delete machine"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {myMachines.length === 0 && (
              <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
                <p className="text-slate-400 text-xs mb-3">
                  {isRtl ? 'لم تقم بإضافة أي آلات بعد.' : 'Aucun engin enregistré pour le moment.'}
                </p>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
                >
                  {t('btnAddMachine')}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Bookings & Live Timers */}
        {activeTab === 'bookings' && <BookingsTracker />}

        {/* Tab 3: Real-Time Messaging */}
        {activeTab === 'messages' && <ChatModule activeConversationId={activeChatConvId} />}

        {/* Tab 4: Storefront Builder Preview */}
        {activeTab === 'storefront' && (
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-black text-white">
                  {isRtl ? 'المتجر والكتالوج الرقمي لأسطولك' : 'Vitrine Digitale de Votre Flotte'}
                </h3>
                <p className="text-xs text-slate-400">
                  {isRtl ? 'رابط مباشر يمكنك مشاركته مع الزبائن والشركات عبر الواتساب' : 'Lien direct à partager avec vos clients'}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-slate-950 font-mono text-xs text-amber-400">
                https://jadijcb.ma/store/{user?.phoneNumber.replace(/\D/g, '') || 'atlas-btp'}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-3">
              <div className="flex items-center justify-between">
                <span>{isRtl ? 'عدد الآليات المعروضة علناً بالكتالوج:' : 'Engins visibles en vitrine :'}</span>
                <span className="font-bold text-white tabular-nums">{myMachines.length} آلة</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{isRtl ? 'رقم استقبال طلبات الحجز المباشر:' : 'Numéro de réception :'}</span>
                <span className="font-mono text-emerald-400">{user?.phoneNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{isRtl ? 'حالة التوثيق التجاري:' : 'Statut de vérification :'}</span>
                <span className="text-emerald-400 font-bold">
                  {isRtl ? 'معتمد بشهادة BTP المغرب' : 'Certifié BTP Maroc'}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={onExplorePublicMarketplace}
                className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Eye className="w-4 h-4" />
                <span>{isRtl ? 'معاينة كيف يرى المقاولون آلاتك في السوق' : 'Aperçu public sur le marché'}</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Add Machine Modal */}
      <AddMachineModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

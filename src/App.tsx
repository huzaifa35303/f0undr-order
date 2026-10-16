import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesGrid } from './components/ServicesGrid';
import { CostEstimatorCalculator } from './components/CostEstimatorCalculator';
import { ExpressBriefSection } from './components/ExpressBriefSection';
import { Whyf0undrSection } from './components/Whyf0undrSection';
import { Footer } from './components/Footer';
import { OrderWizardModal } from './components/OrderWizardModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { AdminStudioModal } from './components/AdminStudioModal';
import type { Currency, Order, ServiceId } from './types';
import { getAdminSettings } from './utils/storage';
import type { AdminSettings } from './utils/storage';
import { MessageCircle, PlusCircle } from 'lucide-react';


export function App() {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>('USD');
  const [adminSettings, setAdminSettings] = useState<AdminSettings>(getAdminSettings());

  // Modal visibility states
  const [isOrderWizardOpen, setIsOrderWizardOpen] = useState(false);
  const [wizardServiceId, setWizardServiceId] = useState<ServiceId>('websites');
  const [lastSubmittedOrder, setLastSubmittedOrder] = useState<Order | null>(null);

  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [trackerOrderId, setTrackerOrderId] = useState<string>('');

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync admin settings on mount
  useEffect(() => {
    setAdminSettings(getAdminSettings());
  }, []);

  const handleOpenOrderWizard = (serviceId?: ServiceId) => {
    if (serviceId) {
      setWizardServiceId(serviceId);
    }
    setIsOrderWizardOpen(true);
  };

  const handleOpenTracker = (orderId?: string) => {
    if (orderId) {
      setTrackerOrderId(orderId);
    }
    setIsTrackerOpen(true);
  };

  const handleOrderCompleted = (newOrder: Order) => {
    setIsOrderWizardOpen(false);
    setLastSubmittedOrder(newOrder);
  };

  const handleLaunchOrderFromEstimator = (serviceId: ServiceId) => {
    setWizardServiceId(serviceId);
    setIsOrderWizardOpen(true);
  };

  const scrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToExpress = () => {
    const el = document.getElementById('express');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const cleanWhatsapp = adminSettings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className="min-h-screen bg-[#0c0a09] text-stone-100 flex flex-col font-sans selection:bg-orange-600 selection:text-white">
      
      {/* Top Sticky Navbar */}
      <Navbar
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        onOpenOrderWizard={() => handleOpenOrderWizard()}
        onOpenTracker={() => handleOpenTracker()}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenEstimator={scrollToCalculator}
        onOpenExpressBrief={scrollToExpress}
        adminWhatsappNumber={adminSettings.whatsappNumber}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onOpenOrderWizard={handleOpenOrderWizard}
          onOpenTracker={() => handleOpenTracker()}
          onOpenExpressBrief={scrollToExpress}
        />

        {/* 2. 8-Domain Services Grid */}
        <ServicesGrid
          currentCurrency={currentCurrency}
          onCurrencyChange={setCurrentCurrency}
          onSelectServiceToOrder={(serviceId) => handleOpenOrderWizard(serviceId)}
        />

        {/* 3. Real-Time Cost & Timeline Estimator */}
        <CostEstimatorCalculator
          currentCurrency={currentCurrency}
          onCurrencyChange={setCurrentCurrency}
          onLaunchOrderWithConfig={handleLaunchOrderFromEstimator}
        />

        {/* 4. 60-Second Express Brief */}
        <ExpressBriefSection
          currentCurrency={currentCurrency}
          adminWhatsappNumber={adminSettings.whatsappNumber}
          onOrderCreated={(order) => {
            setLastSubmittedOrder(order);
          }}
        />

        {/* 5. Why Choose f0undr Atelier */}
        <Whyf0undrSection />
      </main>

      {/* Footer */}
      <Footer
        onSelectService={(serviceId) => handleOpenOrderWizard(serviceId)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenTracker={() => handleOpenTracker()}
        onOpenEstimator={scrollToCalculator}
        adminWhatsappNumber={adminSettings.whatsappNumber}
      />

      {/* MODALS */}

      {/* 1. Order Wizard Modal */}
      <OrderWizardModal
        isOpen={isOrderWizardOpen}
        onClose={() => setIsOrderWizardOpen(false)}
        initialServiceId={wizardServiceId}
        currentCurrency={currentCurrency}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* 2. Order Success Modal */}
      <OrderSuccessModal
        order={lastSubmittedOrder}
        onClose={() => setLastSubmittedOrder(null)}
        onTrackOrder={(orderId) => {
          setLastSubmittedOrder(null);
          handleOpenTracker(orderId);
        }}
        adminWhatsappNumber={adminSettings.whatsappNumber}
      />

      {/* 3. Live Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        initialOrderId={trackerOrderId}
        currentCurrency={currentCurrency}
        adminWhatsappNumber={adminSettings.whatsappNumber}
      />

      {/* 4. Admin Studio Cockpit Modal */}
      <AdminStudioModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        currentCurrency={currentCurrency}
        onSettingsUpdated={(newSettings) => setAdminSettings(newSettings)}
      />

      {/* Floating Action Button on Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <a
          href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('Hello Huzaifa! I am interested in placing an order with f0undr.')}`}
          target="_blank"
          rel="noreferrer"
          className="p-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/40 hover:scale-105 transition-all flex items-center justify-center cursor-pointer"
          title="Direct WhatsApp to Huzaifa"
        >
          <MessageCircle className="w-5 h-5" />
        </a>

        <button
          onClick={() => handleOpenOrderWizard()}
          className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs shadow-xl shadow-orange-600/40 hover:scale-105 transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Order</span>
        </button>
      </div>

    </div>
  );
}

export default App;

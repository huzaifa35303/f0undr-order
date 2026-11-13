import { useState, useEffect, useCallback } from 'react';
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
import { SiteMapModal } from './components/SiteMapModal';
import type { Currency, Order, ServiceId } from './types';
import { getAdminSettings } from './utils/storage';
import type { AdminSettings } from './utils/storage';
import { MessageCircle, PlusCircle, Map } from 'lucide-react';

export function App() {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>('USD');
  const [adminSettings, setAdminSettings] = useState<AdminSettings>(getAdminSettings());

  const [isOrderWizardOpen, setIsOrderWizardOpen] = useState(false);
  const [wizardServiceId, setWizardServiceId] = useState<ServiceId>('websites');
  const [lastSubmittedOrder, setLastSubmittedOrder] = useState<Order | null>(null);

  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [trackerOrderId, setTrackerOrderId] = useState<string>('');

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSiteMapOpen, setIsSiteMapOpen] = useState(false);

  const scrollToCalculator = useCallback(() => {
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToExpress = useCallback(() => {
    const el = document.getElementById('express');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleOpenOrderWizard = useCallback((serviceId?: ServiceId) => {
    if (serviceId) {
      setWizardServiceId(serviceId);
    }
    setIsOrderWizardOpen(true);
  }, []);

  const handleOpenTracker = useCallback((orderId?: string) => {
    if (orderId) {
      setTrackerOrderId(orderId);
    }
    setIsTrackerOpen(true);
  }, []);

  const handleOrderCompleted = (newOrder: Order) => {
    setIsOrderWizardOpen(false);
    setLastSubmittedOrder(newOrder);
  };

  const handleLaunchOrderFromEstimator = (serviceId: ServiceId) => {
    setWizardServiceId(serviceId);
    setIsOrderWizardOpen(true);
  };

  useEffect(() => {
    setAdminSettings(getAdminSettings());

    const handleRoute = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const view = searchParams.get('view');
      const serviceParam = searchParams.get('service');
      const trackParam = searchParams.get('track');
      const hash = window.location.hash;

      if (view === 'sitemap' || hash === '#sitemap') {
        setIsSiteMapOpen(true);
      } else if (view === 'tracker' || trackParam) {
        handleOpenTracker(trackParam || undefined);
      } else if (view === 'calculator' || hash === '#calculator') {
        scrollToCalculator();
      } else if (view === 'express' || hash === '#express') {
        scrollToExpress();
      } else if (serviceParam) {
        handleOpenOrderWizard(serviceParam as ServiceId);
      }
    };

    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    return () => window.removeEventListener('hashchange', handleRoute);
  }, [handleOpenOrderWizard, handleOpenTracker, scrollToCalculator, scrollToExpress]);

  const cleanWhatsapp = adminSettings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className="min-h-screen bg-[#0c0a09] text-stone-100 flex flex-col font-sans selection:bg-orange-600 selection:text-white">
      <Navbar
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        onOpenOrderWizard={() => handleOpenOrderWizard()}
        onOpenTracker={() => handleOpenTracker()}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenEstimator={scrollToCalculator}
        onOpenExpressBrief={scrollToExpress}
        onOpenSiteMap={() => setIsSiteMapOpen(true)}
        adminWhatsappNumber={adminSettings.whatsappNumber}
      />

      <main className="flex-1">
        <HeroSection
          onOpenOrderWizard={handleOpenOrderWizard}
          onOpenTracker={() => handleOpenTracker()}
          onOpenExpressBrief={scrollToExpress}
        />

        <ServicesGrid
          currentCurrency={currentCurrency}
          onCurrencyChange={setCurrentCurrency}
          onSelectServiceToOrder={(serviceId) => handleOpenOrderWizard(serviceId)}
        />

        <CostEstimatorCalculator
          currentCurrency={currentCurrency}
          onCurrencyChange={setCurrentCurrency}
          onLaunchOrderWithConfig={handleLaunchOrderFromEstimator}
        />

        <ExpressBriefSection
          currentCurrency={currentCurrency}
          adminWhatsappNumber={adminSettings.whatsappNumber}
          onOrderCreated={(order) => {
            setLastSubmittedOrder(order);
          }}
        />

        <Whyf0undrSection />
      </main>

      <Footer
        onSelectService={(serviceId) => handleOpenOrderWizard(serviceId)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenTracker={() => handleOpenTracker()}
        onOpenEstimator={scrollToCalculator}
        onOpenSiteMap={() => setIsSiteMapOpen(true)}
        adminWhatsappNumber={adminSettings.whatsappNumber}
      />

      <OrderWizardModal
        isOpen={isOrderWizardOpen}
        onClose={() => setIsOrderWizardOpen(false)}
        initialServiceId={wizardServiceId}
        currentCurrency={currentCurrency}
        onOrderCompleted={handleOrderCompleted}
      />

      <OrderSuccessModal
        order={lastSubmittedOrder}
        onClose={() => setLastSubmittedOrder(null)}
        onTrackOrder={(orderId) => {
          setLastSubmittedOrder(null);
          handleOpenTracker(orderId);
        }}
        adminWhatsappNumber={adminSettings.whatsappNumber}
      />

      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        initialOrderId={trackerOrderId}
        currentCurrency={currentCurrency}
        adminWhatsappNumber={adminSettings.whatsappNumber}
      />

      <AdminStudioModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        currentCurrency={currentCurrency}
        onSettingsUpdated={(newSettings) => setAdminSettings(newSettings)}
      />

      <SiteMapModal
        isOpen={isSiteMapOpen}
        onClose={() => setIsSiteMapOpen(false)}
        currentCurrency={currentCurrency}
        onSelectService={(serviceId) => handleOpenOrderWizard(serviceId)}
        onOpenEstimator={scrollToCalculator}
        onOpenExpressBrief={scrollToExpress}
        onOpenTracker={() => handleOpenTracker()}
        onOpenAdmin={() => setIsAdminOpen(true)}
        adminWhatsappNumber={adminSettings.whatsappNumber}
      />

      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsSiteMapOpen(true)}
          className="p-3.5 rounded-full bg-stone-900/90 hover:bg-stone-850 border border-stone-700/80 text-orange-400 hover:text-orange-300 shadow-xl shadow-black/40 hover:scale-105 transition-all flex items-center justify-center cursor-pointer"
          title="Open Studio Site Map & SEO Directory"
          aria-label="Open Site Map"
        >
          <Map className="w-5 h-5" />
        </button>

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

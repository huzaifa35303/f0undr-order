import React from 'react';
import { 
  PlusCircle, 
  Search, 
  ShieldCheck, 
  MessageCircle, 
  Calculator, 
  Zap,
  Menu,
  X,
  Phone
} from 'lucide-react';

import type { Currency } from '../types';
import { SUPPORTED_CURRENCIES } from '../data/f0undrConfig';

interface NavbarProps {
  currentCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  onOpenOrderWizard: () => void;
  onOpenTracker: () => void;
  onOpenAdmin: () => void;
  onOpenEstimator: () => void;
  onOpenExpressBrief: () => void;
  adminWhatsappNumber: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  onCurrencyChange,
  onOpenOrderWizard,
  onOpenTracker,
  onOpenAdmin,
  onOpenEstimator,
  onOpenExpressBrief,
  adminWhatsappNumber,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const cleanWhatsappNumber = adminWhatsappNumber.replace(/[^0-9]/g, '');

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-stone-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <a 
              href="#" 
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-700/80 flex items-center justify-center font-serif font-bold text-xl text-stone-100 shadow-md group-hover:border-orange-500/60 group-hover:text-orange-400 transition-all">
                f0
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-2xl tracking-tight text-white flex items-center gap-1">
                  f0undr<span className="text-orange-500 font-sans text-xl">.</span>
                  <span className="text-xs font-mono font-medium px-2 py-0.5 ml-1 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30">
                    Order
                  </span>
                </span>
                <span className="text-[11px] font-mono text-stone-400 tracking-wider uppercase -mt-0.5">
                  Bespoke Studio &amp; Atelier
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-300">
            <a 
              href="#services" 
              className="hover:text-white transition-colors"
            >
              Services (8)
            </a>
            
            <button
              onClick={onOpenEstimator}
              className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-orange-400" />
              <span>Cost Calculator</span>
            </button>

            <button
              onClick={onOpenExpressBrief}
              className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>60s Brief</span>
            </button>

            <button
              onClick={onOpenTracker}
              className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-4 h-4 text-stone-400" />
              <span>Track Order</span>
            </button>

            <button
              onClick={onOpenAdmin}
              className="hover:text-orange-400 text-stone-400 transition-colors flex items-center gap-1 text-xs font-mono cursor-pointer"
              title="Admin Studio Cockpit"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
              <span>Studio Cockpit</span>
            </button>
          </nav>

          {/* Right Controls: Currency & Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* 1-Click Multi-Currency Switcher (Dollars, Pounds, PKR, EUR) */}
            <div className="flex items-center p-0.5 rounded-xl bg-stone-900 border border-stone-800/90 shadow-inner">
              {SUPPORTED_CURRENCIES.map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => onCurrencyChange(curr.code)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    currentCurrency === curr.code
                      ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                  }`}
                  title={`${curr.name} (${curr.symbol})`}
                >
                  <span className="opacity-75 mr-0.5">{curr.symbol}</span>
                  <span>{curr.code}</span>
                </button>
              ))}
            </div>

            {/* Direct WhatsApp Quick Chat */}
            <a
              href={`https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent('Hello Huzaifa! I am interested in placing an order with f0undr Studio.')}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/50 hover:text-emerald-300 transition-all text-xs font-mono flex items-center gap-1.5"
              title="Chat with Huzaifa on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden lg:inline">WhatsApp</span>
            </a>

            {/* Direct Discord Tag */}
            <div
              className="px-2.5 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs font-mono flex items-center gap-1.5 select-all"
              title="Huzaifa Discord: king_huzaifa001"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-stone-400 hidden xl:inline">Discord:</span>
              <span className="font-semibold text-indigo-300">king_huzaifa001</span>
            </div>

            {/* Direct Phone Call */}
            <a
              href="tel:03446789261"
              className="p-2 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-300 hover:bg-amber-900/50 hover:text-amber-200 transition-all text-xs font-mono flex items-center gap-1.5 cursor-pointer"
              title="Direct Phone Call: 03446789261"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">03446789261</span>
            </a>



            {/* Primary Order Wizard CTA */}
            <button
              onClick={onOpenOrderWizard}
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-orange-600/20 hover:shadow-orange-600/40 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Start Order</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenOrderWizard}
              className="px-3 py-1.5 rounded-lg bg-orange-600 text-white text-xs font-semibold"
            >
              Order
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-800 bg-stone-950 px-4 pt-3 pb-6 space-y-3">
          <div className="pb-3 border-b border-stone-800 space-y-1.5">
            <span className="text-[11px] font-mono text-stone-400 block uppercase">
              Choose Currency (Dollars, Pounds, PKR):
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {SUPPORTED_CURRENCIES.map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => onCurrencyChange(curr.code)}
                  className={`py-2 px-1 rounded-xl text-xs font-mono font-bold text-center transition-all ${
                    currentCurrency === curr.code
                      ? 'bg-orange-600 text-white shadow-md'
                      : 'bg-stone-900 border border-stone-800 text-stone-300'
                  }`}
                >
                  <div>{curr.symbol}</div>
                  <div className="text-[10px] text-stone-400">{curr.code}</div>
                </button>
              ))}
            </div>
          </div>

          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-stone-300 py-2 hover:text-orange-400"
          >
            All Services (8)
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenEstimator();
            }}
            className="flex items-center gap-2 w-full text-left text-sm font-medium text-stone-300 py-2 hover:text-orange-400"
          >
            <Calculator className="w-4 h-4 text-orange-400" />
            <span>Interactive Cost Calculator</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenExpressBrief();
            }}
            className="flex items-center gap-2 w-full text-left text-sm font-medium text-stone-300 py-2 hover:text-orange-400"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>60-Second Express Brief</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTracker();
            }}
            className="flex items-center gap-2 w-full text-left text-sm font-medium text-stone-300 py-2 hover:text-orange-400"
          >
            <Search className="w-4 h-4 text-stone-400" />
            <span>Track Existing Order</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAdmin();
            }}
            className="flex items-center gap-2 w-full text-left text-xs font-mono text-stone-400 py-2 hover:text-orange-400"
          >
            <ShieldCheck className="w-4 h-4 text-stone-500" />
            <span>Admin Studio Cockpit</span>
          </button>

          <div className="pt-2 space-y-2">
            <a
              href={`https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent('Hello Huzaifa! I want to order a project from f0undr Studio.')}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp: +92 344 6789261</span>
            </a>

            <div className="w-full py-2 px-3 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs font-mono flex items-center justify-center gap-2 select-all">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span>Discord: <strong>king_huzaifa001</strong></span>
            </div>

            <a
              href="tel:03446789261"
              className="w-full py-2.5 rounded-lg bg-amber-600/20 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Direct: 03446789261</span>
            </a>
          </div>


        </div>
      )}
    </header>
  );
};

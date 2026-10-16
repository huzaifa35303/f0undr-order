import React, { useState } from 'react';
import { 
  Calculator, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Check,
  CreditCard
} from 'lucide-react';
import type { Currency, ServiceId, ServiceTier, TimelineUrgency } from '../types';

import { SERVICES_DATA, TIER_CONFIG, URGENCY_CONFIG } from '../data/servicesData';
import { formatPrice } from '../utils/currency';
import { SUPPORTED_CURRENCIES } from '../data/f0undrConfig';

interface CostEstimatorCalculatorProps {
  currentCurrency: Currency;
  onCurrencyChange?: (currency: Currency) => void;
  onLaunchOrderWithConfig: (serviceId: ServiceId, tier: ServiceTier, urgency: TimelineUrgency) => void;
}

export const CostEstimatorCalculator: React.FC<CostEstimatorCalculatorProps> = ({
  currentCurrency,
  onCurrencyChange,
  onLaunchOrderWithConfig,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceId>('websites');
  const [selectedTier, setSelectedTier] = useState<ServiceTier>('pro');
  const [selectedUrgency, setSelectedUrgency] = useState<TimelineUrgency>('standard');
  const [featureCount, setFeatureCount] = useState<number>(3);
  const [designLevel, setDesignLevel] = useState<'standard' | 'bespoke' | 'luxury'>('bespoke');

  const currentCategory = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];

  const calculateEstimate = () => {
    const base = currentCategory.startingPriceUsd;
    const tierMult = TIER_CONFIG[selectedTier].multiplier;
    const urgencyMult = URGENCY_CONFIG[selectedUrgency].multiplier;
    
    // Average feature cost roughly $180
    const featuresCost = featureCount * 180;

    let designMult = 1.0;
    if (designLevel === 'bespoke') designMult = 1.2;
    if (designLevel === 'luxury') designMult = 1.45;

    const total = ((base * tierMult) + featuresCost) * designMult * urgencyMult;

    // Delivery days
    let days = 10;
    if (selectedTier === 'starter') days = 6;
    if (selectedTier === 'enterprise') days = 20;
    days = days + Math.round(featureCount * 1.5);
    days = Math.round(days * URGENCY_CONFIG[selectedUrgency].daysMultiplier);

    return {
      price: Math.round(total),
      days: Math.max(3, days),
    };
  };

  const estimate = calculateEstimate();

  return (
    <section id="calculator" className="py-20 bg-stone-950 border-t border-stone-900 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[300px] bg-orange-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Scope Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Real-Time Cost &amp; Timeline Estimator
          </h2>
          <p className="text-stone-400 text-base sm:text-lg">
            Simulate your project parameters, adjust architecture depth and sprint urgency, and receive an instant mathematical estimate.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border border-stone-800">
            
            {/* Service Domain */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-2.5">
                1. Commission Domain:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SERVICES_DATA.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => setSelectedServiceId(srv.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedServiceId === srv.id
                        ? 'bg-orange-600/20 border-orange-500 text-white font-semibold'
                        : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <div className="text-xs truncate">{srv.title.split('&')[0]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Architecture Tier */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-2.5">
                2. Architecture &amp; Scale Tier:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['starter', 'pro', 'enterprise'] as ServiceTier[]).map((tierKey) => (
                  <button
                    key={tierKey}
                    onClick={() => setSelectedTier(tierKey)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedTier === tierKey
                        ? 'bg-orange-600/20 border-orange-500 text-white font-bold'
                        : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <div className="text-xs">{TIER_CONFIG[tierKey].name.split('/')[0]}</div>
                    <div className="text-[10px] font-mono text-stone-500 mt-0.5">
                      {TIER_CONFIG[tierKey].multiplier}x scale
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Features Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase tracking-wider text-stone-400">
                  3. Custom Complex Modules:
                </label>
                <span className="text-xs font-mono text-orange-400 font-bold">
                  {featureCount} Modules
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="6"
                step="1"
                value={featureCount}
                onChange={(e) => setFeatureCount(parseInt(e.target.value, 10))}
                className="w-full accent-orange-500 bg-stone-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-stone-500 mt-1">
                <span>Core Only (0)</span>
                <span>Standard (3)</span>
                <span>Max Stack (6+)</span>
              </div>
            </div>

            {/* Design & Motion Fidelity */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-2.5">
                4. Visual Fidelity &amp; Motion Polish:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'standard', label: 'Clean Editorial', sub: 'Minimal & Fast' },
                  { id: 'bespoke', label: 'Bespoke Motion', sub: 'Custom micro-interactions' },
                  { id: 'luxury', label: 'Luxury 3D Studio', sub: 'Shaders & CGI' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setDesignLevel(item.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      designLevel === item.id
                        ? 'bg-orange-600/20 border-orange-500 text-white font-semibold'
                        : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <div className="text-xs">{item.label}</div>
                    <div className="text-[10px] text-stone-500 mt-0.5">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Urgency */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-2.5">
                5. Turnaround Urgency:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['standard', 'rush', 'flexible'] as TimelineUrgency[]).map((urgKey) => (
                  <button
                    key={urgKey}
                    onClick={() => setSelectedUrgency(urgKey)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedUrgency === urgKey
                        ? 'bg-orange-600/20 border-orange-500 text-white font-semibold'
                        : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <div className="text-xs">{URGENCY_CONFIG[urgKey].name.split('/')[0]}</div>
                    <div className="text-[10px] text-stone-500 mt-0.5">{URGENCY_CONFIG[urgKey].badge}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Summary Card (5 cols) */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 border border-orange-500/30 bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 relative space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-400">
                Calculated Estimate
              </span>
              {/* 1-Click Currency Switcher */}
              {onCurrencyChange && (
                <div className="flex items-center p-0.5 rounded-lg bg-stone-950 border border-stone-800 text-[11px] font-mono">
                  {SUPPORTED_CURRENCIES.map((curr) => (
                    <button
                      key={curr.code}
                      type="button"
                      onClick={() => onCurrencyChange(curr.code)}
                      className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                        currentCurrency === curr.code
                          ? 'bg-orange-600 text-white font-bold'
                          : 'text-stone-400 hover:text-white'
                      }`}
                      title={curr.name}
                    >
                      {curr.symbol} {curr.code}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Main Price Readout */}
            <div>
              <span className="text-xs text-stone-400 block mb-1">Target Budget Range</span>
              <div className="text-4xl sm:text-5xl font-mono font-bold text-white tracking-tight flex items-baseline gap-2">
                <span>{formatPrice(estimate.price, currentCurrency)}</span>
                <span className="text-xs font-normal text-stone-500 font-mono">{currentCurrency}</span>
              </div>
              {/* Multi-Currency Equivalents (Dollars, Pounds, PKR) */}
              <div className="text-[11px] font-mono text-stone-400 mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 border-t border-stone-800/60">
                <span className="text-stone-500">Equivalents:</span>
                <span className={currentCurrency === 'USD' ? 'text-orange-400 font-bold' : 'text-stone-300'}>
                  {formatPrice(estimate.price, 'USD')} Dollars
                </span>
                <span className="text-stone-600">·</span>
                <span className={currentCurrency === 'GBP' ? 'text-orange-400 font-bold' : 'text-stone-300'}>
                  {formatPrice(estimate.price, 'GBP')} Pounds
                </span>
                <span className="text-stone-600">·</span>
                <span className={currentCurrency === 'PKR' ? 'text-emerald-400 font-bold' : 'text-emerald-400/80'}>
                  {formatPrice(estimate.price, 'PKR')} PKR
                </span>
              </div>
            </div>

            {/* Payment Escrow Badge */}
            <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between text-stone-300">
                <span className="font-semibold flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-sky-400" />
                  <span>Stripe &amp; PayPal Escrow</span>
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  50% Upfront / 50% Delivery
                </span>
              </div>
              <div className="text-[11px] text-stone-400 flex items-center justify-between pt-1 border-t border-stone-800/60">
                <span>Stripe (Card / Apple Pay)</span>
                <span>•</span>
                <span>PayPal (Buyer Protection)</span>
                <span>•</span>
                <span className="text-emerald-400">Raast / Wire (PKR)</span>
              </div>
            </div>

            {/* Timeline Readout */}
            <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-amber-400" />
                <div>
                  <span className="text-[10px] font-mono uppercase text-stone-500 block">Sprint Turnaround</span>
                  <span className="text-sm font-semibold text-white">~{estimate.days} Business Days</span>
                </div>
              </div>
              <span className="text-xs font-mono text-stone-400">
                {URGENCY_CONFIG[selectedUrgency].name.split('/')[0]}
              </span>
            </div>

            {/* Inclusions */}
            <div className="space-y-2 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-orange-400 shrink-0" />
                <span>100% Repository &amp; Asset Rights Transfer</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Milestone Verification Prior to Deployment</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-orange-400 shrink-0" />
                <span>14 to 30 Days Complimentary Post-Launch Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Direct WhatsApp channel with M.Huzaifa</span>
              </div>
            </div>

            {/* Lock in & Build Button */}
            <button
              onClick={() => onLaunchOrderWithConfig(selectedServiceId, selectedTier, selectedUrgency)}
              className="w-full py-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xl shadow-orange-600/30 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Lock in Estimate &amp; Build Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] font-mono text-stone-500 text-center">
              Estimates are non-binding until architecture spec approval.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};

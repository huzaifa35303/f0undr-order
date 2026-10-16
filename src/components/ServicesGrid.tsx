import React, { useState } from 'react';
import { 
  Globe, 
  Smartphone, 
  Gamepad2, 
  Video, 
  Image as ImageIcon, 
  Megaphone, 
  Wrench, 
  BrainCircuit,
  ArrowRight,
  Check,
  Sparkles,
  Info,
  X
} from 'lucide-react';
import type { Currency, ServiceCategory, ServiceId } from '../types';

import { SERVICES_DATA } from '../data/servicesData';
import { formatPrice } from '../utils/currency';
import { SUPPORTED_CURRENCIES } from '../data/f0undrConfig';

interface ServicesGridProps {
  currentCurrency: Currency;
  onCurrencyChange?: (currency: Currency) => void;
  onSelectServiceToOrder: (serviceId: ServiceId) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  currentCurrency,
  onCurrencyChange,
  onSelectServiceToOrder,
}) => {
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceCategory | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-6 h-6 text-orange-400" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-blue-400" />;
      case 'Gamepad2': return <Gamepad2 className="w-6 h-6 text-purple-400" />;
      case 'Video': return <Video className="w-6 h-6 text-rose-400" />;
      case 'Image': return <ImageIcon className="w-6 h-6 text-amber-400" />;
      case 'Megaphone': return <Megaphone className="w-6 h-6 text-emerald-400" />;
      case 'Wrench': return <Wrench className="w-6 h-6 text-cyan-400" />;
      case 'BrainCircuit': return <BrainCircuit className="w-6 h-6 text-orange-500" />;
      default: return <Sparkles className="w-6 h-6 text-orange-400" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-stone-950/60 border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Atelier Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Commissioned Software &amp; Creative Domains
          </h2>
          <p className="text-stone-400 text-base sm:text-lg mb-6">
            Choose from 8 specialized engineering and creative disciplines. Every engagement includes senior-fellow architecture, strict NDAs, and full intellectual property transfer.
          </p>

          {/* 1-Click Currency Switcher (Dollars, Pounds, PKR) */}
          {onCurrencyChange && (
            <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-stone-900 border border-stone-800 text-xs font-mono">
              <span className="text-stone-500 px-2">Currency:</span>
              {SUPPORTED_CURRENCIES.map((curr) => (
                <button
                  key={curr.code}
                  type="button"
                  onClick={() => onCurrencyChange(curr.code)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    currentCurrency === curr.code
                      ? 'bg-orange-600 text-white shadow-md'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  {curr.symbol} {curr.code} ({curr.shortLabel.split(' ')[0]})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 8-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Accent Line on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header: Icon & Badge */}
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 group-hover:border-stone-700 transition-colors">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-md bg-stone-900/80 border border-stone-800 text-stone-300">
                    {service.estimatedDays}
                  </span>
                </div>

                {/* Title & Price */}
                <h3 className="font-serif font-bold text-xl text-white mb-1 group-hover:text-orange-400 transition-colors">
                  {service.title}
                </h3>
                
                <div className="flex items-baseline gap-1.5 mb-3">
                  <span className="text-xs text-stone-400">From</span>
                  <span className="text-lg font-mono font-bold text-white">
                    {formatPrice(service.startingPriceUsd, currentCurrency)}
                  </span>
                  <span className="text-[11px] text-stone-500 font-mono">{currentCurrency} est.</span>
                </div>

                <p className="text-xs text-stone-400 leading-relaxed mb-5 line-clamp-3">
                  {service.shortDescription}
                </p>

                {/* Deliverables snippet */}
                <div className="space-y-1.5 mb-5 border-t border-stone-800/80 pt-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block mb-1">
                    What's Included:
                  </span>
                  {service.deliverables.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-stone-300">
                      <Check className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                  {service.deliverables.length > 3 && (
                    <span className="text-[11px] text-stone-500 italic block pl-5">
                      + {service.deliverables.length - 3} more deliverables
                    </span>
                  )}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {service.techStack.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-900 text-stone-400 border border-stone-800/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-stone-800/60">
                <button
                  onClick={() => onSelectServiceToOrder(service.id)}
                  className="w-full py-2.5 px-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-orange-600/20 hover:shadow-orange-600/30 transition-all cursor-pointer"
                >
                  <span>Order This Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setSelectedServiceForModal(service)}
                  className="w-full py-1.5 text-[11px] font-mono text-stone-400 hover:text-stone-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Info className="w-3 h-3 text-stone-500" />
                  <span>View Full Specs &amp; Samples</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Detail Specs & Sample Works Modal */}
      {selectedServiceForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedServiceForModal(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-stone-800 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-stone-800 border border-stone-700">
                {getServiceIcon(selectedServiceForModal.iconName)}
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-white">
                  {selectedServiceForModal.title}
                </h3>
                <span className="text-xs font-mono text-orange-400">
                  {selectedServiceForModal.badge}
                </span>
              </div>
            </div>

            <p className="text-sm text-stone-300 leading-relaxed mb-6">
              {selectedServiceForModal.fullDescription}
            </p>

            {/* All Deliverables */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                Guaranteed Deliverables:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedServiceForModal.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-stone-950/60 border border-stone-800 text-xs text-stone-300">
                    <Check className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Add-on Features */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                Available Custom Architecture Modules:
              </h4>
              <div className="space-y-2">
                {selectedServiceForModal.featuresList.map((feature) => (
                  <div key={feature.id} className="p-3 rounded-lg bg-stone-950/70 border border-stone-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white">{feature.name}</span>
                        {feature.popular && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-400">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-400 mt-0.5">{feature.description}</p>
                    </div>
                    <span className="text-xs font-mono text-stone-300 shrink-0">
                      +{formatPrice(feature.estimatedPriceUsd, currentCurrency)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Works */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                Previous Atelier Prototypes &amp; Deployments:
              </h4>
              <div className="space-y-2">
                {selectedServiceForModal.sampleWorks.map((work, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-stone-800/40 border border-stone-800">
                    <h5 className="text-xs font-semibold text-white">{work.title}</h5>
                    <p className="text-[11px] text-stone-400 mt-0.5">{work.description}</p>
                    <div className="flex gap-1.5 mt-2">
                      {work.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-stone-900 text-stone-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="pt-4 border-t border-stone-800 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-stone-400 block">Baseline starting at</span>
                <span className="text-lg font-mono font-bold text-white">
                  {formatPrice(selectedServiceForModal.startingPriceUsd, currentCurrency)}
                </span>
              </div>
              <button
                onClick={() => {
                  const id = selectedServiceForModal.id;
                  setSelectedServiceForModal(null);
                  onSelectServiceToOrder(id);
                }}
                className="py-2.5 px-6 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-medium text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-orange-600/30"
              >
                <span>Launch Order Builder</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

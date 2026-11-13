import React, { useState } from 'react';
import { 
  X, 
  Map, 
  Search, 
  ExternalLink, 
  Sparkles, 
  ArrowRight, 
  Globe, 
  Smartphone, 
  Gamepad2, 
  Video, 
  Image as ImageIcon, 
  Megaphone, 
  Wrench, 
  BrainCircuit, 
  Calculator, 
  Zap, 
  ShieldCheck, 
  MessageCircle, 
  Tag
} from 'lucide-react';
import type { Currency, ServiceId } from '../types';
import { SERVICES_DATA } from '../data/servicesData';
import { SEO_KEYWORDS } from '../data/keywordsData';
import { formatPrice } from '../utils/currency';

interface SiteMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCurrency: Currency;
  onSelectService: (serviceId: ServiceId) => void;
  onOpenEstimator: () => void;
  onOpenExpressBrief: () => void;
  onOpenTracker: () => void;
  onOpenAdmin: () => void;
  adminWhatsappNumber: string;
}

export const SiteMapModal: React.FC<SiteMapModalProps> = ({
  isOpen,
  onClose,
  currentCurrency,
  onSelectService,
  onOpenEstimator,
  onOpenExpressBrief,
  onOpenTracker,
  onOpenAdmin,
  adminWhatsappNumber,
}) => {
  const [keywordFilter, setKeywordFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const getServiceIcon = (id: ServiceId) => {
    switch (id) {
      case 'websites': return <Globe className="w-5 h-5 text-sky-400" />;
      case 'apps': return <Smartphone className="w-5 h-5 text-emerald-400" />;
      case 'games': return <Gamepad2 className="w-5 h-5 text-purple-400" />;
      case 'videos': return <Video className="w-5 h-5 text-rose-400" />;
      case 'images': return <ImageIcon className="w-5 h-5 text-amber-400" />;
      case 'ads': return <Megaphone className="w-5 h-5 text-orange-400" />;
      case 'tools': return <Wrench className="w-5 h-5 text-cyan-400" />;
      case 'ai': return <BrainCircuit className="w-5 h-5 text-orange-500" />;
      default: return <Sparkles className="w-5 h-5 text-orange-400" />;
    }
  };

  const categories = [
    { id: 'all', label: 'All (105)' },
    { id: 'web', label: 'Web & SaaS' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'games', label: 'Games' },
    { id: 'video', label: '3D & Video' },
    { id: 'design', label: 'Design' },
    { id: 'ads', label: 'Ads & CRO' },
    { id: 'tools', label: 'Tools & Scrapers' },
    { id: 'ai', label: 'AI & LLMs' },
    { id: 'commercial', label: 'Studio & Commercial' },
  ];

  const filteredKeywords = SEO_KEYWORDS.filter((k) => {
    const matchesCategory = selectedCategory === 'all' || k.category === selectedCategory;
    const matchesSearch = k.keyword.toLowerCase().includes(keywordFilter.toLowerCase()) ||
                          k.categoryLabel.toLowerCase().includes(keywordFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cleanWhatsapp = adminWhatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl my-8 rounded-3xl bg-stone-950 border border-stone-800 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sitemap-modal-title"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-800 bg-stone-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
              <Map className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="sitemap-modal-title" className="text-xl font-serif font-bold text-white">
                  f0undr Atelier Site Map &amp; Architecture Directory
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  XML + HTML
                </span>
              </div>
              <p className="text-xs text-stone-400 font-mono">
                Index of 8 Commission Departments · Studio Tools · Protocols · 100+ SEO Keywords
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Site Map"
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-stone-300 font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                1. Commission Departments (8 Core Verticals)
              </h3>
              <span className="text-xs font-mono text-stone-500">
                Direct Wizard Jump
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {SERVICES_DATA.map((srv) => (
                <div
                  key={srv.id}
                  className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800/80 hover:border-orange-500/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="p-2 rounded-xl bg-stone-950 border border-stone-800">
                        {getServiceIcon(srv.id)}
                      </div>
                      <span className="text-xs font-mono font-bold text-orange-400">
                        from {formatPrice(srv.startingPriceUsd, currentCurrency)}
                      </span>
                    </div>

                    <h4 className="text-sm font-serif font-bold text-white group-hover:text-orange-300 transition-colors">
                      {srv.title}
                    </h4>
                    <p className="text-[11px] text-stone-400 leading-relaxed mt-1 line-clamp-2">
                      {srv.shortDescription}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-800/60 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-stone-500">
                      {srv.deliverables.length} Deliverables
                    </span>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectService(srv.id);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-orange-600/20 hover:bg-orange-600 text-orange-400 hover:text-white border border-orange-500/30 text-[11px] font-mono font-medium flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <span>Order</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-mono uppercase tracking-wider text-stone-300 font-semibold flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              2. Interactive Studio Utilities &amp; Portals
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div 
                onClick={() => { onClose(); onOpenEstimator(); }}
                className="p-4 rounded-2xl bg-stone-900/40 border border-stone-800 hover:border-orange-500/40 transition-all cursor-pointer group"
              >
                <div className="p-2 rounded-xl bg-stone-950 border border-stone-800 w-fit mb-2.5 text-orange-400">
                  <Calculator className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-serif font-bold text-white group-hover:text-orange-300 transition-colors">
                  Cost Estimator Calculator
                </h4>
                <p className="text-[11px] text-stone-400 mt-1">
                  Dynamic multi-currency cost matrix across tiers and custom add-on features.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-mono text-orange-400 font-medium">
                  Launch Tool <ArrowRight className="w-3 h-3" />
                </span>
              </div>

              <div 
                onClick={() => { onClose(); onOpenExpressBrief(); }}
                className="p-4 rounded-2xl bg-stone-900/40 border border-stone-800 hover:border-orange-500/40 transition-all cursor-pointer group"
              >
                <div className="p-2 rounded-xl bg-stone-950 border border-stone-800 w-fit mb-2.5 text-amber-400">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                  60-Second Express Brief
                </h4>
                <p className="text-[11px] text-stone-400 mt-1">
                  Single-screen quick project intake with automated WhatsApp formatting.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-mono text-amber-400 font-medium">
                  Launch Tool <ArrowRight className="w-3 h-3" />
                </span>
              </div>

              <div 
                onClick={() => { onClose(); onOpenTracker(); }}
                className="p-4 rounded-2xl bg-stone-900/40 border border-stone-800 hover:border-orange-500/40 transition-all cursor-pointer group"
              >
                <div className="p-2 rounded-xl bg-stone-950 border border-stone-800 w-fit mb-2.5 text-sky-400">
                  <Search className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-serif font-bold text-white group-hover:text-sky-300 transition-colors">
                  Live Order Tracker
                </h4>
                <p className="text-[11px] text-stone-400 mt-1">
                  Inspect milestone progress, assigned lead engineer, and delivery timelines.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-mono text-sky-400 font-medium">
                  Track Order <ArrowRight className="w-3 h-3" />
                </span>
              </div>

              <div 
                onClick={() => { onClose(); onOpenAdmin(); }}
                className="p-4 rounded-2xl bg-stone-900/40 border border-stone-800 hover:border-orange-500/40 transition-all cursor-pointer group"
              >
                <div className="p-2 rounded-xl bg-stone-950 border border-stone-800 w-fit mb-2.5 text-stone-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-serif font-bold text-white group-hover:text-orange-300 transition-colors">
                  Studio Cockpit (Admin)
                </h4>
                <p className="text-[11px] text-stone-400 mt-1">
                  Order pipeline management, status transitions, and client channel settings.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-mono text-stone-400 font-medium">
                  Open Studio Cockpit <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-mono uppercase tracking-wider text-stone-300 font-semibold flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              3. Studio Protocols &amp; Verified Channels
            </h3>

            <div className="p-5 rounded-2xl bg-stone-900/30 border border-stone-800/80 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
                <span className="text-stone-400 block mb-1">Direct WhatsApp:</span>
                <a 
                  href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('Hello Huzaifa! I am reviewing the f0undr Atelier sitemap.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>+92 344 6789261</span>
                </a>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
                <span className="text-stone-400 block mb-1">Discord Studio Handle:</span>
                <span className="text-indigo-400 font-bold select-all">king_huzaifa001</span>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
                <span className="text-stone-400 block mb-1">Direct Phone Call:</span>
                <a href="tel:03446789261" className="text-amber-400 font-bold hover:underline">
                  03446789261
                </a>
              </div>
            </div>
          </section>

          <section>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-sm font-mono uppercase tracking-wider text-stone-300 font-semibold flex items-center gap-2">
                  <Tag className="w-4 h-4 text-orange-400" />
                  <span>4. Master Capability &amp; Keyword Taxonomy ({filteredKeywords.length} of {SEO_KEYWORDS.length})</span>
                </h3>
                <p className="text-xs text-stone-500 font-mono mt-0.5">
                  Semantic keywords and services indexed by search engines.
                </p>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={keywordFilter}
                  onChange={(e) => setKeywordFilter(e.target.value)}
                  placeholder="Filter keywords..."
                  className="pl-8 pr-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-orange-500/50 w-full sm:w-48 font-mono"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                    selectedCategory === c.id
                      ? 'bg-orange-600 text-white font-semibold'
                      : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-stone-900/40 border border-stone-800/80 max-h-64 overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {filteredKeywords.map((k, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800 text-[11px] font-mono text-stone-300 hover:border-orange-500/40 hover:text-white transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500/60" />
                    <span>{k.keyword}</span>
                    <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-stone-900 text-stone-500 border border-stone-800">
                      {k.category}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="p-4 rounded-2xl bg-stone-900/20 border border-stone-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-stone-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Canonical Protocol URL: https://f0undr-order.vercel.app/sitemap.xml</span>
            </div>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="text-orange-400 hover:underline flex items-center gap-1"
            >
              <span>View Raw XML Sitemap</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </section>
        </div>

        <div className="px-6 py-4 border-t border-stone-800 bg-stone-900/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
            <span>f0undr Order Atelier Architecture v2.0</span>
            <span>·</span>
            <a 
              href="https://www.f0undrteam.site/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-orange-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Main Website: f0undrteam.site</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-mono font-medium transition-colors cursor-pointer"
          >
            Close Site Map
          </button>
        </div>
      </div>
    </div>
  );
};

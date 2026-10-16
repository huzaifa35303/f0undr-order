import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Shield, 
  Zap, 
  CheckCircle2, 
  MessageSquareQuote,
  Flame,
  Search,
  CreditCard,
  ShieldCheck
} from 'lucide-react';
import type { ServiceId } from '../types';


interface HeroSectionProps {
  onOpenOrderWizard: (serviceId?: ServiceId) => void;
  onOpenTracker: () => void;
  onOpenExpressBrief: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenOrderWizard,
  onOpenTracker,
  onOpenExpressBrief,
}) => {
  const serviceCategories = [
    { id: 'websites' as ServiceId, label: '🌐 Websites' },
    { id: 'apps' as ServiceId, label: '📱 Mobile & Desktop Apps' },
    { id: 'games' as ServiceId, label: '🎮 2D / 3D Games' },
    { id: 'videos' as ServiceId, label: '🎬 4K / 3D Videos' },
    { id: 'images' as ServiceId, label: '🎨 Images & UI/UX' },
    { id: 'ads' as ServiceId, label: '📣 High-ROI Ads' },
    { id: 'tools' as ServiceId, label: '⚙️ Custom Tools & Bots' },
    { id: 'ai' as ServiceId, label: '🧠 Autonomous AI Agents' },
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-grid-pattern">
      {/* Glow Orbs Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-orange-600/15 via-amber-600/10 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-10 w-[300px] h-[250px] bg-orange-700/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Editorial Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-stone-800 text-stone-300 text-xs font-mono mb-8 shadow-xs">
          <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-orange-400 font-semibold">f0undr Atelier Queue:</span>
          <span>Open for Q4 Builds &amp; Priority Sprints</span>
          <span className="text-stone-500">·</span>
          <span className="text-stone-400">Led by M.Huzaifa</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white max-w-5xl mx-auto leading-[1.08] mb-6">
          You Envision It. <br className="hidden sm:block" />
          We <span className="text-gradient-accent">Engineer, Produce &amp; Ship</span> It.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-stone-400 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
          The official commissioned atelier of <strong className="text-stone-200 font-semibold">f0undr</strong>. Place direct orders for bespoke 
          <span className="text-stone-200"> Websites</span>, 
          <span className="text-stone-200"> Mobile Apps</span>, 
          <span className="text-stone-200"> 2D/3D Games</span>, 
          <span className="text-stone-200"> 4K Videos</span>, 
          <span className="text-stone-200"> 3D Renders</span>, 
          <span className="text-stone-200"> Performance Ads</span>, 
          <span className="text-stone-200"> Custom Scrapers/Bots</span>, and 
          <span className="text-stone-200"> Autonomous AI Systems</span>.
        </p>

        {/* Exclusive Order Channels Banner */}
        <div className="mb-10 max-w-2xl mx-auto p-4 rounded-2xl bg-stone-900/90 border border-orange-500/40 shadow-xl shadow-orange-950/30">
          <div className="flex items-center justify-center gap-2 text-xs font-mono font-semibold text-orange-400 uppercase tracking-wider mb-2.5">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            <span>Official Order Policy: 3 Ways to Order Only</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-mono">
            <a
              href="https://wa.me/923446789261?text=Hello%20Huzaifa!%20I%20want%20to%20order%20a%20project%20from%20f0undr."
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/60 transition-all flex items-center gap-1.5 font-bold cursor-pointer"
            >
              <span>💬 WhatsApp:</span>
              <span className="text-white">+92 344 6789261</span>
            </a>

            <div
              className="px-3.5 py-1.5 rounded-xl bg-indigo-950/60 border border-indigo-500/50 text-indigo-300 flex items-center gap-1.5 font-bold select-all"
            >
              <span>🎮 Discord:</span>
              <span className="text-white">king_huzaifa001</span>
            </div>

            <a
              href="tel:03446789261"
              className="px-3.5 py-1.5 rounded-xl bg-amber-950/60 border border-amber-500/50 text-amber-300 hover:bg-amber-900/60 transition-all flex items-center gap-1.5 font-bold cursor-pointer"
            >
              <span>📞 Direct Call:</span>
              <span className="text-white">03446789261</span>
            </a>
          </div>
          <p className="text-[11px] font-mono text-stone-400 mt-2">
            No emails or third-party forms. All commissions must be confirmed directly with Huzaifa through these 3 channels.
          </p>
        </div>

        {/* Currencies & Payment Gateways Ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 max-w-4xl mx-auto mb-10 text-xs font-mono">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900/90 border border-stone-800 text-stone-300 shadow-sm">
            <span className="text-orange-400 font-bold">💱 Currencies:</span>
            <span className="text-white font-medium">Dollars ($ USD)</span>
            <span className="text-stone-600">·</span>
            <span className="text-white font-medium">Pounds (£ GBP)</span>
            <span className="text-stone-600">·</span>
            <span className="text-emerald-400 font-bold">PKR (₨)</span>
            <span className="text-stone-600">·</span>
            <span className="text-stone-400">Euros (€)</span>
          </div>

          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-stone-900/90 border border-stone-800 text-stone-300 shadow-sm">
            <CreditCard className="w-4 h-4 text-sky-400" />
            <span className="text-sky-300 font-bold tracking-wide">Stripe</span>
            <span className="text-stone-500 text-[11px]">(Cards/ApplePay)</span>
            <span className="text-stone-600">·</span>
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-300 font-bold tracking-wide">PayPal</span>
            <span className="text-stone-500 text-[11px]">(Buyer Protection)</span>
            <span className="text-stone-600">·</span>
            <span className="text-emerald-400 font-semibold text-[11px]">Raast / Wire (PKR)</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md sm:max-w-xl mx-auto mb-14">
          <button
            onClick={() => onOpenOrderWizard()}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-base flex items-center justify-center gap-2.5 shadow-xl shadow-orange-600/25 hover:shadow-orange-600/40 transform hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span>Configure Custom Order</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={onOpenExpressBrief}
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700/80 font-medium text-base flex items-center justify-center gap-2 hover:border-amber-500/50 transition-all cursor-pointer"
          >
            <Zap className="w-5 h-5 text-amber-400" />
            <span>60s Express Brief</span>
          </button>

          <button
            onClick={onOpenTracker}
            className="w-full sm:w-auto px-5 py-4 rounded-xl bg-stone-900/60 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-800 font-mono text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Search className="w-4 h-4 text-orange-400" />
            <span>Track Order</span>
          </button>
        </div>

        {/* Quick Service Click-to-Order Chips */}
        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-3">
            Click Any Domain To Order Directly:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {serviceCategories.map((item) => (
              <button
                key={item.id}
                onClick={() => onOpenOrderWizard(item.id)}
                className="px-3 py-1.5 rounded-lg bg-stone-900/80 border border-stone-800 hover:border-orange-500/60 hover:bg-stone-800 text-stone-300 hover:text-white text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 group"
              >
                <span>{item.label}</span>
                <span className="text-[10px] text-stone-500 group-hover:text-orange-400 font-mono">
                  →
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Trust & Guarantee Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-8 border-t border-stone-800/80 text-left">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-stone-900/40 border border-stone-800/60">
            <Shield className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-white">100% IP &amp; Code Rights</h4>
              <p className="text-[11px] text-stone-400 leading-snug mt-0.5">Full repository transfer and commercial copyright.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-stone-900/40 border border-stone-800/60">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-white">Milestone Verification</h4>
              <p className="text-[11px] text-stone-400 leading-snug mt-0.5">Inspect and approve deliverables at each stage.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-stone-900/40 border border-stone-800/60">
            <Flame className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-white">48-Hour Sprint Kickoff</h4>
              <p className="text-[11px] text-stone-400 leading-snug mt-0.5">Rapid turnaround with senior engineering fellows.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-stone-900/40 border border-stone-800/60">
            <MessageSquareQuote className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-white">Direct WhatsApp / Slack</h4>
              <p className="text-[11px] text-stone-400 leading-snug mt-0.5">Direct communication with Huzaifa and lead architects.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

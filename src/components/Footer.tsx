import { Sparkles, Shield, MessageCircle } from 'lucide-react';

import type { ServiceId } from '../types';

interface FooterProps {
  onSelectService: (serviceId: ServiceId) => void;
  onOpenAdmin: () => void;
  onOpenTracker: () => void;
  onOpenEstimator: () => void;
  adminWhatsappNumber: string;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectService,
  onOpenAdmin,
  onOpenTracker,
  onOpenEstimator,
  adminWhatsappNumber,
}) => {
  const cleanWhatsappNumber = adminWhatsappNumber.replace(/[^0-9]/g, '');

  return (
    <footer className="border-t border-stone-800 bg-stone-950 text-stone-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800/80">
          
          {/* Brand Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-stone-900 border border-stone-700 flex items-center justify-center text-white font-serif font-bold text-lg">
                f0
              </div>
              <span className="font-serif font-bold text-2xl text-white tracking-tight">
                f0undr<span className="text-orange-500">.</span>
                <span className="text-xs font-mono font-medium px-2 py-0.5 ml-2 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30">
                  Order Atelier
                </span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-normal max-w-sm">
              The high-leverage commissioning workshop of the <strong className="text-stone-200">f0undr</strong> ecosystem. Authoring computational software, autonomous neural agents, interactive games, 3D CGI video, and production web systems.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-stone-400">
                Autonomous Systems · High-Leverage Software
              </span>
            </div>
          </div>

          {/* Quick Domain Links */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="text-xs font-mono uppercase text-stone-200 font-semibold tracking-wider">
              Commission Domains
            </h5>
            <div className="grid grid-cols-2 gap-2 text-xs text-stone-400">
              <button onClick={() => onSelectService('websites')} className="text-left hover:text-orange-400 transition-colors cursor-pointer">
                Websites &amp; SaaS
              </button>
              <button onClick={() => onSelectService('apps')} className="text-left hover:text-orange-400 transition-colors cursor-pointer">
                Mobile &amp; Desktop Apps
              </button>
              <button onClick={() => onSelectService('games')} className="text-left hover:text-orange-400 transition-colors cursor-pointer">
                2D/3D Games
              </button>
              <button onClick={() => onSelectService('videos')} className="text-left hover:text-orange-400 transition-colors cursor-pointer">
                4K &amp; 3D CGI Videos
              </button>
              <button onClick={() => onSelectService('images')} className="text-left hover:text-orange-400 transition-colors cursor-pointer">
                Figma &amp; 3D Renders
              </button>
              <button onClick={() => onSelectService('ads')} className="text-left hover:text-orange-400 transition-colors cursor-pointer">
                High-ROI Ad Creatives
              </button>
              <button onClick={() => onSelectService('tools')} className="text-left hover:text-orange-400 transition-colors cursor-pointer">
                Custom Scrapers &amp; Bots
              </button>
              <button onClick={() => onSelectService('ai')} className="text-left hover:text-orange-400 transition-colors cursor-pointer">
                Autonomous AI Systems
              </button>
            </div>
          </div>

          {/* Direct Comms & Cockpit */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-mono uppercase text-stone-200 font-semibold tracking-wider">
              Studio Folio
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={onOpenTracker} className="hover:text-white transition-colors cursor-pointer">
                  Live Order Tracker
                </button>
              </li>
              <li>
                <button onClick={onOpenEstimator} className="hover:text-white transition-colors cursor-pointer">
                  Interactive Cost Calculator
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent('Hello Huzaifa! I want to discuss a project with f0undr Studio.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 text-stone-300 transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Direct WhatsApp Channel</span>
                </a>
              </li>
              <li>
                <div className="text-stone-300 flex items-center gap-1.5 font-mono text-xs">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-stone-400">Discord:</span>
                  <span className="text-indigo-400 font-semibold select-all">king_huzaifa001</span>
                </div>
              </li>

              <li className="pt-2 border-t border-stone-800">
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-orange-400 text-stone-300 transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-orange-400" />
                  <span>Studio Cockpit (Admin PIN)</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Currencies & Payment Gateways Bar */}
        <div className="py-6 border-b border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2 text-stone-400">
            <span className="text-orange-400 font-semibold">Global Currencies:</span>
            <span className="text-stone-200">Dollars ($ USD)</span>
            <span className="text-stone-600">•</span>
            <span className="text-stone-200">Pounds (£ GBP)</span>
            <span className="text-stone-600">•</span>
            <span className="text-emerald-400 font-bold">PKR (₨)</span>
            <span className="text-stone-600">•</span>
            <span className="text-stone-400">Euros (€)</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-stone-400">
            <span className="text-stone-500">Payment Gateways:</span>
            <span className="text-sky-300 font-semibold">Stripe (Cards/ApplePay)</span>
            <span className="text-stone-600">•</span>
            <span className="text-indigo-300 font-semibold">PayPal (Buyer Protection)</span>
            <span className="text-stone-600">•</span>
            <span className="text-emerald-400 font-semibold">Raast / Wire (PKR)</span>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-500">
          <p>© 2026 f0undr Atelier. Crafted with engineering rigor for founders &amp; enterprises.</p>
          <div className="flex items-center gap-3">
            <a
              href="https://f0undr.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="text-orange-400 hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>f0undr Official Headquarters</span>
            </a>
            <span>•</span>
            <span className="text-stone-400">Khizar · f0undr · Huzaifa</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

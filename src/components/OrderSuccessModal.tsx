import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  MessageCircle, 
  Download, 
  Search, 
  X,
  Phone,
  MessageSquare,
  CreditCard,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

import type { Order } from '../types';
import { createWhatsAppUrl, formatOrderForWhatsApp } from '../utils/whatsapp';
import { downloadReceiptFile } from '../utils/exportReceipt';
import { F0UNDR_STUDIO_CONFIG } from '../data/f0undrConfig';
import { formatPrice } from '../utils/currency';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
  onTrackOrder: (orderId: string) => void;
  adminWhatsappNumber: string;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onTrackOrder,
  adminWhatsappNumber,
}) => {
  const [copiedId, setCopiedId] = useState(false);
  const [discordCopied, setDiscordCopied] = useState(false);

  if (!order) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(order.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleCopyForDiscord = () => {
    const spec = formatOrderForWhatsApp(order);
    const discordText = `**[f0undr Order Submission]**\nDiscord Lead: king_huzaifa001\n\n${spec}`;
    navigator.clipboard.writeText(discordText);
    setDiscordCopied(true);
    setTimeout(() => setDiscordCopied(false), 3000);
  };

  const whatsappUrl = createWhatsAppUrl(adminWhatsappNumber, order);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-emerald-400">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
          Commission Order Received!
        </h3>
        
        <p className="text-sm text-stone-400 max-w-md mx-auto mb-5">
          Your project specification is compiled. Now forward it directly to Huzaifa through one of the 3 official channels to lock in your slot.
        </p>

        {/* Order Reference Code Box */}
        <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-between gap-4 mb-6 text-left">
          <div>
            <span className="text-[10px] font-mono uppercase text-stone-500 block">
              Order Tracking Reference ID:
            </span>
            <span className="text-lg font-mono font-bold text-orange-400 tracking-wider">
              {order.id}
            </span>
          </div>

          <button
            onClick={handleCopyCode}
            className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-stone-400" />}
            <span>{copiedId ? 'Copied' : 'Copy ID'}</span>
          </button>
        </div>

        {/* Project Cost & Payment Gateway Details */}
        <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800/80 mb-5 text-left space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800/60">
            <div>
              <span className="text-[10px] font-mono uppercase text-stone-500 block">Commissioned Service</span>
              <span className="text-xs sm:text-sm font-semibold text-white">{order.serviceTitle} ({order.tier.toUpperCase()})</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase text-stone-500 block">Target Budget</span>
              <span className="text-sm sm:text-base font-mono font-bold text-orange-400">
                {order.currency ? formatPrice(order.targetBudgetUsd, order.currency) : `$${order.targetBudgetUsd.toLocaleString()}`}
                <span className="text-[10px] text-stone-400 font-normal ml-1">{order.currency || 'USD'}</span>
              </span>
            </div>
          </div>

          {/* Multi-Currency Equivalents (Dollars, Pounds, PKR) */}
          <div className="text-[11px] font-mono text-stone-400 flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="text-stone-500">Equivalents:</span>
            <span>{formatPrice(order.targetBudgetUsd, 'USD')} Dollars</span>
            <span>·</span>
            <span>{formatPrice(order.targetBudgetUsd, 'GBP')} Pounds</span>
            <span>·</span>
            <span className="text-emerald-400 font-semibold">{formatPrice(order.targetBudgetUsd, 'PKR')} PKR</span>
          </div>

          {/* Selected Payment Method */}
          <div className="pt-2 border-t border-stone-800/60 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <CreditCard className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-stone-400">Payment Gateway:</span>
              <span className="text-white font-bold uppercase">
                {order.paymentMethod === 'stripe' ? 'Stripe Checkout' : order.paymentMethod === 'paypal' ? 'PayPal Global' : 'Direct Wire / Raast'}
              </span>
            </div>

            {order.paymentMethod === 'stripe' && (
              <a
                href={F0UNDR_STUDIO_CONFIG.payments.stripe.defaultCheckoutUrl}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/30 text-[11px] font-mono font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Stripe Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {order.paymentMethod === 'paypal' && (
              <a
                href={F0UNDR_STUDIO_CONFIG.payments.paypal.defaultPaymentUrl}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-[11px] font-mono font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>PayPal.me</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Exclusive Order Channels Section */}
        <div className="text-left mb-6">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-mono text-orange-400 uppercase tracking-wider font-semibold">
              3 Official Ways to Finalize Order:
            </span>
            <span className="text-[11px] text-stone-500 font-mono">No other way</span>
          </div>

          <div className="space-y-2.5">
            {/* 1. WhatsApp Action */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm flex items-center justify-between shadow-lg shadow-emerald-600/20 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-xs sm:text-sm">1. Send via WhatsApp</div>
                  <div className="text-[11px] text-emerald-100 font-mono">+92 344 6789261 (Pre-filled Spec)</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 opacity-75 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* 2. Discord Action */}
            <div className="p-3 rounded-xl bg-stone-950 border border-indigo-500/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-semibold text-white">2. Message on Discord</div>
                  <div className="text-[11px] text-indigo-400 font-mono font-bold select-all">
                    king_huzaifa001
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleCopyForDiscord}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                {discordCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Spec Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-indigo-200" />
                    <span>Copy Spec</span>
                  </>
                )}
              </button>
            </div>

            {/* 3. Direct Phone Call Action */}
            <a
              href={`tel:${F0UNDR_STUDIO_CONFIG.phoneNumber}`}
              className="w-full py-3 px-4 rounded-xl bg-stone-950 hover:bg-stone-850 text-white border border-stone-800 hover:border-orange-500/50 text-sm flex items-center justify-between transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-xs sm:text-sm text-stone-200">3. Direct Phone Call</div>
                  <div className="text-[11px] text-orange-400 font-mono font-bold">03446789261</div>
                </div>
              </div>
              <span className="text-xs font-mono text-stone-400 group-hover:text-white">Call Now &rarr;</span>
            </a>
          </div>
        </div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-2 gap-2.5 mb-6">
          {/* Download Receipt */}
          <button
            onClick={() => downloadReceiptFile(order)}
            className="py-2.5 px-3 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-200 font-medium text-xs flex items-center justify-center gap-1.5 border border-stone-700/60 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-stone-400" />
            <span>Download .txt Spec</span>
          </button>

          {/* Track Live */}
          <button
            onClick={() => {
              onClose();
              onTrackOrder(order.id);
            }}
            className="py-2.5 px-3 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-200 font-medium text-xs flex items-center justify-center gap-1.5 border border-stone-700/60 hover:border-orange-500/50 transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-orange-400" />
            <span>Track in Studio</span>
          </button>
        </div>

        {/* Guarantees */}
        <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-500 font-mono">
          <div className="flex items-center gap-1.5 text-stone-400">
            <ShieldCheck className="w-4 h-4 text-orange-400" />
            <span>100% IP &amp; Code Ownership</span>
          </div>

          <div className="flex items-center gap-1 text-stone-400">
            <span>Direct to Founder:</span>
            <span className="text-stone-300 font-medium">M.Huzaifa</span>
          </div>
        </div>

      </div>
    </div>
  );
};

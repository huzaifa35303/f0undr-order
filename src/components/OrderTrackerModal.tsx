import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  CheckCircle2, 
  Circle, 
  Calendar, 
  MessageCircle, 
  Download, 
  ShieldAlert
} from 'lucide-react';
import type { Currency, Order, OrderStatus } from '../types';

import { getStoredOrders, getOrderById } from '../utils/storage';
import { STATUS_LABELS } from '../data/f0undrConfig';
import { formatPrice } from '../utils/currency';
import { downloadReceiptFile } from '../utils/exportReceipt';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
  currentCurrency: Currency;
  adminWhatsappNumber: string;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  initialOrderId = '',
  currentCurrency,
  adminWhatsappNumber,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialOrderId);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (initialOrderId) {
      setSearchQuery(initialOrderId);
      handleSearch(initialOrderId);
    } else {
      // Pick the first available order from storage to display as a helpful demo!
      const stored = getStoredOrders();
      if (stored.length > 0) {
        setCurrentOrder(stored[0]);
      }
    }
  }, [initialOrderId, isOpen]);

  if (!isOpen) return null;

  const handleSearch = (idToSearch?: string) => {
    const query = (idToSearch || searchQuery).trim();
    if (!query) return;

    setNotFound(false);
    const order = getOrderById(query);
    if (order) {
      setCurrentOrder(order);
    } else {
      // Try searching by client phone or discord
      const stored = getStoredOrders();
      const matched = stored.find(
        (o) =>
          (o.client.discord && o.client.discord.toLowerCase() === query.toLowerCase()) ||
          o.client.phoneOrWhatsapp.includes(query)
      );

      if (matched) {
        setCurrentOrder(matched);
      } else {
        setNotFound(true);
      }
    }
  };

  const getStatusProgress = (status: OrderStatus): number => {
    switch (status) {
      case 'submitted': return 15;
      case 'under_review': return 35;
      case 'scope_approved': return 50;
      case 'in_development': return 75;
      case 'qa_testing': return 90;
      case 'delivered': return 100;
      case 'on_hold': return 50;
      default: return 10;
    }
  };

  const cleanWhatsappNumber = adminWhatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col relative shadow-2xl overflow-hidden my-auto">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-stone-800 bg-stone-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-orange-600/20 text-orange-400">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-white">
                Live Commission Order Tracker
              </h3>
              <p className="text-[11px] font-mono text-stone-400">
                Real-time milestone progression &amp; engineering stage
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b border-stone-800 bg-stone-950/60">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. F0-2026-8491) or Phone / Discord..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-orange-500 placeholder-stone-600"
              />
              <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold cursor-pointer transition-colors"
            >
              Lookup
            </button>
          </form>

          {notFound && (
            <div className="mt-3 p-3 rounded-xl bg-rose-950/50 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <span>
                No active order found matching "{searchQuery}". Please check your Order ID or contact Huzaifa on WhatsApp.
              </span>
            </div>
          )}
        </div>

        {/* Order Details Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {currentOrder ? (
            <div className="space-y-6">
              
              {/* Order Info Card */}
              <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                      Order Reference
                    </span>
                    <span className="text-xl font-mono font-bold text-orange-400">
                      {currentOrder.id}
                    </span>
                  </div>

                  {/* Status Pill */}
                  <div>
                    {(() => {
                      const cfg = STATUS_LABELS[currentOrder.status] || STATUS_LABELS.submitted;
                      return (
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border ${cfg.bg} ${cfg.color}`}>
                          <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                          <span>{cfg.label}</span>
                        </span>
                      );
                    })()}
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-serif font-bold text-white mb-1">
                    {currentOrder.projectTitle}
                  </h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {currentOrder.projectDescription}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-stone-400">Pipeline Progression</span>
                    <span className="text-orange-400 font-bold">
                      {getStatusProgress(currentOrder.status)}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-600 to-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${getStatusProgress(currentOrder.status)}%` }}
                    />
                  </div>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-stone-800/80 text-xs font-mono">
                  <div>
                    <span className="text-stone-500 text-[10px] block">Domain</span>
                    <span className="text-stone-200">{currentOrder.serviceTitle.split('&')[0]}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 text-[10px] block">Budget &amp; Escrow</span>
                    <span className="text-orange-400 font-bold">
                      {formatPrice(currentOrder.targetBudgetUsd, currentOrder.currency || currentCurrency)}
                    </span>
                    <span className="text-[10px] text-stone-500 block uppercase">
                      {currentOrder.paymentMethod || 'Stripe / PayPal'}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 text-[10px] block">Turnaround</span>
                    <span className="text-stone-200">~{currentOrder.estimatedDays} Days</span>
                  </div>
                  <div>
                    <span className="text-stone-500 text-[10px] block">Lead Architect</span>
                    <span className="text-stone-200">{currentOrder.assignedLead || 'M.Huzaifa'}</span>
                  </div>
                </div>
              </div>

              {/* Milestones Checklist */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-stone-400 mb-3">
                  Technical Milestones &amp; Deliverables:
                </h4>
                <div className="space-y-2.5">
                  {currentOrder.milestones.map((milestone, idx) => (
                    <div
                      key={milestone.id || idx}
                      className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors ${
                        milestone.completed
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-stone-200'
                          : 'bg-stone-950/60 border-stone-800 text-stone-400'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {milestone.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Circle className="w-5 h-5 text-stone-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-xs font-semibold ${milestone.completed ? 'text-white' : 'text-stone-300'}`}>
                            Phase {idx + 1}: {milestone.title}
                          </span>
                          {milestone.targetDate && (
                            <span className="text-[10px] font-mono text-stone-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{milestone.targetDate}</span>
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-400 mt-0.5 leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Contact Info */}
              <div className="p-4 rounded-xl bg-stone-950/40 border border-stone-800/80 text-xs text-stone-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-stone-500 font-mono text-[10px] block">Commissioned By</span>
                  <span className="font-semibold text-stone-200">{currentOrder.client.name}</span>
                  {currentOrder.client.discord && (
                    <span className="text-indigo-400 block text-[11px] font-mono">Discord: {currentOrder.client.discord}</span>
                  )}
                  <span className="text-stone-500 block text-[11px] font-mono">{currentOrder.client.phoneOrWhatsapp}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => downloadReceiptFile(currentOrder)}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-stone-400" />
                    <span>Receipt</span>
                  </button>

                  <a
                    href={`https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(`Hello Huzaifa, I am inquiring regarding the status of Order ${currentOrder.id} (${currentOrder.projectTitle}).`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Chat Lead</span>
                  </a>
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-12 text-stone-500 font-mono text-xs">
              Search by entering your Order ID above to view real-time build status.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

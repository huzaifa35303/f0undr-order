import React, { useState } from 'react';
import { 
  Zap, 
  CheckCircle2, 
  MessageCircle,
  Phone,
  MessageSquare,
  Copy,
  Check
} from 'lucide-react';
import type { Currency, Order, ServiceId } from '../types';

import { SERVICES_DATA } from '../data/servicesData';
import { generateOrderId } from '../utils/idGenerator';
import { saveNewOrder } from '../utils/storage';
import { createExpressBriefWhatsAppUrl } from '../utils/whatsapp';
import { F0UNDR_STUDIO_CONFIG } from '../data/f0undrConfig';

interface ExpressBriefSectionProps {
  currentCurrency: Currency;
  adminWhatsappNumber: string;
  onOrderCreated: (order: Order) => void;
}

export const ExpressBriefSection: React.FC<ExpressBriefSectionProps> = ({
  adminWhatsappNumber,
  onOrderCreated,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceId>('ai');
  const [budgetRange, setBudgetRange] = useState('$500 - $1,500');
  const [briefText, setBriefText] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [submittedOrder, setSubmittedOrder] = useState<Order | null>(null);
  const [discordCopied, setDiscordCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientContact.trim() || !briefText.trim()) {
      alert('Please fill in your name, contact, and brief overview.');
      return;
    }

    const orderId = generateOrderId();
    const currentCat = SERVICES_DATA.find((s) => s.id === selectedService) || SERVICES_DATA[0];

    // Rough target budget parse
    let parsedBudget = 800;
    if (budgetRange.includes('3,000') || budgetRange.includes('5,000')) parsedBudget = 3500;
    else if (budgetRange.includes('1,500')) parsedBudget = 1200;

    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      serviceId: selectedService,
      serviceTitle: currentCat.title,
      tier: 'pro',
      urgency: 'standard',
      projectTitle: `Express Brief: ${currentCat.title.split('&')[0]}`,
      projectDescription: briefText.trim(),
      selectedFeatures: [],
      targetBudgetUsd: parsedBudget,
      estimatedDays: 7,
      client: {
        name: clientName.trim(),
        phoneOrWhatsapp: clientContact.trim(),
        discord: clientContact.includes('@') ? undefined : clientContact.trim(),
        preferredContactMethod: 'whatsapp',
      },

      status: 'submitted',
      milestones: [
        { id: 'm1', title: 'Consultation & Architecture Proposal', description: 'Immediate response within 2 hours', completed: false },
        { id: 'm2', title: 'Sprint Kickoff & Development', description: 'Staging prototype delivery', completed: false }
      ],
      assignedLead: 'M.Huzaifa',
      source: 'express_brief'
    };

    saveNewOrder(newOrder);
    setSubmittedOrder(newOrder);
    onOrderCreated(newOrder);
  };

  const cleanWhatsappNumber = adminWhatsappNumber.replace(/[^0-9]/g, '');

  return (
    <section id="express" className="py-20 bg-stone-900/40 border-t border-stone-800 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-amber-500/30 relative overflow-hidden shadow-2xl">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[90px] pointer-events-none rounded-full" />

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-wider mb-2">
                <Zap className="w-3.5 h-3.5" />
                <span>60-Second Rapid Inquiry</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                In a Rush? Send an Express Brief
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 mt-1">
                Skip the detailed wizard. Submit your vision and receive direct feedback from M.Huzaifa within 2 business hours.
              </p>
            </div>
          </div>

          {submittedOrder ? (
            <div className="p-6 rounded-2xl bg-stone-950 border border-emerald-500/40 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-serif font-bold text-white">
                Express Brief Dispatched!
              </h4>
              <p className="text-xs text-stone-300 max-w-md mx-auto">
                Your inquiry has been assigned reference code <span className="text-orange-400 font-mono font-bold">{submittedOrder.id}</span>.
              </p>
              
              <div className="pt-2 max-w-lg mx-auto space-y-2.5">
                <a
                  href={createExpressBriefWhatsAppUrl(cleanWhatsappNumber, {
                    service: submittedOrder.serviceTitle,
                    budget: budgetRange,
                    description: briefText,
                    name: clientName,
                    contact: clientContact
                  })}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>1. Forward Spec to Huzaifa (WhatsApp: +92 344 6789261)</span>
                </a>

                <div className="p-2.5 rounded-xl bg-stone-900 border border-indigo-500/30 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-left">
                    <MessageSquare className="w-4 h-4 text-indigo-400 shrink-0" />
                    <div>
                      <span className="text-[11px] text-stone-300 block font-semibold">2. Message on Discord:</span>
                      <span className="text-xs text-indigo-400 font-mono font-bold select-all">king_huzaifa001</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const msg = `[Express Brief - ${submittedOrder.id}]\nService: ${submittedOrder.serviceTitle}\nBudget: ${budgetRange}\nClient: ${clientName} (${clientContact})\nBrief: ${briefText}`;
                      navigator.clipboard.writeText(msg);
                      setDiscordCopied(true);
                      setTimeout(() => setDiscordCopied(false), 2500);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                  >
                    {discordCopied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{discordCopied ? 'Copied' : 'Copy Spec'}</span>
                  </button>
                </div>

                <a
                  href={`tel:${F0UNDR_STUDIO_CONFIG.phoneNumber}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-850 text-stone-200 border border-stone-800 hover:border-orange-500/50 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-orange-400" />
                  <span>3. Call Huzaifa Directly: 03446789261</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Domain Selector */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-1.5">
                    Service Required:
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value as ServiceId)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    {SERVICES_DATA.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        {srv.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-1.5">
                    Estimated Budget Tier:
                  </label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="$300 - $600">$300 – $600 USD (Starter MVP / Prototype)</option>
                    <option value="$600 - $1,500">$600 – $1,500 USD (Pro Production Build)</option>
                    <option value="$1,500 - $3,500">$1,500 – $3,500 USD (Scale / Full System)</option>
                    <option value="$3,500+">$3,500+ USD (Enterprise Architecture)</option>
                  </select>
                </div>

              </div>

              {/* Brief textarea */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-1.5">
                  What are you looking to build? (1–3 sentences):
                </label>
                <textarea
                  rows={3}
                  required
                  value={briefText}
                  onChange={(e) => setBriefText(e.target.value)}
                  placeholder="e.g. I need an autonomous Telegram crypto bot that tracks DEX liquidity, or a modern landing page for my AI startup with Stripe integration..."
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 placeholder-stone-600 leading-relaxed"
                />
              </div>

              {/* Client Name & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-1.5">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Tariq or Elena"
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 placeholder-stone-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-1.5">
                    WhatsApp Number or Discord:
                  </label>
                  <input
                    type="text"
                    required
                    value={clientContact}
                    onChange={(e) => setClientContact(e.target.value)}
                    placeholder="+92 344 6789261 or discord_user"
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 placeholder-stone-600"
                  />
                </div>

              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-600/30 transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Send 60-Second Express Brief to Atelier</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};

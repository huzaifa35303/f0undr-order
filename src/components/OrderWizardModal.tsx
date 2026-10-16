import React, { useState, useEffect } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  Globe, 
  Smartphone, 
  Gamepad2, 
  Video, 
  Image as ImageIcon, 
  Megaphone, 
  Wrench, 
  BrainCircuit,
  Clock,
  DollarSign,
  CreditCard,
  ShieldCheck,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { 
  Currency, 
  Order, 
  ServiceId, 
  ServiceTier, 
  TimelineUrgency,
  PaymentMethod
} from '../types';

import { SERVICES_DATA, TIER_CONFIG, URGENCY_CONFIG } from '../data/servicesData';
import { formatPrice } from '../utils/currency';
import { generateOrderId } from '../utils/idGenerator';
import { saveNewOrder } from '../utils/storage';
import { SUPPORTED_CURRENCIES } from '../data/f0undrConfig';

interface OrderWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: ServiceId;
  currentCurrency: Currency;
  onOrderCompleted: (newOrder: Order) => void;
}

export const OrderWizardModal: React.FC<OrderWizardModalProps> = ({
  isOpen,
  onClose,
  initialServiceId = 'websites',
  currentCurrency,
  onOrderCompleted,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceId>(initialServiceId);
  const [selectedTier, setSelectedTier] = useState<ServiceTier>('pro');
  const [selectedUrgency, setSelectedUrgency] = useState<TimelineUrgency>('standard');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  
  // Scope details
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [techStackPreference, setTechStackPreference] = useState('');
  const [referenceLinksText, setReferenceLinksText] = useState('');

  // Contact info
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientDiscord, setClientDiscord] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientCountry, setClientCountry] = useState('');
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'discord' | 'call'>('whatsapp');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('stripe');
  const [wizardCurrency, setWizardCurrency] = useState<Currency>(currentCurrency);

  // Error validation
  const [validationError, setValidationError] = useState<string | null>(null);

  // Sync initialServiceId and currency when modal opens
  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
      // Preselect popular features for this category
      const cat = SERVICES_DATA.find((s) => s.id === initialServiceId);
      if (cat) {
        setSelectedFeatures(cat.featuresList.filter((f) => f.popular).map((f) => f.id));
      }
    }
    setWizardCurrency(currentCurrency);
  }, [initialServiceId, currentCurrency, isOpen]);

  if (!isOpen) return null;

  const currentCategory = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];

  // Dynamic Calculation
  const calculateTotalBudgetUsd = (): number => {
    const basePrice = currentCategory.startingPriceUsd;
    const tierMultiplier = TIER_CONFIG[selectedTier].multiplier;
    const urgencyMultiplier = URGENCY_CONFIG[selectedUrgency].multiplier;

    // Sum selected feature prices
    const featuresTotal = selectedFeatures.reduce((acc, featId) => {
      const feat = currentCategory.featuresList.find((f) => f.id === featId);
      return acc + (feat ? feat.estimatedPriceUsd : 0);
    }, 0);

    const subtotal = (basePrice * tierMultiplier) + featuresTotal;
    return Math.round(subtotal * urgencyMultiplier);
  };

  const calculateEstimatedDays = (): number => {
    // Extract base days from string like "5 - 18 Days" -> avg ~ 10
    const numbers = currentCategory.estimatedDays.match(/\d+/g);
    let avgDays = 10;
    if (numbers && numbers.length >= 2) {
      avgDays = Math.round((parseInt(numbers[0], 10) + parseInt(numbers[1], 10)) / 2);
    } else if (numbers && numbers.length === 1) {
      avgDays = parseInt(numbers[0], 10);
    }

    if (selectedTier === 'starter') avgDays = Math.max(3, Math.round(avgDays * 0.7));
    if (selectedTier === 'enterprise') avgDays = Math.round(avgDays * 1.5);

    avgDays = Math.round(avgDays * URGENCY_CONFIG[selectedUrgency].daysMultiplier);
    return Math.max(2, avgDays);
  };

  const toggleFeature = (featureId: string) => {
    if (selectedFeatures.includes(featureId)) {
      setSelectedFeatures(selectedFeatures.filter((id) => id !== featureId));
    } else {
      setSelectedFeatures([...selectedFeatures, featureId]);
    }
  };

  const handleNextStep = () => {
    setValidationError(null);
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!projectTitle.trim()) {
        setValidationError('Please provide a working title for your project.');
        return;
      }
      if (!projectDescription.trim() || projectDescription.length < 15) {
        setValidationError('Please share at least a couple sentences describing your vision or requirements.');
        return;
      }
      setCurrentStep(4);
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!clientName.trim()) {
      setValidationError('Please enter your full name or company representative name.');
      return;
    }
    if (!clientPhone.trim() || clientPhone.length < 7) {
      setValidationError('Please provide your WhatsApp or phone number so Huzaifa can reach you.');
      return;
    }

    const orderId = generateOrderId();
    const finalBudget = calculateTotalBudgetUsd();
    const finalDays = calculateEstimatedDays();

    const links = referenceLinksText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const now = new Date().toISOString();

    const newOrder: Order = {
      id: orderId,
      createdAt: now,
      updatedAt: now,
      serviceId: selectedServiceId,
      serviceTitle: currentCategory.title,
      tier: selectedTier,
      urgency: selectedUrgency,
      projectTitle: projectTitle.trim(),
      projectDescription: projectDescription.trim(),
      selectedFeatures,
      techStackPreference: techStackPreference.trim() || undefined,
      referenceLinks: links.length > 0 ? links : undefined,
      targetBudgetUsd: finalBudget,
      currency: wizardCurrency,
      paymentMethod: selectedPaymentMethod,
      estimatedDays: finalDays,
      client: {
        name: clientName.trim(),
        phoneOrWhatsapp: clientPhone.trim(),
        discord: clientDiscord.trim() || undefined,
        companyOrBrand: clientCompany.trim() || undefined,
        country: clientCountry.trim() || undefined,
        preferredContactMethod: preferredContact,
      },
      status: 'submitted',

      milestones: [
        { id: 'm1', title: 'Technical Architecture & Specification Sign-off', description: 'Review architecture draft, wireframes and setup repo', completed: false },
        { id: 'm2', title: 'Sprint Milestone 1: Core Functionality & Engine', description: 'Working interactive build on staging domain', completed: false },
        { id: 'm3', title: 'Sprint Milestone 2: Polish, Integrations & QA', description: 'End-to-end testing, responsive design check and security review', completed: false },
        { id: 'm4', title: 'Final Handover & Production Deployment', description: 'Full source repository transfer, DNS go-live and documentation', completed: false },
      ],
      assignedLead: selectedServiceId === 'ai' || selectedServiceId === 'tools' ? 'M.Huzaifa' : 'Abdull Rehman Khizar',
      source: 'wizard'
    };

    // Save to local storage
    saveNewOrder(newOrder);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore in environments without canvas
    }

    onOrderCompleted(newOrder);
  };

  const getCategoryIcon = (id: ServiceId) => {
    switch (id) {
      case 'websites': return <Globe className="w-5 h-5" />;
      case 'apps': return <Smartphone className="w-5 h-5" />;
      case 'games': return <Gamepad2 className="w-5 h-5" />;
      case 'videos': return <Video className="w-5 h-5" />;
      case 'images': return <ImageIcon className="w-5 h-5" />;
      case 'ads': return <Megaphone className="w-5 h-5" />;
      case 'tools': return <Wrench className="w-5 h-5" />;
      case 'ai': return <BrainCircuit className="w-5 h-5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col relative shadow-2xl overflow-hidden my-auto">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-stone-800 bg-stone-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-600/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-sm">
              f0
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-white">
                Commission Order Atelier
              </h3>
              <p className="text-[11px] font-mono text-stone-400">
                Step {currentStep} of 4 — {currentStep === 1 && 'Domain & Tier'}
                {currentStep === 2 && 'Features & Urgency'}
                {currentStep === 3 && 'Project Specification'}
                {currentStep === 4 && 'Client Details & Delivery'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Live Ticker */}
            <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs font-mono">
              <div className="flex items-center gap-1 text-orange-400">
                <DollarSign className="w-3.5 h-3.5" />
                <span className="font-bold">{formatPrice(calculateTotalBudgetUsd(), currentCurrency)}</span>
              </div>
              <span className="text-stone-600">|</span>
              <div className="flex items-center gap-1 text-stone-300">
                <Clock className="w-3.5 h-3.5 text-stone-500" />
                <span>~{calculateEstimatedDays()} Days</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Progress Indicators */}
        <div className="grid grid-cols-4 border-b border-stone-800 bg-stone-950/40 text-center text-xs font-mono">
          <div className={`py-2 px-1 border-b-2 ${currentStep >= 1 ? 'border-orange-500 text-orange-400 font-semibold' : 'border-transparent text-stone-500'}`}>
            1. Domain
          </div>
          <div className={`py-2 px-1 border-b-2 ${currentStep >= 2 ? 'border-orange-500 text-orange-400 font-semibold' : 'border-transparent text-stone-500'}`}>
            2. Features
          </div>
          <div className={`py-2 px-1 border-b-2 ${currentStep >= 3 ? 'border-orange-500 text-orange-400 font-semibold' : 'border-transparent text-stone-500'}`}>
            3. Scope
          </div>
          <div className={`py-2 px-1 border-b-2 ${currentStep >= 4 ? 'border-orange-500 text-orange-400 font-semibold' : 'border-transparent text-stone-500'}`}>
            4. Review &amp; Send
          </div>
        </div>

        {/* Modal Body / Scrollable Form */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {validationError && (
            <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-medium flex items-center gap-2">
              <span>⚠️</span>
              <span>{validationError}</span>
            </div>
          )}

          {/* STEP 1: SERVICE & TIER */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-3">
                  Select Commission Domain:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {SERVICES_DATA.map((service) => {
                    const isSelected = selectedServiceId === service.id;
                    return (
                      <button
                        type="button"
                        key={service.id}
                        onClick={() => {
                          setSelectedServiceId(service.id);
                          // pre-populate features
                          setSelectedFeatures(service.featuresList.filter((f) => f.popular).map((f) => f.id));
                        }}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-24 ${
                          isSelected
                            ? 'bg-orange-600/15 border-orange-500 text-white shadow-md shadow-orange-500/10'
                            : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={isSelected ? 'text-orange-400' : 'text-stone-400'}>
                            {getCategoryIcon(service.id)}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-orange-400" />}
                        </div>
                        <div>
                          <div className="text-xs font-semibold leading-tight">{service.title.split('&')[0]}</div>
                          <div className="text-[10px] font-mono text-stone-500 mt-0.5">
                            From {formatPrice(service.startingPriceUsd, currentCurrency)}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tier Selection */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-3">
                  Select Scope &amp; Architecture Tier:
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {(['starter', 'pro', 'enterprise'] as ServiceTier[]).map((tierKey) => {
                    const tier = TIER_CONFIG[tierKey];
                    const isSelected = selectedTier === tierKey;
                    return (
                      <div
                        key={tierKey}
                        onClick={() => setSelectedTier(tierKey)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                          isSelected
                            ? 'bg-stone-800/80 border-orange-500 text-white shadow-lg shadow-orange-500/10'
                            : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-white">{tier.name}</span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                            isSelected ? 'bg-orange-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-400'
                          }`}>
                            {tier.badge}
                          </span>
                        </div>
                        <p className="text-xs text-stone-400 leading-relaxed mb-3">
                          {tier.description}
                        </p>
                        <div className="text-[11px] font-mono text-stone-500 pt-2 border-t border-stone-800/60 flex items-center justify-between">
                          <span>Multiplier: {tier.multiplier}x base</span>
                          {isSelected && <span className="text-orange-400 font-semibold">Selected</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: FEATURES & URGENCY */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-stone-400">
                    Bespoke Features &amp; Add-on Modules:
                  </label>
                  <span className="text-[11px] font-mono text-stone-500">
                    {selectedFeatures.length} selected
                  </span>
                </div>
                <p className="text-xs text-stone-400 mb-3">
                  Check all architectural features your project requires for {currentCategory.title}:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentCategory.featuresList.map((feature) => {
                    const isChecked = selectedFeatures.includes(feature.id);
                    return (
                      <div
                        key={feature.id}
                        onClick={() => toggleFeature(feature.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isChecked
                            ? 'bg-orange-600/15 border-orange-500/70 text-white'
                            : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                          isChecked ? 'bg-orange-500 border-orange-400 text-stone-950' : 'border-stone-700 bg-stone-900'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-semibold text-stone-200">{feature.name}</span>
                            <span className="text-[11px] font-mono text-orange-400 shrink-0">
                              +{formatPrice(feature.estimatedPriceUsd, currentCurrency)}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-400 mt-0.5 leading-snug">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Urgency */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-3">
                  Delivery Urgency &amp; Sprint Speed:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(['standard', 'rush', 'flexible'] as TimelineUrgency[]).map((urgencyKey) => {
                    const urg = URGENCY_CONFIG[urgencyKey];
                    const isSelected = selectedUrgency === urgencyKey;
                    return (
                      <div
                        key={urgencyKey}
                        onClick={() => setSelectedUrgency(urgencyKey)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-stone-800/80 border-orange-500 text-white shadow-md'
                            : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-white">{urg.name}</span>
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                            isSelected ? 'bg-orange-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-400'
                          }`}>
                            {urg.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-400 leading-relaxed">{urg.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SCOPE & BRIEF */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 block mb-1">
                  Project Title / Working Codename: *
                </label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g. Autonomous Financial RAG Agent or SaaS Analytics Dashboard"
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-sm focus:outline-none focus:border-orange-500 placeholder-stone-600"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 block mb-1">
                  Project Vision &amp; Requirements: *
                </label>
                <textarea
                  rows={5}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Describe your goals, target audience, core user journeys, any specific technical requirements or problem you want solved..."
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-sm focus:outline-none focus:border-orange-500 placeholder-stone-600 leading-relaxed"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 block mb-1">
                  Tech Stack or Platform Preferences (Optional):
                </label>
                <input
                  type="text"
                  value={techStackPreference}
                  onChange={(e) => setTechStackPreference(e.target.value)}
                  placeholder="e.g. Next.js + Supabase, Python FastAPI + Qdrant, Flutter, or Leave to f0undr recommendation"
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-sm focus:outline-none focus:border-orange-500 placeholder-stone-600"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 block mb-1">
                  Inspiration &amp; Reference Links (Optional, one per line):
                </label>
                <textarea
                  rows={2}
                  value={referenceLinksText}
                  onChange={(e) => setReferenceLinksText(e.target.value)}
                  placeholder="https://figma.com/@project&#10;https://github.com/reference&#10;https://competitor.com"
                  className="w-full px-4 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs font-mono focus:outline-none focus:border-orange-500 placeholder-stone-600"
                />
              </div>
            </div>
          )}

          {/* STEP 4: CLIENT CONTACT & REVIEW */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Order Recap Banner */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800/80">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-400">{getCategoryIcon(selectedServiceId)}</span>
                    <span className="text-sm font-serif font-bold text-white">{currentCategory.title}</span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 justify-end">
                      <span className="text-base font-mono font-bold text-orange-400">
                        {formatPrice(calculateTotalBudgetUsd(), wizardCurrency)}
                      </span>
                      <span className="text-xs font-mono text-stone-400">
                        {wizardCurrency}
                      </span>
                    </div>
                    {/* Currency quick toggle pills */}
                    <div className="flex items-center gap-1 mt-1 justify-end">
                      {SUPPORTED_CURRENCIES.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => setWizardCurrency(c.code)}
                          className={`px-1.5 py-0.5 rounded text-[10px] font-mono cursor-pointer transition-colors ${
                            wizardCurrency === c.code
                              ? 'bg-orange-600 text-white font-bold'
                              : 'bg-stone-900 text-stone-400 hover:text-white'
                          }`}
                        >
                          {c.symbol} {c.code}
                        </button>
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-stone-500 block mt-0.5">
                      ~{calculateEstimatedDays()} Days Delivery
                    </span>
                  </div>
                </div>

                <div className="text-xs text-stone-300 grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-stone-500 font-mono text-[10px] block">Project:</span>
                    <span className="font-semibold text-white truncate block">{projectTitle}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 font-mono text-[10px] block">Tier &amp; Urgency:</span>
                    <span>{TIER_CONFIG[selectedTier].name} · {URGENCY_CONFIG[selectedUrgency].name}</span>
                  </div>
                </div>

                {selectedFeatures.length > 0 && (
                  <div className="pt-2 border-t border-stone-800/60">
                    <span className="text-stone-500 font-mono text-[10px] block mb-1">Included Modules:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedFeatures.map((fId) => {
                        const feat = currentCategory.featuresList.find((f) => f.id === fId);
                        return (
                          <span key={fId} className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">
                            {feat?.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Information Fields */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-stone-400">
                  Client &amp; Contact Information:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-stone-400 block mb-1">Your Full Name: *</label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Alex Henderson"
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-stone-400 block mb-1">Discord Username (Optional):</label>
                    <input
                      type="text"
                      value={clientDiscord}
                      onChange={(e) => setClientDiscord(e.target.value)}
                      placeholder="e.g. user#1234 or discord_handle"
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>


                  <div>
                    <label className="text-xs text-stone-400 block mb-1">WhatsApp / Mobile Number: *</label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000 or +92 300 0000000"
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-stone-400 block mb-1">Company / Brand (Optional):</label>
                    <input
                      type="text"
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                      placeholder="e.g. Apex Labs or Independent"
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-stone-400 block mb-1">Location / Country (Optional):</label>
                    <input
                      type="text"
                      value={clientCountry}
                      onChange={(e) => setClientCountry(e.target.value)}
                      placeholder="e.g. United States, UAE, Pakistan"
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs text-stone-400 block font-medium">
                      Select Preferred Communication Channel:
                    </label>
                    <span className="text-[10px] text-orange-400 font-mono">Exclusive to 3 channels</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'whatsapp', label: '💬 WhatsApp', desc: '+92 344 6789261' },
                      { id: 'discord', label: '🎮 Discord', desc: 'king_huzaifa001' },
                      { id: 'call', label: '📞 Phone Call', desc: '03446789261' },
                    ].map((opt) => (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setPreferredContact(opt.id as any)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          preferredContact === opt.id
                            ? 'bg-orange-600/15 border-orange-500 text-white shadow-lg shadow-orange-600/10'
                            : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                        }`}
                      >
                        <div className="text-xs font-semibold text-stone-200">{opt.label}</div>
                        <div className="text-[10px] font-mono text-stone-400 mt-0.5">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Payment Gateway (Stripe, PayPal, Wire) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs text-stone-400 block font-medium">
                      Select Preferred Payment Gateway (Milestone Escrow):
                    </label>
                    <span className="text-[10px] text-emerald-400 font-mono">Stripe &amp; PayPal Protected</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { 
                        id: 'stripe', 
                        name: 'Stripe Checkout', 
                        desc: 'Credit Card, Apple Pay, Google Pay',
                        badge: 'Instant 256-Bit SSL',
                        icon: CreditCard,
                        accent: 'text-sky-400'
                      },
                      { 
                        id: 'paypal', 
                        name: 'PayPal Global', 
                        desc: 'PayPal Balance & Buyer Protection',
                        badge: 'Buyer Protected',
                        icon: ShieldCheck,
                        accent: 'text-indigo-400'
                      },
                      { 
                        id: 'bank_transfer', 
                        name: 'Direct Wire / Raast', 
                        desc: 'PKR Bank Transfer / IBAN Wire',
                        badge: 'Zero Fee Transfer',
                        icon: Building2,
                        accent: 'text-emerald-400'
                      },
                    ].map((m) => {
                      const Icon = m.icon;
                      return (
                        <button
                          type="button"
                          key={m.id}
                          onClick={() => setSelectedPaymentMethod(m.id as PaymentMethod)}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                            selectedPaymentMethod === m.id
                              ? 'bg-orange-600/15 border-orange-500 text-white shadow-lg shadow-orange-600/10'
                              : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold text-stone-200 flex items-center gap-1.5">
                              <Icon className={`w-3.5 h-3.5 ${m.accent}`} />
                              <span>{m.name}</span>
                            </span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-400">
                              {m.badge}
                            </span>
                          </div>
                          <div className="text-[10px] font-mono text-stone-400">{m.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[10px] font-mono text-stone-500 mt-1.5">
                    * Standard Atelier structure: 50% milestone commencement deposit, 50% upon final delivery &amp; IP transfer.
                  </p>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Action Controls */}
        <div className="px-6 py-4 border-t border-stone-800 bg-stone-950 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-orange-600/30 transition-all cursor-pointer"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmitOrder}
              className="px-7 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold flex items-center gap-2 shadow-xl shadow-orange-600/40 transform hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Submit Commission Order</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

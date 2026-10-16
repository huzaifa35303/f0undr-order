import type { CurrencyConfig } from '../types';

export const F0UNDR_STUDIO_CONFIG = {
  name: 'f0undr',
  studioTitle: 'f0undr Order & Engineering Atelier',
  tagline: 'Bespoke Software, Autonomous AI, Games & High-Impact Creative Production',
  founder: 'M.Huzaifa',
  coFounders: ['Abdull Rehman Khizar', 'f0undr'],
  // Official Exclusive Ordering Channels
  whatsappNumber: '+923446789261',
  phoneNumber: '03446789261',
  phoneInternational: '+923446789261',
  discordUsername: 'king_huzaifa001',
  orderNotice: 'Orders are accepted exclusively via WhatsApp, Discord (king_huzaifa001), or Direct Call on 03446789261. No other way.',

  githubUrl: 'https://github.com/f0undr',
  twitterUrl: 'https://x.com/f0undr_core',
  
  // Official Payment Gateways
  payments: {
    stripe: {
      name: 'Stripe',
      label: 'Stripe (Credit / Debit Card, Apple Pay)',
      badge: 'Stripe Verified Merchant',
      description: 'Instant credit card, Apple Pay, and Google Pay checkout with 256-bit SSL encryption.',
      defaultCheckoutUrl: 'https://buy.stripe.com/f0undr_atelier',
      supportedCurrencies: ['USD', 'GBP', 'EUR'] as const
    },
    paypal: {
      name: 'PayPal',
      label: 'PayPal (Global Wallet & Buyer Protection)',
      badge: 'PayPal Protected',
      description: 'Global PayPal balance or linked cards with full buyer protection and milestone safety.',
      defaultPaymentUrl: 'https://paypal.me/kinghuzaifa001',
      username: 'king_huzaifa001',
      supportedCurrencies: ['USD', 'GBP', 'EUR'] as const
    },
    bankTransfer: {
      name: 'Direct Bank / Raast (PKR)',
      label: 'Direct Bank Transfer / Raast (Pakistan)',
      badge: 'Instant 0% Fee',
      description: 'Direct wire or Raast transfer within Pakistan or International SWIFT wire.',
      raastId: '03446789261',
      supportedCurrencies: ['PKR', 'USD'] as const
    }
  },

  // Default admin PIN for the cockpit
  defaultAdminPin: 'f0undr',
  
  // Guarantees and policies
  guarantees: [
    {
      title: '100% IP & Code Ownership',
      description: 'You own every line of code, asset, Figma frame, 3D model, and prompt pipeline. No vendor lock-in ever.',
      icon: 'ShieldCheck'
    },
    {
      title: 'Milestone-Based Escrow / Security',
      description: 'Work is broken into structured phases. Review deliverables at each stage before moving to the next.',
      icon: 'Layers'
    },
    {
      title: 'Strict Non-Disclosure (NDA)',
      description: 'Your proprietary algorithms, business secrets, and commercial vision are protected under confidentiality.',
      icon: 'FileLock2'
    },
    {
      title: 'Post-Launch Technical Warranty',
      description: 'Every project comes with 14 to 30 days of complimentary bug fixes, deployment support, and assistance.',
      icon: 'Sparkles'
    }
  ]
};

export const SUPPORTED_CURRENCIES: CurrencyConfig[] = [
  { code: 'USD', symbol: '$', rateAgainstUsd: 1.0, name: 'US Dollars', shortLabel: 'Dollars ($)' },
  { code: 'GBP', symbol: '£', rateAgainstUsd: 0.78, name: 'British Pounds', shortLabel: 'Pounds (£)' },
  { code: 'PKR', symbol: '₨', rateAgainstUsd: 280.0, name: 'Pakistani Rupee', shortLabel: 'PKR (₨)' },
  { code: 'EUR', symbol: '€', rateAgainstUsd: 0.92, name: 'Euros', shortLabel: 'Euros (€)' }
];

export const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  submitted: { label: 'Order Received', color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/30' },
  under_review: { label: 'Under Review', color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/30' },
  scope_approved: { label: 'Scope Approved', color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/30' },
  in_development: { label: 'In Development', color: 'text-orange-400', bg: 'bg-orange-400/10 border-orange-400/30' },
  qa_testing: { label: 'QA & Testing', color: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/30' },
  delivered: { label: 'Completed & Delivered', color: 'text-emerald-400', bg: 'bg-emerald-400/15 border-emerald-400/40' },
  on_hold: { label: 'On Hold', color: 'text-stone-400', bg: 'bg-stone-400/10 border-stone-400/30' }
};

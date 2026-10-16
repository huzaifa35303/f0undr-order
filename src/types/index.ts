export type ServiceId = 
  | 'websites'
  | 'apps'
  | 'games'
  | 'videos'
  | 'images'
  | 'ads'
  | 'tools'
  | 'ai';

export type ServiceTier = 'starter' | 'pro' | 'enterprise';

export type TimelineUrgency = 'standard' | 'rush' | 'flexible';

export type OrderStatus = 
  | 'submitted'
  | 'under_review'
  | 'scope_approved'
  | 'in_development'
  | 'qa_testing'
  | 'delivered'
  | 'on_hold';

export type Currency = 'USD' | 'GBP' | 'PKR' | 'EUR';

export type PaymentMethod = 'stripe' | 'paypal' | 'bank_transfer';

export interface ServiceFeatureOption {
  id: string;
  name: string;
  description: string;
  estimatedPriceUsd: number;
  popular?: boolean;
}

export interface ServiceCategory {
  id: ServiceId;
  title: string;
  shortDescription: string;
  fullDescription: string;
  badge: string;
  iconName: string;
  startingPriceUsd: number;
  estimatedDays: string;
  deliverables: string[];
  techStack: string[];
  featuresList: ServiceFeatureOption[];
  sampleWorks: {
    title: string;
    description: string;
    tags: string[];
  }[];
}

export interface ClientInfo {
  name: string;
  phoneOrWhatsapp: string;
  discord?: string;
  companyOrBrand?: string;
  country?: string;
  preferredContactMethod: 'whatsapp' | 'discord' | 'call';
}



export interface OrderMilestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  targetDate?: string;
}

export interface Order {
  id: string; // e.g. F0-2026-9281
  createdAt: string;
  updatedAt: string;
  serviceId: ServiceId;
  serviceTitle: string;
  tier: ServiceTier;
  urgency: TimelineUrgency;
  projectTitle: string;
  projectDescription: string;
  selectedFeatures: string[]; // list of feature IDs
  additionalAddons?: string[];
  techStackPreference?: string;
  referenceLinks?: string[]; // Figma, Github, Drive, etc.
  targetBudgetUsd: number;
  currency?: Currency;
  paymentMethod?: PaymentMethod;
  estimatedDays: number;
  client: ClientInfo;
  status: OrderStatus;
  milestones: OrderMilestone[];
  internalNotes?: string;
  assignedLead?: string; // e.g. 'M.Huzaifa', 'Abdull Rehman Khizar', etc.
  source?: 'wizard' | 'express_brief' | 'manual_admin';
}

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rateAgainstUsd: number; // 1 USD = rate
  name: string;
  shortLabel: string;
}

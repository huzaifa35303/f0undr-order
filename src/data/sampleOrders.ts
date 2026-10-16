import type { Order } from '../types';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'F0-2026-9281',
    createdAt: '2026-10-14T14:30:00Z',
    updatedAt: '2026-10-15T10:15:00Z',
    serviceId: 'ai',
    serviceTitle: 'Autonomous AI Systems & LLMs',
    tier: 'enterprise',
    urgency: 'standard',
    projectTitle: 'Multi-Agent Autonomous Financial Analyst with RAG',
    projectDescription: 'Enterprise AI agent architecture connecting private SEC 10-K filings, real-time market data API, and automated PDF dossier generation using LangChain and Gemini 2.0 Flash.',
    selectedFeatures: ['ai_rag', 'ai_autonomous_agent', 'ai_finetune'],
    techStackPreference: 'Python, Gemini 2.0 Flash, Qdrant, FastAPI, Next.js',
    referenceLinks: ['https://github.com/sample/financial-rag', 'https://f0undr.vercel.app/'],
    targetBudgetUsd: 3200,
    currency: 'USD',
    paymentMethod: 'stripe',
    estimatedDays: 14,
    client: {
      name: 'Tariq Al-Mansoor',
      phoneOrWhatsapp: '+971501234567',
      discord: 'tariq_invest',
      companyOrBrand: 'Apollo Capital Partners',
      country: 'United Arab Emirates',
      preferredContactMethod: 'whatsapp'
    },
    status: 'in_development',
    milestones: [
      { id: 'm1', title: 'Data Ingestion & PDF Extraction Pipeline', description: 'Parse complex multi-column PDFs with PyMuPDF', completed: true, targetDate: '2026-10-15' },
      { id: 'm2', title: 'Vector DB Indexing & RAG Retrieval Tuning', description: 'Semantic chunking and hybrid dense/sparse search', completed: true, targetDate: '2026-10-18' },
      { id: 'm3', title: 'Agent Tool-Calling & Autonomous Reasoning', description: 'Integrate financial calculation tools and live web search', completed: false, targetDate: '2026-10-22' },
      { id: 'm4', title: 'Next.js Frontend & Executive Dashboard', description: 'Clean dark UI with live streaming generation', completed: false, targetDate: '2026-10-27' }
    ],
    assignedLead: 'M.Huzaifa',
    internalNotes: 'Client prioritizes accuracy over latency. Using Gemini 2.0 with strict temperature 0.1.',
    source: 'wizard'
  },
  {
    id: 'F0-2026-8314',
    createdAt: '2026-10-12T09:00:00Z',
    updatedAt: '2026-10-15T18:00:00Z',
    serviceId: 'websites',
    serviceTitle: 'Websites & Web Platforms',
    tier: 'pro',
    urgency: 'standard',
    projectTitle: 'Luxury Chronograph Brand Flagship Store',
    projectDescription: 'Bespoke editorial e-commerce platform for high-end mechanical watch brand. Smooth scroll physics, 3D interactive watch preview, and custom Stripe checkout.',
    selectedFeatures: ['web_payments', 'web_admin', 'web_seo'],
    techStackPreference: 'React, Next.js, Tailwind CSS, Supabase, Stripe',
    referenceLinks: ['https://figma.com/@chronos/preview', 'https://f0undr.vercel.app/'],
    targetBudgetUsd: 1450,
    currency: 'GBP',
    paymentMethod: 'stripe',
    estimatedDays: 12,
    client: {
      name: 'Julian Vance',
      phoneOrWhatsapp: '+447911123456',
      discord: 'julian_vance',
      companyOrBrand: 'Vance & Co. Horology',
      country: 'United Kingdom',
      preferredContactMethod: 'discord'
    },
    status: 'qa_testing',
    milestones: [
      { id: 'm1', title: 'Figma to Pixel-Perfect Code Conversion', description: 'Complete typography and mobile responsive layouts', completed: true, targetDate: '2026-10-14' },
      { id: 'm2', title: 'Catalog, Cart & Currency Converter Integration', description: 'Multi-currency support for USD, GBP, EUR', completed: true, targetDate: '2026-10-17' },
      { id: 'm3', title: 'Stripe Webhooks & Order Fulfillment System', description: 'Instant receipts and customer portal', completed: true, targetDate: '2026-10-20' },
      { id: 'm4', title: 'Cross-Device QA & Final Delivery', description: 'Lighthouse 98+ check and live domain hookup', completed: false, targetDate: '2026-10-23' }
    ],
    assignedLead: 'Abdull Rehman Khizar',
    internalNotes: 'Design requires extra care on watch dial textures.',
    source: 'wizard'
  },
  {
    id: 'F0-2026-7950',
    createdAt: '2026-10-08T16:20:00Z',
    updatedAt: '2026-10-14T11:00:00Z',
    serviceId: 'tools',
    serviceTitle: 'Custom Tools, Scrapers & Automations',
    tier: 'pro',
    urgency: 'rush',
    projectTitle: 'Real-Estate MLS Arbitrage Scraper & Discord Alert Bot',
    projectDescription: 'Python Playwright worker scraping off-market listings across 4 regional portals every 15 minutes, filtering for 20%+ below market value, and alerting our private Discord channel.',
    selectedFeatures: ['tool_scraper', 'tool_bot', 'tool_cron_workflow'],
    techStackPreference: 'Python 3.12, Playwright, PostgreSQL, Discord.py, Docker',
    targetBudgetUsd: 880,
    currency: 'PKR',
    paymentMethod: 'bank_transfer',
    estimatedDays: 7,
    client: {
      name: 'Ahmed Malik',
      phoneOrWhatsapp: '+923214567890',
      discord: 'ahmed_malik',
      companyOrBrand: 'Malik Real Estate Ventures',
      country: 'Pakistan',
      preferredContactMethod: 'whatsapp'
    },
    status: 'delivered',
    milestones: [
      { id: 'm1', title: 'Anti-Bot & Proxy Rotation Layer', description: 'Bypassing Cloudflare Turnstile safely', completed: true, targetDate: '2026-10-10' },
      { id: 'm2', title: 'Listing Parser & Valuation Formula Engine', description: 'Normalized database schema with price history', completed: true, targetDate: '2026-10-12' },
      { id: 'm3', title: 'Discord Channel Broadcast & Alerts', description: 'Format alert with photo, price, GPS map link', completed: true, targetDate: '2026-10-14' }
    ],
    assignedLead: 'M.Huzaifa',
    internalNotes: 'Delivered and tested on Docker. Client confirmed receiving live alerts smoothly.',
    source: 'wizard'
  },
  {
    id: 'F0-2026-8802',
    createdAt: '2026-10-16T08:00:00Z',
    updatedAt: '2026-10-16T08:00:00Z',
    serviceId: 'videos',
    serviceTitle: 'Videos & Cinematic 3D Production',
    tier: 'pro',
    urgency: 'standard',
    projectTitle: '3D CGI Commercial for Quantum Smart Ring',
    projectDescription: '60-second cinematic 3D reveal video showcasing titanium casing, biosensors, waterproof seal, and accompanying smartphone app screen.',
    selectedFeatures: ['vid_3d_cgi', 'vid_voiceover', 'vid_sound_design', 'vid_subtitles'],
    techStackPreference: 'Blender 3D, After Effects, DaVinci Resolve',
    targetBudgetUsd: 920,
    currency: 'USD',
    paymentMethod: 'paypal',
    estimatedDays: 8,
    client: {
      name: 'Sophia Lindqvist',
      phoneOrWhatsapp: '+46701234567',
      discord: 'sophia_lind',
      companyOrBrand: 'Nordic Ring',
      country: 'Sweden',
      preferredContactMethod: 'call'
    },
    status: 'submitted',
    milestones: [
      { id: 'm1', title: '3D CAD Import & Shader Texturing', description: 'Polished brushed titanium and sapphire crystal glass', completed: false, targetDate: '2026-10-19' },
      { id: 'm2', title: 'Camera Animatics & Storyboard Preview', description: '30-second low-res animatic review with client', completed: false, targetDate: '2026-10-21' },
      { id: 'm3', title: 'Full 4K Render, VO & Sound Design', description: 'Final compositing, audio mastering and format exports', completed: false, targetDate: '2026-10-24' }
    ],
    assignedLead: 'Abdull Rehman Khizar',
    internalNotes: 'New order received. Awaiting initial 50% deposit confirmation.',
    source: 'wizard'
  }
];

import type { ServiceCategory } from '../types';

export const SERVICES_DATA: ServiceCategory[] = [
  {
    id: 'websites',
    title: 'Websites & Web Platforms',
    shortDescription: 'High-performance SaaS apps, modern landing pages, e-commerce & portals engineered for conversions.',
    fullDescription: 'We build ultra-fast, visually striking, and technically solid websites and full-stack web applications. From editorial landing pages to complex multi-tenant SaaS platforms with authentication, billing, and real-time data.',
    badge: 'High Conversion · 99+ Lighthouse',
    iconName: 'Globe',
    startingPriceUsd: 499,
    estimatedDays: '5 - 18 Days',
    deliverables: [
      'Production-Ready Source Code (Git repository)',
      'Responsive Mobile & Tablet Design',
      'Vercel / Cloudflare / AWS Live Deployment',
      'SEO Metadata & OpenGraph Optimization',
      'Stripe / LemonSqueezy / Crypto Payments (Optional)',
      '14-Day Free Post-Launch Warranty'
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Supabase'],
    featuresList: [
      { id: 'web_auth', name: 'User Authentication & RBAC', description: 'Email/Password, Google OAuth, GitHub, Magic Links & permissions', estimatedPriceUsd: 150, popular: true },
      { id: 'web_payments', name: 'Stripe / Payment Gateway', description: 'Checkout sessions, subscriptions, billing portal & invoices', estimatedPriceUsd: 200, popular: true },
      { id: 'web_cms', name: 'Custom Headless CMS / Blog', description: 'Effortlessly create and manage blog posts, case studies & pages', estimatedPriceUsd: 180 },
      { id: 'web_admin', name: 'Full Admin Dashboard', description: 'Metrics, user tables, audit logs, data exports & analytics', estimatedPriceUsd: 300, popular: true },
      { id: 'web_realtime', name: 'Real-time WebSockets / Chat', description: 'Live notifications, multiplayer sync, or direct chat', estimatedPriceUsd: 250 },
      { id: 'web_seo', name: 'Advanced Programmatic SEO & Schema', description: 'Dynamic sitemaps, JSON-LD structured schema for Google Rank #1', estimatedPriceUsd: 140 }
    ],
    sampleWorks: [
      { title: 'f0undr Digital Atelier', description: 'Editorial typography, lightning-fast SPA with zero layout shift.', tags: ['React', 'Tailwind', 'Vite'] },
      { title: 'Venture Metrics Portal', description: 'High-throughput investor analytics and data room with Stripe billing.', tags: ['Next.js', 'PostgreSQL', 'Charts'] },
      { title: 'Artisan Commerce Flagship', description: 'Direct-to-consumer store with instant checkout and inventory sync.', tags: ['Shopify Headless', 'Tailwind'] }
    ]
  },
  {
    id: 'apps',
    title: 'Mobile & Desktop Apps',
    shortDescription: 'Native-feel iOS, Android, and cross-platform desktop applications with fluid 120Hz animations.',
    fullDescription: 'Custom mobile and desktop software engineered using Flutter, React Native, or Tauri. We deliver fluid 60/120fps interfaces, offline-first data caching, push notifications, and App Store / Google Play submission assistance.',
    badge: 'iOS · Android · Desktop',
    iconName: 'Smartphone',
    startingPriceUsd: 799,
    estimatedDays: '10 - 28 Days',
    deliverables: [
      'Full Application Source Code',
      'iOS IPA & Android APK / AAB Release Builds',
      'App Store & Google Play Store Submission Assets',
      'Offline-First Local Storage Engine',
      'Firebase / Supabase Backend Integration',
      '30-Day Technical Support Guarantee'
    ],
    techStack: ['Flutter', 'Dart', 'React Native', 'Expo', 'Tauri', 'Swift', 'Kotlin'],
    featuresList: [
      { id: 'app_push', name: 'Push Notifications (APNs & FCM)', description: 'Targeted user notifications, rich media previews & badge counts', estimatedPriceUsd: 160, popular: true },
      { id: 'app_offline', name: 'Offline Sync & SQLite/Hive DB', description: 'Full functionality without internet, auto-sync when back online', estimatedPriceUsd: 220, popular: true },
      { id: 'app_biometrics', name: 'FaceID & Biometric Lock', description: 'Secure biometric authentication & encrypted keystore storage', estimatedPriceUsd: 120 },
      { id: 'app_inapp', name: 'In-App Purchases (RevenueCat / Stripe)', description: 'Subscriptions, consumable tokens & cross-platform entitlements', estimatedPriceUsd: 280, popular: true },
      { id: 'app_camera_gps', name: 'Camera, Media & Geolocation Services', description: 'Live photo capture, background GPS tracking & interactive maps', estimatedPriceUsd: 200 },
      { id: 'app_store_setup', name: 'Full Store Listing & Approval Service', description: 'Screenshots, privacy policy, compliance testing & store rollout', estimatedPriceUsd: 250 }
    ],
    sampleWorks: [
      { title: 'Zenith Focus Suite', description: 'Cross-platform timeboxing & deep work tracker with cloud sync.', tags: ['Flutter', 'Firebase', 'iOS/Android'] },
      { title: 'FleetLog Logistics App', description: 'Driver route optimization, offline QR scanner & dispatch telemetry.', tags: ['React Native', 'Mapbox', 'Node'] },
      { title: 'Pulse Audio Recorder', description: 'Ultra-low latency audio processing & AI transcription on device.', tags: ['Flutter', 'Tauri', 'AudioEngine'] }
    ]
  },
  {
    id: 'games',
    title: 'Games & Interactive Experiences',
    shortDescription: '2D & 3D browser games, indie game prototypes, interactive 3D simulations & gamified web apps.',
    fullDescription: 'Engaging games built with Three.js, WebGL, Unity, or Godot. Whether you need a viral playable web experience, an educational game for a brand campaign, or a complete 2D/3D indie prototype with mechanics and audio.',
    badge: '2D / 3D · WebGL · Unity',
    iconName: 'Gamepad2',
    startingPriceUsd: 699,
    estimatedDays: '8 - 25 Days',
    deliverables: [
      'Game Source Project (Unity, Godot, or WebGL)',
      'Playable Web Build (HTML5) or Executable Windows/Mac',
      'Custom Sound FX & Dynamic Background Audio',
      'Physics Engine Tuning & Responsive Controls',
      'High Score / Leaderboard System',
      'Commercial Usage License'
    ],
    techStack: ['Three.js', 'Unity (C#)', 'Godot', 'PixiJS', 'GLSL Shaders', 'WebAudio API'],
    featuresList: [
      { id: 'game_multiplayer', name: 'Real-Time Multiplayer (WebSockets)', description: 'Live lobby, player synchronization & low-latency state match', estimatedPriceUsd: 400, popular: true },
      { id: 'game_leaderboard', name: 'Global Leaderboards & Player Accounts', description: 'Cloud scores, anti-cheat validation & daily rank resets', estimatedPriceUsd: 180, popular: true },
      { id: 'game_3d_assets', name: 'Custom 3D Low-Poly / Stylized Models', description: 'Character models, environment props & custom texture maps', estimatedPriceUsd: 280 },
      { id: 'game_mobile_controls', name: 'Mobile Virtual Joystick & Gyroscope', description: 'Silky touch controls, haptic vibration feedback & portrait/landscape', estimatedPriceUsd: 140 },
      { id: 'game_sfx', name: 'Bespoke SFX & Original Synth Soundtrack', description: 'High quality sound effects, ambient stems & interactive audio triggers', estimatedPriceUsd: 190 }
    ],
    sampleWorks: [
      { title: 'Orbital Rift 3D', description: 'Browser WebGL space runner with dynamic neon shaders and synth soundtrack.', tags: ['Three.js', 'GLSL', 'WebAudio'] },
      { title: 'Pixel Dungeon Quest', description: 'Retro 16-bit roguelike dungeon crawler with procedural level generation.', tags: ['Godot', 'C#', 'PixelArt'] },
      { title: 'Brand Arcade Runner', description: 'Viral marketing browser runner collecting company discount tokens.', tags: ['PixiJS', 'TypeScript'] }
    ]
  },
  {
    id: 'videos',
    title: 'Videos & Cinematic 3D Production',
    shortDescription: 'Product explainer videos, cinematic 3D animations, launch trailers, and high-impact viral reels.',
    fullDescription: 'High-production video content that captures attention in seconds. We produce sleek product teasers, 3D CGI device animations, UI showcase walkthroughs, and social-first video series tailored for YouTube, Instagram, TikTok, and X.',
    badge: '4K Ultra HD · 3D CGI · Motion',
    iconName: 'Video',
    startingPriceUsd: 349,
    estimatedDays: '3 - 12 Days',
    deliverables: [
      'Master Video in 4K ProRes & 1080p MP4',
      'Multi-Format Cuts: 16:9 (Landscape) & 9:16 (Vertical)',
      'Professional Voiceover (Studio Actor or Natural AI Voice)',
      'Custom Motion Graphics & Kinetic Typography',
      'Licensed Commercial Soundtrack & Foley Audio',
      'Raw Project Files (After Effects / Premiere / Blender)'
    ],
    techStack: ['Blender 3D', 'After Effects', 'Premiere Pro', 'DaVinci Resolve', 'ElevenLabs Pro', 'Cinema 4D'],
    featuresList: [
      { id: 'vid_3d_cgi', name: 'Photorealistic 3D Device & Product Animation', description: 'Glass refraction, metallic shaders & dynamic 360 camera spins', estimatedPriceUsd: 250, popular: true },
      { id: 'vid_voiceover', name: 'Studio Voiceover & Scriptwriting', description: 'High-converting storytelling script + broadcast audio mastering', estimatedPriceUsd: 140, popular: true },
      { id: 'vid_sound_design', name: 'Cinematic Sound Design & Impact Stems', description: 'Custom whooshes, risers, mechanical clicks & ambient scoring', estimatedPriceUsd: 120 },
      { id: 'vid_subtitles', name: 'Dynamic Animated Captions & Subtitles', description: 'Trendy word-by-word highlighted captions for maximum retention', estimatedPriceUsd: 80, popular: true },
      { id: 'vid_social_pack', name: 'Pack of 3 Viral Short-Form Cutdowns', description: 'Fast-paced hook variations for TikTok, Instagram Reels & YouTube Shorts', estimatedPriceUsd: 180 }
    ],
    sampleWorks: [
      { title: 'f0undr Core OS Reveal', description: 'Minimalist cinematic 3D sequence unveiling computational software architecture.', tags: ['Blender', 'AfterEffects', '4K'] },
      { title: 'SaaS Platform Explainer (60s)', description: 'Isometric UI motion graphics explaining distributed cloud infrastructure.', tags: ['MotionGraphics', 'VO'] },
      { title: 'Apex Hardware Launch Trailer', description: 'High-energy 3D product render with metallic lighting and intense sound design.', tags: ['Cinema4D', 'DaVinci'] }
    ]
  },
  {
    id: 'images',
    title: 'Images, 3D Renders & UI/UX Design',
    shortDescription: 'Photorealistic 3D renders, complete brand design, Figma UI systems & stunning marketing graphics.',
    fullDescription: 'Visual craftsmanship that elevates your company to premium tier. We design bespoke brand identities, vector logos, high-resolution 3D product renders, modern Figma design systems, and cohesive graphic packages.',
    badge: 'Figma Systems · 3D Renders · Vector',
    iconName: 'Image',
    startingPriceUsd: 249,
    estimatedDays: '3 - 8 Days',
    deliverables: [
      'Figma Master File with Design Tokens & Auto-Layout',
      'High-Resolution 4K Renders (PNG, WebP, SVG)',
      'Vector Logo Suite (Monochrome, Dark/Light, Favicon)',
      'Brand Guidelines Manual (Colors, Typography, Usage Rules)',
      'Full Commercial & Trademark Rights'
    ],
    techStack: ['Figma', 'Blender', 'Adobe Illustrator', 'Photoshop', 'Midjourney v6', 'Substance Painter'],
    featuresList: [
      { id: 'img_figma_system', name: 'Full Figma UI/UX Design System', description: 'Components, typography scales, responsive frames & interactive prototype', estimatedPriceUsd: 260, popular: true },
      { id: 'img_3d_mockups', name: '3D Hardware / Packaging Photorealistic Mockups', description: 'Ultra-crisp 4K renders from multiple studio lighting angles', estimatedPriceUsd: 160, popular: true },
      { id: 'img_brand_identity', name: 'Complete Brand Identity & Vector Logos', description: 'Primary mark, secondary badge, typography pairing & color manifesto', estimatedPriceUsd: 190, popular: true },
      { id: 'img_social_kit', name: 'Social Media Kit (Banners, Post Templates)', description: 'Matching graphics for X, LinkedIn, YouTube, Instagram & Discord', estimatedPriceUsd: 110 },
      { id: 'img_iconography', name: 'Bespoke Icon & Vector Illustration Pack', description: '20+ custom vector icons designed to match your brand style exactly', estimatedPriceUsd: 130 }
    ],
    sampleWorks: [
      { title: 'Aether Brand & Typography System', description: 'Complete editorial design system with bespoke typography and dark aesthetic.', tags: ['Figma', 'BrandSystem'] },
      { title: 'Quantum Hardware 3D Pack', description: '8 photorealistic studio renders of custom PCB and aluminum enclosures.', tags: ['Blender', 'Cycles', '4K'] },
      { title: 'Fintech Mobile UI/UX Kit', description: '60+ screens with interactive micro-interactions and atomic component library.', tags: ['Figma', 'Prototype'] }
    ]
  },
  {
    id: 'ads',
    title: 'High-Converting Ads & Creative Campaigns',
    shortDescription: 'Performance ad creatives, video ads, copy hooks & multi-platform campaign assets engineered for ROI.',
    fullDescription: 'Stop scrolling and drive clicks. We produce data-informed, psychologicially sound advertising creatives across Meta (Facebook & Instagram), Google Display, YouTube, TikTok, and X. Backed by rigorous copywriting and high-converting visual hooks.',
    badge: 'Meta · TikTok · Google · ROI Driven',
    iconName: 'Megaphone',
    startingPriceUsd: 299,
    estimatedDays: '3 - 7 Days',
    deliverables: [
      'Pack of Static & Animated Ad Creatives in All Ratios',
      'High-Converting Ad Copy Variations (Angles, Headlines, CTAs)',
      'A/B Testing Strategy & Creative Framework Guide',
      'Raw Source Files & Ready-To-Upload Export Folders',
      'Ad Platform Spec Compliance Guaranteed'
    ],
    techStack: ['Photoshop', 'After Effects', 'Figma', 'Copywriting Matrix', 'Meta Ads Manager'],
    featuresList: [
      { id: 'ad_video_hooks', name: 'Set of 5 High-Retention Video Ad Hooks', description: 'First 3-second hook variations designed to drop CPM and boost VTR', estimatedPriceUsd: 220, popular: true },
      { id: 'ad_static_pack', name: 'Pack of 10 Static Performance Ad Creatives', description: 'Problem-solution, social proof, comparison charts & feature callouts', estimatedPriceUsd: 180, popular: true },
      { id: 'ad_copywriting', name: 'Full Performance Copywriting Pack', description: 'Primary text, punchy headlines, descriptions & emotional angles', estimatedPriceUsd: 130, popular: true },
      { id: 'ad_ugc_style', name: 'UGC-Style Product Demonstration Ads', description: 'Authentic phone-camera aesthetic with natural voice and text overlays', estimatedPriceUsd: 250 },
      { id: 'ad_retargeting', name: 'Bottom-of-Funnel Retargeting Bundle', description: 'Urgency, FAQ-busters, money-back guarantee badges & discounts', estimatedPriceUsd: 140 }
    ],
    sampleWorks: [
      { title: 'HyperScale SaaS Meta Ad Pack', description: '12 multi-ratio ads producing 3.4x ROAS on cold traffic testing.', tags: ['MetaAds', 'Motion', 'Copywriting'] },
      { title: 'E-Commerce Viral TikTok Creative', description: 'Paced UGC hook with 1.8M organic views and 4.2% click-through rate.', tags: ['TikTok', 'VerticalVideo'] },
      { title: 'B2B Founder Campaign for LinkedIn', description: 'Editorial carousel ads establishing founder authority and enterprise leads.', tags: ['LinkedIn', 'Carousel'] }
    ]
  },
  {
    id: 'tools',
    title: 'Custom Tools, Scrapers & Automations',
    shortDescription: 'Tailored Python/Node scripts, web scrapers, Telegram/Discord bots, Chrome extensions & internal dashboards.',
    fullDescription: 'Automate tedious work and build high-leverage unfair advantages. We build custom data scrapers that bypass anti-bot shields, autonomous Telegram/Discord bots with crypto or API triggers, Chrome extensions, and specialized internal productivity tools.',
    badge: 'Python · Node · Scrapers · Bots',
    iconName: 'Wrench',
    startingPriceUsd: 399,
    estimatedDays: '4 - 14 Days',
    deliverables: [
      'Clean, Documented Source Code (Python, TypeScript, or Go)',
      '1-Click Docker Compose Setup or Cloud Server Deploy',
      'API Key & Secret Encryption Layer',
      'Automated Error Handling & Telegram Alerts on Failure',
      'Complete README & Setup Video Walkthrough',
      '30-Day Maintenance & Patch Warranty'
    ],
    techStack: ['Python', 'Node.js', 'Playwright / Selenium', 'Docker', 'FastAPI', 'PostgreSQL', 'Telegram Bot API'],
    featuresList: [
      { id: 'tool_scraper', name: 'Resilient Web Scraper & Data Pipeline', description: 'Rotating proxies, CAPTCHA solving, structured JSON/Excel output', estimatedPriceUsd: 220, popular: true },
      { id: 'tool_bot', name: 'Interactive Telegram or Discord Bot', description: 'Commands, interactive buttons, payment verification & user memory', estimatedPriceUsd: 240, popular: true },
      { id: 'tool_extension', name: 'Custom Chrome / Browser Extension', description: 'DOM manipulation, background service worker & popup dashboard', estimatedPriceUsd: 260, popular: true },
      { id: 'tool_cron_workflow', name: 'Scheduled Cloud Cron Automation', description: 'Runs 24/7 on AWS/DigitalOcean with zero manual intervention', estimatedPriceUsd: 150 },
      { id: 'tool_reverse_api', name: 'Reverse Engineering & Private API Wrapper', description: 'Unlock programmatic access to undocumented platforms and workflows', estimatedPriceUsd: 320 }
    ],
    sampleWorks: [
      { title: 'Apex Market Arbitrage Scraper', description: 'Scrapes 15,000 product SKUs hourly with residential proxies and diff alerts.', tags: ['Python', 'Playwright', 'FastAPI'] },
      { title: 'Crypto Alpha Telegram Bot', description: 'Monitors on-chain liquidity pools and broadcasts buy alerts in sub-second speed.', tags: ['Node.js', 'Web3', 'Telegram'] },
      { title: 'LinkedIn Outreach Extension', description: 'Chrome extension pulling enriched profile data into Notion CRM with 1 click.', tags: ['ManifestV3', 'TypeScript'] }
    ]
  },
  {
    id: 'ai',
    title: 'AI Systems, Custom Agents & LLMs',
    shortDescription: 'Autonomous AI agents, RAG document intelligence, fine-tuned models & voice bots built for production.',
    fullDescription: 'State-of-the-art applied artificial intelligence. Led by M.Huzaifa, we architect custom LLM orchestration pipelines, multi-agent swarms with tool execution, RAG systems grounded on your private enterprise documentation, and high-throughput neural inference.',
    badge: 'Autonomous Agents · RAG · Fine-Tuning',
    iconName: 'BrainCircuit',
    startingPriceUsd: 899,
    estimatedDays: '7 - 24 Days',
    deliverables: [
      'Production AI Codebase & Agent Architecture',
      'Vector Database Setup (Pinecone / Qdrant / pgvector)',
      'Prompt Engineering & Evaluation Benchmark Suite',
      'Guaranteed Zero-Hallucination Guardrails',
      'Cost-Optimized Token Caching Strategy',
      'Full API Documentation & Post-Launch Support'
    ],
    techStack: ['Gemini 1.5/2.0 API', 'Claude 3.5 Sonnet', 'OpenAI', 'LangChain', 'LlamaIndex', 'Python', 'Qdrant', 'PyTorch'],
    featuresList: [
      { id: 'ai_rag_kb', name: 'RAG Knowledge Base over PDFs & DBs', description: 'Grounds AI responses in your private docs with citations & source links', estimatedPriceUsd: 320, popular: true },
      { id: 'ai_agents', name: 'Autonomous Multi-Agent Task Swarm', description: 'Agents that research, query APIs, write code, and execute multi-step workflows', estimatedPriceUsd: 450, popular: true },
      { id: 'ai_chat_widget', name: 'Branded Embedded AI Chatbot Widget', description: 'Embeds into any website with customized persona, streaming & history', estimatedPriceUsd: 220, popular: true },
      { id: 'ai_vision', name: 'Computer Vision & Document OCR Engine', description: 'Extracts tabular data from receipts, invoices, IDs & video streams', estimatedPriceUsd: 350 },
      { id: 'ai_voice', name: 'Conversational Voice AI Agent', description: 'Sub-second real-time speech-to-speech agent for customer calls', estimatedPriceUsd: 480 },
      { id: 'ai_fine_tune', name: 'Custom Fine-Tuning & Quantization', description: 'Fine-tune open-weights models (DeepSeek, Llama) for private deployment', estimatedPriceUsd: 600 }
    ],
    sampleWorks: [
      { title: 'Neural Latency Engine', description: 'Distributed multi-agent pipeline processing enterprise support tickets autonomously.', tags: ['Python', 'Agents', 'FastAPI'] },
      { title: 'f0 Custom AI Assistant', description: 'High-throughput coding and research copilot with vector memory and web search.', tags: ['Gemini', 'LangChain', 'React'] },
      { title: 'Medical Case RAG Intelligence', description: 'Synthesizes clinical trial papers and outputs structured diagnostic summaries.', tags: ['Qdrant', 'LlamaIndex', 'Embeddings'] }
    ]
  }
];

export const TIER_CONFIG = {
  starter: {
    name: 'Starter / MVP',
    multiplier: 1.0,
    timeReduction: 0,
    badge: 'Fastest Launch',
    description: 'Perfect for initial prototypes, proof-of-concept launches, and fast turnaround MVPs with essential core features.'
  },
  pro: {
    name: 'Pro / Growth',
    multiplier: 1.6,
    timeReduction: 0,
    badge: 'Most Popular',
    description: 'Comprehensive production-ready build with custom styling, advanced features, full integrations, and high performance.'
  },
  enterprise: {
    name: 'Enterprise / Custom Flagship',
    multiplier: 2.5,
    timeReduction: 0,
    badge: 'Max Scalability',
    description: 'Top-tier architecture designed for heavy traffic, custom security audits, SLA guarantees, dedicated senior engineer lead, and white-glove onboarding.'
  }
};

export const URGENCY_CONFIG = {
  standard: {
    name: 'Standard Pace',
    multiplier: 1.0,
    daysMultiplier: 1.0,
    badge: 'Regular Delivery',
    description: 'Normal studio sprint schedule with standard milestone reviews.'
  },
  rush: {
    name: 'Rush / High Priority Sprint',
    multiplier: 1.35,
    daysMultiplier: 0.55,
    badge: '⚡ 45% Faster',
    description: 'Immediate jump to front of development queue with daily sync updates.'
  },
  flexible: {
    name: 'Flexible Schedule',
    multiplier: 0.9,
    daysMultiplier: 1.3,
    badge: '10% Savings',
    description: 'No strict deadline pressure; flexible delivery saves on budget.'
  }
};

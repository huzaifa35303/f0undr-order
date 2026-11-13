import { F0UNDR_STUDIO_CONFIG } from '../data/f0undrConfig';
import { SERVICES_DATA } from '../data/servicesData';

export interface SeoMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
}

export function getMetadataForRoute(view?: string | null, serviceId?: string | null, trackId?: string | null): SeoMetadata {
  const baseUrl = F0UNDR_STUDIO_CONFIG.siteUrl.replace(/\/$/, '');
  const defaultOgImage = `${baseUrl}/icons.svg`;

  if (serviceId) {
    const srv = SERVICES_DATA.find((s) => s.id === serviceId);
    if (srv) {
      return {
        title: `Commission ${srv.title} — f0undr Atelier`,
        description: `${srv.shortDescription} Starting from $${srv.startingPriceUsd} USD. Direct WhatsApp, Discord and phone commissioning by f0undr.`,
        canonicalUrl: `${baseUrl}/?service=${serviceId}`,
        ogImage: defaultOgImage,
      };
    }
  }

  if (trackId || view === 'tracker') {
    return {
      title: trackId ? `Tracking Order ${trackId} — f0undr Atelier` : 'Live Order Milestone & Delivery Tracker — f0undr Atelier',
      description: 'Track your bespoke software or creative commission milestone progress, lead engineers, and delivery dates in real time.',
      canonicalUrl: trackId ? `${baseUrl}/?track=${encodeURIComponent(trackId)}` : `${baseUrl}/?view=tracker`,
      ogImage: defaultOgImage,
    };
  }

  if (view === 'calculator') {
    return {
      title: 'Interactive Software Cost Estimator & Calculator — f0undr Atelier',
      description: 'Calculate real-time development budgets across Starter MVP, Pro Growth, and Enterprise tiers with live multi-currency conversion in USD, GBP, PKR, EUR.',
      canonicalUrl: `${baseUrl}/?view=calculator`,
      ogImage: defaultOgImage,
    };
  }

  if (view === 'express') {
    return {
      title: '60-Second Express Project Brief Intake — f0undr Atelier',
      description: 'Submit your software vision in 60 seconds with instant WhatsApp and Discord dispatch. Fast-track queue prioritization.',
      canonicalUrl: `${baseUrl}/?view=express`,
      ogImage: defaultOgImage,
    };
  }

  if (view === 'sitemap') {
    return {
      title: 'Studio Site Map & 100+ Capability Keyword Directory — f0undr Atelier',
      description: 'Explore the full architectural index of 8 commission verticals, interactive tools, protocols, and 100+ specialized engineering keywords.',
      canonicalUrl: `${baseUrl}/?view=sitemap`,
      ogImage: defaultOgImage,
    };
  }

  if (view === 'services') {
    return {
      title: 'Engineering & Creative Production Catalog (8 Verticals) — f0undr Atelier',
      description: 'Explore bespoke Websites, Mobile Apps, 2D/3D Games, 4K CGI Videos, UI/UX Systems, Performance Ads, Tools, and Autonomous AI Systems.',
      canonicalUrl: `${baseUrl}/?view=services`,
      ogImage: defaultOgImage,
    };
  }

  return {
    title: 'f0undr Order — Bespoke Engineering & Creative Production Studio | Commission Custom Software, Apps, Games & AI',
    description: 'Commission custom Websites, Mobile Apps, 2D/3D Games, Cinematic Videos, 3D Images, High-ROI Ads, Custom Scrapers & Bots, and Autonomous AI Systems by f0undr. Directed by M.Huzaifa. Multi-currency with Stripe & PayPal escrow.',
    canonicalUrl: `${baseUrl}/`,
    ogImage: defaultOgImage,
  };
}

export function applyDocumentMetadata(meta: SeoMetadata): void {
  if (typeof document === 'undefined') return;

  document.title = meta.title;

  const updateTag = (selector: string, attribute: string, value: string) => {
    let el = document.querySelector(selector);
    if (!el) {
      if (selector.startsWith('meta[')) {
        el = document.createElement('meta');
        const match = selector.match(/meta\[(name|property)="([^"]+)"\]/);
        if (match) {
          el.setAttribute(match[1], match[2]);
          document.head.appendChild(el);
        }
      } else if (selector.startsWith('link[')) {
        el = document.createElement('link');
        el.setAttribute('rel', 'canonical');
        document.head.appendChild(el);
      }
    }
    if (el) {
      el.setAttribute(attribute, value);
    }
  };

  updateTag('meta[name="description"]', 'content', meta.description);
  updateTag('meta[name="title"]', 'content', meta.title);
  updateTag('link[rel="canonical"]', 'href', meta.canonicalUrl);

  updateTag('meta[property="og:title"]', 'content', meta.title);
  updateTag('meta[property="og:description"]', 'content', meta.description);
  updateTag('meta[property="og:url"]', 'content', meta.canonicalUrl);
  if (meta.ogImage) {
    updateTag('meta[property="og:image"]', 'content', meta.ogImage);
  }

  updateTag('meta[property="twitter:title"]', 'content', meta.title);
  updateTag('meta[property="twitter:description"]', 'content', meta.description);
  updateTag('meta[property="twitter:url"]', 'content', meta.canonicalUrl);
  if (meta.ogImage) {
    updateTag('meta[property="twitter:image"]', 'content', meta.ogImage);
  }
}

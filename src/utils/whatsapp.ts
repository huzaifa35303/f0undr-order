import type { Order } from '../types';
import { formatMultiCurrencySummary } from './currency';

export function formatOrderForWhatsApp(order: Order): string {
  const lines: string[] = [
    `🏛️ *f0undr STUDIO ORDER SUBMISSION*`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `📌 *Order ID:* ${order.id}`,
    `🛠️ *Service:* ${order.serviceTitle}`,
    `📊 *Tier:* ${order.tier.toUpperCase()} | *Urgency:* ${order.urgency.toUpperCase()}`,
    `💰 *Target Budget:* ${formatMultiCurrencySummary(order.targetBudgetUsd)}`,
    order.paymentMethod ? `💳 *Payment Gateway:* ${order.paymentMethod === 'stripe' ? 'STRIPE (Credit Card / Apple Pay)' : order.paymentMethod === 'paypal' ? 'PAYPAL (Protected Escrow)' : 'DIRECT BANK WIRE / RAAST (PKR)'}` : '',
    `⏱️ *Estimated Delivery:* ~${order.estimatedDays} Days`,
    ``,
    `📝 *Project Title:*`,
    `"${order.projectTitle}"`,
    ``,
    `📋 *Project Vision & Brief:*`,
    `${order.projectDescription}`,
  ];

  if (order.techStackPreference) {
    lines.push(``, `⚙️ *Tech Stack / Preferences:* ${order.techStackPreference}`);
  }

  if (order.referenceLinks && order.referenceLinks.length > 0) {
    lines.push(``, `🔗 *Reference Links:*`);
    order.referenceLinks.forEach((link) => lines.push(`• ${link}`));
  }

  lines.push(
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `👤 *Client Details:*`,
    `• *Name:* ${order.client.name}`,
    `• *Phone/WhatsApp:* ${order.client.phoneOrWhatsapp}`,
    order.client.discord ? `• *Discord:* ${order.client.discord}` : '',
    order.client.companyOrBrand ? `• *Company/Brand:* ${order.client.companyOrBrand}` : '',
    order.client.country ? `• *Location:* ${order.client.country}` : '',
    `• *Preferred Contact:* ${order.client.preferredContactMethod.toUpperCase()}`,


    ``,
    `🔗 *Track Order Status:*`,
    `Track code: ${order.id}`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `_Sent via f0undr Order Atelier_`
  );

  return lines.filter(Boolean).join('\n');
}

export function createWhatsAppUrl(phoneNumber: string, order: Order): string {
  // Strip non-digits except leading +
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const message = formatOrderForWhatsApp(order);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function createExpressBriefWhatsAppUrl(
  phoneNumber: string,
  brief: {
    service: string;
    budget: string;
    description: string;
    name: string;
    contact: string;
  }
): string {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const text = [
    `⚡ *f0undr EXPRESS BRIEF INQUIRY*`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `🛠️ *Requested Service:* ${brief.service}`,
    `💰 *Budget Range:* ${brief.budget}`,
    `👤 *Client Name:* ${brief.name}`,
    `📞 *Client Contact:* ${brief.contact}`,
    ``,
    `📝 *Project Overview:*`,
    `"${brief.description}"`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `_Sent via f0undr Order Quick Brief_`
  ].join('\n');

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

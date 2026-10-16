import type { Order } from '../types';
import { formatMultiCurrencySummary } from './currency';

export function generateOrderReceiptText(order: Order): string {
  const dateFormatted = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
============================================================
              f0undr ORDER CONFIRMATION & SPECIFICATION
============================================================
Order ID:        ${order.id}
Date Generated:  ${dateFormatted}
Status:          ${order.status.toUpperCase()}
Assigned Atelier Lead: ${order.assignedLead || 'M.Huzaifa (Head of AI & Systems)'}

------------------------------------------------------------
1. PROJECT OVERVIEW
------------------------------------------------------------
Service Domain:  ${order.serviceTitle}
Project Title:   ${order.projectTitle}
Architecture Tier: ${order.tier.toUpperCase()}
Timeline Urgency:  ${order.urgency.toUpperCase()}
Estimated Turnaround: ~${order.estimatedDays} business days
Estimated Target Budget: ${formatMultiCurrencySummary(order.targetBudgetUsd)}
Payment Gateway: ${order.paymentMethod ? (order.paymentMethod === 'stripe' ? 'STRIPE (Credit Card / Apple Pay)' : order.paymentMethod === 'paypal' ? 'PAYPAL (Buyer Protection)' : 'BANK WIRE / RAAST (PKR)') : 'STRIPE / PAYPAL / WIRE'}

Project Vision:
${order.projectDescription}

${order.techStackPreference ? `Requested Tech Stack: ${order.techStackPreference}\n` : ''}
${order.referenceLinks && order.referenceLinks.length ? `Reference Links:\n${order.referenceLinks.map(l => '  - ' + l).join('\n')}\n` : ''}

------------------------------------------------------------
2. CLIENT INFORMATION
------------------------------------------------------------
Primary Contact: ${order.client.name}
Discord Handle:  ${order.client.discord || 'Not provided'}
WhatsApp/Phone:  ${order.client.phoneOrWhatsapp}
Company/Entity:  ${order.client.companyOrBrand || 'Independent Founder'}
Location:        ${order.client.country || 'Global'}
Preferred Comms: ${order.client.preferredContactMethod.toUpperCase()}

------------------------------------------------------------
3. MILESTONES & PHASES
------------------------------------------------------------
${order.milestones.map((m, i) => `[${m.completed ? 'COMPLETED' : 'PENDING'}] Phase ${i + 1}: ${m.title}
   Details: ${m.description}
   Target: ${m.targetDate || 'TBD'}`).join('\n\n')}

------------------------------------------------------------
4. TERMS & COMMITTED GUARANTEES
------------------------------------------------------------
* 100% IP & Source Code Ownership transfers to client upon delivery.
* Strict Mutual Non-Disclosure Agreement (NDA).
* Milestone based approvals prior to deployment (50% upfront, 50% on sign-off).
* Supported Gateways: Stripe (Cards, Apple Pay), PayPal (Buyer Protection), Raast / Wire (PKR).
* Multi-Currency Invoicing: US Dollars ($), British Pounds (£), Pakistani Rupees (₨), Euros (€).
* Complimentary post-launch warranty support included.

Studio Digital Headquarters: https://f0undr.vercel.app/
Direct Studio WhatsApp: +92 344 6789261
Direct Studio Discord: king_huzaifa001
Direct Phone Call: 03446789261 (+92 344 6789261)
[Official Exclusive Order Channels — No other way accepted]
============================================================


`;
}

export function downloadReceiptFile(order: Order): void {
  const content = generateOrderReceiptText(order);
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${order.id}-spec-receipt.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

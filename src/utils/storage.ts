import type { Order, OrderStatus } from '../types';
import { INITIAL_ORDERS } from '../data/sampleOrders';
import { F0UNDR_STUDIO_CONFIG } from '../data/f0undrConfig';

const ORDERS_KEY = 'f0undr_orders_vault_v1';
const SETTINGS_KEY = 'f0undr_admin_settings_v1';

export interface AdminSettings {
  whatsappNumber: string;
  phoneNumber: string;
  discordUsername: string;
  adminPin: string;
  stripePaymentUrl?: string;
  paypalMeUrl?: string;
}



export function getStoredOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_ORDERS;
  } catch (err) {
    console.error('Failed to parse stored orders', err);
    return INITIAL_ORDERS;
  }
}

export function saveNewOrder(order: Order): void {
  try {
    const current = getStoredOrders();
    const updated = [order, ...current];
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save order', err);
  }
}

export function updateExistingOrder(updatedOrder: Order): boolean {
  try {
    const current = getStoredOrders();
    const index = current.findIndex((o) => o.id === updatedOrder.id);
    if (index === -1) return false;
    current[index] = { ...updatedOrder, updatedAt: new Date().toISOString() };
    localStorage.setItem(ORDERS_KEY, JSON.stringify(current));
    return true;
  } catch (err) {
    console.error('Failed to update order', err);
    return false;
  }
}

export function updateOrderStatus(id: string, status: OrderStatus, internalNotes?: string): boolean {
  try {
    const current = getStoredOrders();
    const index = current.findIndex((o) => o.id === id);
    if (index === -1) return false;
    
    current[index].status = status;
    current[index].updatedAt = new Date().toISOString();
    if (internalNotes !== undefined) {
      current[index].internalNotes = internalNotes;
    }
    localStorage.setItem(ORDERS_KEY, JSON.stringify(current));
    return true;
  } catch (err) {
    console.error('Failed to update order status', err);
    return false;
  }
}

export function getOrderById(id: string): Order | undefined {
  const all = getStoredOrders();
  const searchId = id.trim().toUpperCase();
  return all.find((o) => o.id.toUpperCase() === searchId);
}

export function getOrdersByContact(query: string): Order[] {
  const all = getStoredOrders();
  const q = query.trim().toLowerCase();
  return all.filter(
    (o) =>
      o.id.toLowerCase().includes(q) ||
      (o.client.discord && o.client.discord.toLowerCase().includes(q)) ||
      o.client.phoneOrWhatsapp.includes(q)
  );

}

export function getAdminSettings(): AdminSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      const defaults: AdminSettings = {
        whatsappNumber: F0UNDR_STUDIO_CONFIG.whatsappNumber,
        phoneNumber: F0UNDR_STUDIO_CONFIG.phoneNumber,
        discordUsername: F0UNDR_STUDIO_CONFIG.discordUsername,
        adminPin: F0UNDR_STUDIO_CONFIG.defaultAdminPin,
        stripePaymentUrl: F0UNDR_STUDIO_CONFIG.payments.stripe.defaultCheckoutUrl,
        paypalMeUrl: F0UNDR_STUDIO_CONFIG.payments.paypal.defaultPaymentUrl,
      };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaults));
      return defaults;
    }
    const parsed = JSON.parse(raw);
    if (!parsed.whatsappNumber || parsed.whatsappNumber === '+923000000000') {
      parsed.whatsappNumber = F0UNDR_STUDIO_CONFIG.whatsappNumber;
    }
    if (!parsed.phoneNumber) {
      parsed.phoneNumber = F0UNDR_STUDIO_CONFIG.phoneNumber;
    }
    if (!parsed.discordUsername) {
      parsed.discordUsername = F0UNDR_STUDIO_CONFIG.discordUsername;
    }
    if (!parsed.stripePaymentUrl) {
      parsed.stripePaymentUrl = F0UNDR_STUDIO_CONFIG.payments.stripe.defaultCheckoutUrl;
    }
    if (!parsed.paypalMeUrl) {
      parsed.paypalMeUrl = F0UNDR_STUDIO_CONFIG.payments.paypal.defaultPaymentUrl;
    }
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(parsed));
    return parsed;

  } catch (err) {
    console.error('Failed to read admin settings', err);
    return {
      whatsappNumber: F0UNDR_STUDIO_CONFIG.whatsappNumber,
      phoneNumber: F0UNDR_STUDIO_CONFIG.phoneNumber,
      discordUsername: F0UNDR_STUDIO_CONFIG.discordUsername,
      adminPin: F0UNDR_STUDIO_CONFIG.defaultAdminPin,
      stripePaymentUrl: F0UNDR_STUDIO_CONFIG.payments.stripe.defaultCheckoutUrl,
      paypalMeUrl: F0UNDR_STUDIO_CONFIG.payments.paypal.defaultPaymentUrl,
    };
  }


}

export function saveAdminSettings(settings: AdminSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save admin settings', err);
  }
}

export function resetOrdersToSample(): void {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
}

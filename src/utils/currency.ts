import type { Currency, CurrencyConfig } from '../types';
import { SUPPORTED_CURRENCIES } from '../data/f0undrConfig';

export function getCurrencyConfig(code: Currency): CurrencyConfig {
  return SUPPORTED_CURRENCIES.find((c) => c.code === code) || SUPPORTED_CURRENCIES[0];
}

export function convertAmount(amountInUsd: number, currencyCode: Currency = 'USD'): number {
  const config = getCurrencyConfig(currencyCode);
  return Math.round(amountInUsd * config.rateAgainstUsd);
}

export function formatPrice(amountInUsd: number, currencyCode: Currency = 'USD'): string {
  const config = getCurrencyConfig(currencyCode);
  const converted = convertAmount(amountInUsd, currencyCode);
  
  return `${config.symbol}${converted.toLocaleString()}`;
}

export function formatPriceWithCode(amountInUsd: number, currencyCode: Currency = 'USD'): string {
  const config = getCurrencyConfig(currencyCode);
  const converted = convertAmount(amountInUsd, currencyCode);
  
  return `${config.symbol}${converted.toLocaleString()} ${config.code}`;
}

export function formatMultiCurrencySummary(amountInUsd: number): string {
  const usd = formatPrice(amountInUsd, 'USD');
  const gbp = formatPrice(amountInUsd, 'GBP');
  const pkr = formatPrice(amountInUsd, 'PKR');

  return `${usd} USD (≈ ${gbp} GBP / ${pkr} PKR)`;
}

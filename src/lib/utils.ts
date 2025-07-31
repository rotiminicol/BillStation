import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Currency conversion rates (to Naira)
export const currencyRates = {
  USD: 1600, // 1 USD = 1600 NGN
  EUR: 1750, // 1 EUR = 1750 NGN
  GBP: 2050, // 1 GBP = 2050 NGN
  JPY: 11,   // 1 JPY = 11 NGN
  CAD: 1200, // 1 CAD = 1200 NGN
  AUD: 1050, // 1 AUD = 1050 NGN
  CHF: 1850, // 1 CHF = 1850 NGN
  CNY: 220,  // 1 CNY = 220 NGN
  INR: 19,   // 1 INR = 19 NGN
  BRL: 330,  // 1 BRL = 330 NGN
  MXN: 95,   // 1 MXN = 95 NGN
  ZAR: 85,   // 1 ZAR = 85 NGN
  RUB: 17,   // 1 RUB = 17 NGN
  KRW: 1.2,  // 1 KRW = 1.2 NGN
  SGD: 1200, // 1 SGD = 1200 NGN
  HKD: 205,  // 1 HKD = 205 NGN
  SEK: 150,  // 1 SEK = 150 NGN
  NOK: 150,  // 1 NOK = 150 NGN
  DKK: 235,  // 1 DKK = 235 NGN
  PLN: 400,  // 1 PLN = 400 NGN
};

export const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CAD: 'C$',
  AUD: 'A$',
  CHF: 'CHF',
  CNY: '¥',
  INR: '₹',
  BRL: 'R$',
  MXN: '$',
  ZAR: 'R',
  RUB: '₽',
  KRW: '₩',
  SGD: 'S$',
  HKD: 'HK$',
  SEK: 'kr',
  NOK: 'kr',
  DKK: 'kr',
  PLN: 'zł',
};

// Language options
export const languages = [
  { code: 'en', name: 'English (US)', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

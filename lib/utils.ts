import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhoneNumber(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format for Argentine numbers
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  
  return phone;
}

export function getUTMSource(): string {
  if (typeof window === 'undefined') return 'Directo';

    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('utm_source') || 'Directo';
}

// Function to handle public asset paths with basePath
export function getAssetPath(path: string): string {
  // Only use /remeros basePath for static exports, not for Vercel deploys
  // This matches the logic in next.config.js
  const basePath = process.env.PUBLIC_URL || '';
  return `${basePath}${path}`;
} 
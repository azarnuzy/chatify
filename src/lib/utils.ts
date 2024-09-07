import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const contentTrimmed = (text: string, maxLength?: number): string => {
  // Trim the content to a certain length
  if (!maxLength) {
    maxLength = 30;
  }
  if (maxLength) {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  }
  return text;
};

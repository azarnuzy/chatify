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

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();

  // Set times to midnight for comparison
  const isToday = today.toDateString() === date.toDateString();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const isYesterday = yesterday.toDateString() === date.toDateString();

  // Check if the date is today
  if (isToday) {
    // Return in format H:MM AM/PM
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  }

  // Check if the date is yesterday
  if (isYesterday) {
    return 'Yesterday';
  }

  // For dates 2 days ago or more
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });
};

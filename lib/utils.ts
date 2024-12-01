import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  /**
   * Combines multiple class names using clsx and handles Tailwind class conflicts using tailwind-merge
   * @param inputs - Class names to be combined
   * @returns Merged class string
   */
  return twMerge(clsx(inputs));
}

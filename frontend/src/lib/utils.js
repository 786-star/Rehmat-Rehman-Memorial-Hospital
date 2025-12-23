import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (required = true, message) => {
  return `${required ? " " : message}`;
};


export const formatCNIC = (value) => {
  const digitsOnly = value.replace(/\D/g, '').slice(0, 13);
  if (digitsOnly.length <= 5) return digitsOnly;
  if (digitsOnly.length <= 12) return `${digitsOnly.slice(0, 5)}-${digitsOnly.slice(5)}`;
  return `${digitsOnly.slice(0, 5)}-${digitsOnly.slice(5, 12)}-${digitsOnly.slice(12)}`;
};


export const formatBP = (value = '') => {
  let input = value.replace(/[^\d/]/g, '');
  const parts = input.split('/');

  let systolic = parts[0]?.slice(0, 3) || '';
  let diastolic = parts[1]?.slice(0, 3) || '';
  if (parts.length > 1) {
    return diastolic ? `${systolic}/${diastolic}` : `${systolic}/`;
  }
  if (systolic.length === 3) {
    return `${systolic}/`;
  }

  return systolic;
};


export const formatDateTime = (isoString) => {
  const dateObj = new Date(isoString);

  // Date in DD/MM/YYYY format
  const date = dateObj.toLocaleDateString("en-GB");

  // Time in 12-hour format with AM/PM
  const time = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });

  return { date, time };
};

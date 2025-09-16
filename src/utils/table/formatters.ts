import { format } from 'date-fns';

export const formatters = {
  currency: (value: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(value);
  },

  number: (value: number) => {
    return new Intl.NumberFormat().format(value);
  },

  percentage: (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  },

  date: (value: Date | string) => {
    const date = typeof value === 'string' ? new Date(value) : value;
    return format(date, 'MMM dd, yyyy');
  },

  dateTime: (value: Date | string) => {
    const date = typeof value === 'string' ? new Date(value) : value;
    return format(date, 'MMM dd, yyyy HH:mm');
  },

  truncate: (value: string, maxLength = 50) => {
    if (value.length <= maxLength) return value;
    return `${value.substring(0, maxLength)}...`;
  },

  status: (value: string) => {
    const statusColors: Record<string, string> = {
      active: 'text-green-600 bg-green-50',
      inactive: 'text-red-600 bg-red-50',
      pending: 'text-yellow-600 bg-yellow-50',
      completed: 'text-blue-600 bg-blue-50',
    };

    const colorClass = statusColors[value.toLowerCase()] || 'text-gray-600 bg-gray-50';
    
    return `<span class="px-2 py-1 text-xs font-medium rounded-full ${colorClass}">${value}</span>`;
  },
};
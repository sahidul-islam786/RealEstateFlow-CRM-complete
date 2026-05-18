import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format price in Indian format: ₹95L, ₹2.2Cr, ₹28,000/mo
export function formatPrice(amount: number, isRental = false): string {
  if (isRental) {
    return `₹${amount.toLocaleString('en-IN')}/mo`;
  }
  if (amount >= 10000000) {
    const crore = amount / 10000000;
    return `₹${crore % 1 === 0 ? crore : crore.toFixed(1)}Cr`;
  }
  if (amount >= 100000) {
    const lakh = amount / 100000;
    return `₹${lakh % 1 === 0 ? lakh : lakh.toFixed(1)}L`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

// Format budget range
export function formatBudget(min: number, max: number, isRental = false): string {
  return `${formatPrice(min, isRental)} – ${formatPrice(max, isRental)}`;
}

// Get status color class
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    // Lead statuses
    'New': 'bg-blue-100 text-blue-700',
    'Contacted': 'bg-slate-100 text-slate-700',
    'Interested': 'bg-purple-100 text-purple-700',
    'Site Visit Scheduled': 'bg-amber-100 text-amber-700',
    'Negotiation': 'bg-orange-100 text-orange-700',
    'Won': 'bg-emerald-100 text-emerald-700',
    'Lost': 'bg-red-100 text-red-700',
    'Not Responding': 'bg-gray-100 text-gray-500',
    // Property statuses
    'Available': 'bg-emerald-100 text-emerald-700',
    'Hold': 'bg-amber-100 text-amber-700',
    'Sold': 'bg-blue-100 text-blue-700',
    'Rented': 'bg-teal-100 text-teal-700',
    // Attendance statuses
    'checked-in': 'bg-emerald-100 text-emerald-700',
    'late': 'bg-amber-100 text-amber-700',
    'absent': 'bg-red-100 text-red-700',
    // Social post statuses
    'Idea': 'bg-slate-100 text-slate-700',
    'Draft': 'bg-amber-100 text-amber-700',
    'Scheduled': 'bg-blue-100 text-blue-700',
    'Published': 'bg-emerald-100 text-emerald-700',
    // Followup types
    'WhatsApp': 'bg-emerald-100 text-emerald-700',
    'Call': 'bg-blue-100 text-blue-700',
    'Email': 'bg-purple-100 text-purple-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
}

// Get initials from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Format relative time
export function formatRelativeTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  const timeStr = date.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true });

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24 && date.getDate() === now.getDate()) return `Today at ${timeStr}`;
  if (diffDays === 1 || (diffHours < 48 && date.getDate() === now.getDate() - 1)) return `Yesterday at ${timeStr}`;
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Format date for display
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Get temperature dot color
export function getTemperatureColor(temp: string): string {
  switch (temp) {
    case 'Hot': return 'bg-red-500';
    case 'Warm': return 'bg-amber-500';
    case 'Cold': return 'bg-blue-500';
    default: return 'bg-gray-400';
  }
}

// Get priority dot color
export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'high': return 'bg-red-500';
    case 'medium': return 'bg-amber-500';
    case 'low': return 'bg-gray-400';
    default: return 'bg-gray-400';
  }
}

// Get role badge color
export function getRoleColor(role: string): string {
  const colors: Record<string, string> = {
    'Admin': 'bg-purple-100 text-purple-700',
    'Sales Manager': 'bg-blue-100 text-blue-700',
    'Sales Agent': 'bg-teal-100 text-teal-700',
    'Field Executive': 'bg-amber-100 text-amber-700',
    'Social Media Manager': 'bg-pink-100 text-pink-700',
  };
  return colors[role] || 'bg-gray-100 text-gray-700';
}

// Get platform badge color
export function getPlatformColor(platform: string): string {
  if (platform.includes('Instagram')) return 'bg-pink-100 text-pink-700';
  if (platform.includes('Facebook')) return 'bg-blue-100 text-blue-700';
  if (platform.includes('LinkedIn')) return 'bg-indigo-100 text-indigo-700';
  return 'bg-gray-100 text-gray-700';
}

// Get source badge color
export function getSourceColor(source: string): string {
  const colors: Record<string, string> = {
    'MagicBricks': 'bg-orange-100 text-orange-700',
    '36 Acre': 'bg-green-100 text-green-700',
    'Housing.com': 'bg-red-100 text-red-700',
    'Facebook': 'bg-blue-100 text-blue-700',
    'Instagram': 'bg-pink-100 text-pink-700',
    'Website': 'bg-purple-100 text-purple-700',
    'Referral': 'bg-teal-100 text-teal-700',
    'Manual': 'bg-slate-100 text-slate-700',
  };
  return colors[source] || 'bg-gray-100 text-gray-700';
}

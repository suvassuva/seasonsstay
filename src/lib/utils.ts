// Custom zero-dependency classname merger
export function cn(...classes: (string | boolean | undefined | null | { [key: string]: boolean | undefined })[]): string {
  const result: string[] = [];
  for (const c of classes) {
    if (!c) continue;
    if (typeof c === "string") {
      result.push(c);
    } else if (typeof c === "object" && !Array.isArray(c)) {
      for (const [key, value] of Object.entries(c)) {
        if (value) result.push(key);
      }
    }
  }
  return result.join(" ");
}

// Format number as Indian Rupees currency
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

// Calculate number of nights between check-in and check-out
export function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = end.getTime() - start.getTime();
  if (diffTime <= 0) return 0;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Format ISO date or date string to elegant readable format (e.g. 12 July, 2026)
export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// Generate premium invoice booking ID
export function generateBookingId(): string {
  const randNum = Math.floor(10000 + Math.random() * 90000);
  return `RSV-4S-${randNum}`;
}

export interface Room {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  pricePerNight: number;
  maxGuests: number;
  sizeSqFt: number;
  bedType: string;
  view: string;
  images: string[];
  facilities: string[];
  description: string;
  longDescription: string;
  isPremium?: boolean;
}

export interface GuestDetails {
  fullName: string;
  email: string;
  phone: string;
}

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  guests: number;
  specialRequests?: string;
  couponCode?: string;
  basePrice: number;
  taxAmount: number;
  discountAmount: number;
  totalPrice: number;
  guestDetails: GuestDetails;
  status: "upcoming" | "completed" | "cancelled";
  createdAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
  wishlist: string[]; // roomIds
  createdAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
  roomName?: string;
}

export interface SearchParams {
  checkIn: string;
  checkOut: string;
  guests: number;
}

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, Booking, SearchParams } from "@/types";
import { firebaseAuth, getActiveUser, getStoredBookings, saveNewBooking } from "@/lib/firebase";

// --- AUTH CONTEXT ---
interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  bookings: Booking[];
  signIn: (email: string, password: string) => Promise<UserProfile>;
  signUp: (email: string, name: string) => Promise<UserProfile>;
  signInGoogle: () => Promise<UserProfile>;
  sendOtp: (phone: string) => Promise<string>;
  verifyOtp: (verificationId: string, code: string) => Promise<UserProfile>;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<UserProfile>;
  toggleWishlist: (roomId: string) => Promise<void>;
  createBooking: (booking: Booking) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- BOOKING CONTEXT ---
interface BookingContextType {
  searchParams: SearchParams;
  setSearchParams: (params: SearchParams) => void;
  selectedRoomId: string | null;
  setSelectedRoomId: (roomId: string | null) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// --- PROVIDER COMPONENT ---
export function StateProvider({ children }: { children: React.ReactNode }) {
  // Auth state
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Booking state
  const [searchParams, setSearchParamsState] = useState<SearchParams>(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const pad = (n: number) => String(n).padStart(2, "0");
    const formatDateStr = (d: Date) => 
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

    return {
      checkIn: formatDateStr(today),
      checkOut: formatDateStr(tomorrow),
      guests: 2
    };
  });
  
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  // Sync auth on mount
  useEffect(() => {
    const syncAuth = () => {
      const active = getActiveUser();
      setUser(active);
      
      // Load user bookings
      const allBookings = getStoredBookings();
      if (active) {
        // In real backend, filter by user email/uid. Here, filter if we want, or show all bookings.
        // Let's filter by the user's email to simulate separation of user accounts!
        const userBookings = allBookings.filter(b => b.guestDetails.email.toLowerCase() === active.email.toLowerCase());
        setBookings(userBookings);
      } else {
        setBookings([]);
      }
      setLoading(false);
    };

    syncAuth();
    
    window.addEventListener("auth-state-change", syncAuth);
    return () => {
      window.removeEventListener("auth-state-change", syncAuth);
    };
  }, [user?.email]);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const profile = await firebaseAuth.signInWithEmail(email, password);
      setUser(profile);
      return profile;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, name: string) => {
    setLoading(true);
    try {
      const profile = await firebaseAuth.signUpWithEmail(email, name);
      setUser(profile);
      return profile;
    } finally {
      setLoading(false);
    }
  };

  const signInGoogle = async () => {
    setLoading(true);
    try {
      const profile = await firebaseAuth.signInWithGoogle();
      setUser(profile);
      return profile;
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async (phone: string) => {
    return await firebaseAuth.sendOTP(phone);
  };

  const verifyOtp = async (verificationId: string, code: string) => {
    setLoading(true);
    try {
      const profile = await firebaseAuth.verifyOTP(verificationId, code);
      setUser(profile);
      return profile;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await firebaseAuth.signOut();
      setUser(null);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    const profile = await firebaseAuth.updateProfile(updates);
    setUser(profile);
    return profile;
  };

  const toggleWishlist = async (roomId: string) => {
    if (!user) return;
    const newList = await firebaseAuth.toggleWishlist(roomId);
    setUser({ ...user, wishlist: newList });
  };

  const createBooking = (booking: Booking) => {
    saveNewBooking(booking);
    // Reload bookings
    const allBookings = getStoredBookings();
    if (user) {
      const userBookings = allBookings.filter(b => b.guestDetails.email.toLowerCase() === user.email.toLowerCase());
      setBookings(userBookings);
    }
  };

  const setSearchParams = (params: SearchParams) => {
    setSearchParamsState(params);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        bookings,
        signIn,
        signUp,
        signInGoogle,
        sendOtp,
        verifyOtp,
        logout,
        updateUserProfile,
        toggleWishlist,
        createBooking
      }}
    >
      <BookingContext.Provider
        value={{
          searchParams,
          setSearchParams,
          selectedRoomId,
          setSelectedRoomId
        }}
      >
        {children}
      </BookingContext.Provider>
    </AuthContext.Provider>
  );
}

// --- CONSUMER HOOKS ---
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a StateProvider");
  }
  return context;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a StateProvider");
  }
  return context;
}

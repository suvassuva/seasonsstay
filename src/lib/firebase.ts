import { UserProfile, Booking } from "@/types";

// Simulated LocalStorage Auth keys
const AUTH_USER_KEY = "4seasons_auth_user";
const ALL_USERS_KEY = "4seasons_registered_users";

// Initialize default users if not present
const getStoredUsers = (): UserProfile[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(ALL_USERS_KEY);
  if (stored) return JSON.parse(stored);
  
  // Seed with a default mock profile
  const defaultUser: UserProfile = {
    uid: "mock-user-123",
    email: "guest@luxury.com",
    displayName: "Alexander Sterling",
    phoneNumber: "+91 98765 43210",
    wishlist: ["std-room", "ste-room"],
    createdAt: new Date().toISOString()
  };
  localStorage.setItem(ALL_USERS_KEY, JSON.stringify([defaultUser]));
  return [defaultUser];
};

export const getActiveUser = (): UserProfile | null => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem(AUTH_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const saveActiveUser = (user: UserProfile | null) => {
  if (typeof window === "undefined") return;
  if (user) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    // Update in all users registry
    const users = getStoredUsers();
    const index = users.findIndex(u => u.uid === user.uid);
    if (index !== -1) {
      users[index] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem(ALL_USERS_KEY, JSON.stringify(users));
  } else {
    localStorage.removeItem(AUTH_USER_KEY);
  }
  // Dispatch custom event to notify components
  window.dispatchEvent(new Event("auth-state-change"));
};

// Simulation Delay Helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const firebaseAuth = {
  // Login with Email
  signInWithEmail: async (email: string, _password: string): Promise<UserProfile> => {
    await delay(800);
    const users = getStoredUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (user) {
      saveActiveUser(user);
      return user;
    }
    
    // Create account automatically on the fly if it is a new user (for smooth evaluation)
    const newUser: UserProfile = {
      uid: `uid-${Math.random().toString(36).substr(2, 9)}`,
      email: email,
      displayName: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
      wishlist: [],
      createdAt: new Date().toISOString()
    };
    saveActiveUser(newUser);
    return newUser;
  },

  // Signup with Email
  signUpWithEmail: async (email: string, name: string): Promise<UserProfile> => {
    await delay(800);
    const users = getStoredUsers();
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (existing) {
      throw new Error("An account with this email already exists.");
    }

    const newUser: UserProfile = {
      uid: `uid-${Math.random().toString(36).substr(2, 9)}`,
      email: email,
      displayName: name,
      wishlist: [],
      createdAt: new Date().toISOString()
    };
    saveActiveUser(newUser);
    return newUser;
  },

  // Google Login Popup Simulation
  signInWithGoogle: async (): Promise<UserProfile> => {
    await delay(1200);
    const googleUser: UserProfile = {
      uid: "google-vip-999",
      email: "vip.guest@gmail.com",
      displayName: "Lord Hastings",
      phoneNumber: "+1 415 555 2671",
      wishlist: ["exec-room", "ste-room"],
      createdAt: new Date().toISOString()
    };
    saveActiveUser(googleUser);
    return googleUser;
  },

  // Send OTP
  sendOTP: async (_phone: string): Promise<string> => {
    await delay(1000);
    // Simulate verification ID
    return `verification-id-${Math.random().toString(36).substr(2, 5)}`;
  },

  // Verify OTP
  verifyOTP: async (verificationId: string, code: string): Promise<UserProfile> => {
    await delay(1000);
    if (code !== "123456" && code !== "000000") {
      throw new Error("Invalid verification code. Use 123456 or 000000 to sign in.");
    }
    const phoneUser: UserProfile = {
      uid: "phone-guest-888",
      email: "phone.guest@4seasons.com",
      displayName: "Noble Traveler",
      phoneNumber: "+91 99999 88888",
      wishlist: [],
      createdAt: new Date().toISOString()
    };
    saveActiveUser(phoneUser);
    return phoneUser;
  },

  // Sign out
  signOut: async (): Promise<void> => {
    await delay(400);
    saveActiveUser(null);
  },

  // Update profile
  updateProfile: async (updates: Partial<UserProfile>): Promise<UserProfile> => {
    await delay(600);
    const currentUser = getActiveUser();
    if (!currentUser) throw new Error("No active session found.");
    
    const updated = { ...currentUser, ...updates };
    saveActiveUser(updated);
    return updated;
  },

  // Toggle Room in Wishlist
  toggleWishlist: async (roomId: string): Promise<string[]> => {
    const user = getActiveUser();
    if (!user) throw new Error("Authentication required.");
    
    const isWished = user.wishlist.includes(roomId);
    if (isWished) {
      user.wishlist = user.wishlist.filter(id => id !== roomId);
    } else {
      user.wishlist.push(roomId);
    }
    saveActiveUser(user);
    return user.wishlist;
  }
};

// Simulation of bookings persistence in local storage
const BOOKINGS_KEY = "4seasons_bookings";

export const getStoredBookings = (): Booking[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(BOOKINGS_KEY);
  if (stored) return JSON.parse(stored);
  
  // Seed with one past mockup booking for the Alexander profile
  const pastBooking: Booking = {
    id: "RSV-4S-29472",
    roomId: "dlx-room",
    roomName: "Deluxe Room",
    checkIn: "2026-06-10",
    checkOut: "2026-06-13",
    guests: 2,
    basePrice: 36000,
    taxAmount: 6480,
    discountAmount: 3600,
    totalPrice: 38880,
    guestDetails: {
      fullName: "Alexander Sterling",
      email: "guest@luxury.com",
      phone: "+91 98765 43210"
    },
    status: "completed",
    createdAt: "2026-05-12T10:14:00Z"
  };
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify([pastBooking]));
  return [pastBooking];
};

export const saveNewBooking = (booking: Booking) => {
  if (typeof window === "undefined") return;
  const bookings = getStoredBookings();
  bookings.unshift(booking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
};

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/provider/state-provider";
import { LUXURY_ROOMS } from "@/lib/mock-data";
import { formatPrice, formatDate } from "@/lib/utils";
import {
  Calendar,
  Users,
  Heart,
  User,
  Ticket,
  Settings,
  ShieldCheck,
  Printer,
  ChevronRight,
  LogOut,
  Mail,
  Bell,
  Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CustomerDashboard() {
  const router = useRouter();
  const { user, loading, bookings, logout, updateUserProfile, toggleWishlist } = useAuth();
  
  const [activeTab, setActiveTab] = useState<"bookings" | "wishlist" | "profile" | "support" | "settings">("bookings");

  // Profile Edit fields
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Support Ticket fields
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");
  const [tickets, setTickets] = useState([
    { id: "TKT-4521", subject: "Airport Pickup Time Change", status: "Resolved", date: "2026-07-12", replies: 1 },
    { id: "TKT-8910", subject: "Request for Extra Pillows in Suite", status: "Open", date: "2026-07-16", replies: 0 }
  ]);
  const [ticketSuccess, setTicketSuccess] = useState(false);

  // Settings states
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [roomUpgrades, setRoomUpgrades] = useState(true);

  // Load user data into local states on mount
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
      setPhone(user.phoneNumber || "");
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccess(false);
    try {
      await updateUserProfile({
        displayName,
        phoneNumber: phone
      });
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (err) {
      alert("Failed to update profile details.");
    }
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) return;

    const newTicket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: ticketSubject,
      status: "Open",
      date: new Date().toISOString().split("T")[0],
      replies: 0
    };

    setTickets([newTicket, ...tickets]);
    setTicketSubject("");
    setTicketMessage("");
    setTicketSuccess(true);
    setTimeout(() => setTicketSuccess(false), 3000);
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto py-32 text-center flex flex-col items-center justify-center gap-4">
        <span className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin block" />
        <p className="text-sm text-foreground/60">Verifying session details...</p>
      </div>
    );
  }

  // Not logged in view
  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-6 py-32 text-center flex flex-col gap-6">
        <span className="text-6xl">🔒</span>
        <h2 className="text-3xl font-serif font-bold">Authentication Required</h2>
        <p className="text-sm text-foreground/60 leading-relaxed">
          Please log in or register a guest profile to access your reservations dashboard, wishlist records, and support logs.
        </p>
        <Link
          href="/login"
          className="px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-widest text-background gold-gradient self-center shadow-lg transition-transform hover:scale-[1.02]"
        >
          Access Login Portal
        </Link>
      </div>
    );
  }

  // Wishlist room configurations lookup
  const wishedRooms = LUXURY_ROOMS.filter((room) => user.wishlist.includes(room.id));

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-10 min-h-[85vh]">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-primary/10 pb-6">
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Guest Administration Dashboard</span>
          <h1 className="text-3xl font-serif font-bold text-foreground mt-1">
            Welcome back, <span className="gold-text-gradient font-semibold">{user.displayName}</span>
          </h1>
          <span className="text-xs text-foreground/50">{user.email}</span>
        </div>
        <button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-red-500 hover:bg-red-500/5 rounded-lg border border-red-500/20 transition-all cursor-pointer"
        >
          <LogOut size={14} /> Log Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Navigation Sidebar Panel (3/12) */}
        <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2 overflow-x-auto no-scrollbar pb-3 lg:pb-0 shrink-0">
          {[
            { id: "bookings", label: "My Reservations", icon: <Calendar size={16} /> },
            { id: "wishlist", label: "Wishlisted Suites", icon: <Heart size={16} /> },
            { id: "profile", label: "Profile Settings", icon: <User size={16} /> },
            { id: "support", label: "Support Tickets", icon: <Ticket size={16} /> },
            { id: "settings", label: "Preferences", icon: <Settings size={16} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-all shrink-0 cursor-pointer w-full ${
                activeTab === tab.id
                  ? "bg-primary text-background font-bold shadow-md shadow-primary/10"
                  : "text-foreground/75 hover:bg-primary/5 hover:text-primary"
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Panel (9/12) */}
        <div className="lg:col-span-9 bg-card border border-primary/10 p-8 rounded-3xl shadow-xl min-h-[500px]">
          {/* TAB 1: RESERVATIONS BOOKINGS */}
          {activeTab === "bookings" && (
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-serif font-bold text-foreground border-b border-primary/10 pb-3 flex items-center justify-between">
                <span>My Reservations</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary">
                  {bookings.length} Bookings Recorded
                </span>
              </h3>

              {bookings.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {bookings.map((booking) => {
                    const statusColors = {
                      upcoming: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
                      completed: "bg-primary/10 text-primary border-primary/20",
                      cancelled: "bg-red-500/10 text-red-500 border-red-500/20"
                    };
                    return (
                      <div
                        key={booking.id}
                        className="p-6 rounded-2xl bg-background border border-primary/5 flex flex-col gap-6 shadow-sm hover:border-primary/20 transition-all duration-300"
                      >
                        {/* Status + ID row */}
                        <div className="flex justify-between items-center border-b border-primary/5 pb-4">
                          <div className="flex items-center gap-3">
                            <span className="font-serif font-semibold text-sm text-foreground">{booking.roomName}</span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-bold border ${statusColors[booking.status]}`}>
                              {booking.status}
                            </span>
                          </div>
                          <span className="text-[10px] text-foreground/50">Ref: <strong>{booking.id}</strong></span>
                        </div>

                        {/* Stay parameters */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-foreground/45 uppercase tracking-wide">Stay Dates</span>
                            <span className="font-medium text-foreground">
                              {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                            </span>
                          </div>
                          <div className="flex flex-col gap-1 border-y md:border-y-0 md:border-x border-primary/5 py-3 md:py-0 md:px-6">
                            <span className="text-[10px] text-foreground/45 uppercase tracking-wide">Occupancy</span>
                            <span className="font-medium text-foreground">
                              {booking.guests} Guests Registered
                            </span>
                          </div>
                          <div className="flex flex-col gap-1 md:pl-6">
                            <span className="text-[10px] text-foreground/45 uppercase tracking-wide">Total Invoice</span>
                            <span className="font-bold text-primary text-sm">
                              {formatPrice(booking.totalPrice)}
                            </span>
                          </div>
                        </div>

                        {/* CTA Receipts */}
                        <div className="flex justify-end pt-2">
                          <Link
                            href={`/booking/confirmation?id=${booking.id}`}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-primary/20 hover:border-primary text-xs font-semibold text-foreground hover:bg-primary/5 transition-colors cursor-pointer"
                          >
                            <Printer size={12} />
                            View Invoice Receipt
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                  <span className="text-4xl">🛏️</span>
                  <h4 className="font-serif font-semibold text-lg">No active reservations</h4>
                  <p className="text-xs text-foreground/60 max-w-xs leading-relaxed">
                    You do not have any room bookings scheduled at 4 Seasons Stay. Explore our suites to book.
                  </p>
                  <Link
                    href="/rooms"
                    className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-background gold-gradient shadow-md self-center"
                  >
                    Explore Accommodations
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WISHLIST */}
          {activeTab === "wishlist" && (
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-serif font-bold text-foreground border-b border-primary/10 pb-3 flex items-center justify-between">
                <span>Wishlisted Suites</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary">
                  {wishedRooms.length} Favorites
                </span>
              </h3>

              {wishedRooms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {wishedRooms.map((room) => (
                    <div
                      key={room.id}
                      className="rounded-2xl border border-primary/5 bg-background overflow-hidden shadow-md flex flex-col group"
                    >
                      <div className="aspect-[16/10] w-full overflow-hidden bg-muted relative">
                        <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <button
                          onClick={() => toggleWishlist(room.id)}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center border border-red-500/10 cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <h4 className="font-serif font-semibold text-base text-foreground mb-1 group-hover:text-primary transition-colors">
                          {room.name}
                        </h4>
                        <p className="text-xs text-foreground/60 leading-relaxed mb-4 line-clamp-2">
                          {room.description}
                        </p>
                        <div className="flex justify-between items-center mt-auto pt-4 border-t border-primary/5">
                          <span className="font-sans text-xs font-bold text-primary">{formatPrice(room.pricePerNight)}/night</span>
                          <Link
                            href={`/rooms/${room.id}`}
                            className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-primary hover:text-primary-dark"
                          >
                            Reserve <ChevronRight size={12} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                  <span className="text-4xl">❤️</span>
                  <h4 className="font-serif font-semibold text-lg">Wishlist is empty</h4>
                  <p className="text-xs text-foreground/60 max-w-xs leading-relaxed">
                    Tap the heart icon on any accommodation card to save suites here for quick checkout later.
                  </p>
                  <Link
                    href="/rooms"
                    className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-background gold-gradient shadow-md self-center"
                  >
                    View All Rooms
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROFILE SETTINGS */}
          {activeTab === "profile" && (
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-serif font-bold text-foreground border-b border-primary/10 pb-3">
                Profile Administration
              </h3>

              {profileSuccess && (
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs flex items-center gap-2 animate-fade-in">
                  <ShieldCheck size={14} />
                  <span>Profile information successfully synchronized.</span>
                </div>
              )}

              <form onSubmit={handleProfileUpdate} className="flex flex-col gap-6 max-w-md">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-foreground/80">Display Name</label>
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-background/50 focus:outline-none focus:border-primary text-sm"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-foreground/80">Email Address (Read-Only)</label>
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full px-4 py-2.5 rounded-lg border border-primary/5 bg-background/20 text-foreground/40 text-sm cursor-not-allowed"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-foreground/80">Phone Contact</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-background/50 focus:outline-none focus:border-primary text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-full text-background gold-gradient font-semibold text-xs uppercase tracking-widest hover:opacity-95 shadow-md self-start transition-all cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: SUPPORT HELPDESK */}
          {activeTab === "support" && (
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2 border-b border-primary/10 pb-3">
                <h3 className="text-xl font-serif font-bold text-foreground">Bespoke Support Helpdesk</h3>
                <p className="text-xs text-foreground/50">Direct assistance tickets with your private butler desk.</p>
              </div>

              {ticketSuccess && (
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs flex items-center gap-2 animate-fade-in">
                  <ShieldCheck size={14} />
                  <span>Support ticket filed! Response simulated within 30 minutes.</span>
                </div>
              )}

              {/* Opened Tickets list */}
              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest">Active Tickets</h4>
                <div className="flex flex-col gap-4">
                  {tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="p-4 rounded-xl border border-primary/10 bg-background flex items-center justify-between text-xs hover:border-primary/25 transition-all"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-foreground">{ticket.subject}</span>
                        <span className="text-[10px] text-foreground/50">
                          ID: {ticket.id} • Opened: {ticket.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] uppercase font-bold border ${
                          ticket.status === "Resolved"
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                        }`}>
                          {ticket.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Create new Ticket Form */}
              <form onSubmit={handleCreateTicket} className="flex flex-col gap-4 border-t border-primary/5 pt-6">
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest">Open New Butler Ticket</h4>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground/80">Subject *</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Request for early valet airport check-in"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-background/50 focus:outline-none focus:border-primary text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground/80">Details *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Provide details about your query or special requirements..."
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-background/50 focus:outline-none focus:border-primary text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-background gold-gradient font-semibold text-xs uppercase tracking-widest hover:opacity-95 shadow-md self-start cursor-pointer"
                >
                  File Ticket
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: PORTAL SETTINGS */}
          {activeTab === "settings" && (
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-serif font-bold text-foreground border-b border-primary/10 pb-3">
                Portal Preferences
              </h3>

              <div className="flex flex-col gap-6 max-w-md">
                {/* News Alert toggle */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-primary/5">
                  <div className="flex gap-3 items-start pr-4">
                    <Mail className="text-primary shrink-0 mt-0.5" size={18} />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-foreground">Email Newsletter Alerts</span>
                      <p className="text-[10px] text-foreground/50 leading-relaxed">
                        Receive monthly catalogs, invitations to Michelin dinners, and seasonal promo vouchers.
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={() => setEmailAlerts(!emailAlerts)}
                    className="w-4 h-4 text-primary bg-background border-primary/20 rounded cursor-pointer"
                  />
                </div>

                {/* SMS alert toggle */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-primary/5">
                  <div className="flex gap-3 items-start pr-4">
                    <Bell className="text-primary shrink-0 mt-0.5" size={18} />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-foreground">SMS Valet Notifications</span>
                      <p className="text-[10px] text-foreground/50 leading-relaxed">
                        Receive instant status alerts regarding booking upgrades, checking approvals, and valet driver arrival.
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={smsAlerts}
                    onChange={() => setSmsAlerts(!smsAlerts)}
                    className="w-4 h-4 text-primary bg-background border-primary/20 rounded cursor-pointer"
                  />
                </div>

                {/* Upgrade options */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-primary/5">
                  <div className="flex gap-3 items-start pr-4">
                    <ShieldCheck className="text-primary shrink-0 mt-0.5" size={18} />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-foreground">Auto-Upgrade Program</span>
                      <p className="text-[10px] text-foreground/50 leading-relaxed">
                        Enroll in complimentary room variant upgrades (subject to VIP status and availability).
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={roomUpgrades}
                    onChange={() => setRoomUpgrades(!roomUpgrades)}
                    className="w-4 h-4 text-primary bg-background border-primary/20 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

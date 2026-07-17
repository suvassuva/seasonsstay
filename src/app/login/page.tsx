"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/provider/state-provider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Mail, Phone, Lock, ChevronRight, KeyRound, CheckCircle2, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Schema validations
const emailAuthSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().optional() // Optional for login, required for signup
});
type EmailAuthData = z.infer<typeof emailAuthSchema>;

const phoneAuthSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  code: z.string().optional() // Added for OTP verification
});
type PhoneAuthData = z.infer<typeof phoneAuthSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { user, signIn, signUp, signInGoogle, sendOtp, verifyOtp } = useAuth();
  
  const [authMode, setAuthMode] = useState<"login" | "signup" | "forgot">("login");
  const [authType, setAuthType] = useState<"email" | "phone" | "google">("email");
  
  // OTP Flow States
  const [otpSent, setOtpSent] = useState(false);
  const [verificationId, setVerificationId] = useState("");
  const [otpCode, setOtpCode] = useState("");
  
  // Message Feedback
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Re-route if already logged in
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  // Email form resolver
  const {
    register: regEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: errorsEmail },
    reset: resetEmail
  } = useForm<EmailAuthData>({
    resolver: zodResolver(emailAuthSchema),
    defaultValues: { email: "", password: "", name: "" }
  });

  // Phone form resolver
  const {
    register: regPhone,
    handleSubmit: handlePhoneSubmit,
    formState: { errors: errorsPhone },
    reset: resetPhone
  } = useForm<PhoneAuthData>({
    resolver: zodResolver(phoneAuthSchema),
    defaultValues: { phone: "", code: "" }
  });

  const onEmailSubmit = async (data: EmailAuthData) => {
    setLoading(true);
    setFormError("");
    setFormSuccess("");
    try {
      if (authMode === "login") {
        await signIn(data.email, data.password);
        setFormSuccess("Login successful!");
      } else {
        if (!data.name) {
          setFormError("Name is required for registering an account.");
          setLoading(false);
          return;
        }
        await signUp(data.email, data.name);
        setFormSuccess("Account registered successfully!");
      }
      router.push("/dashboard");
    } catch (err) {
      setFormError((err as Error).message || "Authentication failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  const onPhoneSendOTP = async (data: PhoneAuthData) => {
    setLoading(true);
    setFormError("");
    try {
      const verId = await sendOtp(data.phone);
      setVerificationId(verId);
      setOtpSent(true);
      setFormSuccess("Simulated verification code sent! Use 123456 to verify.");
    } catch (err) {
      setFormError((err as Error).message || "Failed to send code.");
    } finally {
      setLoading(false);
    }
  };

  const onPhoneVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length !== 6) {
      setFormError("Please enter a valid 6-digit code.");
      return;
    }
    setLoading(true);
    setFormError("");
    try {
      await verifyOtp(verificationId, otpCode);
      setFormSuccess("Phone login successful!");
      router.push("/dashboard");
    } catch (err) {
      setFormError((err as Error).message || "Invalid code. Try 123456.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSubmit = async () => {
    setLoading(true);
    setFormError("");
    try {
      await signInGoogle();
      setFormSuccess("Google sign-in successful!");
      router.push("/dashboard");
    } catch (err) {
      setFormError("Google authentication cancelled or failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSuccess("A password reset link has been dispatched to your email address.");
    setTimeout(() => {
      setAuthMode("login");
      setFormSuccess("");
    }, 3000);
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16 flex flex-col gap-8 min-h-[75vh] justify-center">
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center gap-2">
        <span className="w-10 h-10 rounded-full gold-gradient text-background flex items-center justify-center font-serif font-bold text-lg">
          4S
        </span>
        <h2 className="text-2xl font-serif font-bold tracking-wide mt-1">4 Seasons Stay</h2>
        <span className="text-[10px] uppercase tracking-widest text-primary font-semibold">
          Luxury Guest Portal
        </span>
      </div>

      {/* Main Login Card */}
      <div className="p-8 rounded-3xl bg-card border border-primary/10 shadow-2xl flex flex-col gap-6 relative overflow-hidden">
        {/* Method Toggle Buttons */}
        {authMode !== "forgot" && (
          <div className="grid grid-cols-2 gap-2 border-b border-primary/10 pb-4">
            <button
              onClick={() => {
                setAuthType("email");
                setOtpSent(false);
                setFormError("");
                setFormSuccess("");
              }}
              className={cn(
                "py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer",
                authType === "email" ? "text-primary border-b-2 border-primary rounded-b-none" : "text-foreground/60"
              )}
            >
              Email Login
            </button>
            <button
              onClick={() => {
                setAuthType("phone");
                setFormError("");
                setFormSuccess("");
              }}
              className={cn(
                "py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer",
                authType === "phone" ? "text-primary border-b-2 border-primary rounded-b-none" : "text-foreground/60"
              )}
            >
              Phone OTP
            </button>
          </div>
        )}

        {/* Global Error/Success Feedback */}
        {formError && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs flex items-start gap-2 animate-fade-in">
            <ShieldAlert size={14} className="shrink-0 mt-0.5" />
            <span>{formError}</span>
          </div>
        )}
        {formSuccess && (
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs flex items-start gap-2 animate-fade-in">
            <CheckCircle2 size={14} className="shrink-0 mt-0.5" />
            <span>{formSuccess}</span>
          </div>
        )}

        {/* 1. EMAIL FORM */}
        {authType === "email" && authMode !== "forgot" && (
          <form onSubmit={handleEmailSubmit(onEmailSubmit)} className="flex flex-col gap-4">
            {authMode === "signup" && (
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-semibold tracking-wider text-foreground/75">Full Name</label>
                <input
                  type="text"
                  placeholder="Alexander Sterling"
                  {...regEmail("name")}
                  className="w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-background/50 focus:outline-none focus:border-primary text-sm"
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-semibold tracking-wider text-foreground/75">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="name@domain.com"
                  {...regEmail("email")}
                  className={cn(
                    "w-full px-4 py-2.5 rounded-lg border bg-background/50 focus:outline-none focus:border-primary text-sm",
                    errorsEmail.email ? "border-red-400" : "border-primary/20"
                  )}
                />
              </div>
              {errorsEmail.email && <span className="text-[10px] text-red-400">{errorsEmail.email.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase font-semibold tracking-wider text-foreground/75">Password</label>
                <button
                  type="button"
                  onClick={() => setAuthMode("forgot")}
                  className="text-[10px] font-semibold text-primary hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <input
                type="password"
                placeholder="******"
                {...regEmail("password")}
                className={cn(
                  "w-full px-4 py-2.5 rounded-lg border bg-background/50 focus:outline-none focus:border-primary text-sm",
                  errorsEmail.password ? "border-red-400" : "border-primary/20"
                )}
              />
              {errorsEmail.password && <span className="text-[10px] text-red-400">{errorsEmail.password.message}</span>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full text-background gold-gradient font-semibold text-xs uppercase tracking-widest hover:opacity-95 shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? "Verifying..." : authMode === "login" ? "Sign In" : "Register Account"}
              {!loading && <ChevronRight size={14} />}
            </button>
          </form>
        )}

        {/* 2. PHONE OTP FORM */}
        {authType === "phone" && authMode !== "forgot" && (
          <div className="flex flex-col gap-4">
            {!otpSent ? (
              <form onSubmit={handlePhoneSubmit(onPhoneSendOTP)} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-semibold tracking-wider text-foreground/75">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    {...regPhone("phone")}
                    className={cn(
                      "w-full px-4 py-2.5 rounded-lg border bg-background/50 focus:outline-none focus:border-primary text-sm",
                      errorsPhone.phone ? "border-red-400" : "border-primary/20"
                    )}
                  />
                  {errorsPhone.phone && <span className="text-[10px] text-red-400">{errorsPhone.phone.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-full text-background gold-gradient font-semibold text-xs uppercase tracking-widest hover:opacity-95 shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 mt-2"
                >
                  {loading ? "Sending..." : "Transmit OTP Code"}
                  {!loading && <ChevronRight size={14} />}
                </button>
              </form>
            ) : (
              <form onSubmit={onPhoneVerifyOTP} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-semibold tracking-wider text-foreground/75">Enter 6-Digit OTP</label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-background/50 text-center tracking-[0.5em] font-bold text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-full text-background gold-gradient font-semibold text-xs uppercase tracking-widest hover:opacity-95 shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 mt-2"
                >
                  {loading ? "Verifying..." : "Verify & Sign In"}
                  {!loading && <ChevronRight size={14} />}
                </button>

                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="text-xs text-primary font-semibold hover:underline text-center self-center"
                >
                  Change Phone Number
                </button>
              </form>
            )}
          </div>
        )}

        {/* 3. FORGOT PASSWORD FORM */}
        {authMode === "forgot" && (
          <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
            <h4 className="font-serif font-semibold text-base">Recover Password</h4>
            <p className="text-[11px] text-foreground/60 leading-relaxed -mt-2 mb-2">
              Enter your registered email address below. We will transmit a secure password reset link to your inbox.
            </p>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-semibold tracking-wider text-foreground/75">Email Address</label>
              <input
                type="email"
                required
                placeholder="name@domain.com"
                className="w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-background/50 focus:outline-none focus:border-primary text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full text-background gold-gradient font-semibold text-xs uppercase tracking-widest hover:opacity-95 shadow-md transition-all cursor-pointer mt-2"
            >
              Dispatch Reset Link
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode("login");
                setFormError("");
                setFormSuccess("");
              }}
              className="text-xs text-primary font-semibold hover:underline text-center self-center"
            >
              Back to Sign In
            </button>
          </form>
        )}

        {/* Google Mock CTA Option */}
        {authMode !== "forgot" && (
          <div className="flex flex-col gap-4 border-t border-primary/10 pt-4 mt-2">
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-3 text-foreground/45 font-medium tracking-wide">Or Continue With</span>
            </div>

            <button
              type="button"
              onClick={handleGoogleSubmit}
              disabled={loading}
              className="w-full py-2.5 rounded-full border border-primary/20 bg-background/30 hover:bg-background/90 text-xs font-semibold text-foreground flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign In With Google
            </button>
          </div>
        )}

        {/* Toggle Mode */}
        {authMode !== "forgot" && (
          <p className="text-xs text-foreground/60 text-center mt-2 font-medium">
            {authMode === "login" ? "First time visiting?" : "Already registered?"}{" "}
            <button
              onClick={() => {
                setAuthMode(authMode === "login" ? "signup" : "login");
                setFormError("");
                setFormSuccess("");
              }}
              className="text-primary font-bold hover:underline cursor-pointer"
            >
              {authMode === "login" ? "Register Account" : "Sign In"}
            </button>
          </p>
        )}
      </div>

      {/* Demo Credentials Alert Helper */}
      <div className="p-4 rounded-2xl bg-primary/5 border border-primary/15 text-xs text-foreground/75 leading-relaxed flex items-start gap-3">
        <KeyRound size={18} className="text-primary shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1">
          <span className="font-semibold">Quick Review Login:</span>
          <span>
            • Email: <strong className="text-foreground">guest@luxury.com</strong> (Auto-registered, password: any)<br />
            • Phone OTP: <strong className="text-foreground">+91 99999 88888</strong> (Use code: <strong className="text-foreground">123456</strong>)<br />
            • Google: Click buttons to instantly authorize a premium VIP profile session.
          </span>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, User, Mail, Phone, Lock, Eye, EyeOff, ShieldCheck, 
  ArrowRight, KeyRound, Sparkles, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { useCustomerAuth } from '@/context/CustomerAuthContext';

interface CustomerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
}

export const CustomerAuthModal: React.FC<CustomerAuthModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'login',
}) => {
  const { login, loginWithOtp, signup, authModalTab } = useCustomerAuth();

  const [tab, setTab] = useState<'login' | 'signup'>(defaultTab || authModalTab || 'login');
  const [loginMode, setLoginMode] = useState<'password' | 'otp'>('password');
  
  // Login fields
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Signup fields
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Common UI State
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Sync tab with props when opened
  React.useEffect(() => {
    if (isOpen) {
      setTab(defaultTab || authModalTab || 'login');
      setError(null);
      setSuccess(null);
    }
  }, [isOpen, defaultTab, authModalTab]);

  if (!isOpen) return null;

  // Handle Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!loginIdentifier.trim()) {
      setError('Please enter your mobile number or email address.');
      return;
    }

    setLoading(true);

    if (loginMode === 'otp') {
      if (!otpSent) {
        // Send OTP
        setTimeout(() => {
          setOtpSent(true);
          setLoading(false);
          setSuccess(`OTP verification code sent to ${loginIdentifier}`);
        }, 500);
        return;
      }

      const res = await loginWithOtp(loginIdentifier, otpCode);
      setLoading(false);
      if (res.success) {
        setSuccess(res.message || 'Log in successful!');
        setTimeout(() => {
          onClose();
        }, 700);
      } else {
        setError(res.message || 'Invalid OTP code.');
      }
      return;
    }

    // Password login
    const res = await login(loginIdentifier, loginPassword);
    setLoading(false);
    if (res.success) {
      setSuccess(res.message || 'Log in successful!');
      setTimeout(() => {
        onClose();
      }, 700);
    } else {
      setError(res.message || 'Login failed.');
    }
  };

  // Handle Signup Submit
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!signupName.trim() || !signupEmail.trim()) {
      setError('Please fill in your name and email address.');
      return;
    }

    if (signupPassword && signupPassword !== signupConfirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    if (!agreeTerms) {
      setError('Please accept the Terms of Service & Privacy Policy to proceed.');
      return;
    }

    setLoading(true);
    const res = await signup({
      name: signupName,
      email: signupEmail,
      phone: signupPhone,
      password: signupPassword,
    });
    setLoading(false);

    if (res.success) {
      setSuccess(res.message || 'Account created successfully!');
      setTimeout(() => {
        onClose();
      }, 800);
    } else {
      setError(res.message || 'Could not create account.');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#162F21]/75 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="relative bg-[#FAF6F0] w-full max-w-md rounded-3xl shadow-2xl border border-[#E5DFC9] p-6 sm:p-8 z-10 space-y-5 my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#1C241E] hover:bg-[#EAE4D8] rounded-full transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Header Badge */}
          <div className="text-center space-y-2">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#D49B35] shadow-md mx-auto bg-[#1B3626]">
              <Image
                src="/assets/photos/2.jpeg"
                alt="The Pahadi Sher Logo"
                fill
                sizes="56px"
                className="object-cover object-center rounded-full"
              />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1B3626]">
              {tab === 'login' ? 'Customer Sign In' : 'Create Account'}
            </h3>
            <p className="text-xs text-[#664936]">
              {tab === 'login'
                ? 'Welcome back! Access your Himalayan orders, track shipments & manage account.'
                : 'Join The Pahadi Sher family & unlock exclusive Himalayan rewards.'}
            </p>
          </div>

          {/* Navigation Tabs (Sign In / Sign Up) */}
          <div className="flex bg-[#EAE4D8] p-1 rounded-2xl border border-[#E5DFC9]">
            <button
              type="button"
              onClick={() => {
                setTab('login');
                setError(null);
                setSuccess(null);
              }}
              className={`flex-1 py-2.5 text-xs uppercase font-bold tracking-wider rounded-xl transition-all ${
                tab === 'login'
                  ? 'bg-[#1B3626] text-[#FAF6F0] shadow-sm'
                  : 'text-[#664936] hover:text-[#1B3626]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('signup');
                setError(null);
                setSuccess(null);
              }}
              className={`flex-1 py-2.5 text-xs uppercase font-bold tracking-wider rounded-xl transition-all ${
                tab === 'signup'
                  ? 'bg-[#1B3626] text-[#FAF6F0] shadow-sm'
                  : 'text-[#664936] hover:text-[#1B3626]'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Feedback Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-xl text-xs flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          {/* TAB 1: SIGN IN */}
          {tab === 'login' && (
            <div className="space-y-4">

              {/* Password vs OTP Mode Selector */}
              <div className="flex items-center justify-between text-xs text-[#664936] px-1">
                <span className="font-semibold">Login Method:</span>
                <div className="flex gap-2 text-[11px]">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMode('password');
                      setOtpSent(false);
                    }}
                    className={`underline ${loginMode === 'password' ? 'text-[#B85D3B] font-bold' : 'hover:text-[#1B3626]'}`}
                  >
                    Password
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setLoginMode('otp')}
                    className={`underline ${loginMode === 'otp' ? 'text-[#B85D3B] font-bold' : 'hover:text-[#1B3626]'}`}
                  >
                    OTP Verification
                  </button>
                </div>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#664936] mb-1">
                    Mobile Number or Email
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="+91 98765 43210 or name@example.com"
                      className="w-full bg-white border border-[#E5DFC9] rounded-xl pl-10 pr-4 py-3 text-xs text-[#1C241E] focus:outline-none focus:ring-2 focus:ring-[#D49B35]"
                    />
                    <Mail className="w-4 h-4 text-[#664936] absolute left-3.5 top-3.5" />
                  </div>
                </div>

                {loginMode === 'password' && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#664936]">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => alert('Password reset link sent to your registered email/phone!')}
                        className="text-[10px] text-[#B85D3B] hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full bg-white border border-[#E5DFC9] rounded-xl pl-10 pr-10 py-3 text-xs text-[#1C241E] focus:outline-none focus:ring-2 focus:ring-[#D49B35]"
                      />
                      <Lock className="w-4 h-4 text-[#664936] absolute left-3.5 top-3.5" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 text-[#664936] hover:text-[#1B3626]"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {loginMode === 'otp' && otpSent && (
                  <div>
                    <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#664936] mb-1">
                      Enter 6-Digit OTP
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        maxLength={6}
                        required
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="123456"
                        className="w-full bg-white border border-[#E5DFC9] rounded-xl pl-10 pr-4 py-3 text-sm text-center font-mono tracking-widest text-[#1B3626] focus:outline-none focus:ring-2 focus:ring-[#D49B35]"
                      />
                      <KeyRound className="w-4 h-4 text-[#664936] absolute left-3.5 top-3.5" />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1B3626] text-[#FAF6F0] py-3.5 rounded-xl text-xs uppercase font-bold tracking-widest hover:bg-[#274A36] transition-all shadow-md active:scale-95 flex items-center justify-center space-x-2"
                >
                  <span>
                    {loading
                      ? 'Processing...'
                      : loginMode === 'otp' && !otpSent
                      ? 'Send Verification OTP'
                      : 'Sign In to Account'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: SIGN UP */}
          {tab === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#664936] mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full bg-white border border-[#E5DFC9] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#1C241E] focus:outline-none focus:ring-2 focus:ring-[#D49B35]"
                  />
                  <User className="w-4 h-4 text-[#664936] absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#664936] mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="rajesh@example.com"
                    className="w-full bg-white border border-[#E5DFC9] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#1C241E] focus:outline-none focus:ring-2 focus:ring-[#D49B35]"
                  />
                  <Mail className="w-4 h-4 text-[#664936] absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#664936] mb-1">
                  Mobile Number (Optional)
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    maxLength={10}
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="10-digit mobile number"
                    className="w-full bg-white border border-[#E5DFC9] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#1C241E] focus:outline-none focus:ring-2 focus:ring-[#D49B35]"
                  />
                  <Phone className="w-4 h-4 text-[#664936] absolute left-3.5 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-[#664936] mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white border border-[#E5DFC9] rounded-xl pl-9 pr-3 py-2 text-xs text-[#1C241E] focus:outline-none focus:ring-2 focus:ring-[#D49B35]"
                    />
                    <Lock className="w-3.5 h-3.5 text-[#664936] absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-[#664936] mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white border border-[#E5DFC9] rounded-xl pl-9 pr-3 py-2 text-xs text-[#1C241E] focus:outline-none focus:ring-2 focus:ring-[#D49B35]"
                    />
                    <Lock className="w-3.5 h-3.5 text-[#664936] absolute left-3 top-2.5" />
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded border-[#E5DFC9] text-[#1B3626] focus:ring-[#D49B35]"
                />
                <label htmlFor="agreeTerms" className="text-[11px] text-[#664936]">
                  I agree to the <Link href="/terms-of-service" className="underline hover:text-[#1B3626]">Terms</Link> & <Link href="/privacy-policy" className="underline hover:text-[#1B3626]">Privacy Policy</Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1B3626] text-[#FAF6F0] py-3.5 rounded-xl text-xs uppercase font-bold tracking-widest hover:bg-[#274A36] transition-all shadow-md active:scale-95 flex items-center justify-center space-x-2"
              >
                <span>{loading ? 'Creating Account...' : 'Complete Sign Up'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Footer Info & Admin Link */}
          <div className="pt-3 border-t border-[#E5DFC9] flex items-center justify-between text-xs text-[#664936]">
            <Link href="/admin" onClick={onClose} className="hover:text-[#B85D3B] font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B85D3B]" />
              <span>Admin Portal →</span>
            </Link>
            <Link href="/account" onClick={onClose} className="hover:underline text-[11px]">
              Guest Checkout Support
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

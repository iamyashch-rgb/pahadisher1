'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  User, Mail, Phone, Lock, Eye, EyeOff, ShieldCheck, 
  ArrowRight, KeyRound, Sparkles, CheckCircle2, AlertCircle, Mountain 
} from 'lucide-react';
import { useCustomerAuth } from '@/context/CustomerAuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { user, isAuthenticated, login, loginWithOtp, signup } = useCustomerAuth();

  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [loginMode, setLoginMode] = useState<'password' | 'otp'>('password');
  
  // Login State
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Signup State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        router.push('/account');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, router]);



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
        setTimeout(() => {
          setOtpSent(true);
          setLoading(false);
          setSuccess(`OTP code sent to ${loginIdentifier}`);
        }, 500);
        return;
      }

      const res = await loginWithOtp(loginIdentifier, otpCode);
      setLoading(false);
      if (res.success) {
        setSuccess('Logged in successfully! Redirecting...');
        setTimeout(() => router.push('/account'), 800);
      } else {
        setError(res.message || 'Invalid OTP code.');
      }
      return;
    }

    const res = await login(loginIdentifier, loginPassword);
    setLoading(false);
    if (res.success) {
      setSuccess(res.message || 'Login successful!');
      setTimeout(() => router.push('/account'), 800);
    } else {
      setError(res.message || 'Login failed.');
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!signupName.trim() || !signupEmail.trim()) {
      setError('Please complete all required fields (Name & Email).');
      return;
    }

    if (signupPassword && signupPassword !== signupConfirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!agreeTerms) {
      setError('Please accept the Terms of Service & Privacy Policy.');
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
      setSuccess('Account created! Redirecting to your account dashboard...');
      setTimeout(() => router.push('/account'), 900);
    } else {
      setError(res.message || 'Registration failed.');
    }
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen pt-28 pb-16 bg-[#FAF6F0] flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-md rounded-2xl border border-[#E5DFC9] shadow-xl p-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#1B3626] text-[#D49B35] flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#1B3626]">Already Logged In</h2>
          <p className="text-xs text-[#664936]">
            You are logged in as <strong className="text-[#1B3626]">{user?.name}</strong>.
          </p>
          <Link
            href="/account"
            className="inline-block w-full bg-[#1B3626] text-[#FAF6F0] py-3.5 rounded-xl text-xs uppercase font-bold tracking-widest hover:bg-[#274A36] transition-all shadow-md"
          >
            Go to My Account Dashboard →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16 bg-[#FAF6F0] flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg rounded-3xl border border-[#E5DFC9] shadow-2xl p-6 sm:p-10 space-y-6">
        
        {/* Brand Title Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-[#1B3626] text-[#D49B35] flex items-center justify-center mx-auto shadow-md border-2 border-[#D49B35]/30">
            <Mountain className="w-7 h-7 stroke-[2]" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#1B3626]">
            {tab === 'login' ? 'Customer Sign In' : 'Create Account'}
          </h1>
          <p className="text-xs text-[#664936] max-w-xs mx-auto">
            Access your pure high-altitude Himalayan orders, reward points & addresses.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-[#EAE4D8] p-1 rounded-2xl border border-[#E5DFC9]">
          <button
            type="button"
            onClick={() => {
              setTab('login');
              setError(null);
              setSuccess(null);
            }}
            className={`flex-1 py-3 text-xs uppercase font-bold tracking-wider rounded-xl transition-all ${
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
            className={`flex-1 py-3 text-xs uppercase font-bold tracking-wider rounded-xl transition-all ${
              tab === 'signup'
                ? 'bg-[#1B3626] text-[#FAF6F0] shadow-sm'
                : 'text-[#664936] hover:text-[#1B3626]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Feedback Banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-3.5 rounded-xl text-xs flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-xl text-xs flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        {/* TAB 1: LOGIN */}
        {tab === 'login' && (
          <div className="space-y-5">

            {/* Login Mode Toggle */}
            <div className="flex items-center justify-between text-xs text-[#664936]">
              <span className="font-semibold">Sign In Mode:</span>
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
                  OTP Code
                </button>
              </div>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#664936] mb-1.5">
                  Mobile Number or Email Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="+91 98765 43210 or email@example.com"
                    className="w-full bg-[#FAF6F0] border border-[#E5DFC9] rounded-xl pl-10 pr-4 py-3 text-xs text-[#1C241E] focus:outline-none focus:ring-2 focus:ring-[#D49B35]"
                  />
                  <Mail className="w-4 h-4 text-[#664936] absolute left-3.5 top-3.5" />
                </div>
              </div>

              {loginMode === 'password' && (
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#664936]">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Password reset verification link sent to your mobile/email!')}
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
                      className="w-full bg-[#FAF6F0] border border-[#E5DFC9] rounded-xl pl-10 pr-10 py-3 text-xs text-[#1C241E] focus:outline-none focus:ring-2 focus:ring-[#D49B35]"
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
                  <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#664936] mb-1.5">
                    Enter 6-Digit Verification OTP
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="123456"
                      className="w-full bg-[#FAF6F0] border border-[#E5DFC9] rounded-xl pl-10 pr-4 py-3 text-sm text-center font-mono tracking-widest text-[#1B3626] focus:outline-none focus:ring-2 focus:ring-[#D49B35]"
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
                    ? 'Send Login OTP'
                    : 'Sign In to Account'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: SIGN UP */}
        {tab === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#664936] mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full bg-[#FAF6F0] border border-[#E5DFC9] rounded-xl pl-10 pr-4 py-3 text-xs text-[#1C241E] focus:outline-none focus:ring-2 focus:ring-[#D49B35]"
                />
                <User className="w-4 h-4 text-[#664936] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#664936] mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="rajesh@example.com"
                  className="w-full bg-[#FAF6F0] border border-[#E5DFC9] rounded-xl pl-10 pr-4 py-3 text-xs text-[#1C241E] focus:outline-none focus:ring-2 focus:ring-[#D49B35]"
                />
                <Mail className="w-4 h-4 text-[#664936] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#664936] mb-1.5">
                Mobile Number (Optional)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  maxLength={10}
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="10-digit mobile number"
                  className="w-full bg-[#FAF6F0] border border-[#E5DFC9] rounded-xl pl-10 pr-4 py-3 text-xs text-[#1C241E] focus:outline-none focus:ring-2 focus:ring-[#D49B35]"
                />
                <Phone className="w-4 h-4 text-[#664936] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#664936] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#FAF6F0] border border-[#E5DFC9] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1C241E] focus:outline-none focus:ring-2 focus:ring-[#D49B35]"
                  />
                  <Lock className="w-4 h-4 text-[#664936] absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#664936] mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#FAF6F0] border border-[#E5DFC9] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1C241E] focus:outline-none focus:ring-2 focus:ring-[#D49B35]"
                  />
                  <Lock className="w-4 h-4 text-[#664936] absolute left-3 top-3" />
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="agreeTermsPage"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="rounded border-[#E5DFC9] text-[#1B3626] focus:ring-[#D49B35]"
              />
              <label htmlFor="agreeTermsPage" className="text-xs text-[#664936]">
                I agree to the <Link href="/terms-of-service" className="underline hover:text-[#1B3626]">Terms of Service</Link> & <Link href="/privacy-policy" className="underline hover:text-[#1B3626]">Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1B3626] text-[#FAF6F0] py-3.5 rounded-xl text-xs uppercase font-bold tracking-widest hover:bg-[#274A36] transition-all shadow-md active:scale-95 flex items-center justify-center space-x-2"
            >
              <span>{loading ? 'Registering Account...' : 'Complete Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Footer info links */}
        <div className="pt-4 border-t border-[#E5DFC9] flex items-center justify-between text-xs text-[#664936]">
          <Link href="/admin" className="hover:text-[#B85D3B] font-semibold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-[#B85D3B]" />
            <span>Admin / Seller Portal →</span>
          </Link>
          <Link href="/products" className="hover:underline font-semibold">
            Browse Store Catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}

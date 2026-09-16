'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Coins, Gift, TrendingUp, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Lock, Unlock } from 'lucide-react';
import { useCustomerAuth } from '@/context/CustomerAuthContext';

export const PointsRewardBanner = () => {
  const { user, isAuthenticated, openAuthModal } = useCustomerAuth();
  const userPoints = user?.rewardPoints || 0;
  const isRedemptionUnlocked = userPoints > 999;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF6F0] overflow-hidden select-none">
      <div className="max-w-[1280px] mx-auto">
        <div className="bg-gradient-to-br from-[#1B3626] via-[#244733] to-[#0F2218] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#D49B35]/40 shadow-2xl relative overflow-hidden text-[#FAF6F0]">
          
          {/* Background Ambient Glow & Mountain Vector Accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D49B35]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

          <div className="relative z-10 space-y-8">
            
            {/* Top Badge & Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-[#D49B35]/20 border border-[#D49B35]/40 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest text-[#D49B35]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D49B35]" />
                  <span>Pahadi Sher Loyalty Rewards Program</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF6F0] leading-tight">
                  Buy Above <span className="text-[#D49B35]">₹999</span> & Get <span className="text-[#D49B35]">100 Credit Points</span>
                </h2>
                <p className="text-xs sm:text-sm text-[#FAF6F0]/85 font-sans leading-relaxed">
                  Earn points on every purchase. Collect above 999 points to redeem any product for <strong>FREE</strong>! 
                  <span className="text-[#D49B35] font-semibold ml-1.5">(1 Credit Point = ₹1 Rupee Value)</span>
                </p>
              </div>

              {/* User Points Quick Card / Sign In Callout */}
              <div className="w-full md:w-auto bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl shrink-0 space-y-2.5 text-center md:text-right">
                {isAuthenticated && user ? (
                  <>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#FAF6F0]/70 block">
                      Welcome, {user.name}
                    </span>
                    <div className="flex items-baseline justify-center md:justify-end gap-2">
                      <Coins className="w-5 h-5 text-[#D49B35]" />
                      <span className="font-serif text-3xl font-bold text-[#FAF6F0]">
                        {userPoints.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-[#D49B35] font-semibold">Points (₹{userPoints})</span>
                    </div>
                    {isRedemptionUnlocked ? (
                      <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        <Unlock className="w-3 h-3" /> 🎉 Redemption Active!
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        <Lock className="w-3 h-3" /> Need {1000 - userPoints} more pts to redeem
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#D49B35] block font-mono">
                      Guest Customer
                    </span>
                    <p className="text-xs text-[#FAF6F0] font-semibold max-w-[200px]">
                      Sign in to track & redeem your 100 Credit Points!
                    </p>
                    <button
                      onClick={() => openAuthModal('login')}
                      className="w-full bg-[#D49B35] text-[#1B3626] py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#c08b2c] transition-all shadow-md"
                    >
                      Sign In / Register
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* 3 Step Earning & Redemption Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
              
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 p-5 rounded-2xl space-y-2 hover:bg-white/15 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#D49B35]/20 border border-[#D49B35]/40 text-[#D49B35] flex items-center justify-center font-bold text-lg">
                  🛍️
                </div>
                <h3 className="font-serif text-lg font-bold text-[#FAF6F0]">1. Buy Above ₹999</h3>
                <p className="text-xs text-[#FAF6F0]/80 leading-relaxed">
                  Add pure Himalayan organic essentials to cart. Every order over ₹999 automatically grants <strong>100 Credit Points</strong>.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/15 p-5 rounded-2xl space-y-2 hover:bg-white/15 transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center font-bold text-lg">
                  🪙
                </div>
                <h3 className="font-serif text-lg font-bold text-[#FAF6F0]">2. 1 Point = ₹1 Rupee</h3>
                <p className="text-xs text-[#FAF6F0]/80 leading-relaxed">
                  No hidden formulas. 1 Credit Point equals exactly <strong>₹1 Rupee</strong> off on any product purchase.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/15 p-5 rounded-2xl space-y-2 hover:bg-white/15 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center font-bold text-lg">
                  🎁
                </div>
                <h3 className="font-serif text-lg font-bold text-[#FAF6F0]">3. Redeem Above 999 Pts</h3>
                <p className="text-xs text-[#FAF6F0]/80 leading-relaxed">
                  Once your balance passes 999 points, unlock instant redemption at checkout for any item in store!
                </p>
              </div>

            </div>

            {/* Bottom Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10">
              <div className="flex items-center space-x-2 text-xs text-[#FAF6F0]/80">
                <ShieldCheck className="w-4 h-4 text-[#D49B35]" />
                <span>Points never expire for active Pahadi Sher members.</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <Link
                  href="/products"
                  className="flex-1 sm:flex-none text-center bg-[#D49B35] text-[#1B3626] hover:bg-[#c08b2c] px-6 py-3 rounded-xl text-xs uppercase font-bold tracking-widest transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <span>Shop Store & Earn Points</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/account"
                  className="flex-1 sm:flex-none text-center bg-white/10 border border-white/20 text-[#FAF6F0] hover:bg-white/20 px-6 py-3 rounded-xl text-xs uppercase font-bold tracking-wider transition-all"
                >
                  Check Points Balance
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

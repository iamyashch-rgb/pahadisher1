'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export const NewsletterSection = () => {
  const { homepageConfig } = useAdmin();
  const newsletter = homepageConfig.newsletter;

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section className="py-20 bg-[#162F21] text-[#FAF6F0] relative overflow-hidden border-t border-[#E5DFC9]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
        <div className="inline-flex items-center space-x-2 bg-[#DDE8D5]/20 text-[#D49B35] border border-[#DDE8D5]/30 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-4 h-4" />
          <span>The Himalayan Journal</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
          {newsletter.heading || 'Join The Pahadi Sher Tribe'}
        </h2>

        <p className="text-xs sm:text-sm text-[#FAF6F0]/80 font-sans max-w-xl mx-auto leading-relaxed">
          {newsletter.subtitle || 'Subscribe for exclusive harvest drops, Ayurvedic wellness guides, and 10% off your first order.'}
        </p>

        {subscribed ? (
          <div className="bg-white/10 border border-[#D49B35] p-6 rounded-3xl max-w-md mx-auto space-y-2 text-[#D49B35]">
            <CheckCircle2 className="w-8 h-8 mx-auto" />
            <h4 className="font-serif text-xl font-bold">Welcome to the Mountain Tribe!</h4>
            <p className="text-xs text-white">
              Use coupon code <strong className="font-mono text-[#D49B35] bg-black/40 px-2 py-1 rounded-full">PAHADI10</strong> at checkout for 10% OFF.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <div className="relative">
              <input
                type="email"
                required
                placeholder={newsletter.placeholderText || 'Enter your email address...'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/25 rounded-full pl-5 pr-32 py-3.5 text-xs text-white placeholder-[#FAF6F0]/50 focus:outline-none focus:ring-1 focus:ring-[#D49B35]"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#B85D3B] text-white px-5 rounded-full text-xs uppercase font-bold tracking-wider hover:bg-[#9C4B2B] transition-colors flex items-center space-x-1"
              >
                <span>{newsletter.buttonText || 'Subscribe'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {newsletter.perks && newsletter.perks.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 pt-2 text-[11px] text-[#FAF6F0]/70">
                {newsletter.perks.map((perk, i) => (
                  <span key={i} className="inline-flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-[#D49B35] inline" />
                    <span>{perk}</span>
                  </span>
                ))}
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  );
};

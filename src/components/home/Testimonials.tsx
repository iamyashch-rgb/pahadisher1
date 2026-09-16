'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Quote, CheckCircle2, User } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export const Testimonials = () => {
  const { homepageConfig } = useAdmin();
  const testimonials = homepageConfig.testimonials;

  return (
    <section className="py-20 bg-[#FAF6F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#B85D3B]">
            {testimonials.tagline || 'VERIFIED REVIEWS'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1B3626]">
            {testimonials.heading || 'Loved by 50,000+ Health Seekers'}
          </h2>
          <p className="text-sm text-[#455248] font-sans">
            {testimonials.subtitle || 'Real stories of transformation, vitality, and purity from our valued Himalayan family.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 rounded-3xl border border-[#E5DFC9] relative flex flex-col justify-between shadow-sm hover:shadow-kumaon-card transition-all space-y-6"
            >
              <Quote className="w-10 h-10 text-[#D49B35]/20 absolute top-6 right-6" />

              <div className="space-y-3">
                {/* Rating */}
                <div className="flex text-[#D49B35] space-x-1">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs text-[#455248] leading-relaxed font-sans italic">
                  "{item.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5DFC9] flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#1B3626] text-[#D49B35] flex items-center justify-center font-bold text-sm shrink-0 border border-[#D49B35]/40 shadow-xs">
                  <User className="w-5 h-5 text-[#D49B35]" />
                </div>

                <div>
                  <h5 className="font-serif text-base font-bold text-[#1B3626] flex items-center space-x-1">
                    <span>{item.name}</span>
                    {item.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />}
                  </h5>
                  <p className="text-[11px] text-[#664936] font-sans">
                    {item.location} • <span className="text-[#1B3626] font-semibold">Verified Buyer</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/reviews"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#1B3626] hover:text-[#B85D3B] transition-colors group"
          >
            <span>Read All Verified Customer Reviews →</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

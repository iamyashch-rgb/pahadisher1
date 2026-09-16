'use client';

import React from 'react';
import { ShieldCheck, Mountain, Sun, CheckCircle2, Award, Heart, Sparkles, FileCheck2 } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export const WhyPahadiSher = () => {
  const { homepageConfig } = useAdmin();
  const whyUs = homepageConfig.whyUs;

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Mountain': return Mountain;
      case 'Sun': return Sun;
      case 'FileCheck2': return FileCheck2;
      case 'Heart': return Heart;
      case 'ShieldCheck': return ShieldCheck;
      case 'Award': return Award;
      default: return Sparkles;
    }
  };

  return (
    <section className="py-20 bg-[#FAF6F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#B85D3B]">
            {whyUs.tagline || 'THE PAHADI SHER DIFFERENCE'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1B3626]">
            {whyUs.heading || 'Why Choose The Pahadi Sher'}
          </h2>
          <p className="text-sm text-[#455248] font-sans leading-relaxed">
            {whyUs.subtitle || 'We preserve ancient mountain traditions combined with modern phytochemical verification.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyUs.items.map((item, idx) => {
            const Icon = getIconComponent(item.icon);
            return (
              <div
                key={item.id || idx}
                className="bg-white p-8 rounded-3xl border border-[#E5DFC9] hover:border-[#B85D3B]/50 transition-all duration-300 space-y-4 shadow-sm group"
              >
                <div className="w-12 h-12 rounded-full bg-[#EEF4EA] text-[#1B3626] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1B3626]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#455248] leading-relaxed font-sans font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

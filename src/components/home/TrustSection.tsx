'use client';

import React from 'react';
import Link from 'next/link';
import { Mountain, ShieldCheck, CheckCircle2, Award, ArrowRight, Sun, Sparkles } from 'lucide-react';

export const TrustSection = () => {
  const pillars = [
    {
      icon: Sun,
      title: '45-Day Surya Tapi Method',
      subtitle: 'Sun-Dried Solar Purification',
      desc: 'Purified naturally under high-altitude Himalayan sunlight below 40°C to preserve raw bioactive nutrients.',
    },
    {
      icon: Mountain,
      title: '18,000 FT High Altitude',
      subtitle: 'Pithoragarh & Kumaon Hamlets',
      desc: 'Sourced from pristine unpolluted rocky mountain peaks far above industrial contamination.',
    },
    {
      icon: ShieldCheck,
      title: '100% Unadulterated Organics',
      subtitle: 'Zero Additives or Chemicals',
      desc: 'Pure, raw Himalayan harvest delivered directly from native farming families to your doorstep.',
    },
  ];

  return (
    <section className="py-20 bg-[#FAF6F0] relative border-b border-[#E5DFC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#DDE8D5] text-[#1B3626] border border-[#C3CCA6] px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#D49B35]" />
            <span>Pure Himalayan Standard</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1B3626] leading-tight">
            Authentic Mountain Craft. <br />
            Untouched by Modern Processing.
          </h2>

          <p className="text-base text-[#455248] font-sans leading-relaxed">
            Every jar of The Pahadi Sher carries the legacy of ancient Kumaon Ayurveda. We preserve traditional extraction methods so you experience the full potency of raw Himalayan nature.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-[#E5DFC9] shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#EEF4EA] border border-[#C3CCA6] flex items-center justify-center text-[#1B3626]">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#B85D3B] block">
                      {item.subtitle}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#1B3626] mt-0.5">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#455248] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5DFC9] flex items-center space-x-2 text-xs font-bold text-[#1B3626]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Guaranteed Mountain Purity</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Link */}
        <div className="text-center">
          <Link
            href="/our-story"
            className="inline-flex items-center space-x-2 bg-[#1B3626] text-[#FAF6F0] px-6 py-3 rounded-full text-xs uppercase font-bold tracking-widest hover:bg-[#274A36] transition-all shadow-sm"
          >
            <span>Learn About Our Sourcing Story</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

'use client';

import React from 'react';
import { Mountain, Flame, ShieldCheck, Sun, Droplets } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Mountain,
    title: 'High-Altitude Harvest',
    subtitle: '18,000+ FT PEAKS',
    desc: 'Foraged by native Pahadi elders from natural rock exudates in pristine high-altitude Kumaon ranges.'
  },
  {
    number: '02',
    icon: Droplets,
    title: 'Glacial Spring Washing',
    subtitle: 'PURE MOUNTAIN WATER',
    desc: 'Purified traditionally using cold glacial spring water to remove natural minerals and impurities without heat damage.'
  },
  {
    number: '03',
    icon: Sun,
    title: 'Sun-Dried & Vedic Bilona',
    subtitle: 'SLOW SACRED METHOD',
    desc: 'Shilajit is sun-dried under alpine sunlight; Pure Cow Ghee is hand-churned bi-directionally in wooden pots.'
  },
  {
    number: '04',
    icon: ShieldCheck,
    title: 'Artisanal Glass Bottling',
    subtitle: '100% PURE & UNADULTERATED',
    desc: 'Every harvest is carefully inspected, packed in UV-protected eco glass jars, and sealed directly at the mountain origin.'
  }
];

export const SourcingProcess = () => {
  return (
    <section className="py-20 bg-[#FAF6F0] relative border-b border-[#E5DFC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#B85D3B]">
            Untouched By Industrial Processing
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1B3626]">
            The Pahadi Sher Sourcing Standard
          </h2>
          <p className="text-sm text-[#455248] font-sans leading-relaxed">
            From the sacred peaks of Uttarakhand to your table — preserved in accordance with Vedic tradition and direct village community partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white p-7 rounded-3xl border border-[#E5DFC9] hover:border-[#B85D3B]/50 transition-all duration-300 relative group space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-full bg-[#EEF4EA] text-[#1B3626] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <IconComponent className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="font-serif text-3xl font-bold text-[#EAE4D8] group-hover:text-[#B85D3B] transition-colors">
                    {step.number}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#B85D3B]">
                    {step.subtitle}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#1B3626]">
                    {step.title}
                  </h3>
                </div>

                <p className="text-xs text-[#455248] leading-relaxed font-sans font-normal">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

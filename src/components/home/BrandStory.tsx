'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mountain, ArrowRight, Heart } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export const BrandStory = () => {
  const { homepageConfig } = useAdmin();
  const story = homepageConfig.brandStory;

  return (
    <section className="py-24 bg-[#F4EFE6] relative border-y border-[#E5DFC9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Images Stack */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#E5DFC9] shadow-md">
              <Image
                src={story.image || 'https://pahadisher.in/cdn/shop/files/WhatsApp_Image_2025-12-21_at_9.53.22_AM.jpg?v=1766299154&width=1200'}
                alt="Himalayan Village Sourcing"
                fill
                className="object-cover"
              />
            </div>

            {/* Overlapping Badge Card */}
            <div className="absolute -bottom-8 -right-4 sm:right-6 bg-[#1B3626] text-[#FAF6F0] p-6 rounded-3xl border border-[#DDE8D5]/30 shadow-2xl max-w-xs space-y-2">
              <div className="flex items-center space-x-2 text-[#D49B35]">
                <Mountain className="w-5 h-5" />
                <span className="text-xs font-serif font-bold">100% Native Sourcing</span>
              </div>
              <p className="text-xs text-[#FAF6F0]/90 font-sans leading-relaxed">
                Direct partnerships with Kumaoni farming families across high-altitude mountain hamlets.
              </p>
            </div>
          </div>

          {/* Right Brand Story Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#DDE8D5] text-[#1B3626] border border-[#C3CCA6] px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest">
              <Heart className="w-4 h-4 text-[#B85D3B]" />
              <span>{story.tagline || 'OUR SACRED ORIGIN STORY'}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1B3626] leading-tight">
              {story.heading}
            </h2>

            <p className="text-sm sm:text-base text-[#455248] font-sans leading-relaxed">
              {story.description1}
            </p>

            <p className="text-xs sm:text-sm text-[#455248] font-sans leading-relaxed">
              {story.description2}
            </p>

            {story.stats && story.stats.length > 0 && (
              <div className={`grid grid-cols-${Math.min(story.stats.length, 3)} gap-4 pt-2 text-xs`}>
                {story.stats.map((st, i) => (
                  <div key={i} className="bg-white p-4 rounded-2xl border border-[#E5DFC9]">
                    <span className="font-serif text-3xl font-bold text-[#1B3626] block">{st.number}</span>
                    <span className="text-[#664936] font-semibold text-[11px]">{st.label}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2">
              <Link
                href={story.ctaLink || '/our-story'}
                className="inline-flex items-center space-x-2 bg-[#1B3626] text-[#FAF6F0] px-8 py-3.5 rounded-full text-xs uppercase font-bold tracking-widest hover:bg-[#274A36] shadow-sm transition-all"
              >
                <span>{story.ctaText || 'Read Full Story'}</span>
                <ArrowRight className="w-4 h-4 text-[#D49B35]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Mountain, CheckCircle2, ArrowRight, Zap, Award } from 'lucide-react';

export const ShilajitSpotlight = () => {
  return (
    <section className="py-20 bg-pahadi-green-dark text-pahadi-offwhite relative overflow-hidden border-y border-pahadi-gold/30">
      {/* Background Graphic Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pahadi-green/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Image Gallery */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square rounded-3xl overflow-hidden border-2 border-pahadi-gold/40 shadow-2xl bg-pahadi-green/60 p-2">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="https://pahadisher.in/cdn/shop/files/8.jpg?v=1766302871&width=600"
                  alt="Pure Himalayan Shilajit Resin 18,000 FT"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pahadi-green-dark via-transparent to-transparent opacity-80" />

                <div className="absolute top-4 left-4 bg-pahadi-gold text-pahadi-green-dark px-3 py-1 rounded-full text-xs font-bold font-sans uppercase">
                  85.4% Fulvic Acid Verified
                </div>
              </div>
            </div>

            {/* Floating Authenticity Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-pahadi-offwhite p-4 rounded-2xl border border-pahadi-gold text-pahadi-green shadow-2xl max-w-xs space-y-1">
              <div className="flex items-center space-x-2 text-pahadi-gold">
                <ShieldCheck className="w-5 h-5 fill-pahadi-green" />
                <span className="text-xs font-serif font-bold">100% Pure Himalayan Resin</span>
              </div>
              <p className="text-[11px] text-pahadi-charcoal-muted font-sans">
                Harvested at 18,000 FT • 85.4% Fulvic Acid Potency.
              </p>
            </div>
          </div>

          {/* Right Detailed Copy & Comparison */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-pahadi-gold/20 text-pahadi-gold px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              <Mountain className="w-4 h-4" />
              <span>18,000 FT Altitude Mineral Exudate</span>
            </div>

            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              The Gold Standard of <br />
              <span className="text-pahadi-gold italic font-normal">Himalayan Shilajit</span>
            </h2>

            <p className="text-sm sm:text-base text-pahadi-sand/90 font-sans leading-relaxed">
              At altitudes above 18,000 feet in upper Kumaon, extreme temperature variations cause dense organic plant matter to compress between rock strata over centuries. Our Shilajit is hand-scraped during summer solstice, purified using cold spring water, and never subjected to high-heat boiling.
            </p>

            {/* Grid of Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs font-sans">
              <div className="flex items-start space-x-3 bg-white/5 border border-white/10 p-3.5 rounded-xl">
                <Zap className="w-5 h-5 text-pahadi-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-white text-sm">84+ Ionic Trace Minerals</h4>
                  <p className="text-pahadi-sand/70 text-[11px] mt-0.5">Bio-available minerals that restore cellular ATP energy production.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white/5 border border-white/10 p-3.5 rounded-xl">
                <Award className="w-5 h-5 text-pahadi-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-white text-sm">85%+ Fulvic Acid Potency</h4>
                  <p className="text-pahadi-sand/70 text-[11px] mt-0.5">Highest verified purity level for optimal nutrient uptake in body.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white/5 border border-white/10 p-3.5 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-pahadi-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-white text-sm">Zero Chemical Processing</h4>
                  <p className="text-pahadi-sand/70 text-[11px] mt-0.5">Purified naturally with cold mountain spring water.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white/5 border border-white/10 p-3.5 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-pahadi-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-white text-sm">Traditional Sun-Drying</h4>
                  <p className="text-pahadi-sand/70 text-[11px] mt-0.5">Preserves active dibenzo-alpha-pyrones without heat degradation.</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/products/pure-himalayan-shilajit-resin-50g"
                className="bg-pahadi-gold text-pahadi-green-dark px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center space-x-2 hover:bg-white transition-colors"
              >
                <span>Buy Pure Shilajit Resin (50g)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

'use client';

import React from 'react';
import { 
  Instagram, 
  Youtube,
  Facebook,
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  Award,
  Users
} from 'lucide-react';

export const InstagramReelsSection = () => {
  return (
    <section className="py-16 bg-[#122419] text-[#FAF6F0] relative overflow-hidden border-t border-b border-[#2C4C36]">
      {/* Subtle Background Glow Accents */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#D49B35]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#B85D3B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Instagram Account Banner Card */}
        <div className="bg-[#1B3626] border border-[#2C4C36] rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden group">
          {/* Subtle gradient highlight */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-red-500/5 pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            {/* Left: Account Identity & Avatar */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
              {/* Instagram Profile Avatar Frame */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)] p-1 shrink-0 shadow-xl group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-[#122419] flex items-center justify-center text-white">
                  <Instagram className="w-10 h-10 sm:w-12 sm:h-12" />
                </div>
              </div>

              {/* Handle & Details */}
              <div className="space-y-3 max-w-xl">
                <div className="inline-flex items-center space-x-2 bg-[linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)] text-white px-3.5 py-1 rounded-full text-xs font-sans font-bold uppercase tracking-widest shadow-md">
                  <Instagram className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Official Instagram Page</span>
                </div>

                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
                    @pahadi_sher05
                  </h3>
                  <CheckCircle2 className="w-6 h-6 text-[#3897f0] fill-[#3897f0] shrink-0" />
                </div>

                <p className="text-sm text-[#FAF6F0]/85 font-sans leading-relaxed">
                  Follow our official Instagram handle <strong className="text-[#D49B35]">@pahadi_sher05</strong> for raw high-altitude harvesting expeditions, traditional Surya Tapi solar purification footage, and authentic village farmer updates directly from Uttarakhand.
                </p>

                {/* Feature Tags */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs font-sans font-medium text-white/80">
                  <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D49B35]" /> 100% Pure Himalayan
                  </span>
                  <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                    <Award className="w-3.5 h-3.5 text-amber-400" /> NABL Lab Verified
                  </span>
                  <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                    <Users className="w-3.5 h-3.5 text-emerald-400" /> Village Community Sourced
                  </span>
                </div>
              </div>
            </div>

            {/* Right: CTA Follow Button */}
            <div className="shrink-0 flex flex-col items-center sm:items-end space-y-3">
              <a
                href="https://www.instagram.com/pahadi_sher05/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)] hover:opacity-95 text-white font-sans text-sm uppercase font-bold tracking-widest px-8 py-4 rounded-full transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center space-x-3"
              >
                <Instagram className="w-5 h-5" />
                <span>Follow @pahadi_sher05</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <span className="text-[11px] text-[#FAF6F0]/60 font-sans tracking-wide">
                Opens directly in Instagram App
              </span>

              <div className="flex items-center space-x-3 pt-1">
                <span className="text-[11px] text-[#FAF6F0]/60 font-sans">More Socials:</span>
                <a
                  href="https://www.youtube.com/@nehabohra1280/featured"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-xs text-[#FAF6F0]/80 hover:text-[#FF0000] font-medium transition-colors"
                >
                  <Youtube className="w-4 h-4 text-[#FF0000]" />
                  <span>YouTube</span>
                </a>
                <span className="text-[#FAF6F0]/30">•</span>
                <a
                  href="https://www.facebook.com/profile.php?id=100094324785060"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-xs text-[#FAF6F0]/80 hover:text-[#1877F2] font-medium transition-colors"
                >
                  <Facebook className="w-4 h-4 text-[#1877F2]" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Mountain, ShieldCheck, Award, Heart, Mail, ArrowRight, MapPin, CheckCircle2, Instagram, Youtube, Facebook } from 'lucide-react';

export const Footer = () => {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-[#162F21] text-[#FAF6F0] relative overflow-hidden border-t-2 border-[#B85D3B]">
      {/* Decorative mountain watermark overlay */}
      <div className="absolute top-0 right-0 left-0 h-12 bg-[#FAF6F0] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-5">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#D49B35] shadow-md shrink-0 bg-[#162F21]">
                <Image
                  src="/assets/photos/2.jpeg"
                  alt="The Pahadi Sher Logo"
                  fill
                  sizes="40px"
                  className="object-cover object-center rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  THE PAHADI SHER
                </span>
                <span className="text-[9px] font-sans tracking-[0.22em] text-[#D49B35] uppercase font-semibold">
                  Kumaon & Himalayan Organics
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#FAF6F0]/80 font-sans leading-relaxed max-w-md">
              Bringing authentic, high-altitude Himalayan treasures directly from Kumaon farming families to your home. Harvested with reverence, 100% organic, and untouched by industrial processing.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs text-[#D49B35]">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>The Pahadi Sher, Near Aptech, Pithoragarh, Uttarakhand 262501</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs text-[#DDE8D5]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D49B35] shrink-0" />
                <span>100% Organic Purity</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <span className="text-xs text-[#FAF6F0]/60 font-sans">Follow Us:</span>
              <a
                href="https://www.instagram.com/pahadi_sher05/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram @pahadi_sher05"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-[#D49B35] text-[#FAF6F0] hover:text-[#162F21] flex items-center justify-center transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@nehabohra1280/featured"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube Channel"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-[#FF0000] text-[#FAF6F0] hover:text-white flex items-center justify-center transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100094324785060"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook Page"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-[#1877F2] text-[#FAF6F0] hover:text-white flex items-center justify-center transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-1 space-y-4">
            <h4 className="font-serif text-xl font-bold text-white tracking-wide">
              Product Catalogue
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-[#FAF6F0]/80">
              <li>
                <Link href="/products?category=shilajit" className="hover:text-[#D49B35] transition-colors">
                  Pure Himalayan Shilajit
                </Link>
              </li>
              <li>
                <Link href="/products?category=ghee" className="hover:text-[#D49B35] transition-colors">
                  Pure Cow Bilona Ghee
                </Link>
              </li>
              <li>
                <Link href="/products?category=honey" className="hover:text-[#D49B35] transition-colors">
                  Raw Buransh & Wild Honey
                </Link>
              </li>
              <li>
                <Link href="/products?category=teas" className="hover:text-[#D49B35] transition-colors">
                  Wildcraft Herbal Teas
                </Link>
              </li>
              <li>
                <Link href="/products?category=pickles-dals" className="hover:text-[#D49B35] transition-colors">
                  Pahadi Hemp Pickles & Dals
                </Link>
              </li>
              <li>
                <Link href="/products?category=combos" className="hover:text-[#D49B35] transition-colors">
                  Curated Wellness Combos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Value Badges Bar */}
        <div className="py-8 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-white/10 text-center">
          <div className="flex flex-col items-center space-y-1.5 p-3 rounded-2xl bg-white/5 border border-white/5">
            <ShieldCheck className="w-5 h-5 text-[#D49B35]" />
            <span className="text-xs font-serif font-bold text-white">100% Lab Tested</span>
            <span className="text-[10px] text-[#FAF6F0]/70">Certified Fulvic Acid & Purity</span>
          </div>
          <div className="flex flex-col items-center space-y-1.5 p-3 rounded-2xl bg-white/5 border border-white/5">
            <Award className="w-5 h-5 text-[#D49B35]" />
            <span className="text-xs font-serif font-bold text-white">Direct Farmer Sourcing</span>
            <span className="text-[10px] text-[#FAF6F0]/70">Fair Trade Kumaoni Artisans</span>
          </div>
          <div className="flex flex-col items-center space-y-1.5 p-3 rounded-2xl bg-white/5 border border-white/5">
            <CheckCircle2 className="w-5 h-5 text-[#D49B35]" />
            <span className="text-xs font-serif font-bold text-white">Vedic Bilona Method</span>
            <span className="text-[10px] text-[#FAF6F0]/70">Traditional Churning Process</span>
          </div>
          <div className="flex flex-col items-center space-y-1.5 p-3 rounded-2xl bg-white/5 border border-white/5">
            <Heart className="w-5 h-5 text-[#D49B35]" />
            <span className="text-xs font-serif font-bold text-white">Eco Glass Packaging</span>
            <span className="text-[10px] text-[#FAF6F0]/70">Plastic-Free Secure Shipping</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF6F0]/60 space-y-3 sm:space-y-0">
          <p>© 2026 The Pahadi Sher. All Rights Reserved. Pure Himalayan Wellness.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

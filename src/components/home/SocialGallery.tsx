'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Youtube, Facebook, Mountain, ExternalLink, ArrowRight } from 'lucide-react';

const galleryImages = [
  {
    url: 'https://pahadisher.in/cdn/shop/files/1.jpg?v=1766302522&width=800',
    title: 'High Altitude Himalayan Rock Cliffs (About Us)',
    category: 'About Us Sourcing',
  },
  {
    url: 'https://cdn.shopify.com/s/files/1/0739/5223/1476/files/HerbalGreenTea_2.png?v=1774514207',
    title: 'Organic Kumaon Buransh Herbal Tea (Products)',
    category: 'Products',
  },
  {
    url: 'https://pahadisher.in/cdn/shop/files/6.jpg?v=1766302619&width=800',
    title: 'Surya Tapi Solar Evaporation (About Us)',
    category: 'About Us Heritage',
  },
  {
    url: 'https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Silajit_Rosemary1.png?v=1774862319',
    title: 'Pahadi Shilajit & Rosemary Green Tea (Products)',
    category: 'Products',
  },
  {
    url: 'https://pahadisher.in/cdn/shop/files/WhatsApp_Image_2025-12-21_at_9.53.36_AM.jpg?v=1766299893&width=1200',
    title: 'Native Village Women Cooperatives (About Us)',
    category: 'About Us Community',
  },
  {
    url: 'https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Garlic_and_Mango.png?v=1773684598',
    title: 'Pahadi Garlic & Mango Pickle Combo (Products)',
    category: 'Products',
  },
];

export const SocialGallery = () => {
  return (
    <section className="py-20 bg-[#F4EFE6] border-t border-[#E5DFC9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="https://www.instagram.com/pahadi_sher05/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs font-sans font-bold uppercase tracking-widest text-[#B85D3B] hover:text-[#1B3626] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#D49B35]" />
                <span>Instagram</span>
              </a>
              <span className="text-[#D49B35]/40 text-xs">•</span>
              <a
                href="https://www.youtube.com/@nehabohra1280/featured"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs font-sans font-bold uppercase tracking-widest text-[#B85D3B] hover:text-[#1B3626] transition-colors"
              >
                <Youtube className="w-4 h-4 text-[#FF0000]" />
                <span>YouTube</span>
              </a>
              <span className="text-[#D49B35]/40 text-xs">•</span>
              <a
                href="https://www.facebook.com/profile.php?id=100094324785060"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs font-sans font-bold uppercase tracking-widest text-[#B85D3B] hover:text-[#1B3626] transition-colors"
              >
                <Facebook className="w-4 h-4 text-[#1877F2]" />
                <span>Facebook</span>
              </a>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1B3626]">
              Himalayan Gallery & Sourcing
            </h2>
            <p className="text-xs sm:text-sm text-[#455248] font-sans">
              Authentic moments captured from our mountain harvest expeditions and handcrafted organic catalogue.
            </p>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center space-x-2 text-xs font-sans uppercase font-bold tracking-widest text-[#1B3626] hover:text-[#B85D3B] transition-colors shrink-0"
          >
            <span>View Full Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {galleryImages.map((img, idx) => (
            <Link
              key={idx}
              href="/gallery"
              className="group relative aspect-square rounded-2xl overflow-hidden border border-[#E5DFC9] shadow-sm block bg-white"
            >
              <Image
                src={img.url}
                alt={img.title}
                fill
                sizes="(max-width: 768px) 50vw, 16vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#162F21]/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center text-white space-y-1">
                <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-[#D49B35]">
                  {img.category}
                </span>
                <span className="text-[10px] font-serif font-medium line-clamp-2 leading-tight">
                  {img.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};


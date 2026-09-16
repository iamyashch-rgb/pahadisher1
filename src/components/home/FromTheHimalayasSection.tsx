'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mountain, Sun, ShieldCheck, Heart, Sparkles, ArrowRight, 
  MapPin, Flame, Award, Leaf, Users, CheckCircle2, ChevronRight 
} from 'lucide-react';

interface StoryPillar {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  quote: string;
  author: string;
  tags: string[];
}

const STORY_PILLARS: StoryPillar[] = [
  {
    id: 'origin',
    badge: '18,000 FT ALTITUDE',
    title: 'High-Altitude Uttarakhand Origin',
    subtitle: 'Harvested from untouched glacial rock cliffs in Kumaon.',
    description: 'Deep in the upper reaches of Uttarakhand, beyond human settlements at 18,000 feet, extreme solar radiation and glacial waters break down ancient plant matter into mineral-rich rock exudates. We forage only from these pristine, high-altitude rock formations.',
    image: '/assets/photos/13.jpg',
    quote: 'The higher the altitude, the richer the ionic mineral density forged by nature.',
    author: 'Pahadi Foraging Elder, Almora',
    tags: ['Kumaon Himalayas', '18,000 FT Peak', 'Glacial Minerals']
  },
  {
    id: 'sourcing',
    badge: 'DIRECT FAIR TRADE',
    title: 'Indigenous Pahadi Foraging Families',
    subtitle: 'Direct partnerships with native mountain farmers across 15 hamlets.',
    description: 'We bypass industrial middlemen to partner directly with indigenous Pahadi foraging families across Kumaon. By ensuring fair wages and profit-sharing, we preserve mountain livelihoods and keep traditional foraging heritage alive.',
    image: 'https://pahadisher.in/cdn/shop/files/WhatsApp_Image_2025-12-21_at_9.53.36_AM.jpg?v=1766299893&width=1200',
    quote: 'We harvest with deep gratitude, leaving enough resin for mountain flora to replenish.',
    author: 'Pahadi Harvester Community',
    tags: ['Fair Wages', '15+ Mountain Hamlets', 'Ethical Harvest']
  },
  {
    id: 'methods',
    badge: '45-DAY SURYA TAPI',
    title: 'Sacred Traditional Methods',
    subtitle: 'Slow sun-drying in glass containers without high-heat boiling.',
    description: 'Commercial brands use high-heat boiling to speed up production, destroying fragile bioactive compounds. We adhere strictly to Ayurveda\'s 45-day Surya Tapi method — purifying raw extract in pure mountain spring water and sun-drying slowly in glass vats under direct alpine sunlight.',
    image: 'https://pahadisher.in/cdn/shop/files/6.jpg?v=1766302619&width=800',
    quote: 'Sunlight and time are the only purifiers our ancestors trusted.',
    author: 'Ayurvedic Phytochemistry Council',
    tags: ['Surya Tapi Method', 'Glass Vat Dried', 'Zero High Heat']
  },
  {
    id: 'smallbatch',
    badge: 'LIMITED MOUNTAIN DROPS',
    title: 'Handcrafted Small-Batch Production',
    subtitle: 'Preserving fragile alpine ecosystems through controlled micro-harvests.',
    description: 'Mass industrial production harms delicate Himalayan rock ecosystems. We produce in limited, seasonal batches. Each jar is hand-poured in small quantities, ensuring uncompromising quality and zero ecological footprint.',
    image: 'https://pahadisher.in/cdn/shop/files/2.jpg?v=1766302490&width=800',
    quote: 'Small batches protect the sacred equilibrium of high-altitude rock cliffs.',
    author: 'Ecological Conservation Team',
    tags: ['Micro-Batches', 'Sustainable Foraging', 'Zero Industrial Leaching']
  },
  {
    id: 'transparency',
    badge: '100% ORGANIC PURITY',
    title: 'Uncompromising Mountain Transparency',
    subtitle: 'Direct village harvest with zero industrial additives.',
    description: 'We avoid exaggerated claims and focus on true mountain authenticity. Every single harvest is naturally processed using cold spring water and direct solar evaporation for 80%+ Fulvic Acid potency.',
    image: 'https://pahadisher.in/cdn/shop/files/8.jpg?v=1766302871&width=600',
    quote: 'True quality requires complete transparency — from high-altitude rock face to your glass jar.',
    author: 'Kumaon Organic Farming Council',
    tags: ['>80% Fulvic Acid', 'Zero Additives', 'Sun-Dried Purification']
  }
];

export const FromTheHimalayasSection = () => {
  const [activePillarId, setActivePillarId] = useState<string>('origin');

  const activePillar = STORY_PILLARS.find(p => p.id === activePillarId) || STORY_PILLARS[0];

  return (
    <section className="py-20 bg-[#FAF6F0] relative overflow-hidden border-b border-[#E5DFC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#DDE8D5] text-[#1B3626] border border-[#C3CCA6] px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#D49B35]" />
            <span>High-Altitude Heritage</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1B3626] leading-tight">
            Direct From Kumaon
          </h2>

          <p className="text-base text-[#455248] font-sans leading-relaxed">
            Discover how we harvest, purify, and bottle pure Himalayan treasures in harmony with nature and ancient Ayurvedic wisdom.
          </p>
        </div>

        {/* Story Pillar Switcher */}
        <div className="flex justify-center border-b border-[#E5DFC9] overflow-x-auto pb-2">
          <div className="flex space-x-2 sm:space-x-4">
            {STORY_PILLARS.map((pillar) => (
              <button
                key={pillar.id}
                onClick={() => setActivePillarId(pillar.id)}
                className={`px-4 py-2 rounded-full text-xs font-sans uppercase font-bold tracking-wider transition-all whitespace-nowrap ${
                  activePillarId === pillar.id
                    ? 'bg-[#1B3626] text-[#FAF6F0] shadow-sm'
                    : 'text-[#1C241E] hover:bg-[#F4EFE6]'
                }`}
              >
                {pillar.badge}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Pillar Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl border border-[#E5DFC9] p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#B85D3B] block">
                {activePillar.subtitle}
              </span>

              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#1B3626]">
                {activePillar.title}
              </h3>

              <p className="text-sm sm:text-base text-[#455248] font-sans leading-relaxed">
                {activePillar.description}
              </p>

              <blockquote className="p-4 bg-[#FAF6F0] rounded-2xl border-l-4 border-[#B85D3B] text-xs sm:text-sm italic text-[#1B3626] font-serif">
                "{activePillar.quote}"
                <span className="block mt-1 font-sans not-italic font-bold text-[10px] uppercase text-[#664936]">
                  — {activePillar.author}
                </span>
              </blockquote>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {activePillar.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="bg-[#EEF4EA] text-[#1B3626] border border-[#C3CCA6] px-3 py-1 rounded-full text-[11px] font-sans font-semibold"
                    >
                      ✓ {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href="/our-story"
                  className="inline-flex items-center space-x-2 bg-[#1B3626] text-[#FAF6F0] px-6 py-3 rounded-full text-xs uppercase font-bold tracking-widest hover:bg-[#274A36] shadow-sm shrink-0 transition-colors"
                >
                  <span>Explore Story</span>
                  <ArrowRight className="w-4 h-4 text-[#D49B35]" />
                </Link>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-5 relative w-full h-72 sm:h-80 lg:h-[380px] rounded-2xl overflow-hidden border border-[#E5DFC9] bg-[#162F21] shadow-inner">
              <Image
                src={activePillar.image}
                alt={activePillar.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className={activePillar.image.endsWith('.png') ? 'object-contain p-6 object-center w-full h-full' : 'object-cover object-center w-full h-full'}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#162F21]/70 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-4 left-4 bg-[#1B3626] text-[#FAF6F0] px-3.5 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider shadow-md z-10 border border-[#D49B35]/30">
                {activePillar.badge}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>      </div>
    </section>
  );
};

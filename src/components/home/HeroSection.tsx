'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

interface HeroSlide {
  id: number;
  titlePrefix: string;
  titleHighlight: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    titlePrefix: 'By ',
    titleHighlight: 'ThePahadiSher',
    subtitle: '100% Pure Himalayan Shilajit, Pure Cow Ghee & Wildflower Honey',
    image: '/assets/photos/13.jpg',
    ctaText: 'Explore Mountain Harvest',
    ctaLink: '/products',
  },
  {
    id: 2,
    titlePrefix: 'Pure Himalayan ',
    titleHighlight: 'Harvest',
    subtitle: 'Harvested above 18,000 ft in Kumaon by native Pahadi foraging families',
    image: '/assets/photos/himalayan-mountains.jpg',
    ctaText: 'Discover Catalogue',
    ctaLink: '/products',
  },
  {
    id: 3,
    titlePrefix: 'Sacred Vedic ',
    titleHighlight: 'Traditions',
    subtitle: 'Adhering strictly to 45-day Surya Tapi sun-drying in glass vats under alpine sunlight',
    image: '/assets/photos/1.jpeg',
    ctaText: 'Our Mountain Story',
    ctaLink: '/our-story',
  },
];

export const HeroSection = () => {
  const { homepageConfig } = useAdmin();
  const heroConfig = homepageConfig.hero;

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slider every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full h-[85vh] sm:h-[90vh] min-h-[550px] max-h-[900px] bg-black overflow-hidden flex items-center justify-center select-none pt-16">
      {/* Background Image Carousel with Direct Image Crossfade */}
      <AnimatePresence initial={false}>
        <motion.div
          key={activeSlide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={activeSlide.image}
            alt="Himalayan Mountains Kumaon"
            fill
            priority
            className="object-cover object-center filter brightness-[0.78] contrast-[1.08]"
          />
          {/* Soft Natural Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30 z-10" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Central Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            {/* Main Central Headline with Script Italic Accent */}
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-normal tracking-tight leading-none drop-shadow-xl">
              <span>{activeSlide.titlePrefix}</span>
              <span className="font-serif italic font-normal text-white">
                {activeSlide.titleHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-[#FAF6F0]/95 font-sans max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-md">
              {activeSlide.subtitle}
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <Link
                href={activeSlide.ctaLink}
                className="inline-flex items-center space-x-2 bg-[#FAF6F0] text-[#1B3626] hover:bg-white px-8 py-3.5 rounded-full text-xs font-sans font-bold uppercase tracking-widest transition-all duration-300 shadow-xl hover:scale-105 active:scale-95"
              >
                <span>{activeSlide.ctaText}</span>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left Slider Arrow Button */}
      <button
        onClick={handlePrev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 text-[#1C241E] hover:bg-white shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 group"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform stroke-[2]" />
      </button>

      {/* Right Slider Arrow Button */}
      <button
        onClick={handleNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 text-[#1C241E] hover:bg-white shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 group"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform stroke-[2]" />
      </button>

      {/* Slide Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2.5">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 rounded-full ${currentSlide === idx
              ? 'w-7 h-2.5 bg-white shadow-md'
              : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Floating WhatsApp Widget (Bottom Right) */}
      <a
        href="https://wa.me/919997408567?text=Hello%20The%20Pahadi%20Sher,%20I%20have%20an%20inquiry"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current stroke-none" />
        {/* Notification Badge */}
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white animate-bounce">
          1
        </span>
      </a>
    </section>
  );
};

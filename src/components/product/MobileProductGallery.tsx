'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types';

interface MobileProductGalleryProps {
  product: Product;
}

export const MobileProductGallery: React.FC<MobileProductGalleryProps> = ({ product }) => {
  const images = product.images && product.images.length > 0 ? product.images : ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextImage = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    if (info.offset.x < -40) {
      nextImage();
    } else if (info.offset.x > 40) {
      prevImage();
    }
  };

  return (
    <>
      <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-white border border-pahadi-sand shadow-pahadi-sm touch-pan-y">
        {/* Swipeable Container */}
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full h-full cursor-grab active:cursor-grabbing"
          >
            <Image
              src={images[currentIndex]}
              alt={`${product.name} Image ${currentIndex + 1}`}
              fill
              priority
              className="object-cover pointer-events-none"
            />
          </motion.div>
        </AnimatePresence>

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1 z-10 pointer-events-none">
          <span className="bg-pahadi-green text-pahadi-gold px-3 py-0.5 rounded-full text-[10px] font-bold uppercase shadow-sm">
            {product.altitude || '18,000 FT'}
          </span>
          {product.badge && (
            <span className="bg-pahadi-red text-white px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase shadow-sm">
              {product.badge}
            </span>
          )}
        </div>

        {/* Image Counter & Fullscreen Trigger */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
          <span className="bg-black/60 text-white backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="p-1.5 rounded-full bg-white/80 text-pahadi-charcoal hover:bg-white backdrop-blur-md shadow"
            title="Fullscreen Zoom"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Navigation Arrows for accessibility */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 text-pahadi-green shadow hover:bg-white z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 text-pahadi-green shadow hover:bg-white z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Pagination Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 z-10 flex items-center justify-center gap-1.5 pointer-events-none">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  currentIndex === i ? 'w-5 bg-pahadi-gold' : 'w-1.5 bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Zoom Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 text-white hover:bg-white/20 rounded-full z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative w-full max-w-xl aspect-square">
            <Image
              src={images[currentIndex]}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

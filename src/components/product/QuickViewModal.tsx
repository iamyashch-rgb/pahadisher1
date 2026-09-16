'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShieldCheck, MapPin, Plus, Minus, ShoppingBag, Award } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  if (!product) return null;

  const variants = product.variants || [];
  const currentVariant = variants[selectedVariantIndex] || null;
  const displayPrice = currentVariant ? currentVariant.price : product.price;
  const displayOriginalPrice = currentVariant ? currentVariant.originalPrice : product.originalPrice;
  const isVariantInStock = currentVariant ? currentVariant.inStock : product.inStock;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-pahadi-charcoal/75 backdrop-blur-sm"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative bg-pahadi-offwhite w-full max-w-3xl rounded-sm shadow-2xl border border-pahadi-border overflow-hidden z-10 my-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-pahadi-charcoal hover:bg-pahadi-paper rounded-sm z-20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Gallery Column */}
            <div className="space-y-3">
              <div className="aspect-square relative rounded-sm overflow-hidden border border-pahadi-border bg-white shadow-pahadi-sm">
                <Image
                  src={product.images[selectedImage] || product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {product.images.length > 1 && (
                <div className="flex space-x-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative w-16 h-16 rounded-sm overflow-hidden border-2 ${
                        selectedImage === idx ? 'border-pahadi-green scale-105' : 'border-transparent opacity-70'
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Meta & Actions */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#B85D3B]">
                  {product.categoryName} • {product.origin}
                </span>

                <h3 className="font-serif text-2xl font-bold text-[#1B3626] mt-1">
                  {product.name}
                </h3>

                <p className="text-xs text-[#455248] mt-2 leading-relaxed">
                  {product.subtitle}
                </p>

                {/* Rating */}
                <div className="flex items-center space-x-2 mt-3">
                  <div className="flex text-[#D49B35]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#1B3626]">{product.rating}</span>
                  <span className="text-xs text-[#455248]">({product.reviewsCount} reviews)</span>
                </div>

                {/* Price Tag */}
                <div className="flex items-baseline space-x-3 mt-4">
                  <span className="font-sans text-2xl font-bold text-[#1B3626]">
                    ₹{displayPrice}
                  </span>
                  {displayOriginalPrice > displayPrice && (
                    <span className="line-through text-sm text-[#6E7A71] font-medium">
                      ₹{displayOriginalPrice}
                    </span>
                  )}
                  <span className="bg-[#B85D3B]/10 text-[#B85D3B] px-2.5 py-0.5 rounded-full text-xs font-bold">
                    Save {Math.round(((displayOriginalPrice - displayPrice) / displayOriginalPrice) * 100)}%
                  </span>
                </div>

                {/* Variant Switcher Pills */}
                {variants.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#664936] block">
                      Package Size:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {variants.map((v, idx) => (
                        <button
                          key={v.id || idx}
                          onClick={() => setSelectedVariantIndex(idx)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition border ${
                            selectedVariantIndex === idx
                              ? 'bg-[#1B3626] text-[#FAF6F0] border-[#1B3626] shadow-xs'
                              : 'bg-white text-[#1C241E] border-[#E5DFC9] hover:border-[#1B3626]'
                          }`}
                        >
                          {v.name} (₹{v.price})
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-[#E5DFC9]/70 space-y-2 text-xs text-[#1C241E]">
                  {(product.category === 'shilajit' || product.categoryName?.toLowerCase().includes('shilajit') || product.name.toLowerCase().includes('shilajit') || product.id.toLowerCase().includes('shilajit')) && (
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-[#D49B35]" />
                      <span>Lab Certificate: <strong className="font-mono text-[#1B3626]">{product.labCertificateNo || 'PAH-2026-881'}</strong></span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-[#664936]" />
                    <span>Origin: <strong>{product.origin}</strong></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-[#1B3626]" />
                    <span>Net Weight: <strong>{currentVariant ? currentVariant.name : product.netQuantity}</strong></span>
                  </div>
                </div>
              </div>

              {/* Quantity Selector & Add Button */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-semibold uppercase text-[#664936]">Qty:</span>
                  <div className="flex items-center border border-[#E5DFC9] rounded-full bg-white px-3 py-1.5 space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-[#1C241E] hover:text-[#B85D3B]"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-bold text-[#1B3626] w-6 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-[#1C241E] hover:text-[#1B3626]"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (!isVariantInStock) return;
                    addToCart(product, quantity, currentVariant || undefined);
                    onClose();
                  }}
                  disabled={!isVariantInStock}
                  className={`w-full py-3.5 rounded-full text-xs uppercase font-bold tracking-widest flex items-center justify-center space-x-2 shadow-md transition-all ${
                    !isVariantInStock
                      ? 'bg-[#EAE4D8] text-[#6E7A71] cursor-not-allowed'
                      : 'bg-[#1B3626] text-[#FAF6F0] hover:bg-[#274A36]'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 text-[#D49B35]" />
                  <span>{!isVariantInStock ? 'Sold Out' : `Add ${quantity} to Basket • ₹${displayPrice * quantity}`}</span>
                </button>

                <div className="text-center">
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="text-xs text-[#664936] font-semibold hover:underline"
                  >
                    View Full Product Details & Benefits →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

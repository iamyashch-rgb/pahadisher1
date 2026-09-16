'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { QuickViewModal } from './QuickViewModal';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'minimal';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, variant = 'minimal' }) => {
  const { addToCart } = useCart();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 800);
  };

  // Badge Styling mapping
  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case 'BESTSELLER':
        return 'bg-[#1B3626] text-[#D49B35] border border-[#D49B35]/30';
      case 'SALE':
        return 'bg-[#B85D3B] text-white';
      case 'NEW':
        return 'bg-[#D49B35] text-[#1B3626] font-bold';
      case 'SOLD OUT':
        return 'bg-[#1C241E] text-white';
      default:
        return 'bg-[#1B3626] text-white';
    }
  };

  if (variant === 'minimal') {
    return (
      <>
        <div className="group bg-white rounded-2xl border-2 border-[#E5B869] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between relative h-full">
          {/* Top Image Container */}
          <Link href={`/products/${product.slug}`} className="block relative aspect-square w-full overflow-hidden bg-white">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            {product.images[1] && (
              <Image
                src={product.images[1]}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
              />
            )}
          </Link>

          {/* Clean Description Box: Name, Price & Add to Cart */}
          <div className="bg-[#FAF6F0] p-4 sm:p-5 border-t border-[#E5B869]/40 flex-1 flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <Link href={`/products/${product.slug}`} className="block">
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#1B3626] group-hover:text-[#B85D3B] transition-colors line-clamp-1">
                  {product.name}
                </h3>
              </Link>
              <div className="text-xs sm:text-sm font-semibold text-[#455248]">
                Rs. {product.price.toLocaleString('en-IN')}.00 INR
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock || isAdding}
              className={`w-full py-2 px-3 rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all duration-200 ${
                !product.inStock
                  ? 'bg-[#EAE4D8] text-[#6E7A71] cursor-not-allowed border border-[#E5DFC9]'
                  : isAdding
                  ? 'bg-[#D49B35] text-[#1B3626] shadow-sm'
                  : 'bg-[#1B3626] text-[#FAF6F0] hover:bg-[#274A36] shadow-sm'
              }`}
            >
              <ShoppingBag className={`w-3.5 h-3.5 ${isAdding ? 'text-[#1B3626]' : 'text-[#D49B35]'}`} />
              <span>{!product.inStock ? 'Out of Stock' : isAdding ? 'Added!' : 'Add to Cart'}</span>
            </button>
          </div>
        </div>

        {quickViewOpen && (
          <QuickViewModal
            product={product}
            onClose={() => setQuickViewOpen(false)}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className="group bg-white rounded-sm border border-[#E5DFC9] overflow-hidden shadow-sm hover:shadow-kumaon-card hover:border-[#D49B35] transform hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between relative h-full">
        {/* Top Image Container */}
        <div className="relative aspect-square w-full overflow-hidden bg-[#FAF6F0] border-b border-[#E5DFC9]/80">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Secondary Hover Image Crossfade */}
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
            />
          )}

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 flex flex-col space-y-1 z-10">
            {!product.inStock || product.status === 'Out of Stock' ? (
              <span className="bg-[#1C241E] text-white px-2.5 py-0.5 rounded-sm text-[9.5px] font-sans font-bold uppercase tracking-wider shadow-sm">
                SOLD OUT
              </span>
            ) : product.status === 'Low Stock' || (product.availableQuantity !== undefined && product.availableQuantity <= (product.lowStockThreshold || 5)) ? (
              <span className="bg-[#B85D3B] text-white px-2.5 py-0.5 rounded-sm text-[9.5px] font-sans font-bold uppercase tracking-wider shadow-sm animate-pulse">
                ⚠️ ONLY {product.availableQuantity || product.stockQuantity} LEFT
              </span>
            ) : product.badge ? (
              <span className={`px-2.5 py-0.5 rounded-sm text-[9.5px] font-sans font-bold uppercase tracking-wider shadow-sm ${getBadgeStyle(product.badge)}`}>
                {product.badge}
              </span>
            ) : null}
          </div>

          {/* Top Right QuickView Action */}
          <div className="absolute top-2.5 right-2.5 z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQuickViewOpen(true);
              }}
              className="p-1.5 sm:p-2 rounded-sm bg-white/90 text-[#1C241E] hover:bg-white backdrop-blur-md transition-all shadow-sm opacity-0 group-hover:opacity-100 hidden sm:block"
              title="Quick View"
            >
              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
          <div className="space-y-1">
            {/* Origin & Availability */}
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#664936] font-medium">
              <span className="truncate max-w-[110px]">{product.origin}</span>
              <span className="flex items-center space-x-1">
                <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-[#1B3626]' : 'bg-[#B85D3B]'}`} />
                <span className={product.inStock ? 'text-[#1B3626] font-semibold' : 'text-[#B85D3B] font-semibold'}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </span>
            </div>

            {/* Title */}
            <Link href={`/products/${product.slug}`} className="block">
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#1B3626] group-hover:text-[#B85D3B] transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>

            {/* Short Description */}
            <p className="text-[11px] sm:text-xs text-[#455248] line-clamp-2 font-sans font-normal leading-relaxed">
              {product.subtitle}
            </p>
          </div>

          {/* Rating & Review Count */}
          <div className="flex items-center justify-between pt-1 text-[11px] sm:text-xs">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#D49B35] text-[#D49B35]" />
              <span className="font-bold text-[#1B3626]">{product.rating}</span>
              <span className="text-[#6E7A71] text-[10px]">({product.reviewsCount})</span>
            </div>

            <span className="text-[9px] sm:text-[10px] text-[#664936] font-semibold uppercase bg-[#EAE4D8]/50 px-2 py-0.5 rounded-sm whitespace-nowrap truncate max-w-[120px]">
              {product.netQuantity}
            </span>
          </div>

          {/* Price & Full Width Add to Cart Button */}
          <div className="pt-2.5 border-t border-[#E5DFC9]/70 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline space-x-1.5">
                <span className="font-sans text-base sm:text-lg font-bold text-[#1B3626]">
                  ₹{product.price}
                </span>
                <span className="line-through text-[10px] sm:text-xs text-[#6E7A71] font-normal">
                  ₹{product.originalPrice}
                </span>
              </div>
              <span className="text-[9.5px] sm:text-[10px] text-[#B85D3B] font-bold bg-[#B85D3B]/10 px-1.5 py-0.5 rounded-sm">
                {product.discountPercent}% OFF
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock || isAdding}
              className={`w-full py-2 sm:py-2.5 px-3 rounded-sm text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all duration-200 active-press ${
                !product.inStock
                  ? 'bg-[#EAE4D8] text-[#6E7A71] cursor-not-allowed border border-[#E5DFC9]'
                  : isAdding
                  ? 'bg-[#D49B35] text-[#1B3626] shadow-sm'
                  : 'bg-[#1B3626] text-[#FAF6F0] hover:bg-[#274A36] shadow-sm'
              }`}
            >
              <ShoppingBag className={`w-3.5 h-3.5 ${isAdding ? 'text-[#1B3626]' : 'text-[#D49B35]'}`} />
              <span>{!product.inStock ? 'Out of Stock' : isAdding ? 'Added!' : 'Add to Cart'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewOpen && (
        <QuickViewModal
          product={product}
          onClose={() => setQuickViewOpen(false)}
        />
      )}
    </>
  );
};

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, ShoppingBag, Trash2, ArrowRight, Star, 
  ShieldCheck, AlertCircle, Sparkles, RefreshCw, ChevronDown, Check 
} from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useProducts } from '@/context/AdminContext';
import { ProductVariant } from '@/types';

export default function WishlistPage() {
  const products = useProducts();
  const {
    wishlistItems,
    removeFromWishlist,
    moveToCart,
    moveAllToCart,
    clearWishlist,
    toggleWishlist,
    wishlistCount,
    hydrated
  } = useWishlist();

  // Selected variant state per product in wishlist
  const [selectedVariants, setSelectedVariants] = useState<Record<string, ProductVariant>>({});
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleSelectVariant = (productId: string, variant: ProductVariant) => {
    setSelectedVariants(prev => ({
      ...prev,
      [productId]: variant
    }));
  };

  const handleLoadSampleWishlist = () => {
    const p1 = products[0]; // Shilajit
    const p2 = products[1]; // Pure Cow Ghee
    const p3 = products[3]; // Buransh Tea
    if (p1 && !wishlistItems.some(item => item.id === p1.id)) toggleWishlist(p1.id);
    if (p2 && !wishlistItems.some(item => item.id === p2.id)) toggleWishlist(p2.id);
    if (p3 && !wishlistItems.some(item => item.id === p3.id)) toggleWishlist(p3.id);
  };

  const inStockCount = wishlistItems.filter(p => p.inStock).length;

  return (
    <div className="py-12 sm:py-16 bg-pahadi-offwhite min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header Title & Bulk Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-pahadi-green">
                Your Saved Favorites
              </h1>
              <span className="bg-pahadi-gold text-pahadi-green-dark font-sans font-bold text-xs px-3 py-1 rounded-full shadow-xs">
                {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <p className="text-xs text-pahadi-brown font-sans font-medium mt-1">
              Save your favorite authentic Himalayan essentials and move them to your basket whenever you are ready.
            </p>
          </div>

          {wishlistCount > 0 && (
            <div className="flex items-center space-x-3">
              {inStockCount > 0 && (
                <button
                  onClick={moveAllToCart}
                  className="bg-pahadi-green text-pahadi-gold hover:bg-pahadi-green-light px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-pahadi-sm flex items-center space-x-1.5"
                >
                  <ShoppingBag className="w-4 h-4 text-pahadi-gold" />
                  <span>Move All In-Stock ({inStockCount}) to Cart</span>
                </button>
              )}

              <div className="relative">
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="bg-pahadi-paper border border-pahadi-sand text-pahadi-red hover:bg-pahadi-red hover:text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Clear Wishlist</span>
                </button>

                {showClearConfirm && (
                  <div className="absolute right-0 top-12 z-20 bg-white border border-pahadi-red p-4 rounded-2xl shadow-xl w-64 space-y-3">
                    <div className="flex items-start space-x-2 text-pahadi-red text-xs font-semibold">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>Remove all items from your wishlist?</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          clearWishlist();
                          setShowClearConfirm(false);
                        }}
                        className="flex-1 bg-pahadi-red text-white py-1.5 rounded-lg text-xs font-bold hover:bg-red-700"
                      >
                        Yes, Clear
                      </button>
                      <button
                        onClick={() => setShowClearConfirm(false)}
                        className="flex-1 bg-pahadi-sand text-pahadi-charcoal py-1.5 rounded-lg text-xs font-bold hover:bg-pahadi-border"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        {!hydrated ? (
          <div className="py-20 text-center text-xs text-pahadi-charcoal-muted">
            Loading your saved wishlist...
          </div>
        ) : wishlistCount === 0 ? (
          /* Beautiful Empty Wishlist State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-pahadi-paper p-10 sm:p-16 rounded-3xl border border-pahadi-border text-center space-y-6 max-w-xl mx-auto my-8 shadow-pahadi-md relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-pahadi-gold/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-pahadi-green/10 rounded-full blur-2xl pointer-events-none" />

            <div className="w-24 h-24 bg-gradient-to-b from-red-50 to-pahadi-paper rounded-full flex items-center justify-center mx-auto text-pahadi-red border border-red-200/80 shadow-inner relative group">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              >
                <Heart className="w-12 h-12 fill-pahadi-red text-pahadi-red stroke-[1.5]" />
              </motion.div>
            </div>

            <div className="space-y-2">
              <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-pahadi-green">
                Your Wishlist is Empty
              </h3>
              <p className="text-xs sm:text-sm text-pahadi-charcoal-muted max-w-md mx-auto leading-relaxed font-sans font-light">
                Explore our pure Himalayan collection. Tap the heart icon on any item to save it for later!
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/products"
                className="w-full sm:w-auto bg-pahadi-green text-pahadi-gold px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-pahadi-md hover:bg-pahadi-green-light transition-all"
              >
                Explore Catalogue
              </Link>
              <button
                onClick={handleLoadSampleWishlist}
                className="w-full sm:w-auto bg-pahadi-sand text-pahadi-green px-6 py-3.5 rounded-full text-xs font-bold flex items-center justify-center space-x-1.5 hover:bg-pahadi-gold/30 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Pre-fill Sample Favorites</span>
              </button>
            </div>

            {/* Trust Footer */}
            <div className="pt-4 border-t border-pahadi-sand/60 flex items-center justify-center space-x-2 text-[11px] text-pahadi-brown">
              <ShieldCheck className="w-4 h-4 text-pahadi-gold" />
              <span>Direct High-Altitude Village Harvest • NABL Certified Purity</span>
            </div>
          </motion.div>
        ) : (
          /* Grid of Wishlist Items */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {wishlistItems.map((product) => {
                const hasVariants = product.variants && product.variants.length > 0;
                const activeVariant = selectedVariants[product.id] || (hasVariants ? product.variants![0] : undefined);
                const displayPrice = activeVariant ? activeVariant.price : product.price;
                const displayOriginalPrice = activeVariant ? activeVariant.originalPrice : product.originalPrice;
                const isItemInStock = activeVariant ? activeVariant.inStock : product.inStock;

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="bg-pahadi-paper rounded-3xl border border-pahadi-border overflow-hidden shadow-pahadi-sm hover:shadow-pahadi-md transition-all duration-300 flex flex-col justify-between relative group"
                  >
                    {/* Top Image Container */}
                    <div className="relative aspect-square w-full bg-white overflow-hidden">
                      <Image
                        src={activeVariant?.image || product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Badge Overlay */}
                      <div className="absolute top-3 left-3 flex flex-col space-y-1 z-10">
                        {!isItemInStock ? (
                          <span className="bg-pahadi-charcoal text-white px-2.5 py-1 rounded-md text-[9px] font-sans font-bold uppercase tracking-wider shadow-md">
                            SOLD OUT
                          </span>
                        ) : product.badge ? (
                          <span className="bg-pahadi-green text-pahadi-gold px-2.5 py-1 rounded-md text-[9px] font-sans font-bold uppercase tracking-wider shadow-md">
                            {product.badge}
                          </span>
                        ) : null}

                        <span className="bg-pahadi-green/90 backdrop-blur-md text-white px-2 py-0.5 rounded text-[9px] font-sans font-medium uppercase shadow-xs">
                          {product.altitude}
                        </span>
                      </div>

                      {/* Remove Button Icon */}
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="absolute top-3 right-3 p-2 bg-white/90 text-pahadi-charcoal hover:bg-pahadi-red hover:text-white rounded-full backdrop-blur-md transition-colors shadow-md z-10"
                        title="Remove from Wishlist"
                      >
                        <Trash2 className="w-4 h-4 stroke-[1.8]" />
                      </button>
                    </div>

                    {/* Content Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1.5">
                        {/* Rating & Availability */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3.5 h-3.5 fill-pahadi-gold text-pahadi-gold" />
                            <span className="font-bold text-pahadi-green">{product.rating}</span>
                            <span className="text-pahadi-charcoal-light text-[10px]">({product.reviewsCount})</span>
                          </div>

                          <span className="flex items-center space-x-1 text-[11px] font-semibold">
                            <span className={`w-2 h-2 rounded-full ${isItemInStock ? 'bg-emerald-500' : 'bg-pahadi-red'}`} />
                            <span className={isItemInStock ? 'text-emerald-700' : 'text-pahadi-red'}>
                              {isItemInStock ? 'In Stock' : 'Sold Out'}
                            </span>
                          </span>
                        </div>

                        {/* Title */}
                        <Link href={`/products/${product.slug}`} className="block">
                          <h3 className="font-playfair text-base font-bold text-pahadi-green group-hover:text-pahadi-brown transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                        </Link>

                        <p className="text-xs text-pahadi-charcoal-muted line-clamp-2 font-sans font-light">
                          {product.subtitle}
                        </p>
                      </div>

                      {/* Variant Selector (if product has variants) */}
                      {hasVariants && (
                        <div className="pt-1">
                          <label className="text-[10px] font-bold uppercase text-pahadi-brown block mb-1">
                            Select Variant:
                          </label>
                          <div className="relative">
                            <select
                              value={activeVariant?.id || ''}
                              onChange={(e) => {
                                const v = product.variants?.find(varItem => varItem.id === e.target.value);
                                if (v) handleSelectVariant(product.id, v);
                              }}
                              className="w-full bg-white border border-pahadi-sand text-pahadi-green font-sans text-xs rounded-xl pl-3 pr-7 py-2 focus:ring-1 focus:ring-pahadi-green appearance-none cursor-pointer"
                            >
                              {product.variants?.map(v => (
                                <option key={v.id} value={v.id} disabled={!v.inStock}>
                                  {v.name} - ₹{v.price} {!v.inStock ? '(Out of Stock)' : ''}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="w-3.5 h-3.5 text-pahadi-brown absolute right-2.5 top-3 pointer-events-none" />
                          </div>
                        </div>
                      )}

                      {/* Price & Action Button */}
                      <div className="pt-3 border-t border-pahadi-sand/60 flex items-center justify-between gap-2">
                        <div>
                          <div className="flex items-baseline space-x-1.5">
                            <span className="font-sans text-base font-bold text-pahadi-green">
                              ₹{displayPrice}
                            </span>
                            <span className="line-through text-xs text-pahadi-charcoal-light">
                              ₹{displayOriginalPrice}
                            </span>
                          </div>
                          <span className="text-[10px] text-pahadi-red font-semibold block">
                            {product.discountPercent}% OFF
                          </span>
                        </div>

                        <button
                          onClick={() => moveToCart(product, activeVariant)}
                          disabled={!isItemInStock}
                          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-xs shrink-0 ${
                            !isItemInStock
                              ? 'bg-pahadi-sand text-pahadi-charcoal-light cursor-not-allowed border border-pahadi-border'
                              : 'bg-pahadi-green text-pahadi-gold hover:bg-pahadi-green-light'
                          }`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-pahadi-gold" />
                          <span>{!isItemInStock ? 'Sold Out' : 'Move to Cart'}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

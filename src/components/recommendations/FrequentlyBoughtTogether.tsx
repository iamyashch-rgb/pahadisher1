'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Check, ShoppingBag, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import { Product } from '@/types';
import { FrequentlyBoughtBundle } from '@/utils/recommendations';
import { useCart } from '@/context/CartContext';

interface FrequentlyBoughtTogetherProps {
  bundle: FrequentlyBoughtBundle;
}

export const FrequentlyBoughtTogether: React.FC<FrequentlyBoughtTogetherProps> = ({ bundle }) => {
  const { addToCart } = useCart();
  const { mainProduct, companionProduct, bundleSubtotal, bundlePrice, savings } = bundle;

  const [includeMain, setIncludeMain] = useState(true);
  const [includeCompanion, setIncludeCompanion] = useState(true);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const selectedCount = (includeMain ? 1 : 0) + (includeCompanion ? 1 : 0);
  
  // Calculate current price based on checkbox selections
  const currentSubtotal = (includeMain ? mainProduct.price : 0) + (includeCompanion ? companionProduct.price : 0);
  const applyDiscount = includeMain && includeCompanion;
  const finalPrice = applyDiscount ? bundlePrice : currentSubtotal;
  const currentSavings = applyDiscount ? savings : 0;

  const handleAddBundleToCart = () => {
    if (includeMain) addToCart(mainProduct, 1);
    if (includeCompanion) addToCart(companionProduct, 1);

    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  return (
    <div className="bg-pahadi-paper p-6 sm:p-8 rounded-3xl border-2 border-pahadi-gold/60 shadow-pahadi-md space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-pahadi-sand pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-pahadi-brown flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pahadi-gold" />
            <span>Ayurvedic Synergistic Pair</span>
          </span>
          <h3 className="font-playfair text-xl sm:text-2xl font-bold text-pahadi-green">
            Frequently Bought Together
          </h3>
        </div>

        <div className="inline-flex items-center gap-1.5 bg-pahadi-red/10 text-pahadi-red border border-pahadi-red/30 px-3 py-1 rounded-full text-xs font-bold font-sans">
          <Tag className="w-3.5 h-3.5" />
          <span>Save 10% Extra On Bundle</span>
        </div>
      </div>

      {/* Product Cards Stack */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Main Product Card */}
        <div className={`flex-1 flex items-center gap-4 p-4 rounded-2xl border transition-all ${
          includeMain ? 'bg-white border-pahadi-green shadow-sm' : 'bg-pahadi-sand/20 border-pahadi-sand opacity-60'
        }`}>
          <button
            onClick={() => setIncludeMain(!includeMain)}
            className={`w-5 h-5 rounded flex items-center justify-center border transition shrink-0 ${
              includeMain ? 'bg-pahadi-green border-pahadi-green text-pahadi-gold' : 'border-pahadi-charcoal-light bg-white'
            }`}
          >
            {includeMain && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </button>

          <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-pahadi-sand">
            <Image src={mainProduct.images[0]} alt={mainProduct.name} fill className="object-cover" />
          </div>

          <div className="min-w-0">
            <span className="text-[9px] uppercase font-bold text-pahadi-brown block font-mono">This Item</span>
            <h4 className="font-playfair text-sm font-bold text-pahadi-green truncate">{mainProduct.name}</h4>
            <span className="font-sans font-bold text-xs text-pahadi-green">₹{mainProduct.price}</span>
          </div>
        </div>

        {/* Plus Divider Icon */}
        <div className="w-8 h-8 rounded-full bg-pahadi-gold text-pahadi-green-dark flex items-center justify-center shrink-0 shadow-sm font-bold">
          <Plus className="w-4 h-4 stroke-[3]" />
        </div>

        {/* Companion Product Card */}
        <div className={`flex-1 flex items-center gap-4 p-4 rounded-2xl border transition-all ${
          includeCompanion ? 'bg-white border-pahadi-green shadow-sm' : 'bg-pahadi-sand/20 border-pahadi-sand opacity-60'
        }`}>
          <button
            onClick={() => setIncludeCompanion(!includeCompanion)}
            className={`w-5 h-5 rounded flex items-center justify-center border transition shrink-0 ${
              includeCompanion ? 'bg-pahadi-green border-pahadi-green text-pahadi-gold' : 'border-pahadi-charcoal-light bg-white'
            }`}
          >
            {includeCompanion && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </button>

          <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-pahadi-sand">
            <Image src={companionProduct.images[0]} alt={companionProduct.name} fill className="object-cover" />
          </div>

          <div className="min-w-0">
            <span className="text-[9px] uppercase font-bold text-pahadi-gold font-mono block">Recommended Pair</span>
            <h4 className="font-playfair text-sm font-bold text-pahadi-green truncate">{companionProduct.name}</h4>
            <span className="font-sans font-bold text-xs text-pahadi-green">₹{companionProduct.price}</span>
          </div>
        </div>
      </div>

      {/* Bundle Total & CTA */}
      <div className="pt-4 border-t border-pahadi-sand flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-pahadi-brown font-bold uppercase">Total Price ({selectedCount} items):</span>
            <span className="font-sans text-2xl font-bold text-pahadi-green">₹{finalPrice}</span>
            {applyDiscount && (
              <span className="line-through text-xs text-pahadi-charcoal-light font-medium">₹{bundleSubtotal}</span>
            )}
          </div>

          {currentSavings > 0 && (
            <span className="text-xs text-pahadi-red font-bold block">
              🎉 Instant 10% Bundle Discount Applied! You Save ₹{currentSavings}
            </span>
          )}
        </div>

        <button
          onClick={handleAddBundleToCart}
          disabled={selectedCount === 0}
          className={`px-8 py-3.5 rounded-xl text-xs uppercase font-bold tracking-widest flex items-center space-x-2 transition-all shadow-pahadi-gold ${
            addedSuccess
              ? 'bg-emerald-700 text-white'
              : selectedCount === 0
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
              : 'bg-pahadi-green text-pahadi-gold hover:bg-pahadi-green-light'
          }`}
        >
          {addedSuccess ? (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>Bundle Added to Cart!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Add Selected ({selectedCount}) To Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

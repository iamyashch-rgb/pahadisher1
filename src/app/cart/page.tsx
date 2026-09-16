'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Trash2, ArrowRight, ShieldCheck, Tag, Sparkles, 
  Plus, Minus, Check, ChevronDown, RefreshCw, AlertTriangle 
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/context/AdminContext';
import { coupons } from '@/data/coupons';
import { ProductRecommendationsSection } from '@/components/recommendations/ProductRecommendationsSection';

export default function CartPage() {
  const products = useProducts();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    changeVariant,
    clearCart,
    subtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    totalPrice,
    amountNeededForFreeShipping,
    freeShippingThreshold,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    addToCart,
    hydrated
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ success: boolean; text: string } | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleApply = (code: string) => {
    const res = applyCoupon(code);
    setCouponMsg({ success: res.success, text: res.message });
    if (res.success) setCouponInput('');
  };

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleLoadSampleCart = () => {
    const p1 = products[0];
    const p2 = products[1];
    if (p1) addToCart(p1, 1, p1.variants?.[1]);
    if (p2) addToCart(p2, 1, p2.variants?.[0]);
  };

  return (
    <div className="py-12 sm:py-16 bg-pahadi-offwhite min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-pahadi-green">
              Your Himalayan Basket
            </h1>
            <p className="text-xs text-pahadi-brown font-sans font-medium mt-1">
              Review items, customize quantities & variants, or enter a promo code before checkout.
            </p>
          </div>

          {cart.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setShowClearConfirm(true)}
                className="bg-pahadi-paper border border-pahadi-sand text-pahadi-red hover:bg-pahadi-red hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-xs"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear Cart</span>
              </button>

              {showClearConfirm && (
                <div className="absolute right-0 top-12 z-20 bg-white border border-pahadi-red p-4 rounded-2xl shadow-xl w-64 space-y-3">
                  <div className="flex items-start space-x-2 text-pahadi-red text-xs font-semibold">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>Clear all items from your shopping basket?</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        clearCart();
                        setShowClearConfirm(false);
                      }}
                      className="flex-1 bg-pahadi-red text-white py-1.5 rounded-lg text-xs font-bold hover:bg-red-700"
                    >
                      Clear
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
          )}
        </div>

        {!hydrated ? (
          <div className="py-20 text-center text-xs text-pahadi-charcoal-muted">
            Loading your basket state...
          </div>
        ) : cart.length === 0 ? (
          <div className="bg-pahadi-paper p-10 sm:p-16 rounded-3xl border border-pahadi-border text-center space-y-5 max-w-lg mx-auto my-8 shadow-pahadi-sm">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto text-pahadi-brown border border-pahadi-sand shadow-inner">
              <ShoppingBag className="w-10 h-10 stroke-[1.4]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-playfair text-2xl font-bold text-pahadi-green">
                Your Basket is Currently Empty
              </h3>
              <p className="text-xs text-pahadi-charcoal-muted font-sans leading-relaxed">
                Explore our 100% authentic Shilajit, Pure Cow Ghee, and Himalayan honeys.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/products"
                className="w-full sm:w-auto bg-pahadi-green text-pahadi-gold px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-pahadi-md hover:bg-pahadi-green-light transition-all"
              >
                Explore Products
              </Link>
              <button
                onClick={handleLoadSampleCart}
                className="w-full sm:w-auto bg-pahadi-sand text-pahadi-green px-6 py-3 rounded-full text-xs font-bold flex items-center justify-center space-x-1.5 hover:bg-pahadi-gold/30 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Add Sample Cart Items</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Cart Items List */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free Shipping Progress Ticker */}
              <div className="bg-pahadi-green text-pahadi-offwhite p-4 sm:p-5 rounded-3xl border border-pahadi-gold/40 text-xs shadow-md">
                {amountNeededForFreeShipping > 0 ? (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center font-sans">
                      <span>
                        Add <strong className="text-pahadi-gold font-bold">₹{amountNeededForFreeShipping}</strong> more to qualify for <strong className="underline">FREE Express Shipping</strong>!
                      </span>
                      <span className="font-mono text-pahadi-gold font-bold">{progressPercent}%</span>
                    </div>
                    <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden p-0.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-r from-pahadi-gold-light to-pahadi-gold h-full rounded-full"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-pahadi-gold font-bold text-sm">
                    <Sparkles className="w-5 h-5 shrink-0 animate-bounce text-amber-300" />
                    <span>You earned FREE Himalayan Express Delivery across India! 🎉</span>
                  </div>
                )}
              </div>

              {/* Items Table Card */}
              <div className="bg-pahadi-paper rounded-3xl border border-pahadi-border divide-y divide-pahadi-sand overflow-hidden shadow-pahadi-sm">
                <AnimatePresence mode="popLayout">
                  {cart.map(({ product, quantity, selectedVariant }) => {
                    const displayPrice = selectedVariant ? selectedVariant.price : product.price;
                    const displayImage = selectedVariant?.image || product.images[0];
                    const itemSubtotal = displayPrice * quantity;
                    const hasVariants = product.variants && product.variants.length > 0;
                    const itemKey = `${product.id}-${selectedVariant?.id || 'default'}`;

                    return (
                      <motion.div
                        key={itemKey}
                        layout
                        initial={{ opacity: 0, height: 0, scale: 0.96 }}
                        animate={{ opacity: 1, height: 'auto', scale: 1 }}
                        exit={{ opacity: 0, height: 0, scale: 0.9, transition: { duration: 0.25 } }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                      >
                        <div className="flex items-start sm:items-center space-x-4 min-w-0">
                          {/* Thumbnail */}
                          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden relative shrink-0 border border-pahadi-sand bg-white shadow-inner">
                            <Image
                              src={displayImage}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>

                          {/* Info & Variant Switcher */}
                          <div className="space-y-1">
                            <span className="text-[10px] font-sans font-bold uppercase text-pahadi-brown tracking-wider">
                              {product.altitude || product.categoryName}
                            </span>
                            <h3 className="font-playfair text-base sm:text-lg font-bold text-pahadi-green">
                              {product.name}
                            </h3>

                            {/* Direct Variant Change Dropdown */}
                            <div className="pt-1">
                              {hasVariants ? (
                                <div className="relative inline-block">
                                  <select
                                    value={selectedVariant?.id || ''}
                                    onChange={(e) => {
                                      const newVar = product.variants?.find(v => v.id === e.target.value);
                                      if (newVar) {
                                        changeVariant(product.id, selectedVariant?.id, newVar);
                                      }
                                    }}
                                    className="bg-white border border-pahadi-sand text-pahadi-green font-sans font-medium text-xs rounded-xl pl-3 pr-7 py-1.5 focus:outline-none focus:ring-1 focus:ring-pahadi-green cursor-pointer appearance-none shadow-xs"
                                  >
                                    {product.variants?.map(v => (
                                      <option key={v.id} value={v.id} disabled={!v.inStock}>
                                        Variant: {v.name} (₹{v.price}) {!v.inStock ? '- Sold Out' : ''}
                                      </option>
                                    ))}
                                  </select>
                                  <ChevronDown className="w-3.5 h-3.5 text-pahadi-brown absolute right-2 top-2.5 pointer-events-none" />
                                </div>
                              ) : (
                                <span className="text-xs text-pahadi-charcoal-muted">
                                  {product.netQuantity} • ₹{displayPrice} each
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Quantity, Item Total & Remove */}
                        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-4 sm:space-x-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-pahadi-sand/50">
                          {/* Qty Controls */}
                          <div className="flex items-center border border-pahadi-border rounded-xl bg-white px-3 py-1.5 space-x-3 shadow-xs">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1, selectedVariant?.id)}
                              className="text-pahadi-charcoal hover:text-pahadi-red transition-colors"
                              title="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-bold text-pahadi-green w-5 text-center font-sans">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1, selectedVariant?.id)}
                              className="text-pahadi-charcoal hover:text-pahadi-green transition-colors"
                              title="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Item Subtotal */}
                          <div className="text-right w-24">
                            <span className="font-sans text-base sm:text-lg font-bold text-pahadi-green block">
                              ₹{itemSubtotal}
                            </span>
                            <span className="text-[10px] text-pahadi-charcoal-muted font-normal block">
                              (₹{displayPrice} x {quantity})
                            </span>
                          </div>

                          {/* Delete Action */}
                          <button
                            onClick={() => removeFromCart(product.id, selectedVariant?.id)}
                            className="p-2 text-pahadi-charcoal-light hover:text-pahadi-red hover:bg-pahadi-red/10 rounded-full transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4 stroke-[1.8]" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Coupons List Box */}
              <div className="bg-pahadi-paper p-6 rounded-3xl border border-pahadi-border space-y-4 shadow-pahadi-sm">
                <div className="flex items-center justify-between">
                  <h4 className="font-playfair text-base font-bold text-pahadi-green flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-pahadi-gold" />
                    <span>Available Himalayan Coupons</span>
                  </h4>
                  {appliedCoupon && (
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-bold text-pahadi-red hover:underline"
                    >
                      Remove ({appliedCoupon.code})
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {coupons.map((c) => {
                    const isApplied = appliedCoupon?.code === c.code;
                    return (
                      <div
                        key={c.code}
                        className={`p-3.5 rounded-2xl border flex flex-col justify-between transition-all ${
                          isApplied
                            ? 'bg-emerald-50 border-emerald-400 ring-1 ring-emerald-400'
                            : 'bg-white border-pahadi-sand hover:border-pahadi-gold/60'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-pahadi-green text-xs">{c.code}</span>
                            <span className="bg-pahadi-sand text-pahadi-brown text-[10px] font-bold px-2 py-0.5 rounded-md">
                              {c.discountPercent}% OFF
                            </span>
                          </div>
                          <p className="text-[10px] text-pahadi-charcoal-muted mt-1.5 leading-normal">
                            {c.description}
                          </p>
                        </div>
                        <button
                          onClick={() => handleApply(c.code)}
                          disabled={isApplied}
                          className={`mt-3 text-left text-[11px] font-bold ${
                            isApplied ? 'text-emerald-700' : 'text-pahadi-brown hover:underline'
                          }`}
                        >
                          {isApplied ? '✓ Code Applied' : 'Apply Code →'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="lg:col-span-4">
              <div className="bg-pahadi-paper p-6 sm:p-7 rounded-3xl border border-pahadi-border space-y-6 sticky top-24 shadow-pahadi-md">
                <h3 className="font-playfair text-xl font-bold text-pahadi-green border-b border-pahadi-sand pb-4">
                  Order Summary
                </h3>

                <div className="space-y-3 text-xs text-pahadi-charcoal">
                  <div className="flex justify-between">
                    <span className="text-pahadi-charcoal-muted">Items Subtotal</span>
                    <span className="font-bold font-sans">₹{subtotal}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span className="flex items-center space-x-1">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Discount ({appliedCoupon?.code})</span>
                      </span>
                      <span className="font-sans">-₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-pahadi-charcoal-muted">GST (5% Organic Tax)</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[10px]">
                      Included in Price (₹{taxAmount})
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-pahadi-charcoal-muted">Shipping Fee</span>
                    <span className="font-bold">
                      {shippingFee === 0 ? (
                        <strong className="text-emerald-700 uppercase font-bold">FREE</strong>
                      ) : (
                        `₹${shippingFee}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-lg font-playfair font-bold text-pahadi-green pt-3 border-t border-pahadi-sand">
                    <span>Grand Total</span>
                    <span className="font-sans">₹{totalPrice}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full bg-pahadi-green text-pahadi-gold py-4 rounded-2xl text-xs uppercase font-bold tracking-widest flex items-center justify-center space-x-2 hover:bg-pahadi-green-light transition-all shadow-pahadi-md active:scale-[0.98]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-pahadi-gold" />
                </Link>

                <div className="flex items-center justify-center space-x-2 text-[10px] text-pahadi-brown font-medium">
                  <ShieldCheck className="w-4 h-4 text-pahadi-gold shrink-0" />
                  <span>Razorpay Verified • 100% Himalayan Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Intelligent Cross-sell Recommendations */}
        <div className="pt-8">
          <ProductRecommendationsSection 
            type="bestsellers" 
            allProducts={products} 
            title="Customers Frequently Add These Items" 
            subtitle="Popular high-altitude items to complement your cart."
          />
        </div>
      </div>
    </div>
  );
}

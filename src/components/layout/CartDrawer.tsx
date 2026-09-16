'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, Sparkles, 
  Plus, Minus, RefreshCw, ChevronDown, Check, AlertTriangle 
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/context/AdminContext';
import { coupons } from '@/data/coupons';
import { ProductVariant } from '@/types';

export const CartDrawer = () => {
  const products = useProducts();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
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

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  // Pick an upsell item that is not in cart
  const upsellProduct = products.find(
    p => p.id === 'prod-buransh-tea-100g' && !cart.some(item => item.product.id === p.id)
  ) || products.find(p => !cart.some(item => item.product.id === p.id));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMsg({ success: res.success, text: res.message });
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleApplyQuickCoupon = (code: string) => {
    setCouponInput(code);
    const res = applyCoupon(code);
    setCouponMsg({ success: res.success, text: res.message });
  };

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  // Quick sample loader for easy testing
  const handleLoadSampleCart = () => {
    const p1 = products[0]; // Shilajit
    const p2 = products[1]; // Pure Cow Ghee
    if (p1) addToCart(p1, 1, p1.variants?.[1]); // 20g Jar
    if (p2) addToCart(p2, 1, p2.variants?.[0]); // 250ml Jar
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-pahadi-charcoal/70 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Slide Drawer from Right */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 240 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[440px] max-w-full bg-pahadi-offwhite z-50 shadow-2xl flex flex-col border-l border-pahadi-sand overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-[#E5DFC9] bg-[#F4EFE6] flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-[#1B3626] flex items-center justify-center text-[#D49B35]">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1B3626] leading-tight">
                    Your Organic Basket
                  </h3>
                  <span className="text-[11px] font-sans text-[#664936] font-medium">
                    {cart.reduce((a, b) => a + b.quantity, 0)} {cart.reduce((a, b) => a + b.quantity, 0) === 1 ? 'item' : 'items'} selected
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {cart.length > 0 && (
                  <button
                    onClick={() => setShowClearConfirm(true)}
                    className="text-[11px] font-sans text-[#B85D3B] hover:bg-[#B85D3B]/10 px-2.5 py-1 rounded-full transition-colors flex items-center space-x-1"
                    title="Clear all items from cart"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Clear</span>
                  </button>
                )}
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 text-[#1C241E] hover:bg-[#EAE4D8] rounded-full transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Clear Cart Confirmation Modal/Overlay */}
            <AnimatePresence>
              {showClearConfirm && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-[#B85D3B] text-white p-3.5 px-5 flex items-center justify-between text-xs border-b border-[#9C4B2B] shrink-0"
                >
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-200" />
                    <span>Clear all items from your basket?</span>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => {
                        clearCart();
                        setShowClearConfirm(false);
                      }}
                      className="bg-white text-[#B85D3B] px-3 py-1 rounded-full font-bold hover:bg-gray-100"
                    >
                      Yes, Clear
                    </button>
                    <button
                      onClick={() => setShowClearConfirm(false)}
                      className="bg-black/30 text-white px-2.5 py-1 rounded-full font-medium hover:bg-black/40"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-[#1B3626] text-[#FAF6F0] px-4 sm:px-5 py-3 text-xs shrink-0 shadow-inner">
              {amountNeededForFreeShipping > 0 ? (
                <div className="space-y-1.5">
                  <div className="flex justify-between font-sans text-[11px] font-medium">
                    <span>
                      Add <strong className="text-[#D49B35] font-bold">₹{amountNeededForFreeShipping}</strong> more for <strong className="underline decoration-[#D49B35]">FREE Shipping</strong>!
                    </span>
                    <span className="font-mono text-[#D49B35] font-bold">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="bg-gradient-to-r from-[#D49B35] to-[#F0CF7D] h-full rounded-full"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-[#D49B35] text-[11px] font-bold py-0.5">
                  <Sparkles className="w-4 h-4 shrink-0 animate-pulse text-amber-300" />
                  <span>Congratulations! You unlocked FREE Express Shipping Across India 🎉</span>
                </div>
              )}
            </div>

            {/* Cart Body - Scrollable Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {!hydrated ? (
                <div className="py-16 text-center text-xs text-[#455248]">
                  Loading basket details...
                </div>
              ) : cart.length === 0 ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-20 h-20 bg-[#F4EFE6] rounded-full flex items-center justify-center mx-auto text-[#664936] border border-[#E5DFC9]">
                    <ShoppingBag className="w-10 h-10 stroke-[1.4]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-2xl font-bold text-[#1B3626]">
                      Your Basket is Empty
                    </h4>
                    <p className="text-xs text-[#455248] max-w-xs mx-auto leading-relaxed">
                      Discover 100% pure Himalayan Shilajit, Pure Cow Ghee, and Raw Rhododendron Honey.
                    </p>
                  </div>
                  <div className="pt-2 space-y-2">
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="inline-block bg-[#1B3626] text-[#FAF6F0] px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold hover:bg-[#274A36] shadow-sm transition-all"
                    >
                      Explore Catalogue
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Cart Item Cards */}
                  <div className="space-y-3.5">
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
                            initial={{ opacity: 0, height: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, height: 'auto', scale: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0, scale: 0.9, y: -10, transition: { duration: 0.25 } }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="bg-white p-3.5 rounded-2xl border border-[#E5DFC9] shadow-sm relative space-y-3 group hover:border-[#B85D3B]/40 transition-colors overflow-hidden"
                          >
                            <div className="flex items-start space-x-3">
                              {/* Thumbnail */}
                              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden relative shrink-0 border border-[#E5DFC9] bg-white">
                                <Image
                                  src={displayImage}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>

                              {/* Title & Info */}
                              <div className="flex-1 min-w-0 pr-6">
                                <span className="text-[9px] font-sans font-bold uppercase text-[#B85D3B] tracking-wider block">
                                  {product.altitude || product.categoryName}
                                </span>
                                <h4 className="font-serif text-sm sm:text-base font-bold text-[#1B3626] truncate leading-tight">
                                  {product.name}
                                </h4>

                                {/* Variant Switcher */}
                                <div className="mt-1.5">
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
                                        className="bg-[#FAF6F0] border border-[#E5DFC9] text-[#1B3626] font-sans font-medium text-[11px] rounded-full pl-2.5 pr-6 py-1 focus:outline-none focus:ring-1 focus:ring-[#1B3626] cursor-pointer appearance-none shadow-xs"
                                      >
                                        {product.variants?.map(v => (
                                          <option key={v.id} value={v.id} disabled={!v.inStock}>
                                            {v.name} - ₹{v.price} {!v.inStock ? '(Sold Out)' : ''}
                                          </option>
                                        ))}
                                      </select>
                                      <ChevronDown className="w-3 h-3 text-[#664936] absolute right-2 top-2 pointer-events-none" />
                                    </div>
                                  ) : (
                                    <span className="text-[10px] text-[#664936] font-semibold bg-[#EAE4D8]/60 px-2.5 py-0.5 rounded-full inline-block">
                                      {product.netQuantity}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Remove Item Button */}
                              <button
                                onClick={() => removeFromCart(product.id, selectedVariant?.id)}
                                className="absolute top-3 right-3 p-1.5 text-[#6E7A71] hover:text-[#B85D3B] hover:bg-[#B85D3B]/10 rounded-full transition-colors"
                                title="Remove item"
                              >
                                <Trash2 className="w-4 h-4 stroke-[1.8]" />
                              </button>
                            </div>

                            {/* Price & Quantity Controls */}
                            <div className="flex items-center justify-between pt-2 border-t border-[#E5DFC9]/60 text-xs">
                              {/* Quantity Stepper */}
                              <div className="flex items-center border border-[#E5DFC9] rounded-full bg-[#FAF6F0] px-2.5 py-1 space-x-2 shadow-xs">
                                <button
                                  onClick={() => updateQuantity(product.id, quantity - 1, selectedVariant?.id)}
                                  className="p-1 text-[#1C241E] hover:text-[#B85D3B] rounded transition-colors"
                                  title="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-bold text-[#1B3626] w-5 text-center font-sans">
                                  {quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(product.id, quantity + 1, selectedVariant?.id)}
                                  className="p-1 text-[#1C241E] hover:text-[#1B3626] rounded transition-colors"
                                  title="Increase quantity"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              {/* Price Display */}
                              <div className="text-right">
                                <span className="text-[10px] text-[#455248] block">
                                  ₹{displayPrice} each
                                </span>
                                <span className="font-sans text-sm font-bold text-[#1B3626]">
                                  ₹{itemSubtotal}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>

                  {/* Recommended Add-on Card */}
                  {upsellProduct && (
                    <div className="bg-[#EEF4EA] p-3.5 rounded-2xl border border-[#C3CCA6] flex items-center space-x-3 mt-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0 border border-[#C3CCA6] bg-white">
                        <Image
                          src={upsellProduct.images[0]}
                          alt={upsellProduct.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#B85D3B] block">
                          Recommended Himalayan Add-on
                        </span>
                        <h5 className="font-serif text-sm font-bold text-[#1B3626] truncate">
                          {upsellProduct.name}
                        </h5>
                        <p className="text-[11px] font-bold text-[#1B3626]">
                          ₹{upsellProduct.price}{' '}
                          <span className="line-through text-[#6E7A71] text-[10px] font-normal">
                            ₹{upsellProduct.originalPrice}
                          </span>
                        </p>
                      </div>
                      <button
                        onClick={() => addToCart(upsellProduct, 1)}
                        className="bg-[#1B3626] text-[#FAF6F0] hover:bg-[#274A36] px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-colors shadow-xs"
                      >
                        + Add
                      </button>
                    </div>
                  )}

                  {/* Coupon Section */}
                  <div className="pt-2 space-y-2">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#664936] block">
                      Promotional Coupons
                    </span>

                    {appliedCoupon ? (
                      <div className="flex items-center justify-between bg-emerald-50/90 border border-emerald-300 p-3 rounded-2xl text-xs">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                            <Tag className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <span className="font-mono font-bold text-emerald-900 uppercase">
                                {appliedCoupon.code}
                              </span>
                              <span className="bg-emerald-200 text-emerald-900 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                                -{appliedCoupon.discountPercent}%
                              </span>
                            </div>
                            <span className="text-emerald-700 text-[10px] block">
                              Saving ₹{discountAmount} on this order
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={removeCoupon}
                          className="text-[#B85D3B] hover:underline text-[11px] font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <form onSubmit={handleApplyCoupon} className="space-y-1">
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              placeholder="Enter Promo Code"
                              value={couponInput}
                              onChange={(e) => setCouponInput(e.target.value)}
                              className="flex-1 bg-white border border-[#E5DFC9] rounded-full px-3.5 py-2 text-xs uppercase focus:outline-none focus:ring-1 focus:ring-[#1B3626] shadow-xs"
                            />
                            <button
                              type="submit"
                              className="bg-[#1B3626] text-white px-4 py-2 rounded-full text-xs uppercase font-bold hover:bg-[#274A36] transition-colors shrink-0 shadow-xs"
                            >
                              Apply
                            </button>
                          </div>
                          {couponMsg && (
                            <p className={`text-[11px] pt-0.5 ${couponMsg.success ? 'text-emerald-700 font-bold' : 'text-[#B85D3B]'}`}>
                              {couponMsg.text}
                            </p>
                          )}
                        </form>

                        {/* Quick-Apply Coupon Chips */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {coupons.map((c) => (
                            <button
                              key={c.code}
                              onClick={() => handleApplyQuickCoupon(c.code)}
                              className="bg-[#EAE4D8]/60 hover:bg-[#DDE8D5] text-[#1B3626] border border-[#E5DFC9] text-[10px] font-mono font-bold px-2.5 py-1 rounded-full transition-colors flex items-center space-x-1"
                              title={c.description}
                            >
                              <Tag className="w-3 h-3 text-[#664936]" />
                              <span>{c.code} ({c.discountPercent}% OFF)</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Sticky Summary & CTA Footer */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-[#E5DFC9] bg-[#F4EFE6] space-y-3 shrink-0 shadow-lg">
                <div className="space-y-1.5 text-xs text-[#1C241E]">
                  <div className="flex justify-between">
                    <span className="text-[#455248]">Items Subtotal</span>
                    <span className="font-semibold">₹{subtotal}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span className="flex items-center space-x-1">
                        <Tag className="w-3 h-3" />
                        <span>Discount ({appliedCoupon?.code})</span>
                      </span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#455248]">GST (5% Organic Tax)</span>
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[10px]">Included in Price (₹{taxAmount})</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#455248]">Himalayan Express Shipping</span>
                    <span className="font-semibold">
                      {shippingFee === 0 ? (
                        <strong className="text-emerald-700 uppercase font-bold">FREE</strong>
                      ) : (
                        `₹${shippingFee}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-lg font-serif font-bold text-[#1B3626] pt-2 border-t border-[#E5DFC9]">
                    <span>Grand Total</span>
                    <span className="font-sans">₹{totalPrice}</span>
                  </div>
                </div>

                {/* Primary CTA */}
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-[#1B3626] text-[#FAF6F0] py-3.5 rounded-full font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center space-x-2 hover:bg-[#274A36] transition-all shadow-md group active:scale-[0.98]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#D49B35] group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex items-center justify-center space-x-2 text-[10px] text-[#664936] font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D49B35] shrink-0" />
                  <span>Razorpay Verified • 100% Encrypted & Safe Checkout</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

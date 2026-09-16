'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product, ProductVariant, CartItem, Coupon } from '@/types';
import { coupons } from '@/data/coupons';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, selectedVariant?: ProductVariant) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  changeVariant: (productId: string, currentVariantId: string | undefined, newVariant: ProductVariant) => void;
  clearCart: () => void;
  toggleCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  taxAmount: number;
  totalPrice: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  totalItemsCount: number;
  toast: ToastMessage | null;
  clearToast: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  hydrated: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const freeShippingThreshold = 999;
  const gstRate = 0.05; // 5% GST for organic food & wellness products

  // Hydration from Local Storage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('pahadi_sher_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedCoupon = localStorage.getItem('pahadi_sher_coupon');
      if (savedCoupon) {
        setAppliedCoupon(JSON.parse(savedCoupon));
      }
    } catch (e) {
      console.error('Error loading cart from storage', e);
    } finally {
      setHydrated(true);
    }
  }, []);

  // Sync to Local Storage
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem('pahadi_sher_cart', JSON.stringify(cart));
      if (appliedCoupon) {
        localStorage.setItem('pahadi_sher_coupon', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('pahadi_sher_coupon');
      }
    } catch (e) {
      console.error('Error saving cart to storage', e);
    }
  }, [cart, appliedCoupon, hydrated]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({
      id: Date.now().toString(),
      message,
      type
    });
  };

  const clearToast = () => {
    setToast(null);
  };

  const addToCart = (product: Product, quantity = 1, selectedVariant?: ProductVariant) => {
    // Default to first variant if none selected but product has variants
    const variantToUse = selectedVariant || (product.variants && product.variants.length > 0 ? product.variants[0] : undefined);
    const maxAvailable = variantToUse
      ? (variantToUse.availableQuantity ?? variantToUse.stockQuantity)
      : (product.availableQuantity ?? product.stockQuantity);

    if (maxAvailable <= 0) {
      showToast(`${product.name} is currently out of stock!`, 'warning');
      return;
    }

    let cappedQty = quantity;

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedVariant?.id === variantToUse?.id
      );
      if (existingIndex > -1) {
        const currentQty = prev[existingIndex].quantity;
        const newTotalQty = Math.min(maxAvailable, currentQty + quantity);
        if (newTotalQty === currentQty) {
          showToast(`Maximum available stock (${maxAvailable} units) already in basket!`, 'warning');
          return prev;
        }
        const updated = [...prev];
        updated[existingIndex].quantity = newTotalQty;
        return updated;
      }

      cappedQty = Math.min(maxAvailable, quantity);
      return [...prev, { product, quantity: cappedQty, selectedVariant: variantToUse }];
    });

    const itemTitle = variantToUse ? `${product.name} (${variantToUse.name})` : product.name;
    showToast(`Added ${cappedQty}x ${itemTitle} to Basket!`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    const itemToRemove = cart.find(
      item => item.product.id === productId && item.selectedVariant?.id === variantId
    );

    setCart(prev =>
      prev.filter(
        item => !(item.product.id === productId && item.selectedVariant?.id === variantId)
      )
    );

    if (itemToRemove) {
      showToast(`Removed ${itemToRemove.product.name} from Basket`, 'info');
    }
  };

  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.product.id === productId && item.selectedVariant?.id === variantId) {
          const maxAvailable = item.selectedVariant
            ? (item.selectedVariant.availableQuantity ?? item.selectedVariant.stockQuantity)
            : (item.product.availableQuantity ?? item.product.stockQuantity);

          if (quantity > maxAvailable) {
            showToast(`Stock limit reached! Only ${maxAvailable} available.`, 'warning');
            return { ...item, quantity: maxAvailable };
          }
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const changeVariant = (productId: string, currentVariantId: string | undefined, newVariant: ProductVariant) => {
    setCart(prev => {
      // Find the item being modified
      const currentItemIndex = prev.findIndex(
        item => item.product.id === productId && item.selectedVariant?.id === currentVariantId
      );

      if (currentItemIndex === -1) return prev;

      const currentItem = prev[currentItemIndex];

      // Check if item with new variant already exists in cart
      const existingTargetIndex = prev.findIndex(
        item => item.product.id === productId && item.selectedVariant?.id === newVariant.id
      );

      if (existingTargetIndex > -1 && existingTargetIndex !== currentItemIndex) {
        // Merge quantities
        const updated = [...prev];
        updated[existingTargetIndex].quantity += currentItem.quantity;
        // Remove current item
        return updated.filter((_, idx) => idx !== currentItemIndex);
      }

      // Update variant in place
      const updated = [...prev];
      updated[currentItemIndex] = {
        ...currentItem,
        selectedVariant: newVariant
      };
      return updated;
    });

    showToast(`Updated variant to ${newVariant.name}`, 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    showToast('Cart cleared', 'warning');
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const computeDiscount = (coupon: Coupon | null, cartList: CartItem[], cartSubtotal: number) => {
    if (!coupon) return { discount: 0, isFreeShipping: false };

    if (coupon.discountType === 'free_shipping') {
      return { discount: 0, isFreeShipping: true };
    }

    let eligibleSubtotal = cartSubtotal;

    if (coupon.discountType === 'product_specific' && coupon.applicableProductIds?.length) {
      const matchingItems = cartList.filter(item => coupon.applicableProductIds?.includes(item.product.id));
      eligibleSubtotal = matchingItems.reduce((acc, item) => {
        const itemPrice = item.selectedVariant ? item.selectedVariant.price : item.product.price;
        return acc + itemPrice * item.quantity;
      }, 0);
    } else if (coupon.discountType === 'category_specific' && coupon.applicableCategories?.length) {
      const matchingItems = cartList.filter(item => coupon.applicableCategories?.includes(item.product.category));
      eligibleSubtotal = matchingItems.reduce((acc, item) => {
        const itemPrice = item.selectedVariant ? item.selectedVariant.price : item.product.price;
        return acc + itemPrice * item.quantity;
      }, 0);
    }

    if (coupon.discountType === 'flat') {
      return { discount: Math.min(eligibleSubtotal, coupon.discountValue), isFreeShipping: false };
    }

    // Percentage
    const pct = coupon.discountValue || coupon.discountPercent || 0;
    const rawDisc = Math.round((eligibleSubtotal * pct) / 100);
    const finalDisc = coupon.maxDiscount ? Math.min(rawDisc, coupon.maxDiscount) : rawDisc;

    return { discount: finalDisc, isFreeShipping: false };
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      const msg = 'Please enter a valid coupon code.';
      showToast(msg, 'warning');
      return { success: false, message: msg };
    }

    // Pull current coupons list from localStorage if available
    let activeCouponsList: Coupon[] = coupons;
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('pahadi_coupons');
      if (stored) {
        try { activeCouponsList = JSON.parse(stored); } catch (e) {}
      }
    }

    const coupon = activeCouponsList.find(c => c.code.toUpperCase() === cleanCode);
    if (!coupon) {
      const msg = `Invalid code "${cleanCode}". Try PAHADI10, SHILAJIT20, or FREESHIP.`;
      showToast(msg, 'warning');
      return { success: false, message: msg };
    }

    if (coupon.status === 'Disabled') {
      const msg = `Coupon "${cleanCode}" is currently disabled.`;
      showToast(msg, 'warning');
      return { success: false, message: msg };
    }

    const todayStr = new Date().toISOString().split('T')[0];
    if (coupon.status === 'Expired' || (coupon.expiryDate && todayStr > coupon.expiryDate)) {
      const msg = `Coupon "${cleanCode}" expired on ${coupon.expiryDate}.`;
      showToast(msg, 'warning');
      return { success: false, message: msg };
    }

    if (coupon.startDate && todayStr < coupon.startDate) {
      const msg = `Coupon "${cleanCode}" starts on ${coupon.startDate}.`;
      showToast(msg, 'warning');
      return { success: false, message: msg };
    }

    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
      const msg = `Coupon "${cleanCode}" has reached its maximum redemption limit.`;
      showToast(msg, 'warning');
      return { success: false, message: msg };
    }

    if (subtotal < coupon.minOrderAmount) {
      const msg = `Code '${coupon.code}' requires minimum subtotal of ₹${coupon.minOrderAmount}. Add ₹${coupon.minOrderAmount - subtotal} more!`;
      showToast(msg, 'warning');
      return { success: false, message: msg };
    }

    // Check product/category scoping
    const { discount: testDiscount, isFreeShipping } = computeDiscount(coupon, cart, subtotal);
    if (coupon.discountType === 'product_specific' && testDiscount === 0 && !isFreeShipping) {
      const msg = `Coupon '${coupon.code}' is only valid for specific targeted products in your cart.`;
      showToast(msg, 'warning');
      return { success: false, message: msg };
    }

    if (coupon.discountType === 'category_specific' && testDiscount === 0 && !isFreeShipping) {
      const msg = `Coupon '${coupon.code}' is only valid for specific product categories.`;
      showToast(msg, 'warning');
      return { success: false, message: msg };
    }

    setAppliedCoupon(coupon);
    const successMsg = isFreeShipping 
      ? `Coupon '${coupon.code}' applied! Free Shipping granted.`
      : `Coupon '${coupon.code}' applied! You save ₹${testDiscount}.`;
    showToast(successMsg, 'success');
    return { success: true, message: successMsg };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon code removed', 'info');
  };

  const subtotal = cart.reduce((acc, item) => {
    const itemPrice = item.selectedVariant ? item.selectedVariant.price : item.product.price;
    return acc + itemPrice * item.quantity;
  }, 0);
  
  const { discount: discountAmount, isFreeShipping: isCouponFreeShipping } = computeDiscount(appliedCoupon, cart, subtotal);

  const taxableSubtotal = Math.max(0, subtotal - discountAmount);
  // Product prices are inclusive of taxes; taxAmount is the included GST portion
  const taxAmount = Math.round((taxableSubtotal * gstRate) / (1 + gstRate));

  const shippingFee = (subtotal >= freeShippingThreshold || subtotal === 0 || isCouponFreeShipping) ? 0 : 99;
  // Total price does not add extra tax since taxes are already included in product prices
  const totalPrice = Math.max(0, subtotal - discountAmount + shippingFee);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const contextValue = useMemo(
    () => ({
      cart,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      changeVariant,
      clearCart,
      toggleCart,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      subtotal,
      discountAmount,
      shippingFee,
      taxAmount,
      totalPrice,
      freeShippingThreshold,
      amountNeededForFreeShipping,
      totalItemsCount,
      toast,
      clearToast,
      showToast,
      hydrated
    }),
    [
      cart,
      isCartOpen,
      appliedCoupon,
      subtotal,
      discountAmount,
      shippingFee,
      taxAmount,
      totalPrice,
      freeShippingThreshold,
      amountNeededForFreeShipping,
      totalItemsCount,
      toast,
      hydrated
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

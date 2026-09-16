import { NextResponse } from 'next/server';
import { coupons as defaultCoupons } from '@/data/coupons';
import { Coupon } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, subtotal = 0, cartItems = [], customerEmail, coupons: customCoupons } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json({
        valid: false,
        message: 'Please enter a valid coupon promo code.'
      }, { status: 400 });
    }

    const cleanCode = code.trim().toUpperCase();

    // Use custom coupons list from request (client state) or fallback to server default dataset
    const availableCoupons: Coupon[] = (Array.isArray(customCoupons) && customCoupons.length > 0)
      ? customCoupons
      : defaultCoupons;

    const targetCoupon = availableCoupons.find(c => c.code.toUpperCase() === cleanCode);

    if (!targetCoupon) {
      return NextResponse.json({
        valid: false,
        message: `Promo code "${cleanCode}" is invalid or does not exist.`
      }, { status: 404 });
    }

    // 1. Status Check
    if (targetCoupon.status === 'Disabled') {
      return NextResponse.json({
        valid: false,
        message: `Coupon "${cleanCode}" is currently disabled.`
      });
    }

    // 2. Date Range Validation
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    if (targetCoupon.startDate && todayStr < targetCoupon.startDate) {
      return NextResponse.json({
        valid: false,
        message: `Coupon "${cleanCode}" promo period starts on ${targetCoupon.startDate}.`
      });
    }

    if (targetCoupon.status === 'Expired' || (targetCoupon.expiryDate && todayStr > targetCoupon.expiryDate)) {
      return NextResponse.json({
        valid: false,
        message: `Coupon "${cleanCode}" expired on ${targetCoupon.expiryDate}.`
      });
    }

    // 3. Global Usage Limit Check
    if (targetCoupon.usageLimit && targetCoupon.usageCount >= targetCoupon.usageLimit) {
      return NextResponse.json({
        valid: false,
        message: `Coupon "${cleanCode}" has reached its maximum redemption limit.`
      });
    }

    // 4. Minimum Subtotal Check
    if (targetCoupon.minOrderAmount && subtotal < targetCoupon.minOrderAmount) {
      return NextResponse.json({
        valid: false,
        message: `Minimum subtotal of ₹${targetCoupon.minOrderAmount} required to use "${cleanCode}". Current subtotal is ₹${subtotal}.`
      });
    }

    // 5. Calculate Eligible Subtotal based on Scoping
    let eligibleSubtotal = subtotal;

    if (targetCoupon.discountType === 'product_specific' && targetCoupon.applicableProductIds?.length) {
      const matchingItems = cartItems.filter((item: any) => {
        const pId = item.product?.id || item.productId;
        return targetCoupon.applicableProductIds?.includes(pId);
      });

      if (matchingItems.length === 0) {
        return NextResponse.json({
          valid: false,
          message: `Coupon "${cleanCode}" is only applicable for specific targeted products in store.`
        });
      }

      eligibleSubtotal = matchingItems.reduce((sum: number, item: any) => {
        const itemPrice = item.selectedVariant ? item.selectedVariant.price : (item.product?.price || item.price || 0);
        return sum + (itemPrice * (item.quantity || 1));
      }, 0);
    }

    if (targetCoupon.discountType === 'category_specific' && targetCoupon.applicableCategories?.length) {
      const matchingItems = cartItems.filter((item: any) => {
        const cat = item.product?.category || item.category;
        return targetCoupon.applicableCategories?.includes(cat);
      });

      if (matchingItems.length === 0) {
        return NextResponse.json({
          valid: false,
          message: `Coupon "${cleanCode}" is only applicable for products in targeted categories.`
        });
      }

      eligibleSubtotal = matchingItems.reduce((sum: number, item: any) => {
        const itemPrice = item.selectedVariant ? item.selectedVariant.price : (item.product?.price || item.price || 0);
        return sum + (itemPrice * (item.quantity || 1));
      }, 0);
    }

    // 6. Compute Discount Amount & Perks
    let calculatedDiscount = 0;
    let isFreeShipping = false;

    if (targetCoupon.discountType === 'free_shipping') {
      isFreeShipping = true;
      calculatedDiscount = 0;
    } else if (targetCoupon.discountType === 'flat') {
      calculatedDiscount = Math.min(eligibleSubtotal, targetCoupon.discountValue);
    } else {
      // Percentage or Product/Category Percentage
      const percent = targetCoupon.discountValue || targetCoupon.discountPercent || 0;
      const rawDiscount = Math.round((eligibleSubtotal * percent) / 100);
      calculatedDiscount = targetCoupon.maxDiscount ? Math.min(rawDiscount, targetCoupon.maxDiscount) : rawDiscount;
    }

    return NextResponse.json({
      valid: true,
      code: targetCoupon.code,
      coupon: targetCoupon,
      discountAmount: calculatedDiscount,
      isFreeShipping,
      message: isFreeShipping 
        ? `Promo code "${cleanCode}" applied! Free Shipping granted.` 
        : `Promo code "${cleanCode}" applied successfully! You saved ₹${calculatedDiscount}.`
    });

  } catch (error: any) {
    return NextResponse.json({
      valid: false,
      message: 'Server failed to validate coupon: ' + error.message
    }, { status: 500 });
  }
}

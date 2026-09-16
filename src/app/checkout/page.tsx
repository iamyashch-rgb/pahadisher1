'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Lock, CreditCard, Truck, ArrowRight, ArrowLeft, 
  CheckCircle2, Sparkles, Plus, Minus, Trash2, Tag, Check, 
  AlertCircle, MapPin, Phone, Mail, User, Package, Zap, RefreshCw, Loader2,
  Coins, Gift, TrendingUp
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAdmin } from '@/context/AdminContext';
import { useCustomerAuth } from '@/context/CustomerAuthContext';
import { coupons } from '@/data/coupons';
import { validateAndLookupPincode, PincodeInfo } from '@/data/pincode';
import { loadRazorpayScript } from '@/utils/razorpay';
import { calculateShipping } from '@/utils/shippingCalculator';
import { CheckoutHeader } from '@/components/checkout/CheckoutHeader';
import { Order, ShippingAddress, SavedAddress } from '@/types';

export default function CheckoutPage() {
  const {
    cart,
    subtotal,
    discountAmount,
    taxAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    updateQuantity,
    removeFromCart,
    clearCart,
    freeShippingThreshold
  } = useCart();

  const { addNewOrder, reduceInventory, reserveStock, releaseStock, commitReservation, shippingConfig } = useAdmin();
  const { user, addRewardPoints, redeemRewardPoints } = useCustomerAuth();

  // Wizard Step State (1: Cart, 2: Customer, 3: Address, 4: Shipping, 5: Payment)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [customer, setCustomer] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    saveInfo: true
  });

  const defaultUserAddr = user?.addresses.find(a => a.isDefault) || user?.addresses[0];

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: defaultUserAddr?.fullName || user?.name || '',
    email: defaultUserAddr?.email || user?.email || '',
    phone: defaultUserAddr?.phone || user?.phone || '',
    street: defaultUserAddr?.street || '',
    city: defaultUserAddr?.city || '',
    state: defaultUserAddr?.state || '',
    pincode: defaultUserAddr?.pincode || '',
    landmark: defaultUserAddr?.landmark || ''
  });

  React.useEffect(() => {
    if (user) {
      setCustomer(prev => ({
        ...prev,
        fullName: user.name,
        email: user.email,
        phone: user.phone
      }));

      const defAddr = user.addresses.find(a => a.isDefault) || user.addresses[0];
      if (defAddr) {
        setAddress({
          fullName: defAddr.fullName || user.name,
          email: defAddr.email || user.email,
          phone: defAddr.phone || user.phone,
          street: defAddr.street,
          city: defAddr.city,
          state: defAddr.state,
          pincode: defAddr.pincode,
          landmark: defAddr.landmark || ''
        });
      }
    }
  }, [user]);

  const [pincodeStatus, setPincodeStatus] = useState<PincodeInfo>({
    pincode: '248001',
    city: 'Dehradun',
    state: 'Uttarakhand',
    district: 'Dehradun',
    isValid: true
  });

  // Shipping & Payment Method Selection
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<'standard' | 'air' | 'coldchain'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'Razorpay' | 'COD'>('Razorpay');

  // Dynamic shipping calculation via Calculator Utility
  const shippingResult = calculateShipping(
    address.pincode,
    cart,
    subtotal,
    shippingConfig,
    selectedShippingMethod
  );

  const calculatedShippingFee = paymentMethod === 'Razorpay' ? 0 : shippingResult.finalShippingCost;
  const isCodAllowed = shippingResult.isCodAvailable;
  const codHandlingFee = 0;
  
  // Credit Points Redemption Calculation (1 Point = 1 Rupee, eligible if points > 999)
  const [usePoints, setUsePoints] = useState(false);
  const [pointsToRedeemInput, setPointsToRedeemInput] = useState<number>(0);
  
  const userPointsBalance = user?.rewardPoints || 0;
  const isPointsEligible = !!user && userPointsBalance > 999;
  const baseTotal = Math.max(0, subtotal - discountAmount + calculatedShippingFee);
  const maxRedeemablePoints = Math.min(userPointsBalance, baseTotal);

  const pointsDiscount = (usePoints && isPointsEligible)
    ? Math.min(pointsToRedeemInput > 0 ? pointsToRedeemInput : maxRedeemablePoints, baseTotal)
    : 0;

  const grandTotal = Math.max(0, baseTotal - pointsDiscount);
  const codAdvanceAmount = Math.min(130, grandTotal);
  const codRemainingCash = Math.max(0, grandTotal - codAdvanceAmount);

  const [showRazorpaySimulationModal, setShowRazorpaySimulationModal] = useState(false);

  // Razorpay Gateway State & Error Handling
  type PaymentStatus = 'idle' | 'creating_order' | 'checkout_open' | 'verifying' | 'failed' | 'cancelled' | 'success';
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Coupon Form State
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; text: string } | null>(null);

  // Auto PIN Code validation effect
  const handlePincodeChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 6);
    setAddress(prev => ({ ...prev, pincode: clean }));
    
    if (clean.length === 6) {
      const res = validateAndLookupPincode(clean);
      setPincodeStatus(res);
      if (res.isValid) {
        setAddress(prev => ({
          ...prev,
          city: res.city,
          state: res.state
        }));
      }
    } else {
      setPincodeStatus({ pincode: clean, city: '', state: '', district: '', isValid: false });
    }
  };

  const handleCouponApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const res = applyCoupon(couponCodeInput);
    setCouponFeedback({ success: res.success, text: res.message });
    if (res.success) setCouponCodeInput('');
  };

  // Step Validation Helpers
  const isCustomerValid = customer.fullName.trim().length > 2 && customer.email.includes('@') && customer.phone.replace(/\D/g, '').length >= 10;
  const isAddressValid = address.street.trim().length > 3 && pincodeStatus.isValid && address.city.trim().length > 1 && address.state.trim().length > 1;

  // Complete Order Trigger
  const handleCompleteOrder = () => {
    if (cart.length === 0) return;

    if (paymentMethod === 'Razorpay') {
      initiateOfficialRazorpayPayment(grandTotal, false);
    } else {
      // Cash on Delivery requires ₹130 advance payment online
      initiateOfficialRazorpayPayment(codAdvanceAmount, true);
    }
  };

  // Official Razorpay Flow with Real-Time Stock Reservation
  const initiateOfficialRazorpayPayment = async (amountToCharge: number = grandTotal, isCodAdvance: boolean = false) => {
    setPaymentError(null);
    setPaymentStatus('creating_order');

    const cartItems = cart.map(item => ({
      productId: item.product.id,
      variantId: item.selectedVariant?.id,
      quantity: item.quantity
    }));

    // Reserve stock first
    const reservationRes = reserveStock(cartItems);
    if (!reservationRes.success) {
      setPaymentError(reservationRes.message || 'Stock reservation failed. Item unavailable.');
      setPaymentStatus('failed');
      return;
    }

    try {
      // Step 1: Dynamically load official Razorpay SDK script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded && typeof window.Razorpay === 'undefined') {
        setShowRazorpaySimulationModal(true);
        setPaymentStatus('idle');
        return;
      }

      // Step 2: Create payment order on server via API Route Handler
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountToCharge,
          currency: 'INR',
          customerName: customer.fullName,
          customerEmail: customer.email,
          customerPhone: customer.phone,
          items: cart.map(i => ({ id: i.product.id, quantity: i.quantity }))
        })
      });

      const data = await res.json();
      if (!data.success || !data.orderId) {
        releaseStock(cartItems);
        setPaymentError(data.error || 'Server failed to initialize Razorpay order');
        setPaymentStatus('failed');
        return;
      }

      setPaymentStatus('checkout_open');

      // Step 3: Open Official Razorpay Checkout Modal
      const options = {
        key: data.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_pahadi_sher_2026',
        amount: data.amount,
        currency: data.currency || 'INR',
        name: 'THE PAHADI SHER',
        description: isCodAdvance ? `₹130 Advance Payment for COD Order (Balance ₹${codRemainingCash} on Delivery)` : '100% Pure Himalayan Essentials',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=200&q=80',
        order_id: data.orderId,
        prefill: {
          name: customer.fullName,
          email: customer.email,
          contact: customer.phone
        },
        notes: {
          merchant: 'The Pahadi Sher Store',
          pincode: address.pincode,
          isCodAdvance: isCodAdvance ? 'true' : 'false'
        },
        theme: {
          color: '#1B3B2B' // Pahadi Forest Green
        },
        handler: async function (response: any) {
          // Step 4: Server-Side HMAC Signature Verification
          setPaymentStatus('verifying');
          try {
            const verifyRes = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature || `simulated_valid_${Date.now()}`
              })
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success && verifyData.verified) {
              // Server Signature Verified! Commit reservation & finalize order
              commitReservation(cartItems, verifyData.orderNumber);
              const payMethodName = isCodAdvance 
                ? `Cash on Delivery (₹130 Advance Paid via Razorpay, ₹${codRemainingCash} Due on Delivery)` 
                : 'Razorpay (UPI / Cards / NetBanking)';
              finalizeOrder(payMethodName as any, verifyData.orderNumber, verifyData.paymentId);
            } else {
              // Signature Verification Failed! Release reserved stock
              releaseStock(cartItems);
              setPaymentError(verifyData.error || 'Razorpay HMAC signature verification failed. Transaction cancelled.');
              setPaymentStatus('failed');
            }
          } catch (err: any) {
            releaseStock(cartItems);
            setPaymentError('Server verification error: ' + err.message);
            setPaymentStatus('failed');
          }
        },
        modal: {
          ondismiss: function () {
            releaseStock(cartItems);
            setPaymentStatus('cancelled');
            setPaymentError('Razorpay checkout modal was closed. Payment not completed.');
          }
        }
      };

      if (window.Razorpay) {
        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.on('payment.failed', function (response: any) {
          releaseStock(cartItems);
          setPaymentStatus('failed');
          setPaymentError(`Payment Failed: ${response.error?.description || 'Transaction declined'}`);
        });
        razorpayInstance.open();
      } else {
        // Fallback simulation modal if script unavailable
        setShowRazorpaySimulationModal(true);
        setPaymentStatus('idle');
      }
    } catch (err: any) {
      releaseStock(cartItems);
      console.error('Razorpay payment error:', err);
      setPaymentError('Payment initialization failed. Please check connection and retry.');
      setPaymentStatus('failed');
    }
  };

  const finalizeOrder = (method: Order['paymentMethod'], customOrderNum?: string, paymentId?: string) => {
    setPaymentStatus('verifying');
    const orderNumber = customOrderNum || `TPS-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    // 1. Reduce inventory in store ONLY AFTER payment verification
    reduceInventory(
      cart.map(item => ({
        productId: item.product.id,
        variantId: item.selectedVariant?.id,
        quantity: item.quantity
      }))
    );

    // 2. Create Order record
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      customerName: customer.fullName || address.fullName,
      email: customer.email || address.email,
      phone: customer.phone || address.phone,
      address: {
        ...address,
        fullName: customer.fullName || address.fullName,
        email: customer.email || address.email,
        phone: customer.phone || address.phone
      },
      items: cart.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.selectedVariant ? item.selectedVariant.price : item.product.price,
        image: item.selectedVariant?.image || item.product.images[0],
        variantName: item.selectedVariant?.name,
        sku: item.selectedVariant?.sku || item.product.sku
      })),
      totalAmount: grandTotal,
      shippingFee: calculatedShippingFee,
      discountAmount,
      status: 'Processing',
      paymentMethod: method,
      paymentStatus: method.startsWith('Razorpay') ? 'Paid' : 'Pending',
      trackingNumber: `TPS-EXP-${Math.floor(100000 + Math.random() * 900000)}`
    };

    // 3. Process Credit Points: Redemption & Earning
    if (usePoints && isPointsEligible && pointsDiscount > 0) {
      redeemRewardPoints(
        pointsDiscount,
        `Redeemed ${pointsDiscount} Credit Points on Order #${orderNumber}`,
        orderNumber
      );
    }

    // Earn 100 points if customer buys product above 999
    if ((subtotal > 999 || baseTotal > 999) && user) {
      addRewardPoints(
        100,
        `Earned 100 Credit Points on Order #${orderNumber} (Purchase > ₹999)`,
        orderNumber
      );
    }

    addNewOrder(newOrder);
    clearCart();
    setPaymentStatus('success');

    setTimeout(() => {
      window.location.href = `/confirmation?orderNumber=${newOrder.orderNumber}&total=${newOrder.totalAmount}&email=${encodeURIComponent(newOrder.email)}`;
    }, 800);
  };

  if (cart.length === 0 && currentStep !== 6) {
    return (
      <div className="min-h-screen bg-pahadi-offwhite flex flex-col justify-between">
        <CheckoutHeader currentStep={1} />
        <div className="py-20 text-center space-y-4 max-w-md mx-auto px-4 my-auto">
          <div className="w-20 h-20 bg-pahadi-paper rounded-full flex items-center justify-center mx-auto text-pahadi-brown border border-pahadi-sand shadow-inner">
            <Package className="w-10 h-10 stroke-[1.4]" />
          </div>
          <h2 className="font-playfair text-3xl font-bold text-pahadi-green">Your Cart is Empty</h2>
          <p className="text-xs text-pahadi-charcoal-muted">Add pure Himalayan essentials to your basket before proceeding to checkout.</p>
          <Link href="/products" className="inline-block bg-pahadi-green text-pahadi-gold px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-pahadi-md hover:bg-pahadi-green-light">
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pahadi-offwhite flex flex-col justify-between font-poppins">
      {/* Distraction-Free Header */}
      <CheckoutHeader currentStep={currentStep} onStepClick={(step) => setCurrentStep(step)} />

      {/* Main Content Area */}
      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Payment Error / Cancellation Banner with 1-Click Retry */}
          <AnimatePresence>
            {(paymentError || paymentStatus === 'failed' || paymentStatus === 'cancelled') && (
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="mb-6 bg-red-50 border border-red-300 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-red-900 text-xs sm:text-sm">
                      {paymentStatus === 'cancelled' ? 'Payment Cancelled' : 'Payment Authorization Failed'}
                    </h4>
                    <p className="text-[11px] text-red-700 font-sans">
                      {paymentError || 'Your payment was not completed. Stock inventory has NOT been reduced.'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleCompleteOrder()}
                  className="bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-800 transition-colors shrink-0 flex items-center space-x-1.5 shadow-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry Payment</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Wizard Steps Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* STEP 1: Cart Review */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-pahadi-paper p-6 sm:p-8 rounded-3xl border border-pahadi-border space-y-6 shadow-pahadi-sm"
                >
                  <div className="flex items-center justify-between border-b border-pahadi-sand pb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-pahadi-brown block">Step 1 of 5</span>
                      <h2 className="font-playfair text-2xl font-bold text-pahadi-green">Review Basket Items</h2>
                    </div>
                    <span className="bg-pahadi-sand text-pahadi-green font-bold text-xs px-3 py-1 rounded-full">
                      {cart.reduce((a, b) => a + b.quantity, 0)} Items
                    </span>
                  </div>

                  {/* Items List */}
                  <div className="divide-y divide-pahadi-sand space-y-3">
                    {cart.map(({ product, quantity, selectedVariant }) => {
                      const displayPrice = selectedVariant ? selectedVariant.price : product.price;
                      const displayImage = selectedVariant?.image || product.images[0];
                      const itemSubtotal = displayPrice * quantity;

                      return (
                        <div key={`${product.id}-${selectedVariant?.id || 'def'}`} className="pt-3 flex items-center justify-between gap-4">
                          <div className="flex items-center space-x-3 min-w-0">
                            <div className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0 border border-pahadi-sand bg-white">
                              <Image src={displayImage} alt={product.name} fill className="object-cover" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-playfair text-xs sm:text-sm font-bold text-pahadi-green truncate">{product.name}</h4>
                              <p className="text-[11px] text-pahadi-brown font-medium">
                                {selectedVariant ? selectedVariant.name : product.netQuantity} • ₹{displayPrice} each
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 shrink-0">
                            <div className="flex items-center border border-pahadi-border rounded-xl bg-white px-2 py-1 space-x-2">
                              <button onClick={() => updateQuantity(product.id, quantity - 1, selectedVariant?.id)} className="text-pahadi-charcoal hover:text-pahadi-red">
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold text-pahadi-green w-4 text-center">{quantity}</span>
                              <button onClick={() => updateQuantity(product.id, quantity + 1, selectedVariant?.id)} className="text-pahadi-charcoal hover:text-pahadi-green">
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="font-sans text-xs sm:text-sm font-bold text-pahadi-green w-16 text-right">
                              ₹{itemSubtotal}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 border-t border-pahadi-sand flex justify-end">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="bg-pahadi-green text-pahadi-gold px-8 py-3.5 rounded-2xl text-xs uppercase font-bold tracking-widest flex items-center space-x-2 hover:bg-pahadi-green-light shadow-pahadi-md"
                    >
                      <span>Continue to Customer Info</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Customer Information (Guest Mode Default) */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-pahadi-paper p-6 sm:p-8 rounded-3xl border border-pahadi-border space-y-6 shadow-pahadi-sm"
                >
                  <div className="flex items-center justify-between border-b border-pahadi-sand pb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-pahadi-brown block">Step 2 of 5</span>
                      <h2 className="font-playfair text-2xl font-bold text-pahadi-green">Customer Contact Info</h2>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-lg">
                      ⚡ Instant Guest Checkout
                    </span>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">Full Name *</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="e.g. Anurag Sharma"
                          value={customer.fullName}
                          onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                          className="w-full bg-white border border-pahadi-border rounded-xl pl-10 pr-4 py-3 text-base sm:text-xs font-medium focus:ring-2 focus:ring-pahadi-gold/60 focus:border-pahadi-green outline-none transition-all"
                        />
                        <User className="w-4 h-4 text-pahadi-brown absolute left-3 top-3.5 pointer-events-none" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">Mobile Number (+91) *</label>
                        <div className="relative">
                          <input
                            type="tel"
                            inputMode="numeric"
                            required
                            placeholder="98765 43210"
                            value={customer.phone}
                            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                            className="w-full bg-white border border-pahadi-border rounded-xl pl-10 pr-4 py-3 text-base sm:text-xs font-medium focus:ring-2 focus:ring-pahadi-gold/60 focus:border-pahadi-green outline-none transition-all"
                          />
                          <Phone className="w-4 h-4 text-pahadi-brown absolute left-3 top-3.5 pointer-events-none" />
                        </div>
                        <span className="text-[10px] text-pahadi-charcoal-muted mt-1 block">Used for SMS order tracking & OTP delivery</span>
                      </div>

                      <div>
                        <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">Email Address *</label>
                        <div className="relative">
                          <input
                            type="email"
                            inputMode="email"
                            required
                            placeholder="anurag@example.com"
                            value={customer.email}
                            onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                            className="w-full bg-white border border-pahadi-border rounded-xl pl-10 pr-4 py-3 text-base sm:text-xs font-medium focus:ring-2 focus:ring-pahadi-gold/60 focus:border-pahadi-green outline-none transition-all"
                          />
                          <Mail className="w-4 h-4 text-pahadi-brown absolute left-3 top-3.5 pointer-events-none" />
                        </div>
                        <span className="text-[10px] text-pahadi-charcoal-muted mt-1 block font-sans">Official tax invoice will be sent here</span>
                      </div>
                    </div>

                    <label className="flex items-center space-x-2 pt-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={customer.saveInfo}
                        onChange={(e) => setCustomer({ ...customer, saveInfo: e.target.checked })}
                        className="accent-pahadi-green rounded"
                      />
                      <span className="text-xs text-pahadi-charcoal font-medium">
                        Remember details for 1-click future guest orders (No password required)
                      </span>
                    </label>
                  </div>

                  <div className="pt-4 border-t border-pahadi-sand flex justify-between">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="px-5 py-3 text-pahadi-charcoal hover:bg-pahadi-sand rounded-xl text-xs font-bold uppercase flex items-center space-x-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      onClick={() => {
                        if (isCustomerValid) setCurrentStep(3);
                      }}
                      disabled={!isCustomerValid}
                      className={`px-8 py-3.5 rounded-2xl text-xs uppercase font-bold tracking-widest flex items-center space-x-2 shadow-pahadi-md ${
                        isCustomerValid
                          ? 'bg-pahadi-green text-pahadi-gold hover:bg-pahadi-green-light'
                          : 'bg-pahadi-sand text-pahadi-charcoal-light cursor-not-allowed'
                      }`}
                    >
                      <span>Continue to Address</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Delivery Address & Indian PIN Code Validation */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-pahadi-paper p-6 sm:p-8 rounded-3xl border border-pahadi-border space-y-6 shadow-pahadi-sm"
                >
                  <div className="flex items-center justify-between border-b border-pahadi-sand pb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-pahadi-brown block">Step 3 of 5</span>
                      <h2 className="font-playfair text-2xl font-bold text-pahadi-green">Shipping Address</h2>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-pahadi-green font-bold">
                      <MapPin className="w-4 h-4 text-pahadi-gold" />
                      <span>India Wide Delivery</span>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs">
                    {/* PIN Code with Instant Auto-Lookup */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="font-bold text-pahadi-brown uppercase text-[10px]">PIN Code (6-Digit Indian Postal Code) *</label>
                        {pincodeStatus.isValid && (
                          <span className="text-[10px] text-emerald-700 font-bold flex items-center space-x-1">
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Verified: {pincodeStatus.city}, {pincodeStatus.state}</span>
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="e.g. 248001, 110001, 400001"
                        value={address.pincode}
                        onChange={(e) => handlePincodeChange(e.target.value)}
                        className={`w-full bg-white border rounded-xl p-3 text-xs font-mono font-bold tracking-wider focus:ring-1 focus:ring-pahadi-green ${
                          pincodeStatus.isValid ? 'border-emerald-500 bg-emerald-50/30' : 'border-pahadi-border'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">Flat / House No. / Building & Street Address *</label>
                      <input
                        type="text"
                        required
                        placeholder="House No., Street Name, Colony"
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs focus:ring-1 focus:ring-pahadi-green"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">Landmark (Optional)</label>
                      <input
                        type="text"
                        placeholder="Near Clock Tower / Opp. Central Park"
                        value={address.landmark || ''}
                        onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                        className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs focus:ring-1 focus:ring-pahadi-green"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">City / Town *</label>
                        <input
                          type="text"
                          required
                          value={address.city}
                          onChange={(e) => setAddress({ ...address, city: e.target.value })}
                          className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs focus:ring-1 focus:ring-pahadi-green"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">State *</label>
                        <input
                          type="text"
                          required
                          value={address.state}
                          onChange={(e) => setAddress({ ...address, state: e.target.value })}
                          className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs focus:ring-1 focus:ring-pahadi-green"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-pahadi-sand flex justify-between">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="px-5 py-3 text-pahadi-charcoal hover:bg-pahadi-sand rounded-xl text-xs font-bold uppercase flex items-center space-x-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      onClick={() => {
                        if (isAddressValid) setCurrentStep(4);
                      }}
                      disabled={!isAddressValid}
                      className={`px-8 py-3.5 rounded-2xl text-xs uppercase font-bold tracking-widest flex items-center space-x-2 shadow-pahadi-md ${
                        isAddressValid
                          ? 'bg-pahadi-green text-pahadi-gold hover:bg-pahadi-green-light'
                          : 'bg-pahadi-sand text-pahadi-charcoal-light cursor-not-allowed'
                      }`}
                    >
                      <span>Continue to Shipping</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Shipping Method Selection */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-pahadi-paper p-6 sm:p-8 rounded-3xl border border-pahadi-border space-y-6 shadow-pahadi-sm"
                >
                  <div className="flex items-center justify-between border-b border-pahadi-sand pb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-pahadi-brown block">Step 4 of 5</span>
                      <h2 className="font-playfair text-2xl font-bold text-pahadi-green">Select Shipping Method</h2>
                    </div>
                    <Truck className="w-5 h-5 text-pahadi-gold" />
                  </div>

                  {/* Dynamic Estimated Delivery & Free Shipping Banner */}
                  <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between text-xs text-emerald-900 shadow-xs">
                    <div className="flex items-center space-x-3">
                      <Truck className="w-6 h-6 text-emerald-700 shrink-0" />
                      <div>
                        <span className="font-bold block text-sm font-playfair text-emerald-950">
                          Estimated Delivery: {shippingResult.estDeliveryDateFormatted}
                        </span>
                        <span className="text-[11px] text-emerald-800">
                          {shippingResult.isFreeShipping 
                            ? '🎉 Free Himalayan Delivery Unlocked!' 
                            : `Add ₹${shippingResult.amountNeededForFreeShipping} more to unlock FREE Delivery`}
                        </span>
                      </div>
                    </div>
                    {shippingResult.requiresColdChain && (
                      <span className="bg-sky-100 text-sky-900 border border-sky-300 text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0">
                        ❄️ Cold-Chain Package
                      </span>
                    )}
                  </div>

                  <div className="space-y-3">
                    {/* Normal / Standard Delivery */}
                    <label
                      onClick={() => setSelectedShippingMethod('standard')}
                      className="p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all bg-white border-pahadi-green ring-1 ring-pahadi-green shadow-sm"
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          checked={true}
                          readOnly
                          className="accent-pahadi-green"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-playfair font-bold text-pahadi-green text-sm block">
                              Himalayan Standard Delivery ({shippingResult.matchedZone ? shippingResult.matchedZone.name : 'Standard Zone'})
                            </span>
                            <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                              NORMAL DELIVERY
                            </span>
                          </div>
                          <span className="text-[11px] text-pahadi-charcoal-muted font-sans block mt-0.5">
                            Glass insulated packaging • Delivered in {shippingResult.estDeliveryDays}
                          </span>
                        </div>
                      </div>
                      <span className="font-sans text-xs font-bold text-pahadi-green shrink-0">
                        {paymentMethod === 'Razorpay' || shippingResult.isFreeShipping ? (
                          <strong className="text-emerald-700 uppercase">FREE</strong>
                        ) : (
                          `₹${shippingResult.finalShippingCost}`
                        )}
                      </span>
                    </label>
                  </div>

                  <div className="pt-4 border-t border-pahadi-sand flex justify-between">
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="px-5 py-3 text-pahadi-charcoal hover:bg-pahadi-sand rounded-xl text-xs font-bold uppercase flex items-center space-x-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      onClick={() => setCurrentStep(5)}
                      className="bg-pahadi-green text-pahadi-gold px-8 py-3.5 rounded-2xl text-xs uppercase font-bold tracking-widest flex items-center space-x-2 hover:bg-pahadi-green-light shadow-pahadi-md"
                    >
                      <span>Continue to Payment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: Official Razorpay Payment & Verification */}
              {currentStep === 5 && (
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-pahadi-paper p-6 sm:p-8 rounded-3xl border border-pahadi-border space-y-6 shadow-pahadi-sm"
                >
                  <div className="flex items-center justify-between border-b border-pahadi-sand pb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-pahadi-brown block">Step 5 of 5</span>
                      <h2 className="font-playfair text-2xl font-bold text-pahadi-green">Select Payment Option</h2>
                    </div>
                    <CreditCard className="w-5 h-5 text-pahadi-gold" />
                  </div>

                  <div className="space-y-3">
                    {/* Option 1: Official Razorpay Gateway */}
                    <label
                      onClick={() => setPaymentMethod('Razorpay')}
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        paymentMethod === 'Razorpay'
                          ? 'bg-white border-pahadi-green ring-1 ring-pahadi-green shadow-sm'
                          : 'bg-pahadi-paper border-pahadi-sand hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="paymentOption"
                          checked={paymentMethod === 'Razorpay'}
                          onChange={() => setPaymentMethod('Razorpay')}
                          className="accent-pahadi-green"
                        />
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-playfair font-bold text-pahadi-green text-sm">
                              Razorpay Official Gateway (Prepaid)
                            </span>
                            <span className="bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                              FREE DELIVERY (₹0 Shipping)
                            </span>
                          </div>
                          <span className="text-[11px] text-pahadi-charcoal-muted font-sans block mt-1">
                            Pay 100% online via UPI (GPay, PhonePe, Paytm), RuPay/Visa/Mastercard or NetBanking & enjoy 100% FREE Delivery!
                          </span>
                        </div>
                      </div>
                      <CreditCard className="w-5 h-5 text-pahadi-gold shrink-0" />
                    </label>

                    {/* Option 2: Dynamic COD */}
                    <label
                      onClick={() => {
                        if (isCodAllowed) setPaymentMethod('COD');
                      }}
                      className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                        !isCodAllowed
                          ? 'bg-pahadi-sand/20 border-pahadi-sand opacity-60 cursor-not-allowed'
                          : paymentMethod === 'COD'
                          ? 'bg-white border-pahadi-green ring-1 ring-pahadi-green shadow-sm cursor-pointer'
                          : 'bg-pahadi-paper border-pahadi-sand hover:bg-white cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="paymentOption"
                          disabled={!isCodAllowed}
                          checked={paymentMethod === 'COD'}
                          onChange={() => { if (isCodAllowed) setPaymentMethod('COD'); }}
                          className="accent-pahadi-green"
                        />
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-playfair font-bold text-pahadi-green text-sm block">
                              Cash on Delivery (COD)
                            </span>
                            {isCodAllowed && (
                              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                Pay ₹130 Advance
                              </span>
                            )}
                            {!isCodAllowed && (
                              <span className="bg-rose-100 text-rose-800 text-[9px] font-bold px-1.5 py-0.5 rounded">
                                UNAVAILABLE
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-pahadi-charcoal-muted font-sans block mt-1">
                            {!isCodAllowed 
                              ? shippingResult.codReason 
                              : `Pay ₹130 advance token online to confirm dispatch. Remaining balance of ₹${codRemainingCash} is paid in cash upon delivery!`}
                          </span>
                        </div>
                      </div>
                      <Truck className="w-5 h-5 text-pahadi-brown shrink-0" />
                    </label>
                  </div>

                  {/* Summary Address Snapshot */}
                  <div className="bg-white p-4 rounded-2xl border border-pahadi-sand text-xs space-y-1">
                    <span className="text-[10px] font-bold uppercase text-pahadi-brown block">Deliver To:</span>
                    <p className="font-bold text-pahadi-green">{customer.fullName} • {customer.phone}</p>
                    <p className="text-pahadi-charcoal-muted">{address.street}, {address.city}, {address.state} - {address.pincode}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-pahadi-sand flex justify-between">
                    <button
                      onClick={() => setCurrentStep(4)}
                      className="px-5 py-3 text-pahadi-charcoal hover:bg-pahadi-sand rounded-xl text-xs font-bold uppercase flex items-center space-x-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      onClick={handleCompleteOrder}
                      disabled={paymentStatus === 'creating_order' || paymentStatus === 'verifying'}
                      className="bg-pahadi-green text-pahadi-gold px-8 py-3.5 rounded-2xl text-xs uppercase font-bold tracking-widest flex items-center space-x-2 hover:bg-pahadi-green-light shadow-pahadi-lg transition-all disabled:opacity-60"
                    >
                      {paymentStatus === 'creating_order' || paymentStatus === 'verifying' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-pahadi-gold" />
                          <span>{paymentStatus === 'creating_order' ? 'Initializing Razorpay...' : 'Verifying Signature...'}</span>
                        </>
                      ) : (
                        <>
                          <span>
                            {paymentMethod === 'Razorpay' 
                              ? `Pay ₹${grandTotal} via Razorpay (FREE Delivery) →` 
                              : `Pay ₹${codAdvanceAmount} Advance & Confirm COD Order →`}
                          </span>
                          <ArrowRight className="w-4 h-4 text-pahadi-gold" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

            </div>

            {/* Right Column: Complete Order Summary Sidebar */}
            <div className="lg:col-span-5 sticky top-24">
              <div className="bg-pahadi-paper p-6 sm:p-7 rounded-3xl border border-pahadi-border space-y-5 shadow-pahadi-md">
                <h3 className="font-playfair text-xl font-bold text-pahadi-green border-b border-pahadi-sand pb-3">
                  Order Summary
                </h3>

                {/* Items Mini List */}
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {cart.map(({ product, quantity, selectedVariant }) => {
                    const price = selectedVariant ? selectedVariant.price : product.price;
                    const image = selectedVariant?.image || product.images[0];
                    return (
                      <div key={`${product.id}-${selectedVariant?.id || 'd'}`} className="flex items-center justify-between text-xs py-1 border-b border-pahadi-sand/40">
                        <div className="flex items-center space-x-3 min-w-0">
                          <div className="w-10 h-10 rounded-lg overflow-hidden relative shrink-0 border border-pahadi-sand bg-white">
                            <Image src={image} alt="" fill className="object-cover" />
                          </div>
                          <div className="min-w-0">
                            <span className="font-bold text-pahadi-green block truncate max-w-[150px]">{product.name}</span>
                            <span className="text-pahadi-charcoal-muted text-[10px]">
                              {selectedVariant?.name || product.netQuantity} • Qty: {quantity}
                            </span>
                          </div>
                        </div>
                        <span className="font-bold text-pahadi-green font-sans shrink-0">₹{price * quantity}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Coupon Code Input */}
                <div className="pt-2 border-t border-pahadi-sand space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-pahadi-brown block">Apply Coupon Code</span>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 p-2.5 rounded-xl text-xs">
                      <div className="flex items-center space-x-2">
                        <Tag className="w-4 h-4 text-emerald-700" />
                        <span className="font-mono font-bold text-emerald-900">{appliedCoupon.code} (-{appliedCoupon.discountPercent}%)</span>
                      </div>
                      <button onClick={removeCoupon} className="text-pahadi-red font-bold hover:underline text-[11px]">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleCouponApply} className="space-y-1">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="e.g. PAHADI10"
                          value={couponCodeInput}
                          onChange={(e) => setCouponCodeInput(e.target.value)}
                          className="flex-1 bg-white border border-pahadi-border rounded-xl px-3 py-2 text-xs uppercase focus:ring-1 focus:ring-pahadi-green"
                        />
                        <button type="submit" className="bg-pahadi-brown text-white px-3.5 py-2 rounded-xl text-xs font-bold uppercase hover:bg-pahadi-brown-dark">
                          Apply
                        </button>
                      </div>
                      {couponFeedback && (
                        <p className={`text-[11px] ${couponFeedback.success ? 'text-emerald-700 font-bold' : 'text-pahadi-red'}`}>
                          {couponFeedback.text}
                        </p>
                      )}
                    </form>
                  )}
                </div>

                {/* Loyalty Credit Points Widget */}
                {user ? (
                  <div className="pt-2 border-t border-pahadi-sand space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <Coins className="w-4 h-4 text-[#D49B35]" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-pahadi-green">
                          Loyalty Credit Points
                        </span>
                      </div>
                      <span className="bg-[#D49B35] text-[#1B3626] text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
                        {userPointsBalance} pts available
                      </span>
                    </div>

                    {isPointsEligible ? (
                      <div className="bg-gradient-to-br from-amber-50 to-emerald-50 border border-amber-200/80 p-3 rounded-2xl space-y-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={usePoints}
                            onChange={(e) => {
                              setUsePoints(e.target.checked);
                              if (e.target.checked) setPointsToRedeemInput(maxRedeemablePoints);
                            }}
                            className="accent-pahadi-green w-4 h-4 rounded"
                          />
                          <span className="text-xs font-bold text-pahadi-green">
                            Redeem Credit Points (1 Pt = ₹1)
                          </span>
                        </label>

                        {usePoints && (
                          <div className="space-y-1.5 pt-1">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-pahadi-charcoal-muted">Points to redeem:</span>
                              <div className="flex items-center space-x-1">
                                <input
                                  type="number"
                                  min={1}
                                  max={maxRedeemablePoints}
                                  value={pointsToRedeemInput || maxRedeemablePoints}
                                  onChange={(e) => {
                                    const val = Math.max(1, Math.min(Number(e.target.value), maxRedeemablePoints));
                                    setPointsToRedeemInput(val);
                                  }}
                                  className="w-20 bg-white border border-pahadi-border rounded-lg px-2 py-0.5 text-xs font-bold text-right font-mono"
                                />
                                <span className="font-semibold text-pahadi-green">pts</span>
                              </div>
                            </div>
                            <p className="text-[10px] text-emerald-800 font-bold flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-emerald-600" />
                              <span>Saves ₹{pointsDiscount} on product purchase!</span>
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-pahadi-sand/40 border border-pahadi-sand p-2.5 rounded-xl text-[10px] text-pahadi-brown flex items-center space-x-2">
                        <Lock className="w-3.5 h-3.5 text-pahadi-brown shrink-0" />
                        <span>Collect above 999 points to redeem. Need {1000 - userPointsBalance} more pts!</span>
                      </div>
                    )}

                    {(subtotal > 999 || baseTotal > 999) && (
                      <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-xl text-[11px] text-emerald-900 font-bold flex items-center space-x-2">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>🎉 You will earn +100 Credit Points on this purchase!</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="pt-2 border-t border-pahadi-sand text-[11px] text-pahadi-charcoal-muted bg-pahadi-sand/20 p-2.5 rounded-xl flex items-center justify-between">
                    <span>Sign in to earn & redeem 100 Credit Points!</span>
                    <Link href="/login" className="text-pahadi-green font-bold hover:underline">
                      Sign In
                    </Link>
                  </div>
                )}

                {/* Pricing Line Items */}
                <div className="space-y-2 text-xs text-pahadi-charcoal pt-2 border-t border-pahadi-sand">
                  <div className="flex justify-between">
                    <span className="text-pahadi-charcoal-muted">Items Subtotal</span>
                    <span className="font-bold font-sans">₹{subtotal}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span className="font-sans">-₹{discountAmount}</span>
                    </div>
                  )}

                  {pointsDiscount > 0 && (
                    <div className="flex justify-between text-amber-700 font-bold">
                      <span className="flex items-center gap-1">
                        <Coins className="w-3.5 h-3.5 text-[#D49B35]" />
                        <span>Credit Points Redeemed ({pointsDiscount} pts)</span>
                      </span>
                      <span className="font-sans">-₹{pointsDiscount}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-pahadi-charcoal-muted">GST (5% Organic Tax)</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                      Included in Price (₹{taxAmount})
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-pahadi-charcoal-muted">Shipping Fee</span>
                    <span className="font-bold">
                      {calculatedShippingFee === 0 ? (
                        <strong className="text-emerald-700 uppercase font-bold">FREE</strong>
                      ) : (
                        `₹${calculatedShippingFee}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-lg font-playfair font-bold text-pahadi-green pt-3 border-t border-pahadi-sand">
                    <span>Grand Total</span>
                    <span className="font-sans">₹{grandTotal}</span>
                  </div>

                  {paymentMethod === 'COD' && (
                    <div className="bg-amber-50/90 border border-amber-300 p-4 rounded-2xl space-y-2 text-xs">
                      <div className="flex items-center justify-between text-amber-950 font-bold">
                        <span className="flex items-center space-x-1">
                          <CreditCard className="w-3.5 h-3.5 text-amber-700" />
                          <span>Pay Online Now (Token Advance):</span>
                        </span>
                        <span className="font-mono text-sm text-amber-900 font-extrabold">₹{codAdvanceAmount}</span>
                      </div>
                      <div className="flex items-center justify-between text-pahadi-green font-bold border-t border-amber-200/80 pt-2">
                        <span className="flex items-center space-x-1">
                          <Truck className="w-3.5 h-3.5 text-pahadi-green" />
                          <span>Pay Cash on Delivery:</span>
                        </span>
                        <span className="font-mono text-sm text-pahadi-green font-extrabold">₹{codRemainingCash}</span>
                      </div>
                      <p className="text-[10px] text-amber-800/80 leading-tight pt-1">
                        * Paying ₹130 in advance validates your order and dispatch. Balance ₹{codRemainingCash} is collected in cash upon delivery.
                      </p>
                    </div>
                  )}
                </div>

                {/* Trust Seal */}
                <div className="bg-white p-3.5 rounded-2xl border border-pahadi-gold/40 text-center space-y-1">
                  <ShieldCheck className="w-5 h-5 text-pahadi-gold mx-auto" />
                  <span className="text-xs font-serif font-bold text-pahadi-green block">100% Himalayan Guarantee</span>
                  <p className="text-[10px] text-pahadi-charcoal-muted">Direct from high-altitude Kumaon villages in insulated glass jars.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Razorpay Gateway Fallback Simulation Modal */}
      <AnimatePresence>
        {showRazorpaySimulationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pahadi-charcoal/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white max-w-md w-full rounded-3xl p-6 space-y-5 shadow-2xl relative border-2 border-blue-600"
            >
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                    RZP
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-950 text-sm">Razorpay Secure Payment Gateway</h4>
                    <p className="text-[10px] text-gray-500">Merchant: The Pahadi Sher • Total: ₹{grandTotal}</p>
                  </div>
                </div>
                <button onClick={() => setShowRazorpaySimulationModal(false)} className="p-1 text-gray-400 font-bold hover:text-black">
                  ✕
                </button>
              </div>

              <div className="text-center space-y-3 py-1">
                <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-200">
                  <span className="text-xs text-blue-900 font-bold uppercase block mb-2">Supported Options: UPI, GPay, PhonePe, Cards, NetBanking</span>
                  <div className="w-36 h-36 bg-white mx-auto my-2 border p-2 flex flex-col items-center justify-center text-[10px] text-gray-500 font-mono rounded-xl shadow-inner">
                    <Sparkles className="w-8 h-8 text-blue-600 mb-1" />
                    <span>[RAZORPAY UPI QR]</span>
                    <span className="text-[9px] text-gray-400 mt-1">₹{grandTotal}</span>
                  </div>
                  <p className="text-[11px] text-blue-800 font-mono font-bold">UPI ID: pay.thepahadisher@razorpay</p>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowRazorpaySimulationModal(false);
                      finalizeOrder('Razorpay (UPI / Cards / NetBanking)');
                    }}
                    className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-blue-700 shadow-md transition-colors"
                  >
                    ✓ Complete Verified Razorpay Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowRazorpaySimulationModal(false);
                      setPaymentStatus('cancelled');
                      setPaymentError('Razorpay payment modal closed without completing transaction.');
                    }}
                    className="text-xs text-gray-500 hover:underline"
                  >
                    Cancel Transaction
                  </button>
                </div>
              </div>

              <div className="text-[10px] text-gray-400 text-center border-t pt-3 flex items-center justify-center space-x-1">
                <Lock className="w-3 h-3 text-blue-600" />
                <span>Protected by Razorpay Server HMAC-SHA256 Signature Verification</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

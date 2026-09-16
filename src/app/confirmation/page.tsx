'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, Truck, ShieldCheck, ArrowRight, Download, 
  Package, MapPin, Mail, Phone, Clock, FileText 
} from 'lucide-react';
import { CheckoutHeader } from '@/components/checkout/CheckoutHeader';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || 'TPS-2026-9812';
  const total = searchParams.get('total') || '1499';
  const email = searchParams.get('email') || 'customer@example.com';
  const trackingCode = `TPS-EXP-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="min-h-screen bg-pahadi-offwhite flex flex-col justify-between font-poppins">
      <CheckoutHeader currentStep={6} />

      <main className="flex-1 py-12 flex items-center justify-center">
        <div className="max-w-2xl w-full mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-pahadi-paper p-8 sm:p-12 rounded-3xl border-2 border-pahadi-gold/60 shadow-2xl text-center space-y-6 relative overflow-hidden"
          >
            {/* Top Celebration Glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-pahadi-gold/20 rounded-full blur-2xl pointer-events-none" />

            <div className="w-20 h-20 bg-pahadi-green text-pahadi-gold rounded-full flex items-center justify-center mx-auto shadow-lg ring-4 ring-pahadi-gold/30">
              <CheckCircle2 className="w-12 h-12 stroke-[2.2]" />
            </div>

            <div className="space-y-2">
              <span className="bg-emerald-100 text-emerald-900 text-xs font-sans font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block">
                Order Confirmed & Received
              </span>
              <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-pahadi-green">
                Thank You for Your Order!
              </h1>
              <p className="text-xs sm:text-sm text-pahadi-charcoal-muted font-sans max-w-lg mx-auto leading-relaxed">
                Your order <strong className="font-mono text-pahadi-green">{orderNumber}</strong> has been placed successfully. A receipt has been dispatched to <span className="text-pahadi-brown font-semibold">{email}</span>.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-white p-6 rounded-2xl border border-pahadi-sand text-left text-xs space-y-3.5 shadow-xs">
              <div className="flex justify-between border-b border-pahadi-sand pb-2.5">
                <span className="text-pahadi-charcoal-muted flex items-center space-x-1.5">
                  <FileText className="w-3.5 h-3.5 text-pahadi-brown" />
                  <span>Order Reference:</span>
                </span>
                <strong className="font-mono text-pahadi-green text-sm">{orderNumber}</strong>
              </div>

              <div className="flex justify-between border-b border-pahadi-sand pb-2.5">
                <span className="text-pahadi-charcoal-muted flex items-center space-x-1.5">
                  <Package className="w-3.5 h-3.5 text-pahadi-brown" />
                  <span>Amount Paid / Payable:</span>
                </span>
                <strong className="font-sans text-pahadi-green text-sm font-bold">₹{total}</strong>
              </div>

              <div className="flex justify-between border-b border-pahadi-sand pb-2.5">
                <span className="text-pahadi-charcoal-muted flex items-center space-x-1.5">
                  <Truck className="w-3.5 h-3.5 text-pahadi-brown" />
                  <span>Estimated Delivery:</span>
                </span>
                <strong className="text-pahadi-brown font-semibold">2 - 4 Business Days (Himalayan Express Air)</strong>
              </div>

              <div className="flex justify-between">
                <span className="text-pahadi-charcoal-muted flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-pahadi-brown" />
                  <span>Live Tracking Number:</span>
                </span>
                <strong className="font-mono text-pahadi-green font-bold">{trackingCode}</strong>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => alert(`Downloading official Tax Invoice PDF for Order ${orderNumber}...`)}
                className="bg-white border border-pahadi-border text-pahadi-green px-6 py-3.5 rounded-xl text-xs uppercase font-bold tracking-wider flex items-center justify-center space-x-2 hover:bg-pahadi-sand transition-all shadow-xs"
              >
                <Download className="w-4 h-4 text-pahadi-brown" />
                <span>Download Tax Invoice (PDF)</span>
              </button>

              <Link
                href="/products"
                className="bg-pahadi-green text-pahadi-gold px-8 py-3.5 rounded-xl text-xs uppercase font-bold tracking-wider flex items-center justify-center space-x-2 hover:bg-pahadi-green-light shadow-md transition-all"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Himalayan Guarantee Footer */}
            <div className="pt-3 border-t border-pahadi-sand/60 flex items-center justify-center space-x-2 text-[11px] text-pahadi-brown font-medium">
              <ShieldCheck className="w-4 h-4 text-pahadi-gold" />
              <span>100% Authentic Kumaon Village Harvest</span>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center font-playfair">Loading order confirmation receipt...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}

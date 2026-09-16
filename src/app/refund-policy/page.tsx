import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { RefreshCw, PackageCheck, AlertTriangle, ShieldCheck, ArrowLeft, Mail, ChevronRight, Truck } from 'lucide-react';
import { SITE_URL } from '@/utils/seoSchema';

export const metadata: Metadata = {
  title: 'Refund & Return Policy | The Pahadi Sher',
  description: 'Understand the return, refund, replacement, and cancellation rules for pure Pahadi Sher Himalayan wellness items.',
  alternates: {
    canonical: `${SITE_URL}/refund-policy`,
  },
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F0] py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-[#6E7A71] mb-6 font-sans">
          <Link href="/" className="hover:text-[#1B3626] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#1B3626] font-semibold">Refund Policy</span>
        </nav>

        {/* Page Header */}
        <div className="bg-[#1B3626] rounded-2xl p-6 sm:p-10 text-white shadow-xl mb-8 relative overflow-hidden border border-[#D49B35]/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D49B35]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center space-x-2 bg-[#D49B35]/20 text-[#D49B35] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-[#D49B35]/30">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Returns & Replacements</span>
            </div>
            <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Refund & Return Policy
            </h1>
            <p className="text-xs sm:text-sm text-[#FAF6F0]/80 max-w-2xl leading-relaxed">
              We value your trust. Given the nature of consumable wellness products, our refund and replacement guidelines are clear and transparent to ensure complete safety and customer satisfaction.
            </p>
            <div className="pt-2 text-[11px] text-[#D49B35] font-mono">
              Last updated: December 11, 2025
            </div>
          </div>
        </div>

        {/* Policy Content */}
        <div className="space-y-6 text-[#1C241E] font-sans">
          
          {/* Section 1 */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E5DFC9] shadow-xs space-y-4">
            <div className="flex items-center space-x-3 text-[#1B3626]">
              <div className="p-2.5 rounded-lg bg-[#FAF6F0] border border-[#E5DFC9]">
                <PackageCheck className="w-5 h-5 text-[#D49B35]" />
              </div>
              <h2 className="font-playfair text-xl sm:text-2xl font-bold">1. Return & Replacement Eligibility</h2>
            </div>
            <p className="text-sm text-[#455248] leading-relaxed">
              Because our products (Shilajit Resin, Pure Cow Ghee, Wild Honey, Herbal Teas, and Pickles) are consumable food and health supplements, <strong>opened or unsealed jars cannot be returned</strong> for hygiene and health safety regulations.
            </p>
            <p className="text-sm font-semibold text-[#1B3626]">
              We offer a 100% free replacement or refund under the following conditions:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#FAF6F0] border border-[#E5DFC9] space-y-1">
                <span className="font-bold text-xs uppercase tracking-wider text-[#B85D3B]">Transit Damage</span>
                <p className="text-xs text-[#455248]">Glass jar broken, leaked seal, or physical damage sustained during courier transit.</p>
              </div>
              <div className="p-4 rounded-lg bg-[#FAF6F0] border border-[#E5DFC9] space-y-1">
                <span className="font-bold text-xs uppercase tracking-wider text-[#B85D3B]">Wrong Product Received</span>
                <p className="text-xs text-[#455248]">Incorrect item, quantity, or variant delivered compared to your order confirmation.</p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E5DFC9] shadow-xs space-y-4">
            <div className="flex items-center space-x-3 text-[#1B3626]">
              <div className="p-2.5 rounded-lg bg-[#FAF6F0] border border-[#E5DFC9]">
                <AlertTriangle className="w-5 h-5 text-[#D49B35]" />
              </div>
              <h2 className="font-playfair text-xl sm:text-2xl font-bold">2. Reporting Damage & Timelines</h2>
            </div>
            <p className="text-sm text-[#455248] leading-relaxed">
              To claim a replacement or refund for damaged/defective deliveries, you must report the issue within <strong>48 hours of package delivery</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-[#455248]">
              <li>Send an email to <strong>chhavibohra@gmail.com</strong> with your <strong>Order Number (e.g. TPS-2026-9814)</strong>.</li>
              <li>Attach a clear photo or short unboxing video showing the damaged jar/seal.</li>
              <li>Our support team will inspect the proof and dispatch a fresh replacement jar within 24 business hours.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E5DFC9] shadow-xs space-y-4">
            <div className="flex items-center space-x-3 text-[#1B3626]">
              <div className="p-2.5 rounded-lg bg-[#FAF6F0] border border-[#E5DFC9]">
                <ShieldCheck className="w-5 h-5 text-[#D49B35]" />
              </div>
              <h2 className="font-playfair text-xl sm:text-2xl font-bold">3. Refund Processing</h2>
            </div>
            <p className="text-sm text-[#455248] leading-relaxed">
              Once your refund request is verified and approved:
            </p>
            <div className="space-y-3 text-xs sm:text-sm text-[#455248]">
              <p>• <strong>Prepaid Orders (UPI / Card / NetBanking):</strong> Refunds are credited directly back to the original source account within <strong>5 to 7 business days</strong>.</p>
              <p>• <strong>Cash on Delivery (COD) Orders:</strong> Refunds are processed via UPI transfer or store discount voucher upon verifying customer bank details.</p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E5DFC9] shadow-xs space-y-4">
            <div className="flex items-center space-x-3 text-[#1B3626]">
              <div className="p-2.5 rounded-lg bg-[#FAF6F0] border border-[#E5DFC9]">
                <Truck className="w-5 h-5 text-[#D49B35]" />
              </div>
              <h2 className="font-playfair text-xl sm:text-2xl font-bold">4. Order Cancellations</h2>
            </div>
            <p className="text-sm text-[#455248] leading-relaxed">
              Orders can be cancelled free of charge prior to warehouse packing and dispatch (usually within 2 hours of placing the order). Once an order has been picked up by the courier partner, cancellation requests cannot be accepted.
            </p>
          </div>

          {/* Section 5: Support */}
          <div className="bg-[#1B3626] rounded-xl p-6 sm:p-8 text-white space-y-4">
            <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#D49B35]">5. Initiate a Refund / Support Request</h2>
            <p className="text-xs sm:text-sm text-[#FAF6F0]/90 leading-relaxed">
              Need assistance with an order replacement or refund? Our dedicated Uttarakhand support team is here to help you:
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
              <a
                href="mailto:chhavibohra@gmail.com"
                className="inline-flex items-center space-x-2 bg-[#D49B35] text-[#1B3626] px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-md"
              >
                <Mail className="w-4 h-4" />
                <span>Email Refund Support</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 text-xs text-[#D49B35] hover:text-white transition-colors underline font-medium"
              >
                <span>Go to Contact Form</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#1B3626] hover:text-[#B85D3B] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>

      </div>
    </div>
  );
}

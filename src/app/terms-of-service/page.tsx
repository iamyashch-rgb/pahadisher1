import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Scale, ShieldCheck, FileCheck, ArrowLeft, Mail, ChevronRight, AlertCircle } from 'lucide-react';
import { SITE_URL } from '@/utils/seoSchema';

export const metadata: Metadata = {
  title: 'Terms of Service | The Pahadi Sher',
  description: 'Review the Terms of Service for ordering pure Himalayan products, user responsibilities, pricing, and purchase terms at Pahadi Sher.',
  alternates: {
    canonical: `${SITE_URL}/terms-of-service`,
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#FAF6F0] py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-[#6E7A71] mb-6 font-sans">
          <Link href="/" className="hover:text-[#1B3626] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#1B3626] font-semibold">Terms of Service</span>
        </nav>

        {/* Page Header */}
        <div className="bg-[#1B3626] rounded-2xl p-6 sm:p-10 text-white shadow-xl mb-8 relative overflow-hidden border border-[#D49B35]/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D49B35]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center space-x-2 bg-[#D49B35]/20 text-[#D49B35] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-[#D49B35]/30">
              <Scale className="w-3.5 h-3.5" />
              <span>User Agreement & Terms</span>
            </div>
            <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xs sm:text-sm text-[#FAF6F0]/80 max-w-2xl leading-relaxed">
              By accessing, browsing, or placing an order on Pahadi Sher, you agree to comply with and be bound by the following terms and conditions.
            </p>
            <div className="pt-2 text-[11px] text-[#D49B35] font-mono">
              Last updated: December 11, 2025
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-6 text-[#1C241E] font-sans">
          
          {/* Section 1 */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E5DFC9] shadow-xs space-y-4">
            <div className="flex items-center space-x-3 text-[#1B3626]">
              <div className="p-2.5 rounded-lg bg-[#FAF6F0] border border-[#E5DFC9]">
                <FileCheck className="w-5 h-5 text-[#D49B35]" />
              </div>
              <h2 className="font-playfair text-xl sm:text-2xl font-bold">1. General Overview & Agreement</h2>
            </div>
            <p className="text-sm text-[#455248] leading-relaxed">
              By purchasing from Pahadi Sher Naturals, you represent that you are at least the legal age of majority in your jurisdiction and have given us your consent to allow any of your minor dependents to use this site.
            </p>
            <p className="text-xs sm:text-sm text-[#455248] leading-relaxed">
              We reserve the right to refuse service to anyone for any reason at any time. You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of our products, trademark, or service without express written permission from Pahadi Sher.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E5DFC9] shadow-xs space-y-4">
            <div className="flex items-center space-x-3 text-[#1B3626]">
              <div className="p-2.5 rounded-lg bg-[#FAF6F0] border border-[#E5DFC9]">
                <ShieldCheck className="w-5 h-5 text-[#D49B35]" />
              </div>
              <h2 className="font-playfair text-xl sm:text-2xl font-bold">2. Products, Purity & Quality Disclaimer</h2>
            </div>
            <p className="text-sm text-[#455248] leading-relaxed">
              All Pahadi Sher products (including High-Altitude Himalayan Shilajit Resin, Pure Cow Ghee, Raw Forest Honey, Herbal Teas, and Pahadi Spices) are 100% natural and harvested from Uttarakhand mountain regions.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-[#455248]">
              <li><strong>Artisanal Variation:</strong> Due to natural harvest cycles, wild forest flora, and traditional Bilona / sun-drying methods, natural variations in aroma, viscosity, color, and texture may occur between batches.</li>
              <li><strong>Ayurvedic & Wellness Use:</strong> Our product descriptions and information are provided for general educational wellness purposes and are not intended to diagnose, treat, cure, or prevent any medical condition. Please consult a qualified healthcare professional before beginning any new health regimen.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E5DFC9] shadow-xs space-y-4">
            <div className="flex items-center space-x-3 text-[#1B3626]">
              <div className="p-2.5 rounded-lg bg-[#FAF6F0] border border-[#E5DFC9]">
                <AlertCircle className="w-5 h-5 text-[#D49B35]" />
              </div>
              <h2 className="font-playfair text-xl sm:text-2xl font-bold">3. Pricing, Payments & Order Modification</h2>
            </div>
            <p className="text-sm text-[#455248] leading-relaxed">
              Prices for our products are quoted in Indian Rupees (INR) inclusive of applicable GST taxes.
            </p>
            <div className="space-y-3 text-xs sm:text-sm text-[#455248]">
              <p>• <strong>Price Changes:</strong> Product prices are subject to change without prior notice based on seasonal availability and mountain harvest yields.</p>
              <p>• <strong>Order Cancellations:</strong> We reserve the right to refuse or limit any order placed with us. In the event that we make a change to or cancel an order, we will notify you via the email or phone number provided at the time the order was placed.</p>
              <p>• <strong>Account Accuracy:</strong> You agree to provide accurate, complete shipping and billing information for all orders. Incorrect addresses resulting in non-delivery may incur re-dispatch charges.</p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E5DFC9] shadow-xs space-y-4">
            <div className="flex items-center space-x-3 text-[#1B3626]">
              <div className="p-2.5 rounded-lg bg-[#FAF6F0] border border-[#E5DFC9]">
                <Scale className="w-5 h-5 text-[#D49B35]" />
              </div>
              <h2 className="font-playfair text-xl sm:text-2xl font-bold">4. Governing Law & Jurisdiction</h2>
            </div>
            <p className="text-sm text-[#455248] leading-relaxed">
              These Terms of Service and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of India, with legal jurisdiction under the courts of Uttarakhand, India.
            </p>
          </div>

          {/* Section 5: Contact */}
          <div className="bg-[#1B3626] rounded-xl p-6 sm:p-8 text-white space-y-4">
            <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#D49B35]">5. Contact Information</h2>
            <p className="text-xs sm:text-sm text-[#FAF6F0]/90 leading-relaxed">
              Questions regarding the Terms of Service should be sent directly to our customer care team:
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
              <a
                href="mailto:chhavibohra@gmail.com"
                className="inline-flex items-center space-x-2 bg-[#D49B35] text-[#1B3626] px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-md"
              >
                <Mail className="w-4 h-4" />
                <span>Email Legal Support</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 text-xs text-[#D49B35] hover:text-white transition-colors underline font-medium"
              >
                <span>Contact Us</span>
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

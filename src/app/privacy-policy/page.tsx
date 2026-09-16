import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft, Mail, ChevronRight } from 'lucide-react';
import { SITE_URL } from '@/utils/seoSchema';

export const metadata: Metadata = {
  title: 'Privacy Policy | The Pahadi Sher',
  description: 'Learn how Pahadi Sher collects, protects, and uses your personal data in accordance with Indian privacy laws and e-commerce standards.',
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F0] py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-[#6E7A71] mb-6 font-sans">
          <Link href="/" className="hover:text-[#1B3626] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#1B3626] font-semibold">Privacy Policy</span>
        </nav>

        {/* Page Header */}
        <div className="bg-[#1B3626] rounded-2xl p-6 sm:p-10 text-white shadow-xl mb-8 relative overflow-hidden border border-[#D49B35]/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D49B35]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center space-x-2 bg-[#D49B35]/20 text-[#D49B35] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-[#D49B35]/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Legal & Data Security</span>
            </div>
            <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-[#FAF6F0]/80 max-w-2xl leading-relaxed">
              Pahadi Sher Naturals is committed to protecting your privacy. This policy details what information we collect, how we safeguard it, and how your data is used to serve you authentic Himalayan superfoods.
            </p>
            <div className="pt-2 text-[11px] text-[#D49B35] font-mono">
              Last updated: December 11, 2025
            </div>
          </div>
        </div>

        {/* Policy Content Cards */}
        <div className="space-y-6 text-[#1C241E] font-sans">
          
          {/* Section 1 */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E5DFC9] shadow-xs space-y-4">
            <div className="flex items-center space-x-3 text-[#1B3626]">
              <div className="p-2.5 rounded-lg bg-[#FAF6F0] border border-[#E5DFC9]">
                <FileText className="w-5 h-5 text-[#D49B35]" />
              </div>
              <h2 className="font-playfair text-xl sm:text-2xl font-bold">1. Information We Collect</h2>
            </div>
            <p className="text-sm text-[#455248] leading-relaxed">
              We collect essential information required to process your orders smoothly and improve your overall shopping experience with Pahadi Sher. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-[#455248]">
              <li><strong>Personal Identifiers:</strong> Name, delivery address, pin code, phone number, and email address provided during checkout or account creation.</li>
              <li><strong>Transaction Details:</strong> Items purchased, order value, payment status (card, UPI, Net Banking, or Cash on Delivery). <em>Note: Payment card details and credentials are securely handled directly by PCI-DSS compliant payment gateways (Razorpay / Shopify Payments) and are never stored on our servers.</em></li>
              <li><strong>Device & Browsing Data:</strong> IP address, browser type, device identifiers, cookies, and website interactions used strictly for security, performance optimization, and fraud prevention.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E5DFC9] shadow-xs space-y-4">
            <div className="flex items-center space-x-3 text-[#1B3626]">
              <div className="p-2.5 rounded-lg bg-[#FAF6F0] border border-[#E5DFC9]">
                <Lock className="w-5 h-5 text-[#D49B35]" />
              </div>
              <h2 className="font-playfair text-xl sm:text-2xl font-bold">2. How We Use Your Information</h2>
            </div>
            <p className="text-sm text-[#455248] leading-relaxed">
              Your personal data is strictly used for legitimate business purposes:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-[#FAF6F0] border border-[#E5DFC9]/80 space-y-1.5">
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#1B3626]">Order Fulfillment</h3>
                <p className="text-xs text-[#455248]">Processing payments, order packing, courier shipping, real-time SMS/WhatsApp tracking alerts, and managing returns.</p>
              </div>
              <div className="p-4 rounded-lg bg-[#FAF6F0] border border-[#E5DFC9]/80 space-y-1.5">
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#1B3626]">Customer Service</h3>
                <p className="text-xs text-[#455248]">Responding to product queries, order updates, lab test verification assistance, and resolving complaints.</p>
              </div>
              <div className="p-4 rounded-lg bg-[#FAF6F0] border border-[#E5DFC9]/80 space-y-1.5">
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#1B3626]">Security & Fraud Prevention</h3>
                <p className="text-xs text-[#455248]">Detecting and preventing unauthorized access, fake orders, fraudulent transactions, and illegal activities.</p>
              </div>
              <div className="p-4 rounded-lg bg-[#FAF6F0] border border-[#E5DFC9]/80 space-y-1.5">
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#1B3626]">Marketing & Offers</h3>
                <p className="text-xs text-[#455248]">Sending optional promotional emails about fresh harvest drops and coupon discounts (you may opt-out anytime).</p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E5DFC9] shadow-xs space-y-4">
            <div className="flex items-center space-x-3 text-[#1B3626]">
              <div className="p-2.5 rounded-lg bg-[#FAF6F0] border border-[#E5DFC9]">
                <Eye className="w-5 h-5 text-[#D49B35]" />
              </div>
              <h2 className="font-playfair text-xl sm:text-2xl font-bold">3. How We Share Your Information</h2>
            </div>
            <p className="text-sm text-[#455248] leading-relaxed">
              We value your privacy and <strong>never sell or rent your personal information to third parties</strong>. We only share necessary data with trusted partners under strict confidentiality agreements:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-[#455248]">
              <li><strong>E-Commerce Platform:</strong> Powered by Shopify e-commerce infrastructure for secure data management and order processing.</li>
              <li><strong>Logistics & Delivery Partners:</strong> Express courier partners (BlueDart, Delhivery, Shadowfax, India Post) receive your shipping address and contact number solely to deliver your orders.</li>
              <li><strong>Payment Processors:</strong> Razorpay / Bank Payment Gateways process transaction approvals over encrypted 256-bit SSL connections.</li>
              <li><strong>Legal Obligations:</strong> We may disclose information if required by Indian law, court subpoena, or law enforcement agency requests.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E5DFC9] shadow-xs space-y-4">
            <div className="flex items-center space-x-3 text-[#1B3626]">
              <div className="p-2.5 rounded-lg bg-[#FAF6F0] border border-[#E5DFC9]">
                <ShieldCheck className="w-5 h-5 text-[#D49B35]" />
              </div>
              <h2 className="font-playfair text-xl sm:text-2xl font-bold">4. Your Rights and Choices (Indian Consumers)</h2>
            </div>
            <p className="text-sm text-[#455248] leading-relaxed">
              Under applicable Indian data protection laws, you retain complete authority over your personal information:
            </p>
            <div className="space-y-3 text-xs sm:text-sm text-[#455248]">
              <div className="flex items-start space-x-3">
                <span className="font-bold text-[#1B3626] bg-[#FAF6F0] border border-[#E5DFC9] px-2 py-0.5 rounded text-xs">Access & Copy</span>
                <span>Request details of the personal data we store regarding your account.</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="font-bold text-[#1B3626] bg-[#FAF6F0] border border-[#E5DFC9] px-2 py-0.5 rounded text-xs">Correction</span>
                <span>Update or correct inaccurate address details or contact numbers via your profile or customer support.</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="font-bold text-[#1B3626] bg-[#FAF6F0] border border-[#E5DFC9] px-2 py-0.5 rounded text-xs">Opt-Out</span>
                <span>Unsubscribe from marketing notifications at any time using the link in our promotional emails.</span>
              </div>
            </div>
          </div>

          {/* Section 5: Contact */}
          <div className="bg-[#1B3626] rounded-xl p-6 sm:p-8 text-white space-y-4">
            <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#D49B35]">5. Privacy Contact & Grievance Officer</h2>
            <p className="text-xs sm:text-sm text-[#FAF6F0]/90 leading-relaxed">
              If you have any questions, concerns, or requests regarding this Privacy Policy or data security, please reach out to our team:
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
              <a
                href="mailto:chhavibohra@gmail.com"
                className="inline-flex items-center space-x-2 bg-[#D49B35] text-[#1B3626] px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-md"
              >
                <Mail className="w-4 h-4" />
                <span>Email Privacy Support</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 text-xs text-[#D49B35] hover:text-white transition-colors underline font-medium"
              >
                <span>Visit Contact Us Page</span>
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

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mountain, Lock, ShieldCheck, Check } from 'lucide-react';

interface CheckoutHeaderProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export const CheckoutHeader: React.FC<CheckoutHeaderProps> = ({ currentStep, onStepClick }) => {
  const steps = [
    { number: 1, name: 'Cart' },
    { number: 2, name: 'Customer' },
    { number: 3, name: 'Address' },
    { number: 4, name: 'Shipping' },
    { number: 5, name: 'Payment' },
    { number: 6, name: 'Receipt' },
  ];

  return (
    <header className="bg-pahadi-paper border-b border-pahadi-sand sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Brand Logo & Security Badge */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-pahadi-gold shadow-sm shrink-0 bg-pahadi-green">
                <Image
                  src="/assets/photos/2.jpeg"
                  alt="The Pahadi Sher Logo"
                  fill
                  sizes="32px"
                  className="object-cover object-center rounded-full"
                />
              </div>
              <span className="font-playfair text-lg font-bold text-pahadi-green tracking-tight">
                THE PAHADI SHER
              </span>
            </Link>

            <div className="hidden sm:flex items-center space-x-1.5 bg-white border border-pahadi-sand px-2.5 py-1 rounded-full text-[10px] text-pahadi-brown font-semibold shadow-xs">
              <Lock className="w-3 h-3 text-emerald-700 shrink-0" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>

          {/* 6-Step Progress Bar Indicator */}
          <nav aria-label="Checkout Steps" className="w-full md:w-auto">
            <div className="flex items-center justify-between md:justify-end space-x-1.5 sm:space-x-3 overflow-x-auto py-1">
              {steps.map((step) => {
                const isCompleted = currentStep > step.number;
                const isCurrent = currentStep === step.number;
                const isClickable = step.number < currentStep && onStepClick;

                return (
                  <div key={step.number} className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
                    <button
                      type="button"
                      disabled={!isClickable}
                      onClick={() => isClickable && onStepClick(step.number)}
                      className={`flex items-center space-x-1 sm:space-x-1.5 px-2 py-1 rounded-xl text-[10px] sm:text-xs font-sans font-bold transition-all ${
                        isCurrent
                          ? 'bg-pahadi-green text-pahadi-gold ring-2 ring-pahadi-gold/40 shadow-xs'
                          : isCompleted
                          ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200 cursor-pointer'
                          : 'bg-pahadi-sand/50 text-pahadi-charcoal-light cursor-not-allowed'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-mono shrink-0 ${
                          isCurrent
                            ? 'bg-pahadi-gold text-pahadi-green-dark font-extrabold'
                            : isCompleted
                            ? 'bg-emerald-700 text-white font-bold'
                            : 'bg-pahadi-sand text-pahadi-charcoal-light'
                        }`}
                      >
                        {isCompleted ? <Check className="w-3 h-3 stroke-[2.5]" /> : step.number}
                      </span>
                      <span>{step.name}</span>
                    </button>

                    {step.number < steps.length && (
                      <span
                        className={`h-0.5 w-2 sm:w-3 rounded-full ${
                          currentStep > step.number ? 'bg-emerald-500' : 'bg-pahadi-sand'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Razorpay Trust Badge */}
          <div className="hidden lg:flex items-center space-x-1 text-[10px] font-semibold text-pahadi-brown">
            <ShieldCheck className="w-4 h-4 text-pahadi-gold shrink-0" />
            <span>Verified Gateway</span>
          </div>
        </div>
      </div>
    </header>
  );
};

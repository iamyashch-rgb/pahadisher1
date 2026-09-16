'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, ShoppingBag, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { useProducts, useAdmin } from '@/context/AdminContext';
import { useCart } from '@/context/CartContext';

export const ComboOffers = () => {
  const { homepageConfig } = useAdmin();
  const isEnabled = homepageConfig.sections.find(s => s.id === 'combo_offers')?.enabled;
  if (isEnabled === false) return null;

  const promo = homepageConfig.promoBanner;
  const products = useProducts();
  const { addToCart } = useCart();
  const comboProducts = products.filter((p) => p.category === 'combos');

  return (
    <section className="py-20 bg-[#FAF6F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Dynamic Promotional Banner Card */}
        {promo && promo.title && (
          <div className="relative rounded-sm overflow-hidden bg-[#1B3626] text-[#FAF6F0] p-8 md:p-12 border border-[#DDE8D5]/30 shadow-2xl">
            <div className="absolute inset-0 z-0 opacity-25">
              <Image
                src={promo.backgroundImage || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1200'}
                alt="Promo Banner"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="inline-flex items-center space-x-2 bg-[#DDE8D5]/20 text-[#D49B35] border border-[#DDE8D5]/30 px-4 py-1 rounded-sm text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                <span>{promo.badge || 'FESTIVE MOUNTAIN HARVEST SALE'}</span>
              </span>
              <h3 className="font-serif text-3xl sm:text-5xl font-bold text-white">
                {promo.title}
              </h3>
              <p className="text-sm text-[#FAF6F0]/90 font-sans leading-relaxed">
                {promo.description}
              </p>
              {promo.discountCode && (
                <div className="inline-block bg-black/30 border border-[#D49B35]/40 text-[#D49B35] font-mono px-3.5 py-1.5 rounded-sm text-xs font-bold">
                  Use Promo Code: {promo.discountCode}
                </div>
              )}
              <div>
                <Link
                  href={promo.buttonLink || '/products?category=combos'}
                  className="inline-flex items-center space-x-2 bg-[#B85D3B] text-white px-8 py-3.5 rounded-sm text-xs uppercase font-bold tracking-widest hover:bg-[#9C4B2B] transition-all shadow-md"
                >
                  <span>{promo.buttonText || 'Shop Special Combos'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#B85D3B] flex items-center space-x-2">
              <Tag className="w-4 h-4 text-[#D49B35]" />
              <span>Curated Wellness Bundles</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1B3626]">
              Royal Himalayan Combo Packs
            </h2>
          </div>

          <Link
            href="/products?category=combos"
            className="inline-flex items-center space-x-2 text-xs uppercase font-bold tracking-widest text-[#1B3626] hover:text-[#B85D3B] transition-colors group"
          >
            <span>View All Combos ({comboProducts.length})</span>
            <ArrowRight className="w-4 h-4 text-[#B85D3B] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {comboProducts.map((combo) => (
            <div
              key={combo.id}
              className="bg-white rounded-sm border border-[#E5DFC9] p-6 sm:p-8 flex flex-col sm:flex-row gap-6 shadow-sm hover:shadow-kumaon-card transition-all relative overflow-hidden group"
            >
              <div className="w-full sm:w-48 aspect-square relative rounded-sm overflow-hidden shrink-0 border border-[#E5DFC9] bg-[#FAF6F0]">
                <Image
                  src={combo.images[0]}
                  alt={combo.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 bg-[#B85D3B] text-white px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase">
                  {combo.badge}
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#B85D3B] block">
                    {combo.netQuantity} • {combo.origin}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#1B3626]">
                    {combo.name}
                  </h3>
                  <p className="text-xs text-[#455248] line-clamp-2 leading-relaxed">
                    {combo.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E5DFC9] flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline space-x-2">
                      <span className="font-sans text-2xl font-bold text-[#1B3626]">
                        ₹{combo.price}
                      </span>
                      <span className="line-through text-xs text-[#6E7A71] font-normal">
                        ₹{combo.originalPrice}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#B85D3B] font-bold">
                      Save ₹{combo.originalPrice - combo.price}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(combo, 1)}
                    className="bg-[#1B3626] text-[#FAF6F0] px-5 py-2.5 rounded-full text-xs uppercase font-bold tracking-wider flex items-center space-x-1.5 hover:bg-[#274A36] shadow-sm transition-all"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#D49B35]" />
                    <span>Add Bundle</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

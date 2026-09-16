'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useProducts } from '@/context/AdminContext';
import { ProductGrid } from '../product/ProductGrid';

export const BestSellers = () => {
  const products = useProducts();
  const bestSellersList = products.filter((p) => p.featured || p.rating >= 4.9).slice(0, 3);

  return (
    <section className="py-20 bg-[#F4EFE6] relative border-y border-[#E5DFC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#B85D3B] flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#D49B35]" />
              <span>Customer Favorites</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1B3626]">
              Our Best Sellers
            </h2>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center space-x-2 text-xs uppercase font-bold tracking-widest text-[#1B3626] hover:text-[#B85D3B] transition-colors group"
          >
            <span>Explore All Best Sellers</span>
            <ArrowRight className="w-4 h-4 text-[#B85D3B] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <ProductGrid products={bestSellersList} columns={3} />
      </div>
    </section>
  );
};

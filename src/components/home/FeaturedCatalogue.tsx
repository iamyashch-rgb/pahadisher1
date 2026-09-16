'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useProducts, useAdmin } from '@/context/AdminContext';
import { categories } from '@/data/categories';
import { ProductGrid } from '../product/ProductGrid';
import { ProductCategory } from '@/types';

export const FeaturedCatalogue = () => {
  const { homepageConfig } = useAdmin();
  const featuredConfig = homepageConfig.featuredCatalogue;
  const products = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?.id || 'shilajit');

  const filteredProducts = products.filter((p) => p.category === selectedCategory);

  return (
    <section className="py-20 bg-[#FAF6F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 space-y-2">
          <div className="flex items-center justify-center space-x-2 text-xs font-sans font-bold uppercase tracking-widest text-[#B85D3B]">
            <Sparkles className="w-4 h-4 text-[#D49B35]" />
            <span>Curated Himalayan Collection</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1B3626]">
            Our Products
          </h2>
        </div>

        {/* Category Pill Switcher */}
        <div className="flex items-center justify-center flex-wrap gap-2 pb-4 mb-10 border-b border-[#E5DFC9]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-[#1B3626] text-[#FAF6F0] shadow-sm'
                  : 'bg-white text-[#1C241E] hover:bg-[#F4EFE6] border border-[#E5DFC9]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} columns={3} />
      </div>
    </section>
  );
};

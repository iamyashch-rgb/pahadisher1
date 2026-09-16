'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter, Check, RotateCcw } from 'lucide-react';
import { categories } from '@/data/categories';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedStockFilter: 'all' | 'instock' | 'lowstock';
  onSelectStockFilter: (status: 'all' | 'instock' | 'lowstock') => void;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating';
  onSelectSortBy: (sort: 'featured' | 'price-low' | 'price-high' | 'rating') => void;
  totalProductsCount: number;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  selectedStockFilter,
  onSelectStockFilter,
  sortBy,
  onSelectSortBy,
  totalProductsCount
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end justify-center md:hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-pahadi-green-dark/80 backdrop-blur-md"
        />

        {/* Bottom Sheet Modal */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-h-[85vh] bg-pahadi-paper border-t-2 border-pahadi-gold rounded-t-3xl shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Top Sheet Header */}
          <div className="p-4 border-b border-pahadi-sand bg-white flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-pahadi-gold" />
              <h3 className="font-playfair text-lg font-bold text-pahadi-green">
                Filter & Sort Products
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-pahadi-charcoal hover:bg-pahadi-sand rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-none">
            {/* Category Filter */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-pahadi-brown block">
                Shop By Category
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onSelectCategory('all')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase transition border ${
                    selectedCategory === 'all'
                      ? 'bg-pahadi-green text-pahadi-gold border-pahadi-gold'
                      : 'bg-white text-pahadi-charcoal border-pahadi-sand'
                  }`}
                >
                  All Items
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase transition border ${
                      selectedCategory === cat.id
                        ? 'bg-pahadi-green text-pahadi-gold border-pahadi-gold'
                        : 'bg-white text-pahadi-charcoal border-pahadi-sand'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Order */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-pahadi-brown block">
                Sort Products By
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'featured', label: 'Featured First' },
                  { id: 'price-low', label: 'Price: Low to High' },
                  { id: 'price-high', label: 'Price: High to Low' },
                  { id: 'rating', label: 'Customer Rating' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onSelectSortBy(s.id as any)}
                    className={`p-3 rounded-xl text-xs font-semibold border text-left transition ${
                      sortBy === s.id
                        ? 'bg-pahadi-green/10 text-pahadi-green border-pahadi-green font-bold'
                        : 'bg-white text-pahadi-charcoal border-pahadi-sand'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Availability */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-pahadi-brown block">
                Availability
              </span>
              <div className="flex gap-2">
                {[
                  { id: 'all', label: 'All Items' },
                  { id: 'instock', label: 'In Stock Only' },
                  { id: 'lowstock', label: 'Low Stock' }
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => onSelectStockFilter(st.id as any)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase border transition text-center ${
                      selectedStockFilter === st.id
                        ? 'bg-pahadi-green text-pahadi-gold border-pahadi-gold'
                        : 'bg-white text-pahadi-charcoal border-pahadi-sand'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sheet Footer Sticky CTA */}
          <div className="p-4 border-t border-pahadi-sand bg-white flex items-center justify-between gap-3 shrink-0">
            <button
              onClick={() => {
                onSelectCategory('all');
                onSelectStockFilter('all');
                onSelectSortBy('featured');
              }}
              className="px-4 py-3 rounded-xl text-xs font-bold uppercase text-pahadi-brown bg-pahadi-sand/60 hover:bg-pahadi-sand flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>

            <button
              onClick={onClose}
              className="flex-1 bg-pahadi-green text-pahadi-gold py-3 rounded-xl text-xs uppercase font-bold tracking-widest shadow-md text-center"
            >
              Show {totalProductsCount} Products
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  columns?: 4 | 3;
  variant?: 'default' | 'minimal';
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, columns = 4, variant = 'minimal' }) => {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center bg-pahadi-paper rounded-3xl border border-pahadi-border p-8 space-y-3">
        <h4 className="font-playfair text-xl font-bold text-pahadi-green">
          No Products Match Your Filter
        </h4>
        <p className="text-xs text-pahadi-charcoal-muted max-w-sm mx-auto">
          Try resetting your price range, category, or rating filter to view available Himalayan items.
        </p>
      </div>
    );
  }

  // Desktop: 4 cols, Tablet: 3 cols, Mobile: 2 cols
  const gridClass =
    columns === 4
      ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6'
      : 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 lg:gap-6';

  return (
    <div className={gridClass}>
      {products.map((product, idx) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: idx * 0.04 }}
          className="h-full"
        >
          <ProductCard product={product} variant={variant} />
        </motion.div>
      ))}
    </div>
  );
};

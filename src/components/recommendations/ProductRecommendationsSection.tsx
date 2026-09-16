'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '@/types';
import { ProductGrid } from '@/components/product/ProductGrid';
import { 
  getYouMayAlsoLike, 
  getCustomersAlsoViewed, 
  getBestSellers, 
  getRecentlyViewedProducts 
} from '@/utils/recommendations';

export type RecommendationType = 'you_may_like' | 'customers_viewed' | 'bestsellers' | 'recently_viewed';

interface ProductRecommendationsSectionProps {
  type: RecommendationType;
  currentProduct?: Product;
  allProducts: Product[];
  title?: string;
  subtitle?: string;
  limit?: number;
}

export const ProductRecommendationsSection: React.FC<ProductRecommendationsSectionProps> = ({
  type,
  currentProduct,
  allProducts,
  title,
  subtitle,
  limit = 4
}) => {
  let recommendedProducts: Product[] = [];
  let defaultTitle = '';
  let defaultSubtitle = '';

  switch (type) {
    case 'you_may_like':
      if (currentProduct) {
        recommendedProducts = getYouMayAlsoLike(currentProduct, allProducts, limit);
      }
      defaultTitle = 'You May Also Like';
      defaultSubtitle = 'Hand-picked Himalayan products matching your wellness preferences.';
      break;

    case 'customers_viewed':
      if (currentProduct) {
        recommendedProducts = getCustomersAlsoViewed(currentProduct, allProducts, limit);
      }
      defaultTitle = 'Customers Also Viewed';
      defaultSubtitle = 'Popular choices explored by mountain wellness connoisseurs.';
      break;

    case 'bestsellers':
      recommendedProducts = getBestSellers(allProducts, limit);
      defaultTitle = 'Best Sellers & Top Rated';
      defaultSubtitle = 'Our most loved high-altitude harvests across India.';
      break;

    case 'recently_viewed':
      recommendedProducts = getRecentlyViewedProducts(allProducts, limit);
      defaultTitle = 'Recently Viewed Items';
      defaultSubtitle = 'Items you explored during your current session.';
      break;
  }

  if (recommendedProducts.length === 0) return null;

  return (
    <section className="py-12 bg-pahadi-offwhite relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-pahadi-sand pb-4">
          <div className="space-y-1">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-pahadi-brown flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-pahadi-gold" />
              <span>Recommended For You</span>
            </span>
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-pahadi-green">
              {title || defaultTitle}
            </h2>
            <p className="text-xs text-pahadi-charcoal-muted font-sans">
              {subtitle || defaultSubtitle}
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-pahadi-green hover:text-pahadi-brown transition-colors group"
          >
            <span>Explore All Products ({allProducts.length})</span>
            <ArrowRight className="w-3.5 h-3.5 text-pahadi-gold group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Grid */}
        <ProductGrid products={recommendedProducts} columns={4} />
      </div>
    </section>
  );
};

'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal, Search, RefreshCw, Sparkles, Star, Check, X } from 'lucide-react';
import { useProducts } from '@/context/AdminContext';
import { categories } from '@/data/categories';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductCategory } from '@/types';
import { MobileFilterDrawer } from '@/components/product/MobileFilterDrawer';

function ProductCatalogueContent() {
  const products = useProducts();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') as ProductCategory | null;
  const searchParam = searchParams.get('search');

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [searchQuery, setSearchQuery] = useState<string>(searchParam || '');
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'instock' | 'soldout'>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Filter List
  const categoryOptions = [
    { id: 'all', name: 'All Products' },
    { id: 'shilajit', name: 'Shilajit' },
    { id: 'honey', name: 'Honey' },
    { id: 'ghee', name: 'Ghee' },
    { id: 'teas', name: 'Herbal Tea' },
    { id: 'pickles', name: 'Pickles' },
    { id: 'pahadi-foods', name: 'Pahadi Foods' },
    { id: 'combos', name: 'Combos' }
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category Filter
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }
        // Search Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = product.name.toLowerCase().includes(q);
          const matchesSub = product.subtitle.toLowerCase().includes(q);
          const matchesCategory = product.categoryName.toLowerCase().includes(q);
          if (!matchesName && !matchesSub && !matchesCategory) {
            return false;
          }
        }
        // Price Filter
        if (product.price > priceRange) {
          return false;
        }
        // Availability Filter
        if (availabilityFilter === 'instock' && !product.inStock) {
          return false;
        }
        if (availabilityFilter === 'soldout' && product.inStock) {
          return false;
        }
        // Rating Filter
        if (minRating > 0 && product.rating < minRating) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [selectedCategory, searchQuery, priceRange, availabilityFilter, minRating, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange(5000);
    setAvailabilityFilter('all');
    setMinRating(0);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    searchQuery.trim() !== '' ||
    priceRange < 5000 ||
    availabilityFilter !== 'all' ||
    minRating > 0;

  return (
    <div className="py-8 sm:py-12 bg-pahadi-offwhite min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Banner Header */}
        <div className="bg-pahadi-green text-pahadi-offwhite p-6 sm:p-10 rounded-3xl relative overflow-hidden shadow-pahadi-md border border-pahadi-gold/30">
          <div className="relative z-10 space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-pahadi-gold/20 text-pahadi-gold px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>100% NABL Certified Himalayan Catalogue</span>
            </div>
            <h1 className="font-playfair text-2xl sm:text-4xl lg:text-5xl font-bold text-white">
              The Pahadi Sher Store
            </h1>
            <p className="text-xs sm:text-sm text-pahadi-sand/90 font-sans leading-relaxed">
              Explore authentic high-altitude Shilajit, pure cow ghee, raw Buransh honey, wildcraft herbal teas, traditional hemp pickles, and organic mountain dals.
            </p>
          </div>
        </div>

        {/* Category Pill Switcher Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none border-b border-pahadi-sand/60">
          {categoryOptions.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-pahadi-green text-pahadi-gold shadow-pahadi-sm'
                  : 'bg-pahadi-paper text-pahadi-charcoal hover:bg-pahadi-sand'
              }`}
            >
              {cat.name}
              {cat.id !== 'all' && (
                <span className="ml-1 text-[10px] opacity-75">
                  ({products.filter((p) => p.category === cat.id).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search, Mobile Filter Toggle, and Sort Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-pahadi-paper p-4 rounded-2xl border border-pahadi-border">
          <div className="flex items-center space-x-3 flex-1">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center space-x-1.5 bg-pahadi-green text-pahadi-gold px-3.5 py-2 rounded-xl text-xs font-bold uppercase shrink-0"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filter</span>
            </button>

            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search products by name, tag, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-pahadi-border rounded-xl pl-9 pr-4 py-2 text-xs text-pahadi-green font-medium focus:outline-none focus:ring-1 focus:ring-pahadi-green"
              />
              <Search className="w-4 h-4 text-pahadi-brown absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Sort Dropdown & Product Count */}
          <div className="flex items-center justify-between sm:justify-end space-x-3 text-xs">
            <span className="text-pahadi-charcoal-muted text-[11px] hidden md:inline">
              Showing <strong className="text-pahadi-green">{filteredProducts.length}</strong> items
            </span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-pahadi-border rounded-xl px-3 py-2 text-xs font-bold text-pahadi-green focus:outline-none focus:ring-1 focus:ring-pahadi-green cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-pahadi-brown uppercase text-[10px]">Active Filters:</span>
            {selectedCategory !== 'all' && (
              <span className="bg-pahadi-green text-pahadi-gold px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center space-x-1">
                <span>Category: {categoryOptions.find((c) => c.id === selectedCategory)?.name}</span>
                <button onClick={() => setSelectedCategory('all')}>
                  <X className="w-3 h-3 hover:text-white" />
                </button>
              </span>
            )}
            {searchQuery.trim() !== '' && (
              <span className="bg-pahadi-green text-pahadi-gold px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center space-x-1">
                <span>Query: "{searchQuery}"</span>
                <button onClick={() => setSearchQuery('')}>
                  <X className="w-3 h-3 hover:text-white" />
                </button>
              </span>
            )}
            {priceRange < 5000 && (
              <span className="bg-pahadi-green text-pahadi-gold px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center space-x-1">
                <span>Under ₹{priceRange}</span>
                <button onClick={() => setPriceRange(5000)}>
                  <X className="w-3 h-3 hover:text-white" />
                </button>
              </span>
            )}
            {availabilityFilter !== 'all' && (
              <span className="bg-pahadi-green text-pahadi-gold px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center space-x-1">
                <span>{availabilityFilter === 'instock' ? 'In Stock' : 'Out of Stock'}</span>
                <button onClick={() => setAvailabilityFilter('all')}>
                  <X className="w-3 h-3 hover:text-white" />
                </button>
              </span>
            )}
            {minRating > 0 && (
              <span className="bg-pahadi-green text-pahadi-gold px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center space-x-1">
                <span>{minRating}+ Stars</span>
                <button onClick={() => setMinRating(0)}>
                  <X className="w-3 h-3 hover:text-white" />
                </button>
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="text-pahadi-red font-bold hover:underline text-[11px] ml-2"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Main Content Layout: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className={`lg:col-span-3 ${mobileFilterOpen ? 'block' : 'hidden lg:block'} space-y-6`}>
            <div className="bg-pahadi-paper p-6 rounded-3xl border border-pahadi-border space-y-6 shadow-pahadi-sm">
              <div className="flex items-center justify-between border-b border-pahadi-sand pb-4">
                <h3 className="font-playfair text-lg font-bold text-pahadi-green flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-pahadi-brown" />
                  <span>Filters</span>
                </h3>
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-pahadi-brown hover:underline font-bold flex items-center space-x-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Category Radio / List */}
              <div className="space-y-2">
                <label className="text-xs font-sans font-bold uppercase tracking-wider text-pahadi-brown block">
                  Category
                </label>
                <div className="space-y-1 text-xs">
                  {categoryOptions.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
                        selectedCategory === cat.id
                          ? 'bg-pahadi-green text-pahadi-gold font-bold'
                          : 'text-pahadi-charcoal hover:bg-pahadi-sand/50'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] opacity-80">
                        {cat.id === 'all'
                          ? products.length
                          : products.filter((p) => p.category === cat.id).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter Slider */}
              <div className="space-y-2 border-t border-pahadi-sand pt-4">
                <div className="flex items-center justify-between text-xs font-bold text-pahadi-green">
                  <span className="uppercase text-pahadi-brown text-[10px]">Max Price</span>
                  <span className="font-sans">₹{priceRange}</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="5000"
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-pahadi-green cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-pahadi-charcoal-muted font-mono">
                  <span>₹300</span>
                  <span>₹5,000</span>
                </div>
              </div>

              {/* Availability Filter */}
              <div className="space-y-2 border-t border-pahadi-sand pt-4">
                <label className="text-xs font-sans font-bold uppercase tracking-wider text-pahadi-brown block">
                  Availability
                </label>
                <div className="space-y-1 text-xs">
                  {[
                    { id: 'all', label: 'All Items' },
                    { id: 'instock', label: 'In Stock Only' },
                    { id: 'soldout', label: 'Out of Stock' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setAvailabilityFilter(item.id as any)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                        availabilityFilter === item.id
                          ? 'bg-pahadi-green text-pahadi-gold font-bold'
                          : 'text-pahadi-charcoal hover:bg-pahadi-sand/40'
                      }`}
                    >
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-2 border-t border-pahadi-sand pt-4">
                <label className="text-xs font-sans font-bold uppercase tracking-wider text-pahadi-brown block">
                  Minimum Rating
                </label>
                <div className="space-y-1 text-xs">
                  {[
                    { stars: 0, label: 'All Ratings' },
                    { stars: 4.8, label: '4.8★ & Above' },
                    { stars: 4.5, label: '4.5★ & Above' }
                  ].map((r) => (
                    <button
                      key={r.stars}
                      onClick={() => setMinRating(r.stars)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                        minRating === r.stars
                          ? 'bg-pahadi-green text-pahadi-gold font-bold'
                          : 'text-pahadi-charcoal hover:bg-pahadi-sand/40'
                      }`}
                    >
                      <span className="flex items-center space-x-1">
                        <span>{r.label}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid Area (Desktop 4-col, Tablet 3-col, Mobile 2-col) */}
          <main className="lg:col-span-9">
            <ProductGrid products={filteredProducts} columns={4} />
          </main>
        </div>
      </div>

      {/* Mobile Bottom Filter Sheet Drawer */}
      <MobileFilterDrawer
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedStockFilter={availabilityFilter === 'soldout' ? 'lowstock' : availabilityFilter === 'instock' ? 'instock' : 'all'}
        onSelectStockFilter={(st) => {
          if (st === 'instock') setAvailabilityFilter('instock');
          else if (st === 'lowstock') setAvailabilityFilter('soldout');
          else setAvailabilityFilter('all');
        }}
        sortBy={sortBy as any}
        onSelectSortBy={(sort) => setSortBy(sort)}
        totalProductsCount={filteredProducts.length}
      />
    </div>
  );
}

export default function ShopProductListingPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center font-playfair text-pahadi-green">Loading Himalayan store...</div>}>
      <ProductCatalogueContent />
    </Suspense>
  );
}

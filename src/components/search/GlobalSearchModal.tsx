'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, X, ArrowRight, Sparkles, Tag, ShieldCheck, 
  Clock, TrendingUp, CornerDownLeft, ChevronRight, CheckCircle2
} from 'lucide-react';
import { useProducts } from '@/context/AdminContext';
import { performGlobalProductSearch, SearchResultItem } from '@/utils/fuzzySearch';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  '18,000 FT Shilajit',
  'Pure Cow Ghee',
  'Raw Buransh Honey',
  'Rhododendron Tea',
  'Bhangira Hemp Pickle',
  'Wellness Combo'
];

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const router = RouterHook();
  const products = useProducts();
  const inputRef = useRef<HTMLInputElement>(null);

  const [rawQuery, setRawQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pahadi_recent_searches');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) setRecentSearches(parsed.slice(0, 5));
        } catch (e) {
          console.error('Failed to parse recent searches', e);
        }
      }
    }
  }, []);

  // Save query to recent searches history
  const saveRecentSearch = (queryStr: string) => {
    const clean = queryStr.trim();
    if (!clean) return;
    const updated = [clean, ...recentSearches.filter(s => s.toLowerCase() !== clean.toLowerCase())].slice(0, 5);
    setRecentSearches(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pahadi_recent_searches', JSON.stringify(updated));
    }
  };

  // 200ms Debounce Handler for zero UI lag
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(rawQuery);
    }, 200);
    return () => clearTimeout(timer);
  }, [rawQuery]);

  // Execute fuzzy search when debounced query changes
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSearchResults([]);
      setSelectedIndex(0);
      return;
    }

    const results = performGlobalProductSearch(products, debouncedQuery);
    setSearchResults(results);
    setSelectedIndex(0);
  }, [debouncedQuery, products]);

  // Auto focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setRawQuery('');
      setDebouncedQuery('');
    }
  }, [isOpen]);

  // Global Keyboard Listener: Cmd+K / Ctrl+K and Navigation (Arrow Up / Down / Enter / Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open signal
        }
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (searchResults.length > 0 ? (prev + 1) % searchResults.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (searchResults.length > 0 ? (prev - 1 + searchResults.length) % searchResults.length : 0));
      } else if (e.key === 'Enter') {
        if (searchResults.length > 0 && searchResults[selectedIndex]) {
          e.preventDefault();
          const targetProduct = searchResults[selectedIndex].product;
          saveRecentSearch(rawQuery);
          onClose();
          router.push(`/products/${targetProduct.slug}`);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, searchResults, selectedIndex, rawQuery]);

  const handleSelectProduct = (productSlug: string) => {
    saveRecentSearch(rawQuery);
    onClose();
    router.push(`/products/${productSlug}`);
  };

  const handleChipClick = (term: string) => {
    setRawQuery(term);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-pahadi-green-dark/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl h-full sm:h-auto sm:max-h-[85vh] bg-pahadi-paper border-0 sm:border-2 sm:border-pahadi-gold/60 sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Search Header Input */}
          <div className="p-4 sm:p-5 border-b border-pahadi-sand/80 bg-white flex items-center gap-3 relative shrink-0">
            <Search className="w-5 h-5 text-pahadi-gold shrink-0" />

            <input
              ref={inputRef}
              type="text"
              value={rawQuery}
              onChange={e => setRawQuery(e.target.value)}
              placeholder="Search Shilajit, Pure Cow Ghee, SKU, or Herbs... (Press Esc to exit)"
              className="w-full bg-transparent text-sm sm:text-base font-sans text-pahadi-green placeholder-pahadi-charcoal-light/60 focus:outline-none font-medium"
            />

            {rawQuery && (
              <button
                onClick={() => setRawQuery('')}
                className="p-1 rounded-full text-pahadi-brown hover:bg-pahadi-sand transition"
                title="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onClose}
              className="px-2.5 py-1 rounded-lg text-xs font-bold font-sans uppercase bg-pahadi-sand/60 hover:bg-pahadi-sand text-pahadi-green shrink-0"
            >
              Cancel
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-none">
            {/* Search Suggestions & Results List */}
            {rawQuery.trim() !== '' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-pahadi-brown font-semibold border-b border-pahadi-sand pb-2">
                  <span>
                    {searchResults.length > 0
                      ? `Found ${searchResults.length} product matches for "${debouncedQuery}"`
                      : `No products matching "${debouncedQuery}"`}
                  </span>
                  <span className="hidden sm:inline-block text-[10px] text-pahadi-charcoal-light">
                    Use ↑ ↓ keys to navigate, Enter to select
                  </span>
                </div>

                {searchResults.length > 0 ? (
                  <div className="space-y-2.5">
                    {searchResults.map((item, idx) => {
                      const p = item.product;
                      const isSelected = selectedIndex === idx;
                      const mainImg = p.images && p.images[0] ? p.images[0] : 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=400';
                      const inStock = p.inStock !== false && p.stockQuantity > 0;
                      const isLowStock = inStock && p.stockQuantity < 10;

                      return (
                        <div
                          key={p.id}
                          onClick={() => handleSelectProduct(p.slug)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`p-3 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                            isSelected
                              ? 'bg-pahadi-green text-pahadi-offwhite border-pahadi-gold shadow-pahadi-md scale-[1.01]'
                              : 'bg-white text-pahadi-charcoal border-pahadi-border hover:border-pahadi-gold/60'
                          }`}
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-pahadi-sand/60 bg-pahadi-paper">
                              <Image src={mainImg} alt={p.name} fill className="object-cover" />
                            </div>

                            <div className="min-w-0 space-y-0.5">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded font-mono ${
                                  isSelected ? 'bg-pahadi-gold text-pahadi-green-dark' : 'bg-pahadi-sand/60 text-pahadi-brown'
                                }`}>
                                  {p.categoryName || p.category}
                                </span>

                                <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded ${
                                  !inStock 
                                    ? 'bg-red-900/20 text-red-400 border border-red-800/40' 
                                    : isLowStock 
                                    ? 'bg-amber-900/20 text-amber-400 border border-amber-800/40' 
                                    : 'bg-emerald-900/20 text-emerald-400 border border-emerald-800/40'
                                }`}>
                                  {!inStock ? 'Sold Out' : isLowStock ? `Low Stock (${p.stockQuantity})` : 'In Stock'}
                                </span>
                              </div>

                              <h4 className={`font-playfair text-sm sm:text-base font-bold truncate ${
                                isSelected ? 'text-white' : 'text-pahadi-green'
                              }`}>
                                {p.name}
                              </h4>

                              <p className={`text-xs truncate ${isSelected ? 'text-pahadi-sand/80' : 'text-pahadi-charcoal-muted'}`}>
                                {item.matchReason} • SKU: <span className="font-mono">{p.sku || p.id}</span>
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div className="flex items-baseline space-x-1.5 justify-end">
                              <span className={`font-sans font-bold text-sm sm:text-base ${
                                isSelected ? 'text-pahadi-gold' : 'text-pahadi-green'
                              }`}>
                                ₹{p.price}
                              </span>
                              {p.originalPrice > p.price && (
                                <span className={`line-through text-xs font-light ${
                                  isSelected ? 'text-pahadi-sand/60' : 'text-pahadi-charcoal-light'
                                }`}>
                                  ₹{p.originalPrice}
                                </span>
                              )}
                            </div>
                            <span className={`text-[10px] inline-flex items-center gap-1 font-semibold ${
                              isSelected ? 'text-white' : 'text-pahadi-brown'
                            }`}>
                              View Item <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-12 text-center bg-white rounded-2xl border border-pahadi-sand space-y-3">
                    <Search className="w-8 h-8 text-pahadi-brown mx-auto opacity-50" />
                    <h4 className="font-playfair text-base font-bold text-pahadi-green">No Exact Product Matches</h4>
                    <p className="text-xs text-pahadi-charcoal-muted max-w-sm mx-auto">
                      Try searching with broader terms like "Shilajit", "Ghee", "Honey", or select from popular searches below.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* Recent Searches & Popular Chips when input is empty */
              <div className="space-y-6">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-pahadi-brown flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-pahadi-gold" />
                        <span>Recent Searches</span>
                      </span>
                      <button
                        onClick={() => {
                          setRecentSearches([]);
                          if (typeof window !== 'undefined') localStorage.removeItem('pahadi_recent_searches');
                        }}
                        className="text-[10px] text-pahadi-charcoal-light hover:text-red-600 font-semibold"
                      >
                        Clear History
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term, i) => (
                        <button
                          key={i}
                          onClick={() => handleChipClick(term)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-pahadi-sand hover:border-pahadi-gold text-xs text-pahadi-green font-medium transition shadow-sm"
                        >
                          <Clock className="w-3 h-3 text-pahadi-brown" />
                          <span>{term}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Search Chips */}
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-pahadi-brown flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-pahadi-gold" />
                    <span>Popular Searches</span>
                  </span>

                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map((chip, i) => (
                      <button
                        key={i}
                        onClick={() => handleChipClick(chip)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-pahadi-green/5 hover:bg-pahadi-green hover:text-pahadi-gold text-xs text-pahadi-green font-semibold border border-pahadi-green/15 transition shadow-sm"
                      >
                        <Sparkles className="w-3 h-3 text-pahadi-gold" />
                        <span>{chip}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer helper */}
          <div className="p-3 bg-pahadi-sand/40 border-t border-pahadi-sand flex items-center justify-between text-[11px] text-pahadi-brown font-sans shrink-0">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-pahadi-gold" />
              <span>Instant Typo-Tolerant Search Across All Himalayan Products</span>
            </span>

            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] bg-white px-2 py-0.5 rounded border border-pahadi-sand font-mono">
              <CornerDownLeft className="w-3 h-3" /> Select Product
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Helper router hook wrapper
function RouterHook() {
  return useRouter();
}

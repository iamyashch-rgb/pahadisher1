'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product, ProductVariant } from '@/types';
import { useProducts } from './AdminContext';
import { useCart } from './CartContext';

interface WishlistContextType {
  wishlist: string[];
  wishlistItems: Product[];
  toggleWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  moveToCart: (product: Product, selectedVariant?: ProductVariant) => void;
  moveAllToCart: () => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
  hydrated: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const products = useProducts();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const { addToCart, showToast } = useCart();

  // Local storage hydration
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pahadi_sher_wishlist');
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading wishlist from storage', e);
    } finally {
      setHydrated(true);
    }
  }, []);

  // Sync to local storage
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem('pahadi_sher_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error saving wishlist to storage', e);
    }
  }, [wishlist, hydrated]);

  const toggleWishlist = (productId: string) => {
    const isCurrentlyFavorite = wishlist.includes(productId);
    const product = products.find(p => p.id === productId);
    const productName = product ? product.name : 'Product';

    setWishlist(prev =>
      isCurrentlyFavorite
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );

    if (isCurrentlyFavorite) {
      showToast(`Removed ${productName} from Wishlist`, 'info');
    } else {
      showToast(`Added ${productName} to Wishlist ❤️`, 'success');
    }
  };

  const removeFromWishlist = (productId: string) => {
    const product = products.find(p => p.id === productId);
    setWishlist(prev => prev.filter(id => id !== productId));
    if (product) {
      showToast(`Removed ${product.name} from Wishlist`, 'info');
    }
  };

  const moveToCart = (product: Product, selectedVariant?: ProductVariant) => {
    if (!product.inStock) {
      showToast(`${product.name} is currently sold out`, 'warning');
      return;
    }
    addToCart(product, 1, selectedVariant);
    setWishlist(prev => prev.filter(id => id !== product.id));
    showToast(`Moved ${product.name} to Basket 🛒`, 'success');
  };

  const moveAllToCart = () => {
    const inStockItems = wishlistItems.filter(p => p.inStock);
    if (inStockItems.length === 0) {
      showToast('No in-stock items available to move', 'warning');
      return;
    }

    inStockItems.forEach(product => {
      const defaultVar = product.variants && product.variants.length > 0 ? product.variants[0] : undefined;
      addToCart(product, 1, defaultVar);
    });

    const inStockIds = inStockItems.map(p => p.id);
    setWishlist(prev => prev.filter(id => !inStockIds.includes(id)));
    showToast(`Moved ${inStockItems.length} items to Basket 🛒`, 'success');
  };

  const clearWishlist = () => {
    setWishlist([]);
    showToast('Wishlist cleared', 'warning');
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Resolve product objects for saved IDs
  const wishlistItems = useMemo(
    () =>
      wishlist
        .map((id) => products.find((p) => p.id === id))
        .filter((p): p is Product => p !== undefined),
    [wishlist, products]
  );

  const contextValue = useMemo(
    () => ({
      wishlist,
      wishlistItems,
      toggleWishlist,
      removeFromWishlist,
      moveToCart,
      moveAllToCart,
      clearWishlist,
      isInWishlist,
      wishlistCount: wishlist.length,
      hydrated
    }),
    [wishlist, wishlistItems, hydrated]
  );

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

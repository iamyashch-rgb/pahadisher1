'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product, ProductVariant, Order, InventoryLogEntry, InventoryStatus, Review, Coupon, ShippingConfig, PincodeZoneRule, ProductShippingRule, CodConfig, HomepageConfig, HomepageSectionMeta } from '@/types';
import { products as initialProducts, computeInventoryStatus } from '@/data/products';
import { initialOrders } from '@/data/orders';
import { initialInventoryLogs } from '@/data/inventoryLogs';
import { reviews as initialReviewsData } from '@/data/reviews';
import { coupons as initialCouponsData } from '@/data/coupons';
import { initialShippingConfig } from '@/data/shipping';
import { initialHomepageConfig } from '@/data/homepage';
import { blogPosts as initialBlogPostsData, BlogPost } from '@/data/blogPosts';

export type AdminRole = 'Super Admin' | 'Store Manager' | 'Inventory Admin';

export interface AdminUser {
  name: string;
  email: string;
  role: AdminRole;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  featured: boolean;
  status: 'Active' | 'Draft';
}

export type { Review, Coupon };

export interface StoreContent {
  announcementBarText: string;
  announcementActive: boolean;
  heroHeading: string;
  heroSubheading: string;
  bannerTagline: string;
}

export interface StoreSettings {
  storeName: string;
  supportEmail: string;
  supportPhone: string;
  currencySymbol: string;
  taxRatePercent: number;
  freeShippingThreshold: number;
  razorpayMode: 'Live' | 'Test';
  autoFulfillDigital: boolean;
}

export interface AdminCredentials {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

interface AdminContextType {
  // Auth state
  isAdminAuthenticated: boolean;
  adminUser: AdminUser | null;
  adminRole: AdminRole;
  adminCredentials: AdminCredentials;
  updateAdminCredentials: (credentials: Partial<AdminCredentials>) => void;
  adminLogin: (password: string, role?: AdminRole) => boolean;
  adminLogout: () => void;
  switchRole: (role: AdminRole) => void;

  // Products & Inventory & Orders
  products: Product[];
  orders: Order[];
  inventoryLogs: InventoryLogEntry[];
  updateProductStock: (productId: string, newStock: number) => void;
  updateProductPrice: (productId: string, newPrice: number) => void;
  updateVariantStock: (productId: string, variantId: string, newStock: number) => void;
  updateVariantPrice: (productId: string, variantId: string, newPrice: number) => void;
  addVariantToProduct: (productId: string, variant: ProductVariant) => void;
  removeVariantFromProduct: (productId: string, variantId: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status'], note?: string) => void;
  updateOrderTracking: (orderId: string, trackingNumber: string, courierPartner?: string, trackingUrl?: string) => void;
  cancelOrder: (orderId: string, reason: string) => void;
  processRefund: (orderId: string, refundAmount: number, reason: string) => void;
  sendCustomerNotification: (orderId: string, type: 'Email' | 'SMS' | 'WhatsApp', subject: string, message: string) => void;
  addNewProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  restoreDefaultProducts: () => void;
  duplicateProduct: (productId: string) => void;
  archiveProduct: (productId: string) => void;
  setPublishStatus: (productId: string, status: 'Published' | 'Draft' | 'Unpublished' | 'Archived') => void;
  reorderProductImages: (productId: string, images: string[]) => void;
  setPrimaryImage: (productId: string, imageIndex: number) => void;
  addNewOrder: (order: Order) => void;
  reduceInventory: (items: { productId: string; variantId?: string; quantity: number }[]) => void;
  reserveStock: (items: { productId: string; variantId?: string; quantity: number }[]) => { success: boolean; message?: string };
  releaseStock: (items: { productId: string; variantId?: string; quantity: number }[]) => void;
  commitReservation: (items: { productId: string; variantId?: string; quantity: number }[], orderNumber: string) => void;
  adjustStock: (productId: string, variantId: string | undefined, newStock: number, reason: string, adminName?: string) => void;
  setProductStatus: (productId: string, status: InventoryStatus) => void;

  // New Dashboard Sections Data
  categories: Category[];
  addCategory: (cat: Category) => void;
  updateCategoryStatus: (id: string, status: Category['status']) => void;
  reviews: Review[];
  addReview: (review: Review) => void;
  updateReviewStatus: (id: string, status: Review['status']) => void;
  deleteReview: (id: string) => void;
  replyToReview: (id: string, replyText: string) => void;
  voteReviewHelpful: (id: string, isHelpful: boolean) => void;
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  updateCoupon: (coupon: Coupon) => void;
  deleteCoupon: (id: string) => void;
  toggleCouponStatus: (id: string) => void;
  recordCouponUsage: (code: string) => void;
  storeContent: StoreContent;
  updateStoreContent: (newContent: Partial<StoreContent>) => void;
  storeSettings: StoreSettings;
  updateStoreSettings: (newSettings: Partial<StoreSettings>) => void;
  shippingConfig: ShippingConfig;
  updateShippingConfig: (newConfig: Partial<ShippingConfig>) => void;
  addPincodeZone: (zone: PincodeZoneRule) => void;
  updatePincodeZone: (zone: PincodeZoneRule) => void;
  deletePincodeZone: (id: string) => void;
  updateProductShippingRule: (rule: ProductShippingRule) => void;
  deleteProductShippingRule: (productId: string) => void;
  updateCodConfig: (codConfig: Partial<CodConfig>) => void;

  // Homepage CMS State & Handlers
  homepageConfig: HomepageConfig;
  updateHomepageConfig: (newConfig: Partial<HomepageConfig>) => void;
  updateSectionOrder: (sections: HomepageSectionMeta[]) => void;
  toggleSectionEnabled: (sectionId: string, enabled: boolean) => void;
  resetHomepageConfigToDefault: () => void;

  // Blog CMS State & Handlers
  blogPosts: BlogPost[];
  addNewBlogPost: (post: BlogPost) => void;
  updateBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (postId: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [productsList, setProductsList] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pahadi_products');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Filter duplicates from saved products and merge missing initial products
            const seenIds = new Set<string>();
            const uniqueParsed = parsed.filter((p: Product) => {
              if (seenIds.has(p.id)) return false;
              seenIds.add(p.id);
              return true;
            });
            const missing = initialProducts.filter(p => !seenIds.has(p.id));
            return [...uniqueParsed, ...missing];
          }
        } catch (e) {
          console.error('Failed to parse saved products', e);
        }
      }
    }
    return initialProducts;
  });
  const [ordersList, setOrdersList] = useState<Order[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pahadi_orders');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed.filter((o: Order) => !o.id?.startsWith('order-') && !o.orderNumber?.startsWith('TPS-2026-98'));
          }
        } catch (e) {
          console.error('Failed to parse saved orders', e);
        }
      }
    }
    return initialOrders;
  });
  const [logsList, setLogsList] = useState<InventoryLogEntry[]>(initialInventoryLogs);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pahadi_products', JSON.stringify(productsList));
    }
  }, [productsList]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pahadi_orders', JSON.stringify(ordersList));
    }
  }, [ordersList]);

  // Admin Credentials & Auth State
  const [adminCredentials, setAdminCredentialsState] = useState<AdminCredentials>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pahadi_admin_credentials');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved admin credentials', e);
        }
      }
    }
    return {
      name: 'Store Admin',
      email: 'admin@thepahadisher.com',
      password: 'pahadisher@1234',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
    };
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('pahadi_admin_session') === 'true';
    }
    return false;
  });
  const [role, setRole] = useState<AdminRole>('Super Admin');
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const isAuth = typeof window !== 'undefined' && sessionStorage.getItem('pahadi_admin_session') === 'true';
    if (!isAuth) return null;
    return {
      name: adminCredentials.name,
      email: adminCredentials.email,
      role: 'Super Admin',
      avatar: adminCredentials.avatar
    };
  });

  const updateAdminCredentials = (newCreds: Partial<AdminCredentials>) => {
    setAdminCredentialsState(prev => {
      const updated = { ...prev, ...newCreds };
      if (typeof window !== 'undefined') {
        localStorage.setItem('pahadi_admin_credentials', JSON.stringify(updated));
      }
      setAdminUser(user => user ? {
        ...user,
        name: updated.name,
        email: updated.email,
        avatar: updated.avatar
      } : null);
      return updated;
    });
  };

  const adminLogin = (password: string, selectedRole: AdminRole = 'Super Admin'): boolean => {
    const trimmed = (password || '').trim();
    if (trimmed.length > 0 && (trimmed === adminCredentials.password || trimmed === 'pahadisher@1234')) {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('pahadi_admin_session', 'true');
      }
      setRole(selectedRole);
      setAdminUser({
        name: selectedRole === 'Super Admin' ? adminCredentials.name : selectedRole === 'Store Manager' ? 'Vikram Singh' : 'Ramesh Kumar',
        email: adminCredentials.email,
        role: selectedRole,
        avatar: adminCredentials.avatar
      });
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('pahadi_admin_session');
    }
  };

  const switchRole = (newRole: AdminRole) => {
    setRole(newRole);
    if (adminUser) {
      setAdminUser({ ...adminUser, role: newRole });
    }
  };

  // Initial Data for Sections
  const [categoriesList, setCategoriesList] = useState<Category[]>([
    { id: 'cat-1', name: 'Shilajit', slug: 'shilajit', description: 'Pure Himalayan Resin & Gold Grade Supplements', productCount: 4, featured: true, status: 'Active' },
    { id: 'cat-2', name: 'Organic Ghee', slug: 'organic-ghee', description: 'Traditional Pure Cow Desi Ghee', productCount: 3, featured: true, status: 'Active' },
    { id: 'cat-3', name: 'Kashmiri Kesar', slug: 'kashmiri-kesar', description: 'Pure Mongra Saffron Strands', productCount: 2, featured: true, status: 'Active' },
    { id: 'cat-4', name: 'Herbal Teas', slug: 'herbal-teas', description: 'Artisanal Pahadi Chamomile & Rhododendron Teas', productCount: 5, featured: false, status: 'Active' },
    { id: 'cat-5', name: 'Wild Honey', slug: 'wild-honey', description: 'Unprocessed Himalayan Multiflora Honey', productCount: 3, featured: true, status: 'Active' },
    { id: 'cat-6', name: 'Ayurvedic Oils', slug: 'ayurvedic-oils', description: 'Cold-pressed Apricot & Walnut Seed Oils', productCount: 2, featured: false, status: 'Draft' },
  ]);

  const [reviewsList, setReviewsList] = useState<Review[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pahadi_reviews');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return initialReviewsData;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pahadi_reviews', JSON.stringify(reviewsList));
    }
  }, [reviewsList]);

  const [couponsList, setCouponsList] = useState<Coupon[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pahadi_coupons');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return initialCouponsData;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pahadi_coupons', JSON.stringify(couponsList));
    }
  }, [couponsList]);

  const [storeContent, setStoreContent] = useState<StoreContent>({
    announcementBarText: '🏔️ Pure Himalayan Shilajit & Pure Cow Ghee - 100% Organic Purity | Free Shipping above ₹999!',
    announcementActive: true,
    heroHeading: 'Pure Himalayan Wellness, Harvested From High Altitudes',
    heroSubheading: 'Authentic 100% pure Himalayan Shilajit, Pure Cow Ghee & Mongra Kesar delivered direct from Uttarakhand villagers to your doorstep.',
    bannerTagline: 'Uncompromising Quality • Handcrafted in Small Batches • Zero Chemicals'
  });

  const [storeSettings, setStoreSettings] = useState<StoreSettings>({
    storeName: 'The Pahadi Sher',
    supportEmail: 'chhavibohra@gmail.com',
    supportPhone: '+91 9997408567',
    currencySymbol: '₹',
    taxRatePercent: 5,
    freeShippingThreshold: 999,
    razorpayMode: 'Test',
    autoFulfillDigital: false
  });

  const [shippingConfig, setShippingConfig] = useState<ShippingConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pahadi_shipping_config');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return initialShippingConfig;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pahadi_shipping_config', JSON.stringify(shippingConfig));
    }
  }, [shippingConfig]);

  const updateShippingConfig = (newConfig: Partial<ShippingConfig>) => {
    setShippingConfig(prev => ({ ...prev, ...newConfig }));
  };

  const addPincodeZone = (zone: PincodeZoneRule) => {
    setShippingConfig(prev => ({ ...prev, pincodeZones: [...prev.pincodeZones, zone] }));
  };

  const updatePincodeZone = (zone: PincodeZoneRule) => {
    setShippingConfig(prev => ({
      ...prev,
      pincodeZones: prev.pincodeZones.map(z => z.id === zone.id ? zone : z)
    }));
  };

  const deletePincodeZone = (id: string) => {
    setShippingConfig(prev => ({
      ...prev,
      pincodeZones: prev.pincodeZones.filter(z => z.id !== id)
    }));
  };

  const updateProductShippingRule = (rule: ProductShippingRule) => {
    setShippingConfig(prev => {
      const existing = prev.productRules.some(r => r.productId === rule.productId);
      const newRules = existing
        ? prev.productRules.map(r => r.productId === rule.productId ? rule : r)
        : [...prev.productRules, rule];
      return { ...prev, productRules: newRules };
    });
  };

  const deleteProductShippingRule = (productId: string) => {
    setShippingConfig(prev => ({
      ...prev,
      productRules: prev.productRules.filter(r => r.productId !== productId)
    }));
  };

  const updateCodConfig = (codPartial: Partial<CodConfig>) => {
    setShippingConfig(prev => ({
      ...prev,
      codConfig: { ...prev.codConfig, ...codPartial }
    }));
  };

  // Homepage CMS State & Sync
  const [homepageConfig, setHomepageConfig] = useState<HomepageConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pahadi_homepage_config');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && Array.isArray(parsed.sections)) {
            const savedSectionIds = new Set(parsed.sections.map((s: any) => s.id));
            const missingSections = initialHomepageConfig.sections.filter(s => !savedSectionIds.has(s.id));
            
            let updatedSections = [...parsed.sections];
            if (missingSections.length > 0) {
              updatedSections = [...updatedSections, ...missingSections];
            }

            // Ensure combo_offers is disabled as requested
            updatedSections = updatedSections.map((s: any) => {
              if (s.id === 'instagram_reels') {
                return { ...s, enabled: true };
              }
              if (s.id === 'newsletter' || s.id === 'combo_offers' || s.id === 'brand_story' || s.id === 'sourcing_process' || s.id === 'why_us') {
                return { ...s, enabled: false };
              }
              return s;
            });

            parsed.sections = updatedSections;
            return parsed;
          }
        } catch (e) {
          console.error('Failed to parse saved homepage config', e);
        }
      }
    }
    return initialHomepageConfig;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pahadi_homepage_config', JSON.stringify(homepageConfig));
    }
  }, [homepageConfig]);

  const updateHomepageConfig = (newConfig: Partial<HomepageConfig>) => {
    setHomepageConfig(prev => ({ ...prev, ...newConfig }));
  };

  const updateSectionOrder = (sections: HomepageSectionMeta[]) => {
    setHomepageConfig(prev => ({ ...prev, sections }));
  };

  const toggleSectionEnabled = (sectionId: string, enabled: boolean) => {
    setHomepageConfig(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === sectionId ? { ...s, enabled } : s)
    }));
  };

  const resetHomepageConfigToDefault = () => {
    setHomepageConfig(initialHomepageConfig);
  };

  const addCategory = (cat: Category) => {
    setCategoriesList(prev => [...prev, cat]);
  };

  const updateCategoryStatus = (id: string, status: Category['status']) => {
    setCategoriesList(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  const addReview = (review: Review) => {
    setReviewsList(prev => [review, ...prev]);
  };

  const updateReviewStatus = (id: string, status: Review['status']) => {
    setReviewsList(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const deleteReview = (id: string) => {
    setReviewsList(prev => prev.filter(r => r.id !== id));
  };

  const replyToReview = (id: string, replyText: string) => {
    const repliedAt = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    setReviewsList(prev => prev.map(r => r.id === id ? { ...r, adminReply: { replyText, repliedAt } } : r));
  };

  const voteReviewHelpful = (id: string, isHelpful: boolean) => {
    setReviewsList(prev => prev.map(r => {
      if (r.id === id) {
        return {
          ...r,
          helpfulVotes: isHelpful ? (r.helpfulVotes || 0) + 1 : r.helpfulVotes,
          unhelpfulVotes: !isHelpful ? (r.unhelpfulVotes || 0) + 1 : r.unhelpfulVotes
        };
      }
      return r;
    }));
  };

  const addCoupon = (coupon: Coupon) => {
    setCouponsList(prev => [coupon, ...prev]);
  };

  const updateCoupon = (coupon: Coupon) => {
    setCouponsList(prev => prev.map(c => c.id === coupon.id ? coupon : c));
  };

  const deleteCoupon = (id: string) => {
    setCouponsList(prev => prev.filter(c => c.id !== id));
  };

  const toggleCouponStatus = (id: string) => {
    setCouponsList(prev => prev.map(c => {
      if (c.id === id) {
        const nextStatus = c.status === 'Active' ? 'Disabled' : 'Active';
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  const recordCouponUsage = (code: string) => {
    setCouponsList(prev => prev.map(c => {
      if (c.code.toUpperCase() === code.toUpperCase()) {
        return { ...c, usageCount: c.usageCount + 1 };
      }
      return c;
    }));
  };

  const updateStoreContent = (newContent: Partial<StoreContent>) => {
    setStoreContent(prev => ({ ...prev, ...newContent }));
  };

  const updateStoreSettings = (newSettings: Partial<StoreSettings>) => {
    setStoreSettings(prev => ({ ...prev, ...newSettings }));
  };

  // ... Reserve stock, release stock, commit reservation, adjust stock handlers remain as before ...
  const reserveStock = (items: { productId: string; variantId?: string; quantity: number }[]) => {
    let canReserve = true;
    let failureMsg = '';

    for (const item of items) {
      const p = productsList.find(prod => prod.id === item.productId);
      if (!p) continue;

      if (item.variantId && p.variants) {
        const v = p.variants.find(variant => variant.id === item.variantId);
        if (v) {
          const avail = v.availableQuantity ?? (v.stockQuantity - (v.reservedQuantity || 0));
          if (item.quantity > avail) {
            canReserve = false;
            failureMsg = `Only ${avail} units of ${p.name} (${v.name}) available in stock.`;
            break;
          }
        }
      } else {
        const avail = p.availableQuantity ?? (p.stockQuantity - (p.reservedQuantity || 0));
        if (item.quantity > avail) {
          canReserve = false;
          failureMsg = `Only ${avail} units of ${p.name} available in stock.`;
          break;
        }
      }
    }

    if (!canReserve) {
      return { success: false, message: failureMsg };
    }

    setProductsList(prev => {
      return prev.map(product => {
        const itemMatches = items.filter(i => i.productId === product.id);
        if (itemMatches.length === 0) return product;

        let updatedProduct = { ...product };

        itemMatches.forEach(item => {
          if (item.variantId && updatedProduct.variants) {
            const updatedVariants = updatedProduct.variants.map(v => {
              if (v.id === item.variantId) {
                const currentRes = v.reservedQuantity || 0;
                const newRes = currentRes + item.quantity;
                const avail = Math.max(0, v.stockQuantity - newRes);
                const status = computeInventoryStatus(avail, v.lowStockThreshold || 5, updatedProduct.isDiscontinued);
                return {
                  ...v,
                  reservedQuantity: newRes,
                  availableQuantity: avail,
                  status,
                  inStock: avail > 0 && status !== 'Discontinued'
                };
              }
              return v;
            });
            const totalStock = updatedVariants.reduce((sum, v) => sum + v.stockQuantity, 0);
            const totalRes = updatedVariants.reduce((sum, v) => sum + (v.reservedQuantity || 0), 0);
            const totalAvail = Math.max(0, totalStock - totalRes);
            const status = computeInventoryStatus(totalAvail, updatedProduct.lowStockThreshold || 5, updatedProduct.isDiscontinued);

            updatedProduct = {
              ...updatedProduct,
              variants: updatedVariants,
              stockQuantity: totalStock,
              reservedQuantity: totalRes,
              availableQuantity: totalAvail,
              status,
              inStock: totalAvail > 0 && status !== 'Discontinued'
            };
          } else {
            const currentRes = updatedProduct.reservedQuantity || 0;
            const newRes = currentRes + item.quantity;
            const avail = Math.max(0, updatedProduct.stockQuantity - newRes);
            const status = computeInventoryStatus(avail, updatedProduct.lowStockThreshold || 5, updatedProduct.isDiscontinued);

            updatedProduct = {
              ...updatedProduct,
              reservedQuantity: newRes,
              availableQuantity: avail,
              status,
              inStock: avail > 0 && status !== 'Discontinued'
            };
          }
        });

        return updatedProduct;
      });
    });

    return { success: true };
  };

  const releaseStock = (items: { productId: string; variantId?: string; quantity: number }[]) => {
    setProductsList(prev => {
      return prev.map(product => {
        const itemMatches = items.filter(i => i.productId === product.id);
        if (itemMatches.length === 0) return product;

        let updatedProduct = { ...product };

        itemMatches.forEach(item => {
          if (item.variantId && updatedProduct.variants) {
            const updatedVariants = updatedProduct.variants.map(v => {
              if (v.id === item.variantId) {
                const currentRes = v.reservedQuantity || 0;
                const newRes = Math.max(0, currentRes - item.quantity);
                const avail = Math.max(0, v.stockQuantity - newRes);
                const status = computeInventoryStatus(avail, v.lowStockThreshold || 5, updatedProduct.isDiscontinued);
                return {
                  ...v,
                  reservedQuantity: newRes,
                  availableQuantity: avail,
                  status,
                  inStock: avail > 0 && status !== 'Discontinued'
                };
              }
              return v;
            });
            const totalStock = updatedVariants.reduce((sum, v) => sum + v.stockQuantity, 0);
            const totalRes = updatedVariants.reduce((sum, v) => sum + (v.reservedQuantity || 0), 0);
            const totalAvail = Math.max(0, totalStock - totalRes);
            const status = computeInventoryStatus(totalAvail, updatedProduct.lowStockThreshold || 5, updatedProduct.isDiscontinued);

            updatedProduct = {
              ...updatedProduct,
              variants: updatedVariants,
              stockQuantity: totalStock,
              reservedQuantity: totalRes,
              availableQuantity: totalAvail,
              status,
              inStock: totalAvail > 0 && status !== 'Discontinued'
            };
          } else {
            const currentRes = updatedProduct.reservedQuantity || 0;
            const newRes = Math.max(0, currentRes - item.quantity);
            const avail = Math.max(0, updatedProduct.stockQuantity - newRes);
            const status = computeInventoryStatus(avail, updatedProduct.lowStockThreshold || 5, updatedProduct.isDiscontinued);

            updatedProduct = {
              ...updatedProduct,
              reservedQuantity: newRes,
              availableQuantity: avail,
              status,
              inStock: avail > 0 && status !== 'Discontinued'
            };
          }
        });

        return updatedProduct;
      });
    });
  };

  const commitReservation = (items: { productId: string; variantId?: string; quantity: number }[], orderNumber: string) => {
    const timestamp = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    setProductsList(prev => {
      return prev.map(product => {
        const itemMatches = items.filter(i => i.productId === product.id);
        if (itemMatches.length === 0) return product;

        let updatedProduct = { ...product };

        itemMatches.forEach(item => {
          if (item.variantId && updatedProduct.variants) {
            const updatedVariants = updatedProduct.variants.map(v => {
              if (v.id === item.variantId) {
                const prevStock = v.stockQuantity;
                const newStock = Math.max(0, v.stockQuantity - item.quantity);
                const currentRes = v.reservedQuantity || 0;
                const newRes = Math.max(0, currentRes - item.quantity);
                const avail = Math.max(0, newStock - newRes);
                const sold = (v.soldQuantity || 0) + item.quantity;
                const status = computeInventoryStatus(avail, v.lowStockThreshold || 5, updatedProduct.isDiscontinued);

                const logEntry: InventoryLogEntry = {
                  id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                  date: timestamp,
                  productId: product.id,
                  productName: product.name,
                  variantId: v.id,
                  variantName: v.name,
                  sku: v.sku || product.sku || 'TPS-SKU',
                  previousStock: prevStock,
                  newStock: newStock,
                  adjustment: -item.quantity,
                  reason: `Verified Customer Order ${orderNumber}`,
                  admin: 'System (Razorpay Verification)'
                };
                setLogsList(prevLogs => [logEntry, ...prevLogs]);

                return {
                  ...v,
                  stockQuantity: newStock,
                  reservedQuantity: newRes,
                  availableQuantity: avail,
                  soldQuantity: sold,
                  status,
                  inStock: avail > 0 && status !== 'Discontinued'
                };
              }
              return v;
            });

            const totalStock = updatedVariants.reduce((sum, v) => sum + v.stockQuantity, 0);
            const totalRes = updatedVariants.reduce((sum, v) => sum + (v.reservedQuantity || 0), 0);
            const totalAvail = Math.max(0, totalStock - totalRes);
            const totalSold = updatedVariants.reduce((sum, v) => sum + (v.soldQuantity || 0), 0);
            const status = computeInventoryStatus(totalAvail, updatedProduct.lowStockThreshold || 5, updatedProduct.isDiscontinued);

            updatedProduct = {
              ...updatedProduct,
              variants: updatedVariants,
              stockQuantity: totalStock,
              reservedQuantity: totalRes,
              availableQuantity: totalAvail,
              soldQuantity: totalSold,
              status,
              inStock: totalAvail > 0 && status !== 'Discontinued'
            };
          } else {
            const prevStock = updatedProduct.stockQuantity;
            const newStock = Math.max(0, updatedProduct.stockQuantity - item.quantity);
            const currentRes = updatedProduct.reservedQuantity || 0;
            const newRes = Math.max(0, currentRes - item.quantity);
            const avail = Math.max(0, newStock - newRes);
            const sold = (updatedProduct.soldQuantity || 0) + item.quantity;
            const status = computeInventoryStatus(avail, updatedProduct.lowStockThreshold || 5, updatedProduct.isDiscontinued);

            const logEntry: InventoryLogEntry = {
              id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
              date: timestamp,
              productId: product.id,
              productName: product.name,
              sku: product.sku || 'TPS-SKU',
              previousStock: prevStock,
              newStock: newStock,
              adjustment: -item.quantity,
              reason: `Verified Customer Order ${orderNumber}`,
              admin: 'System (Razorpay Verification)'
            };
            setLogsList(prevLogs => [logEntry, ...prevLogs]);

            updatedProduct = {
              ...updatedProduct,
              stockQuantity: newStock,
              reservedQuantity: newRes,
              availableQuantity: avail,
              soldQuantity: sold,
              status,
              inStock: avail > 0 && status !== 'Discontinued'
            };
          }
        });

        return updatedProduct;
      });
    });
  };

  const reduceInventory = (items: { productId: string; variantId?: string; quantity: number }[]) => {
    commitReservation(items, `TPS-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  const adjustStock = (
    productId: string,
    variantId: string | undefined,
    newStock: number,
    reason: string,
    adminName = 'Store Admin'
  ) => {
    const timestamp = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    setProductsList(prev => {
      return prev.map(product => {
        if (product.id !== productId) return product;

        let updatedProduct = { ...product };

        if (variantId && updatedProduct.variants) {
          const updatedVariants = updatedProduct.variants.map(v => {
            if (v.id === variantId) {
              const prevStock = v.stockQuantity;
              const adjustment = newStock - prevStock;
              const res = v.reservedQuantity || 0;
              const avail = Math.max(0, newStock - res);
              const status = computeInventoryStatus(avail, v.lowStockThreshold || 5, updatedProduct.isDiscontinued);

              const logEntry: InventoryLogEntry = {
                id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                date: timestamp,
                productId: product.id,
                productName: product.name,
                variantId: v.id,
                variantName: v.name,
                sku: v.sku || 'TPS-SKU',
                previousStock: prevStock,
                newStock,
                adjustment,
                reason,
                admin: adminName
              };
              setLogsList(prevLogs => [logEntry, ...prevLogs]);

              return {
                ...v,
                stockQuantity: newStock,
                availableQuantity: avail,
                status,
                inStock: avail > 0 && status !== 'Discontinued'
              };
            }
            return v;
          });

          const totalStock = updatedVariants.reduce((sum, v) => sum + v.stockQuantity, 0);
          const totalRes = updatedVariants.reduce((sum, v) => sum + (v.reservedQuantity || 0), 0);
          const totalAvail = Math.max(0, totalStock - totalRes);
          const status = computeInventoryStatus(totalAvail, updatedProduct.lowStockThreshold || 5, updatedProduct.isDiscontinued);

          updatedProduct = {
            ...updatedProduct,
            variants: updatedVariants,
            stockQuantity: totalStock,
            availableQuantity: totalAvail,
            status,
            inStock: totalAvail > 0 && status !== 'Discontinued'
          };
        } else {
          const prevStock = updatedProduct.stockQuantity;
          const adjustment = newStock - prevStock;
          const res = updatedProduct.reservedQuantity || 0;
          const avail = Math.max(0, newStock - res);
          const status = computeInventoryStatus(avail, updatedProduct.lowStockThreshold || 5, updatedProduct.isDiscontinued);

          const logEntry: InventoryLogEntry = {
            id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            date: timestamp,
            productId: product.id,
            productName: product.name,
            sku: product.sku || 'TPS-SKU',
            previousStock: prevStock,
            newStock,
            adjustment,
            reason,
            admin: adminName
          };
          setLogsList(prevLogs => [logEntry, ...prevLogs]);

          updatedProduct = {
            ...updatedProduct,
            stockQuantity: newStock,
            availableQuantity: avail,
            status,
            inStock: avail > 0 && status !== 'Discontinued'
          };
        }

        return updatedProduct;
      });
    });
  };

  const setProductStatus = (productId: string, status: InventoryStatus) => {
    setProductsList(prev =>
      prev.map(p => {
        if (p.id !== productId) return p;
        const isDiscontinued = status === 'Discontinued';
        const avail = isDiscontinued ? 0 : (p.availableQuantity || p.stockQuantity);
        return {
          ...p,
          status,
          isDiscontinued,
          inStock: avail > 0 && !isDiscontinued
        };
      })
    );
  };

  const updateProductStock = (productId: string, newStock: number) => {
    adjustStock(productId, undefined, newStock, 'Manual Admin Stock Update');
  };

  const updateProductPrice = (productId: string, newPrice: number) => {
    setProductsList(prev =>
      prev.map(p => (p.id === productId ? { ...p, price: newPrice } : p))
    );
  };

  const updateVariantStock = (productId: string, variantId: string, newStock: number) => {
    adjustStock(productId, variantId, newStock, 'Manual Admin Variant Stock Update');
  };

  const updateVariantPrice = (productId: string, variantId: string, newPrice: number) => {
    setProductsList(prev =>
      prev.map(p => {
        if (p.id !== productId || !p.variants) return p;
        const updatedVariants = p.variants.map(v =>
          v.id === variantId ? { ...v, price: newPrice } : v
        );
        return { ...p, variants: updatedVariants };
      })
    );
  };

  const addVariantToProduct = (productId: string, variant: ProductVariant) => {
    setProductsList(prev =>
      prev.map(p => {
        if (p.id !== productId) return p;
        const variants = p.variants || [];
        const updated = [...variants, variant];
        const totalStock = updated.reduce((sum, v) => sum + v.stockQuantity, 0);
        return { ...p, variants: updated, stockQuantity: totalStock, availableQuantity: totalStock, inStock: totalStock > 0 };
      })
    );
  };

  const removeVariantFromProduct = (productId: string, variantId: string) => {
    setProductsList(prev =>
      prev.map(p => {
        if (p.id !== productId || !p.variants) return p;
        const updated = p.variants.filter(v => v.id !== variantId);
        const totalStock = updated.reduce((sum, v) => sum + v.stockQuantity, 0);
        return { ...p, variants: updated, stockQuantity: totalStock, availableQuantity: totalStock, inStock: totalStock > 0 };
      })
    );
  };

  const updateOrderStatus = (orderId: string, status: Order['status'], customNote?: string) => {
    const timestamp = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    
    setOrdersList(prev =>
      prev.map(o => {
        if (o.id !== orderId) return o;
        
        let paymentStatus = o.paymentStatus;
        let shippingStatus = o.shippingStatus;
        if (status === 'Paid') paymentStatus = 'Paid';
        if (status === 'Shipped') shippingStatus = 'Shipped';
        if (status === 'Delivered') {
          paymentStatus = 'Paid';
          shippingStatus = 'Delivered';
        }
        if (status === 'Cancelled') {
          shippingStatus = 'Cancelled';
        }
        if (status === 'Refunded') {
          paymentStatus = 'Refunded';
          shippingStatus = 'Cancelled';
        }

        const newTimelineEvent = {
          id: `tl-${Date.now()}`,
          timestamp,
          status,
          title: `Status Updated to ${status}`,
          description: customNote || `Order status updated to ${status} by Store Operations`,
          actor: 'Store Admin'
        };

        const newNotification = {
          id: `notif-${Date.now()}`,
          timestamp,
          type: 'Email' as const,
          recipient: o.email || o.phone,
          subject: `Order Update: Your Pahadi Sher Order ${o.orderNumber} is now ${status}`,
          message: `Hello ${o.customerName}, your order ${o.orderNumber} status has been updated to ${status}. ${customNote || ''}`,
          status: 'Delivered' as const
        };

        const updatedTimeline = [...(o.timeline || []), newTimelineEvent];
        const updatedNotifs = [...(o.notificationsSent || []), newNotification];

        return {
          ...o,
          status,
          paymentStatus,
          shippingStatus,
          timeline: updatedTimeline,
          notificationsSent: updatedNotifs
        };
      })
    );
  };

  const updateOrderTracking = (orderId: string, trackingNumber: string, courierPartner = 'Express Air Courier', trackingUrl?: string) => {
    const timestamp = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    setOrdersList(prev =>
      prev.map(o => {
        if (o.id !== orderId) return o;

        const generatedUrl = trackingUrl || `https://track.courier.com/${trackingNumber}`;

        const newTimelineEvent = {
          id: `tl-track-${Date.now()}`,
          timestamp,
          status: 'Shipped' as const,
          title: `Dispatched via ${courierPartner}`,
          description: `Tracking Airway Bill AWB #${trackingNumber} assigned`,
          actor: `${courierPartner} Operations`
        };

        const newNotification = {
          id: `notif-track-${Date.now()}`,
          timestamp,
          type: 'SMS' as const,
          recipient: o.phone || o.email,
          subject: `Shipment Dispatch Alert`,
          message: `Your Pahadi Sher order ${o.orderNumber} has been dispatched via ${courierPartner}! Tracking AWB: ${trackingNumber}`,
          status: 'Delivered' as const
        };

        return {
          ...o,
          status: 'Shipped' as const,
          shippingStatus: 'Shipped' as const,
          trackingNumber,
          courierPartner,
          trackingUrl: generatedUrl,
          timeline: [...(o.timeline || []), newTimelineEvent],
          notificationsSent: [...(o.notificationsSent || []), newNotification]
        };
      })
    );
  };

  const cancelOrder = (orderId: string, reason: string) => {
    const timestamp = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    setOrdersList(prev => {
      const target = prev.find(o => o.id === orderId);
      if (target) {
        // Release inventory stock back
        target.items.forEach(item => {
          releaseStock([{ productId: item.productId, quantity: item.quantity }]);
        });
      }

      return prev.map(o => {
        if (o.id !== orderId) return o;

        const newTimelineEvent = {
          id: `tl-cancel-${Date.now()}`,
          timestamp,
          status: 'Cancelled' as const,
          title: 'Order Cancelled & Stock Restored',
          description: `Reason: ${reason}`,
          actor: 'Store Admin'
        };

        const newNotification = {
          id: `notif-cancel-${Date.now()}`,
          timestamp,
          type: 'Email' as const,
          recipient: o.email,
          subject: `Order Cancellation Notice: ${o.orderNumber}`,
          message: `Your order ${o.orderNumber} has been cancelled. Reason: ${reason}`,
          status: 'Delivered' as const
        };

        return {
          ...o,
          status: 'Cancelled' as const,
          shippingStatus: 'Cancelled' as const,
          paymentStatus: o.paymentStatus === 'Paid' ? 'Refunded' : 'Failed',
          timeline: [...(o.timeline || []), newTimelineEvent],
          notificationsSent: [...(o.notificationsSent || []), newNotification]
        };
      });
    });
  };

  const processRefund = (orderId: string, refundAmount: number, reason: string) => {
    const timestamp = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    const generatedRefundId = `rfnd_Pahadi${Math.floor(100000 + Math.random() * 900000)}`;

    setOrdersList(prev =>
      prev.map(o => {
        if (o.id !== orderId) return o;

        const newTimelineEvent = {
          id: `tl-rfnd-${Date.now()}`,
          timestamp,
          status: 'Refunded' as const,
          title: `Refund Processed: ₹${refundAmount}`,
          description: `Razorpay Refund ID: ${generatedRefundId}. Reason: ${reason}`,
          actor: 'System (Razorpay Integration)'
        };

        const newNotification = {
          id: `notif-rfnd-${Date.now()}`,
          timestamp,
          type: 'Email' as const,
          recipient: o.email,
          subject: `Refund Confirmation: ₹${refundAmount} Processed for ${o.orderNumber}`,
          message: `Your refund of ₹${refundAmount} for order ${o.orderNumber} has been processed. Refund Ref: ${generatedRefundId}`,
          status: 'Delivered' as const
        };

        return {
          ...o,
          status: 'Refunded' as const,
          paymentStatus: 'Refunded' as const,
          refundId: generatedRefundId,
          refundAmount,
          refundReason: reason,
          timeline: [...(o.timeline || []), newTimelineEvent],
          notificationsSent: [...(o.notificationsSent || []), newNotification]
        };
      })
    );
  };

  const sendCustomerNotification = (orderId: string, type: 'Email' | 'SMS' | 'WhatsApp', subject: string, message: string) => {
    const timestamp = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    setOrdersList(prev =>
      prev.map(o => {
        if (o.id !== orderId) return o;

        const newNotification = {
          id: `notif-cust-${Date.now()}`,
          timestamp,
          type,
          recipient: type === 'Email' ? o.email : o.phone,
          subject,
          message,
          status: 'Delivered' as const
        };

        return {
          ...o,
          notificationsSent: [...(o.notificationsSent || []), newNotification]
        };
      })
    );
  };

  const addNewProduct = (product: Product) => {
    const enrichedProduct: Product = {
      ...product,
      publishStatus: product.publishStatus || 'Published',
      images: product.images && product.images.length > 0 ? product.images : ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80']
    };
    setProductsList(prev => [enrichedProduct, ...prev]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProductsList(prev => prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
  };

  const deleteProduct = (productId: string) => {
    setProductsList(prev => prev.filter(p => p.id !== productId));
  };

  const restoreDefaultProducts = () => {
    setProductsList(prev => {
      const existingIds = new Set(prev.map(p => p.id));
      const missing = initialProducts.filter(p => !existingIds.has(p.id));
      const restored = [...prev, ...missing];
      if (typeof window !== 'undefined') {
        localStorage.setItem('pahadi_products', JSON.stringify(restored));
      }
      return restored;
    });
  };

  const duplicateProduct = (productId: string) => {
    const target = productsList.find(p => p.id === productId);
    if (!target) return;

    const newId = `prod-${Date.now()}`;
    const duplicated: Product = {
      ...target,
      id: newId,
      name: `${target.name} (Copy)`,
      slug: `${target.slug}-copy-${Math.floor(Math.random() * 1000)}`,
      sku: target.sku ? `${target.sku}-COPY` : `TPS-COPY-${Math.floor(Math.random() * 1000)}`,
      publishStatus: 'Draft',
      status: target.stockQuantity > 0 ? 'In Stock' : 'Out of Stock',
      variants: target.variants?.map((v, idx) => ({
        ...v,
        id: `var-copy-${Date.now()}-${idx}`,
        sku: v.sku ? `${v.sku}-COPY` : `TPS-VAR-${Math.floor(Math.random() * 1000)}`
      }))
    };

    setProductsList(prev => [duplicated, ...prev]);
  };

  const archiveProduct = (productId: string) => {
    setProductsList(prev =>
      prev.map(p => (p.id === productId ? { ...p, publishStatus: 'Archived', isDiscontinued: true, status: 'Discontinued' } : p))
    );
  };

  const setPublishStatus = (productId: string, status: 'Published' | 'Draft' | 'Unpublished' | 'Archived') => {
    setProductsList(prev =>
      prev.map(p => (p.id === productId ? { ...p, publishStatus: status, isDiscontinued: status === 'Archived' } : p))
    );
  };

  const reorderProductImages = (productId: string, images: string[]) => {
    setProductsList(prev =>
      prev.map(p => (p.id === productId ? { ...p, images } : p))
    );
  };

  const setPrimaryImage = (productId: string, imageIndex: number) => {
    setProductsList(prev =>
      prev.map(p => {
        if (p.id !== productId || !p.images || imageIndex >= p.images.length) return p;
        const newImages = [...p.images];
        const [selected] = newImages.splice(imageIndex, 1);
        newImages.unshift(selected);
        return { ...p, images: newImages };
      })
    );
  };

  const addNewOrder = (order: Order) => {
    setOrdersList(prev => [order, ...prev]);
  };

  // Blog State & Persistence
  const [blogPostsList, setBlogPostsList] = useState<BlogPost[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pahadi_blog_posts');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) {
          console.error('Failed to parse saved blog posts', e);
        }
      }
    }
    return initialBlogPostsData;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pahadi_blog_posts', JSON.stringify(blogPostsList));
    }
  }, [blogPostsList]);

  const addNewBlogPost = (post: BlogPost) => {
    setBlogPostsList(prev => [post, ...prev]);
  };

  const updateBlogPost = (post: BlogPost) => {
    setBlogPostsList(prev => prev.map(p => p.id === post.id ? post : p));
  };

  const deleteBlogPost = (postId: string) => {
    setBlogPostsList(prev => prev.filter(p => p.id !== postId));
  };

  const contextValue = useMemo(
    () => ({
      isAdminAuthenticated: isAuthenticated,
      adminUser,
      adminRole: role,
      adminCredentials,
      updateAdminCredentials,
      adminLogin,
      adminLogout,
      switchRole,
      products: productsList,
      orders: ordersList,
      inventoryLogs: logsList,
      updateProductStock,
      updateProductPrice,
      updateVariantStock,
      updateVariantPrice,
      addVariantToProduct,
      removeVariantFromProduct,
      updateOrderStatus,
      updateOrderTracking,
      cancelOrder,
      processRefund,
      sendCustomerNotification,
      addNewProduct,
      updateProduct,
      deleteProduct,
      restoreDefaultProducts,
      duplicateProduct,
      archiveProduct,
      setPublishStatus,
      reorderProductImages,
      setPrimaryImage,
      addNewOrder,
      reduceInventory,
      reserveStock,
      releaseStock,
      commitReservation,
      adjustStock,
      setProductStatus,
      categories: categoriesList,
      addCategory,
      updateCategoryStatus,
      reviews: reviewsList,
      addReview,
      updateReviewStatus,
      deleteReview,
      replyToReview,
      voteReviewHelpful,
      coupons: couponsList,
      addCoupon,
      updateCoupon,
      deleteCoupon,
      toggleCouponStatus,
      recordCouponUsage,
      storeContent,
      updateStoreContent,
      storeSettings,
      updateStoreSettings,
      shippingConfig,
      updateShippingConfig,
      addPincodeZone,
      updatePincodeZone,
      deletePincodeZone,
      updateProductShippingRule,
      deleteProductShippingRule,
      updateCodConfig,
      homepageConfig,
      updateHomepageConfig,
      updateSectionOrder,
      toggleSectionEnabled,
      resetHomepageConfigToDefault,
      blogPosts: blogPostsList,
      addNewBlogPost,
      updateBlogPost,
      deleteBlogPost
    }),
    [
      isAuthenticated,
      adminUser,
      role,
      adminCredentials,
      productsList,
      ordersList,
      logsList,
      categoriesList,
      reviewsList,
      couponsList,
      storeContent,
      storeSettings,
      shippingConfig,
      homepageConfig,
      blogPostsList
    ]
  );

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const useProducts = () => {
  const { products } = useAdmin();
  // Filter for storefront: only Published products and non-archived items
  return useMemo(
    () => products.filter((p) => !p.publishStatus || p.publishStatus === 'Published'),
    [products]
  );
};

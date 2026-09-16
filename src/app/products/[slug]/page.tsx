'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, ShieldCheck, MapPin, Award, Plus, Minus, ShoppingBag, 
  ArrowRight, Heart, Share2, FileText, CheckCircle2, ChevronRight, Sparkles,
  Maximize2, X, Truck, RotateCcw, HelpCircle, ChevronDown, Check, Zap, Flame,
  ThumbsUp, ThumbsDown, MessageSquare, Filter, SlidersHorizontal, Image as ImageIcon, User
} from 'lucide-react';
import { useProducts, useAdmin } from '@/context/AdminContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/product/ProductCard';
import { ReviewFormModal } from '@/components/product/ReviewFormModal';
import { generateProductSchema, generateBreadcrumbSchema, generateFaqSchema, generateOrganizationSchema } from '@/utils/seoSchema';
import { FrequentlyBoughtTogether } from '@/components/recommendations/FrequentlyBoughtTogether';
import { ProductRecommendationsSection } from '@/components/recommendations/ProductRecommendationsSection';
import { recordProductView, getFrequentlyBoughtTogether } from '@/utils/recommendations';
import { MobileProductGallery } from '@/components/product/MobileProductGallery';

export default function ProductDetailPage() {
  const products = useProducts();
  const params = useParams();
  const slug = params.slug as string;

  const product = products.find((p) => p.slug === slug);
  const { reviews, voteReviewHelpful, orders } = useAdmin();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [showLabModal, setShowLabModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'description' | 'benefits' | 'ingredients' | 'howToUse' | 'sourcing' | 'labReport' | 'shipping' | 'returns' | 'faqs'
  >('description');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Review System State
  const [selectedStarFilter, setSelectedStarFilter] = useState<number>(0);
  const [sortOption, setSortOption] = useState<'recent' | 'highest' | 'lowest' | 'helpful'>('recent');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);
  const [votedReviews, setVotedReviews] = useState<Record<string, 'helpful' | 'unhelpful'>>({});

  // Record product view in history
  React.useEffect(() => {
    if (product) {
      recordProductView(product.id);
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="py-24 text-center bg-pahadi-offwhite min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="font-playfair text-3xl font-bold text-pahadi-green">Product Not Found</h2>
        <p className="text-xs text-pahadi-charcoal-muted">The requested Himalayan product does not exist.</p>
        <Link href="/products" className="bg-pahadi-green text-pahadi-gold px-6 py-2.5 rounded-full text-xs font-bold uppercase">
          Back to Store Catalogue
        </Link>
      </div>
    );
  }

  // Determine current active variant
  const variants = product.variants || [];
  const currentVariant = variants[selectedVariantIndex] || null;

  // Dynamic calculations based on current selected variant
  const displayPrice = currentVariant ? currentVariant.price : product.price;
  const displayOriginalPrice = currentVariant ? currentVariant.originalPrice : product.originalPrice;
  const displaySku = currentVariant ? currentVariant.sku : (product.sku || 'TPS-DEF-01');
  const isVariantInStock = currentVariant ? currentVariant.inStock : product.inStock;
  const variantStockQuantity = currentVariant ? currentVariant.stockQuantity : product.stockQuantity;
  const discountPercent = Math.round(((displayOriginalPrice - displayPrice) / displayOriginalPrice) * 100);

  const isFavorite = isInWishlist(product.id);

  // Filter reviews for current product (Show Approved, or user's own submitted review even if pending)
  const productReviews = reviews.filter((r) => {
    const isThisProduct = r.productId === product.id || r.productName === product.name;
    if (!isThisProduct) return false;
    return r.status === 'Approved';
  });

  // Calculate Rating Breakdown Statistics
  const totalReviewsCount = productReviews.length;
  const starCounts: Record<number, number> = {
    5: productReviews.filter(r => r.rating === 5).length,
    4: productReviews.filter(r => r.rating === 4).length,
    3: productReviews.filter(r => r.rating === 3).length,
    2: productReviews.filter(r => r.rating === 2).length,
    1: productReviews.filter(r => r.rating === 1).length
  };

  const computedAvgRating = totalReviewsCount > 0
    ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviewsCount).toFixed(1)
    : product.rating.toFixed(1);

  // Apply Rating Filter & Sorting
  const filteredAndSortedReviews = productReviews
    .filter(r => selectedStarFilter === 0 || r.rating === selectedStarFilter)
    .sort((a, b) => {
      if (sortOption === 'highest') return b.rating - a.rating;
      if (sortOption === 'lowest') return a.rating - b.rating;
      if (sortOption === 'helpful') return (b.helpfulVotes || 0) - (a.helpfulVotes || 0);
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const handleVote = (reviewId: string, isHelpful: boolean) => {
    if (votedReviews[reviewId]) return;
    setVotedReviews(prev => ({ ...prev, [reviewId]: isHelpful ? 'helpful' : 'unhelpful' }));
    voteReviewHelpful(reviewId, isHelpful);
  };

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleVariantSelect = (idx: number) => {
    setSelectedVariantIndex(idx);
    const selectedVar = variants[idx];
    if (selectedVar && selectedVar.image) {
      const imgIdx = product.images.findIndex((img) => img === selectedVar.image);
      if (imgIdx > -1) setSelectedImage(imgIdx);
    }
  };

  // Frequently Bought Together Bundle
  const bundleAddon = products.find((p) => p.id === 'prod-badri-ghee-500ml' && p.id !== product.id) || products.find((p) => p.id !== product.id);
  const bundleTotal = product.price + (bundleAddon ? bundleAddon.price : 0);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const isShilajit = product.category === 'shilajit' || 
                     product.categoryName?.toLowerCase().includes('shilajit') || 
                     product.name.toLowerCase().includes('shilajit') ||
                     product.id.toLowerCase().includes('shilajit');

  const productFaqs = [
    {
      q: `How is The Pahadi Sher ${product.name} sourced?`,
      a: isShilajit
        ? `Harvested directly from high-altitude hamlets in Kumaon (${product.altitude}). Unadulterated, raw, and verified by independent NABL labs.`
        : `Harvested directly from pristine high-altitude hamlets in Kumaon (${product.altitude}). 100% natural, pure, and untouched by industrial processing.`
    },
    ...(isShilajit
      ? [{
          q: `How do I verify the authenticity of batch ${product.labCertificateNo || 'PAH-2026-881'}?`,
          a: `Every glass jar features a unique batch code. You can enter this code in our Lab Verification Portal to inspect the NABL phytochemistry report.`
        }]
      : [{
          q: `How is the purity and quality guaranteed for ${product.name}?`,
          a: `Every harvest is gathered with traditional reverence and hand-packed in eco glass jars with zero artificial additives, preservatives, or synthetic processing.`
        }]
    ),
    {
      q: 'What is the shelf life and storage recommendation?',
      a: 'Store in a cool, dry place away from direct sunlight. Sealed glass packaging preserves full bio-activity for up to 24 months.'
    },
    {
      q: 'What is your shipping and delivery timeline?',
      a: 'We ship via Himalayan Air Express. Orders above ₹999 qualify for FREE Express Shipping and usually arrive within 3 to 5 business days.'
    }
  ];

  const productReviewsList = reviews.filter(r => r.productId === product.id && r.status === 'Approved');

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Store', url: '/products' },
    { name: product.categoryName, url: `/categories/${product.category}` },
    { name: product.name, url: `/products/${product.slug}` }
  ];

  const productSchema = generateProductSchema(product, productReviewsList);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFaqSchema(productFaqs.map(f => ({ question: f.q, answer: f.a })));
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="py-8 sm:py-12 bg-pahadi-offwhite min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-pahadi-charcoal-muted font-sans">
          <Link href="/" className="hover:text-pahadi-green">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/products" className="hover:text-pahadi-green">Store</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/products?category=${product.category}`} className="hover:text-pahadi-green capitalize">
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-pahadi-green font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Top Product Hero Layout: LEFT Gallery | RIGHT Meta */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-pahadi-paper p-6 sm:p-10 rounded-sm border border-pahadi-border shadow-pahadi-md">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="hidden md:block space-y-4">
              <div className="relative aspect-square rounded-sm overflow-hidden border border-pahadi-border bg-white shadow-pahadi-sm group">
                <Image
                  src={product.images[selectedImage] || product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover cursor-zoom-in group-hover:scale-105 transition-transform duration-500"
                  onClick={() => setIsFullscreenOpen(true)}
                />
                <div className="absolute top-4 left-4 flex flex-col space-y-1.5 z-10">
                  <span className="bg-pahadi-green text-pahadi-gold px-3.5 py-1 rounded-sm text-xs font-bold font-sans uppercase shadow-sm">
                    {product.altitude} Harvest
                  </span>
                  {discountPercent > 0 && (
                    <span className="bg-pahadi-red text-white px-3 py-1 rounded-sm text-xs font-bold uppercase shadow-sm">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setIsFullscreenOpen(true)}
                  className="absolute bottom-4 right-4 p-2.5 rounded-sm bg-white/80 text-pahadi-charcoal hover:bg-white backdrop-blur-md shadow-md transition-all"
                  title="Fullscreen View"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative w-20 h-20 rounded-sm overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImage === idx ? 'border-pahadi-green scale-105' : 'border-pahadi-border opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Product Meta & Purchase Actions */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Category, Origin & Stock Badge */}
              <div className="flex items-center justify-between text-xs text-pahadi-brown font-bold uppercase tracking-widest">
                <span>{product.categoryName} • {product.origin}</span>
                <span className={`px-2.5 py-1 rounded-full text-[10px] ${
                  product.inStock ? 'bg-pahadi-green/10 text-pahadi-green' : 'bg-pahadi-red/10 text-pahadi-red'
                }`}>
                  {product.inStock ? 'In Stock • Ready to Ship' : 'Sold Out'}
                </span>
              </div>

              {/* Product Name */}
              <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-pahadi-green leading-tight">
                {product.name}
              </h1>

              {/* Rating & Reviews Summary */}
              <div className="flex items-center space-x-3 pt-1">
                <div className="flex text-pahadi-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-pahadi-green">{product.rating} ★</span>
                <span className="text-xs text-pahadi-charcoal-muted">({product.reviewsCount} verified reviews)</span>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-pahadi-charcoal-muted leading-relaxed font-sans font-light">
                {product.subtitle}
              </p>

              {/* Pricing Breakdown: Sale Price, MRP, Discount */}
              <div className="flex items-baseline space-x-3 pt-2">
                <span className="font-sans text-3xl font-bold text-pahadi-green">
                  ₹{displayPrice}
                </span>
                {displayOriginalPrice > displayPrice && (
                  <>
                    <span className="line-through text-base text-pahadi-charcoal-light font-medium">
                      ₹{displayOriginalPrice}
                    </span>
                    <span className="bg-pahadi-red/15 text-pahadi-red px-3 py-1 rounded-lg text-xs font-bold">
                      Save ₹{displayOriginalPrice - displayPrice} ({discountPercent}% OFF)
                    </span>
                  </>
                )}
              </div>

              {/* Variant Selector (Size / Weight Options) */}
              {variants.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-pahadi-sand/60">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-pahadi-brown">
                    <span>Select Size / Package Option:</span>
                    {currentVariant && (
                      <span className="text-pahadi-green font-mono text-[11px]">
                        SKU: {displaySku}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {variants.map((v, idx) => {
                      const isSelected = selectedVariantIndex === idx;
                      return (
                        <button
                          key={v.id || idx}
                          onClick={() => handleVariantSelect(idx)}
                          className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between space-y-1 relative ${
                            isSelected
                              ? 'border-pahadi-green bg-pahadi-green/5 ring-2 ring-pahadi-green/30 font-bold shadow-xs'
                              : 'border-pahadi-sand bg-white hover:border-pahadi-green/50 text-pahadi-charcoal'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-pahadi-green">{v.name}</span>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-pahadi-gold stroke-[3]" />
                            )}
                          </div>
                          <div className="flex items-baseline space-x-1">
                            <span className="text-xs font-bold text-pahadi-green">₹{v.price}</span>
                            {v.originalPrice > v.price && (
                              <span className="text-[10px] line-through text-pahadi-charcoal-light">₹{v.originalPrice}</span>
                            )}
                          </div>
                          {!v.inStock && (
                            <span className="text-[9px] text-pahadi-red font-bold uppercase">Out of Stock</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Key Trust Specs */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-pahadi-green">
                {isShilajit ? (
                  <>
                    <div className="bg-white p-3 rounded-xl border border-pahadi-border flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-pahadi-gold shrink-0" />
                      <span>Lab Certificate: <strong className="font-mono text-pahadi-green">{product.labCertificateNo || 'PAH-2026-881'}</strong></span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-pahadi-border flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-pahadi-brown shrink-0" />
                      <span>Net Weight: <strong>{currentVariant ? currentVariant.name : product.netQuantity}</strong></span>
                    </div>
                  </>
                ) : (
                  <div className="bg-white p-3 rounded-xl border border-pahadi-border flex items-center space-x-2 col-span-2">
                    <MapPin className="w-4 h-4 text-pahadi-brown shrink-0" />
                    <span>Net Weight: <strong>{currentVariant ? currentVariant.name : product.netQuantity}</strong></span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions Section */}
            <div className="space-y-4 pt-4 border-t border-pahadi-sand">
              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <span className="text-xs font-bold uppercase text-pahadi-brown">Quantity:</span>
                <div className="flex items-center border border-pahadi-border rounded-xl bg-white px-3 py-2 space-x-4">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-pahadi-charcoal hover:text-pahadi-red">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-bold text-pahadi-green w-6 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="text-pahadi-charcoal hover:text-pahadi-green">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart & Express Buy Now Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => addToCart(product, quantity, currentVariant || undefined)}
                  disabled={!isVariantInStock}
                  className={`py-4 rounded-xl text-xs uppercase font-bold tracking-widest flex items-center justify-center space-x-2 transition-all shadow-pahadi-md ${
                    !isVariantInStock
                      ? 'bg-pahadi-sand text-pahadi-charcoal-light cursor-not-allowed'
                      : 'bg-pahadi-green text-pahadi-offwhite hover:bg-pahadi-green-light'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 text-pahadi-gold" />
                  <span>{!isVariantInStock ? 'Sold Out' : `Add ${quantity} to Cart • ₹${displayPrice * quantity}`}</span>
                </button>

                <button
                  onClick={() => {
                    if (!isVariantInStock) return;
                    addToCart(product, quantity, currentVariant || undefined);
                    window.location.href = '/checkout';
                  }}
                  disabled={!isVariantInStock}
                  className={`py-4 rounded-xl text-xs uppercase font-bold tracking-widest flex items-center justify-center space-x-2 transition-all shadow-pahadi-gold ${
                    !isVariantInStock
                      ? 'bg-pahadi-sand text-pahadi-charcoal-light cursor-not-allowed'
                      : 'bg-pahadi-gold text-pahadi-green-dark hover:bg-white'
                  }`}
                >
                  <span>Buy Now (Express)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

              {/* Wishlist & Share Bar */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  animate={isFavorite ? { scale: [1, 1.15, 0.95, 1.05, 1] } : { scale: 1 }}
                  transition={{ duration: 0.35 }}
                  onClick={() => toggleWishlist(product.id)}
                  className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all shadow-xs ${
                    isFavorite ? 'bg-pahadi-red text-white border-pahadi-red ring-2 ring-red-200' : 'bg-white text-pahadi-charcoal border-pahadi-border hover:border-pahadi-red hover:text-pahadi-red'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current text-white' : ''}`} />
                  <span>{isFavorite ? 'Saved in Wishlist ❤️' : 'Add to Wishlist'}</span>
                </motion.button>

                <button
                  onClick={handleShare}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white border border-pahadi-border text-pahadi-charcoal hover:bg-pahadi-sand text-xs font-bold"
                >
                  <Share2 className="w-4 h-4 text-pahadi-brown" />
                  <span>{copiedLink ? 'Link Copied! ✓' : 'Share Product'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Bought Together Bundle */}
        {bundleAddon && (
          <div className="bg-pahadi-paper p-6 sm:p-8 rounded-3xl border-2 border-pahadi-gold/60 shadow-pahadi-sm space-y-4">
            <div className="flex items-center space-x-2 text-xs font-sans font-bold uppercase tracking-widest text-pahadi-red">
              <Sparkles className="w-4 h-4 text-pahadi-gold" />
              <span>Synergistic Himalayan Bundle</span>
            </div>
            <h3 className="font-playfair text-2xl font-bold text-pahadi-green">
              Frequently Bought Together
            </h3>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
              <div className="flex items-center space-x-4">
                {/* Product 1 */}
                <div className="w-16 h-16 rounded-xl overflow-hidden relative border border-pahadi-sand bg-white shrink-0">
                  <Image src={product.images[0]} alt="" fill className="object-cover" />
                </div>
                <span className="text-xl font-bold text-pahadi-gold">+</span>
                {/* Product 2 */}
                <div className="w-16 h-16 rounded-xl overflow-hidden relative border border-pahadi-sand bg-white shrink-0">
                  <Image src={bundleAddon.images[0]} alt="" fill className="object-cover" />
                </div>

                <div className="space-y-1">
                  <span className="font-playfair font-bold text-sm text-pahadi-green block">
                    {product.name} + {bundleAddon.name}
                  </span>
                  <p className="text-xs text-pahadi-charcoal-muted">
                    Traditional Pahadi synergy: Ghee acts as an Anupana carrier for Shilajit absorption.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 shrink-0">
                <div className="text-right">
                  <span className="text-xs text-pahadi-charcoal-muted block">Bundle Total</span>
                  <span className="font-sans text-xl font-bold text-pahadi-green">₹{bundleTotal}</span>
                </div>

                <button
                  onClick={() => {
                    addToCart(product, 1);
                    addToCart(bundleAddon, 1);
                  }}
                  className="bg-pahadi-green text-pahadi-gold px-6 py-3 rounded-xl text-xs uppercase font-bold tracking-wider hover:bg-pahadi-green-light shadow-md"
                >
                  + Add Both To Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BELOW: Comprehensive Product Tabs / Accordion Sections */}
        <div className="bg-pahadi-paper p-6 sm:p-10 rounded-3xl border border-pahadi-border space-y-8 shadow-pahadi-sm">
          {/* Tab Headers */}
          <div className="flex border-b border-pahadi-sand overflow-x-auto pb-2 space-x-6 scrollbar-none">
            {[
              { id: 'description', label: 'Description' },
              { id: 'benefits', label: 'Benefits' },
              { id: 'ingredients', label: 'Ingredients & Sourcing' },
              { id: 'howToUse', label: 'How To Use' },
              { id: 'shipping', label: 'Shipping & Returns' },
              { id: 'faqs', label: 'FAQs' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 font-playfair text-base sm:text-lg font-bold transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-pahadi-green text-pahadi-green'
                    : 'border-transparent text-pahadi-charcoal-muted hover:text-pahadi-green'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="font-sans text-xs sm:text-sm text-pahadi-charcoal leading-relaxed">
            {activeTab === 'description' && (
              <div className="space-y-4">
                <h3 className="font-playfair text-2xl font-bold text-pahadi-green">Product Overview</h3>
                <p className="text-pahadi-charcoal-muted leading-relaxed">{product.description}</p>
                <div className="bg-white p-4 rounded-2xl border border-pahadi-sand space-y-1">
                  <span className="font-bold text-pahadi-brown uppercase text-[10px]">Origin & Harvest Details</span>
                  <p className="text-pahadi-green font-semibold">
                    Harvested at {product.altitude} in {product.origin}. 100% Unadulterated Mountain Resin.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'benefits' && (
              <div className="space-y-4">
                <h3 className="font-playfair text-2xl font-bold text-pahadi-green">Key Health & Vitality Benefits</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start space-x-3 bg-white p-4 rounded-2xl border border-pahadi-sand">
                      <CheckCircle2 className="w-5 h-5 text-pahadi-green shrink-0 mt-0.5" />
                      <span className="font-semibold text-pahadi-green">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-4">
                <h3 className="font-playfair text-2xl font-bold text-pahadi-green">Ingredients & High-Altitude Sourcing</h3>
                <div className="bg-white p-6 rounded-2xl border border-pahadi-sand space-y-3">
                  <h4 className="font-serif font-bold text-pahadi-brown uppercase text-xs">100% Pure Composition</h4>
                  <ul className="list-disc list-inside space-y-1 text-pahadi-charcoal">
                    {product.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-pahadi-charcoal-muted pt-2 border-t border-pahadi-sand">
                    Directly gathered from native Kumaon hamlets above {product.altitude}. Free from artificial preservatives, colors, or industrial additives.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'howToUse' && (
              <div className="space-y-4">
                <h3 className="font-playfair text-2xl font-bold text-pahadi-green">Recommended Daily Consumption Ritual</h3>
                <div className="bg-white p-6 rounded-2xl border border-pahadi-sand space-y-3">
                  <p className="text-pahadi-charcoal">{product.howToUse}</p>
                  <div className="bg-pahadi-paper p-3 rounded-xl text-xs text-pahadi-brown">
                    💡 <strong>Ayurvedic Tip:</strong> Consume consistently every morning for at least 60 days to experience optimal metabolic energy and cellular vitality.
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4">
                <h3 className="font-playfair text-2xl font-bold text-pahadi-green">Himalayan Express Shipping & Policy</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-pahadi-sand space-y-2">
                    <Truck className="w-6 h-6 text-pahadi-gold" />
                    <h4 className="font-bold text-pahadi-green">Express Delivery</h4>
                    <p className="text-xs text-pahadi-charcoal-muted">
                      Dispatched within 24 hours. Orders above ₹999 qualify for FREE Express Delivery across India (3 to 5 business days).
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-pahadi-sand space-y-2">
                    <RotateCcw className="w-6 h-6 text-pahadi-green" />
                    <h4 className="font-bold text-pahadi-green">Eco Glass Protection</h4>
                    <p className="text-xs text-pahadi-charcoal-muted">
                      Items are shipped in shatter-proof eco glass packaging with protective cushion wrapping.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'returns' && (
              <div className="space-y-4">
                <h3 className="font-playfair text-2xl font-bold text-pahadi-green">Returns & Replacements Policy</h3>
                <div className="bg-white p-6 rounded-2xl border border-pahadi-sand space-y-3">
                  <p className="text-pahadi-charcoal">
                    We stand behind 100% of our Himalayan harvests. If your product arrives damaged or fails to meet purity expectations, contact us within 7 days for a hassle-free replacement or full refund.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'faqs' && (
              <div className="space-y-4">
                <h3 className="font-playfair text-2xl font-bold text-pahadi-green">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  {productFaqs.map((faq, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-pahadi-sand overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full text-left p-4 font-playfair font-bold text-pahadi-green flex items-center justify-between"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-pahadi-brown transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                      </button>
                      {openFaq === idx && (
                        <div className="p-4 pt-0 font-sans text-xs text-pahadi-charcoal-muted leading-relaxed border-t border-pahadi-sand/40">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="bg-pahadi-paper p-6 sm:p-10 rounded-3xl border border-pahadi-border space-y-8 shadow-pahadi-sm" id="reviews-section">
          
          {/* Header & Write Review CTA */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-pahadi-sand pb-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-pahadi-gold block">Authentic Community Feedback</span>
              <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-pahadi-green">
                Customer Reviews ({totalReviewsCount})
              </h3>
              <p className="text-xs text-pahadi-charcoal-muted">Verified 100% Himalayan harvest reviews & lab purity ratings</p>
            </div>

            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="bg-pahadi-green text-pahadi-gold hover:bg-pahadi-green-light px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-pahadi-md transition-transform hover:scale-[1.02] self-start md:self-auto"
            >
              <Sparkles className="w-4 h-4 text-pahadi-gold" />
              <span>Write a Product Review</span>
            </button>
          </div>

          {/* Rating Summary & Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-white p-6 sm:p-8 rounded-2xl border border-pahadi-sand">
            
            {/* Left: Score Box */}
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4 border-b md:border-b-0 md:border-r border-pahadi-sand/60">
              <span className="font-playfair font-extrabold text-5xl text-pahadi-green">{computedAvgRating}</span>
              <div className="flex items-center space-x-1 text-pahadi-gold my-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(Number(computedAvgRating))
                        ? 'fill-pahadi-gold text-pahadi-gold'
                        : 'fill-pahadi-sand/50 text-pahadi-sand'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-pahadi-brown uppercase tracking-wider">
                Out of 5.0 Stars
              </span>
              <span className="text-[11px] text-pahadi-charcoal-muted mt-1">
                Based on {totalReviewsCount} verified ratings
              </span>
            </div>

            {/* Right: Star Distribution Bars */}
            <div className="md:col-span-8 space-y-2.5 flex flex-col justify-center">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = starCounts[star] || 0;
                const percentage = totalReviewsCount > 0 ? Math.round((count / totalReviewsCount) * 100) : 0;
                const isSelected = selectedStarFilter === star;

                return (
                  <button
                    key={star}
                    onClick={() => setSelectedStarFilter(isSelected ? 0 : star)}
                    className={`flex items-center space-x-3 text-xs w-full group text-left p-1 rounded-lg transition-colors ${
                      isSelected ? 'bg-pahadi-green/5' : 'hover:bg-pahadi-paper'
                    }`}
                  >
                    <div className="flex items-center space-x-1 w-14 shrink-0 font-bold text-pahadi-green">
                      <span>{star}</span>
                      <Star className="w-3.5 h-3.5 text-pahadi-gold fill-pahadi-gold" />
                    </div>

                    <div className="flex-1 h-3 bg-pahadi-sand/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className={`h-full rounded-full ${isSelected ? 'bg-pahadi-green' : 'bg-pahadi-gold'}`}
                      />
                    </div>

                    <span className="w-12 text-right text-[11px] font-mono font-bold text-pahadi-charcoal-muted shrink-0">
                      {percentage}% ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter & Sort Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase text-pahadi-brown tracking-wider flex items-center space-x-1 mr-1">
                <Filter className="w-3.5 h-3.5 text-pahadi-gold" />
                <span>Filter By Stars:</span>
              </span>
              {[0, 5, 4, 3, 2, 1].map((star) => (
                <button
                  key={star}
                  onClick={() => setSelectedStarFilter(star)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedStarFilter === star
                      ? 'bg-pahadi-green text-pahadi-gold shadow-xs'
                      : 'bg-white text-pahadi-charcoal border border-pahadi-sand hover:border-pahadi-green'
                  }`}
                >
                  {star === 0 ? 'All Reviews' : `${star}★ (${starCounts[star] || 0})`}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-pahadi-brown" />
              <span className="font-bold text-pahadi-brown uppercase text-[10px]">Sort:</span>
              <select
                value={sortOption}
                onChange={(e: any) => setSortOption(e.target.value)}
                className="bg-white border border-pahadi-sand rounded-xl px-3 py-1.5 font-bold text-pahadi-green text-xs focus:ring-1 focus:ring-pahadi-green"
              >
                <option value="recent">Most Recent</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
          </div>

          {/* Animated Review Feed */}
          <div className="space-y-4">
            {filteredAndSortedReviews.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-pahadi-sand space-y-3">
                <Star className="w-8 h-8 text-pahadi-sand fill-pahadi-sand mx-auto" />
                <p className="font-playfair text-lg font-bold text-pahadi-green">No Reviews Found</p>
                <p className="text-xs text-pahadi-charcoal-muted max-w-sm mx-auto">
                  {selectedStarFilter > 0 
                    ? `No ${selectedStarFilter}-star reviews yet for this product. Be the first to leave one!` 
                    : 'Be the first to review this pure Himalayan product!'}
                </p>
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="mt-2 inline-flex items-center space-x-2 bg-pahadi-green text-pahadi-gold px-5 py-2.5 rounded-xl text-xs font-bold uppercase"
                >
                  <Sparkles className="w-3.5 h-3.5 text-pahadi-gold" />
                  <span>Write First Review</span>
                </button>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredAndSortedReviews.map((rev) => {
                  const myVote = votedReviews[rev.id];
                  const helpfulCount = (rev.helpfulVotes || 0) + (myVote === 'helpful' ? 1 : 0);
                  const unhelpfulCount = (rev.unhelpfulVotes || 0) + (myVote === 'unhelpful' ? 1 : 0);

                  return (
                    <motion.div
                      key={rev.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white p-6 sm:p-7 rounded-2xl border border-pahadi-sand space-y-3 shadow-xs hover:border-pahadi-gold/40 transition-colors"
                    >
                      {/* Top Bar: Author, Verified Badge, Date */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-pahadi-sand/40 pb-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-pahadi-green text-pahadi-gold flex items-center justify-center font-bold text-xs shrink-0 border border-pahadi-gold/40">
                            <User className="w-4 h-4 text-pahadi-gold" />
                          </div>

                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-pahadi-green text-sm">{rev.author}</span>
                              {rev.verifiedBuyer ? (
                                <span className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full text-[9px] font-bold">
                                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                  <span>Verified Himalayan Purchaser</span>
                                </span>
                              ) : (
                                <span className="text-[9px] text-pahadi-charcoal-muted bg-pahadi-sand/40 px-2 py-0.5 rounded-full font-medium">
                                  Community Review
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-pahadi-charcoal-muted block">{rev.location}</span>
                          </div>
                        </div>

                        <span className="text-[11px] text-pahadi-charcoal-muted font-sans font-medium">{rev.date}</span>
                      </div>

                      {/* Star Rating & Review Title */}
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1 text-pahadi-gold">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= rev.rating ? 'fill-pahadi-gold text-pahadi-gold' : 'text-pahadi-sand fill-transparent'
                              }`}
                            />
                          ))}
                        </div>
                        <h4 className="font-playfair font-bold text-pahadi-green text-base sm:text-lg">{rev.title}</h4>
                      </div>

                      {/* Comment Body */}
                      <p className="text-xs sm:text-sm text-pahadi-charcoal leading-relaxed">{rev.comment}</p>

                      {/* Customer Photo Gallery Thumbnails */}
                      {rev.images && rev.images.length > 0 && (
                        <div className="pt-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-pahadi-brown block mb-1.5">
                            Customer Photos ({rev.images.length})
                          </span>
                          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                            {rev.images.map((imgUrl, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => setActiveLightboxImage(imgUrl)}
                                className="relative w-16 h-16 rounded-xl overflow-hidden border border-pahadi-sand shrink-0 group focus:outline-none"
                              >
                                <img src={imgUrl} alt={`Customer photo ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Official Merchant Admin Reply */}
                      {rev.adminReply && (
                        <div className="mt-3 bg-pahadi-green/5 border-l-4 border-pahadi-gold p-3.5 rounded-r-xl space-y-1 text-xs">
                          <div className="flex items-center justify-between text-pahadi-green font-bold text-[11px]">
                            <span className="flex items-center space-x-1">
                              <MessageSquare className="w-3.5 h-3.5 text-pahadi-gold" />
                              <span>Response from The Pahadi Sher Team</span>
                            </span>
                            <span className="text-[10px] text-pahadi-charcoal-muted font-normal">{rev.adminReply.repliedAt}</span>
                          </div>
                          <p className="text-pahadi-charcoal italic text-xs leading-relaxed">{rev.adminReply.replyText}</p>
                        </div>
                      )}

                      {/* Footer: Helpful Votes */}
                      <div className="pt-2 flex items-center justify-between border-t border-pahadi-sand/30 text-xs">
                        <span className="text-[11px] text-pahadi-charcoal-muted">Was this review helpful?</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleVote(rev.id, true)}
                            disabled={!!myVote}
                            className={`px-3 py-1 rounded-lg border flex items-center space-x-1.5 text-[11px] font-bold transition-all ${
                              myVote === 'helpful'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : 'bg-white text-pahadi-charcoal border-pahadi-sand hover:border-pahadi-green'
                            }`}
                          >
                            <ThumbsUp className="w-3.5 h-3.5 text-pahadi-green" />
                            <span>Helpful ({helpfulCount})</span>
                          </button>

                          <button
                            onClick={() => handleVote(rev.id, false)}
                            disabled={!!myVote}
                            className={`px-3 py-1 rounded-lg border flex items-center space-x-1.5 text-[11px] font-bold transition-all ${
                              myVote === 'unhelpful'
                                ? 'bg-rose-50 text-rose-800 border-rose-300'
                                : 'bg-white text-pahadi-charcoal border-pahadi-sand hover:border-rose-400'
                            }`}
                          >
                            <ThumbsDown className="w-3.5 h-3.5 text-pahadi-brown" />
                            <span>Not Helpful ({unhelpfulCount})</span>
                          </button>
                        </div>
                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
          </div>

        </div>

        {/* Photo Lightbox Modal */}
        {activeLightboxImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <div className="relative max-w-3xl max-h-[90vh] bg-black rounded-2xl overflow-hidden border border-pahadi-gold/40">
              <button
                onClick={() => setActiveLightboxImage(null)}
                className="absolute top-3 right-3 p-2 bg-black/60 text-white rounded-full hover:bg-black"
              >
                <X className="w-5 h-5" />
              </button>
              <img src={activeLightboxImage} alt="Customer product photo full size" className="w-full max-h-[85vh] object-contain" />
            </div>
          </div>
        )}

        {/* Review Submission Modal Component */}
        <ReviewFormModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          product={product}
        />

        {/* Frequently Bought Together Bundle */}
        {(() => {
          const bundle = getFrequentlyBoughtTogether(product, products, orders);
          return bundle ? <FrequentlyBoughtTogether bundle={bundle} /> : null;
        })()}

        {/* You May Also Like */}
        <ProductRecommendationsSection
          type="you_may_like"
          currentProduct={product}
          allProducts={products}
        />

        {/* Customers Also Viewed */}
        <ProductRecommendationsSection
          type="customers_viewed"
          currentProduct={product}
          allProducts={products}
        />

        {/* Recently Viewed Items */}
        <ProductRecommendationsSection
          type="recently_viewed"
          allProducts={products}
        />
      </div>

      {/* Sticky Mobile Buy Now Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-pahadi-offwhite/95 backdrop-blur-md border-t border-pahadi-gold p-3 flex items-center justify-between sm:hidden shadow-2xl">
        <div>
          <span className="text-[10px] text-pahadi-brown uppercase font-bold block">{product.name}</span>
          <span className="font-sans font-bold text-pahadi-green text-base">₹{product.price}</span>
        </div>

        <button
          onClick={() => {
            addToCart(product, 1);
            window.location.href = '/checkout';
          }}
          className="bg-pahadi-gold text-pahadi-green-dark px-5 py-2.5 rounded-xl text-xs uppercase font-bold tracking-wider shadow-md"
        >
          Express Buy Now
        </button>
      </div>

      {/* Fullscreen Image Zoom Modal */}
      {isFullscreenOpen && (
        <div className="fixed inset-0 z-50 bg-pahadi-charcoal/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreenOpen(false)}
            className="absolute top-6 right-6 p-3 text-white hover:bg-white/10 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-4xl aspect-square">
            <Image
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}

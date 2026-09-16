export type ProductCategory = 
  | 'all'
  | 'shilajit' 
  | 'honey' 
  | 'ghee' 
  | 'teas' 
  | 'pickles'
  | 'pahadi-foods' 
  | 'combos';

export type ProductBadge = 'SALE' | 'SOLD OUT' | 'NEW' | 'BESTSELLER';

export type VariantType = 'Weight' | 'Size' | 'Pack' | 'Quantity' | 'Flavor' | 'Combo';

export type InventoryStatus = 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Discontinued';

export interface InventoryLogEntry {
  id: string;
  date: string;
  productId: string;
  productName: string;
  variantId?: string;
  variantName?: string;
  sku: string;
  previousStock: number;
  newStock: number;
  adjustment: number;
  reason: string;
  admin: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  name: string; // e.g. "20g Glass Jar", "50g Glass Jar", "Pack of 2"
  type: VariantType;
  value: string; // e.g. "20g", "50g", "500ml", "1kg"
  price: number;
  originalPrice: number;
  stockQuantity: number;
  reservedQuantity?: number;
  availableQuantity?: number;
  soldQuantity?: number;
  lowStockThreshold?: number;
  status?: InventoryStatus;
  inStock: boolean;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  altitude: string;
  origin: string;
  netQuantity: string;
  images: string[];
  badge?: ProductBadge;
  inStock: boolean;
  stockQuantity: number;
  reservedQuantity?: number;
  availableQuantity?: number;
  soldQuantity?: number;
  lowStockThreshold?: number;
  status?: InventoryStatus;
  isDiscontinued?: boolean;
  variants?: ProductVariant[];
  sku?: string;
  fulvicAcidContent?: string;
  bilonaMethod?: boolean;
  description: string;
  shortDescription?: string;
  benefits: string[];
  ingredients: string[];
  howToUse: string;
  shippingInfo?: {
    weight?: string;
    deliveryDays?: string;
    details?: string;
  } | string;
  videos?: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  publishStatus?: 'Published' | 'Draft' | 'Unpublished' | 'Archived';
  labCertificateNo?: string;
  harvestSeason?: string;
  featured?: boolean;
}

export interface Category {
  id: ProductCategory;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
  highlightTag: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  author: string;
  userEmail?: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedBuyer: boolean;
  avatar?: string;
  images?: string[];
  status: 'Approved' | 'Pending' | 'Hidden';
  helpfulVotes: number;
  unhelpfulVotes: number;
  adminReply?: {
    replyText: string;
    repliedAt: string;
  };
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export interface SavedAddress extends ShippingAddress {
  id: string;
  label: 'Home' | 'Work' | 'Parents House' | 'Other';
  isDefault: boolean;
}

export interface PointsTransaction {
  id: string;
  date: string;
  type: 'earned' | 'redeemed';
  points: number;
  description: string;
  orderId?: string;
  balanceAfter?: number;
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  joinedDate: string;
  membershipBadge?: string;
  addresses: SavedAddress[];
  savedCoupons?: string[];
  rewardPoints?: number;
  pointsHistory?: PointsTransaction[];
}

export type OrderStatus = 'Pending' | 'Paid' | 'Processing' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';
export type PaymentStatus = 'Pending' | 'Paid' | 'Refunded' | 'Failed';
export type ShippingStatus = 'Unfulfilled' | 'Packing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface OrderTimelineEvent {
  id: string;
  timestamp: string;
  status: OrderStatus;
  title: string;
  description: string;
  actor: string;
}

export interface CustomerNotificationLog {
  id: string;
  timestamp: string;
  type: 'Email' | 'SMS' | 'WhatsApp';
  recipient: string;
  subject: string;
  message: string;
  status: 'Sent' | 'Delivered';
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  email: string;
  phone: string;
  address: ShippingAddress;
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
    variantName?: string;
    sku?: string;
  }[];
  totalAmount: number;
  shippingFee: number;
  discountAmount: number;
  taxAmount?: number;
  status: OrderStatus;
  paymentMethod: 'Razorpay (UPI / Cards / NetBanking)' | 'Cash on Delivery' | string;
  paymentStatus: PaymentStatus;
  shippingStatus?: ShippingStatus;
  trackingNumber?: string;
  courierPartner?: string;
  trackingUrl?: string;
  refundId?: string;
  refundAmount?: number;
  refundReason?: string;
  timeline?: OrderTimelineEvent[];
  notificationsSent?: CustomerNotificationLog[];
}

export interface LabReport {
  batchNo: string;
  productName: string;
  harvestDate: string;
  altitude: string;
  fulvicAcid: string;
  heavyMetals: string;
  purityScore: string;
  certifiedBy: string;
  reportDate: string;
  status: 'Passed - 100% Pure';
}

export type CouponDiscountType = 'percentage' | 'flat' | 'free_shipping' | 'product_specific' | 'category_specific';

export interface Coupon {
  id: string;
  code: string;
  discountType: CouponDiscountType;
  discountValue: number;
  minOrderAmount: number;
  maxDiscount?: number;
  startDate: string;
  expiryDate: string;
  usageCount: number;
  usageLimit: number;
  perCustomerLimit: number;
  applicableProductIds?: string[];
  applicableCategories?: string[];
  status: 'Active' | 'Expired' | 'Disabled';
  description?: string;
  discountPercent?: number;
}

export interface PincodeZoneRule {
  id: string;
  name: string;
  pincodePrefixes: string[];
  shippingFee: number;
  estDeliveryDays: string;
  codSupported: boolean;
}

export interface ProductShippingRule {
  productId: string;
  productName: string;
  extraShippingFee: number;
  requiresColdChain?: boolean;
  isHeavyItem?: boolean;
}

export interface CodConfig {
  enabled: boolean;
  minOrderAmount: number;
  maxOrderAmount: number;
  handlingFee: number;
  disabledPincodePrefixes?: string[];
}

export interface ShippingConfig {
  freeShippingThreshold: number;
  flatShippingFee: number;
  pincodeZones: PincodeZoneRule[];
  productRules: ProductShippingRule[];
  codConfig: CodConfig;
}

// Homepage CMS Types
export type HomepageSectionId = 
  | 'hero' 
  | 'featured_catalogue' 
  | 'category_grid' 
  | 'brand_story' 
  | 'from_the_himalayas'
  | 'why_us' 
  | 'best_sellers' 
  | 'sourcing_process' 
  | 'trust_section' 
  | 'testimonials' 
  | 'combo_offers' 
  | 'instagram_reels'
  | 'social_gallery' 
  | 'newsletter';

export interface HomepageSectionMeta {
  id: HomepageSectionId;
  name: string;
  enabled: boolean;
  order: number;
}

export interface HeroConfig {
  badge: string;
  heading: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  backgroundImage: string;
  heroImage: string;
  stats: { value: string; label: string }[];
}

export interface FeaturedCatalogueConfig {
  title: string;
  subtitle: string;
  selectedProductIds?: string[];
}

export interface CategoryGridItemConfig {
  id: string;
  name: string;
  image: string;
  tag: string;
  link: string;
  enabled: boolean;
}

export interface CategoryGridConfig {
  title: string;
  subtitle: string;
  items: CategoryGridItemConfig[];
}

export interface BrandStoryConfig {
  tagline: string;
  heading: string;
  description1: string;
  description2: string;
  image: string;
  stats: { number: string; label: string }[];
  ctaText: string;
  ctaLink: string;
}

export interface WhyUsItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface WhyUsConfig {
  tagline: string;
  heading: string;
  subtitle: string;
  items: WhyUsItem[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  verified: boolean;
  avatar?: string;
}

export interface TestimonialsConfig {
  tagline: string;
  heading: string;
  subtitle: string;
  items: TestimonialItem[];
}

export interface NewsletterConfig {
  heading: string;
  subtitle: string;
  buttonText: string;
  placeholderText: string;
  perks: string[];
}

export interface PromoBannerConfig {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  discountCode?: string;
}

export interface HomepageConfig {
  sections: HomepageSectionMeta[];
  hero: HeroConfig;
  featuredCatalogue: FeaturedCatalogueConfig;
  categoryGrid: CategoryGridConfig;
  brandStory: BrandStoryConfig;
  whyUs: WhyUsConfig;
  testimonials: TestimonialsConfig;
  newsletter: NewsletterConfig;
  promoBanner: PromoBannerConfig;
}


import { supabase } from './supabaseClient';
import { Product, Order, Review, Coupon, Category, CustomerUser } from '@/types';
import { BlogPost } from '@/data/blogPosts';

/**
 * Supabase Database Service Layer for The Pahadi Sher
 * Gracefully handles database queries with fallback to local state if Supabase is unconfigured/offline.
 */

// Check if Supabase env credentials are configured
export const isSupabaseConfigured = (): boolean => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  return Boolean(url && key && !url.includes('placeholder'));
};

// ==========================================
// 1. PRODUCTS DB ACTIONS
// ==========================================
export async function dbFetchProducts(): Promise<Product[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (error || !data) return null;

    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      price: Number(item.price),
      originalPrice: Number(item.original_price),
      rating: Number(item.rating || 5.0),
      reviewsCount: item.reviews_count || 0,
      category: item.category,
      categoryName: item.category_name,
      origin: item.origin,
      altitude: item.altitude,
      inStock: item.in_stock,
      stockQuantity: item.stock_quantity || 100,
      netQuantity: item.net_quantity,
      labCertificateNo: item.lab_certificate_no,
      images: item.images || [],
      variants: item.variants || [],
      description: item.description,
      benefits: item.benefits || [],
      ingredients: item.ingredients || [],
      howToUse: item.how_to_use,
      subtitle: item.subtitle,
      featured: item.featured,
      status: item.status || 'Published',
      discountPercent: Math.round(((Number(item.original_price) - Number(item.price)) / Number(item.original_price)) * 100)
    }));
  } catch (err) {
    console.warn('Supabase fetchProducts warning:', err);
    return null;
  }
}

export async function dbSaveProduct(product: Product): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from('products').upsert({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      original_price: product.originalPrice,
      rating: product.rating,
      reviews_count: product.reviewsCount,
      category: product.category,
      category_name: product.categoryName,
      origin: product.origin,
      altitude: product.altitude,
      in_stock: product.inStock,
      stock_quantity: product.stockQuantity,
      net_quantity: product.netQuantity,
      lab_certificate_no: product.labCertificateNo,
      images: product.images,
      variants: product.variants,
      description: product.description,
      benefits: product.benefits,
      ingredients: product.ingredients,
      how_to_use: product.howToUse,
      subtitle: product.subtitle,
      featured: product.featured,
      status: product.status || 'Published',
      updated_at: new Date().toISOString()
    });
    return !error;
  } catch (err) {
    console.error('Supabase saveProduct error:', err);
    return false;
  }
}

export async function dbDeleteProduct(productId: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from('products').delete().eq('id', productId);
    return !error;
  } catch (err) {
    console.error('Supabase deleteProduct error:', err);
    return false;
  }
}

// ==========================================
// 2. ORDERS DB ACTIONS
// ==========================================
export async function dbFetchOrders(): Promise<Order[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (error || !data) return null;

    return data.map((o: any) => ({
      id: o.id,
      orderNumber: o.order_number,
      customerName: o.customer_name,
      customerEmail: o.customer_email || o.email,
      email: o.customer_email || o.email || '',
      customerPhone: o.customer_phone || o.phone,
      phone: o.customer_phone || o.phone || '',
      items: o.items || [],
      subtotal: Number(o.subtotal || 0),
      shippingCost: Number(o.shipping_cost || o.shipping_fee || 0),
      shippingFee: Number(o.shipping_cost || o.shipping_fee || 0),
      discountAmount: Number(o.discount_amount || 0),
      total: Number(o.total || o.total_amount || 0),
      totalAmount: Number(o.total || o.total_amount || 0),
      paymentMethod: o.payment_method || 'COD',
      paymentStatus: o.payment_status || 'Pending',
      status: o.status || 'Pending',
      shippingAddress: o.shipping_address || o.address || {},
      address: o.shipping_address || o.address || {},
      trackingNumber: o.tracking_number,
      courierPartner: o.courier_partner,
      date: o.created_at ? new Date(o.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Today'
    }));
  } catch (err) {
    console.warn('Supabase fetchOrders warning:', err);
    return null;
  }
}

export async function dbSaveOrder(order: Order): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from('orders').upsert({
      id: order.id,
      order_number: order.orderNumber,
      customer_name: order.customerName,
      customer_email: (order as any).customerEmail || order.email,
      customer_phone: (order as any).customerPhone || order.phone,
      items: order.items,
      subtotal: (order as any).subtotal || 0,
      shipping_cost: (order as any).shippingCost ?? order.shippingFee,
      discount_amount: order.discountAmount,
      total: (order as any).total ?? order.totalAmount,
      payment_method: order.paymentMethod,
      payment_status: order.paymentStatus,
      status: order.status,
      shipping_address: (order as any).shippingAddress || order.address,
      tracking_number: order.trackingNumber,
      courier_partner: order.courierPartner,
      updated_at: new Date().toISOString()
    });
    return !error;
  } catch (err) {
    console.error('Supabase saveOrder error:', err);
    return false;
  }
}

// ==========================================
// 3. REVIEWS DB ACTIONS
// ==========================================
export async function dbFetchReviews(): Promise<Review[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
    if (error || !data) return null;

    return data.map((r: any) => ({
      id: r.id,
      productId: r.product_id,
      productName: r.product_name,
      author: r.author,
      location: r.location || 'Kumaon, Uttarakhand',
      rating: r.rating,
      title: r.title,
      comment: r.comment,
      date: r.date,
      verifiedBuyer: r.verified_buyer ?? true,
      status: r.status || 'Approved',
      helpfulVotes: r.helpful_votes || 0,
      unhelpfulVotes: r.unhelpful_votes || 0,
      images: r.images || [],
      adminReply: r.reply_text ? { replyText: r.reply_text, repliedAt: r.date } : undefined
    }));
  } catch (err) {
    console.warn('Supabase fetchReviews warning:', err);
    return null;
  }
}

export async function dbSaveReview(review: Review): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from('reviews').upsert({
      id: review.id,
      product_id: review.productId,
      product_name: review.productName,
      author: review.author,
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      date: review.date,
      status: review.status,
      helpful_votes: review.helpfulVotes,
      images: review.images,
      reply_text: review.adminReply?.replyText || (review as any).replyText
    });
    return !error;
  } catch (err) {
    console.error('Supabase saveReview error:', err);
    return false;
  }
}

// ==========================================
// 4. COUPONS DB ACTIONS
// ==========================================
export async function dbFetchCoupons(): Promise<Coupon[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase.from('coupons').select('*');
    if (error || !data) return null;

    return data.map((c: any) => ({
      id: c.id,
      code: c.code,
      discountType: c.discount_type,
      discountValue: Number(c.discount_value),
      minOrderAmount: Number(c.min_order_amount || 0),
      maxDiscount: c.max_discount ? Number(c.max_discount) : undefined,
      usageLimit: c.usage_limit,
      usageCount: c.usage_count || 0,
      perCustomerLimit: c.per_customer_limit || 1,
      status: c.status,
      startDate: c.start_date,
      expiryDate: c.expiry_date,
      applicableProductIds: c.applicable_product_ids,
      applicableCategories: c.applicable_categories
    }));
  } catch (err) {
    console.warn('Supabase fetchCoupons warning:', err);
    return null;
  }
}

export async function dbSaveCoupon(coupon: Coupon): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from('coupons').upsert({
      id: coupon.id,
      code: coupon.code,
      discount_type: coupon.discountType,
      discount_value: coupon.discountValue,
      min_order_amount: coupon.minOrderAmount,
      max_discount: coupon.maxDiscount,
      usage_limit: coupon.usageLimit,
      usage_count: coupon.usageCount,
      status: coupon.status,
      start_date: coupon.startDate,
      expiry_date: coupon.expiryDate,
      applicable_product_ids: coupon.applicableProductIds,
      applicable_categories: coupon.applicableCategories
    });
    return !error;
  } catch (err) {
    console.error('Supabase saveCoupon error:', err);
    return false;
  }
}

// ==========================================
// 5. BLOG POSTS DB ACTIONS
// ==========================================
export async function dbFetchBlogPosts(): Promise<BlogPost[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (error || !data) return null;

    return data.map((b: any) => ({
      id: b.id,
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      content: b.content,
      category: b.category,
      author: b.author,
      authorRole: b.author_role,
      publishDate: b.publish_date,
      readTime: b.read_time,
      image: b.image
    }));
  } catch (err) {
    console.warn('Supabase fetchBlogPosts warning:', err);
    return null;
  }
}

export async function dbSaveBlogPost(post: BlogPost): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from('blog_posts').upsert({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author,
      author_role: post.authorRole,
      publish_date: post.publishDate,
      read_time: post.readTime,
      image: post.image
    });
    return !error;
  } catch (err) {
    console.error('Supabase saveBlogPost error:', err);
    return false;
  }
}

// ==========================================
// 6. CUSTOMER USERS DB ACTIONS
// ==========================================
export async function dbSaveCustomer(customer: CustomerUser): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from('customers').upsert({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      joined_date: customer.joinedDate,
      membership_badge: customer.membershipBadge,
      reward_points: customer.rewardPoints || 0,
      addresses: customer.addresses,
      points_history: customer.pointsHistory,
      updated_at: new Date().toISOString()
    });
    return !error;
  } catch (err) {
    console.error('Supabase saveCustomer error:', err);
    return false;
  }
}

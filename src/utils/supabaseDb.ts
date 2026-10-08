import { supabase } from './supabaseClient';
import { Product, Order, Review, Coupon, CustomerUser } from '@/types';
import { BlogPost } from '@/data/blogPosts';
import { Category, StoreSettings, StoreContent } from '@/context/AdminContext';

/**
 * Universal Database Service Layer for The Pahadi Sher
 * Automates data saving and syncing across local DB engine (/api/db) and Supabase database.
 */

// Check if Supabase env credentials are configured
export const isSupabaseConfigured = (): boolean => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  return Boolean(url && key && !url.includes('placeholder'));
};

// Generic API caller for client/server database API routes
async function apiCall(endpoint: string, method: string = 'GET', body?: any) {
  try {
    const isClient = typeof window !== 'undefined';
    const baseUrl = isClient ? '' : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
    const res = await fetch(`${baseUrl}/api/db/${endpoint}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
      cache: 'no-store'
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (err) {
    console.warn(`Database API call error (${endpoint}):`, err);
    return null;
  }
}

// Fetch all database collections at once
export async function dbFetchAllCollections() {
  return await apiCall('all', 'GET');
}

// ==========================================
// 1. PRODUCTS DB ACTIONS
// ==========================================
export async function dbFetchProducts(): Promise<Product[] | null> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
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
          availableQuantity: item.available_quantity ?? item.stock_quantity,
          reservedQuantity: item.reserved_quantity || 0,
          soldQuantity: item.sold_quantity || 0,
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
          publishStatus: item.publish_status || 'Published',
          isDiscontinued: item.is_discontinued || false,
          sku: item.sku,
          discountPercent: Math.round(((Number(item.original_price) - Number(item.price)) / Number(item.original_price)) * 100)
        }));
      }
    } catch (err) {
      console.warn('Supabase fetchProducts warning:', err);
    }
  }
  return await apiCall('products', 'GET');
}

export async function dbSaveProduct(product: Product): Promise<boolean> {
  // 1. Always save to API DB
  await apiCall('products', 'POST', product);

  // 2. Also try Supabase
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('products').upsert({
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
        available_quantity: product.availableQuantity ?? product.stockQuantity,
        reserved_quantity: product.reservedQuantity || 0,
        sold_quantity: product.soldQuantity || 0,
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
        publish_status: product.publishStatus || 'Published',
        is_discontinued: product.isDiscontinued || false,
        sku: product.sku,
        updated_at: new Date().toISOString()
      });
    } catch (err) {
      console.error('Supabase saveProduct error:', err);
    }
  }
  return true;
}

export async function dbDeleteProduct(productId: string): Promise<boolean> {
  await apiCall(`products?id=${productId}`, 'DELETE');
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('products').delete().eq('id', productId);
    } catch (err) {
      console.error('Supabase deleteProduct error:', err);
    }
  }
  return true;
}

// ==========================================
// 2. ORDERS DB ACTIONS
// ==========================================
export async function dbFetchOrders(): Promise<Order[] | null> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
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
          shippingStatus: o.shipping_status || 'Processing',
          status: o.status || 'Pending',
          shippingAddress: o.shipping_address || o.address || {},
          address: o.shipping_address || o.address || {},
          trackingNumber: o.tracking_number,
          courierPartner: o.courier_partner,
          trackingUrl: o.tracking_url,
          timeline: o.timeline || [],
          notificationsSent: o.notifications_sent || [],
          refundId: o.refund_id,
          refundAmount: o.refund_amount,
          refundReason: o.refund_reason,
          date: o.date || (o.created_at ? new Date(o.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Today')
        }));
      }
    } catch (err) {
      console.warn('Supabase fetchOrders warning:', err);
    }
  }
  return await apiCall('orders', 'GET');
}

export async function dbSaveOrder(order: Order): Promise<boolean> {
  await apiCall('orders', 'POST', order);
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('orders').upsert({
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
        shipping_status: order.shippingStatus || 'Processing',
        status: order.status,
        shipping_address: (order as any).shippingAddress || order.address,
        tracking_number: order.trackingNumber,
        courier_partner: order.courierPartner,
        tracking_url: order.trackingUrl,
        timeline: order.timeline || [],
        notifications_sent: order.notificationsSent || [],
        refund_id: order.refundId,
        refund_amount: order.refundAmount,
        refund_reason: order.refundReason,
        date: order.date,
        updated_at: new Date().toISOString()
      });
    } catch (err) {
      console.error('Supabase saveOrder error:', err);
    }
  }
  return true;
}

// ==========================================
// 3. REVIEWS DB ACTIONS
// ==========================================
export async function dbFetchReviews(): Promise<Review[] | null> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
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
      }
    } catch (err) {
      console.warn('Supabase fetchReviews warning:', err);
    }
  }
  return await apiCall('reviews', 'GET');
}

export async function dbSaveReview(review: Review): Promise<boolean> {
  await apiCall('reviews', 'POST', review);
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('reviews').upsert({
        id: review.id,
        product_id: review.productId,
        product_name: review.productName,
        author: review.author,
        rating: review.rating,
        title: review.title,
        comment: review.comment,
        date: review.date,
        verified_buyer: review.verifiedBuyer ?? true,
        status: review.status,
        helpful_votes: review.helpfulVotes,
        unhelpful_votes: review.unhelpfulVotes || 0,
        images: review.images,
        reply_text: review.adminReply?.replyText || (review as any).replyText
      });
    } catch (err) {
      console.error('Supabase saveReview error:', err);
    }
  }
  return true;
}

export async function dbDeleteReview(reviewId: string): Promise<boolean> {
  await apiCall(`reviews?id=${reviewId}`, 'DELETE');
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('reviews').delete().eq('id', reviewId);
    } catch (err) {
      console.error('Supabase deleteReview error:', err);
    }
  }
  return true;
}

// ==========================================
// 4. COUPONS DB ACTIONS
// ==========================================
export async function dbFetchCoupons(): Promise<Coupon[] | null> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('coupons').select('*');
      if (!error && data && data.length > 0) {
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
      }
    } catch (err) {
      console.warn('Supabase fetchCoupons warning:', err);
    }
  }
  return await apiCall('coupons', 'GET');
}

export async function dbSaveCoupon(coupon: Coupon): Promise<boolean> {
  await apiCall('coupons', 'POST', coupon);
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('coupons').upsert({
        id: coupon.id,
        code: coupon.code,
        discount_type: coupon.discountType,
        discount_value: coupon.discountValue,
        min_order_amount: coupon.minOrderAmount,
        max_discount: coupon.maxDiscount,
        usage_limit: coupon.usageLimit,
        usage_count: coupon.usageCount,
        per_customer_limit: coupon.perCustomerLimit || 1,
        status: coupon.status,
        start_date: coupon.startDate,
        expiry_date: coupon.expiryDate,
        applicable_product_ids: coupon.applicableProductIds,
        applicable_categories: coupon.applicableCategories
      });
    } catch (err) {
      console.error('Supabase saveCoupon error:', err);
    }
  }
  return true;
}

export async function dbDeleteCoupon(couponId: string): Promise<boolean> {
  await apiCall(`coupons?id=${couponId}`, 'DELETE');
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('coupons').delete().eq('id', couponId);
    } catch (err) {
      console.error('Supabase deleteCoupon error:', err);
    }
  }
  return true;
}

// ==========================================
// 5. BLOG POSTS DB ACTIONS
// ==========================================
export async function dbFetchBlogPosts(): Promise<BlogPost[] | null> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
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
      }
    } catch (err) {
      console.warn('Supabase fetchBlogPosts warning:', err);
    }
  }
  return await apiCall('blog_posts', 'GET');
}

export async function dbSaveBlogPost(post: BlogPost): Promise<boolean> {
  await apiCall('blog_posts', 'POST', post);
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('blog_posts').upsert({
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
    } catch (err) {
      console.error('Supabase saveBlogPost error:', err);
    }
  }
  return true;
}

export async function dbDeleteBlogPost(postId: string): Promise<boolean> {
  await apiCall(`blog_posts?id=${postId}`, 'DELETE');
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('blog_posts').delete().eq('id', postId);
    } catch (err) {
      console.error('Supabase deleteBlogPost error:', err);
    }
  }
  return true;
}

// ==========================================
// 6. CUSTOMERS DB ACTIONS
// ==========================================
export async function dbFetchCustomers(): Promise<CustomerUser[] | null> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('customers').select('*');
      if (!error && data && data.length > 0) return data;
    } catch (err) {}
  }
  return await apiCall('customers', 'GET');
}

export async function dbSaveCustomer(customer: CustomerUser): Promise<boolean> {
  await apiCall('customers', 'POST', customer);
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('customers').upsert({
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
    } catch (err) {
      console.error('Supabase saveCustomer error:', err);
    }
  }
  return true;
}

// ==========================================
// 7. CATEGORIES DB ACTIONS
// ==========================================
export async function dbFetchCategories(): Promise<Category[] | null> {
  return await apiCall('categories', 'GET');
}

export async function dbSaveCategory(category: Category): Promise<boolean> {
  await apiCall('categories', 'POST', category);
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('categories').upsert({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        product_count: category.productCount || 0,
        featured: category.featured || false,
        status: category.status || 'Active'
      });
    } catch (err) {}
  }
  return true;
}

// ==========================================
// 8. STORE SETTINGS & CONTENT DB ACTIONS
// ==========================================
export async function dbFetchStoreSettings() {
  return await apiCall('store_settings', 'GET');
}

export async function dbSaveStoreSettings(settings: Partial<StoreSettings & StoreContent>): Promise<boolean> {
  await apiCall('store_settings', 'POST', settings);
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('store_settings').upsert({
        id: 'config',
        ...settings,
        updated_at: new Date().toISOString()
      });
    } catch (err) {}
  }
  return true;
}

// ==========================================
// 9. SHIPPING CONFIG DB ACTIONS
// ==========================================
export async function dbFetchShippingConfig() {
  return await apiCall('shipping_config', 'GET');
}

export async function dbSaveShippingConfig(config: any): Promise<boolean> {
  await apiCall('shipping_config', 'POST', config);
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('shipping_config').upsert({
        id: 'shipping',
        flat_shipping_fee: config.flatShippingFee,
        free_shipping_threshold: config.freeShippingThreshold,
        pincode_zones: config.pincodeZones,
        product_rules: config.productRules,
        cod_config: config.codConfig,
        updated_at: new Date().toISOString()
      });
    } catch (err) {}
  }
  return true;
}

// ==========================================
// 10. HOMEPAGE CONFIG DB ACTIONS
// ==========================================
export async function dbFetchHomepageConfig() {
  return await apiCall('homepage_config', 'GET');
}

export async function dbSaveHomepageConfig(config: any): Promise<boolean> {
  await apiCall('homepage_config', 'POST', config);
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('homepage_config').upsert({
        id: 'homepage',
        sections: config.sections,
        updated_at: new Date().toISOString()
      });
    } catch (err) {}
  }
  return true;
}

// ==========================================
// 11. INVENTORY LOGS DB ACTIONS
// ==========================================
export async function dbSaveInventoryLog(log: any): Promise<boolean> {
  await apiCall('inventory_logs', 'POST', log);
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('inventory_logs').upsert({
        id: log.id,
        date: log.date,
        product_id: log.productId,
        product_name: log.productName,
        variant_id: log.variantId,
        variant_name: log.variantName,
        sku: log.sku,
        previous_stock: log.previousStock,
        new_stock: log.newStock,
        adjustment: log.adjustment,
        reason: log.reason,
        admin: log.admin
      });
    } catch (err) {}
  }
  return true;
}

// ==========================================
// 12. CARTS & WISHLISTS DB ACTIONS
// ==========================================
export async function dbSaveCart(userId: string, cartItems: any[], appliedCoupon?: any): Promise<boolean> {
  await apiCall('carts', 'POST', { userId, items: cartItems, appliedCoupon });
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('carts').upsert({
        user_id: userId,
        items: cartItems,
        applied_coupon: appliedCoupon,
        updated_at: new Date().toISOString()
      });
    } catch (err) {}
  }
  return true;
}

export async function dbSaveWishlist(userId: string, productIds: string[]): Promise<boolean> {
  await apiCall('wishlists', 'POST', { userId, productIds });
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('wishlists').upsert({
        user_id: userId,
        product_ids: productIds,
        updated_at: new Date().toISOString()
      });
    } catch (err) {}
  }
  return true;
}

// Auto Seed Database Initial Collections
export async function dbSeedDatabaseIfEmpty(
  products: Product[],
  reviews: Review[],
  coupons: Coupon[],
  blogPosts: BlogPost[]
) {
  // Handled automatically by serverDb on startup
}

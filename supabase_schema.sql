-- ==========================================
-- Supabase Schema for The Pahadi Sher E-Commerce Store
-- Comprehensive SQL table definitions & public access policies
-- ==========================================

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  rating NUMERIC DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  category TEXT,
  category_name TEXT,
  origin TEXT,
  altitude TEXT,
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 100,
  available_quantity INTEGER DEFAULT 100,
  reserved_quantity INTEGER DEFAULT 0,
  sold_quantity INTEGER DEFAULT 0,
  net_quantity TEXT,
  lab_certificate_no TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  variants JSONB DEFAULT '[]'::jsonb,
  description TEXT,
  benefits JSONB DEFAULT '[]'::jsonb,
  ingredients JSONB DEFAULT '[]'::jsonb,
  how_to_use TEXT,
  subtitle TEXT,
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'Published',
  publish_status TEXT DEFAULT 'Published',
  is_discontinued BOOLEAN DEFAULT false,
  sku TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  items JSONB DEFAULT '[]'::jsonb,
  subtotal NUMERIC DEFAULT 0,
  shipping_cost NUMERIC DEFAULT 0,
  discount_amount NUMERIC DEFAULT 0,
  total NUMERIC DEFAULT 0,
  payment_method TEXT DEFAULT 'COD',
  payment_status TEXT DEFAULT 'Pending',
  shipping_status TEXT DEFAULT 'Processing',
  status TEXT DEFAULT 'Pending',
  shipping_address JSONB DEFAULT '{}'::jsonb,
  tracking_number TEXT,
  courier_partner TEXT,
  tracking_url TEXT,
  timeline JSONB DEFAULT '[]'::jsonb,
  notifications_sent JSONB DEFAULT '[]'::jsonb,
  refund_id TEXT,
  refund_amount NUMERIC,
  refund_reason TEXT,
  date TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
  id TEXT PRIMARY KEY,
  product_id TEXT,
  product_name TEXT,
  author TEXT,
  location TEXT,
  rating NUMERIC DEFAULT 5,
  title TEXT,
  comment TEXT,
  date TEXT,
  verified_buyer BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'Approved',
  helpful_votes INTEGER DEFAULT 0,
  unhelpful_votes INTEGER DEFAULT 0,
  images JSONB DEFAULT '[]'::jsonb,
  reply_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. COUPONS TABLE
CREATE TABLE IF NOT EXISTS public.coupons (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  discount_type TEXT DEFAULT 'percentage',
  discount_value NUMERIC DEFAULT 0,
  min_order_amount NUMERIC DEFAULT 0,
  max_discount NUMERIC,
  usage_limit INTEGER,
  usage_count INTEGER DEFAULT 0,
  per_customer_limit INTEGER DEFAULT 1,
  status TEXT DEFAULT 'Active',
  start_date TEXT,
  expiry_date TEXT,
  applicable_product_ids JSONB DEFAULT '[]'::jsonb,
  applicable_categories JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. BLOG POSTS TABLE
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  author TEXT,
  author_role TEXT,
  publish_date TEXT,
  read_time TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS public.customers (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  joined_date TEXT,
  membership_badge TEXT,
  reward_points INTEGER DEFAULT 0,
  addresses JSONB DEFAULT '[]'::jsonb,
  points_history JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  product_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. STORE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.store_settings (
  id TEXT PRIMARY KEY DEFAULT 'config',
  store_name TEXT DEFAULT 'The Pahadi Sher',
  support_email TEXT DEFAULT 'chhavibohra@gmail.com',
  support_phone TEXT DEFAULT '+91 9997408567',
  currency_symbol TEXT DEFAULT '₹',
  tax_rate_percent NUMERIC DEFAULT 5,
  free_shipping_threshold NUMERIC DEFAULT 999,
  razorpay_mode TEXT DEFAULT 'Test',
  auto_fulfill_digital BOOLEAN DEFAULT false,
  announcement_bar_text TEXT,
  announcement_active BOOLEAN DEFAULT true,
  hero_heading TEXT,
  hero_subheading TEXT,
  banner_tagline TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. SHIPPING CONFIG TABLE
CREATE TABLE IF NOT EXISTS public.shipping_config (
  id TEXT PRIMARY KEY DEFAULT 'shipping',
  flat_shipping_fee NUMERIC DEFAULT 99,
  free_shipping_threshold NUMERIC DEFAULT 999,
  pincode_zones JSONB DEFAULT '[]'::jsonb,
  product_rules JSONB DEFAULT '[]'::jsonb,
  cod_config JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. HOMEPAGE CONFIG TABLE
CREATE TABLE IF NOT EXISTS public.homepage_config (
  id TEXT PRIMARY KEY DEFAULT 'homepage',
  sections JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. INVENTORY LOGS TABLE
CREATE TABLE IF NOT EXISTS public.inventory_logs (
  id TEXT PRIMARY KEY,
  date TEXT,
  product_id TEXT,
  product_name TEXT,
  variant_id TEXT,
  variant_name TEXT,
  sku TEXT,
  previous_stock INTEGER,
  new_stock INTEGER,
  adjustment INTEGER,
  reason TEXT,
  admin TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. CARTS & WISHLISTS TABLES
CREATE TABLE IF NOT EXISTS public.carts (
  user_id TEXT PRIMARY KEY,
  items JSONB DEFAULT '[]'::jsonb,
  applied_coupon JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.wishlists (
  user_id TEXT PRIMARY KEY,
  product_ids JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY (RLS) & PUBLIC ACCESS POLICIES
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  CREATE POLICY "Allow public all on products" ON public.products FOR ALL USING (true);
  CREATE POLICY "Allow public all on orders" ON public.orders FOR ALL USING (true);
  CREATE POLICY "Allow public all on reviews" ON public.reviews FOR ALL USING (true);
  CREATE POLICY "Allow public all on coupons" ON public.coupons FOR ALL USING (true);
  CREATE POLICY "Allow public all on blog_posts" ON public.blog_posts FOR ALL USING (true);
  CREATE POLICY "Allow public all on customers" ON public.customers FOR ALL USING (true);
  CREATE POLICY "Allow public all on categories" ON public.categories FOR ALL USING (true);
  CREATE POLICY "Allow public all on store_settings" ON public.store_settings FOR ALL USING (true);
  CREATE POLICY "Allow public all on shipping_config" ON public.shipping_config FOR ALL USING (true);
  CREATE POLICY "Allow public all on homepage_config" ON public.homepage_config FOR ALL USING (true);
  CREATE POLICY "Allow public all on inventory_logs" ON public.inventory_logs FOR ALL USING (true);
  CREATE POLICY "Allow public all on carts" ON public.carts FOR ALL USING (true);
  CREATE POLICY "Allow public all on wishlists" ON public.wishlists FOR ALL USING (true);
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

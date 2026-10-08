-- ==========================================
-- Supabase Schema for The Pahadi Sher E-Commerce Store
-- Execute this script in your Supabase SQL Editor if setting up tables for the first time.
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
  status TEXT DEFAULT 'Pending',
  shipping_address JSONB DEFAULT '{}'::jsonb,
  tracking_number TEXT,
  courier_partner TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
  id TEXT PRIMARY KEY,
  product_id TEXT,
  product_name TEXT,
  author TEXT,
  rating NUMERIC DEFAULT 5,
  title TEXT,
  comment TEXT,
  date TEXT,
  status TEXT DEFAULT 'Approved',
  helpful_votes INTEGER DEFAULT 0,
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

-- ENABLE ROW LEVEL SECURITY (RLS) & PUBLIC READ/WRITE POLICIES
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update/delete on products" ON public.products FOR ALL USING (true);

CREATE POLICY "Allow public read access on orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update/delete on orders" ON public.orders FOR ALL USING (true);

CREATE POLICY "Allow public read access on reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update/delete on reviews" ON public.reviews FOR ALL USING (true);

CREATE POLICY "Allow public read access on coupons" ON public.coupons FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update/delete on coupons" ON public.coupons FOR ALL USING (true);

CREATE POLICY "Allow public read access on blog_posts" ON public.blog_posts FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update/delete on blog_posts" ON public.blog_posts FOR ALL USING (true);

CREATE POLICY "Allow public read access on customers" ON public.customers FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update/delete on customers" ON public.customers FOR ALL USING (true);

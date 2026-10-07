-- =========================================================
-- The Pahadi Sher - Official Supabase Database Schema
-- Execute this SQL in your Supabase SQL Editor to set up tables.
-- =========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC NOT NULL,
  rating NUMERIC DEFAULT 5.0,
  reviews_count INT DEFAULT 0,
  category TEXT NOT NULL,
  category_name TEXT NOT NULL,
  origin TEXT NOT NULL,
  altitude TEXT NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INT DEFAULT 100,
  net_quantity TEXT NOT NULL,
  lab_certificate_no TEXT,
  images JSONB NOT NULL DEFAULT '[]'::jsonb,
  variants JSONB DEFAULT '[]'::jsonb,
  description TEXT NOT NULL,
  benefits JSONB DEFAULT '[]'::jsonb,
  ingredients JSONB DEFAULT '[]'::jsonb,
  how_to_use TEXT,
  subtitle TEXT,
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'Published',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image TEXT,
  product_count INT DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  subtotal NUMERIC NOT NULL,
  shipping_cost NUMERIC DEFAULT 0,
  discount_amount NUMERIC DEFAULT 0,
  total NUMERIC NOT NULL,
  payment_method TEXT DEFAULT 'COD',
  payment_status TEXT DEFAULT 'Pending',
  status TEXT DEFAULT 'Placed',
  shipping_address JSONB NOT NULL DEFAULT '{}'::jsonb,
  tracking_number TEXT,
  courier_partner TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  author TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  comment TEXT NOT NULL,
  date TEXT NOT NULL,
  status TEXT DEFAULT 'Approved',
  helpful_votes INT DEFAULT 0,
  images JSONB DEFAULT '[]'::jsonb,
  reply_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. COUPONS TABLE
CREATE TABLE IF NOT EXISTS public.coupons (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT NOT NULL,
  discount_value NUMERIC NOT NULL,
  min_order_amount NUMERIC DEFAULT 0,
  max_discount NUMERIC,
  usage_limit INT,
  usage_count INT DEFAULT 0,
  status TEXT DEFAULT 'Active',
  start_date TEXT,
  expiry_date TEXT,
  applicable_product_ids JSONB DEFAULT '[]'::jsonb,
  applicable_categories JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. BLOG POSTS TABLE
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT NOT NULL,
  author_role TEXT,
  publish_date TEXT NOT NULL,
  read_time TEXT DEFAULT '5 min read',
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS public.customers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  joined_date TEXT,
  membership_badge TEXT DEFAULT 'Himalayan Explorer',
  reward_points INT DEFAULT 0,
  addresses JSONB DEFAULT '[]'::jsonb,
  points_history JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) & Grant Public Read Access for Storefront
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active store data
CREATE POLICY "Allow Public Select Products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow Public Select Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow Public Select Reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Allow Public Select Coupons" ON public.coupons FOR SELECT USING (true);
CREATE POLICY "Allow Public Select Blog Posts" ON public.blog_posts FOR SELECT USING (true);

-- Allow public inserts for customer actions (orders, reviews, accounts)
CREATE POLICY "Allow Public Insert Orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Public Insert Reviews" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Public Insert Customers" ON public.customers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Public Update Customers" ON public.customers FOR UPDATE USING (true);

import fs from 'fs';
import path from 'path';
import { products as initialProducts } from '@/data/products';
import { initialOrders } from '@/data/orders';
import { reviews as initialReviews } from '@/data/reviews';
import { coupons as initialCoupons } from '@/data/coupons';
import { blogPosts as initialBlogPosts } from '@/data/blogPosts';
import { initialShippingConfig } from '@/data/shipping';
import { initialHomepageConfig } from '@/data/homepage';
import { initialInventoryLogs } from '@/data/inventoryLogs';

const DB_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'db_store.json');

export interface DatabaseStore {
  products: any[];
  orders: any[];
  reviews: any[];
  coupons: any[];
  blog_posts: any[];
  customers: any[];
  categories: any[];
  store_settings: any;
  shipping_config: any;
  homepage_config: any;
  inventory_logs: any[];
  carts: Record<string, any>;
  wishlists: Record<string, any>;
}

const defaultCategories = [
  { id: 'cat-1', name: 'Shilajit', slug: 'shilajit', description: 'Pure Himalayan Resin & Gold Grade Supplements', productCount: 4, featured: true, status: 'Active' },
  { id: 'cat-2', name: 'Organic Ghee', slug: 'organic-ghee', description: 'Traditional Pure Cow Desi Ghee', productCount: 3, featured: true, status: 'Active' },
  { id: 'cat-3', name: 'Kashmiri Kesar', slug: 'kashmiri-kesar', description: 'Pure Mongra Saffron Strands', productCount: 2, featured: true, status: 'Active' },
  { id: 'cat-4', name: 'Herbal Teas', slug: 'herbal-teas', description: 'Artisanal Pahadi Chamomile & Rhododendron Teas', productCount: 5, featured: false, status: 'Active' },
  { id: 'cat-5', name: 'Wild Honey', slug: 'wild-honey', description: 'Unprocessed Himalayan Multiflora Honey', productCount: 3, featured: true, status: 'Active' },
  { id: 'cat-6', name: 'Ayurvedic Oils', slug: 'ayurvedic-oils', description: 'Cold-pressed Apricot & Walnut Seed Oils', productCount: 2, featured: false, status: 'Draft' }
];

const defaultStoreSettings = {
  storeName: 'The Pahadi Sher',
  supportEmail: 'chhavibohra@gmail.com',
  supportPhone: '+91 9997408567',
  currencySymbol: '₹',
  taxRatePercent: 5,
  freeShippingThreshold: 999,
  razorpayMode: 'Test',
  autoFulfillDigital: false,
  announcementBarText: '🏔️ Pure Himalayan Shilajit & Pure Cow Ghee - 100% Organic Purity | Free Shipping above ₹999!',
  announcementActive: true,
  heroHeading: 'Pure Himalayan Wellness, Harvested From High Altitudes',
  heroSubheading: 'Authentic 100% pure Himalayan Shilajit, Pure Cow Ghee & Mongra Kesar delivered direct from Uttarakhand villagers to your doorstep.',
  bannerTagline: 'Uncompromising Quality • Handcrafted in Small Batches • Zero Chemicals'
};

function getDefaultDb(): DatabaseStore {
  return {
    products: initialProducts,
    orders: initialOrders,
    reviews: initialReviews,
    coupons: initialCoupons,
    blog_posts: initialBlogPosts,
    customers: [],
    categories: defaultCategories,
    store_settings: defaultStoreSettings,
    shipping_config: initialShippingConfig,
    homepage_config: initialHomepageConfig,
    inventory_logs: initialInventoryLogs,
    carts: {},
    wishlists: {}
  };
}

export function readDb(): DatabaseStore {
  try {
    if (!fs.existsSync(DB_FILE_PATH)) {
      const defaultDb = getDefaultDb();
      writeDb(defaultDb);
      return defaultDb;
    }
    const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    return {
      ...getDefaultDb(),
      ...parsed
    };
  } catch (err) {
    console.error('Error reading DB store file:', err);
    return getDefaultDb();
  }
}

export function writeDb(data: DatabaseStore): boolean {
  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing DB store file:', err);
    return false;
  }
}

export function getCollection(table: keyof DatabaseStore): any {
  const db = readDb();
  return db[table];
}

export function saveItem(table: keyof DatabaseStore, item: any): boolean {
  const db = readDb();
  const collection = db[table];

  if (Array.isArray(collection)) {
    const itemId = item.id || item.code || item.userId || item.email;
    if (!itemId) return false;

    const index = collection.findIndex(
      (existing: any) =>
        (existing.id && existing.id === item.id) ||
        (existing.code && existing.code === item.code) ||
        (existing.email && existing.email === item.email) ||
        (existing.slug && existing.slug === item.slug)
    );

    if (index !== -1) {
      collection[index] = { ...collection[index], ...item };
    } else {
      collection.unshift(item);
    }
    db[table] = collection as any;
  } else if (typeof collection === 'object') {
    db[table] = { ...collection, ...item } as any;
  }

  return writeDb(db);
}

export function deleteItem(table: keyof DatabaseStore, id: string): boolean {
  const db = readDb();
  const collection = db[table];

  if (Array.isArray(collection)) {
    db[table] = collection.filter(
      (item: any) => item.id !== id && item.code !== id && item.slug !== id
    ) as any;
    return writeDb(db);
  }
  return false;
}

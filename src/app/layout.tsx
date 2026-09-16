import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AdminProvider } from '@/context/AdminContext';
import { CustomerAuthProvider } from '@/context/CustomerAuthContext';
import { CustomerLayoutWrapper } from '@/components/layout/CustomerLayoutWrapper';
import { generateOrganizationSchema, SITE_URL } from '@/utils/seoSchema';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'The Pahadi Sher | Pure Himalayan Shilajit, Pure Cow Ghee & Organic Honey',
    template: '%s | The Pahadi Sher'
  },
  description: 'Authentic 100% pure high-altitude Himalayan products harvested above 18,000 ft in Kumaon. Shilajit Resin, Pure Cow Bilona Ghee, Raw Rhododendron Honey, and Herbal Teas.',
  keywords: ['ThePahadiSher', 'Pahadi Sher', 'Himalayan Shilajit', 'Pure Shilajit 18000 ft', 'Pure Cow Ghee', 'Bilona Ghee', 'Buransh Honey', 'Kumaon Organic', 'Himalayan Products'],
  authors: [{ name: 'The Pahadi Sher' }],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'The Pahadi Sher | Pure Himalayan Shilajit & Mountain Treasures',
    description: '100% Pure High-Altitude Himalayan Shilajit, Pure Cow Ghee & Wildflower Honey.',
    url: SITE_URL,
    siteName: 'The Pahadi Sher',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'The Pahadi Sher Himalayan Wellness',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1B3626',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-pahadi-offwhite text-pahadi-charcoal font-sans min-h-screen flex flex-col antialiased">
        <CustomerAuthProvider>
          <AdminProvider>
            <CartProvider>
              <WishlistProvider>
                <CustomerLayoutWrapper>{children}</CustomerLayoutWrapper>
              </WishlistProvider>
            </CartProvider>
          </AdminProvider>
        </CustomerAuthProvider>
      </body>
    </html>
  );
}

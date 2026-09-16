import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Sparkles, ArrowRight, ChevronRight, Home, ShieldCheck } from 'lucide-react';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SITE_URL, generateBreadcrumbSchema, generateOrganizationSchema } from '@/utils/seoSchema';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) {
    return {
      title: 'Category Not Found | The Pahadi Sher',
      description: 'The requested category could not be found.',
    };
  }

  const title = `${category.name} Collection | 100% Pure Himalayan ${category.name}`;
  const description = category.description;
  const canonicalUrl = `${SITE_URL}/categories/${category.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'The Pahadi Sher',
      images: [
        {
          url: category.image,
          width: 1200,
          height: 630,
          alt: `${category.name} - The Pahadi Sher`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [category.image],
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(
    (p) => p.category === category.id || p.category === category.slug
  );

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Categories', url: '/products' },
    { name: category.name, url: `/categories/${category.slug}` },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      {/* Inject Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="bg-pahadi-offwhite min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs text-pahadi-brown/80 font-sans pt-2">
            <Link href="/" className="hover:text-pahadi-green flex items-center gap-1">
              <Home className="w-3.5 h-3.5 text-pahadi-gold" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-pahadi-sand" />
            <Link href="/products" className="hover:text-pahadi-green">
              Shop
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-pahadi-sand" />
            <span className="font-bold text-pahadi-green">{category.name}</span>
          </nav>

          {/* Hero Banner */}
          <div className="relative rounded-3xl overflow-hidden bg-pahadi-green-dark text-pahadi-offwhite p-8 md:p-14 border border-pahadi-gold/30 shadow-2xl">
            <div className="absolute inset-0 z-0 opacity-30">
              <Image
                src={category.image}
                alt={`${category.name} Himalayan Collection`}
                fill
                priority
                className="object-cover object-center"
              />
            </div>
            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="inline-flex items-center space-x-2 bg-pahadi-gold/20 text-pahadi-gold px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-pahadi-gold/30 backdrop-blur-md">
                <Sparkles className="w-4 h-4" />
                <span>{category.highlightTag || '100% PURE HIMALAYAN ORIGIN'}</span>
              </div>
              <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-white leading-tight">
                Authentic {category.name} Collection
              </h1>
              <p className="text-sm sm:text-base text-pahadi-sand/90 font-sans leading-relaxed">
                {category.description}
              </p>
              <div className="flex items-center space-x-4 pt-2 text-xs text-pahadi-sand font-semibold">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-4 h-4 text-pahadi-gold" />
                  <span>{categoryProducts.length} Verified Items</span>
                </span>
                <span>•</span>
                <span>NABL Lab Certified</span>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between border-b border-pahadi-sand pb-4">
              <h2 className="font-playfair text-2xl font-bold text-pahadi-green">
                Available {category.name} Products ({categoryProducts.length})
              </h2>
              <Link
                href="/products"
                className="text-xs uppercase font-bold tracking-wider text-pahadi-green hover:text-pahadi-brown flex items-center space-x-1"
              >
                <span>View All Products →</span>
              </Link>
            </div>

            {categoryProducts.length > 0 ? (
              <ProductGrid products={categoryProducts} columns={3} />
            ) : (
              <div className="bg-pahadi-paper p-12 rounded-3xl text-center border border-pahadi-sand space-y-3">
                <h3 className="font-playfair text-xl font-bold text-pahadi-green">
                  Fresh Batch Harvesting in Progress
                </h3>
                <p className="text-xs text-pahadi-charcoal-muted max-w-md mx-auto">
                  New single-origin mountain harvests for {category.name} are currently being purified and lab-tested.
                </p>
                <Link
                  href="/products"
                  className="inline-block bg-pahadi-green text-pahadi-gold px-6 py-2.5 rounded-xl text-xs uppercase font-bold"
                >
                  Explore Other Categories
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

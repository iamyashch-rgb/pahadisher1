import { Product, Review } from '@/types';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://thepahadisher.com';
export const SITE_NAME = 'The Pahadi Sher';
export const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200';

/**
 * Generates Organization JSON-LD Schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: '100% Pure Himalayan Shilajit, Pure Cow Ghee & Authentic Mountain Superfoods sourced ethically from high-altitude Uttarakhand.',
    foundingLocation: {
      '@type': 'Place',
      name: 'Pithoragarh, Uttarakhand, India'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'The Pahadi Sher, Near Aptech',
      addressLocality: 'Pithoragarh',
      addressRegion: 'Uttarakhand',
      postalCode: '262501',
      addressCountry: 'IN'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9997408567',
      contactType: 'customer service',
      email: 'chhavibohra@gmail.com',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi']
    },
    sameAs: [
      'https://www.instagram.com/pahadi_sher05/',
      'https://www.facebook.com/profile.php?id=100094324785060',
      'https://www.youtube.com/@nehabohra1280/featured'
    ]
  };
}

/**
 * Generates Product JSON-LD Schema including Offers, AggregateRating, and Reviews
 */
export function generateProductSchema(product: Product, productReviews: Review[] = []) {
  const canonicalUrl = `${SITE_URL}/products/${product.slug}`;
  const images = product.images.map(img => img.startsWith('http') ? img : `${SITE_URL}${img}`);
  const mainImage = images[0] || DEFAULT_OG_IMAGE;

  // Compute aggregate rating
  const reviewsCount = productReviews.length > 0 ? productReviews.length : product.reviewsCount || 1;
  const ratingValue = productReviews.length > 0 
    ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
    : product.rating.toFixed(1);

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: images,
    description: product.description || product.shortDescription || `${product.name} - 100% Pure Himalayan Origin`,
    sku: product.sku || product.id,
    mpn: product.id,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME
    },
    offers: {
      '@type': 'Offer',
      url: canonicalUrl,
      priceCurrency: 'INR',
      price: product.price,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.inStock !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: SITE_NAME
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratingValue,
      reviewCount: reviewsCount,
      bestRating: '5',
      worstRating: '1'
    }
  };

  // Add individual reviews to schema if present
  if (productReviews.length > 0) {
    schema.review = productReviews.map(r => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: r.author
      },
      datePublished: r.date,
      reviewBody: r.comment,
      name: r.title,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: '5',
        worstRating: '1'
      }
    }));
  }

  return schema;
}

/**
 * Generates BreadcrumbList JSON-LD Schema
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`
    }))
  };
}

/**
 * Generates FAQPage JSON-LD Schema
 */
export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Generates BlogPosting / Article JSON-LD Schema
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  slug: string;
  publishDate: string;
  author: string;
  image: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: article.image.startsWith('http') ? article.image : `${SITE_URL}${article.image}`,
    author: {
      '@type': 'Person',
      name: article.author
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`
      }
    },
    datePublished: article.publishDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${article.slug}`
    }
  };
}

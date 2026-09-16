'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Clock, User, Calendar, ArrowLeft, ChevronRight, Home, Share2, Sparkles } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { blogPosts as fallbackBlogPosts } from '@/data/blogPosts';
import { products } from '@/data/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { 
  SITE_URL, 
  generateArticleSchema, 
  generateBreadcrumbSchema, 
  generateOrganizationSchema 
} from '@/utils/seoSchema';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { blogPosts } = useAdmin();
  const allPosts = (blogPosts && blogPosts.length > 0) ? blogPosts : fallbackBlogPosts;
  const post = allPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="font-playfair text-2xl font-bold text-pahadi-green">Article Not Found</h2>
        <p className="text-xs text-pahadi-charcoal-muted">The journal article you are looking for does not exist or may have been moved.</p>
        <Link href="/blog" className="px-5 py-2.5 bg-pahadi-green text-pahadi-gold font-bold text-xs rounded-xl uppercase">
          ← Back to All Articles
        </Link>
      </div>
    );
  }

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Journal', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ];

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    publishDate: post.publishDate,
    author: post.author,
    image: post.image,
  });

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const organizationSchema = generateOrganizationSchema();

  // Related products to feature at bottom of article
  const featuredProducts = products.slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <article className="bg-pahadi-offwhite min-h-screen py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs text-pahadi-brown/80 font-sans">
            <Link href="/" className="hover:text-pahadi-green flex items-center gap-1">
              <Home className="w-3.5 h-3.5 text-pahadi-gold" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-pahadi-sand" />
            <Link href="/blog" className="hover:text-pahadi-green">
              Journal
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-pahadi-sand" />
            <span className="font-bold text-pahadi-green truncate max-w-xs">{post.title}</span>
          </nav>

          {/* Article Header */}
          <div className="space-y-4">
            <span className="bg-pahadi-green text-pahadi-gold px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block">
              {post.category}
            </span>

            <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-pahadi-green leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-pahadi-brown border-y border-pahadi-sand py-4 font-sans">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-pahadi-gold" />
                <span className="font-semibold text-pahadi-green">{post.author}</span>
                <span className="text-[11px] text-pahadi-brown">({post.authorRole})</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-pahadi-gold" />
                <span>{post.publishDate}</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-pahadi-gold" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Featured Header Graphic */}
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-pahadi-gold/40 shadow-xl bg-pahadi-paper">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Main Article Body */}
          <div 
            className="prose prose-emerald max-w-none font-sans text-pahadi-charcoal leading-relaxed text-sm sm:text-base prose-headings:font-playfair prose-headings:text-pahadi-green prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-p:mb-4 prose-li:mb-2"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author Box */}
          <div className="bg-pahadi-paper p-6 rounded-3xl border border-pahadi-sand flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-pahadi-green text-pahadi-gold flex items-center justify-center font-playfair font-bold text-lg shrink-0">
              {post.author[0]}
            </div>
            <div>
              <h4 className="font-playfair text-base font-bold text-pahadi-green">{post.author}</h4>
              <p className="text-xs text-pahadi-brown">{post.authorRole} • The Pahadi Sher Ayurvedic Council</p>
            </div>
          </div>

          {/* Related Products Showcase */}
          <div className="pt-10 border-t border-pahadi-sand space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-pahadi-brown">Featured Wellness</span>
                <h3 className="font-playfair text-2xl font-bold text-pahadi-green">
                  Pure Himalayan Treasures
                </h3>
              </div>
              <Link
                href="/products"
                className="text-xs uppercase font-bold tracking-wider text-pahadi-green hover:text-pahadi-brown"
              >
                View All →
              </Link>
            </div>

            <ProductGrid products={featuredProducts} columns={3} />
          </div>
        </div>
      </article>
    </>
  );
}

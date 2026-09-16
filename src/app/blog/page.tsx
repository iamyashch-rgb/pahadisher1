'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, Clock, User, BookOpen } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { blogPosts as fallbackBlogPosts } from '@/data/blogPosts';
import { SITE_URL, generateBreadcrumbSchema, generateOrganizationSchema } from '@/utils/seoSchema';

export default function BlogListingPage() {
  const { blogPosts } = useAdmin();
  const displayPosts = (blogPosts && blogPosts.length > 0) ? blogPosts : fallbackBlogPosts;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Himalayan Journal', url: '/blog' },
  ]);
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="bg-pahadi-offwhite min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 bg-pahadi-green/10 text-pahadi-green px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
              <BookOpen className="w-4 h-4 text-pahadi-gold" />
              <span>THE HIMALAYAN JOURNAL</span>
            </div>
            <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-pahadi-green">
              Ayurvedic Wisdom & Mountain Guides
            </h1>
            <p className="text-sm text-pahadi-charcoal-muted font-sans leading-relaxed">
              Explore evidence-based purity tests, traditional foraging practices, and high-altitude wellness insights written by our botanists and Ayurvedic experts.
            </p>
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayPosts.map((post) => (
              <article
                key={post.id}
                className="bg-pahadi-paper rounded-3xl border border-pahadi-border/80 overflow-hidden shadow-pahadi-sm hover:shadow-pahadi-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="relative aspect-[16/10] overflow-hidden bg-pahadi-sand/40">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-pahadi-green text-pahadi-gold px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center space-x-4 text-[11px] text-pahadi-brown font-semibold">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-pahadi-gold" />
                        <span>{post.readTime}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <User className="w-3.5 h-3.5 text-pahadi-gold" />
                        <span>{post.author}</span>
                      </span>
                    </div>

                    <h2 className="font-playfair text-xl font-bold text-pahadi-green group-hover:text-pahadi-brown transition-colors leading-snug">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="text-xs text-pahadi-charcoal-muted font-sans leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-pahadi-green hover:text-pahadi-brown transition-colors group-hover:translate-x-1 duration-300"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 text-pahadi-gold" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

'use client';

import React from 'react';
import { useAdmin } from '@/context/AdminContext';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedCatalogue } from '@/components/home/FeaturedCatalogue';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FromTheHimalayasSection } from '@/components/home/FromTheHimalayasSection';
import { WhyPahadiSher } from '@/components/home/WhyPahadiSher';
import { BestSellers } from '@/components/home/BestSellers';
import { SourcingProcess } from '@/components/home/SourcingProcess';
import { TrustSection } from '@/components/home/TrustSection';
import { Testimonials } from '@/components/home/Testimonials';
import { ComboOffers } from '@/components/home/ComboOffers';
import { InstagramReelsSection } from '@/components/home/InstagramReelsSection';
import { SocialGallery } from '@/components/home/SocialGallery';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { PointsRewardBanner } from '@/components/home/PointsRewardBanner';

export default function HomePage() {
  const { homepageConfig } = useAdmin();

  // Get active sections sorted by display order
  const activeSections = [...homepageConfig.sections]
    .filter(sec => sec.enabled)
    .sort((a, b) => a.order - b.order);

  const renderSection = (id: string) => {
    switch (id) {
      case 'hero':
        return (
          <React.Fragment key="hero-group">
            <HeroSection key="hero" />
            <PointsRewardBanner key="points_banner" />
          </React.Fragment>
        );
      case 'featured_catalogue':
        return <FeaturedCatalogue key="featured_catalogue" />;
      case 'category_grid':
        return <CategoryGrid key="category_grid" />;
      case 'from_the_himalayas':
        return <FromTheHimalayasSection key="from_the_himalayas" />;
      case 'why_us':
        return null;
      case 'best_sellers':
        return <BestSellers key="best_sellers" />;
      case 'sourcing_process':
        return null;
      case 'trust_section':
        return <TrustSection key="trust_section" />;
      case 'testimonials':
        return <Testimonials key="testimonials" />;
      case 'combo_offers':
        return <ComboOffers key="combo_offers" />;
      case 'instagram_reels':
        return <InstagramReelsSection key="instagram_reels" />;
      case 'social_gallery':
        return <SocialGallery key="social_gallery" />;
      case 'newsletter':
        return <NewsletterSection key="newsletter" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-0">
      {activeSections.map(sec => renderSection(sec.id))}
    </div>
  );
}

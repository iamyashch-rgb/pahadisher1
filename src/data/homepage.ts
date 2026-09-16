import { HomepageConfig } from '@/types';

export const initialHomepageConfig: HomepageConfig = {
  sections: [
    { id: 'hero', name: 'Hero Section', enabled: true, order: 1 },
    { id: 'featured_catalogue', name: 'Featured Catalogue', enabled: true, order: 2 },
    { id: 'category_grid', name: 'Shop by Category', enabled: false, order: 3 },
    { id: 'brand_story', name: 'Brand Sourcing Story', enabled: false, order: 4 },
    { id: 'from_the_himalayas', name: 'From The Himalayas Brand Story', enabled: true, order: 5 },
    { id: 'why_us', name: 'Why The Pahadi Sher', enabled: false, order: 6 },
    { id: 'best_sellers', name: 'Best Sellers', enabled: true, order: 7 },
    { id: 'sourcing_process', name: 'Himalayan Sourcing Process', enabled: false, order: 8 },
    { id: 'trust_section', name: 'Product Benefits & Lab Trust', enabled: true, order: 9 },
    { id: 'testimonials', name: 'Customer Testimonials', enabled: true, order: 10 },
    { id: 'combo_offers', name: 'Special Combo Banners', enabled: false, order: 11 },
    { id: 'instagram_reels', name: 'Instagram Reels (@pahadi_sher05)', enabled: true, order: 12 },
    { id: 'social_gallery', name: 'Instagram & Social Gallery', enabled: true, order: 13 },
    { id: 'newsletter', name: 'Himalayan Newsletter', enabled: false, order: 14 }
  ],
  hero: {
    badge: '100% PURE HIMALAYAN WELLNESS',
    heading: 'Authentic Shilajit & Rare Himalayan Treasures',
    subtitle: 'Harvested from 18,000 ft in high-altitude Himalayas. Traditional sun-dried purification, NABL lab tested for maximum potency & 84+ ionic minerals.',
    primaryCtaText: 'Explore Collection',
    primaryCtaLink: '/products',
    secondaryCtaText: 'Our Pure Process',
    secondaryCtaLink: '/about',
    backgroundImage: '/assets/photos/13.jpg',
    heroImage: 'https://pahadisher.in/cdn/shop/files/8.jpg?v=1766302871&width=600',
    stats: [
      { value: '18,000 FT', label: 'High Altitude Origin' },
      { value: '84+', label: 'Ionic Trace Minerals' },
      { value: '100%', label: 'Lab Certified Pure' }
    ]
  },
  featuredCatalogue: {
    title: 'Curated Himalayan Collection',
    subtitle: 'Hand-picked organic superfoods sourced directly from native Pahadi farmers.',
    selectedProductIds: []
  },
  categoryGrid: {
    title: 'Explore By Category',
    subtitle: 'Discover authentic, single-origin mountain wellness crafted by nature.',
    items: [
      {
        id: 'shilajit',
        name: 'Himalayan Shilajit',
        image: 'https://pahadisher.in/cdn/shop/files/8.jpg?v=1766302871&width=600',
        tag: '>80% Fulvic Acid',
        link: '/products?category=shilajit',
        enabled: true
      },
      {
        id: 'ghee',
        name: 'Pure Cow Ghee',
        image: 'https://pahadisher.in/cdn/shop/files/4.jpg?v=1766302575&width=600',
        tag: 'Bilona Method',
        link: '/products?category=ghee',
        enabled: true
      },
      {
        id: 'honey',
        name: 'Raw Himalayan Honey',
        image: 'https://pahadisher.in/cdn/shop/files/5.jpg?v=1766302593&width=600',
        tag: 'Unfiltered & Wild',
        link: '/products?category=honey',
        enabled: true
      },
      {
        id: 'teas',
        name: 'Organic Mountain Teas',
        image: 'https://cdn.shopify.com/s/files/1/0739/5223/1476/files/HerbalGreenTea_2.png?v=1774514207',
        tag: 'Rhododendron & Herbs',
        link: '/products?category=teas',
        enabled: true
      }
    ]
  },
  brandStory: {
    tagline: 'OUR SACRED ORIGIN STORY',
    heading: 'Sourced Directly From Chandak Hills, Pithoragarh',
    description1: 'Rooted in the pristine Himalayas of Uttarakhand, Pahadi Sher brings pure, authentic, and naturally potent wellness products directly from mountain rock cliffs.',
    description2: 'In-house Shilajit extraction and initial purification are carried out with local village communities and women, preserving traditional Himalayan wisdom and empowering local livelihoods.',
    image: 'https://pahadisher.in/cdn/shop/files/WhatsApp_Image_2025-12-21_at_9.53.22_AM.jpg?v=1766299154&width=1200',
    stats: [
      { number: '100%', label: 'Natural & Pure' },
      { number: 'Chandak', label: 'Hills Pithoragarh' },
      { number: 'NABL', label: 'Lab Certified' }
    ],
    ctaText: 'Discover Our Sourcing Journey',
    ctaLink: '/our-story'
  },
  whyUs: {
    tagline: 'THE PAHADI SHER PROMISE 🏔️🦁',
    heading: 'Why Connoisseurs Choose Our Mountain Wellness',
    subtitle: 'Zero compromises on purity, traditional extraction, and local community empowerment.',
    items: [
      {
        id: '1',
        icon: 'Mountain',
        title: 'Chandak Hills Sourcing',
        description: 'Sourced directly from the high-altitude rocks of Chandak Hills, Pithoragarh, Uttarakhand.'
      },
      {
        id: '2',
        icon: 'Sun',
        title: 'Traditional Solar Purification',
        description: 'Processed without chemicals or impurities using traditional solar methods passed down through generations.'
      },
      {
        id: '3',
        icon: 'FileCheck2',
        title: 'Rigorous Lab Testing',
        description: 'Every batch undergoes testing for quality, safety, heavy metals, and fulvic acid potency.'
      },
      {
        id: '4',
        icon: 'Heart',
        title: 'Village & Women Empowerment',
        description: 'Extraction and handling directly empower local village communities and women in Pithoragarh.'
      }
    ]
  },
  testimonials: {
    tagline: 'VERIFIED REVIEWS',
    heading: 'What Our Himalayan Tribe Says',
    subtitle: 'Real stories from customers experiencing genuine mountain vitality.',
    items: [
      {
        id: 't1',
        name: 'Vikramaditya Sharma',
        location: 'New Delhi',
        rating: 5,
        review: 'The Shilajit Resin is unbelievable. I felt a noticeable surge in daily stamina within 5 days. NABL test certificate gave complete peace of mind!',
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
      },
      {
        id: 't2',
        name: 'Dr. Ananya Iyer',
        location: 'Bengaluru',
        rating: 5,
        review: 'As an Ayurvedic doctor, I am extremely particular about Shilajit purity. The Pahadi Sher\'s Surya Tapi resin passes all traditional tests with flying colors.',
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
      },
      {
        id: 't3',
        name: 'Rajesh Pahwa',
        location: 'Chandigarh',
        rating: 5,
        review: 'Pure Cow Ghee tastes exactly like the ghee my grandmother made in Almora. The aroma is heavenly!',
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
      }
    ]
  },
  newsletter: {
    heading: 'Join The Pahadi Sher Tribe',
    subtitle: 'Subscribe for exclusive harvest drops, Ayurvedic wellness guides, and 10% off your first order.',
    buttonText: 'Claim 10% Off',
    placeholderText: 'Enter your email address',
    perks: ['10% Off First Purchase', 'Early Access to Fresh Harvests', 'No Spam, Ever']
  },
  promoBanner: {
    badge: 'FESTIVE MOUNTAIN HARVEST SALE',
    title: 'Get 20% Off Pure Himalayan Wellness Kits',
    description: 'Use code PAHADI20 at checkout for instant savings on pure resin and wild honey combos.',
    buttonText: 'Shop Special Combos',
    buttonLink: '/products?category=combos',
    backgroundImage: '/assets/photos/13.jpg',
    discountCode: 'PAHADI20'
  }
};

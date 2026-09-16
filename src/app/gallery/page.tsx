'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mountain, ShieldCheck, Award, Sparkles, Image as ImageIcon, ArrowRight, Tag, Heart, Layers } from 'lucide-react';

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'about' | 'products'>('all');
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string; category: string; caption: string } | null>(null);

  // Pictures from About Us / Our Story Section
  const aboutPhotoItems = [
    {
      id: 'about-0',
      title: 'High-Altitude Uttarakhand Origin',
      category: 'About Us & Heritage',
      image: '/assets/photos/13.jpg',
      caption: 'Pristine high-altitude landscape and rock formations in Uttarakhand at 18,000 ft.',
    },
    {
      id: 'about-1',
      title: 'Pahadi Sher Founder & Mountain Vision',
      category: 'About Us & Heritage',
      image: 'https://pahadisher.in/cdn/shop/files/WhatsApp_Image_2025-12-21_at_9.53.22_AM.jpg?v=1766299154&width=1200',
      caption: 'Directly connected to high-altitude landscapes of Chandak Hills, Pithoragarh, Uttarakhand.',
    },
    {
      id: 'about-2',
      title: 'Himalayan Rock Cliffs',
      category: 'About Us & Heritage',
      image: 'https://pahadisher.in/cdn/shop/files/1.jpg?v=1766302522&width=800',
      caption: 'Natural rock exudates forged over centuries deep in the Upper Kumaon ridge.',
    },
    {
      id: 'about-3',
      title: 'Raw Shilajit Exudate Sourcing',
      category: 'About Us & Heritage',
      image: 'https://pahadisher.in/cdn/shop/files/2.jpg?v=1766302490&width=800',
      caption: 'Hand-collected by native foraging elders without damaging delicate mountain rock faces.',
    },
    {
      id: 'about-4',
      title: 'Traditional Solar Method (Surya Tapi)',
      category: 'About Us & Heritage',
      image: 'https://pahadisher.in/cdn/shop/files/6.jpg?v=1766302619&width=800',
      caption: 'Slow solar evaporation preserving 84+ ionic trace minerals without chemical solvents.',
    },
    {
      id: 'about-5',
      title: 'Chandak Hills Pithoragarh Terrain',
      category: 'About Us & Heritage',
      image: 'https://pahadisher.in/cdn/shop/files/7.jpg?v=1766302898&width=800',
      caption: 'Pristine high-altitude landscape of Pithoragarh district in Uttarakhand.',
    },
    {
      id: 'about-6',
      title: 'Native Village Women & Harvesters',
      category: 'About Us & Heritage',
      image: 'https://pahadisher.in/cdn/shop/files/WhatsApp_Image_2025-12-21_at_9.53.36_AM.jpg?v=1766299893&width=1200',
      caption: 'Local women leading traditional purification & sustainable harvesting in Kumaon.',
    },
    {
      id: 'about-7',
      title: 'Original Himalayan Shilajit Resin',
      category: 'About Us & Heritage',
      image: 'https://pahadisher.in/cdn/shop/files/8.jpg?v=1766302871&width=600',
      caption: 'Pure, natural resin purified in-house for maximum fulvic acid potency.',
    },
    {
      id: 'about-8',
      title: 'Pure Pahadi Cow Ghee (Bilona)',
      category: 'About Us & Heritage',
      image: 'https://pahadisher.in/cdn/shop/files/4.jpg?v=1766302575&width=600',
      caption: 'Traditionally churned desi ghee from cows raised in clean mountain surroundings.',
    },
    {
      id: 'about-9',
      title: 'Raw Wildcraft Pahadi Honey',
      category: 'About Us & Heritage',
      image: 'https://pahadisher.in/cdn/shop/files/5.jpg?v=1766302593&width=600',
      caption: 'Wildcrafted, unfiltered honey rich in natural enzymes and antioxidants.',
    },
    {
      id: 'about-10',
      title: 'Lab Certified Batch Heritage',
      category: 'About Us & Heritage',
      image: 'https://pahadisher.in/cdn/shop/files/9.jpg?v=1766302849&width=600',
      caption: 'Rigorous laboratory testing for heavy metals, microbial safety, and fulvic potency.',
    },
  ];

  // Pictures from Products Section
  const productPhotoItems = [
    {
      id: 'prod-1',
      title: 'Organic Buransh Herbal Tea',
      category: 'Products Catalogue',
      image: 'https://cdn.shopify.com/s/files/1/0739/5223/1476/files/HerbalGreenTea_2.png?v=1774514207',
      caption: 'Kumaon Rhododendron flower blend with Mulethi, Ginger & Green Tea.',
    },
    {
      id: 'prod-2',
      title: 'Chamomile Whole Dried Flower Buds',
      category: 'Products Catalogue',
      image: 'https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Vibrantbutterflypeaflowersinterracotta.png?v=1774609129',
      caption: '100% whole dried Chamomile buds sourced from high-altitude Kumaon meadows.',
    },
    {
      id: 'prod-3',
      title: 'Pahadi Garlic & Mango Pickle Combo',
      category: 'Products Catalogue',
      image: 'https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Garlic_and_Mango.png?v=1773684598',
      caption: 'Authentic Himalayan raw mango and mountain garlic pickles in cold-pressed mustard oil.',
    },
    {
      id: 'prod-4',
      title: 'Multi-Grain Health Laddu',
      category: 'Products Catalogue',
      image: 'https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Laddu_1.png?v=1774515608',
      caption: 'Pahadi energy balls made with Himalayan millets, nuts, jaggery & pure ghee.',
    },
    {
      id: 'prod-5',
      title: 'Cultured Kala Bhatt Dal',
      category: 'Products Catalogue',
      image: 'https://cdn.shopify.com/s/files/1/0739/5223/1476/files/KalaBhattDal_Front.png?v=1774771039',
      caption: 'Rare organic black soybean superfood grown in organic farms of Pithoragarh.',
    },
    {
      id: 'prod-6',
      title: 'Cultured Laal Gahat Dal',
      category: 'Products Catalogue',
      image: 'https://cdn.shopify.com/s/files/1/0739/5223/1476/files/OrganicKumaonPahadiCulturedLalgahatdalpouch.png?v=1774767142',
      caption: 'Unpolished traditional Himalayan red lentil packed with protein and fiber.',
    },
    {
      id: 'prod-7',
      title: 'Cultured Safed Bhatt Dal',
      category: 'Products Catalogue',
      image: 'https://cdn.shopify.com/s/files/1/0739/5223/1476/files/SafedBhattDal_Front.png?v=1774769194',
      caption: 'Nutritious white soybean variety harvested in high-altitude mountain valleys.',
    },
    {
      id: 'prod-8',
      title: 'Pahadi Aam Ka Achaar',
      category: 'Products Catalogue',
      image: 'https://cdn.shopify.com/s/files/1/0739/5223/1476/files/PremiumAchar.png?v=1773683698',
      caption: 'Traditional Himalayan raw mango pickle hand-cut and sun-matured with spices.',
    },
    {
      id: 'prod-9',
      title: 'Pahadi Karele Ka Achaar',
      category: 'Products Catalogue',
      image: 'https://cdn.shopify.com/s/files/1/0739/5223/1476/files/karela.png?v=1773815588',
      caption: 'Bitter gourd pickle prepared with traditional Uttarakhand spices and mustard oil.',
    },
    {
      id: 'prod-10',
      title: 'Pahadi Lehesun Ka Achaar',
      category: 'Products Catalogue',
      image: 'https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Garlik_Premium.png?v=1773684184',
      caption: 'Bold mountain garlic cloves sun-cured with aromatic masalas.',
    },
    {
      id: 'prod-11',
      title: 'Shilajit & Rosemary Green Tea Combo',
      category: 'Products Catalogue',
      image: 'https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Silajit_Rosemary1.png?v=1774862319',
      caption: 'Himalayan Shilajit resin paired with Rosemary, Lemongrass & Mulethi green tea.',
    },
    {
      id: 'prod-12',
      title: 'Shilajit & Tulsi Green Tea Combo',
      category: 'Products Catalogue',
      image: 'https://cdn.shopify.com/s/files/1/0739/5223/1476/files/Silajit10g_Tulsi1_aaef5595-45c5-44a0-b98a-34bfa743ca91.png?v=1774862049',
      caption: 'Authentic Shilajit resin combined with calming Holy Basil Tulsi Green Tea.',
    },
    {
      id: 'prod-13',
      title: 'Pahadi Nettle Green Tea',
      category: 'Products Catalogue',
      image: 'https://cdn.shopify.com/s/files/1/0739/5223/1476/files/nettletea.jpg?v=1766721765',
      caption: 'Nutrient-rich Bichhu Booti leaves blended with lemongrass and mulethi.',
    },
  ];

  const totalPhotosCount = aboutPhotoItems.length + productPhotoItems.length;

  return (
    <div className="min-h-screen bg-[#FAF6F0] pt-28 pb-20 text-[#1C241E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#1B3626]/10 text-[#1B3626] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#B85D3B]" />
            <span>Visual Heritage & Product Gallery</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1B3626] tracking-tight">
            Himalayan Sourcing & Product Gallery
          </h1>
          <p className="text-base text-[#455248] font-sans leading-relaxed">
            Explore authentic pictures directly from our <strong>About Us</strong> high-altitude harvesting expeditions and our complete <strong>Products</strong> collection.
          </p>
        </div>

        {/* Tab Filter */}
        <div className="flex justify-center border-b border-[#E5DFC9] overflow-x-auto pb-2 scrollbar-none">
          <div className="flex space-x-2 sm:space-x-3 shrink-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2.5 rounded-full text-xs uppercase font-bold tracking-wider transition-all flex items-center space-x-2 ${
                activeTab === 'all'
                  ? 'bg-[#1B3626] text-[#FAF6F0] shadow-sm'
                  : 'text-[#1C241E] hover:bg-[#F4EFE6]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Media ({totalPhotosCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs uppercase font-bold tracking-wider transition-all ${
                activeTab === 'about'
                  ? 'bg-[#1B3626] text-[#FAF6F0] shadow-sm'
                  : 'text-[#1C241E] hover:bg-[#F4EFE6]'
              }`}
            >
              <Mountain className="w-3.5 h-3.5 text-[#D49B35]" />
              <span>About Us ({aboutPhotoItems.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs uppercase font-bold tracking-wider transition-all ${
                activeTab === 'products'
                  ? 'bg-[#1B3626] text-[#FAF6F0] shadow-sm'
                  : 'text-[#1C241E] hover:bg-[#F4EFE6]'
              }`}
            >
              <Tag className="w-3.5 h-3.5 text-[#B85D3B]" />
              <span>Products ({productPhotoItems.length})</span>
            </button>
          </div>
        </div>

        {/* Section 1: About Us Pictures */}
        {(activeTab === 'all' || activeTab === 'about') && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5DFC9] pb-3">
              <h2 className="font-serif text-2xl font-bold text-[#1B3626] flex items-center space-x-2">
                <Mountain className="w-5 h-5 text-[#D49B35]" />
                <span>About Us — Himalayan Heritage & Expedition Pictures</span>
              </h2>
              <span className="text-xs font-sans font-bold text-[#B85D3B]">
                {aboutPhotoItems.length} Mountain & Sourcing Photos
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {aboutPhotoItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedImage({ url: item.image, title: item.title, category: item.category, caption: item.caption })}
                  className="bg-white rounded-3xl overflow-hidden border border-[#E5DFC9] shadow-sm hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden bg-black/5">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#1B3626]/80 text-[#D49B35] px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider backdrop-blur-sm">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-serif text-lg font-bold text-[#1B3626] group-hover:text-[#B85D3B] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#455248] leading-relaxed font-sans">
                      {item.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: Products Section Pictures */}
        {(activeTab === 'all' || activeTab === 'products') && (
          <div className="space-y-6 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5DFC9] pb-3">
              <h2 className="font-serif text-2xl font-bold text-[#1B3626] flex items-center space-x-2">
                <Tag className="w-5 h-5 text-[#B85D3B]" />
                <span>Products Section — Authentic Himalayan Organic Line</span>
              </h2>
              <span className="text-xs font-sans font-bold text-[#B85D3B]">
                {productPhotoItems.length} Product Showcase Photos
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productPhotoItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedImage({ url: item.image, title: item.title, category: item.category, caption: item.caption })}
                  className="bg-white rounded-3xl overflow-hidden border border-[#E5DFC9] shadow-sm hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative h-64 overflow-hidden bg-[#FAF6F0] p-4 flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain group-hover:scale-105 transition-transform duration-500 p-2"
                    />
                    <div className="absolute top-3 left-3 bg-[#B85D3B] text-white px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider shadow-xs">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#1B3626] group-hover:text-[#B85D3B] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#455248] leading-relaxed font-sans mt-1">
                        {item.caption}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#F4EFE6] flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#1B3626] flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#D49B35]" /> 100% Himalayan Pure
                      </span>
                      <Link
                        href="/products"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[11px] font-bold text-[#B85D3B] hover:text-[#1B3626] flex items-center gap-1"
                      >
                        View Item <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lightbox Modal for Image Preview */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-3xl w-full rounded-3xl overflow-hidden border border-[#E5DFC9] shadow-2xl relative space-y-4 p-4"
            >
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black/10">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-4 space-y-2">
                <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#B85D3B]">
                  {selectedImage.category}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1B3626]">
                  {selectedImage.title}
                </h3>
                <p className="text-xs text-[#455248] font-sans leading-relaxed">
                  {selectedImage.caption}
                </p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 bg-black/60 hover:bg-black text-white px-3 py-1.5 rounded-full text-xs font-bold"
              >
                Close ✕
              </button>
            </div>
          </div>
        )}

        {/* CTA Card */}
        <div className="bg-[#1B3626] text-[#FAF6F0] p-8 sm:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-[#DDE8D5]/20">
          <div className="space-y-3 text-center md:text-left">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#D49B35]">
              Pure & NABL Lab Certified
            </span>
            <h2 className="font-serif text-3xl font-bold text-white">
              Experience Authentic Himalayan Organics
            </h2>
            <p className="text-sm text-[#FAF6F0]/80 max-w-xl font-sans">
              Harvested directly at 18,000 FT with zero heavy metals, artificial additives, or chemical processing.
            </p>
          </div>
          <Link
            href="/products"
            className="bg-[#D49B35] hover:bg-white text-[#1B3626] px-6 py-3.5 rounded-full font-sans text-xs uppercase font-bold tracking-widest transition-all inline-flex items-center space-x-2 shrink-0 shadow-lg"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}



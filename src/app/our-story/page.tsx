'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Mountain, ShieldCheck, Heart, Users, MapPin, ArrowRight, Award, 
  Sun, Sparkles, CheckCircle2, Leaf, Microscope, HandHeart, Feather, Quote,
  Camera
} from 'lucide-react';

export default function OurStoryPage() {
  return (
    <div className="py-12 bg-[#FAF6F0] min-h-screen text-[#1B3626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Banner with Slogans & Badges */}
        <div className="bg-[#1B3626] text-[#FAF6F0] p-8 sm:p-16 rounded-3xl relative overflow-hidden shadow-2xl border border-[#D49B35]/30">
          {/* Background image overlay */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay">
            <Image 
              src="https://pahadisher.in/cdn/shop/files/7.jpg?v=1766302898&width=1600"
              alt="Pithoragarh Mountains"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-[#D49B35] via-[#B85D3B] to-[#D49B35]" />
          
          <div className="relative z-10 space-y-6 max-w-4xl">
            <div className="flex flex-wrap gap-2.5 items-center">
              <div className="inline-flex items-center space-x-2 bg-[#D49B35]/20 border border-[#D49B35]/40 text-[#D49B35] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                <Mountain className="w-4 h-4" />
                <span>Chandak Hills, Pithoragarh • Uttarakhand</span>
              </div>
              <div className="inline-flex items-center space-x-2 bg-[#FAF6F0]/10 text-[#FAF6F0] px-3.5 py-1.5 rounded-full text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#D49B35]" />
                <span>“पहाड़ी शेर शिलाजीत - Sher wali ताकत 💪”</span>
              </div>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white leading-tight">
              Pure. Powerful. Pahadi.
            </h1>

            <p className="text-base sm:text-lg text-[#FAF6F0]/90 font-sans leading-relaxed max-w-3xl">
              Rooted in the pristine Himalayas of Uttarakhand, Pahadi Sher was born out of a simple yet powerful purpose: to bring you pure, authentic, and naturally potent wellness treasures directly from the high-altitude mountains to your daily life.
            </p>

            {/* Slogan Pill Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-3.5 rounded-2xl text-xs flex items-center space-x-2.5">
                <span className="text-[#D49B35] font-serif text-base font-bold">🏔️</span>
                <span className="text-[#FAF6F0]/90 font-sans font-medium">“सीधा पहाड़ों से – Pure & Natural Shilajit”</span>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-3.5 rounded-2xl text-xs flex items-center space-x-2.5">
                <span className="text-[#D49B35] font-serif text-base font-bold">💛</span>
                <span className="text-[#FAF6F0]/90 font-sans font-medium">“दादी माँ का प्यार, अब online”</span>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-3.5 rounded-2xl text-xs flex items-center space-x-2.5">
                <span className="text-[#D49B35] font-serif text-base font-bold">🦁</span>
                <span className="text-[#FAF6F0]/90 font-sans font-medium">“Taste the Himalaya – असली स्वाद”</span>
              </div>
            </div>
          </div>
        </div>

        {/* Our Founder's Vision & Authentic Photo */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E5DFC9] shadow-sm space-y-8">
          <div className="inline-flex items-center space-x-2 bg-[#EEF4EA] text-[#1B3626] border border-[#C3CCA6] px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest">
            <Heart className="w-3.5 h-3.5 text-[#B85D3B]" />
            <span>OUR FOUNDER’S VISION</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B3626]">
                True Strength is Born in the Mountains
              </h2>
              <p className="text-sm sm:text-base text-[#455248] leading-relaxed font-sans">
                At Pahadi Sher, we believe that true strength is forged in high-altitude environments. With a vision to bring this ancient Himalayan treasure to the modern world without dilution, artificial boiling, or chemical processing, <strong className="text-[#1B3626]">Pahadi Sher Naturals</strong> was established.
              </p>
              <p className="text-xs sm:text-sm text-[#455248] leading-relaxed font-sans">
                Our brand stands for honesty, purity, and mountain-bred strength, ensuring every product reflects the unadulterated power of its Himalayan origin.
              </p>

              <div className="bg-[#FAF6F0] p-5 rounded-2xl border border-[#E5DFC9] space-y-3">
                <div className="text-xs font-bold text-[#B85D3B] uppercase tracking-wider">Why Pahadi Sher?</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#455248]">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1B3626] shrink-0 mt-0.5" />
                    <span>100% Natural & Pure Sourcing</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1B3626] shrink-0 mt-0.5" />
                    <span>Ethically Collected & Lab-Tested</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1B3626] shrink-0 mt-0.5" />
                    <span>No Chemicals, No Adulteration</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1B3626] shrink-0 mt-0.5" />
                    <span>Traditional Himalayan Wisdom</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Photo */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-2 border-[#E5DFC9] shadow-lg group">
                <Image
                  src="https://pahadisher.in/cdn/shop/files/WhatsApp_Image_2025-12-21_at_9.53.22_AM.jpg?v=1766299154&width=1200"
                  alt="Pahadi Sher Himalayan Vision & Sourcing"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-serif text-[#D49B35] font-bold">FOUNDER & MOUNTAIN VISION</span>
                  <p className="text-xs text-white/90 font-sans mt-1">
                    Directly connected to the high-altitude landscapes of Uttarakhand.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Authentic Photo Gallery - Mountain Sourcing & Purification */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 text-[#B85D3B] text-xs font-bold uppercase tracking-widest">
                <Camera className="w-4 h-4" />
                <span>PITHORAGARH HARVEST JOURNAL</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#1B3626]">
                From High-Altitude Rock Face to Pure Jar
              </h2>
            </div>
            <p className="text-xs text-[#455248] max-w-md font-sans">
              Authentic glimpses of raw Himalayan rock exudates, traditional solar purification, and the pristine Chandak Hills terrain in Uttarakhand.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Gallery Item 1 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#E5DFC9] shadow-sm space-y-3 p-3 group">
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="https://pahadisher.in/cdn/shop/files/1.jpg?v=1766302522&width=800"
                  alt="High-Altitude Himalayan Rocks"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="px-2 pb-2 space-y-1">
                <h4 className="font-serif text-sm font-bold text-[#1B3626]">1. Himalayan Rock Cliffs</h4>
                <p className="text-[11px] text-[#455248]">Natural rock exudates forged over centuries deep in the Upper Kumaon upper ridge.</p>
              </div>
            </div>

            {/* Gallery Item 2 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#E5DFC9] shadow-sm space-y-3 p-3 group">
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="https://pahadisher.in/cdn/shop/files/2.jpg?v=1766302490&width=800"
                  alt="Raw Shilajit Extraction"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="px-2 pb-2 space-y-1">
                <h4 className="font-serif text-sm font-bold text-[#1B3626]">2. Raw Resin Exudate</h4>
                <p className="text-[11px] text-[#455248]">Hand-collected by native foraging elders without damaging delicate mountain rock faces.</p>
              </div>
            </div>

            {/* Gallery Item 3 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#E5DFC9] shadow-sm space-y-3 p-3 group">
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="https://pahadisher.in/cdn/shop/files/6.jpg?v=1766302619&width=800"
                  alt="Traditional Solar Purification"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="px-2 pb-2 space-y-1">
                <h4 className="font-serif text-sm font-bold text-[#1B3626]">3. Traditional Solar Method</h4>
                <p className="text-[11px] text-[#455248]">Slow solar evaporation without chemical solvents or boiling high heat.</p>
              </div>
            </div>

            {/* Gallery Item 4 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#E5DFC9] shadow-sm space-y-3 p-3 group">
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="https://pahadisher.in/cdn/shop/files/7.jpg?v=1766302898&width=800"
                  alt="Chandak Hills Pithoragarh"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="px-2 pb-2 space-y-1">
                <h4 className="font-serif text-sm font-bold text-[#1B3626]">4. Chandak Hills Terrain</h4>
                <p className="text-[11px] text-[#455248]">Pristine high-altitude landscape of Pithoragarh district, Uttarakhand.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Traditional Extraction & Empowering Local Communities with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Community Text Cards */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            <div className="bg-white p-8 rounded-3xl border border-[#E5DFC9] space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF4EA] text-[#1B3626] flex items-center justify-center">
                <HandHeart className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1B3626]">
                Empowering Local Communities & Women
              </h3>
              <p className="text-xs sm:text-sm text-[#455248] leading-relaxed font-sans">
                The extraction and initial purification of Pahadi Sher Shilajit and organic products are carried out with the active participation of local village communities and women in Pithoragarh.
              </p>
              <p className="text-xs text-[#455248] leading-relaxed font-sans">
                Their deep-rooted knowledge, reverence for nature, and meticulous care ensure absolute purity, ethical sustainability, and equitable economic growth in remote hill regions.
              </p>
              
              <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#E5DFC9] text-xs text-[#1B3626] font-medium">
                <span className="font-bold text-[#B85D3B]">In-House Production: </span>
                Shilajit is produced in-house, while Ghee, Honey & other products are sourced from our own units and trusted local farmers of Pithoragarh district.
              </div>
            </div>

            <div className="bg-[#EEF4EA] p-6 rounded-3xl border border-[#C3CCA6] text-xs text-[#1B3626] italic space-y-2">
              <Quote className="w-5 h-5 text-[#B85D3B]" />
              <p className="font-serif text-sm text-[#1B3626] font-bold">
                “Every jar carries the power of nature, the wisdom of tradition, and the hard work of native Himalayan village women.”
              </p>
            </div>
          </div>

          {/* Right Team / Village Women Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-full min-h-[380px] rounded-3xl overflow-hidden border-2 border-[#E5DFC9] shadow-lg group">
              <Image
                src="https://pahadisher.in/cdn/shop/files/WhatsApp_Image_2025-12-21_at_9.53.36_AM.jpg?v=1766299893&width=1200"
                alt="Native Pahadi Village Women & Harvesters"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-serif text-[#D49B35] font-bold">VILLAGE WOMEN COOPERATIVES</span>
                <p className="text-xs text-white/90 font-sans mt-1">
                  Local women leading traditional purification & sustainable harvesting in Uttarakhand.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Purity You Can Trust & Product Showcase Grid */}
        <div className="bg-[#1B3626] text-[#FAF6F0] p-8 sm:p-12 rounded-3xl space-y-10 relative overflow-hidden">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 bg-[#D49B35]/20 text-[#D49B35] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              <Microscope className="w-4 h-4" />
              <span>Purity You Can Trust</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Uncompromising Quality & Rigorous Testing
            </h2>
            <p className="text-xs sm:text-sm text-[#FAF6F0]/80 font-sans">
              What reaches you is premium-grade Pahadi Shilajit and superfoods, exactly as nature intended for daily wellness and vitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 space-y-2">
              <div className="text-[#D49B35] font-serif text-xl font-bold">01. Industry Purification</div>
              <p className="text-xs text-[#FAF6F0]/80">
                Purified meticulously using cold spring water and solar evaporation to remove sand, sediment, and heavy impurities without degrading minerals.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 space-y-2">
              <div className="text-[#D49B35] font-serif text-xl font-bold">02. Rigorous Lab Testing</div>
              <p className="text-xs text-[#FAF6F0]/80">
                Every single batch undergoes laboratory testing for heavy metals, microbial safety, and fulvic acid potency.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 space-y-2">
              <div className="text-[#D49B35] font-serif text-xl font-bold">03. Mineral & Fulvic Retention</div>
              <p className="text-xs text-[#FAF6F0]/80">
                Careful handling retains 84+ ionic trace minerals and high fulvic acid concentrations essential for stamina, immunity, and focus.
              </p>
            </div>
          </div>

          {/* Authentic Product Cards Showcase with Real Site Photos */}
          <div className="pt-4 space-y-4">
            <h3 className="font-serif text-xl font-bold text-white text-center">Our Authentic Pahadi Product Line</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Product Card 1: Pure Shilajit Resin */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-3 space-y-3 group">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-black/20">
                  <Image
                    src="https://pahadisher.in/cdn/shop/files/8.jpg?v=1766302871&width=600"
                    alt="Pahadi Sher Shilajit Resin"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-sm font-bold text-[#D49B35]">Original Himalayan Shilajit</h4>
                  <p className="text-[11px] text-[#FAF6F0]/80 leading-relaxed font-sans">
                    Pure, natural resin sourced from upper rock cliffs. Boosts energy, stamina, and overall vitality.
                  </p>
                </div>
              </div>

              {/* Product Card 2: Pahadi Cow Ghee */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-3 space-y-3 group">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-black/20">
                  <Image
                    src="https://pahadisher.in/cdn/shop/files/4.jpg?v=1766302575&width=600"
                    alt="Pure Pahadi Cow Bilona Ghee"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-sm font-bold text-[#D49B35]">Pure Pahadi Ghee (Bilona)</h4>
                  <p className="text-[11px] text-[#FAF6F0]/80 leading-relaxed font-sans">
                    Traditionally churned desi ghee from cows raised in clean Pithoragarh surroundings.
                  </p>
                </div>
              </div>

              {/* Product Card 3: Raw Pahadi Honey */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-3 space-y-3 group">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-black/20">
                  <Image
                    src="https://pahadisher.in/cdn/shop/files/5.jpg?v=1766302593&width=600"
                    alt="Raw Pahadi Wild Honey"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-sm font-bold text-[#D49B35]">Raw Pahadi Honey</h4>
                  <p className="text-[11px] text-[#FAF6F0]/80 leading-relaxed font-sans">
                    Wildcrafted, unfiltered honey rich in natural enzymes and antioxidants for daily immunity.
                  </p>
                </div>
              </div>

              {/* Product Card 4: Quality & Brand Experience */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-3 space-y-3 group">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-black/20">
                  <Image
                    src="https://pahadisher.in/cdn/shop/files/9.jpg?v=1766302849&width=600"
                    alt="Pahadi Sher Brand Experience"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-sm font-bold text-[#D49B35]">Lab Certified Heritage</h4>
                  <p className="text-[11px] text-[#FAF6F0]/80 leading-relaxed font-sans">
                    Strict quality controls ensure zero adulteration, chemical additives, or compromise.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Team – Pahadi Sher */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E5DFC9] shadow-sm space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 bg-[#EEF4EA] text-[#1B3626] border border-[#C3CCA6] px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest">
              <Users className="w-3.5 h-3.5 text-[#D49B35]" />
              <span>Our Team – Pahadi Sher</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B3626]">
              Driven by Passion, Guided by Integrity
            </h2>
            <p className="text-xs sm:text-sm text-[#455248] font-sans leading-relaxed">
              At Pahadi Sher Naturals, our strength lies in the dedicated people behind the brand — from mountain sourcing experts who understand Himalayan terrain to quality specialists ensuring purity at every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#E5DFC9] space-y-3 text-center">
              <div className="w-12 h-12 rounded-full bg-[#1B3626] text-[#D49B35] mx-auto flex items-center justify-center font-bold">
                🏔️
              </div>
              <h4 className="font-serif font-bold text-[#1B3626]">Terrain Sourcing Experts</h4>
              <p className="text-xs text-[#455248] leading-relaxed">
                Native guides and harvesters with generations of mountain wisdom locating raw exudates in upper Kumaon.
              </p>
            </div>

            <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#E5DFC9] space-y-3 text-center">
              <div className="w-12 h-12 rounded-full bg-[#1B3626] text-[#D49B35] mx-auto flex items-center justify-center font-bold">
                🔬
              </div>
              <h4 className="font-serif font-bold text-[#1B3626]">Quality & Lab Specialists</h4>
              <p className="text-xs text-[#455248] leading-relaxed">
                Phytochemists and Ayurvedic experts ensuring standard purification and NABL batch certification.
              </p>
            </div>

            <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#E5DFC9] space-y-3 text-center">
              <div className="w-12 h-12 rounded-full bg-[#1B3626] text-[#D49B35] mx-auto flex items-center justify-center font-bold">
                🤝
              </div>
              <h4 className="font-serif font-bold text-[#1B3626]">Community Partners</h4>
              <p className="text-xs text-[#455248] leading-relaxed">
                Local village elders and women cooperatives ensuring ethical practices and eco-conscious harvesting.
              </p>
            </div>
          </div>
        </div>

        {/* 5 Core Values Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-[#1B3626]">Our Core Values</h2>
            <p className="text-xs text-[#455248]">The unyielding principles behind every Pahadi Sher creation.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-[#E5DFC9] space-y-2 shadow-sm text-center">
              <div className="text-2xl">🌱</div>
              <h4 className="font-serif text-sm font-bold text-[#1B3626]">100% Natural</h4>
              <p className="text-[11px] text-[#455248]">Sourced from untouched high-altitude Himalayan regions.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E5DFC9] space-y-2 shadow-sm text-center">
              <div className="text-2xl">🏔️</div>
              <h4 className="font-serif text-sm font-bold text-[#1B3626]">Authentic Origin</h4>
              <p className="text-[11px] text-[#455248]">Directly from Chandak Hills, Pithoragarh, Uttarakhand.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E5DFC9] space-y-2 shadow-sm text-center">
              <div className="text-2xl">☀️</div>
              <h4 className="font-serif text-sm font-bold text-[#1B3626]">Tradition & Science</h4>
              <p className="text-[11px] text-[#455248]">Ancient Surya Tapi wisdom supported by modern quality standards.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E5DFC9] space-y-2 shadow-sm text-center">
              <div className="text-2xl">📋</div>
              <h4 className="font-serif text-sm font-bold text-[#1B3626]">Lab Tested</h4>
              <p className="text-[11px] text-[#455248]">Transparency, trust, and batch-wise laboratory assurance.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E5DFC9] space-y-2 shadow-sm text-center">
              <div className="text-2xl">⚡</div>
              <h4 className="font-serif text-sm font-bold text-[#1B3626]">Real Results</h4>
              <p className="text-[11px] text-[#455248]">Crafted for stamina, immunity, focus, and natural vitality.</p>
            </div>
          </div>
        </div>

        {/* Pahadi Sher Promise & Call to Action Banner */}
        <div className="bg-[#EEF4EA] p-8 sm:p-12 rounded-3xl border border-[#C3CCA6] flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-[#B85D3B] text-xs font-bold uppercase tracking-widest">
              <Award className="w-4 h-4" />
              <span>THE PAHADI SHER PROMISE 🏔️🦁</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B3626]">
              Unlock the Hidden Wisdom of the Himalayas
            </h3>
            <p className="text-xs sm:text-sm text-[#455248] font-sans leading-relaxed">
              When you choose Pahadi Sher Naturals, you choose clean wellness, ethical sourcing, and authentic Pahadi strength. Experience the power of nature delivered straight from the mountains to your household.
            </p>
          </div>

          <Link
            href="/products"
            className="bg-[#1B3626] text-[#FAF6F0] px-8 py-4 rounded-full text-xs uppercase font-bold tracking-widest hover:bg-[#274A36] shadow-md shrink-0 flex items-center space-x-2 group transition-all"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4 text-[#D49B35] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}

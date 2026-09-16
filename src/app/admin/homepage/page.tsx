'use client';

import React, { useState } from 'react';
import { 
  Layout, Sparkles, Image as ImageIcon, MoveUp, MoveDown, Eye, EyeOff, 
  Save, RotateCcw, CheckCircle2, AlertCircle, Plus, Trash2, Edit3, 
  ExternalLink, Layers, ShieldCheck, Star, Megaphone, Mail, HelpCircle, ArrowRight
} from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { 
  HomepageSectionMeta, HeroConfig, BrandStoryConfig, WhyUsItem, 
  TestimonialItem, CategoryGridItemConfig 
} from '@/types';

export default function AdminHomepageCMSPage() {
  const { 
    homepageConfig, 
    updateHomepageConfig, 
    updateSectionOrder, 
    toggleSectionEnabled, 
    resetHomepageConfigToDefault,
    products 
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<'layout' | 'hero' | 'catalogue' | 'story' | 'reviews' | 'newsletter'>('layout');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Local state for draft editing before saving
  const [heroDraft, setHeroDraft] = useState<HeroConfig>(homepageConfig.hero);
  const [brandStoryDraft, setBrandStoryDraft] = useState<BrandStoryConfig>(homepageConfig.brandStory);
  const [whyUsDraft, setWhyUsDraft] = useState(homepageConfig.whyUs);
  const [testimonialsDraft, setTestimonialsDraft] = useState(homepageConfig.testimonials);
  const [newsletterDraft, setNewsletterDraft] = useState(homepageConfig.newsletter);
  const [promoBannerDraft, setPromoBannerDraft] = useState(homepageConfig.promoBanner);
  const [categoryGridDraft, setCategoryGridDraft] = useState(homepageConfig.categoryGrid);
  const [featuredCatalogueDraft, setFeaturedCatalogueDraft] = useState(homepageConfig.featuredCatalogue);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveAll = () => {
    updateHomepageConfig({
      hero: heroDraft,
      brandStory: brandStoryDraft,
      whyUs: whyUsDraft,
      testimonials: testimonialsDraft,
      newsletter: newsletterDraft,
      promoBanner: promoBannerDraft,
      categoryGrid: categoryGridDraft,
      featuredCatalogue: featuredCatalogueDraft
    });
    showToast('✨ Homepage content updated & saved successfully!');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all homepage content to default settings?')) {
      resetHomepageConfigToDefault();
      setHeroDraft(homepageConfig.hero);
      setBrandStoryDraft(homepageConfig.brandStory);
      setWhyUsDraft(homepageConfig.whyUs);
      setTestimonialsDraft(homepageConfig.testimonials);
      setNewsletterDraft(homepageConfig.newsletter);
      setPromoBannerDraft(homepageConfig.promoBanner);
      setCategoryGridDraft(homepageConfig.categoryGrid);
      setFeaturedCatalogueDraft(homepageConfig.featuredCatalogue);
      showToast('🔄 Homepage content restored to defaults!');
    }
  };

  // Section Ordering Handlers
  const sortedSections = [...homepageConfig.sections].sort((a, b) => a.order - b.order);

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...sortedSections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    // Swap order
    const tempOrder = newSections[index].order;
    newSections[index].order = newSections[targetIndex].order;
    newSections[targetIndex].order = tempOrder;

    updateSectionOrder(newSections);
    showToast('↕️ Section order updated!');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-900 text-emerald-100 px-5 py-3.5 rounded-xl shadow-2xl border border-emerald-700 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 backdrop-blur border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-400 border border-amber-500/20">
              <Layout className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100 font-serif">Homepage Content CMS</h1>
              <p className="text-sm text-slate-400">
                Customize homepage hero, text, images, categories, section visibility, and order without writing code.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
          >
            <ExternalLink className="w-4 h-4 text-amber-400" />
            View Storefront
          </a>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-red-950/40 text-slate-400 hover:text-red-400 border border-slate-700 hover:border-red-900/50 transition"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Default
          </button>

          <button
            onClick={handleSaveAll}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 transition"
          >
            <Save className="w-4 h-4" />
            Save All Changes
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'layout', label: '1. Section Layout & Order', icon: Layers },
          { id: 'hero', label: '2. Hero Banner', icon: Sparkles },
          { id: 'catalogue', label: '3. Products & Categories', icon: ImageIcon },
          { id: 'story', label: '4. Brand Story & Why Us', icon: ShieldCheck },
          { id: 'reviews', label: '5. Testimonials & Banners', icon: Star },
          { id: 'newsletter', label: '6. Newsletter', icon: Mail }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                isActive
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-sm'
                  : 'bg-slate-900/40 text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Section Layout & Order */}
      {activeTab === 'layout' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-100">Homepage Section Visibility & Order</h2>
                <p className="text-xs text-slate-400">
                  Toggle sections on or off, or reorder their position on the live homepage.
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20">
                {sortedSections.filter(s => s.enabled).length} of {sortedSections.length} Sections Active
              </span>
            </div>

            <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
              {sortedSections.map((sec, idx) => (
                <div 
                  key={sec.id}
                  className={`flex items-center justify-between p-4 transition ${
                    sec.enabled ? 'hover:bg-slate-900/40' : 'bg-slate-950/80 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-800 text-slate-400 text-xs font-mono font-bold">
                      #{idx + 1}
                    </span>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-200">{sec.name}</h4>
                        <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                          {sec.id}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">
                        {sec.enabled ? 'Visible on storefront' : 'Hidden from storefront'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Order Controls */}
                    <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                      <button
                        onClick={() => moveSection(idx, 'up')}
                        disabled={idx === 0}
                        title="Move Up"
                        className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-amber-400 disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        <MoveUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveSection(idx, 'down')}
                        disabled={idx === sortedSections.length - 1}
                        title="Move Down"
                        className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-amber-400 disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        <MoveDown className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Enable Toggle Switch */}
                    <button
                      onClick={() => {
                        toggleSectionEnabled(sec.id, !sec.enabled);
                        showToast(`Section "${sec.name}" ${!sec.enabled ? 'enabled' : 'hidden'}`);
                      }}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                        sec.enabled 
                          ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60 hover:bg-emerald-900/60' 
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {sec.enabled ? (
                        <>
                          <Eye className="w-3.5 h-3.5" /> Enabled
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5" /> Hidden
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Hero Banner */}
      {activeTab === 'hero' && (
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-100">Hero Section Content</h2>
            <p className="text-xs text-slate-400">
              Customize the prominent top banner seen when visitors land on your website.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Top Badge Pill Text</label>
                <input
                  type="text"
                  value={heroDraft.badge}
                  onChange={e => setHeroDraft(prev => ({ ...prev, badge: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Main Heading</label>
                <textarea
                  rows={2}
                  value={heroDraft.heading}
                  onChange={e => setHeroDraft(prev => ({ ...prev, heading: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Subtitle / Body Paragraph</label>
                <textarea
                  rows={4}
                  value={heroDraft.subtitle}
                  onChange={e => setHeroDraft(prev => ({ ...prev, subtitle: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Primary CTA Button Text</label>
                  <input
                    type="text"
                    value={heroDraft.primaryCtaText}
                    onChange={e => setHeroDraft(prev => ({ ...prev, primaryCtaText: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Primary CTA Link</label>
                  <input
                    type="text"
                    value={heroDraft.primaryCtaLink}
                    onChange={e => setHeroDraft(prev => ({ ...prev, primaryCtaLink: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Secondary CTA Button Text</label>
                  <input
                    type="text"
                    value={heroDraft.secondaryCtaText}
                    onChange={e => setHeroDraft(prev => ({ ...prev, secondaryCtaText: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Secondary CTA Link</label>
                  <input
                    type="text"
                    value={heroDraft.secondaryCtaLink}
                    onChange={e => setHeroDraft(prev => ({ ...prev, secondaryCtaLink: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Background Image URL</label>
                <input
                  type="text"
                  value={heroDraft.backgroundImage}
                  onChange={e => setHeroDraft(prev => ({ ...prev, backgroundImage: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500 font-mono text-xs"
                />
                {heroDraft.backgroundImage && (
                  <div className="mt-2 relative h-32 rounded-xl overflow-hidden border border-slate-800">
                    <img src={heroDraft.backgroundImage} alt="Background Preview" className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-2 bg-slate-950/80 text-[10px] text-slate-300 px-2 py-0.5 rounded font-mono">
                      Background Image Preview
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Featured Hero Product Image URL</label>
                <input
                  type="text"
                  value={heroDraft.heroImage}
                  onChange={e => setHeroDraft(prev => ({ ...prev, heroImage: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500 font-mono text-xs"
                />
                {heroDraft.heroImage && (
                  <div className="mt-2 relative h-32 w-32 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                    <img src={heroDraft.heroImage} alt="Hero Product Preview" className="w-full h-full object-contain p-2" />
                    <span className="absolute bottom-2 left-2 bg-slate-950/80 text-[10px] text-slate-300 px-2 py-0.5 rounded font-mono">
                      Product Preview
                    </span>
                  </div>
                )}
              </div>

              {/* Stats Editor */}
              <div className="border border-slate-800 rounded-xl p-4 bg-slate-950/40 space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Hero Statistics Metrics</h4>
                {heroDraft.stats.map((st, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="e.g. 18,000 FT"
                      value={st.value}
                      onChange={e => {
                        const newStats = [...heroDraft.stats];
                        newStats[i].value = e.target.value;
                        setHeroDraft(prev => ({ ...prev, stats: newStats }));
                      }}
                      className="w-1/3 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100"
                    />
                    <input
                      type="text"
                      placeholder="Label e.g. High Altitude Origin"
                      value={st.label}
                      onChange={e => {
                        const newStats = [...heroDraft.stats];
                        newStats[i].label = e.target.value;
                        setHeroDraft(prev => ({ ...prev, stats: newStats }));
                      }}
                      className="w-2/3 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Products & Categories */}
      {activeTab === 'catalogue' && (
        <div className="space-y-6">
          {/* Featured Section */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h2 className="text-lg font-bold text-slate-100">Featured Products Collection Header</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Section Title</label>
                <input
                  type="text"
                  value={featuredCatalogueDraft.title}
                  onChange={e => setFeaturedCatalogueDraft(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Section Subtitle</label>
                <input
                  type="text"
                  value={featuredCatalogueDraft.subtitle}
                  onChange={e => setFeaturedCatalogueDraft(prev => ({ ...prev, subtitle: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100"
                />
              </div>
            </div>
          </div>

          {/* Shop By Category Grid */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-100">Category Grid Cards</h2>
              <p className="text-xs text-slate-400">Manage images, labels, and badges for category navigation.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryGridDraft.items.map((cat, idx) => (
                <div key={cat.id} className="border border-slate-800 rounded-xl p-4 bg-slate-950/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400">Category #{idx + 1} ({cat.id})</span>
                    <button
                      onClick={() => {
                        const newItems = [...categoryGridDraft.items];
                        newItems[idx].enabled = !newItems[idx].enabled;
                        setCategoryGridDraft(prev => ({ ...prev, items: newItems }));
                      }}
                      className={`text-[10px] px-2 py-0.5 rounded font-semibold border ${
                        cat.enabled ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800' : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {cat.enabled ? 'Active' : 'Disabled'}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 mb-1">Category Name</label>
                      <input
                        type="text"
                        value={cat.name}
                        onChange={e => {
                          const newItems = [...categoryGridDraft.items];
                          newItems[idx].name = e.target.value;
                          setCategoryGridDraft(prev => ({ ...prev, items: newItems }));
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 mb-1">Badge Tag</label>
                      <input
                        type="text"
                        value={cat.tag}
                        onChange={e => {
                          const newItems = [...categoryGridDraft.items];
                          newItems[idx].tag = e.target.value;
                          setCategoryGridDraft(prev => ({ ...prev, items: newItems }));
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">Category Card Image URL</label>
                    <input
                      type="text"
                      value={cat.image}
                      onChange={e => {
                        const newItems = [...categoryGridDraft.items];
                        newItems[idx].image = e.target.value;
                        setCategoryGridDraft(prev => ({ ...prev, items: newItems }));
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-100"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Brand Story & Why Us */}
      {activeTab === 'story' && (
        <div className="space-y-6">
          {/* Brand Story Form */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h2 className="text-lg font-bold text-slate-100">Brand Sourcing Story</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tagline</label>
                <input
                  type="text"
                  value={brandStoryDraft.tagline}
                  onChange={e => setBrandStoryDraft(prev => ({ ...prev, tagline: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Heading</label>
                <input
                  type="text"
                  value={brandStoryDraft.heading}
                  onChange={e => setBrandStoryDraft(prev => ({ ...prev, heading: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Description Paragraph 1</label>
              <textarea
                rows={2}
                value={brandStoryDraft.description1}
                onChange={e => setBrandStoryDraft(prev => ({ ...prev, description1: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Description Paragraph 2</label>
              <textarea
                rows={2}
                value={brandStoryDraft.description2}
                onChange={e => setBrandStoryDraft(prev => ({ ...prev, description2: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Story Graphic Image URL</label>
              <input
                type="text"
                value={brandStoryDraft.image}
                onChange={e => setBrandStoryDraft(prev => ({ ...prev, image: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs font-mono text-slate-100"
              />
            </div>
          </div>

          {/* Why Choose Us Form */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-100">Why Choose The Pahadi Sher</h2>
              <p className="text-xs text-slate-400">Edit key features highlighting your brand's purity and ethics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {whyUsDraft.items.map((item, idx) => (
                <div key={item.id} className="border border-slate-800 rounded-xl p-4 bg-slate-950/60 space-y-3">
                  <span className="text-xs font-bold text-amber-400">Feature #{idx + 1}</span>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">Feature Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={e => {
                        const newItems = [...whyUsDraft.items];
                        newItems[idx].title = e.target.value;
                        setWhyUsDraft(prev => ({ ...prev, items: newItems }));
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">Feature Description</label>
                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={e => {
                        const newItems = [...whyUsDraft.items];
                        newItems[idx].description = e.target.value;
                        setWhyUsDraft(prev => ({ ...prev, items: newItems }));
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Testimonials & Promo Banners */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          {/* Promo Banner */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h2 className="text-lg font-bold text-slate-100">Festive Promotional Banner Section</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Banner Badge Text</label>
                <input
                  type="text"
                  value={promoBannerDraft.badge}
                  onChange={e => setPromoBannerDraft(prev => ({ ...prev, badge: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Coupon Promo Code</label>
                <input
                  type="text"
                  value={promoBannerDraft.discountCode || ''}
                  onChange={e => setPromoBannerDraft(prev => ({ ...prev, discountCode: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm font-mono text-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Banner Main Title</label>
              <input
                type="text"
                value={promoBannerDraft.title}
                onChange={e => setPromoBannerDraft(prev => ({ ...prev, title: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Banner Description</label>
              <textarea
                rows={2}
                value={promoBannerDraft.description}
                onChange={e => setPromoBannerDraft(prev => ({ ...prev, description: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Button Text</label>
                <input
                  type="text"
                  value={promoBannerDraft.buttonText}
                  onChange={e => setPromoBannerDraft(prev => ({ ...prev, buttonText: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Banner Background Image URL</label>
                <input
                  type="text"
                  value={promoBannerDraft.backgroundImage}
                  onChange={e => setPromoBannerDraft(prev => ({ ...prev, backgroundImage: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs font-mono text-slate-100"
                />
              </div>
            </div>
          </div>

          {/* Testimonials List */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-100">Featured Customer Reviews</h2>
                <p className="text-xs text-slate-400">Edit customer review cards displayed on homepage.</p>
              </div>

              <button
                onClick={() => {
                  const newItem: TestimonialItem = {
                    id: 't_' + Date.now(),
                    name: 'New Verified Buyer',
                    location: 'Mumbai',
                    rating: 5,
                    review: 'Extremely pure products directly from high altitudes! Very satisfied.',
                    verified: true
                  };
                  setTestimonialsDraft(prev => ({ ...prev, items: [...prev.items, newItem] }));
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20"
              >
                <Plus className="w-4 h-4" /> Add Review Card
              </button>
            </div>

            <div className="space-y-4">
              {testimonialsDraft.items.map((t, idx) => (
                <div key={t.id} className="border border-slate-800 rounded-xl p-4 bg-slate-950/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400">Review Card #{idx + 1}</span>
                    <button
                      onClick={() => {
                        setTestimonialsDraft(prev => ({
                          ...prev,
                          items: prev.items.filter(item => item.id !== t.id)
                        }));
                      }}
                      className="text-slate-400 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 mb-1">Customer Name</label>
                      <input
                        type="text"
                        value={t.name}
                        onChange={e => {
                          const newItems = [...testimonialsDraft.items];
                          newItems[idx].name = e.target.value;
                          setTestimonialsDraft(prev => ({ ...prev, items: newItems }));
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 mb-1">City / Location</label>
                      <input
                        type="text"
                        value={t.location}
                        onChange={e => {
                          const newItems = [...testimonialsDraft.items];
                          newItems[idx].location = e.target.value;
                          setTestimonialsDraft(prev => ({ ...prev, items: newItems }));
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 mb-1">Star Rating (1 - 5)</label>
                      <input
                        type="number"
                        min={1}
                        max={5}
                        value={t.rating}
                        onChange={e => {
                          const newItems = [...testimonialsDraft.items];
                          newItems[idx].rating = Number(e.target.value);
                          setTestimonialsDraft(prev => ({ ...prev, items: newItems }));
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">Review Body Text</label>
                    <textarea
                      rows={2}
                      value={t.review}
                      onChange={e => {
                        const newItems = [...testimonialsDraft.items];
                        newItems[idx].review = e.target.value;
                        setTestimonialsDraft(prev => ({ ...prev, items: newItems }));
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Newsletter Section */}
      {activeTab === 'newsletter' && (
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h2 className="text-lg font-bold text-slate-100">Newsletter Subscription Section</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Main Heading</label>
              <input
                type="text"
                value={newsletterDraft.heading}
                onChange={e => setNewsletterDraft(prev => ({ ...prev, heading: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">CTA Button Text</label>
              <input
                type="text"
                value={newsletterDraft.buttonText}
                onChange={e => setNewsletterDraft(prev => ({ ...prev, buttonText: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Subtitle / Value Proposition</label>
            <textarea
              rows={2}
              value={newsletterDraft.subtitle}
              onChange={e => setNewsletterDraft(prev => ({ ...prev, subtitle: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Perk Badges (Comma-separated)</label>
            <input
              type="text"
              value={newsletterDraft.perks.join(', ')}
              onChange={e => {
                const list = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                setNewsletterDraft(prev => ({ ...prev, perks: list }));
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100"
            />
          </div>
        </div>
      )}
    </div>
  );
}

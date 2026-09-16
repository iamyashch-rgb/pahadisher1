'use client';

import React, { useState } from 'react';
import { FileText, Save, CheckCircle2, Sparkles, Bell } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export default function AdminContentPage() {
  const { storeContent, updateStoreContent } = useAdmin();
  const [announcementText, setAnnouncementText] = useState(storeContent.announcementBarText);
  const [announcementActive, setAnnouncementActive] = useState(storeContent.announcementActive);
  const [heroHeading, setHeroHeading] = useState(storeContent.heroHeading);
  const [heroSubheading, setHeroSubheading] = useState(storeContent.heroSubheading);
  const [bannerTagline, setBannerTagline] = useState(storeContent.bannerTagline);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreContent({
      announcementBarText: announcementText,
      announcementActive,
      heroHeading,
      heroSubheading,
      bannerTagline
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pahadi-sand pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-pahadi-brown">CMS & Banners</span>
          <h1 className="font-playfair text-2xl font-bold text-pahadi-green">Storefront Announcements & Story Content</h1>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Announcement Bar Settings */}
        <div className="bg-pahadi-paper p-6 rounded-3xl border border-pahadi-border space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-pahadi-sand pb-3">
            <h3 className="font-playfair text-lg font-bold text-pahadi-green flex items-center space-x-2">
              <Bell className="w-5 h-5 text-pahadi-gold" />
              <span>Top Announcement Ribbon</span>
            </h3>
            <label className="flex items-center space-x-2 cursor-pointer text-xs font-bold text-pahadi-green">
              <input
                type="checkbox"
                checked={announcementActive}
                onChange={(e) => setAnnouncementActive(e.target.checked)}
                className="w-4 h-4 text-pahadi-green rounded border-pahadi-border"
              />
              <span>Enable Bar on Storefront</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold text-pahadi-brown uppercase mb-1">
              Ribbon Announcement Text
            </label>
            <input
              type="text"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs font-semibold text-pahadi-green focus:ring-2 focus:ring-pahadi-gold outline-none"
            />
          </div>
        </div>

        {/* Hero Section Copy */}
        <div className="bg-pahadi-paper p-6 rounded-3xl border border-pahadi-border space-y-4 shadow-sm">
          <div className="border-b border-pahadi-sand pb-3">
            <h3 className="font-playfair text-lg font-bold text-pahadi-green flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-pahadi-green" />
              <span>Homepage Hero Section Copy</span>
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-pahadi-brown uppercase mb-1">
                Primary Hero Headline
              </label>
              <input
                type="text"
                value={heroHeading}
                onChange={(e) => setHeroHeading(e.target.value)}
                className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs font-bold text-pahadi-green focus:ring-2 focus:ring-pahadi-gold outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-pahadi-brown uppercase mb-1">
                Subheading Paragraph
              </label>
              <textarea
                rows={3}
                value={heroSubheading}
                onChange={(e) => setHeroSubheading(e.target.value)}
                className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs text-pahadi-green focus:ring-2 focus:ring-pahadi-gold outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-pahadi-brown uppercase mb-1">
                Trust Badge Banner Tagline
              </label>
              <input
                type="text"
                value={bannerTagline}
                onChange={(e) => setBannerTagline(e.target.value)}
                className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs font-semibold text-pahadi-green focus:ring-2 focus:ring-pahadi-gold outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="submit"
            className="bg-pahadi-green hover:bg-pahadi-green-light text-pahadi-gold px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Publish Content Updates</span>
          </button>
          {savedSuccess && (
            <span className="text-xs font-bold text-emerald-700 flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Content published live to storefront!</span>
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

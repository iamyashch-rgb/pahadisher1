'use client';

import React, { useState } from 'react';
import { Layers, Plus, Search, Edit3, Check, X, ShieldCheck } from 'lucide-react';
import { useAdmin, Category } from '@/context/AdminContext';

export default function AdminCategoriesPage() {
  const { categories, addCategory, updateCategoryStatus } = useAdmin();
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      description: description || 'Artisanal Himalayan harvest category',
      productCount: 0,
      featured: true,
      status: 'Active'
    };

    addCategory(newCat);
    setShowAddModal(false);
    setName('');
    setSlug('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pahadi-sand pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-pahadi-brown">Taxonomy</span>
          <h1 className="font-playfair text-2xl font-bold text-pahadi-green">Product Categories</h1>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-pahadi-green hover:bg-pahadi-green-light text-pahadi-gold px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-pahadi-paper p-6 rounded-3xl border border-pahadi-border space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-pahadi-brown bg-pahadi-sand/50 px-2.5 py-1 rounded-full uppercase">
                  /{cat.slug}
                </span>
                <span
                  className={`px-3 py-0.5 rounded-full text-[10px] font-bold ${
                    cat.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {cat.status}
                </span>
              </div>
              <h3 className="font-playfair text-xl font-bold text-pahadi-green">{cat.name}</h3>
              <p className="text-xs text-pahadi-charcoal-muted line-clamp-2">{cat.description}</p>
            </div>

            <div className="pt-4 border-t border-pahadi-sand flex items-center justify-between text-xs">
              <span className="font-bold text-pahadi-brown">{cat.productCount} Linked Products</span>
              <button
                onClick={() => updateCategoryStatus(cat.id, cat.status === 'Active' ? 'Draft' : 'Active')}
                className="text-pahadi-green hover:underline font-bold text-[11px]"
              >
                Toggle Status
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-pahadi-paper rounded-3xl p-6 max-w-md w-full border border-pahadi-gold/30 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-pahadi-sand pb-3">
              <h3 className="font-playfair text-xl font-bold text-pahadi-green">Create Product Category</h3>
              <button onClick={() => setShowAddModal(false)} className="text-pahadi-brown font-bold text-lg">×</button>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-pahadi-brown mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Artisanal Herbal Oils"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-pahadi-brown mb-1">URL Slug</label>
                <input
                  type="text"
                  placeholder="e.g. artisanal-herbal-oils"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-pahadi-brown mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Brief description for category banner..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-pahadi-sand text-pahadi-brown font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-pahadi-green text-pahadi-gold font-bold rounded-xl shadow-md"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

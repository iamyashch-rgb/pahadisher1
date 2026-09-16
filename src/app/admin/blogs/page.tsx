'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  BookOpen, Plus, Search, Filter, Edit3, Trash2, Eye, Calendar, 
  User, Clock, Sparkles, CheckCircle2, AlertCircle, X, ExternalLink, 
  FileText, Globe, Tag, Image as ImageIcon, Code, Type, Bold, Heading
} from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { BlogPost } from '@/data/blogPosts';

export default function AdminBlogsPage() {
  const { blogPosts, addNewBlogPost, updateBlogPost, deleteBlogPost } = useAdmin();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [previewPost, setPreviewPost] = useState<BlogPost | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form Field States
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formCategory, setFormCategory] = useState('Ayurvedic Wisdom');
  const [formCustomCategory, setFormCustomCategory] = useState('');
  const [formAuthor, setFormAuthor] = useState('Dr. Devendra Rawat');
  const [formAuthorRole, setFormAuthorRole] = useState('Chief Ayurvedic Botanist');
  const [formPublishDate, setFormPublishDate] = useState(new Date().toISOString().split('T')[0]);
  const [formReadTime, setFormReadTime] = useState('5 min read');
  const [formImage, setFormImage] = useState('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=85');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formSeoTitle, setFormSeoTitle] = useState('');
  const [formSeoDescription, setFormSeoDescription] = useState('');
  const [activeFormTab, setActiveFormTab] = useState<'write' | 'preview'>('write');

  // Category List options
  const categoryOptions = ['Ayurvedic Wisdom', 'Pahadi Heritage', 'Recipes & Teas', 'Himalayan Lifestyle', 'Purity Guides'];

  // Filtered Blog List
  const filteredPosts = useMemo(() => {
    return (blogPosts || []).filter(post => {
      if (selectedCategory !== 'All' && post.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(q);
        const matchesAuthor = post.author.toLowerCase().includes(q);
        const matchesExcerpt = post.excerpt.toLowerCase().includes(q);
        if (!matchesTitle && !matchesAuthor && !matchesExcerpt) return false;
      }
      return true;
    });
  }, [blogPosts, selectedCategory, searchTerm]);

  // Handle Title Change (auto-generate slug)
  const handleTitleChange = (val: string) => {
    setFormTitle(val);
    if (!editingPost) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      setFormSlug(generated);
    }
  };

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setEditingPost(null);
    setFormTitle('');
    setFormSlug('');
    setFormCategory('Ayurvedic Wisdom');
    setFormCustomCategory('');
    setFormAuthor('Dr. Devendra Rawat');
    setFormAuthorRole('Chief Ayurvedic Botanist');
    setFormPublishDate(new Date().toISOString().split('T')[0]);
    setFormReadTime('5 min read');
    setFormImage('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=85');
    setFormExcerpt('');
    setFormContent('');
    setFormSeoTitle('');
    setFormSeoDescription('');
    setActiveFormTab('write');
    setIsFormOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setFormTitle(post.title);
    setFormSlug(post.slug);
    setFormCategory(post.category);
    setFormCustomCategory(categoryOptions.includes(post.category) ? '' : post.category);
    setFormAuthor(post.author);
    setFormAuthorRole(post.authorRole);
    setFormPublishDate(post.publishDate);
    setFormReadTime(post.readTime);
    setFormImage(post.image);
    setFormExcerpt(post.excerpt);
    setFormContent(post.content);
    setFormSeoTitle(post.seoTitle || '');
    setFormSeoDescription(post.seoDescription || '');
    setActiveFormTab('write');
    setIsFormOpen(true);
  };

  // Save Blog Post
  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('Please enter an article title.');
      return;
    }

    const finalCategory = formCategory === 'Other' && formCustomCategory.trim() ? formCustomCategory.trim() : formCategory;
    const finalSlug = formSlug.trim() || formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const postPayload: BlogPost = {
      id: editingPost ? editingPost.id : `blog-${Date.now()}`,
      title: formTitle.trim(),
      slug: finalSlug,
      category: finalCategory,
      author: formAuthor.trim() || 'Pahadi Sher Team',
      authorRole: formAuthorRole.trim() || 'Ayurvedic Specialist',
      publishDate: formPublishDate,
      readTime: formReadTime.trim() || '5 min read',
      image: formImage.trim() || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=85',
      excerpt: formExcerpt.trim(),
      content: formContent.trim(),
      seoTitle: formSeoTitle.trim() || `${formTitle} | The Pahadi Sher Journal`,
      seoDescription: formSeoDescription.trim() || formExcerpt.trim()
    };

    if (editingPost) {
      updateBlogPost(postPayload);
    } else {
      addNewBlogPost(postPayload);
    }

    setIsFormOpen(false);
  };

  // Quick Insert Formatting Helpers
  const insertFormatting = (tagOpen: string, tagClose: string = '') => {
    setFormContent(prev => prev + `${tagOpen}${tagClose}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pahadi-sand pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-pahadi-brown block">
            Content Management System
          </span>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-pahadi-green flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-pahadi-gold" />
            <span>Himalayan Journal & Blog CMS</span>
          </h1>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="bg-pahadi-green hover:bg-pahadi-green-light text-pahadi-gold px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create New Blog Article</span>
        </button>
      </div>

      {/* Analytics & Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-pahadi-paper p-4 rounded-2xl border border-pahadi-border space-y-1 shadow-xs">
          <span className="text-[10px] font-bold text-pahadi-brown uppercase">Total Published Articles</span>
          <p className="font-playfair text-2xl font-bold text-pahadi-green">{blogPosts.length}</p>
        </div>
        <div className="bg-pahadi-paper p-4 rounded-2xl border border-pahadi-border space-y-1 shadow-xs">
          <span className="text-[10px] font-bold text-pahadi-brown uppercase">Categories</span>
          <p className="font-playfair text-2xl font-bold text-pahadi-green">
            {new Set(blogPosts.map(p => p.category)).size}
          </p>
        </div>
        <div className="bg-pahadi-paper p-4 rounded-2xl border border-pahadi-border space-y-1 shadow-xs">
          <span className="text-[10px] font-bold text-pahadi-brown uppercase">Avg. Read Time</span>
          <p className="font-playfair text-2xl font-bold text-pahadi-green">5.2 mins</p>
        </div>
        <div className="bg-pahadi-paper p-4 rounded-2xl border border-pahadi-border space-y-1 shadow-xs">
          <span className="text-[10px] font-bold text-pahadi-brown uppercase">Live Storefront Route</span>
          <Link href="/blog" target="_blank" className="text-xs font-bold text-pahadi-green hover:underline flex items-center space-x-1 pt-1">
            <span>/blog</span>
            <ExternalLink className="w-3 h-3 text-pahadi-gold" />
          </Link>
        </div>
      </div>

      {/* Control Search & Filter Bar */}
      <div className="bg-pahadi-paper p-4 rounded-2xl border border-pahadi-border flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center space-x-3 w-full sm:w-auto flex-1">
          {/* Search */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 text-pahadi-brown absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search articles by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-pahadi-border rounded-xl pl-9 pr-3 py-2 text-xs text-pahadi-green outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-pahadi-gold shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white border border-pahadi-border rounded-xl px-3 py-2 text-xs font-bold text-pahadi-green outline-none"
            >
              <option value="All">All Categories</option>
              {categoryOptions.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <span className="text-xs text-pahadi-charcoal-muted font-medium self-end sm:self-center">
          Showing {filteredPosts.length} of {blogPosts.length} articles
        </span>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-pahadi-paper rounded-3xl border border-pahadi-border overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all group"
          >
            <div>
              {/* Thumbnail Image */}
              <div className="aspect-video relative overflow-hidden bg-pahadi-sand/40">
                <Image
                  src={post.image || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80'}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-pahadi-green text-pahadi-gold font-bold text-[10px] uppercase px-3 py-1 rounded-full shadow-xs">
                  {post.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-pahadi-charcoal-muted font-medium">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-pahadi-gold" />
                    <span>{post.publishDate}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-pahadi-gold" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <h3 className="font-playfair text-base font-bold text-pahadi-green line-clamp-2 leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-pahadi-charcoal-muted line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="pt-2 border-t border-pahadi-sand flex items-center space-x-2 text-xs">
                  <User className="w-3.5 h-3.5 text-pahadi-brown" />
                  <div>
                    <span className="font-bold text-pahadi-green block text-[11px]">{post.author}</span>
                    <span className="text-[10px] text-pahadi-charcoal-muted block">{post.authorRole}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-4 bg-pahadi-sand/40 border-t border-pahadi-sand flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPreviewPost(post)}
                  className="p-2 bg-white rounded-xl text-pahadi-green hover:bg-pahadi-green hover:text-white border border-pahadi-border text-xs font-bold transition-colors flex items-center space-x-1"
                  title="Preview Article Modal"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="p-2 bg-white rounded-xl text-pahadi-brown hover:text-pahadi-green border border-pahadi-border text-xs font-bold transition-colors"
                  title="View on Live Storefront"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleOpenEditModal(post)}
                  className="px-3 py-1.5 bg-pahadi-gold/20 hover:bg-pahadi-gold text-pahadi-brown hover:text-pahadi-green font-bold text-xs rounded-xl flex items-center space-x-1 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setDeleteConfirmId(post.id)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Article"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE / EDIT ARTICLE MODAL */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-pahadi-paper w-full max-w-4xl rounded-3xl border border-pahadi-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-pahadi-sand flex items-center justify-between bg-pahadi-green text-pahadi-paper">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-pahadi-gold block">
                  {editingPost ? 'Edit Blog Post' : 'Create New Article'}
                </span>
                <h2 className="font-playfair text-xl font-bold text-white">
                  {editingPost ? editingPost.title : 'Add Journal Entry'}
                </h2>
              </div>
              <button onClick={() => setIsFormOpen(false)} className="p-1 text-pahadi-sand hover:text-white rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body / Scrollable Form */}
            <form onSubmit={handleSavePost} className="p-6 space-y-5 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-pahadi-brown uppercase mb-1">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. How to Test 100% Pure Himalayan Shilajit at Home"
                    className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs font-bold text-pahadi-green outline-none"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-xs font-bold text-pahadi-brown uppercase mb-1">
                    URL Slug (Auto-generated)
                  </label>
                  <input
                    type="text"
                    required
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="how-to-test-pure-shilajit-at-home"
                    className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs font-mono text-pahadi-green outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-pahadi-brown uppercase mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs font-bold text-pahadi-green outline-none"
                  >
                    {categoryOptions.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="Other">+ Custom Category</option>
                  </select>
                  {formCategory === 'Other' && (
                    <input
                      type="text"
                      placeholder="Enter new category name..."
                      value={formCustomCategory}
                      onChange={(e) => setFormCustomCategory(e.target.value)}
                      className="w-full bg-white border border-pahadi-border rounded-xl p-2 text-xs text-pahadi-green mt-2 outline-none"
                    />
                  )}
                </div>

                {/* Author Name */}
                <div>
                  <label className="block text-xs font-bold text-pahadi-brown uppercase mb-1">Author Name</label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    placeholder="e.g. Dr. Devendra Rawat"
                    className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs font-semibold text-pahadi-green outline-none"
                  />
                </div>

                {/* Author Role */}
                <div>
                  <label className="block text-xs font-bold text-pahadi-brown uppercase mb-1">Author Title / Role</label>
                  <input
                    type="text"
                    value={formAuthorRole}
                    onChange={(e) => setFormAuthorRole(e.target.value)}
                    placeholder="e.g. Chief Ayurvedic Botanist"
                    className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Publish Date */}
                <div>
                  <label className="block text-xs font-bold text-pahadi-brown uppercase mb-1">Publish Date</label>
                  <input
                    type="date"
                    value={formPublishDate}
                    onChange={(e) => setFormPublishDate(e.target.value)}
                    className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green outline-none"
                  />
                </div>

                {/* Read Time */}
                <div>
                  <label className="block text-xs font-bold text-pahadi-brown uppercase mb-1">Est. Read Time</label>
                  <input
                    type="text"
                    value={formReadTime}
                    onChange={(e) => setFormReadTime(e.target.value)}
                    placeholder="e.g. 5 min read"
                    className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green outline-none"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-xs font-bold text-pahadi-brown uppercase mb-1">Featured Cover Image URL</label>
                  <input
                    type="url"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green outline-none"
                  />
                </div>
              </div>

              {/* Cover Image Preview */}
              {formImage && (
                <div className="relative aspect-video max-h-36 rounded-2xl overflow-hidden border border-pahadi-sand bg-gray-100">
                  <Image src={formImage} alt="Cover Preview" fill className="object-cover" />
                  <span className="absolute top-2 left-2 bg-black/60 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    COVER IMAGE PREVIEW
                  </span>
                </div>
              )}

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold text-pahadi-brown uppercase mb-1">
                  Article Excerpt / Short Summary
                </label>
                <textarea
                  rows={2}
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  placeholder="Enter a 2-3 sentence summary displayed on card previews..."
                  className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs text-pahadi-green outline-none"
                />
              </div>

              {/* Article Content & Formatting Controls */}
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-pahadi-sand pb-2">
                  <label className="block text-xs font-bold text-pahadi-brown uppercase">
                    Article Full Content (Supports HTML Formatting)
                  </label>
                  
                  <div className="flex items-center space-x-2">
                    {/* Write vs Preview Toggle */}
                    <button
                      type="button"
                      onClick={() => setActiveFormTab('write')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        activeFormTab === 'write' ? 'bg-pahadi-green text-pahadi-gold' : 'bg-pahadi-sand text-pahadi-brown'
                      }`}
                    >
                      Write HTML
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveFormTab('preview')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        activeFormTab === 'preview' ? 'bg-pahadi-green text-pahadi-gold' : 'bg-pahadi-sand text-pahadi-brown'
                      }`}
                    >
                      Live Render Preview
                    </button>
                  </div>
                </div>

                {/* Quick Insert Toolbar */}
                {activeFormTab === 'write' && (
                  <div className="flex flex-wrap items-center gap-1.5 p-2 bg-pahadi-sand/50 rounded-xl border border-pahadi-sand text-xs">
                    <span className="text-[10px] font-bold text-pahadi-brown mr-1">Insert Helper:</span>
                    <button type="button" onClick={() => insertFormatting('<h2>', '</h2>')} className="px-2 py-1 bg-white hover:bg-pahadi-gold/20 rounded font-bold text-[10px] text-pahadi-green">H2 Heading</button>
                    <button type="button" onClick={() => insertFormatting('<h3>', '</h3>')} className="px-2 py-1 bg-white hover:bg-pahadi-gold/20 rounded font-bold text-[10px] text-pahadi-green">H3 Heading</button>
                    <button type="button" onClick={() => insertFormatting('<p>', '</p>')} className="px-2 py-1 bg-white hover:bg-pahadi-gold/20 rounded font-bold text-[10px] text-pahadi-green">Paragraph</button>
                    <button type="button" onClick={() => insertFormatting('<strong>', '</strong>')} className="px-2 py-1 bg-white hover:bg-pahadi-gold/20 rounded font-bold text-[10px] text-pahadi-green">Bold</button>
                    <button type="button" onClick={() => insertFormatting('<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>')} className="px-2 py-1 bg-white hover:bg-pahadi-gold/20 rounded font-bold text-[10px] text-pahadi-green">Bullet List</button>
                    <button type="button" onClick={() => insertFormatting('<blockquote>', '</blockquote>')} className="px-2 py-1 bg-white hover:bg-pahadi-gold/20 rounded font-bold text-[10px] text-pahadi-green">Quote Block</button>
                  </div>
                )}

                {activeFormTab === 'write' ? (
                  <textarea
                    rows={10}
                    required
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder="Write your article content using standard HTML tags (<p>, <h2>, <ul>, etc)..."
                    className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs font-mono text-pahadi-green outline-none leading-relaxed"
                  />
                ) : (
                  <div className="bg-white p-6 rounded-xl border border-pahadi-border prose prose-stone max-w-none text-xs text-pahadi-charcoal leading-relaxed min-h-[250px]">
                    <div dangerouslySetInnerHTML={{ __html: formContent || '<p class="text-gray-400 italic">No content typed yet...</p>' }} />
                  </div>
                )}
              </div>

              {/* SEO Controls */}
              <div className="bg-pahadi-sand/40 p-4 rounded-2xl border border-pahadi-sand space-y-3">
                <h4 className="font-bold text-xs text-pahadi-green uppercase flex items-center space-x-1">
                  <Globe className="w-3.5 h-3.5 text-pahadi-gold" />
                  <span>SEO Meta Information</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-pahadi-brown uppercase mb-1">SEO Title</label>
                    <input
                      type="text"
                      value={formSeoTitle}
                      onChange={(e) => setFormSeoTitle(e.target.value)}
                      placeholder="Title tag for search engine results..."
                      className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-pahadi-brown uppercase mb-1">SEO Meta Description</label>
                    <input
                      type="text"
                      value={formSeoDescription}
                      onChange={(e) => setFormSeoDescription(e.target.value)}
                      placeholder="Snippet description for Google search results..."
                      className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer Buttons */}
              <div className="pt-4 border-t border-pahadi-sand flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 bg-white border border-pahadi-border text-pahadi-brown font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-pahadi-green hover:bg-pahadi-green-light text-pahadi-gold font-bold rounded-xl text-xs uppercase tracking-wider shadow-md"
                >
                  {editingPost ? 'Save Article Changes' : 'Publish Blog Article Live'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PREVIEW ARTICLE MODAL */}
      {previewPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-pahadi-paper w-full max-w-3xl rounded-3xl border border-pahadi-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-pahadi-sand flex items-center justify-between bg-pahadi-green text-pahadi-paper">
              <span className="text-xs font-bold uppercase tracking-wider text-pahadi-gold">Storefront Preview Mode</span>
              <button onClick={() => setPreviewPost(null)} className="p-1 text-pahadi-sand hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-white">
              <div className="space-y-3">
                <span className="bg-pahadi-gold text-pahadi-green font-bold text-[10px] uppercase px-3 py-1 rounded-full">
                  {previewPost.category}
                </span>
                <h1 className="font-playfair text-2xl font-bold text-pahadi-green leading-tight">
                  {previewPost.title}
                </h1>
                <div className="flex items-center space-x-4 text-xs text-pahadi-charcoal-muted">
                  <span>By <strong>{previewPost.author}</strong> ({previewPost.authorRole})</span>
                  <span>• {previewPost.publishDate}</span>
                  <span>• {previewPost.readTime}</span>
                </div>
              </div>

              {previewPost.image && (
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-pahadi-sand">
                  <Image src={previewPost.image} alt={previewPost.title} fill className="object-cover" />
                </div>
              )}

              <div 
                className="prose prose-stone max-w-none text-xs text-pahadi-charcoal leading-relaxed"
                dangerouslySetInnerHTML={{ __html: previewPost.content }}
              />
            </div>

            <div className="p-4 bg-pahadi-sand/40 border-t border-pahadi-sand flex items-center justify-between">
              <Link
                href={`/blog/${previewPost.slug}`}
                target="_blank"
                className="text-xs font-bold text-pahadi-green hover:underline flex items-center space-x-1"
              >
                <span>Open URL in Storefront</span>
                <ExternalLink className="w-3.5 h-3.5 text-pahadi-gold" />
              </Link>
              <button
                onClick={() => setPreviewPost(null)}
                className="px-4 py-2 bg-pahadi-green text-pahadi-gold rounded-xl font-bold text-xs"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 space-y-4 shadow-2xl border border-red-200 text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-playfair text-lg font-bold text-pahadi-green">Delete Blog Article?</h3>
            <p className="text-xs text-pahadi-charcoal-muted">
              Are you sure you want to delete this article? This action will immediately remove it from your live blog storefront.
            </p>
            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-pahadi-sand text-pahadi-brown font-bold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteBlogPost(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs uppercase"
              >
                Delete Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

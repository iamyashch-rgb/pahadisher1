'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { 
  Package, Plus, Search, Filter, Edit3, Trash2, Copy, Eye, Archive, 
  Upload, Image as ImageIcon, Video, Layers, ShieldCheck, CheckCircle2, 
  AlertTriangle, ArrowUp, ArrowDown, Star, X, Sparkles, Check, Truck, 
  FileText, Globe, DollarSign, Tag, RefreshCw, ChevronRight, Maximize2
} from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { Product, ProductVariant, ProductCategory, InventoryStatus } from '@/types';

export default function AdminProductsPage() {
  const { 
    products, 
    addNewProduct, 
    updateProduct, 
    deleteProduct, 
    duplicateProduct, 
    archiveProduct, 
    setPublishStatus,
    setProductStatus,
    restoreDefaultProducts
  } = useAdmin();

  // State filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState<'All' | 'Published' | 'Draft' | 'Unpublished' | 'Archived'>('All');

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form Active Section Tab
  const [formSection, setFormSection] = useState<'basic' | 'pricing' | 'media' | 'variants' | 'attributes' | 'shipping' | 'seo'>('basic');

  // Form State
  const [formName, setFormName] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formCategory, setFormCategory] = useState<ProductCategory>('shilajit');
  const [formCategoryName, setFormCategoryName] = useState('Shilajit');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formPrice, setFormPrice] = useState<number>(1499);
  const [formOriginalPrice, setFormOriginalPrice] = useState<number>(1999);
  const [formStock, setFormStock] = useState<number>(50);
  const [formLowStockThreshold, setFormLowStockThreshold] = useState<number>(10);
  const [formAltitude, setFormAltitude] = useState('18,000 FT');
  const [formOrigin, setFormOrigin] = useState('Upper Kumaon, Uttarakhand');
  const [formNetQuantity, setFormNetQuantity] = useState('50g Glass Jar');
  const [formLabCertificateNo, setFormLabCertificateNo] = useState('PAH-2026-881');
  const [formImages, setFormImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80'
  ]);
  const [formNewImageUrl, setFormNewImageUrl] = useState('');
  const [formVideos, setFormVideos] = useState<string[]>([]);
  const [formNewVideoUrl, setFormNewVideoUrl] = useState('');
  const [formVariants, setFormVariants] = useState<ProductVariant[]>([]);
  const [formIngredients, setFormIngredients] = useState<string[]>(['100% Pure Himalayan Harvest']);
  const [formNewIngredient, setFormNewIngredient] = useState('');
  const [formBenefits, setFormBenefits] = useState<string[]>([
    'Boosts daily energy & vitality',
    'Contains 84+ ionic trace minerals'
  ]);
  const [formNewBenefit, setFormNewBenefit] = useState('');
  const [formHowToUse, setFormHowToUse] = useState('Consume a pea-sized amount daily with warm milk or honey water.');
  const [formWeight, setFormWeight] = useState('250g');
  const [formDeliveryDays, setFormDeliveryDays] = useState('3-5 Business Days');
  const [formShippingDetails, setFormShippingDetails] = useState('Shipped via Express Air in shatter-proof eco glass packaging.');
  const [formSeoTitle, setFormSeoTitle] = useState('');
  const [formSeoDescription, setFormSeoDescription] = useState('');
  const [formSeoKeywords, setFormSeoKeywords] = useState('');
  const [formPublishStatus, setFormPublishStatus] = useState<'Published' | 'Draft' | 'Unpublished' | 'Archived'>('Published');

  // Preview Gallery State inside Preview Modal
  const [previewSelectedImage, setPreviewSelectedImage] = useState(0);

  // Compute analytics
  const totalProducts = products.length;
  const publishedCount = products.filter(p => !p.publishStatus || p.publishStatus === 'Published').length;
  const draftCount = products.filter(p => p.publishStatus === 'Draft').length;
  const lowStockCount = products.filter(p => p.stockQuantity < (p.lowStockThreshold || 10)).length;
  const totalStockValue = products.reduce((acc, p) => acc + (p.price * p.stockQuantity), 0);

  // Available categories list
  const categoryList = ['All', 'Shilajit', 'Honey', 'Ghee', 'Herbal Tea', 'Pickles', 'Pahadi Foods', 'Combos'];

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Tab filter
      const pPub = p.publishStatus || 'Published';
      if (activeTab !== 'All' && pPub !== activeTab) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'All' && p.categoryName.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSku = p.sku && p.sku.toLowerCase().includes(q);
        const matchesCat = p.categoryName.toLowerCase().includes(q);
        if (!matchesName && !matchesSku && !matchesCat) return false;
      }
      return true;
    });
  }, [products, activeTab, selectedCategory, searchTerm]);

  // Open Add Product Modal
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormSku(`TPS-${Date.now().toString().slice(-6)}`);
    setFormCategory('shilajit');
    setFormCategoryName('Shilajit');
    setFormSubtitle('100% Pure Himalayan Harvest');
    setFormDescription('Hand-harvested from high-altitude Himalayan cliffs in Kumaon. Verified for 100% bio-purity.');
    setFormPrice(1499);
    setFormOriginalPrice(1999);
    setFormStock(50);
    setFormLowStockThreshold(10);
    setFormAltitude('18,000 FT');
    setFormOrigin('Pithoragarh, Kumaon');
    setFormNetQuantity('50g Glass Jar');
    setFormLabCertificateNo(`PAH-2026-${Math.floor(100 + Math.random() * 900)}`);
    setFormImages([
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80'
    ]);
    setFormVideos([]);
    setFormVariants([]);
    setFormIngredients(['100% Pure Himalayan Harvest']);
    setFormBenefits(['Boosts daily energy & vitality', 'Contains 84+ ionic trace minerals']);
    setFormHowToUse('Consume a pea-sized amount daily with warm milk or honey water.');
    setFormWeight('250g');
    setFormDeliveryDays('3-5 Business Days');
    setFormShippingDetails('Shipped via Express Air in shatter-proof eco glass packaging.');
    setFormSeoTitle('');
    setFormSeoDescription('');
    setFormSeoKeywords('Pahadi Sher, Himalayan Shilajit, Pure Shilajit');
    setFormPublishStatus('Published');
    setFormSection('basic');
    setIsFormOpen(true);
  };

  // Open Edit Product Modal
  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormName(product.name);
    setFormSku(product.sku || `TPS-${Date.now().toString().slice(-6)}`);
    setFormCategory(product.category);
    setFormCategoryName(product.categoryName);
    setFormSubtitle(product.subtitle || '');
    setFormDescription(product.description || '');
    setFormPrice(product.price);
    setFormOriginalPrice(product.originalPrice);
    setFormStock(product.stockQuantity);
    setFormLowStockThreshold(product.lowStockThreshold || 10);
    setFormAltitude(product.altitude || '18,000 FT');
    setFormOrigin(product.origin || 'Kumaon, Uttarakhand');
    setFormNetQuantity(product.netQuantity || '50g Glass Jar');
    setFormLabCertificateNo(product.labCertificateNo || `PAH-2026-${Math.floor(100 + Math.random() * 900)}`);
    setFormImages(product.images && product.images.length > 0 ? product.images : [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80'
    ]);
    setFormVideos(product.videos || []);
    setFormVariants(product.variants || []);
    setFormIngredients(product.ingredients || []);
    setFormBenefits(product.benefits || []);
    setFormHowToUse(product.howToUse || '');
    const ship = typeof product.shippingInfo === 'object' ? product.shippingInfo : {};
    setFormWeight(ship.weight || '250g');
    setFormDeliveryDays(ship.deliveryDays || '3-5 Business Days');
    setFormShippingDetails(typeof product.shippingInfo === 'string' ? product.shippingInfo : (ship.details || ''));
    setFormSeoTitle(product.seoTitle || '');
    setFormSeoDescription(product.seoDescription || '');
    setFormSeoKeywords(product.seoKeywords || '');
    setFormPublishStatus(product.publishStatus || 'Published');
    setFormSection('basic');
    setIsFormOpen(true);
  };

  // Save Product (Create or Update)
  const handleSaveProduct = (targetPublishStatus?: 'Published' | 'Draft' | 'Unpublished') => {
    if (!formName.trim()) {
      alert('Please enter a product title.');
      return;
    }

    const calculatedDiscount = Math.max(0, Math.round(((formOriginalPrice - formPrice) / formOriginalPrice) * 100));
    const statusPublish = targetPublishStatus || formPublishStatus;

    const productPayload: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      name: formName,
      slug: formName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      subtitle: formSubtitle || 'Pure Himalayan Harvest',
      category: formCategory,
      categoryName: formCategoryName,
      price: formPrice,
      originalPrice: formOriginalPrice,
      discountPercent: calculatedDiscount,
      rating: editingProduct ? editingProduct.rating : 4.9,
      reviewsCount: editingProduct ? editingProduct.reviewsCount : 12,
      altitude: formAltitude,
      origin: formOrigin,
      netQuantity: formNetQuantity,
      sku: formSku,
      images: formImages.length > 0 ? formImages : ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80'],
      videos: formVideos,
      variants: formVariants,
      inStock: formStock > 0,
      stockQuantity: formStock,
      reservedQuantity: editingProduct?.reservedQuantity || 0,
      availableQuantity: Math.max(0, formStock - (editingProduct?.reservedQuantity || 0)),
      lowStockThreshold: formLowStockThreshold,
      status: formStock > formLowStockThreshold ? 'In Stock' : formStock > 0 ? 'Low Stock' : 'Out of Stock',
      description: formDescription,
      benefits: formBenefits,
      ingredients: formIngredients,
      howToUse: formHowToUse,
      shippingInfo: {
        weight: formWeight,
        deliveryDays: formDeliveryDays,
        details: formShippingDetails
      },
      seoTitle: formSeoTitle || `${formName} | The Pahadi Sher`,
      seoDescription: formSeoDescription || formSubtitle || formDescription.slice(0, 150),
      seoKeywords: formSeoKeywords,
      publishStatus: statusPublish,
      labCertificateNo: formLabCertificateNo || `PAH-2026-${Math.floor(100 + Math.random() * 900)}`,
      featured: editingProduct ? editingProduct.featured : true
    };

    if (editingProduct) {
      updateProduct(productPayload);
    } else {
      addNewProduct(productPayload);
    }

    setIsFormOpen(false);
  };

  // Image Management Helpers
  const handleAddImage = () => {
    if (!formNewImageUrl.trim()) return;
    setFormImages([...formImages, formNewImageUrl.trim()]);
    setFormNewImageUrl('');
  };

  const handleRemoveImage = (index: number) => {
    if (formImages.length <= 1) {
      alert('Product must have at least 1 image.');
      return;
    }
    setFormImages(formImages.filter((_, i) => i !== index));
  };

  const handleSetPrimaryImage = (index: number) => {
    const newImgs = [...formImages];
    const [selected] = newImgs.splice(index, 1);
    newImgs.unshift(selected);
    setFormImages(newImgs);
  };

  const handleMoveImage = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= formImages.length) return;
    const copy = [...formImages];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;
    setFormImages(copy);
  };

  // Video Management Helpers
  const handleAddVideo = () => {
    if (!formNewVideoUrl.trim()) return;
    setFormVideos([...formVideos, formNewVideoUrl.trim()]);
    setFormNewVideoUrl('');
  };

  const handleRemoveVideo = (index: number) => {
    setFormVideos(formVideos.filter((_, i) => i !== index));
  };

  // Variant Management Helpers
  const handleAddVariant = () => {
    const newVariant: ProductVariant = {
      id: `var-${Date.now()}-${Math.floor(Math.random() * 100)}`,
      sku: `${formSku}-VAR-${formVariants.length + 1}`,
      name: `${formNetQuantity} (${formVariants.length + 1})`,
      type: 'Weight',
      value: '50g',
      price: formPrice,
      originalPrice: formOriginalPrice,
      stockQuantity: 20,
      inStock: true,
      image: formImages[0] || ''
    };
    setFormVariants([...formVariants, newVariant]);
  };

  const handleUpdateVariant = (index: number, field: keyof ProductVariant, value: any) => {
    const updated = [...formVariants];
    updated[index] = { ...updated[index], [field]: value };
    if (field === 'price' || field === 'originalPrice') {
      updated[index].inStock = updated[index].stockQuantity > 0;
    }
    setFormVariants(updated);
  };

  const handleRemoveVariant = (index: number) => {
    setFormVariants(formVariants.filter((_, i) => i !== index));
  };

  // Dynamic Array Handlers (Ingredients & Benefits)
  const handleAddIngredient = () => {
    if (!formNewIngredient.trim()) return;
    setFormIngredients([...formIngredients, formNewIngredient.trim()]);
    setFormNewIngredient('');
  };

  const handleAddBenefit = () => {
    if (!formNewBenefit.trim()) return;
    setFormBenefits([...formBenefits, formNewBenefit.trim()]);
    setFormNewBenefit('');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Title & Main Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-pahadi-sand pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-pahadi-brown block">
            Catalog & Storefront Management
          </span>
          <h1 className="font-playfair text-3xl font-bold text-pahadi-green">
            Products Control Center
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              restoreDefaultProducts();
              alert('Default product catalog restored successfully!');
            }}
            className="bg-pahadi-paper hover:bg-pahadi-sand text-pahadi-brown border border-pahadi-border px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all"
            title="Restore all default products to catalog"
          >
            <RefreshCw className="w-4 h-4 text-pahadi-gold" />
            <span>Restore Catalog</span>
          </button>
          <button
            onClick={handleOpenAddModal}
            className="bg-pahadi-green hover:bg-pahadi-green-light text-pahadi-gold px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Quick Summary Analytics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-pahadi-paper p-4 rounded-2xl border border-pahadi-border shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-pahadi-brown block">Total Products</span>
          <span className="font-playfair text-2xl font-bold text-pahadi-green mt-1 block">{totalProducts}</span>
        </div>
        <div className="bg-pahadi-paper p-4 rounded-2xl border border-pahadi-border shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">Published Live</span>
          <span className="font-playfair text-2xl font-bold text-emerald-800 mt-1 block">{publishedCount}</span>
        </div>
        <div className="bg-pahadi-paper p-4 rounded-2xl border border-pahadi-border shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">Drafts</span>
          <span className="font-playfair text-2xl font-bold text-amber-800 mt-1 block">{draftCount}</span>
        </div>
        <div className="bg-pahadi-paper p-4 rounded-2xl border border-pahadi-border shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 block">Low Stock Alert</span>
          <span className="font-playfair text-2xl font-bold text-red-800 mt-1 block">{lowStockCount}</span>
        </div>
        <div className="bg-pahadi-paper p-4 rounded-2xl border border-pahadi-border shadow-xs col-span-2 lg:col-span-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-pahadi-brown block">Inventory Value</span>
          <span className="font-playfair text-2xl font-bold text-pahadi-green mt-1 block">₹{totalStockValue.toLocaleString()}</span>
        </div>
      </div>

      {/* Tabs & Search & Category Filters */}
      <div className="bg-pahadi-paper p-4 rounded-3xl border border-pahadi-border space-y-4 shadow-sm">
        {/* Status Tabs */}
        <div className="flex border-b border-pahadi-sand overflow-x-auto pb-2 space-x-2 scrollbar-none">
          {(['All', 'Published', 'Draft', 'Unpublished', 'Archived'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-pahadi-green text-pahadi-gold shadow-xs'
                  : 'text-pahadi-brown hover:bg-pahadi-sand/50'
              }`}
            >
              {tab} Products ({
                tab === 'All' ? products.length : products.filter(p => (p.publishStatus || 'Published') === tab).length
              })
            </button>
          ))}
        </div>

        {/* Search & Category Select Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 bg-pahadi-sand/40 border border-pahadi-border rounded-xl px-3 py-2 flex-1 w-full">
            <Search className="w-4 h-4 text-pahadi-brown" />
            <input
              type="text"
              placeholder="Search products by title, SKU code, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none text-xs font-semibold text-pahadi-green placeholder-pahadi-brown/60 w-full"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="text-xs text-pahadi-brown font-bold hover:text-pahadi-red">✕</button>
            )}
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <Filter className="w-4 h-4 text-pahadi-brown" />
            <span className="text-xs font-bold text-pahadi-brown">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white border border-pahadi-border rounded-xl px-3 py-2 text-xs font-bold text-pahadi-green outline-none"
            >
              {categoryList.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Data Table */}
      <div className="bg-pahadi-paper rounded-3xl border border-pahadi-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-pahadi-sand/70 text-pahadi-brown uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Product Info</th>
                <th className="p-4">Category & SKU</th>
                <th className="p-4">Pricing (₹)</th>
                <th className="p-4">Variants</th>
                <th className="p-4">Inventory</th>
                <th className="p-4">Publishing</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pahadi-sand">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-pahadi-charcoal-muted">
                    No products found matching your active filter choices.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const pubStatus = p.publishStatus || 'Published';
                  return (
                    <tr key={p.id} className="hover:bg-white/60 transition-colors group">
                      {/* Title & Cover Image */}
                      <td className="p-4 font-bold text-pahadi-green flex items-center space-x-3">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden relative shrink-0 border border-pahadi-sand bg-white shadow-xs">
                          <Image src={p.images[0] || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200'} alt={p.name} fill className="object-cover" />
                          <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[8px] text-center font-mono py-0.5">
                            {p.images.length} img
                          </span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="block font-playfair font-bold text-sm leading-snug text-pahadi-green group-hover:text-pahadi-brown transition-colors">
                            {p.name}
                          </span>
                          <span className="text-[10px] text-pahadi-charcoal-muted font-normal block truncate max-w-xs">
                            {p.subtitle || p.netQuantity}
                          </span>
                          {p.badge && (
                            <span className="inline-block bg-pahadi-gold/20 text-pahadi-green px-2 py-0.5 rounded text-[9px] font-bold uppercase">
                              {p.badge}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Category & SKU */}
                      <td className="p-4">
                        <span className="block font-bold text-pahadi-green">{p.categoryName}</span>
                        <span className="text-[10px] font-mono text-pahadi-brown">{p.sku || 'TPS-DEF-SKU'}</span>
                      </td>

                      {/* Pricing & MRP */}
                      <td className="p-4">
                        <div className="font-bold text-pahadi-green text-sm">₹{p.price}</div>
                        <div className="text-[10px] text-pahadi-charcoal-muted line-through">MRP: ₹{p.originalPrice}</div>
                        <div className="text-[10px] text-pahadi-red font-bold">{p.discountPercent}% OFF</div>
                      </td>

                      {/* Variants Count */}
                      <td className="p-4">
                        {p.variants && p.variants.length > 0 ? (
                          <span className="bg-pahadi-sand text-pahadi-brown px-2.5 py-1 rounded-full text-[10px] font-bold">
                            {p.variants.length} Variants
                          </span>
                        ) : (
                          <span className="text-[10px] text-pahadi-charcoal-muted font-italic">Single Item</span>
                        )}
                      </td>

                      {/* Stock Quantity & Status */}
                      <td className="p-4">
                        <div className="font-bold text-xs text-pahadi-green">{p.stockQuantity} units</div>
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold mt-0.5 ${
                            p.stockQuantity <= 0
                              ? 'bg-red-100 text-red-800'
                              : p.stockQuantity < (p.lowStockThreshold || 10)
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {p.status || (p.stockQuantity > 0 ? 'In Stock' : 'Out of Stock')}
                        </span>
                      </td>

                      {/* Publish Status Toggle */}
                      <td className="p-4">
                        <select
                          value={pubStatus}
                          onChange={(e) => setPublishStatus(p.id, e.target.value as any)}
                          className={`px-2.5 py-1 rounded-xl text-[10px] font-bold border outline-none cursor-pointer ${
                            pubStatus === 'Published'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : pubStatus === 'Draft'
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : pubStatus === 'Unpublished'
                              ? 'bg-orange-50 text-orange-800 border-orange-300'
                              : 'bg-gray-100 text-gray-700 border-gray-300'
                          }`}
                        >
                          <option value="Published">🟢 Published</option>
                          <option value="Draft">🟡 Draft</option>
                          <option value="Unpublished">🟠 Unpublished</option>
                          <option value="Archived">⚪ Archived</option>
                        </select>
                      </td>

                      {/* Row Action Buttons */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          {/* Live Preview Button */}
                          <button
                            onClick={() => {
                              setPreviewProduct(p);
                              setPreviewSelectedImage(0);
                            }}
                            title="Preview Storefront View"
                            className="p-2 rounded-xl bg-pahadi-sand/60 text-pahadi-brown hover:bg-pahadi-green hover:text-white transition-all"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Edit Product Button */}
                          <button
                            onClick={() => handleOpenEditModal(p)}
                            title="Edit Product"
                            className="p-2 rounded-xl bg-pahadi-sand/60 text-pahadi-green hover:bg-pahadi-green hover:text-pahadi-gold transition-all"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {/* Duplicate Product Button */}
                          <button
                            onClick={() => duplicateProduct(p.id)}
                            title="Duplicate Product"
                            className="p-2 rounded-xl bg-pahadi-sand/60 text-blue-700 hover:bg-blue-600 hover:text-white transition-all"
                          >
                            <Copy className="w-4 h-4" />
                          </button>

                          {/* Archive Product Button */}
                          <button
                            onClick={() => archiveProduct(p.id)}
                            title="Archive Product"
                            className="p-2 rounded-xl bg-pahadi-sand/60 text-amber-700 hover:bg-amber-600 hover:text-white transition-all"
                          >
                            <Archive className="w-4 h-4" />
                          </button>

                          {/* Delete Product Button */}
                          <button
                            onClick={() => setDeleteConfirmId(p.id)}
                            title="Delete Product"
                            className="p-2 rounded-xl bg-pahadi-sand/60 text-red-700 hover:bg-red-600 hover:text-white transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULL PRODUCT FORM MODAL (ADD & EDIT WITH TABS & IMAGE REORDER & VARIANTS) */}
      {/* ========================================================================= */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-pahadi-paper rounded-3xl max-w-4xl w-full border-2 border-pahadi-gold/40 shadow-2xl overflow-hidden my-6 space-y-0">
            {/* Modal Header */}
            <div className="bg-pahadi-green text-pahadi-gold p-6 flex justify-between items-center border-b border-pahadi-gold/30">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-pahadi-sand block">Product Management Form</span>
                <h3 className="font-playfair text-2xl font-bold text-white">
                  {editingProduct ? `Edit Product: ${editingProduct.name}` : 'Create New Himalayan Product'}
                </h3>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl font-bold transition-all"
              >
                ✕
              </button>
            </div>

            {/* Form Section Navigation Tabs */}
            <div className="bg-pahadi-sand/50 p-3 border-b border-pahadi-sand flex items-center space-x-2 overflow-x-auto scrollbar-none">
              {[
                { id: 'basic', label: '1. Basic Info', icon: FileText },
                { id: 'pricing', label: '2. Pricing & Stock', icon: DollarSign },
                { id: 'media', label: '3. Images & Videos', icon: ImageIcon },
                { id: 'variants', label: '4. Variants Builder', icon: Layers },
                { id: 'attributes', label: '5. Ingredients & Benefits', icon: Sparkles },
                { id: 'shipping', label: '6. Shipping Info', icon: Truck },
                { id: 'seo', label: '7. SEO Meta', icon: Globe },
              ].map((sec) => {
                const Icon = sec.icon;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => setFormSection(sec.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 whitespace-nowrap transition-all ${
                      formSection === sec.id
                        ? 'bg-pahadi-green text-pahadi-gold shadow-sm'
                        : 'text-pahadi-brown hover:bg-pahadi-sand'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{sec.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Form Body */}
            <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6 text-xs font-sans">
              {/* SECTION 1: BASIC INFO */}
              {formSection === 'basic' && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-bold text-pahadi-green mb-1">Product Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pure Himalayan Shilajit Resin (50g)"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-sm text-pahadi-green font-bold focus:ring-2 focus:ring-pahadi-green outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-pahadi-green mb-1">SKU Code *</label>
                      <input
                        type="text"
                        value={formSku}
                        onChange={(e) => setFormSku(e.target.value)}
                        className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green font-mono uppercase"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-pahadi-green mb-1">Category *</label>
                      <select
                        value={formCategoryName}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormCategoryName(val);
                          const slugCat = val.toLowerCase().replace(/\s+/g, '-') as ProductCategory;
                          setFormCategory(slugCat);
                        }}
                        className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green font-semibold outline-none"
                      >
                        <option value="Shilajit">Shilajit</option>
                        <option value="Honey">Honey</option>
                        <option value="Ghee">Ghee</option>
                        <option value="Herbal Tea">Herbal Tea</option>
                        <option value="Pickles">Pickles</option>
                        <option value="Pahadi Foods">Pahadi Foods</option>
                        <option value="Combos">Combos</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-pahadi-green mb-1">Short Description / Subtitle</label>
                    <input
                      type="text"
                      placeholder="e.g. 100% Pure Himalayan Resin Harvested at 18,000 FT • 85.4% Fulvic Acid"
                      value={formSubtitle}
                      onChange={(e) => setFormSubtitle(e.target.value)}
                      className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-pahadi-green mb-1">Detailed Description</label>
                    <textarea
                      rows={4}
                      placeholder="Enter full product description, traditional extraction story, and purity details..."
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs text-pahadi-green leading-relaxed outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block font-bold text-pahadi-green mb-1">Harvest Altitude</label>
                      <input
                        type="text"
                        placeholder="e.g. 18,000 FT"
                        value={formAltitude}
                        onChange={(e) => setFormAltitude(e.target.value)}
                        className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-pahadi-green mb-1">High Altitude Origin</label>
                      <input
                        type="text"
                        placeholder="e.g. Pithoragarh, Kumaon"
                        value={formOrigin}
                        onChange={(e) => setFormOrigin(e.target.value)}
                        className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-pahadi-green mb-1">Net Weight / Packaging</label>
                      <input
                        type="text"
                        placeholder="e.g. 50g Glass Jar"
                        value={formNetQuantity}
                        onChange={(e) => setFormNetQuantity(e.target.value)}
                        className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-pahadi-green mb-1 flex items-center space-x-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-pahadi-gold shrink-0" />
                        <span>Lab Certificate No.</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. PAH-2026-881"
                        value={formLabCertificateNo}
                        onChange={(e) => setFormLabCertificateNo(e.target.value)}
                        className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green font-mono uppercase"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 2: PRICING & STOCK */}
              {formSection === 'pricing' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold text-pahadi-green mb-1">Selling Price (₹) *</label>
                      <input
                        type="number"
                        required
                        value={formPrice}
                        onChange={(e) => setFormPrice(Number(e.target.value))}
                        className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-base text-pahadi-green font-bold outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-pahadi-green mb-1">MRP / Original Price (₹) *</label>
                      <input
                        type="number"
                        required
                        value={formOriginalPrice}
                        onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                        className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-base text-pahadi-green font-bold outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-pahadi-brown mb-1">Calculated Discount</label>
                      <div className="bg-pahadi-sand/60 p-3 rounded-xl font-bold text-pahadi-red text-base text-center">
                        {Math.max(0, Math.round(((formOriginalPrice - formPrice) / formOriginalPrice) * 100))}% OFF
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block font-bold text-pahadi-green mb-1">Initial Stock Units *</label>
                      <input
                        type="number"
                        required
                        value={formStock}
                        onChange={(e) => setFormStock(Number(e.target.value))}
                        className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-pahadi-green mb-1">Low Stock Warning Threshold</label>
                      <input
                        type="number"
                        value={formLowStockThreshold}
                        onChange={(e) => setFormLowStockThreshold(Number(e.target.value))}
                        className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green font-bold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 3: IMAGES & VIDEOS */}
              {formSection === 'media' && (
                <div className="space-y-6">
                  {/* Images Management */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-pahadi-green text-sm flex items-center space-x-2">
                        <ImageIcon className="w-4 h-4 text-pahadi-gold" />
                        <span>Product Images (Drag & Reorder, Set Primary Cover)</span>
                      </label>
                      <span className="text-[10px] text-pahadi-brown font-bold">Image 1 is Primary Cover</span>
                    </div>

                    {/* Image URL Add Bar */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="url"
                        placeholder="Paste image URL (e.g. Unsplash URL or hosted CDN link)..."
                        value={formNewImageUrl}
                        onChange={(e) => setFormNewImageUrl(e.target.value)}
                        className="flex-1 bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddImage}
                        className="bg-pahadi-green text-pahadi-gold px-4 py-2.5 rounded-xl font-bold uppercase text-xs hover:bg-pahadi-green-light"
                      >
                        + Add Image
                      </button>
                    </div>

                    {/* Image List & Reordering Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-2">
                      {formImages.map((imgUrl, idx) => (
                        <div
                          key={idx}
                          className={`relative rounded-2xl overflow-hidden border-2 bg-white p-1 space-y-1 shadow-sm transition-all ${
                            idx === 0 ? 'border-pahadi-gold ring-2 ring-pahadi-gold/30' : 'border-pahadi-sand'
                          }`}
                        >
                          <div className="aspect-square relative rounded-xl overflow-hidden bg-gray-100">
                            <Image src={imgUrl} alt="" fill className="object-cover" />
                            {idx === 0 && (
                              <span className="absolute top-1 left-1 bg-pahadi-gold text-pahadi-green font-bold text-[9px] px-2 py-0.5 rounded-full shadow-xs">
                                PRIMARY COVER
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between p-1 text-[10px]">
                            <div className="flex items-center space-x-1">
                              {idx > 0 && (
                                <button
                                  type="button"
                                  onClick={() => handleMoveImage(idx, 'up')}
                                  title="Move Left/Up"
                                  className="p-1 bg-pahadi-sand rounded hover:bg-pahadi-green hover:text-white"
                                >
                                  <ArrowUp className="w-3 h-3" />
                                </button>
                              )}
                              {idx < formImages.length - 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleMoveImage(idx, 'down')}
                                  title="Move Right/Down"
                                  className="p-1 bg-pahadi-sand rounded hover:bg-pahadi-green hover:text-white"
                                >
                                  <ArrowDown className="w-3 h-3" />
                                </button>
                              )}
                            </div>

                            {idx !== 0 && (
                              <button
                                type="button"
                                onClick={() => handleSetPrimaryImage(idx)}
                                className="text-pahadi-green font-bold hover:underline"
                              >
                                Set Primary
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              className="text-red-600 font-bold hover:text-red-800"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Videos Management */}
                  <div className="space-y-3 pt-4 border-t border-pahadi-sand">
                    <label className="font-bold text-pahadi-green text-sm flex items-center space-x-2">
                      <Video className="w-4 h-4 text-pahadi-gold" />
                      <span>Product Videos (YouTube / MP4 URLs)</span>
                    </label>

                    <div className="flex items-center space-x-2">
                      <input
                        type="url"
                        placeholder="Paste video URL (e.g. YouTube or MP4 link)..."
                        value={formNewVideoUrl}
                        onChange={(e) => setFormNewVideoUrl(e.target.value)}
                        className="flex-1 bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddVideo}
                        className="bg-pahadi-green text-pahadi-gold px-4 py-2.5 rounded-xl font-bold uppercase text-xs"
                      >
                        + Add Video
                      </button>
                    </div>

                    {formVideos.length > 0 && (
                      <div className="space-y-2 pt-1">
                        {formVideos.map((vid, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-pahadi-sand">
                            <span className="font-mono text-xs text-pahadi-green truncate max-w-md">{vid}</span>
                            <button type="button" onClick={() => handleRemoveVideo(idx)} className="text-red-600 font-bold">Delete</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SECTION 4: UNLIMITED VARIANTS BUILDER */}
              {formSection === 'variants' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-pahadi-green text-sm">Product Variants Builder</h4>
                      <p className="text-[11px] text-pahadi-charcoal-muted">Create unlimited size, weight, pack, or flavor variants for this product.</p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddVariant}
                      className="bg-pahadi-green text-pahadi-gold px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Add Variant</span>
                    </button>
                  </div>

                  {formVariants.length === 0 ? (
                    <div className="bg-white p-8 rounded-2xl border border-pahadi-sand text-center space-y-2">
                      <p className="text-pahadi-charcoal-muted text-xs">No custom variants created yet. This item sells as a single standalone product.</p>
                      <button
                        type="button"
                        onClick={handleAddVariant}
                        className="text-pahadi-green font-bold underline text-xs"
                      >
                        Click here to create your first variant
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {formVariants.map((varItem, idx) => (
                        <div key={varItem.id} className="bg-white p-4 rounded-2xl border border-pahadi-sand space-y-3 shadow-xs">
                          <div className="flex items-center justify-between border-b border-pahadi-sand pb-2">
                            <span className="font-bold text-pahadi-green text-xs">Variant #{idx + 1}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveVariant(idx)}
                              className="text-red-600 font-bold hover:underline text-xs"
                            >
                              Remove Variant
                            </button>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-pahadi-brown">Variant Name</label>
                              <input
                                type="text"
                                value={varItem.name}
                                onChange={(e) => handleUpdateVariant(idx, 'name', e.target.value)}
                                className="w-full bg-pahadi-paper border border-pahadi-border rounded-lg p-2 text-xs font-semibold text-pahadi-green"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-pahadi-brown">Variant Type</label>
                              <select
                                value={varItem.type}
                                onChange={(e) => handleUpdateVariant(idx, 'type', e.target.value)}
                                className="w-full bg-pahadi-paper border border-pahadi-border rounded-lg p-2 text-xs font-semibold text-pahadi-green"
                              >
                                <option value="Weight">Weight</option>
                                <option value="Size">Size</option>
                                <option value="Pack">Pack</option>
                                <option value="Flavor">Flavor</option>
                                <option value="Combo">Combo</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-pahadi-brown">Value (e.g. 50g / 500ml)</label>
                              <input
                                type="text"
                                value={varItem.value}
                                onChange={(e) => handleUpdateVariant(idx, 'value', e.target.value)}
                                className="w-full bg-pahadi-paper border border-pahadi-border rounded-lg p-2 text-xs font-semibold text-pahadi-green"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-pahadi-brown">Variant SKU</label>
                              <input
                                type="text"
                                value={varItem.sku}
                                onChange={(e) => handleUpdateVariant(idx, 'sku', e.target.value)}
                                className="w-full bg-pahadi-paper border border-pahadi-border rounded-lg p-2 text-xs font-mono"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-pahadi-brown">Price (₹)</label>
                              <input
                                type="number"
                                value={varItem.price}
                                onChange={(e) => handleUpdateVariant(idx, 'price', Number(e.target.value))}
                                className="w-full bg-pahadi-paper border border-pahadi-border rounded-lg p-2 text-xs font-bold text-pahadi-green"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-pahadi-brown">MRP (₹)</label>
                              <input
                                type="number"
                                value={varItem.originalPrice}
                                onChange={(e) => handleUpdateVariant(idx, 'originalPrice', Number(e.target.value))}
                                className="w-full bg-pahadi-paper border border-pahadi-border rounded-lg p-2 text-xs font-bold text-pahadi-green"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-pahadi-brown">Stock Quantity</label>
                              <input
                                type="number"
                                value={varItem.stockQuantity}
                                onChange={(e) => handleUpdateVariant(idx, 'stockQuantity', Number(e.target.value))}
                                className="w-full bg-pahadi-paper border border-pahadi-border rounded-lg p-2 text-xs font-bold text-pahadi-green"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SECTION 5: INGREDIENTS & BENEFITS */}
              {formSection === 'attributes' && (
                <div className="space-y-6">
                  {/* Ingredients */}
                  <div className="space-y-2">
                    <label className="font-bold text-pahadi-green text-sm block">Ingredients List</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Add an ingredient (e.g. 100% Pure Himalayan Shilajit)..."
                        value={formNewIngredient}
                        onChange={(e) => setFormNewIngredient(e.target.value)}
                        className="flex-1 bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green outline-none"
                      />
                      <button type="button" onClick={handleAddIngredient} className="bg-pahadi-green text-pahadi-gold px-4 py-2 rounded-xl text-xs font-bold uppercase">+ Add</button>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {formIngredients.map((ing, idx) => (
                        <span key={idx} className="bg-white border border-pahadi-sand text-pahadi-green px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                          <span>{ing}</span>
                          <button type="button" onClick={() => setFormIngredients(formIngredients.filter((_, i) => i !== idx))} className="text-red-500 font-bold ml-1">✕</button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Health & Vitality Benefits */}
                  <div className="space-y-2 pt-4 border-t border-pahadi-sand">
                    <label className="font-bold text-pahadi-green text-sm block">Key Benefits List</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Add a benefit (e.g. Boosts stamina and endurance)..."
                        value={formNewBenefit}
                        onChange={(e) => setFormNewBenefit(e.target.value)}
                        className="flex-1 bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green outline-none"
                      />
                      <button type="button" onClick={handleAddBenefit} className="bg-pahadi-green text-pahadi-gold px-4 py-2 rounded-xl text-xs font-bold uppercase">+ Add</button>
                    </div>
                    <div className="space-y-1 pt-1">
                      {formBenefits.map((ben, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-pahadi-sand text-xs text-pahadi-green font-medium">
                          <span>✓ {ben}</span>
                          <button type="button" onClick={() => setFormBenefits(formBenefits.filter((_, i) => i !== idx))} className="text-red-500 font-bold">Remove</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Usage Instructions */}
                  <div className="pt-4 border-t border-pahadi-sand">
                    <label className="font-bold text-pahadi-green text-sm block mb-1">Recommended Daily Usage Ritual</label>
                    <textarea
                      rows={3}
                      value={formHowToUse}
                      onChange={(e) => setFormHowToUse(e.target.value)}
                      className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs text-pahadi-green leading-relaxed outline-none"
                    />
                  </div>
                </div>
              )}

              {/* SECTION 6: SHIPPING INFO */}
              {formSection === 'shipping' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-pahadi-green mb-1">Shipping Weight</label>
                      <input
                        type="text"
                        value={formWeight}
                        onChange={(e) => setFormWeight(e.target.value)}
                        className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-pahadi-green mb-1">Estimated Delivery Timeline</label>
                      <input
                        type="text"
                        value={formDeliveryDays}
                        onChange={(e) => setFormDeliveryDays(e.target.value)}
                        className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-pahadi-green mb-1">Shipping & Glass Packaging Notes</label>
                    <textarea
                      rows={3}
                      value={formShippingDetails}
                      onChange={(e) => setFormShippingDetails(e.target.value)}
                      className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs text-pahadi-green outline-none"
                    />
                  </div>
                </div>
              )}

              {/* SECTION 7: SEO META */}
              {formSection === 'seo' && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="font-bold text-pahadi-green">SEO Title Tag</label>
                      <span className="text-[10px] text-pahadi-brown font-mono">{formSeoTitle.length}/60 chars</span>
                    </div>
                    <input
                      type="text"
                      maxLength={60}
                      placeholder="e.g. Pure Himalayan Shilajit Resin | 100% NABL Lab Certified"
                      value={formSeoTitle}
                      onChange={(e) => setFormSeoTitle(e.target.value)}
                      className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="font-bold text-pahadi-green">SEO Meta Description</label>
                      <span className="text-[10px] text-pahadi-brown font-mono">{formSeoDescription.length}/160 chars</span>
                    </div>
                    <textarea
                      rows={3}
                      maxLength={160}
                      placeholder="Enter search engine snippet summary..."
                      value={formSeoDescription}
                      onChange={(e) => setFormSeoDescription(e.target.value)}
                      className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs text-pahadi-green"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-pahadi-green mb-1">SEO Keywords (comma separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. Pahadi Sher, Shilajit 18000 ft, Pure Cow Ghee"
                      value={formSeoKeywords}
                      onChange={(e) => setFormSeoKeywords(e.target.value)}
                      className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer / Save & Publishing Action Bar */}
            <div className="bg-pahadi-sand/60 p-4 border-t border-pahadi-sand flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold text-pahadi-brown uppercase">Target Status:</span>
                  <select
                    value={formPublishStatus}
                    onChange={(e) => setFormPublishStatus(e.target.value as any)}
                    className="bg-white border border-pahadi-border rounded-xl px-3 py-1.5 text-xs font-bold text-pahadi-green outline-none"
                  >
                    <option value="Published">🟢 Published Live</option>
                    <option value="Draft">🟡 Draft Mode</option>
                    <option value="Unpublished">🟠 Unpublished</option>
                    <option value="Archived">⚪ Archived</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold text-pahadi-brown uppercase flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3 text-pahadi-gold" />
                    <span>Lab Cert #:</span>
                  </span>
                  <input
                    type="text"
                    placeholder="PAH-2026-881"
                    value={formLabCertificateNo}
                    onChange={(e) => setFormLabCertificateNo(e.target.value)}
                    className="bg-white border border-pahadi-border rounded-xl px-3 py-1 text-xs font-bold text-pahadi-green uppercase font-mono w-36 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2.5 bg-white border border-pahadi-border text-pahadi-brown font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveProduct('Draft')}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs shadow-sm"
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveProduct('Published')}
                  className="px-6 py-2.5 bg-pahadi-green hover:bg-pahadi-green-light text-pahadi-gold font-bold rounded-xl text-xs uppercase tracking-wider shadow-md"
                >
                  Publish Now Live
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* INTERACTIVE STOREFRONT PREVIEW MODAL (FULL CUSTOMER PROSPECTIVE VIEW)    */}
      {/* ========================================================================= */}
      {previewProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-pahadi-offwhite rounded-3xl max-w-5xl w-full border-2 border-pahadi-gold shadow-2xl overflow-hidden my-6 space-y-0 relative">
            {/* Modal Bar */}
            <div className="bg-pahadi-green text-pahadi-gold p-4 px-6 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span className="font-playfair font-bold text-base text-white">Live Storefront Preview Mode</span>
                <span className="bg-pahadi-gold/20 text-pahadi-gold px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase">
                  {previewProduct.publishStatus || 'Published'}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    setPublishStatus(previewProduct.id, 'Published');
                    setPreviewProduct({ ...previewProduct, publishStatus: 'Published' });
                    alert('Product is now Published Live on the storefront!');
                  }}
                  className="bg-pahadi-gold text-pahadi-green px-4 py-1.5 rounded-xl text-xs font-bold uppercase"
                >
                  Publish Now
                </button>
                <button
                  onClick={() => setPreviewProduct(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Preview Body */}
            <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-pahadi-paper p-6 rounded-3xl border border-pahadi-border">
                {/* Left: Gallery */}
                <div className="lg:col-span-6 space-y-3">
                  <div className="aspect-square relative rounded-2xl overflow-hidden border border-pahadi-sand bg-white shadow-xs">
                    <Image
                      src={previewProduct.images[previewSelectedImage] || previewProduct.images[0]}
                      alt={previewProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {previewProduct.images.length > 1 && (
                    <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
                      {previewProduct.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setPreviewSelectedImage(idx)}
                          className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 ${
                            previewSelectedImage === idx ? 'border-pahadi-green scale-105' : 'border-pahadi-sand opacity-70'
                          }`}
                        >
                          <Image src={img} alt="" fill className="object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Meta & Pricing */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="text-xs text-pahadi-brown font-bold uppercase tracking-widest">
                    {previewProduct.categoryName} • {previewProduct.origin}
                  </div>
                  <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-pahadi-green">
                    {previewProduct.name}
                  </h2>
                  <p className="text-xs text-pahadi-charcoal-muted leading-relaxed">
                    {previewProduct.subtitle}
                  </p>

                  <div className="flex items-baseline space-x-3 pt-1">
                    <span className="font-sans text-2xl font-bold text-pahadi-green">₹{previewProduct.price}</span>
                    <span className="line-through text-xs text-pahadi-charcoal-light">₹{previewProduct.originalPrice}</span>
                    <span className="bg-pahadi-red/10 text-pahadi-red px-2.5 py-0.5 rounded text-xs font-bold">
                      {previewProduct.discountPercent}% OFF
                    </span>
                  </div>

                  {previewProduct.variants && previewProduct.variants.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-pahadi-sand">
                      <span className="text-xs font-bold text-pahadi-brown uppercase block">Available Variants:</span>
                      <div className="flex flex-wrap gap-2">
                        {previewProduct.variants.map((v) => (
                          <div key={v.id} className="bg-white border border-pahadi-border px-3 py-1.5 rounded-xl text-xs font-bold text-pahadi-green">
                            {v.name} - ₹{v.price}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-pahadi-sand space-y-2">
                    <h4 className="font-bold text-pahadi-green text-xs">Description</h4>
                    <p className="text-xs text-pahadi-charcoal leading-relaxed">{previewProduct.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Permanent Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 text-center border-2 border-red-500 shadow-2xl">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto" />
            <h3 className="font-playfair text-lg font-bold text-pahadi-green">Delete Product Permanently?</h3>
            <p className="text-xs text-pahadi-charcoal-muted">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex justify-center space-x-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-pahadi-sand text-pahadi-brown rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteProduct(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-5 py-2 bg-red-600 text-white rounded-xl text-xs font-bold"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

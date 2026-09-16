'use client';

import React, { useState } from 'react';
import { 
  Tag, Plus, CheckCircle, XCircle, Percent, Calendar, 
  Trash2, Edit, Copy, Sparkles, Filter, ShieldCheck, ArrowRight, X, Clock, Layers, Package 
} from 'lucide-react';
import { useAdmin, Coupon } from '@/context/AdminContext';
import { CouponDiscountType } from '@/types';

export default function AdminCouponsPage() {
  const { coupons, addCoupon, updateCoupon, deleteCoupon, toggleCouponStatus, products } = useAdmin();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingCouponId, setEditingCouponId] = useState<string | null>(null);

  // Form Fields State
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<CouponDiscountType>('percentage');
  const [discountValue, setDiscountValue] = useState<number>(15);
  const [minOrderAmount, setMinOrderAmount] = useState<number>(999);
  const [maxDiscount, setMaxDiscount] = useState<number | ''>(500);
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [expiryDate, setExpiryDate] = useState<string>('2026-12-31');
  const [usageLimit, setUsageLimit] = useState<number>(500);
  const [perCustomerLimit, setPerCustomerLimit] = useState<number>(2);
  const [description, setDescription] = useState<string>('');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const availableCategories = [
    { slug: 'shilajit', name: 'Shilajit Resin & Supplements' },
    { slug: 'organic-ghee', name: 'Pure Cow Organic Ghee' },
    { slug: 'kashmiri-kesar', name: 'Kashmiri Mongra Saffron' },
    { slug: 'herbal-teas', name: 'Artisanal Himalayan Teas' },
    { slug: 'wild-honey', name: 'Unprocessed Wild Honey' },
    { slug: 'ayurvedic-oils', name: 'Cold-pressed Ayurvedic Seed Oils' }
  ];

  const filteredCoupons = coupons.filter(c => {
    if (filterStatus === 'All') return true;
    return c.status === filterStatus;
  });

  const totalCouponsCount = coupons.length;
  const activeCouponsCount = coupons.filter(c => c.status === 'Active').length;
  const totalRedemptions = coupons.reduce((sum, c) => sum + (c.usageCount || 0), 0);
  const freeShipCouponsCount = coupons.filter(c => c.discountType === 'free_shipping').length;

  const handleOpenCreateModal = () => {
    setEditingCouponId(null);
    setCode('');
    setDiscountType('percentage');
    setDiscountValue(15);
    setMinOrderAmount(999);
    setMaxDiscount(500);
    setStartDate(new Date().toISOString().split('T')[0]);
    setExpiryDate('2026-12-31');
    setUsageLimit(500);
    setPerCustomerLimit(2);
    setDescription('');
    setSelectedProductIds([]);
    setSelectedCategories([]);
    setShowModal(true);
  };

  const handleOpenEditModal = (c: Coupon) => {
    setEditingCouponId(c.id);
    setCode(c.code);
    setDiscountType(c.discountType || 'percentage');
    setDiscountValue(c.discountValue || c.discountPercent || 0);
    setMinOrderAmount(c.minOrderAmount || 0);
    setMaxDiscount(c.maxDiscount !== undefined ? c.maxDiscount : '');
    setStartDate(c.startDate || new Date().toISOString().split('T')[0]);
    setExpiryDate(c.expiryDate || '2026-12-31');
    setUsageLimit(c.usageLimit || 500);
    setPerCustomerLimit(c.perCustomerLimit || 1);
    setDescription(c.description || '');
    setSelectedProductIds(c.applicableProductIds || []);
    setSelectedCategories(c.applicableCategories || []);
    setShowModal(true);
  };

  const handleSubmitCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const couponObj: Coupon = {
      id: editingCouponId || `c-${Date.now()}`,
      code: code.trim().toUpperCase(),
      discountType,
      discountValue: discountType === 'free_shipping' ? 0 : Number(discountValue),
      minOrderAmount: Number(minOrderAmount),
      maxDiscount: maxDiscount !== '' ? Number(maxDiscount) : undefined,
      startDate,
      expiryDate,
      usageCount: editingCouponId ? (coupons.find(c => c.id === editingCouponId)?.usageCount || 0) : 0,
      usageLimit: Number(usageLimit),
      perCustomerLimit: Number(perCustomerLimit),
      applicableProductIds: discountType === 'product_specific' ? selectedProductIds : undefined,
      applicableCategories: discountType === 'category_specific' ? selectedCategories : undefined,
      status: 'Active',
      description: description.trim() || `Promo code ${code.toUpperCase()}`,
      discountPercent: discountType === 'percentage' ? Number(discountValue) : undefined
    };

    if (editingCouponId) {
      updateCoupon(couponObj);
    } else {
      addCoupon(couponObj);
    }

    setShowModal(false);
  };

  const handleCopyCode = (cCode: string) => {
    navigator.clipboard.writeText(cCode);
    setCopiedCode(cCode);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const toggleProductSelect = (pId: string) => {
    setSelectedProductIds(prev => 
      prev.includes(pId) ? prev.filter(id => id !== pId) : [...prev, pId]
    );
  };

  const toggleCategorySelect = (cSlug: string) => {
    setSelectedCategories(prev => 
      prev.includes(cSlug) ? prev.filter(s => s !== cSlug) : [...prev, cSlug]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pahadi-sand pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-pahadi-brown block">Promotions & Discounts</span>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-pahadi-green">Coupons & Promo Codes System</h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleOpenCreateModal}
            className="bg-pahadi-green hover:bg-pahadi-green-light text-pahadi-gold px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Promo Coupon</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-pahadi-paper p-4 rounded-2xl border border-pahadi-border shadow-xs">
          <span className="text-[10px] font-bold uppercase text-pahadi-brown block">Total Coupons</span>
          <span className="font-playfair text-2xl font-bold text-pahadi-green">{totalCouponsCount}</span>
        </div>

        <div className="bg-pahadi-paper p-4 rounded-2xl border border-pahadi-border shadow-xs">
          <span className="text-[10px] font-bold uppercase text-pahadi-brown block">Active Promos</span>
          <span className="font-playfair text-2xl font-bold text-emerald-800">{activeCouponsCount}</span>
        </div>

        <div className="bg-pahadi-paper p-4 rounded-2xl border border-pahadi-border shadow-xs">
          <span className="text-[10px] font-bold uppercase text-pahadi-brown block">Total Redemptions</span>
          <span className="font-playfair text-2xl font-bold text-pahadi-green">{totalRedemptions}</span>
        </div>

        <div className="bg-pahadi-paper p-4 rounded-2xl border border-pahadi-border shadow-xs">
          <span className="text-[10px] font-bold uppercase text-pahadi-brown block">Free Shipping Promos</span>
          <span className="font-playfair text-2xl font-bold text-pahadi-gold">{freeShipCouponsCount}</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-pahadi-sand pb-3 gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-pahadi-gold shrink-0" />
          <span className="text-xs font-bold uppercase text-pahadi-brown mr-1">Filter Status:</span>
          {['All', 'Active', 'Disabled', 'Expired'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                filterStatus === st
                  ? 'bg-pahadi-green text-pahadi-gold shadow-xs'
                  : 'bg-pahadi-paper text-pahadi-charcoal border border-pahadi-sand hover:bg-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Coupons Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoupons.map((c) => {
          const discountLabel = c.discountType === 'percentage' 
            ? `${c.discountValue || c.discountPercent}% OFF`
            : c.discountType === 'flat'
            ? `₹${c.discountValue} FLAT OFF`
            : c.discountType === 'free_shipping'
            ? 'FREE SHIPPING'
            : c.discountType === 'product_specific'
            ? `${c.discountValue}% OFF Product`
            : `${c.discountValue}% OFF Category`;

          return (
            <div
              key={c.id}
              className="bg-pahadi-paper p-6 rounded-3xl border border-pahadi-border space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Code Header & Copy Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-base font-bold text-pahadi-green bg-pahadi-gold/20 px-3 py-1 rounded-xl uppercase border border-pahadi-gold/40 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-pahadi-gold" />
                      <span>{c.code}</span>
                    </span>
                    <button
                      onClick={() => handleCopyCode(c.code)}
                      className="p-1.5 text-pahadi-brown hover:text-pahadi-green hover:bg-pahadi-sand rounded-lg transition-colors"
                      title="Copy Coupon Code"
                    >
                      {copiedCode === c.code ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      c.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : c.status === 'Expired'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}
                  >
                    {c.status}
                  </span>
                </div>

                {/* Discount Title */}
                <div>
                  <p className="font-playfair text-2xl font-bold text-pahadi-green">
                    {discountLabel}
                  </p>
                  {c.maxDiscount && (
                    <span className="text-[10px] text-pahadi-brown font-bold block mt-0.5">
                      Max Discount Cap: ₹{c.maxDiscount}
                    </span>
                  )}
                  <p className="text-xs text-pahadi-charcoal-muted leading-relaxed mt-1">
                    {c.description}
                  </p>
                </div>

                {/* Scoping Tags */}
                {c.discountType === 'product_specific' && c.applicableProductIds && (
                  <div className="bg-white p-2.5 rounded-xl border border-pahadi-sand/60 text-[10px] text-pahadi-green">
                    <strong className="block text-pahadi-brown font-bold mb-0.5">Targeted Products ({c.applicableProductIds.length}):</strong>
                    <span className="line-clamp-1 text-pahadi-charcoal-muted">{c.applicableProductIds.join(', ')}</span>
                  </div>
                )}

                {c.discountType === 'category_specific' && c.applicableCategories && (
                  <div className="bg-white p-2.5 rounded-xl border border-pahadi-sand/60 text-[10px] text-pahadi-green">
                    <strong className="block text-pahadi-brown font-bold mb-0.5">Targeted Categories:</strong>
                    <span className="capitalize font-mono text-pahadi-green">{c.applicableCategories.join(', ')}</span>
                  </div>
                )}
              </div>

              {/* Progress & Expiry Info */}
              <div className="pt-4 border-t border-pahadi-sand space-y-3 text-xs">
                <div className="flex justify-between text-pahadi-brown font-semibold text-[11px]">
                  <span>Min Order: ₹{c.minOrderAmount}</span>
                  <span>Usage: {c.usageCount} / {c.usageLimit}</span>
                </div>

                <div className="w-full bg-pahadi-sand/50 h-2 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${Math.min(100, (c.usageCount / c.usageLimit) * 100)}%` }}
                    className="bg-pahadi-green h-full rounded-full"
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-pahadi-charcoal-muted pt-1">
                  <span>Window: {c.startDate || 'Immediate'} → {c.expiryDate}</span>
                  <span className="font-bold text-pahadi-brown">Per User: {c.perCustomerLimit || 1}x</span>
                </div>

                {/* Actions Toolbar */}
                <div className="flex items-center justify-between pt-2 border-t border-pahadi-sand/40">
                  <button
                    onClick={() => toggleCouponStatus(c.id)}
                    className="text-xs font-bold text-pahadi-green hover:underline flex items-center space-x-1"
                  >
                    {c.status === 'Active' ? <XCircle className="w-3.5 h-3.5 text-rose-600" /> : <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />}
                    <span>{c.status === 'Active' ? 'Disable' : 'Enable'}</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleOpenEditModal(c)}
                      className="p-1.5 text-pahadi-green hover:bg-pahadi-green/10 rounded-lg font-bold text-xs flex items-center space-x-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => deleteCoupon(c.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg font-bold text-xs flex items-center space-x-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Form for Creating / Editing Coupons */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-pahadi-paper border border-pahadi-gold/30 rounded-3xl shadow-pahadi-lg overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="bg-pahadi-green text-pahadi-paper p-5 flex items-center justify-between border-b border-pahadi-gold/20">
              <div className="flex items-center space-x-2">
                <Tag className="w-5 h-5 text-pahadi-gold" />
                <h3 className="font-playfair text-xl font-bold text-pahadi-gold">
                  {editingCouponId ? 'Edit Promo Coupon' : 'Create New Promo Coupon'}
                </h3>
              </div>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-full hover:bg-white/10 text-pahadi-sand">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitCoupon} className="p-6 overflow-y-auto space-y-4 text-xs font-sans">
              
              {/* Code & Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">Coupon Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SHILAJIT20"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs font-mono font-bold tracking-wider focus:ring-1 focus:ring-pahadi-green uppercase"
                  />
                </div>

                <div>
                  <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">Discount Type *</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as CouponDiscountType)}
                    className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs font-bold text-pahadi-green focus:ring-1 focus:ring-pahadi-green"
                  >
                    <option value="percentage">Percentage Discount (% OFF)</option>
                    <option value="flat">Flat Discount (₹ FLAT OFF)</option>
                    <option value="free_shipping">Free Shipping Waiver</option>
                    <option value="product_specific">Product-Specific Discount</option>
                    <option value="category_specific">Category-Specific Discount</option>
                  </select>
                </div>
              </div>

              {/* Discount Value & Max Cap */}
              {discountType !== 'free_shipping' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">
                      {discountType === 'flat' ? 'Flat Amount (₹) *' : 'Discount Percentage (%) *'}
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={discountType === 'flat' ? 10000 : 100}
                      value={discountValue}
                      onChange={(e) => setDiscountValue(Number(e.target.value))}
                      className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs font-bold focus:ring-1 focus:ring-pahadi-green"
                    />
                  </div>

                  {discountType === 'percentage' && (
                    <div>
                      <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">Maximum Discount Cap (₹) (Optional)</label>
                      <input
                        type="number"
                        placeholder="e.g. 500"
                        value={maxDiscount}
                        onChange={(e) => setMaxDiscount(e.target.value ? Number(e.target.value) : '')}
                        className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs focus:ring-1 focus:ring-pahadi-green"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Product Scoping Checklist */}
              {discountType === 'product_specific' && (
                <div className="space-y-2 bg-white p-3 rounded-2xl border border-pahadi-sand">
                  <label className="font-bold text-pahadi-green uppercase text-[10px] block">Select Applicable Products</label>
                  <div className="max-h-36 overflow-y-auto space-y-1.5 text-[11px]">
                    {products.map((prod) => {
                      const isChecked = selectedProductIds.includes(prod.id);
                      return (
                        <label key={prod.id} className="flex items-center space-x-2 cursor-pointer hover:bg-pahadi-paper p-1 rounded-lg">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleProductSelect(prod.id)}
                            className="accent-pahadi-green rounded"
                          />
                          <span className="font-medium text-pahadi-charcoal">{prod.name} (₹{prod.price})</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Category Scoping Checklist */}
              {discountType === 'category_specific' && (
                <div className="space-y-2 bg-white p-3 rounded-2xl border border-pahadi-sand">
                  <label className="font-bold text-pahadi-green uppercase text-[10px] block">Select Applicable Categories</label>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    {availableCategories.map((cat) => {
                      const isChecked = selectedCategories.includes(cat.slug);
                      return (
                        <label key={cat.slug} className="flex items-center space-x-2 cursor-pointer hover:bg-pahadi-paper p-1.5 rounded-lg border border-pahadi-sand/40">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleCategorySelect(cat.slug)}
                            className="accent-pahadi-green rounded"
                          />
                          <span className="font-medium text-pahadi-charcoal">{cat.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Minimum Order Subtotal & Limits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">Min Order (₹) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={minOrderAmount}
                    onChange={(e) => setMinOrderAmount(Number(e.target.value))}
                    className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs focus:ring-1 focus:ring-pahadi-green"
                  />
                </div>

                <div>
                  <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">Global Usage Limit *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={usageLimit}
                    onChange={(e) => setUsageLimit(Number(e.target.value))}
                    className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs focus:ring-1 focus:ring-pahadi-green"
                  />
                </div>

                <div>
                  <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">Per User Limit *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={perCustomerLimit}
                    onChange={(e) => setPerCustomerLimit(Number(e.target.value))}
                    className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs focus:ring-1 focus:ring-pahadi-green"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs focus:ring-1 focus:ring-pahadi-green"
                  />
                </div>

                <div>
                  <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">Expiry Date *</label>
                  <input
                    type="date"
                    required
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs focus:ring-1 focus:ring-pahadi-green"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">Description / Offer Note</label>
                <input
                  type="text"
                  placeholder="e.g. Special festive promo for pure Himalayan Shilajit orders"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs focus:ring-1 focus:ring-pahadi-green"
                />
              </div>

              {/* Submit Actions */}
              <div className="pt-3 border-t border-pahadi-sand flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-3 text-pahadi-charcoal hover:bg-pahadi-sand rounded-xl text-xs font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-pahadi-green text-pahadi-gold hover:bg-pahadi-green-light font-bold text-xs uppercase tracking-wider rounded-xl shadow-pahadi-md flex items-center space-x-2"
                >
                  <Tag className="w-4 h-4 text-pahadi-gold" />
                  <span>{editingCouponId ? 'Update Coupon' : 'Save & Publish Coupon'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}

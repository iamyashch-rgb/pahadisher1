'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Package, Search, Filter, Download, Upload, Plus, Minus, 
  RefreshCw, Edit3, Check, X, AlertTriangle, CheckCircle2, 
  XCircle, History, FileText, SlidersHorizontal, Layers, 
  ArrowUpDown, Ban, ArrowUpRight, ArrowDownRight, CheckSquare, Square
} from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { InventoryStatus, InventoryLogEntry } from '@/types';

interface FlattenedInventoryItem {
  productId: string;
  productName: string;
  variantId?: string;
  variantName?: string;
  sku: string;
  image: string;
  category: string;
  stockQuantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  soldQuantity: number;
  lowStockThreshold: number;
  status: 'In Stock' | 'Low Stock' | 'Critical Stock' | 'Sold Out' | 'Discontinued';
}

export default function AdminInventoryPage() {
  const { products, inventoryLogs, adjustStock, setProductStatus } = useAdmin();

  // Active View Tab
  const [activeTab, setActiveTab] = useState<'inventory' | 'history'>('inventory');

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  // Bulk Selection State
  const [selectedSkus, setSelectedSkus] = useState<string[]>([]);
  const [bulkActionModalOpen, setBulkActionModalOpen] = useState(false);
  const [bulkActionType, setBulkActionType] = useState<'increase' | 'decrease' | 'set' | 'soldout' | 'restore'>('increase');
  const [bulkAmount, setBulkAmount] = useState<number>(10);
  const [bulkReason, setBulkReason] = useState<string>('Bulk Inventory Adjustment');

  // Single Action Modal State
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [targetItem, setTargetItem] = useState<FlattenedInventoryItem | null>(null);
  const [actionType, setActionType] = useState<'increase' | 'decrease' | 'set' | 'soldout' | 'restore'>('increase');
  const [actionAmount, setActionAmount] = useState<number>(5);
  const [actionReason, setActionReason] = useState<string>('Restock from Kumaon Harvest');
  const [customReason, setCustomReason] = useState<string>('');
  const [adminNameInput, setAdminNameInput] = useState<string>('Store Admin');

  // CSV Import Modal State
  const [csvImportModalOpen, setCsvImportModalOpen] = useState(false);
  const [csvRawText, setCsvRawText] = useState('');
  const [csvParsedPreview, setCsvParsedPreview] = useState<{
    sku: string;
    productName: string;
    variantName?: string;
    previousStock: number;
    newStock: number;
    change: number;
    productId: string;
    variantId?: string;
    valid: boolean;
    errorMsg?: string;
  }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // History Log Filters
  const [logSearch, setLogSearch] = useState('');
  const [logReasonFilter, setLogReasonFilter] = useState('ALL');

  // Flatten products and variants into row items
  const inventoryItems = useMemo(() => {
    const items: FlattenedInventoryItem[] = [];

    products.forEach((p) => {
      if (p.variants && p.variants.length > 0) {
        p.variants.forEach((v) => {
          const threshold = v.lowStockThreshold || p.lowStockThreshold || 10;
          const reserved = v.reservedQuantity || 0;
          const available = v.availableQuantity ?? Math.max(0, v.stockQuantity - reserved);
          const sold = v.soldQuantity || 0;

          // Determine highlighted status
          let status: FlattenedInventoryItem['status'] = 'In Stock';
          if (p.isDiscontinued) {
            status = 'Discontinued';
          } else if (available <= 0) {
            status = 'Sold Out';
          } else if (available <= 3) {
            status = 'Critical Stock';
          } else if (available <= threshold) {
            status = 'Low Stock';
          }

          items.push({
            productId: p.id,
            productName: p.name,
            variantId: v.id,
            variantName: v.name,
            sku: v.sku || `TPS-${p.id}`,
            image: v.image || p.images[0],
            category: p.categoryName,
            stockQuantity: v.stockQuantity,
            reservedQuantity: reserved,
            availableQuantity: available,
            soldQuantity: sold,
            lowStockThreshold: threshold,
            status
          });
        });
      } else {
        const threshold = p.lowStockThreshold || 10;
        const reserved = p.reservedQuantity || 0;
        const available = p.availableQuantity ?? Math.max(0, p.stockQuantity - reserved);
        const sold = p.soldQuantity || 0;

        let status: FlattenedInventoryItem['status'] = 'In Stock';
        if (p.isDiscontinued) {
          status = 'Discontinued';
        } else if (available <= 0) {
          status = 'Sold Out';
        } else if (available <= 3) {
          status = 'Critical Stock';
        } else if (available <= threshold) {
          status = 'Low Stock';
        }

        items.push({
          productId: p.id,
          productName: p.name,
          sku: p.sku || `TPS-${p.id}`,
          image: p.images[0],
          category: p.categoryName,
          stockQuantity: p.stockQuantity,
          reservedQuantity: reserved,
          availableQuantity: available,
          soldQuantity: sold,
          lowStockThreshold: threshold,
          status
        });
      }
    });

    return items;
  }, [products]);

  // Analytics KPIs
  const totalSkus = inventoryItems.length;
  const inStockCount = inventoryItems.filter(i => i.status === 'In Stock').length;
  const lowStockCount = inventoryItems.filter(i => i.status === 'Low Stock').length;
  const criticalStockCount = inventoryItems.filter(i => i.status === 'Critical Stock').length;
  const soldOutCount = inventoryItems.filter(i => i.status === 'Sold Out').length;
  const reservedTotal = inventoryItems.reduce((acc, i) => acc + i.reservedQuantity, 0);

  // Filtered inventory rows
  const filteredInventory = useMemo(() => {
    return inventoryItems.filter((item) => {
      // Status Filter
      if (statusFilter !== 'ALL') {
        if (statusFilter === 'RESERVED' && item.reservedQuantity <= 0) return false;
        if (statusFilter !== 'RESERVED' && item.status !== statusFilter) return false;
      }

      // Category Filter
      if (categoryFilter !== 'ALL' && item.category.toLowerCase() !== categoryFilter.toLowerCase()) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.productName.toLowerCase().includes(q);
        const matchesSku = item.sku.toLowerCase().includes(q);
        const matchesVariant = item.variantName ? item.variantName.toLowerCase().includes(q) : false;
        const matchesCat = item.category.toLowerCase().includes(q);
        if (!matchesName && !matchesSku && !matchesVariant && !matchesCat) return false;
      }

      return true;
    });
  }, [inventoryItems, statusFilter, categoryFilter, searchQuery]);

  // Checkbox selection handlers
  const isAllSelected = filteredInventory.length > 0 && filteredInventory.every(i => selectedSkus.includes(i.sku));

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedSkus([]);
    } else {
      setSelectedSkus(filteredInventory.map(i => i.sku));
    }
  };

  const handleToggleSelectRow = (sku: string) => {
    if (selectedSkus.includes(sku)) {
      setSelectedSkus(selectedSkus.filter(s => s !== sku));
    } else {
      setSelectedSkus([...selectedSkus, sku]);
    }
  };

  // Open single action modal
  const handleOpenActionModal = (
    item: FlattenedInventoryItem,
    type: 'increase' | 'decrease' | 'set' | 'soldout' | 'restore'
  ) => {
    setTargetItem(item);
    setActionType(type);
    if (type === 'increase') setActionAmount(10);
    else if (type === 'decrease') setActionAmount(5);
    else if (type === 'set') setActionAmount(item.stockQuantity);
    else if (type === 'soldout') setActionAmount(0);
    else if (type === 'restore') setActionAmount(50);

    setActionReason(
      type === 'increase' ? 'Restock from Kumaon Harvest' :
      type === 'decrease' ? 'Stock Written Off / Damaged' :
      type === 'soldout' ? 'Marked Sold Out by Admin' :
      type === 'restore' ? 'Stock Restored by Admin' :
      'Manual Stock Audit Adjustment'
    );
    setActionModalOpen(true);
  };

  // Submit single action stock change
  const handleSubmitSingleAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetItem) return;

    let targetNewStock = targetItem.stockQuantity;
    if (actionType === 'increase') targetNewStock = targetItem.stockQuantity + actionAmount;
    else if (actionType === 'decrease') targetNewStock = Math.max(0, targetItem.stockQuantity - actionAmount);
    else if (actionType === 'set') targetNewStock = Math.max(0, actionAmount);
    else if (actionType === 'soldout') targetNewStock = targetItem.reservedQuantity; // Available = 0
    else if (actionType === 'restore') targetNewStock = Math.max(50, targetItem.reservedQuantity + 50);

    const finalReason = actionReason === 'Other (Custom)' ? (customReason.trim() || 'Manual Admin Edit') : actionReason;

    adjustStock(
      targetItem.productId,
      targetItem.variantId,
      targetNewStock,
      finalReason,
      adminNameInput.trim() || 'Store Admin'
    );

    setActionModalOpen(false);
  };

  // Submit bulk action
  const handleExecuteBulkAction = () => {
    if (selectedSkus.length === 0) return;

    const selectedItems = inventoryItems.filter(i => selectedSkus.includes(i.sku));

    selectedItems.forEach((item) => {
      let targetNewStock = item.stockQuantity;
      if (bulkActionType === 'increase') targetNewStock = item.stockQuantity + bulkAmount;
      else if (bulkActionType === 'decrease') targetNewStock = Math.max(0, item.stockQuantity - bulkAmount);
      else if (bulkActionType === 'set') targetNewStock = Math.max(0, bulkAmount);
      else if (bulkActionType === 'soldout') targetNewStock = item.reservedQuantity;
      else if (bulkActionType === 'restore') targetNewStock = Math.max(50, item.reservedQuantity + 50);

      adjustStock(
        item.productId,
        item.variantId,
        targetNewStock,
        `[Bulk Action] ${bulkReason}`,
        adminNameInput.trim() || 'Store Admin'
      );
    });

    setBulkActionModalOpen(false);
    setSelectedSkus([]);
    alert(`Bulk inventory update successfully applied to ${selectedItems.length} items.`);
  };

  // Export CSV Handler
  const handleExportCsv = () => {
    const headers = ['SKU', 'Product Name', 'Variant', 'Category', 'Current Stock', 'Reserved', 'Available', 'Sold', 'Low Threshold', 'Status'];
    const rows = filteredInventory.map(i => [
      `"${i.sku}"`,
      `"${i.productName.replace(/"/g, '""')}"`,
      `"${(i.variantName || 'N/A').replace(/"/g, '""')}"`,
      `"${i.category}"`,
      i.stockQuantity,
      i.reservedQuantity,
      i.availableQuantity,
      i.soldQuantity,
      i.lowStockThreshold,
      `"${i.status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `inventory_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // CSV File Upload or Raw Parse Handler
  const handleParseCsv = (text: string) => {
    setCsvRawText(text);
    const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length <= 1) {
      setCsvParsedPreview([]);
      return;
    }

    const preview: typeof csvParsedPreview = [];

    // Parse header and rows
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',').map(p => p.trim().replace(/^"|"$/g, ''));
      if (parts.length < 2) continue;

      const sku = parts[0];
      const newStockVal = parseInt(parts[parts.length - 1] || parts[4] || '0', 10);

      const matchedItem = inventoryItems.find(inv => inv.sku.toLowerCase() === sku.toLowerCase());

      if (matchedItem) {
        preview.push({
          sku: matchedItem.sku,
          productName: matchedItem.productName,
          variantName: matchedItem.variantName,
          previousStock: matchedItem.stockQuantity,
          newStock: isNaN(newStockVal) ? matchedItem.stockQuantity : newStockVal,
          change: (isNaN(newStockVal) ? matchedItem.stockQuantity : newStockVal) - matchedItem.stockQuantity,
          productId: matchedItem.productId,
          variantId: matchedItem.variantId,
          valid: true
        });
      } else {
        preview.push({
          sku,
          productName: parts[1] || 'Unknown Product',
          previousStock: 0,
          newStock: isNaN(newStockVal) ? 0 : newStockVal,
          change: 0,
          productId: '',
          valid: false,
          errorMsg: 'SKU not found in catalog'
        });
      }
    }

    setCsvParsedPreview(preview);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (content) handleParseCsv(content);
    };
    reader.readAsText(file);
  };

  const handleApplyCsvImport = () => {
    const validItems = csvParsedPreview.filter(p => p.valid);
    if (validItems.length === 0) {
      alert('No valid SKU entries found to update.');
      return;
    }

    validItems.forEach((item) => {
      adjustStock(
        item.productId,
        item.variantId,
        item.newStock,
        'CSV Import Audit Update',
        adminNameInput.trim() || 'Store Admin'
      );
    });

    setCsvImportModalOpen(false);
    setCsvParsedPreview([]);
    setCsvRawText('');
    alert(`CSV Import successful! Applied updates to ${validItems.length} SKUs.`);
  };

  // Filtered Audit Logs
  const filteredLogs = useMemo(() => {
    return inventoryLogs.filter((log) => {
      if (logReasonFilter !== 'ALL' && !log.reason.toLowerCase().includes(logReasonFilter.toLowerCase())) {
        return false;
      }
      if (logSearch.trim()) {
        const q = logSearch.toLowerCase();
        const matchesSku = log.sku.toLowerCase().includes(q);
        const matchesProd = log.productName.toLowerCase().includes(q);
        const matchesAdmin = log.admin.toLowerCase().includes(q);
        if (!matchesSku && !matchesProd && !matchesAdmin) return false;
      }
      return true;
    });
  }, [inventoryLogs, logReasonFilter, logSearch]);

  return (
    <div className="space-y-6 font-sans pb-16 text-gray-900 bg-gray-50/50 min-h-screen p-2 sm:p-6 rounded-3xl">
      {/* ========================================================================= */}
      {/* 1. MINIMAL DASHBOARD HEADER & QUICK CONTROLS                             */}
      {/* ========================================================================= */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 block">
            Storefront Inventory & Stock Control
          </span>
          <h1 className="text-2xl font-bold text-gray-900 font-sans tracking-tight">
            Inventory Management Dashboard
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* CSV Export */}
          <button
            onClick={handleExportCsv}
            className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium rounded-xl text-xs flex items-center space-x-1.5 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-gray-600" />
            <span>Export CSV</span>
          </button>

          {/* CSV Import */}
          <button
            onClick={() => {
              setCsvImportModalOpen(true);
              setCsvParsedPreview([]);
              setCsvRawText('');
            }}
            className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium rounded-xl text-xs flex items-center space-x-1.5 transition-colors shadow-2xs"
          >
            <Upload className="w-3.5 h-3.5 text-gray-600" />
            <span>Import CSV</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. STATS OVERVIEW CARDS (COLOR USED ONLY FOR STATUS HIGHLIGHTS)          */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
          <span className="text-[10px] font-mono uppercase text-gray-500 font-bold block">Total SKUs</span>
          <span className="text-xl font-bold text-gray-900 font-mono mt-1 block">{totalSkus}</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-gray-500 font-bold">In Stock</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <span className="text-xl font-bold text-gray-900 font-mono mt-1 block">{inStockCount}</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-300 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-amber-800 font-bold">Low Stock</span>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          </div>
          <span className="text-xl font-bold text-amber-900 font-mono mt-1 block">{lowStockCount}</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-orange-300 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-orange-800 font-bold">Critical Stock</span>
            <span className="w-2 h-2 rounded-full bg-orange-600"></span>
          </div>
          <span className="text-xl font-bold text-orange-950 font-mono mt-1 block">{criticalStockCount}</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-red-300 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-red-800 font-bold">Sold Out</span>
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
          </div>
          <span className="text-xl font-bold text-red-950 font-mono mt-1 block">{soldOutCount}</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-blue-700 font-bold">Reserved</span>
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          </div>
          <span className="text-xl font-bold text-blue-900 font-mono mt-1 block">{reservedTotal}</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. VIEW TAB SWITCHER (LIVE STOCK VS AUDIT LOG HISTORY)                   */}
      {/* ========================================================================= */}
      <div className="flex border-b border-gray-200 space-x-6">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center space-x-2 ${
            activeTab === 'inventory'
              ? 'border-gray-900 text-gray-900 font-extrabold'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Live Inventory Table ({totalSkus})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center space-x-2 ${
            activeTab === 'history'
              ? 'border-gray-900 text-gray-900 font-extrabold'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Inventory History & Audit Logs ({inventoryLogs.length})</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: LIVE INVENTORY TABLE & CONTROLS                                   */}
      {/* ========================================================================= */}
      {activeTab === 'inventory' ? (
        <div className="space-y-4">
          {/* SEARCH AND STATUS FILTER BAR */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Status Filters */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'ALL', label: 'All Items' },
                { id: 'In Stock', label: 'In Stock' },
                { id: 'Low Stock', label: 'Low Stock' },
                { id: 'Critical Stock', label: 'Critical Stock' },
                { id: 'Sold Out', label: 'Sold Out' },
                { id: 'RESERVED', label: 'Reserved' },
                { id: 'Discontinued', label: 'Discontinued' }
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setStatusFilter(st.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    statusFilter === st.id
                      ? 'bg-gray-900 text-white font-bold shadow-2xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            {/* Category Select & Search Input */}
            <div className="flex items-center space-x-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs font-medium text-gray-800 outline-none"
              >
                <option value="ALL">All Categories</option>
                <option value="Shilajit">Shilajit</option>
                <option value="Honey">Honey</option>
                <option value="Ghee">Ghee</option>
                <option value="Herbal Tea">Herbal Tea</option>
                <option value="Pickles">Pickles</option>
                <option value="Combos">Combos</option>
              </select>

              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search Product, SKU, Variant..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-800 outline-none focus:border-gray-900"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>
          </div>

          {/* STICKY BULK ACTION BAR (WHEN ITEMS ARE CHECKED) */}
          {selectedSkus.length > 0 && (
            <div className="bg-gray-900 text-white p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg border border-gray-800">
              <div className="flex items-center space-x-2 text-xs">
                <CheckSquare className="w-4 h-4 text-emerald-400" />
                <span className="font-bold">{selectedSkus.length} Items Selected</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    setBulkActionType('increase');
                    setBulkAmount(10);
                    setBulkActionModalOpen(true);
                  }}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold"
                >
                  + Bulk Increase
                </button>
                <button
                  onClick={() => {
                    setBulkActionType('decrease');
                    setBulkAmount(5);
                    setBulkActionModalOpen(true);
                  }}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold"
                >
                  - Bulk Decrease
                </button>
                <button
                  onClick={() => {
                    setBulkActionType('set');
                    setBulkAmount(50);
                    setBulkActionModalOpen(true);
                  }}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold"
                >
                  = Bulk Set Stock
                </button>
                <button
                  onClick={() => {
                    setBulkActionType('soldout');
                    setBulkActionModalOpen(true);
                  }}
                  className="bg-red-900/80 hover:bg-red-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold"
                >
                  Mark Sold Out
                </button>
                <button
                  onClick={() => {
                    setBulkActionType('restore');
                    setBulkActionModalOpen(true);
                  }}
                  className="bg-emerald-800 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold"
                >
                  Restore Stock
                </button>
                <button
                  onClick={() => setSelectedSkus([])}
                  className="text-gray-400 hover:text-white text-xs underline font-medium ml-2"
                >
                  Deselect All
                </button>
              </div>
            </div>
          )}

          {/* MAIN INVENTORY MASTER TABLE */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans text-gray-800 border-collapse">
                <thead>
                  <tr className="bg-gray-100/80 border-b border-gray-200 text-[10px] uppercase font-mono tracking-wider text-gray-600 font-bold">
                    <th className="py-3.5 px-4 w-10">
                      <button onClick={handleToggleSelectAll} className="flex items-center text-gray-600 hover:text-gray-900">
                        {isAllSelected ? <CheckSquare className="w-4 h-4 text-gray-900" /> : <Square className="w-4 h-4 text-gray-400" />}
                      </button>
                    </th>
                    <th className="py-3.5 px-4">SKU</th>
                    <th className="py-3.5 px-4">Product</th>
                    <th className="py-3.5 px-4">Variant</th>
                    <th className="py-3.5 px-4 text-center">Current Stock</th>
                    <th className="py-3.5 px-4 text-center">Reserved</th>
                    <th className="py-3.5 px-4 text-center">Available</th>
                    <th className="py-3.5 px-4 text-center">Sold</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Stock Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredInventory.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="py-12 text-center text-gray-500 text-xs">
                        No inventory records match your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredInventory.map((item) => {
                      const isChecked = selectedSkus.includes(item.sku);
                      return (
                        <tr
                          key={`${item.productId}-${item.variantId || 'base'}`}
                          className={`hover:bg-gray-50/80 transition-colors ${isChecked ? 'bg-gray-50' : ''}`}
                        >
                          {/* Checkbox */}
                          <td className="py-3.5 px-4">
                            <button onClick={() => handleToggleSelectRow(item.sku)}>
                              {isChecked ? <CheckSquare className="w-4 h-4 text-gray-900" /> : <Square className="w-4 h-4 text-gray-300" />}
                            </button>
                          </td>

                          {/* SKU */}
                          <td className="py-3.5 px-4 font-mono font-bold text-gray-900 text-[11px]">
                            {item.sku}
                          </td>

                          {/* Product */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-9 h-9 rounded-lg overflow-hidden relative shrink-0 border border-gray-200 bg-white">
                                <Image src={item.image} alt="" fill className="object-cover" />
                              </div>
                              <div>
                                <span className="font-bold text-gray-900 text-xs block">{item.productName}</span>
                                <span className="text-[10px] text-gray-500">{item.category}</span>
                              </div>
                            </div>
                          </td>

                          {/* Variant */}
                          <td className="py-3.5 px-4 text-xs font-medium text-gray-700">
                            {item.variantName ? (
                              <span className="bg-gray-100 px-2 py-0.5 rounded border border-gray-200 font-mono text-[11px]">
                                {item.variantName}
                              </span>
                            ) : (
                              <span className="text-gray-400 font-italic text-[11px]">Standard</span>
                            )}
                          </td>

                          {/* Current Physical Stock */}
                          <td className="py-3.5 px-4 text-center font-mono font-bold text-xs text-gray-900">
                            {item.stockQuantity}
                          </td>

                          {/* Reserved Stock */}
                          <td className="py-3.5 px-4 text-center font-mono text-xs">
                            {item.reservedQuantity > 0 ? (
                              <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold border border-blue-200">
                                +{item.reservedQuantity}
                              </span>
                            ) : (
                              <span className="text-gray-400">0</span>
                            )}
                          </td>

                          {/* Available Stock */}
                          <td className="py-3.5 px-4 text-center font-mono font-bold text-xs">
                            <span className={item.availableQuantity <= 3 ? 'text-orange-950 font-extrabold' : 'text-gray-900'}>
                              {item.availableQuantity}
                            </span>
                          </td>

                          {/* Sold Count */}
                          <td className="py-3.5 px-4 text-center font-mono text-xs text-gray-600">
                            {item.soldQuantity}
                          </td>

                          {/* Status Highlight Badge (ONLY STATUS USES COLOR) */}
                          <td className="py-3.5 px-4">
                            {item.status === 'In Stock' && (
                              <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                                ✓ In Stock
                              </span>
                            )}
                            {item.status === 'Low Stock' && (
                              <span className="bg-amber-50 text-amber-900 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-300">
                                ⚠️ Low Stock ({item.availableQuantity})
                              </span>
                            )}
                            {item.status === 'Critical Stock' && (
                              <span className="bg-orange-100 text-orange-950 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-orange-300">
                                🔥 Critical ({item.availableQuantity})
                              </span>
                            )}
                            {item.status === 'Sold Out' && (
                              <span className="bg-red-50 text-red-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-red-200">
                                ✕ Sold Out
                              </span>
                            )}
                            {item.status === 'Discontinued' && (
                              <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-gray-200">
                                Discontinued
                              </span>
                            )}
                          </td>

                          {/* Admin Stock Action Controls */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end space-x-1">
                              {/* Quick Increase (+10) */}
                              <button
                                onClick={() => handleOpenActionModal(item, 'increase')}
                                title="Increase Stock"
                                className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-bold transition-colors"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>

                              {/* Quick Decrease (-5) */}
                              <button
                                onClick={() => handleOpenActionModal(item, 'decrease')}
                                title="Decrease Stock"
                                className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-bold transition-colors"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>

                              {/* Set Exact Stock */}
                              <button
                                onClick={() => handleOpenActionModal(item, 'set')}
                                title="Set Exact Stock"
                                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-mono text-[11px] font-bold rounded-lg transition-colors"
                              >
                                Set
                              </button>

                              {/* Mark Sold Out / Restore Quick Toggle */}
                              {item.status === 'Sold Out' ? (
                                <button
                                  onClick={() => handleOpenActionModal(item, 'restore')}
                                  title="Restore Stock"
                                  className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-lg border border-emerald-200"
                                >
                                  Restore
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleOpenActionModal(item, 'soldout')}
                                  title="Mark Sold Out"
                                  className="px-2 py-1 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-700 font-bold text-[10px] rounded-lg border border-gray-200"
                                >
                                  Sold Out
                                </button>
                              )}
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
        </div>
      ) : (
        /* ========================================================================= */
        /* TAB 2: INVENTORY HISTORY & AUDIT LOGS                                     */
        /* ========================================================================= */
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Inventory Audit Log History</h3>
              <p className="text-xs text-gray-500">Immutable ledger of automated sales deductions, restocks, and manual admin adjustments.</p>
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={logReasonFilter}
                onChange={(e) => setLogReasonFilter(e.target.value)}
                className="bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs font-medium text-gray-800 outline-none"
              >
                <option value="ALL">All Event Reasons</option>
                <option value="Restock">Restock Events</option>
                <option value="Order">Customer Orders</option>
                <option value="Audit">Physical Audits</option>
                <option value="Damaged">Damaged / Expired</option>
                <option value="Bulk">Bulk Adjustments</option>
                <option value="CSV">CSV Imports</option>
              </select>

              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Search logs by SKU or item..."
                  value={logSearch}
                  onChange={(e) => setLogSearch(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-800 outline-none"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans text-gray-800 border-collapse">
              <thead>
                <tr className="bg-gray-100/80 border-b border-gray-200 text-[10px] uppercase font-mono tracking-wider text-gray-600 font-bold">
                  <th className="py-3.5 px-4">Date & Time</th>
                  <th className="py-3.5 px-4">SKU</th>
                  <th className="py-3.5 px-4">Product & Variant</th>
                  <th className="py-3.5 px-4 text-center">Previous ➔ New</th>
                  <th className="py-3.5 px-4 text-center">Adjustment</th>
                  <th className="py-3.5 px-4">Reason / Event</th>
                  <th className="py-3.5 px-4">Operator / Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-500 text-xs">
                      No audit history log records match your filter.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3.5 px-4 text-gray-500 font-mono text-[11px] whitespace-nowrap">
                        {log.date}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-gray-900 text-[11px]">
                        {log.sku}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-gray-900 block">{log.productName}</span>
                        {log.variantName && (
                          <span className="text-[10px] text-gray-500 font-medium">{log.variantName}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono">
                        <span className="text-gray-500">{log.previousStock}</span> ➔ <strong className="text-gray-900">{log.newStock}</strong>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-bold">
                        {log.adjustment > 0 ? (
                          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                            +{log.adjustment}
                          </span>
                        ) : (
                          <span className="text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200 text-[11px]">
                            {log.adjustment}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-xs font-medium text-gray-800">
                        {log.reason}
                      </td>
                      <td className="py-3.5 px-4 text-xs font-mono text-gray-600">
                        {log.admin}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MODAL: SINGLE ITEM STOCK ADJUSTMENT WITH REASON INPUT                 */}
      {/* ========================================================================= */}
      {actionModalOpen && targetItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 border border-gray-300 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-gray-500 font-bold block">Action Mode: {actionType.toUpperCase()}</span>
                <h3 className="font-bold text-gray-900 text-lg">Adjust Item Inventory</h3>
              </div>
              <button onClick={() => setActionModalOpen(false)} className="text-gray-400 hover:text-gray-800 text-lg font-bold">✕</button>
            </div>

            <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs space-y-1">
              <span className="font-mono font-bold text-gray-900">{targetItem.sku}</span>
              <p className="font-bold text-gray-900 text-sm">{targetItem.productName}</p>
              {targetItem.variantName && <p className="text-gray-600">Variant: {targetItem.variantName}</p>}
              <p className="text-gray-500 pt-1">Current Physical Stock: <strong>{targetItem.stockQuantity} units</strong></p>
            </div>

            <form onSubmit={handleSubmitSingleAction} className="space-y-4 text-xs">
              {actionType !== 'soldout' && actionType !== 'restore' && (
                <div>
                  <label className="font-bold text-gray-700 uppercase text-[10px] block mb-1">
                    {actionType === 'increase' ? 'Units to Add (+)' : actionType === 'decrease' ? 'Units to Deduct (-)' : 'New Physical Stock Value (=)'}
                  </label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={actionAmount}
                    onChange={(e) => setActionAmount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-white border border-gray-300 rounded-xl p-3 text-base font-mono font-bold text-gray-900 outline-none focus:border-gray-900"
                  />
                </div>
              )}

              <div>
                <label className="font-bold text-gray-700 uppercase text-[10px] block mb-1">Stock Adjustment Reason (Mandatory Audit Log) *</label>
                <select
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl p-3 text-xs font-medium text-gray-900 outline-none"
                >
                  <option value="Restock from Kumaon Harvest">Restock from Kumaon Harvest</option>
                  <option value="Physical Audit Count Adjustment">Physical Audit Count Adjustment</option>
                  <option value="Stock Written Off / Damaged">Stock Written Off / Damaged</option>
                  <option value="Marked Sold Out by Admin">Marked Sold Out by Admin</option>
                  <option value="Stock Restored by Admin">Stock Restored by Admin</option>
                  <option value="Customer Return Restock">Customer Return Restock</option>
                  <option value="Other (Custom)">Other (Custom Reason)</option>
                </select>
              </div>

              {actionReason === 'Other (Custom)' && (
                <div>
                  <label className="font-bold text-gray-700 uppercase text-[10px] block mb-1">Specify Reason Details *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter custom audit log reason..."
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-xl p-3 text-xs outline-none"
                  />
                </div>
              )}

              <div>
                <label className="font-bold text-gray-700 uppercase text-[10px] block mb-1">Operator / Admin Name</label>
                <input
                  type="text"
                  required
                  value={adminNameInput}
                  onChange={(e) => setAdminNameInput(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl p-3 text-xs font-medium text-gray-900 outline-none"
                />
              </div>

              <div className="pt-2 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setActionModalOpen(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gray-900 hover:bg-black text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm"
                >
                  Save Stock Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MODAL: BULK INVENTORY ACTION WITH REASON                               */}
      {/* ========================================================================= */}
      {bulkActionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border border-gray-300 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-gray-500 font-bold block">Bulk Inventory Update</span>
                <h3 className="font-bold text-gray-900 text-lg">{selectedSkus.length} Items Selected</h3>
              </div>
              <button onClick={() => setBulkActionModalOpen(false)} className="text-gray-400 hover:text-gray-800 text-lg font-bold">✕</button>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div>
                <label className="font-bold text-gray-700 uppercase text-[10px] block mb-1">Bulk Action Type</label>
                <select
                  value={bulkActionType}
                  onChange={(e) => setBulkActionType(e.target.value as any)}
                  className="w-full bg-white border border-gray-300 rounded-xl p-3 text-xs font-bold text-gray-900 outline-none"
                >
                  <option value="increase">Increase Stock by +X Units</option>
                  <option value="decrease">Decrease Stock by -X Units</option>
                  <option value="set">Set Exact Stock to X Units</option>
                  <option value="soldout">Mark All Selected Sold Out</option>
                  <option value="restore">Restore All Selected Stock (50 Units)</option>
                </select>
              </div>

              {bulkActionType !== 'soldout' && bulkActionType !== 'restore' && (
                <div>
                  <label className="font-bold text-gray-700 uppercase text-[10px] block mb-1">Unit Value (X)</label>
                  <input
                    type="number"
                    min={0}
                    value={bulkAmount}
                    onChange={(e) => setBulkAmount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-white border border-gray-300 rounded-xl p-3 text-base font-mono font-bold text-gray-900 outline-none"
                  />
                </div>
              )}

              <div>
                <label className="font-bold text-gray-700 uppercase text-[10px] block mb-1">Bulk Audit Log Reason *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mass Restock from Uttarakhand Farmer Cooperatives"
                  value={bulkReason}
                  onChange={(e) => setBulkReason(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl p-3 text-xs outline-none"
                />
              </div>

              <div className="pt-2 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setBulkActionModalOpen(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleExecuteBulkAction}
                  className="flex-1 bg-gray-900 hover:bg-black text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm"
                >
                  Apply Bulk Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. MODAL: CSV IMPORT WITH DIFF PREVIEW                                   */}
      {/* ========================================================================= */}
      {csvImportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 border border-gray-300 shadow-2xl relative my-6">
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-gray-500 font-bold block">CSV Batch Import</span>
                <h3 className="font-bold text-gray-900 text-lg">Bulk Import Stock Quantities</h3>
              </div>
              <button onClick={() => setCsvImportModalOpen(false)} className="text-gray-400 hover:text-gray-800 text-lg font-bold">✕</button>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
                <span className="font-bold text-gray-900 block">Expected CSV Format:</span>
                <code className="block bg-white p-2.5 rounded border border-gray-300 text-[11px] font-mono text-gray-800">
                  SKU,Product Name,Variant,Category,NewStock<br />
                  TPS-SHL-50G,Pure Himalayan Shilajit Resin,50g Glass Jar,Shilajit,65<br />
                  TPS-GHEE-500ML,Pure Cow Desi Ghee,500ml Glass Jar,Ghee,40
                </code>
              </div>

              {/* Upload or Paste */}
              <div className="space-y-2">
                <input
                  type="file"
                  accept=".csv"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-white border-2 border-dashed border-gray-300 hover:border-gray-900 p-6 rounded-xl text-center space-y-1 transition-colors"
                >
                  <Upload className="w-6 h-6 text-gray-500 mx-auto" />
                  <span className="font-bold text-gray-900 block text-xs">Click to upload CSV File</span>
                  <span className="text-[10px] text-gray-500">or paste raw CSV contents below</span>
                </button>

                <textarea
                  rows={4}
                  placeholder="Paste CSV content here..."
                  value={csvRawText}
                  onChange={(e) => handleParseCsv(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl p-3 text-xs font-mono outline-none"
                />
              </div>

              {/* Parsed Diff Preview */}
              {csvParsedPreview.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900 text-xs">Parsed Preview ({csvParsedPreview.filter(p => p.valid).length} Valid Entries)</span>
                  </div>

                  <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-xl">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-gray-100 text-[10px] font-mono uppercase text-gray-600">
                        <tr>
                          <th className="p-2">SKU</th>
                          <th className="p-2">Product</th>
                          <th className="p-2 text-center">Prev ➔ New</th>
                          <th className="p-2 text-center">Change</th>
                          <th className="p-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {csvParsedPreview.map((item, idx) => (
                          <tr key={idx} className={item.valid ? 'hover:bg-gray-50' : 'bg-red-50/50'}>
                            <td className="p-2 font-mono font-bold text-gray-900">{item.sku}</td>
                            <td className="p-2">{item.productName} {item.variantName ? `(${item.variantName})` : ''}</td>
                            <td className="p-2 text-center font-mono">{item.previousStock} ➔ <strong>{item.newStock}</strong></td>
                            <td className="p-2 text-center font-mono font-bold">{item.change > 0 ? `+${item.change}` : item.change}</td>
                            <td className="p-2">
                              {item.valid ? (
                                <span className="text-emerald-700 font-bold text-[10px]">Valid</span>
                              ) : (
                                <span className="text-red-700 font-bold text-[10px]">{item.errorMsg}</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="pt-2 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setCsvImportModalOpen(false)}
                  className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-xl font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyCsvImport}
                  className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm"
                >
                  Apply CSV Import Updates
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

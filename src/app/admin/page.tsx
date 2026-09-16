'use client';

import React from 'react';
import Link from 'next/link';
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  AlertTriangle,
  XCircle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Zap,
  Layers,
  Star
} from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export default function AdminDashboardOverview() {
  const { products, orders, categories, reviews, updateOrderStatus } = useAdmin();

  // Metric Calculations
  const totalSales = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalOrders = orders.length;
  const uniqueCustomersCount = new Set(orders.map((o) => o.email || o.customerName)).size;
  const activeProductsCount = products.filter((p) => p.status !== 'Discontinued').length;
  const lowStockProducts = products.filter((p) => (p.availableQuantity ?? p.stockQuantity) < (p.lowStockThreshold || 30) && (p.availableQuantity ?? p.stockQuantity) > 0);
  const outOfStockProducts = products.filter((p) => (p.availableQuantity ?? p.stockQuantity) === 0 || p.status === 'Out of Stock');
  const netRevenue = Math.round(totalSales * 0.92); // Net revenue after taxes & fulfillment

  const processingOrders = orders.filter((o) => o.status === 'Processing');
  const shippedOrders = orders.filter((o) => o.status === 'Shipped');
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered');
  const cancelledOrders = orders.filter((o) => o.status === 'Cancelled');

  // Chart Data Preparation
  const dailySalesData = [
    { time: '06 AM', sales: 2400 },
    { time: '09 AM', sales: 6800 },
    { time: '12 PM', sales: 12500 },
    { time: '03 PM', sales: 18900 },
    { time: '06 PM', sales: 24300 },
    { time: '09 PM', sales: 15600 },
  ];

  const monthlySalesData = [
    { month: 'Apr', revenue: 124000 },
    { month: 'May', revenue: 168000 },
    { month: 'Jun', revenue: 210000 },
    { month: 'Jul', revenue: 295000 },
    { month: 'Aug', revenue: 380000 },
    { month: 'Sep', revenue: 462000 },
  ];

  const topProductsData = [
    { name: 'Pure Himalayan Shilajit Resin (50g)', sales: 342, revenue: '₹5,12,658', percent: 85 },
    { name: 'Pure Cow Organic Cultured Ghee', sales: 289, revenue: '₹4,33,211', percent: 72 },
    { name: 'Original Kashmiri Mongra Kesar (2g)', sales: 194, revenue: '₹3,09,430', percent: 54 },
    { name: 'Wild Himalayan Multiflora Raw Honey', sales: 156, revenue: '₹1,24,644', percent: 42 },
    { name: 'Handpicked Pahadi Rhododendron Tea', sales: 112, revenue: '₹55,888', percent: 30 },
  ];

  const maxDaily = Math.max(...dailySalesData.map((d) => d.sales));
  const maxMonthly = Math.max(...monthlySalesData.map((m) => m.revenue));

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner / Welcome */}
      <div className="bg-gradient-to-r from-pahadi-green via-[#1f3a27] to-pahadi-green-light rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 border border-pahadi-gold/30">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center space-x-2 bg-pahadi-gold/20 text-pahadi-gold border border-pahadi-gold/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Store Operations Active</span>
          </div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome to The Pahadi Sher Command Center
          </h1>
          <p className="text-xs sm:text-sm text-pahadi-sand/90 max-w-xl font-light">
            Real-time analytics, inventory management, Razorpay payment flow tracking, and automated order fulfillment for your Himalayan artisanal brand.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10">
          <Link
            href="/admin/inventory"
            className="bg-pahadi-gold hover:bg-yellow-400 text-pahadi-green px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center space-x-2"
          >
            <Zap className="w-4 h-4" />
            <span>Adjust Stock</span>
          </Link>
          <Link
            href="/admin/orders"
            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
          >
            Manage Orders ({processingOrders.length} Pending)
          </Link>
        </div>
      </div>

      {/* 7 Required Overview Metrics */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-pahadi-brown mb-4">
          Core Store Performance Indicators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* 1. Total Sales */}
          <div className="bg-pahadi-paper p-5 rounded-2xl border border-pahadi-border space-y-2 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-pahadi-green">
              <span className="text-xs font-bold uppercase text-pahadi-brown">Total Sales</span>
              <div className="p-2 rounded-xl bg-pahadi-gold/20 text-pahadi-green">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="font-playfair text-2xl sm:text-3xl font-bold text-pahadi-green">
              ₹{totalSales.toLocaleString('en-IN')}
            </div>
            <div className="flex items-center text-[11px] font-bold text-emerald-700">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +24.8% vs last month
            </div>
          </div>

          {/* 2. Total Orders */}
          <div className="bg-pahadi-paper p-5 rounded-2xl border border-pahadi-border space-y-2 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-pahadi-green">
              <span className="text-xs font-bold uppercase text-pahadi-brown">Total Orders</span>
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                <ShoppingCart className="w-4 h-4" />
              </div>
            </div>
            <div className="font-playfair text-2xl sm:text-3xl font-bold text-pahadi-green">
              {totalOrders}
            </div>
            <p className="text-[11px] text-pahadi-brown font-semibold">
              {processingOrders.length} Pending Processing
            </p>
          </div>

          {/* 3. Customers */}
          <div className="bg-pahadi-paper p-5 rounded-2xl border border-pahadi-border space-y-2 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-pahadi-green">
              <span className="text-xs font-bold uppercase text-pahadi-brown">Active Customers</span>
              <div className="p-2 rounded-xl bg-blue-100 text-blue-800">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="font-playfair text-2xl sm:text-3xl font-bold text-pahadi-green">
              {uniqueCustomersCount}
            </div>
            <p className="text-[11px] text-blue-700 font-semibold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 88.4% Repeat Purchase Rate
            </p>
          </div>

          {/* 4. Products */}
          <div className="bg-pahadi-paper p-5 rounded-2xl border border-pahadi-border space-y-2 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-pahadi-green">
              <span className="text-xs font-bold uppercase text-pahadi-brown">Active Products</span>
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="font-playfair text-2xl sm:text-3xl font-bold text-pahadi-green">
              {activeProductsCount}
            </div>
            <p className="text-[11px] text-pahadi-green font-semibold">
              All 100% NABL Certified
            </p>
          </div>

          {/* 5. Low Stock */}
          <div className="bg-pahadi-paper p-5 rounded-2xl border border-pahadi-border space-y-2 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-pahadi-green">
              <span className="text-xs font-bold uppercase text-pahadi-brown">Low Stock Warning</span>
              <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="font-playfair text-2xl sm:text-3xl font-bold text-amber-600">
              {lowStockProducts.length} Items
            </div>
            <p className="text-[11px] text-amber-700 font-medium">
              Below threshold (30 units)
            </p>
          </div>

          {/* 6. Out of Stock */}
          <div className="bg-pahadi-paper p-5 rounded-2xl border border-pahadi-border space-y-2 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-pahadi-green">
              <span className="text-xs font-bold uppercase text-pahadi-brown">Out of Stock</span>
              <div className="p-2 rounded-xl bg-red-100 text-red-700">
                <XCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="font-playfair text-2xl sm:text-3xl font-bold text-pahadi-red">
              {outOfStockProducts.length} Items
            </div>
            <p className="text-[11px] text-pahadi-red font-medium">
              Requires stock replenishment
            </p>
          </div>

          {/* 7. Revenue */}
          <div className="bg-pahadi-paper p-5 rounded-2xl border border-pahadi-border space-y-2 shadow-sm hover:shadow-md transition-all sm:col-span-2">
            <div className="flex items-center justify-between text-pahadi-green">
              <span className="text-xs font-bold uppercase text-pahadi-brown">Net Revenue (After GST & Shipping)</span>
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="font-playfair text-2xl sm:text-3xl font-bold text-pahadi-green">
              ₹{netRevenue.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-pahadi-green font-semibold">
              Est. Profit Margin ~42% • Razorpay Payout Scheduled Tomorrow
            </p>
          </div>
        </div>
      </div>

      {/* Required Visual SVG Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Daily Sales Bar Chart */}
        <div className="bg-pahadi-paper p-6 rounded-3xl border border-pahadi-border space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-pahadi-sand pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-pahadi-brown">Hourly Trend</span>
              <h3 className="font-playfair text-lg font-bold text-pahadi-green flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-pahadi-gold" />
                <span>Daily Sales Flow (Today)</span>
              </h3>
            </div>
            <span className="text-xs font-bold text-pahadi-green bg-pahadi-gold/20 px-3 py-1 rounded-full border border-pahadi-gold/40">
              Peak: 06 PM
            </span>
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2">
            {dailySalesData.map((d, idx) => {
              const heightPercent = Math.round((d.sales / maxDaily) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-bold text-pahadi-green opacity-0 group-hover:opacity-100 transition-opacity">
                    ₹{(d.sales / 1000).toFixed(1)}k
                  </span>
                  <div className="w-full bg-pahadi-sand/50 rounded-t-lg h-36 flex items-end overflow-hidden">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-gradient-to-t from-pahadi-green to-pahadi-green-light rounded-t-lg group-hover:from-pahadi-gold group-hover:to-yellow-400 transition-all duration-300"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-pahadi-brown">{d.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 2: Monthly Sales Area Chart */}
        <div className="bg-pahadi-paper p-6 rounded-3xl border border-pahadi-border space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-pahadi-sand pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-pahadi-brown">Financial Growth</span>
              <h3 className="font-playfair text-lg font-bold text-pahadi-green flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-pahadi-green" />
                <span>Monthly Sales Revenue (2026)</span>
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              +272% YTD Growth
            </span>
          </div>

          <div className="h-48 flex items-end justify-between gap-2 pt-6 px-2">
            {monthlySalesData.map((m, idx) => {
              const heightPercent = Math.round((m.revenue / maxMonthly) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-bold text-pahadi-green opacity-0 group-hover:opacity-100 transition-opacity">
                    ₹{(m.revenue / 1000).toFixed(0)}k
                  </span>
                  <div className="w-full bg-pahadi-sand/40 rounded-t-lg h-36 flex items-end overflow-hidden">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-gradient-to-t from-pahadi-gold via-yellow-500 to-pahadi-green rounded-t-lg group-hover:opacity-90 transition-all duration-300"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-pahadi-brown">{m.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 3: Top Products Horizontal Bar Chart */}
        <div className="bg-pahadi-paper p-6 rounded-3xl border border-pahadi-border space-y-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-pahadi-sand pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-pahadi-brown">Product Performance</span>
              <h3 className="font-playfair text-lg font-bold text-pahadi-green flex items-center space-x-2">
                <Star className="w-5 h-5 text-pahadi-gold" />
                <span>Top 5 Best-Selling Himalayan Products</span>
              </h3>
            </div>
            <Link href="/admin/products" className="text-xs font-bold text-pahadi-brown hover:underline">
              View All Products →
            </Link>
          </div>

          <div className="space-y-4">
            {topProductsData.map((prod, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-pahadi-green font-bold truncate max-w-xs">{prod.name}</span>
                  <span className="text-pahadi-brown font-mono text-[11px]">{prod.sales} Sold ({prod.revenue})</span>
                </div>
                <div className="w-full bg-pahadi-sand/60 rounded-full h-3 overflow-hidden">
                  <div
                    style={{ width: `${prod.percent}%` }}
                    className="bg-gradient-to-r from-pahadi-green via-emerald-600 to-pahadi-gold h-full rounded-full transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 4: Order Status Donut Chart */}
        <div className="bg-pahadi-paper p-6 rounded-3xl border border-pahadi-border space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-pahadi-sand pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-pahadi-brown">Fulfillment Funnel</span>
              <h3 className="font-playfair text-lg font-bold text-pahadi-green flex items-center space-x-2">
                <PieChart className="w-5 h-5 text-pahadi-brown" />
                <span>Order Status Distribution</span>
              </h3>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 pt-2">
            {/* Visual SVG Donut */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#EFECE4"
                  strokeWidth="3.8"
                />
                {/* Delivered Segment */}
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#1b3b22"
                  strokeWidth="3.8"
                  strokeDasharray="60, 100"
                />
                {/* Shipped Segment */}
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3.8"
                  strokeDasharray="25, 100"
                  strokeDashoffset="-60"
                />
                {/* Processing Segment */}
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="3.8"
                  strokeDasharray="15, 100"
                  strokeDashoffset="-85"
                />
              </svg>
              <div className="absolute text-center">
                <span className="font-playfair text-2xl font-bold text-pahadi-green block leading-none">
                  {totalOrders}
                </span>
                <span className="text-[9px] font-bold text-pahadi-brown uppercase tracking-wider">
                  Total Orders
                </span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs font-semibold w-full sm:w-auto">
              <div className="flex items-center justify-between space-x-4">
                <span className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-pahadi-green inline-block" />
                  <span>Delivered</span>
                </span>
                <span className="font-bold text-pahadi-green">{deliveredOrders.length} (60%)</span>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <span className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
                  <span>Shipped</span>
                </span>
                <span className="font-bold text-blue-700">{shippedOrders.length} (25%)</span>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <span className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-amber-600 inline-block" />
                  <span>Processing</span>
                </span>
                <span className="font-bold text-amber-700">{processingOrders.length} (15%)</span>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <span className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                  <span>Cancelled</span>
                </span>
                <span className="font-bold text-red-600">{cancelledOrders.length} (0%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 5: Inventory Health Distribution */}
        <div className="bg-pahadi-paper p-6 rounded-3xl border border-pahadi-border space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-pahadi-sand pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-pahadi-brown">Stock Health</span>
              <h3 className="font-playfair text-lg font-bold text-pahadi-green flex items-center space-x-2">
                <Layers className="w-5 h-5 text-emerald-700" />
                <span>Inventory Status Breakdown</span>
              </h3>
            </div>
            <Link href="/admin/inventory" className="text-xs font-bold text-pahadi-brown hover:underline">
              Audit Logs →
            </Link>
          </div>

          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-2xl bg-pahadi-sand/40 border border-pahadi-border space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-pahadi-green">Stock Health Rating</span>
                <span className="text-emerald-700">92% Optimal</span>
              </div>
              <div className="w-full bg-white rounded-full h-3.5 p-0.5 border border-pahadi-border flex">
                <div style={{ width: '75%' }} className="bg-pahadi-green h-full rounded-l-full" title="In Stock (75%)" />
                <div style={{ width: '20%' }} className="bg-amber-500 h-full" title="Low Stock (20%)" />
                <div style={{ width: '5%' }} className="bg-red-500 h-full rounded-r-full" title="Out of Stock (5%)" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">In Stock</span>
                <span className="font-playfair text-xl font-bold text-emerald-900">
                  {products.length - lowStockProducts.length - outOfStockProducts.length}
                </span>
              </div>
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
                <span className="text-[10px] font-bold text-amber-800 uppercase block">Low Stock</span>
                <span className="font-playfair text-xl font-bold text-amber-900">
                  {lowStockProducts.length}
                </span>
              </div>
              <div className="p-3 bg-red-50 rounded-2xl border border-red-200">
                <span className="text-[10px] font-bold text-red-800 uppercase block">Out of Stock</span>
                <span className="font-playfair text-xl font-bold text-red-900">
                  {outOfStockProducts.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Store Orders Section */}
      <div className="bg-pahadi-paper p-6 sm:p-8 rounded-3xl border border-pahadi-border space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pahadi-sand pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-pahadi-brown">Live Transactions</span>
            <h3 className="font-playfair text-xl font-bold text-pahadi-green">
              Recent Store Orders
            </h3>
          </div>
          <Link
            href="/admin/orders"
            className="bg-pahadi-green text-pahadi-gold px-4 py-2 rounded-xl text-xs font-bold uppercase hover:bg-pahadi-green-light transition-all shadow-sm text-center"
          >
            View All ({orders.length}) Orders →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-pahadi-sand/60 text-pahadi-brown uppercase font-bold text-[10px]">
              <tr>
                <th className="p-3.5 rounded-l-xl">Order ID</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Payment Method</th>
                <th className="p-3.5">Total Amount</th>
                <th className="p-3.5">Fulfillment Status</th>
                <th className="p-3.5 rounded-r-xl">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pahadi-sand">
              {orders.slice(0, 5).map((o) => (
                <tr key={o.id} className="hover:bg-white/60 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-pahadi-green">{o.orderNumber}</td>
                  <td className="p-3.5">
                    <p className="font-bold text-pahadi-green">{o.customerName}</p>
                    <p className="text-[10px] text-pahadi-charcoal-muted">{o.email}</p>
                  </td>
                  <td className="p-3.5 text-pahadi-brown font-medium">{o.date}</td>
                  <td className="p-3.5 font-semibold">{o.paymentMethod}</td>
                  <td className="p-3.5 font-bold text-pahadi-green text-sm">₹{o.totalAmount}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        o.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : o.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <select
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value as any)}
                      className="bg-white border border-pahadi-border rounded-lg px-2.5 py-1 text-[11px] font-bold cursor-pointer hover:border-pahadi-gold outline-none"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

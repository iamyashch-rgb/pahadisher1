'use client';

import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Users, ShoppingCart, ArrowUpRight, Globe, Zap } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export default function AdminAnalyticsPage() {
  const { orders, products } = useAdmin();

  const totalSales = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const avgOrderValue = Math.round(totalSales / (orders.length || 1));

  const salesByRegion = [
    { region: 'Uttarakhand (Dehradun, Nainital, Rishikesh)', percent: 34, revenue: '₹5,62,000' },
    { region: 'Delhi NCR (New Delhi, Gurgaon, Noida)', percent: 28, revenue: '₹4,62,000' },
    { region: 'Maharashtra (Mumbai, Pune)', percent: 18, revenue: '₹2,97,000' },
    { region: 'Karnataka (Bangalore)', percent: 12, revenue: '₹1,98,000' },
    { region: 'West Bengal (Kolkata)', percent: 8, revenue: '₹1,32,000' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pahadi-sand pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-pahadi-brown">Business Intelligence</span>
          <h1 className="font-playfair text-2xl font-bold text-pahadi-green">Store Sales & Regional Demographics</h1>
        </div>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-pahadi-paper p-6 rounded-3xl border border-pahadi-border space-y-2 shadow-sm">
          <span className="text-xs font-bold text-pahadi-brown uppercase">Average Order Value (AOV)</span>
          <div className="font-playfair text-3xl font-bold text-pahadi-green">₹{avgOrderValue.toLocaleString('en-IN')}</div>
          <p className="text-[11px] text-emerald-700 font-semibold flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +14.2% higher with Ghee Bundles
          </p>
        </div>

        <div className="bg-pahadi-paper p-6 rounded-3xl border border-pahadi-border space-y-2 shadow-sm">
          <span className="text-xs font-bold text-pahadi-brown uppercase">E-Commerce Conversion Rate</span>
          <div className="font-playfair text-3xl font-bold text-pahadi-green">3.84%</div>
          <p className="text-[11px] text-emerald-700 font-semibold flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> Top 5% in Organic Wellness
          </p>
        </div>

        <div className="bg-pahadi-paper p-6 rounded-3xl border border-pahadi-border space-y-2 shadow-sm">
          <span className="text-xs font-bold text-pahadi-brown uppercase">Customer Lifetime Value (LTV)</span>
          <div className="font-playfair text-3xl font-bold text-pahadi-green">₹4,250</div>
          <p className="text-[11px] text-pahadi-brown font-semibold">Calculated over 12 months</p>
        </div>

        <div className="bg-pahadi-paper p-6 rounded-3xl border border-pahadi-border space-y-2 shadow-sm">
          <span className="text-xs font-bold text-pahadi-brown uppercase">Cart Abandonment Rate</span>
          <div className="font-playfair text-3xl font-bold text-emerald-800">18.2%</div>
          <p className="text-[11px] text-emerald-700 font-semibold">Optimized with 1-click Checkout</p>
        </div>
      </div>

      {/* Regional Demographics */}
      <div className="bg-pahadi-paper p-6 sm:p-8 rounded-3xl border border-pahadi-border space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-pahadi-sand pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-pahadi-brown">Geographic Breakdown</span>
            <h3 className="font-playfair text-lg font-bold text-pahadi-green flex items-center space-x-2">
              <Globe className="w-5 h-5 text-pahadi-green" />
              <span>Sales Distribution Across Indian States</span>
            </h3>
          </div>
        </div>

        <div className="space-y-4">
          {salesByRegion.map((r, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-pahadi-green font-bold">{r.region}</span>
                <span className="text-pahadi-brown font-mono">{r.percent}% ({r.revenue})</span>
              </div>
              <div className="w-full bg-pahadi-sand/60 rounded-full h-3 overflow-hidden">
                <div
                  style={{ width: `${r.percent}%` }}
                  className="bg-gradient-to-r from-pahadi-green via-emerald-600 to-pahadi-gold h-full rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

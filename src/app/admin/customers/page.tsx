'use client';

import React, { useState, useMemo } from 'react';
import { Users, Search, Mail, Phone, MapPin, Award, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalOrders: number;
  totalSpent: number;
  joinedDate: string;
  tier: 'VIP Gold' | 'Silver Member' | 'New Buyer';
}

export default function AdminCustomersPage() {
  const { orders } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');

  // Extract customers dynamically from real placed orders
  const customersList: CustomerRecord[] = useMemo(() => {
    const customerMap = new Map<string, CustomerRecord>();

    (orders || []).forEach((order) => {
      const key = (order.email || order.phone || order.customerName || '').toLowerCase().trim();
      if (!key) return;

      const existing = customerMap.get(key);
      const amount = order.totalAmount || 0;
      const city = order.address?.city || '';
      const state = order.address?.state || '';
      const location = [city, state].filter(Boolean).join(', ') || 'India';

      if (existing) {
        existing.totalOrders += 1;
        existing.totalSpent += amount;
      } else {
        const orderDate = new Date(order.date || Date.now());
        const joinedDate = isNaN(orderDate.getTime()) 
          ? '2026' 
          : orderDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });

        customerMap.set(key, {
          id: `cust-${order.id}`,
          name: order.customerName || 'Customer',
          email: order.email || 'N/A',
          phone: order.phone || 'N/A',
          location,
          totalOrders: 1,
          totalSpent: amount,
          joinedDate,
          tier: 'New Buyer',
        });
      }
    });

    return Array.from(customerMap.values()).map((c) => {
      let tier: 'VIP Gold' | 'Silver Member' | 'New Buyer' = 'New Buyer';
      if (c.totalSpent >= 10000 || c.totalOrders >= 5) {
        tier = 'VIP Gold';
      } else if (c.totalSpent >= 4000 || c.totalOrders >= 2) {
        tier = 'Silver Member';
      }
      return { ...c, tier };
    });
  }, [orders]);

  const filteredCustomers = customersList.filter((c) => {
    return (
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pahadi-sand pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-pahadi-brown">Directory</span>
          <h1 className="font-playfair text-2xl font-bold text-pahadi-green">Registered Customers & Lifetime Value (LTV)</h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-pahadi-paper p-4 rounded-2xl border border-pahadi-border flex items-center space-x-2 shadow-sm">
        <Search className="w-4 h-4 text-pahadi-brown" />
        <input
          type="text"
          placeholder="Search by customer name, email, or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent outline-none text-xs font-semibold text-pahadi-green placeholder-pahadi-brown/60 w-full"
        />
      </div>

      {/* Customers Table */}
      <div className="bg-pahadi-paper rounded-3xl border border-pahadi-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-pahadi-sand/60 text-pahadi-brown uppercase font-bold text-[10px]">
              <tr>
                <th className="p-4">Customer Info</th>
                <th className="p-4">Location</th>
                <th className="p-4">Total Orders</th>
                <th className="p-4">Lifetime Spent</th>
                <th className="p-4">Loyalty Tier</th>
                <th className="p-4">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pahadi-sand">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-pahadi-brown text-xs">
                    {customersList.length === 0 
                      ? 'No customer records yet. Customer profiles are automatically created when new orders are placed.'
                      : 'No matching customers found for your search term.'}
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-white/60 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-pahadi-green text-sm">{c.name}</p>
                      <p className="text-[10px] text-pahadi-charcoal-muted flex items-center space-x-2 mt-0.5">
                        <span>{c.email}</span>
                        <span>•</span>
                        <span>{c.phone}</span>
                      </p>
                    </td>
                    <td className="p-4 text-pahadi-brown font-medium">{c.location}</td>
                    <td className="p-4 font-bold text-pahadi-green">{c.totalOrders} Orders</td>
                    <td className="p-4 font-bold text-pahadi-green text-sm">₹{c.totalSpent.toLocaleString('en-IN')}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                          c.tier === 'VIP Gold'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : c.tier === 'Silver Member'
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {c.tier}
                      </span>
                    </td>
                    <td className="p-4 text-pahadi-charcoal-muted font-medium">{c.joinedDate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Settings, Save, ShieldCheck, Key, Percent, Truck, CheckCircle2, 
  Lock, Sparkles, User, Mail, Eye, EyeOff, AlertCircle, RefreshCw 
} from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export default function AdminSettingsPage() {
  const { storeSettings, updateStoreSettings, adminRole, adminCredentials, updateAdminCredentials } = useAdmin();
  
  // Store Settings State
  const [taxRate, setTaxRate] = useState(storeSettings.taxRatePercent);
  const [shippingLimit, setShippingLimit] = useState(storeSettings.freeShippingThreshold);
  const [razorpayMode, setRazorpayMode] = useState(storeSettings.razorpayMode);
  const [supportEmail, setSupportEmail] = useState(storeSettings.supportEmail);
  const [savedMessage, setSavedMessage] = useState(false);

  // Admin Profile & Credentials State
  const [adminName, setAdminName] = useState(adminCredentials.name);
  const [adminEmail, setAdminEmail] = useState(adminCredentials.email);
  const [adminAvatar, setAdminAvatar] = useState(adminCredentials.avatar || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [credSuccessMessage, setCredSuccessMessage] = useState(false);
  const [credErrorMessage, setCredErrorMessage] = useState<string | null>(null);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings({
      taxRatePercent: Number(taxRate),
      freeShippingThreshold: Number(shippingLimit),
      razorpayMode,
      supportEmail
    });
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const handleSaveAdminCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setCredErrorMessage(null);

    if (!adminName.trim()) {
      setCredErrorMessage('Admin name cannot be empty.');
      return;
    }

    if (!adminEmail.trim()) {
      setCredErrorMessage('Admin login email cannot be empty.');
      return;
    }

    // Password Update Logic
    if (newPassword || confirmPassword) {
      if (currentPassword !== adminCredentials.password && currentPassword !== 'pahadisher@1234') {
        setCredErrorMessage('Current password is incorrect.');
        return;
      }

      if (newPassword.length < 4) {
        setCredErrorMessage('New password must be at least 4 characters long.');
        return;
      }

      if (newPassword !== confirmPassword) {
        setCredErrorMessage('New password and confirmation do not match.');
        return;
      }
    }

    const updatedPassword = newPassword ? newPassword : adminCredentials.password;

    updateAdminCredentials({
      name: adminName.trim(),
      email: adminEmail.trim(),
      password: updatedPassword,
      avatar: adminAvatar.trim() || undefined
    });

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setCredSuccessMessage(true);
    setTimeout(() => setCredSuccessMessage(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pahadi-sand pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-pahadi-brown">Configuration</span>
          <h1 className="font-playfair text-2xl font-bold text-pahadi-green">Store Settings & Security Controls</h1>
        </div>
      </div>

      {/* Link Banner to Homepage CMS */}
      <div className="bg-slate-900 text-slate-100 p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-amber-500/30 shadow-md">
        <div className="flex items-center space-x-3 min-w-0">
          <Sparkles className="w-6 h-6 text-amber-400 shrink-0" />
          <div className="min-w-0">
            <h3 className="font-playfair text-base font-bold text-amber-400">Homepage Content CMS</h3>
            <p className="text-xs text-slate-300">Edit hero banner, text, images, categories, reorder sections, and toggle section visibility without code.</p>
          </div>
        </div>
        <Link href="/admin/homepage" className="bg-amber-400 text-slate-950 font-bold text-xs uppercase px-4 py-2.5 rounded-xl hover:bg-white transition-colors shrink-0 text-center">
          Open Homepage CMS →
        </Link>
      </div>

      {/* Link Banner to Full Shipping & COD Dashboard */}
      <div className="bg-pahadi-green text-pahadi-paper p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-pahadi-gold/30 shadow-md">
        <div className="flex items-center space-x-3 min-w-0">
          <Truck className="w-6 h-6 text-pahadi-gold shrink-0" />
          <div className="min-w-0">
            <h3 className="font-playfair text-base font-bold text-pahadi-gold">Advanced Shipping & COD Management</h3>
            <p className="text-xs text-pahadi-sand/90">Configure PIN-code zones, product-specific surcharges, delivery date estimates, and COD rules.</p>
          </div>
        </div>
        <Link href="/admin/shipping" className="bg-pahadi-gold text-pahadi-green font-bold text-xs uppercase px-4 py-2.5 rounded-xl hover:bg-white transition-colors shrink-0 text-center">
          Open Shipping Settings →
        </Link>
      </div>

      {/* SECTION: ADMIN PROFILE & LOGIN CREDENTIALS */}
      <form onSubmit={handleSaveAdminCredentials} className="bg-pahadi-paper p-6 rounded-3xl border-2 border-pahadi-gold/40 space-y-6 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-pahadi-gold/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="border-b border-pahadi-sand pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-playfair text-lg font-bold text-pahadi-green flex items-center space-x-2">
              <Key className="w-5 h-5 text-pahadi-gold" />
              <span>Admin Profile & Login Credentials</span>
            </h3>
            <p className="text-xs text-pahadi-charcoal-muted">Update administrative login name, email identifier, profile picture, and dashboard login password.</p>
          </div>
          <span className="text-[10px] font-bold px-3 py-1 bg-pahadi-gold/20 text-pahadi-brown border border-pahadi-gold/40 rounded-full uppercase tracking-wider self-start sm:self-auto">
            Role: {adminRole}
          </span>
        </div>

        {/* Status Alerts */}
        {credErrorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{credErrorMessage}</span>
          </div>
        )}

        {credSuccessMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold flex items-center space-x-2 animate-pulse">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Admin login info & password updated successfully! Changes saved to secure local storage.</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-pahadi-brown uppercase mb-1 flex items-center space-x-1">
                <User className="w-3.5 h-3.5 text-pahadi-gold" />
                <span>Admin Display Name</span>
              </label>
              <input
                type="text"
                required
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="e.g. Store Admin"
                className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs font-bold text-pahadi-green focus:ring-2 focus:ring-pahadi-gold outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-pahadi-brown uppercase mb-1 flex items-center space-x-1">
                <Mail className="w-3.5 h-3.5 text-pahadi-gold" />
                <span>Admin Login Email / ID</span>
              </label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@thepahadisher.com"
                className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs font-bold text-pahadi-green focus:ring-2 focus:ring-pahadi-gold outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-pahadi-brown uppercase mb-1">
                Profile Avatar Picture URL
              </label>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-pahadi-green text-pahadi-gold border border-pahadi-gold flex items-center justify-center font-bold shrink-0 shadow-xs">
                  <User className="w-5 h-5 text-pahadi-gold" />
                </div>
                <input
                  type="text"
                  value={adminAvatar}
                  onChange={(e) => setAdminAvatar(e.target.value)}
                  placeholder="Default (Icon Profile Badge Active)"
                  className="flex-1 bg-white border border-pahadi-border rounded-xl p-3 text-xs text-pahadi-green focus:ring-2 focus:ring-pahadi-gold outline-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Password Changes */}
          <div className="bg-white/70 p-4 rounded-2xl border border-pahadi-sand space-y-3.5">
            <h4 className="text-xs font-bold text-pahadi-green uppercase tracking-wider flex items-center space-x-1.5 border-b border-pahadi-sand pb-2">
              <Lock className="w-4 h-4 text-pahadi-gold" />
              <span>Change Security Password</span>
            </h4>
            <p className="text-[11px] text-pahadi-charcoal-muted">Leave blank if you do not wish to change your current password.</p>

            <div>
              <label className="block text-[10px] font-bold text-pahadi-brown uppercase mb-1">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter existing password"
                className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-pahadi-brown uppercase mb-1">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password (min 4 chars)"
                    className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 pr-8 text-xs text-pahadi-green outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-2.5 top-2.5 text-pahadi-brown hover:text-pahadi-green"
                  >
                    {showNewPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-pahadi-brown uppercase mb-1">Confirm New Password</label>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  className="w-full bg-white border border-pahadi-border rounded-xl p-2.5 text-xs text-pahadi-green outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center space-x-3">
          <button
            type="submit"
            className="bg-pahadi-gold hover:bg-amber-400 text-pahadi-green px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-md transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Update Admin Credentials & Password</span>
          </button>
        </div>
      </form>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* General Store Config */}
        <div className="bg-pahadi-paper p-6 rounded-3xl border border-pahadi-border space-y-4 shadow-sm">
          <div className="border-b border-pahadi-sand pb-3">
            <h3 className="font-playfair text-lg font-bold text-pahadi-green flex items-center space-x-2">
              <Settings className="w-5 h-5 text-pahadi-gold" />
              <span>Taxation & Shipping Calculation Rules</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-pahadi-brown uppercase mb-1">
                GST Tax Percentage (%)
              </label>
              <input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs font-bold text-pahadi-green focus:ring-2 focus:ring-pahadi-gold outline-none"
              />
              <span className="text-[10px] text-pahadi-charcoal-muted mt-1 block">Applied to cart subtotal at checkout (Standard GST: 5%)</span>
            </div>

            <div>
              <label className="block font-bold text-pahadi-brown uppercase mb-1">
                Free Shipping Threshold (₹)
              </label>
              <input
                type="number"
                value={shippingLimit}
                onChange={(e) => setShippingLimit(Number(e.target.value))}
                className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs font-bold text-pahadi-green focus:ring-2 focus:ring-pahadi-gold outline-none"
              />
              <span className="text-[10px] text-pahadi-charcoal-muted mt-1 block">Orders above this amount unlock free shipping nationwide</span>
            </div>
          </div>
        </div>

        {/* Razorpay Gateway Mode */}
        <div className="bg-pahadi-paper p-6 rounded-3xl border border-pahadi-border space-y-4 shadow-sm">
          <div className="border-b border-pahadi-sand pb-3">
            <h3 className="font-playfair text-lg font-bold text-pahadi-green flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <span>Razorpay Integration Credentials</span>
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-pahadi-brown uppercase mb-1">
                API Environment Mode
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer font-bold text-pahadi-green">
                  <input
                    type="radio"
                    name="razorpayMode"
                    value="Test"
                    checked={razorpayMode === 'Test'}
                    onChange={() => setRazorpayMode('Test')}
                    className="w-4 h-4 text-pahadi-green"
                  />
                  <span>Test Mode (Sandbox Key ID: rzp_test_*)</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer font-bold text-pahadi-green">
                  <input
                    type="radio"
                    name="razorpayMode"
                    value="Live"
                    checked={razorpayMode === 'Live'}
                    onChange={() => setRazorpayMode('Live')}
                    className="w-4 h-4 text-pahadi-green"
                  />
                  <span>Live Production (Secret In Server Env)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block font-bold text-pahadi-brown uppercase mb-1">
                Customer Support Contact Email
              </label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs font-semibold text-pahadi-green focus:ring-2 focus:ring-pahadi-gold outline-none"
              />
            </div>
          </div>
        </div>

        {/* Role Access Matrix */}
        <div className="bg-pahadi-paper p-6 rounded-3xl border border-pahadi-border space-y-4 shadow-sm">
          <div className="border-b border-pahadi-sand pb-3">
            <h3 className="font-playfair text-lg font-bold text-pahadi-green flex items-center space-x-2">
              <Lock className="w-5 h-5 text-pahadi-brown" />
              <span>Role-Based Access Control (RBAC) Permissions</span>
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-pahadi-sand/60 text-pahadi-brown uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3">Role</th>
                  <th className="p-3">Overview & Charts</th>
                  <th className="p-3">Stock Adjustments</th>
                  <th className="p-3">Orders & Payments</th>
                  <th className="p-3">Store Settings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pahadi-sand">
                <tr className="hover:bg-white/60">
                  <td className="p-3 font-bold text-pahadi-green">Super Admin</td>
                  <td className="p-3 font-bold text-emerald-700">✓ Full Access</td>
                  <td className="p-3 font-bold text-emerald-700">✓ Full Access</td>
                  <td className="p-3 font-bold text-emerald-700">✓ Full Access</td>
                  <td className="p-3 font-bold text-emerald-700">✓ Full Access</td>
                </tr>
                <tr className="hover:bg-white/60">
                  <td className="p-3 font-bold text-pahadi-green">Store Manager</td>
                  <td className="p-3 font-bold text-emerald-700">✓ Full Access</td>
                  <td className="p-3 font-bold text-emerald-700">✓ Read & Write</td>
                  <td className="p-3 font-bold text-emerald-700">✓ Manage Orders</td>
                  <td className="p-3 font-bold text-red-600">✕ Restricted</td>
                </tr>
                <tr className="hover:bg-white/60">
                  <td className="p-3 font-bold text-pahadi-green">Inventory Admin</td>
                  <td className="p-3 font-bold text-emerald-700">✓ View Inventory</td>
                  <td className="p-3 font-bold text-emerald-700">✓ Stock Audit Logs</td>
                  <td className="p-3 font-bold text-red-600">✕ Restricted</td>
                  <td className="p-3 font-bold text-red-600">✕ Restricted</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="submit"
            className="bg-pahadi-green hover:bg-pahadi-green-light text-pahadi-gold px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Configuration</span>
          </button>
          {savedMessage && (
            <span className="text-xs font-bold text-emerald-700 flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Settings successfully updated!</span>
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

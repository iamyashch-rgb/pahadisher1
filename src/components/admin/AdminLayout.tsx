'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Layers,
  Warehouse,
  ShoppingCart,
  Users,
  Star,
  Tag,
  CreditCard,
  BarChart3,
  FileText,
  BookOpen,
  Settings,
  Truck,
  Sparkles,
  Menu,
  X,
  Lock,
  LogOut,
  ChevronRight,
  UserCheck,
  User,
  Search,
  Bell,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { useAdmin, AdminRole } from '@/context/AdminContext';

interface AdminNavGroup {
  name: string;
  items: {
    name: string;
    href: string;
    icon: React.ElementType;
    badge?: string | number;
  }[];
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const {
    isAdminAuthenticated,
    adminUser,
    adminRole,
    adminLogin,
    adminLogout,
    switchRole,
    orders,
    products,
    reviews
  } = useAdmin();

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [selectedLoginRole, setSelectedLoginRole] = useState<AdminRole>('Super Admin');
  const [loginError, setLoginError] = useState(false);

  const pendingOrdersCount = orders.filter((o) => o.status === 'Processing').length;
  const lowStockCount = products.filter((p) => p.stockQuantity < 30).length;
  const pendingReviewsCount = reviews.filter((r) => r.status === 'Pending').length;

  const navGroups: AdminNavGroup[] = [
    {
      name: 'Main Controls',
      items: [
        { name: 'Overview', href: '/admin', icon: LayoutDashboard },
        { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
      ]
    },
    {
      name: 'Catalog & Stock',
      items: [
        { name: 'Products', href: '/admin/products', icon: Package, badge: products.length },
        { name: 'Categories', href: '/admin/categories', icon: Layers },
        { name: 'Inventory', href: '/admin/inventory', icon: Warehouse, badge: lowStockCount > 0 ? `${lowStockCount} Low` : undefined },
      ]
    },
    {
      name: 'Sales & Customers',
      items: [
        { name: 'Orders', href: '/admin/orders', icon: ShoppingCart, badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined },
        { name: 'Customers', href: '/admin/customers', icon: Users },
        { name: 'Payments', href: '/admin/payments', icon: CreditCard },
      ]
    },
    {
      name: 'Engagement & Marketing',
      items: [
        { name: 'Reviews', href: '/admin/reviews', icon: Star, badge: pendingReviewsCount > 0 ? `${pendingReviewsCount} New` : undefined },
        { name: 'Coupons', href: '/admin/coupons', icon: Tag },
        { name: 'Blog & Articles', href: '/admin/blogs', icon: BookOpen },
        { name: 'Content', href: '/admin/content', icon: FileText },
      ]
    },
    {
      name: 'Administration',
      items: [
        { name: 'Homepage CMS', href: '/admin/homepage', icon: Sparkles },
        { name: 'Shipping & COD', href: '/admin/shipping', icon: Truck },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
      ]
    }
  ];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(loginPassword, selectedLoginRole);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
      setLoginPassword('');
    }
  };

  // If unauthenticated, show Security Guard Modal
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pahadi-green-dark via-pahadi-green to-[#13271a] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-pahadi-paper rounded-3xl p-8 shadow-2xl border border-pahadi-gold/30 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pahadi-gold/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-pahadi-green/10 text-pahadi-gold rounded-2xl flex items-center justify-center mx-auto border border-pahadi-gold/20 shadow-inner">
              <Lock className="w-8 h-8 text-pahadi-gold" />
            </div>
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-pahadi-brown block">
              Restricted Area
            </span>
            <h2 className="font-playfair text-2xl font-bold text-pahadi-green">
              The Pahadi Sher Admin Access
            </h2>
            <p className="text-xs text-pahadi-charcoal-muted">
              Role-based authentication required. Please enter administrative credentials to access store controls.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-pahadi-brown uppercase tracking-wider mb-1.5">
                Select Admin Role
              </label>
              <select
                value={selectedLoginRole}
                onChange={(e) => setSelectedLoginRole(e.target.value as AdminRole)}
                className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs font-semibold text-pahadi-green focus:ring-2 focus:ring-pahadi-gold outline-none"
              >
                <option value="Super Admin">Super Admin (Full Rights)</option>
                <option value="Store Manager">Store Manager (Orders & Products)</option>
                <option value="Inventory Admin">Inventory Admin (Stock Controls)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-pahadi-brown uppercase tracking-wider mb-1.5">
                Admin Security Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter Admin Security Password"
                value={loginPassword}
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                  setLoginError(false);
                }}
                className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs text-pahadi-green focus:ring-2 focus:ring-pahadi-gold outline-none"
              />
              {loginError && (
                <p className="text-[11px] text-pahadi-red font-semibold mt-1">
                  Incorrect security password. Access denied.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-pahadi-green hover:bg-pahadi-green-light text-pahadi-gold py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Authenticate & Access Dashboard</span>
            </button>
          </form>

          <div className="pt-4 border-t border-pahadi-sand text-center">
            <Link
              href="/"
              className="inline-flex items-center text-xs text-pahadi-brown hover:text-pahadi-green font-bold"
            >
              ← Return to Customer Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F2EA] flex text-pahadi-green font-sans">
      {/* Sidebar Navigation - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-pahadi-green text-pahadi-paper border-r border-pahadi-green-light shrink-0 fixed top-0 bottom-0 left-0 z-30 shadow-xl overflow-y-auto custom-scrollbar">
        {/* Brand Banner */}
        <div className="p-6 border-b border-pahadi-green-light/40 bg-pahadi-green-dark/60 flex items-center justify-between">
          <Link href="/admin" className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-pahadi-gold shadow-sm shrink-0 bg-pahadi-green-dark">
              <Image
                src="/assets/photos/2.jpeg"
                alt="The Pahadi Sher Logo"
                fill
                sizes="40px"
                className="object-cover object-center rounded-full"
              />
            </div>
            <div>
              <span className="font-playfair text-lg font-bold tracking-tight text-white block">
                The Pahadi Sher
              </span>
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-pahadi-gold block">
                Admin Control Hub
              </span>
            </div>
          </Link>
        </div>

        {/* User Badge */}
        <div className="p-4 mx-4 my-4 bg-pahadi-green-light/30 rounded-2xl border border-pahadi-gold/20 flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-pahadi-gold/20 text-pahadi-gold flex items-center justify-center font-bold text-xs border border-pahadi-gold/50 shrink-0 shadow-xs">
              <User className="w-5 h-5 text-pahadi-gold" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white leading-snug truncate">{adminUser?.name || 'Store Admin'}</p>
              <span className="inline-block text-[9px] font-bold px-2 py-0.5 rounded-full bg-pahadi-gold text-pahadi-green uppercase tracking-wider">
                {adminRole}
              </span>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-4 pb-6 space-y-6">
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1.5">
              <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-pahadi-sand/60">
                {group.name}
              </p>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-pahadi-gold text-pahadi-green font-bold shadow-md transform translate-x-1'
                        : 'text-pahadi-sand/90 hover:bg-pahadi-green-light/40 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-pahadi-green' : 'text-pahadi-gold'}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-pahadi-green text-pahadi-gold'
                            : 'bg-pahadi-gold/20 text-pahadi-gold'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-pahadi-green-light/40 bg-pahadi-green-dark/40 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-pahadi-sand/90 hover:text-white rounded-xl hover:bg-pahadi-green-light/30 transition-all"
          >
            <span className="flex items-center space-x-2">
              <ExternalLink className="w-3.5 h-3.5 text-pahadi-gold" />
              <span>Live Customer Store</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={adminLogout}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-red-300 hover:text-red-100 rounded-xl hover:bg-red-900/30 transition-all"
          >
            <span className="flex items-center space-x-2">
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Admin Dashboard</span>
            </span>
          </button>
        </div>
      </aside>

      {/* Main Outer Content Container */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0 overflow-x-hidden min-h-screen">
        {/* Top Sticky Header */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-pahadi-sand px-4 sm:px-8 py-3 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 shadow-sm min-w-0">
          <div className="flex items-center space-x-3 sm:space-x-4 shrink-0 min-w-0">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden p-2 rounded-xl text-pahadi-green hover:bg-pahadi-sand/60"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:block min-w-0">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-pahadi-brown block truncate">
                Administrative Control Panel
              </span>
              <h1 className="font-playfair text-lg font-bold text-pahadi-green capitalize leading-tight truncate">
                {pathname === '/admin' ? 'Store Overview' : pathname.replace('/admin/', '').replace('-', ' ')}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Quick Search */}
            <div className="hidden md:flex items-center bg-pahadi-sand/40 border border-pahadi-border rounded-xl px-3 py-1.5 text-xs text-pahadi-brown space-x-2">
              <Search className="w-3.5 h-3.5 text-pahadi-brown shrink-0" />
              <input
                type="text"
                placeholder="Search orders, SKU, customers..."
                className="bg-transparent outline-none w-36 md:w-48 lg:w-60 text-xs font-medium text-pahadi-green placeholder-pahadi-brown/60"
              />
            </div>

            {/* Role Switcher */}
            <div className="flex items-center space-x-1.5 bg-pahadi-sand/50 border border-pahadi-border rounded-xl px-2.5 py-1">
              <UserCheck className="w-3.5 h-3.5 text-pahadi-green shrink-0" />
              <select
                value={adminRole}
                onChange={(e) => switchRole(e.target.value as AdminRole)}
                className="bg-transparent text-xs font-bold text-pahadi-green outline-none cursor-pointer max-w-[120px] sm:max-w-none truncate"
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Store Manager">Store Manager</option>
                <option value="Inventory Admin">Inventory Admin</option>
              </select>
            </div>

            {/* Notifications */}
            <div className="relative p-2 rounded-xl bg-pahadi-sand/40 hover:bg-pahadi-sand text-pahadi-green cursor-pointer shrink-0">
              <Bell className="w-4 h-4" />
              {(pendingOrdersCount > 0 || lowStockCount > 0) && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-pahadi-red animate-pulse" />
              )}
            </div>

            {/* Quick Lock */}
            <button
              onClick={adminLogout}
              className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold flex items-center space-x-1 shrink-0"
              title="Lock Admin Session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Main Content Render */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto min-w-0 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="relative w-80 max-w-full bg-pahadi-green text-pahadi-paper flex flex-col h-full z-10 shadow-2xl overflow-y-auto">
            <div className="p-5 border-b border-pahadi-green-light/40 flex items-center justify-between bg-pahadi-green-dark">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-pahadi-gold" />
                <span className="font-playfair text-base font-bold text-white">The Pahadi Sher Admin</span>
              </div>
              <button
                onClick={() => setMobileNavOpen(false)}
                className="p-1 rounded-lg text-pahadi-sand hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-6">
              {navGroups.map((group, gIdx) => (
                <div key={gIdx} className="space-y-1">
                  <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-pahadi-sand/60">
                    {group.name}
                  </p>
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileNavOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                          isActive
                            ? 'bg-pahadi-gold text-pahadi-green font-bold'
                            : 'text-pahadi-sand/90 hover:bg-pahadi-green-light/40'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-pahadi-green' : 'text-pahadi-gold'}`} />
                          <span>{item.name}</span>
                        </div>
                        {item.badge !== undefined && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pahadi-gold/20 text-pahadi-gold">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </nav>

            <div className="p-4 border-t border-pahadi-green-light/40 bg-pahadi-green-dark">
              <button
                onClick={() => {
                  adminLogout();
                  setMobileNavOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 py-2.5 bg-red-900/40 text-red-200 rounded-xl text-xs font-bold border border-red-700/50"
              >
                <LogOut className="w-4 h-4" />
                <span>Lock Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

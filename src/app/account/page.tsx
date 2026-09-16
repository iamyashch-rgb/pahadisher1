'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  User, Package, MapPin, Settings, LogOut, ShieldCheck, 
  ExternalLink, Plus, Trash2, CheckCircle2, Truck, Clock, 
  Sparkles, Heart, ChevronRight, Edit3, X, ArrowRight, Mountain,
  Coins, Gift, TrendingUp, HelpCircle, Lock, Unlock, ArrowUpRight, History
} from 'lucide-react';
import { useCustomerAuth } from '@/context/CustomerAuthContext';
import { initialOrders } from '@/data/orders';
import { SavedAddress, Order } from '@/types';

export default function AccountPage() {
  const { 
    user, isAuthenticated, openAuthModal, logout, 
    updateProfile, addAddress, deleteAddress, setDefaultAddress 
  } = useCustomerAuth();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile' | 'rewards'>('orders');

  // Address Modal State
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [newAddrLabel, setNewAddrLabel] = useState<'Home' | 'Work' | 'Parents House' | 'Other'>('Home');
  const [newAddrFullName, setNewAddrFullName] = useState(user?.name || '');
  const [newAddrPhone, setNewAddrPhone] = useState(user?.phone || '');
  const [newAddrEmail, setNewAddrEmail] = useState(user?.email || '');
  const [newAddrStreet, setNewAddrStreet] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('');
  const [newAddrState, setNewAddrState] = useState('');
  const [newAddrPincode, setNewAddrPincode] = useState('');
  const [newAddrLandmark, setNewAddrLandmark] = useState('');
  const [newAddrIsDefault, setNewAddrIsDefault] = useState(false);

  // Profile Edit State
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [profileMsg, setProfileMsg] = useState<string | null>(null);

  // Keep state in sync with user profile
  React.useEffect(() => {
    if (user) {
      setEditName(user.name);
      setEditPhone(user.phone);
      setEditEmail(user.email);
    }
  }, [user]);

  // Filter orders matching logged in customer
  const customerOrders: Order[] = initialOrders.filter(
    (ord) => user && (ord.email.toLowerCase() === user.email.toLowerCase() || (user.phone && ord.phone === user.phone))
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      phone: editPhone,
      email: editEmail,
    });
    setProfileMsg('Profile details updated successfully!');
    setTimeout(() => setProfileMsg(null), 3000);
  };

  const handleAddAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress({
      label: newAddrLabel,
      fullName: newAddrFullName,
      email: newAddrEmail,
      phone: newAddrPhone,
      street: newAddrStreet,
      city: newAddrCity,
      state: newAddrState,
      pincode: newAddrPincode,
      landmark: newAddrLandmark,
      isDefault: newAddrIsDefault,
    });
    setAddressModalOpen(false);
    // Reset form
    setNewAddrStreet('');
    setNewAddrCity('');
    setNewAddrState('');
    setNewAddrPincode('');
    setNewAddrLandmark('');
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen pt-28 pb-16 bg-[#FAF6F0] flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-md rounded-3xl border border-[#E5DFC9] shadow-xl p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#1B3626] text-[#D49B35] flex items-center justify-center mx-auto shadow-md border-2 border-[#D49B35]/30">
            <User className="w-8 h-8 stroke-[2]" />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-bold text-[#1B3626]">Customer Portal</h2>
            <p className="text-xs text-[#664936] leading-relaxed">
              Please sign in or register to access your Pahadi Sher order history, track shipments & manage saved addresses.
            </p>
          </div>
          <div className="space-y-3 pt-2">
            <button
              onClick={() => openAuthModal('login')}
              className="w-full bg-[#1B3626] text-[#FAF6F0] py-3.5 rounded-xl text-xs uppercase font-bold tracking-widest hover:bg-[#274A36] transition-all shadow-md"
            >
              Sign In to Your Account
            </button>
            <button
              onClick={() => openAuthModal('signup')}
              className="w-full bg-[#EAE4D8] text-[#1B3626] py-3 rounded-xl text-xs uppercase font-bold tracking-widest hover:bg-[#DDD6C5] transition-all"
            >
              Create New Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#FAF6F0]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Profile Banner Card */}
        <div className="bg-white rounded-3xl border border-[#E5DFC9] shadow-md p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1B3626]/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left z-10">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#1B3626] text-[#D49B35] border-4 border-[#E5DFC9] shadow-md flex items-center justify-center font-serif text-3xl font-bold overflow-hidden shrink-0">
                <User className="w-10 h-10 sm:w-12 sm:h-12 text-[#D49B35]" />
              </div>
              {user.membershipBadge && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#D49B35] text-[#1B3626] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap shadow-xs">
                  ★ Gold
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B3626]">{user.name}</h1>
                <span className="bg-[#1B3626]/10 text-[#1B3626] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#1B3626]/20">
                  {user.membershipBadge || 'Himalayan Explorer'}
                </span>
              </div>
              <p className="text-xs text-[#664936] flex items-center justify-center sm:justify-start gap-3">
                <span>📧 {user.email}</span>
                <span>•</span>
                <span>📱 {user.phone}</span>
              </p>
              <p className="text-[11px] text-[#664936]/80 pt-0.5">
                Member since <strong className="text-[#1B3626]">{user.joinedDate}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 z-10 w-full sm:w-auto">
            <Link
              href="/products"
              className="flex-1 sm:flex-none text-center bg-[#FAF6F0] border border-[#E5DFC9] text-[#1B3626] hover:bg-[#EAE4D8] px-4 py-2.5 rounded-xl text-xs uppercase font-bold tracking-wider transition-colors"
            >
              Shop Store
            </Link>
            <button
              onClick={logout}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 px-4 py-2.5 rounded-xl text-xs uppercase font-bold tracking-wider transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Main Content (Tabs Header) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            <div className="bg-white rounded-2xl border border-[#E5DFC9] p-3 shadow-xs space-y-1">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs uppercase font-bold tracking-wider transition-all ${
                  activeTab === 'orders'
                    ? 'bg-[#1B3626] text-[#FAF6F0] shadow-sm'
                    : 'text-[#664936] hover:bg-[#FAF6F0]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4" />
                  <span>My Orders</span>
                </div>
                <span className="bg-white/20 text-current text-[10px] px-2 py-0.5 rounded-full font-mono">
                  {customerOrders.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs uppercase font-bold tracking-wider transition-all ${
                  activeTab === 'addresses'
                    ? 'bg-[#1B3626] text-[#FAF6F0] shadow-sm'
                    : 'text-[#664936] hover:bg-[#FAF6F0]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4" />
                  <span>Saved Addresses</span>
                </div>
                <span className="bg-white/20 text-current text-[10px] px-2 py-0.5 rounded-full font-mono">
                  {user.addresses.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs uppercase font-bold tracking-wider transition-all ${
                  activeTab === 'profile'
                    ? 'bg-[#1B3626] text-[#FAF6F0] shadow-sm'
                    : 'text-[#664936] hover:bg-[#FAF6F0]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Settings className="w-4 h-4" />
                  <span>Account Settings</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('rewards')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs uppercase font-bold tracking-wider transition-all ${
                  activeTab === 'rewards'
                    ? 'bg-[#1B3626] text-[#FAF6F0] shadow-sm'
                    : 'text-[#664936] hover:bg-[#FAF6F0]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Coins className="w-4 h-4 text-[#D49B35]" />
                  <span>Credit Points & Rewards</span>
                </div>
                <span className="bg-[#D49B35] text-[#1B3626] text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
                  {user.rewardPoints || 0} pts
                </span>
              </button>
            </div>

            {/* Quick Links Card */}
            <div className="bg-[#1B3626] text-[#FAF6F0] rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <Mountain className="w-5 h-5 text-[#D49B35]" />
                <span className="font-serif font-bold text-sm text-[#D49B35]">Pahadi Sher Club</span>
              </div>
              <p className="text-xs text-[#FAF6F0]/80 leading-relaxed">
                Enjoy 100% pure Himalayan high altitude Shilajit, Ghee & Honey harvested sustainably above 18,000 ft.
              </p>
              <Link
                href="/wishlist"
                className="inline-flex items-center gap-2 text-xs text-[#D49B35] font-bold hover:underline pt-1"
              >
                <Heart className="w-3.5 h-3.5" />
                <span>View My Saved Wishlist →</span>
              </Link>
            </div>
          </div>

          {/* Right Main Tab Area */}
          <div className="lg:col-span-3">
            
            {/* TAB 1: ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#E5DFC9] pb-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1B3626]">Order History</h3>
                    <p className="text-xs text-[#664936]">Track status, view items & download invoices.</p>
                  </div>
                  <Link
                    href="/products"
                    className="bg-[#1B3626] text-[#FAF6F0] px-4 py-2 rounded-xl text-xs uppercase font-bold tracking-wider hover:bg-[#274A36] transition-colors"
                  >
                    + Place New Order
                  </Link>
                </div>

                {customerOrders.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-[#E5DFC9] p-12 text-center space-y-4">
                    <Package className="w-12 h-12 text-[#664936]/40 mx-auto" />
                    <h4 className="font-serif text-lg font-bold text-[#1B3626]">No Orders Placed Yet</h4>
                    <p className="text-xs text-[#664936] max-w-sm mx-auto">
                      Explore our high altitude Himalayan organic harvest and place your first order.
                    </p>
                    <Link
                      href="/products"
                      className="inline-block bg-[#1B3626] text-[#FAF6F0] px-6 py-3 rounded-xl text-xs uppercase font-bold tracking-widest hover:bg-[#274A36]"
                    >
                      Shop Products Now
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {customerOrders.map((ord) => (
                      <div key={ord.id} className="bg-white rounded-2xl border border-[#E5DFC9] shadow-sm p-6 space-y-4">
                        {/* Order Card Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5DFC9] pb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-serif font-bold text-lg text-[#1B3626]">{ord.orderNumber}</span>
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                ord.status === 'Shipped' || ord.status === 'Delivered'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : 'bg-amber-100 text-amber-800 border border-amber-300'
                              }`}>
                                {ord.status}
                              </span>
                            </div>
                            <p className="text-xs text-[#664936] mt-0.5">Placed on {ord.date}</p>
                          </div>

                          <div className="flex items-center gap-3">
                            {ord.trackingUrl && (
                              <a
                                href={ord.trackingUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 bg-[#FAF6F0] border border-[#E5DFC9] text-[#1B3626] hover:bg-[#EAE4D8] px-3 py-1.5 rounded-xl text-xs font-semibold"
                              >
                                <Truck className="w-3.5 h-3.5 text-[#D49B35]" />
                                <span>Track Shipment</span>
                                <ExternalLink className="w-3 h-3 text-[#664936]" />
                              </a>
                            )}
                            <span className="font-serif text-lg font-bold text-[#1B3626]">
                              ₹{ord.totalAmount.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        {/* Items List */}
                        <div className="space-y-3">
                          {ord.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 py-2 border-b border-[#E5DFC9]/50 last:border-0">
                              <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#FAF6F0] border border-[#E5DFC9] shrink-0 relative">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-serif font-bold text-xs sm:text-sm text-[#1B3626] truncate">{item.name}</h5>
                                <p className="text-[11px] text-[#664936]">Qty: {item.quantity} • ₹{item.price}</p>
                              </div>
                              <span className="font-semibold text-xs text-[#1B3626]">
                                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order Card Footer */}
                        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-[#664936] gap-2 bg-[#FAF6F0] p-3 rounded-xl">
                          <div>
                            <span className="font-semibold">Payment Method:</span> {ord.paymentMethod} ({ord.paymentStatus})
                          </div>
                          {ord.courierPartner && (
                            <div>
                              <span className="font-semibold">Courier:</span> {ord.courierPartner}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SAVED ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#E5DFC9] pb-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1B3626]">Saved Delivery Addresses</h3>
                    <p className="text-xs text-[#664936]">Manage shipping locations for faster checkout.</p>
                  </div>
                  <button
                    onClick={() => setAddressModalOpen(true)}
                    className="bg-[#1B3626] text-[#FAF6F0] px-4 py-2 rounded-xl text-xs uppercase font-bold tracking-wider hover:bg-[#274A36] flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Address</span>
                  </button>
                </div>

                {user.addresses.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-[#E5DFC9] p-12 text-center space-y-4">
                    <MapPin className="w-12 h-12 text-[#664936]/40 mx-auto" />
                    <h4 className="font-serif text-lg font-bold text-[#1B3626]">No Saved Addresses</h4>
                    <p className="text-xs text-[#664936] max-w-sm mx-auto">
                      Add a delivery address to speed up your Himalayan checkout process.
                    </p>
                    <button
                      onClick={() => setAddressModalOpen(true)}
                      className="bg-[#1B3626] text-[#FAF6F0] px-6 py-3 rounded-xl text-xs uppercase font-bold tracking-widest hover:bg-[#274A36]"
                    >
                      + Add Address Now
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user.addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className={`bg-white rounded-2xl border p-5 space-y-3 relative shadow-xs ${
                          addr.isDefault ? 'border-[#D49B35] ring-1 ring-[#D49B35]' : 'border-[#E5DFC9]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs uppercase tracking-wider bg-[#FAF6F0] text-[#1B3626] px-2.5 py-1 rounded-lg border border-[#E5DFC9]">
                              {addr.label}
                            </span>
                            {addr.isDefault && (
                              <span className="bg-[#D49B35] text-[#1B3626] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                                Default Address
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => deleteAddress(addr.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Address"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-1 text-xs text-[#664936]">
                          <h5 className="font-serif font-bold text-sm text-[#1B3626]">{addr.fullName}</h5>
                          <p>{addr.street}</p>
                          {addr.landmark && <p className="text-[11px] text-[#664936]/80">Landmark: {addr.landmark}</p>}
                          <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                          <p className="pt-1 font-semibold text-[#1B3626]">📱 {addr.phone}</p>
                        </div>

                        {!addr.isDefault && (
                          <div className="pt-2 border-t border-[#E5DFC9]">
                            <button
                              onClick={() => setDefaultAddress(addr.id)}
                              className="text-xs text-[#B85D3B] font-semibold hover:underline"
                            >
                              Set as Default Address
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: PROFILE SETTINGS */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="border-b border-[#E5DFC9] pb-4">
                  <h3 className="font-serif text-xl font-bold text-[#1B3626]">Account Profile</h3>
                  <p className="text-xs text-[#664936]">Update personal details & contact preferences.</p>
                </div>

                {profileMsg && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-xl text-xs flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{profileMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl border border-[#E5DFC9] p-6 space-y-4 max-w-xl">
                  <div>
                    <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#664936] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-[#FAF6F0] border border-[#E5DFC9] rounded-xl px-4 py-3 text-xs text-[#1C241E] focus:outline-none focus:ring-2 focus:ring-[#D49B35]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#664936] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full bg-[#FAF6F0] border border-[#E5DFC9] rounded-xl px-4 py-3 text-xs text-[#1C241E] focus:outline-none focus:ring-2 focus:ring-[#D49B35]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#664936] mb-1">
                      Mobile Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full bg-[#FAF6F0] border border-[#E5DFC9] rounded-xl px-4 py-3 text-xs text-[#1C241E] focus:outline-none focus:ring-2 focus:ring-[#D49B35]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-[#1B3626] text-[#FAF6F0] px-6 py-3 rounded-xl text-xs uppercase font-bold tracking-widest hover:bg-[#274A36] transition-all shadow-md"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 4: CREDIT POINTS & REWARDS */}
            {activeTab === 'rewards' && (
              <div className="space-y-6">
                <div className="border-b border-[#E5DFC9] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1B3626]">Credit Points & Loyalty Rewards</h3>
                    <p className="text-xs text-[#664936]">Earn 100 points on orders over ₹999. Redeem 1 point = ₹1 on any product!</p>
                  </div>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-1.5 bg-[#1B3626] text-[#FAF6F0] px-4 py-2 rounded-xl text-xs uppercase font-bold tracking-wider hover:bg-[#274A36] shrink-0"
                  >
                    <span>Shop & Earn Points</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* 1. Credit Points Balance & Status Hero Banner */}
                <div className="bg-gradient-to-br from-[#1B3626] via-[#244733] to-[#12251A] text-[#FAF6F0] rounded-3xl p-6 sm:p-8 border border-[#D49B35]/40 shadow-lg relative overflow-hidden space-y-6">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[#D49B35]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 z-10 relative">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                        <Coins className="w-4 h-4 text-[#D49B35]" />
                        <span className="text-[11px] font-bold uppercase tracking-widest text-[#D49B35]">
                          Total Loyalty Credit Points
                        </span>
                      </div>
                      <div className="flex items-baseline gap-3">
                        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#FAF6F0]">
                          {(user.rewardPoints || 0).toLocaleString('en-IN')}
                        </h2>
                        <span className="text-sm sm:text-base text-[#D49B35] font-semibold">
                          Points = ₹{(user.rewardPoints || 0).toLocaleString('en-IN')} Value
                        </span>
                      </div>
                      <p className="text-xs text-[#FAF6F0]/80">
                        1 Credit Point = 1 Indian Rupee discount value on product purchases.
                      </p>
                    </div>

                    <div className="w-full md:w-auto bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl space-y-2 text-center md:text-right shrink-0">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#FAF6F0]/70 block">
                        Redemption Status
                      </span>
                      {(user.rewardPoints || 0) > 999 ? (
                        <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                          <Unlock className="w-3.5 h-3.5 text-emerald-300" />
                          <span>Redemption Unlocked</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-400/40 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                          <Lock className="w-3.5 h-3.5 text-amber-300" />
                          <span>Locked (Collect &gt; 999 Points)</span>
                        </div>
                      )}
                      <p className="text-[11px] text-[#FAF6F0]/70 pt-1">
                        {(user.rewardPoints || 0) > 999
                          ? 'You can redeem your points at checkout now!'
                          : `Need ${1000 - (user.rewardPoints || 0)} more points to unlock redemption.`}
                      </p>
                    </div>
                  </div>

                  {/* Progress Meter to 1,000 Points Threshold */}
                  <div className="pt-4 border-t border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#FAF6F0]/90 font-medium">Redemption Eligibility Goal (1,000 Points Threshold)</span>
                      <span className="font-bold text-[#D49B35]">
                        {Math.min(100, Math.round(((user.rewardPoints || 0) / 1000) * 100))}% Completed
                      </span>
                    </div>
                    <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden border border-white/10 p-0.5">
                      <div
                        className="h-full bg-gradient-to-r from-[#D49B35] via-[#F4C46D] to-emerald-400 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.round(((user.rewardPoints || 0) / 1000) * 100))}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Rules & Earning Guide Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl border border-[#E5DFC9] p-5 shadow-xs space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-[#1B3626]/10 text-[#1B3626] flex items-center justify-center font-bold">
                      🛍️
                    </div>
                    <h4 className="font-serif font-bold text-sm text-[#1B3626]">Buy Above ₹999</h4>
                    <p className="text-xs text-[#664936] leading-relaxed">
                      Every time you place an order with subtotal above ₹999, get <strong>100 Credit Points</strong> credited automatically.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#E5DFC9] p-5 shadow-xs space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-[#D49B35]/20 text-[#1B3626] flex items-center justify-center font-bold">
                      🪙
                    </div>
                    <h4 className="font-serif font-bold text-sm text-[#1B3626]">1 Point = ₹1 Rupee</h4>
                    <p className="text-xs text-[#664936] leading-relaxed">
                      Every credit point is equal to <strong>₹1 Indian Rupee</strong>. 500 points = ₹500 instant discount on products.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#E5DFC9] p-5 shadow-xs space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                      🎁
                    </div>
                    <h4 className="font-serif font-bold text-sm text-[#1B3626]">Redeem Above 999 Pts</h4>
                    <p className="text-xs text-[#664936] leading-relaxed">
                      Redemption unlocks once your balance passes 999 points. Choose how many points to redeem at checkout!
                    </p>
                  </div>
                </div>

                {/* 3. Transaction History Log Table */}
                <div className="bg-white rounded-2xl border border-[#E5DFC9] shadow-sm p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E5DFC9] pb-3">
                    <div className="flex items-center gap-2">
                      <History className="w-4 h-4 text-[#1B3626]" />
                      <h4 className="font-serif font-bold text-base text-[#1B3626]">Points Activity & Transaction Log</h4>
                    </div>
                    <span className="text-xs text-[#664936]">
                      {user.pointsHistory?.length || 0} Transactions Recorded
                    </span>
                  </div>

                  {!user.pointsHistory || user.pointsHistory.length === 0 ? (
                    <div className="py-8 text-center text-xs text-[#664936] space-y-2">
                      <Coins className="w-8 h-8 text-[#664936]/40 mx-auto" />
                      <p>No credit point activity logged yet.</p>
                      <p className="text-[11px] text-[#664936]/70">Place an order above ₹999 to earn your first 100 points!</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#E5DFC9] text-[#664936] font-bold uppercase tracking-wider text-[10px] bg-[#FAF6F0]">
                            <th className="py-2.5 px-3">Date</th>
                            <th className="py-2.5 px-3">Type</th>
                            <th className="py-2.5 px-3">Description</th>
                            <th className="py-2.5 px-3 text-right">Points</th>
                            <th className="py-2.5 px-3 text-right">Balance</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5DFC9]/60">
                          {user.pointsHistory.map((tx) => (
                            <tr key={tx.id} className="hover:bg-[#FAF6F0]/50 transition-colors">
                              <td className="py-3 px-3 whitespace-nowrap text-[#664936]">{tx.date}</td>
                              <td className="py-3 px-3 whitespace-nowrap">
                                {tx.type === 'earned' ? (
                                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                                    <TrendingUp className="w-3 h-3" /> Earned
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-300">
                                    <Gift className="w-3 h-3" /> Redeemed
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-3 text-[#1B3626] font-medium max-w-xs truncate">
                                {tx.description}
                                {tx.orderId && (
                                  <span className="block text-[10px] text-[#664936] font-mono">
                                    Ref: {tx.orderId}
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-3 text-right font-bold font-mono">
                                {tx.type === 'earned' ? (
                                  <span className="text-emerald-700">+{tx.points} pts</span>
                                ) : (
                                  <span className="text-rose-700">-{tx.points} pts</span>
                                )}
                              </td>
                              <td className="py-3 px-3 text-right font-semibold font-mono text-[#1B3626]">
                                {tx.balanceAfter !== undefined ? `${tx.balanceAfter} pts` : '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* 4. Store Coupons */}
                <div className="space-y-3 pt-4 border-t border-[#E5DFC9]">
                  <h4 className="font-serif font-bold text-base text-[#1B3626]">Store Promo Coupons</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-[#1B3626] to-[#274A36] text-[#FAF6F0] p-5 rounded-2xl border border-[#D49B35]/40 shadow-sm space-y-2 relative overflow-hidden">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#D49B35] bg-white/10 px-2.5 py-1 rounded-full">
                          Welcome Offer
                        </span>
                        <Sparkles className="w-4 h-4 text-[#D49B35]" />
                      </div>
                      <div>
                        <h5 className="font-serif text-xl font-bold text-[#FAF6F0]">PAHADI10</h5>
                        <p className="text-xs text-[#FAF6F0]/80">Get 10% OFF on all Himalayan Shilajit & Ghee orders.</p>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText('PAHADI10');
                          alert('Coupon code PAHADI10 copied to clipboard!');
                        }}
                        className="w-full bg-[#D49B35] text-[#1B3626] py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#c08b2c]"
                      >
                        Copy Code: PAHADI10
                      </button>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-[#E5DFC9] shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#B85D3B] bg-orange-50 px-2.5 py-1 rounded-full">
                          Special Benefit
                        </span>
                        <Sparkles className="w-4 h-4 text-[#B85D3B]" />
                      </div>
                      <div>
                        <h5 className="font-serif text-xl font-bold text-[#1B3626]">WELCOME15</h5>
                        <p className="text-xs text-[#664936]">Flat ₹150 OFF on orders above ₹1,499.</p>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText('WELCOME15');
                          alert('Coupon code WELCOME15 copied to clipboard!');
                        }}
                        className="w-full bg-[#FAF6F0] border border-[#E5DFC9] text-[#1B3626] py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#EAE4D8]"
                      >
                        Copy Code: WELCOME15
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      {addressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setAddressModalOpen(false)}
            className="fixed inset-0 bg-[#162F21]/70 backdrop-blur-sm"
          />
          <div className="relative bg-[#FAF6F0] w-full max-w-lg rounded-3xl shadow-2xl border border-[#E5DFC9] p-6 sm:p-8 z-10 space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setAddressModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#1C241E] hover:bg-[#EAE4D8] rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-[#1B3626]">Add New Delivery Address</h3>

            <form onSubmit={handleAddAddressSubmit} className="space-y-3">
              <div>
                <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-[#664936] mb-1">
                  Address Tag / Label
                </label>
                <div className="flex gap-2">
                  {(['Home', 'Work', 'Parents House', 'Other'] as const).map((lbl) => (
                    <button
                      key={lbl}
                      type="button"
                      onClick={() => setNewAddrLabel(lbl)}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                        newAddrLabel === lbl
                          ? 'bg-[#1B3626] text-[#FAF6F0] border-[#1B3626]'
                          : 'bg-white text-[#664936] border-[#E5DFC9]'
                      }`}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-[#664936] mb-1">
                  Full Recipient Name *
                </label>
                <input
                  type="text"
                  required
                  value={newAddrFullName}
                  onChange={(e) => setNewAddrFullName(e.target.value)}
                  className="w-full bg-white border border-[#E5DFC9] rounded-xl px-3 py-2 text-xs text-[#1C241E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-[#664936] mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newAddrPhone}
                    onChange={(e) => setNewAddrPhone(e.target.value)}
                    className="w-full bg-white border border-[#E5DFC9] rounded-xl px-3 py-2 text-xs text-[#1C241E]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-[#664936] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newAddrEmail}
                    onChange={(e) => setNewAddrEmail(e.target.value)}
                    className="w-full bg-white border border-[#E5DFC9] rounded-xl px-3 py-2 text-xs text-[#1C241E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-[#664936] mb-1">
                  Flat / Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={newAddrStreet}
                  onChange={(e) => setNewAddrStreet(e.target.value)}
                  placeholder="Flat 402, Oakwood Greens..."
                  className="w-full bg-white border border-[#E5DFC9] rounded-xl px-3 py-2 text-xs text-[#1C241E]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-[#664936] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddrCity}
                    onChange={(e) => setNewAddrCity(e.target.value)}
                    placeholder="Bengaluru"
                    className="w-full bg-white border border-[#E5DFC9] rounded-xl px-3 py-2 text-xs text-[#1C241E]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-[#664936] mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddrState}
                    onChange={(e) => setNewAddrState(e.target.value)}
                    placeholder="Karnataka"
                    className="w-full bg-white border border-[#E5DFC9] rounded-xl px-3 py-2 text-xs text-[#1C241E]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-[#664936] mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddrPincode}
                    onChange={(e) => setNewAddrPincode(e.target.value)}
                    placeholder="560038"
                    className="w-full bg-white border border-[#E5DFC9] rounded-xl px-3 py-2 text-xs text-[#1C241E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-[#664936] mb-1">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={newAddrLandmark}
                  onChange={(e) => setNewAddrLandmark(e.target.value)}
                  placeholder="Near Indiranagar Club"
                  className="w-full bg-white border border-[#E5DFC9] rounded-xl px-3 py-2 text-xs text-[#1C241E]"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="newAddrIsDefault"
                  checked={newAddrIsDefault}
                  onChange={(e) => setNewAddrIsDefault(e.target.checked)}
                  className="rounded border-[#E5DFC9] text-[#1B3626] focus:ring-[#D49B35]"
                />
                <label htmlFor="newAddrIsDefault" className="text-xs text-[#664936]">
                  Set as default shipping address
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1B3626] text-[#FAF6F0] py-3 rounded-xl text-xs uppercase font-bold tracking-widest hover:bg-[#274A36] transition-all shadow-md mt-2"
              >
                Save Delivery Address
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

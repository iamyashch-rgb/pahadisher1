'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  ShoppingBag, Heart, Search, Menu, X, Mountain, User, 
  ChevronDown, ArrowRight, ShieldCheck, Sparkles, Compass, LayoutDashboard 
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCustomerAuth } from '@/context/CustomerAuthContext';
import { CustomerAuthModal } from '@/components/auth/CustomerAuthModal';
import { categories } from '@/data/categories';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobalSearchModal } from '@/components/search/GlobalSearchModal';

export const Header = () => {
  const pathname = usePathname();
  const { totalItemsCount, toggleCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, openAuthModal, authModalOpen, closeAuthModal } = useCustomerAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [customerLoginOpen, setCustomerLoginOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  const isHome = pathname === '/';
  const isCheckout = pathname === '/checkout';
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (isCheckout) return null;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/our-story' },
    { name: 'Products', href: '/products' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
  ];

  // Warm off-white background matching kumaonorganic header bar
  const isTransparent = false;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E5DFC9] shadow-sm`}
      >
        <div className="max-w-[1408px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-1">
            {/* Left Mobile Menu Toggle & Brand Logo */}
            <div className="flex items-center space-x-3 lg:space-x-0">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className={`lg:hidden p-2 rounded-full transition-colors ${
                  isTransparent ? 'text-white hover:bg-white/10' : 'text-[#1C241E] hover:bg-[#F4EFE6]'
                }`}
                aria-label="Open Mobile Menu"
              >
                <Menu className="w-6 h-6 stroke-[2]" />
              </button>

              <Link href="/" className="flex items-center space-x-2.5 group">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#D49B35] shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0 bg-[#1B3626]">
                  <Image
                    src="/assets/photos/2.jpeg"
                    alt="The Pahadi Sher Logo"
                    fill
                    sizes="36px"
                    className="object-cover object-center rounded-full"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span
                    className={`font-serif text-xl sm:text-2xl font-bold tracking-tight leading-none ${
                      isTransparent ? 'text-white' : 'text-[#1B3626]'
                    }`}
                  >
                    THE PAHADI SHER
                  </span>
                  <span
                    className={`text-[9px] font-sans tracking-[0.22em] uppercase font-semibold mt-0.5 ${
                      isTransparent ? 'text-[#D49B35]' : 'text-[#B85D3B]'
                    }`}
                  >
                    Kumaon & Himalayan Organics
                  </span>
                </div>
              </Link>
            </div>

            {/* Center Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-[12px] uppercase tracking-widest font-sans transition-colors py-1.5 ${
                      isActive
                        ? 'text-[#B85D3B] font-extrabold border-b-2 border-[#B85D3B]'
                        : isTransparent
                        ? 'text-white/90 hover:text-[#D49B35] font-semibold'
                        : 'text-[#1C241E] hover:text-[#1B3626] font-semibold'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons: Search Bar, Customer Login, Admin Centre, Cart */}
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              {/* Header Inline Search Bar (Desktop) */}
              <div 
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex items-center bg-white border border-[#E5DFC9] hover:border-[#D49B35] rounded-full px-3.5 py-1.5 cursor-pointer text-xs text-[#6E7A71] shadow-xs transition-all w-44 lg:w-56 group"
              >
                <Search className="w-4 h-4 text-[#1C241E] group-hover:text-[#D49B35] mr-2 shrink-0" />
                <span className="truncate">Search products...</span>
                <kbd className="ml-auto text-[9px] font-mono bg-[#FAF6F0] border border-[#E5DFC9] px-1.5 py-0.5 rounded text-[#6E7A71] hidden lg:inline-block">⌘K</kbd>
              </div>

              {/* Mobile Search Icon Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="md:hidden p-2 rounded-full text-[#1C241E] hover:bg-[#F4EFE6] transition-colors"
                title="Search Store"
                aria-label="Search"
              >
                <Search className="w-5 h-5 stroke-[2]" />
              </button>

              {/* Customer Account / Login Icon Button */}
              {isAuthenticated ? (
                <Link
                  href="/account"
                  className="p-1.5 sm:px-3 sm:py-1.5 rounded-full text-[#1C241E] hover:text-[#1B3626] hover:bg-[#F4EFE6] transition-colors relative flex items-center gap-2 group border border-[#E5DFC9]"
                  title="My Customer Account"
                  aria-label="My Account"
                >
                  <div className="w-7 h-7 rounded-full bg-[#1B3626] text-[#D49B35] flex items-center justify-center font-bold text-xs shadow-xs">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="hidden xl:inline text-xs font-bold text-[#1B3626]">
                    Hi, {user?.name.split(' ')[0]}
                  </span>
                </Link>
              ) : (
                <button
                  onClick={() => openAuthModal('login')}
                  className="p-2 sm:p-2.5 rounded-full text-[#1C241E] hover:text-[#1B3626] hover:bg-[#F4EFE6] transition-colors relative flex items-center gap-1 group"
                  title="Customer Login / Account"
                  aria-label="Customer Login"
                >
                  <User className="w-5 h-5 stroke-[2] text-[#1B3626] group-hover:scale-105 transition-transform" />
                  <span className="hidden xl:inline text-xs font-semibold text-[#1C241E]">Sign In</span>
                </button>
              )}

              {/* Admin Centre Icon Button */}
              <Link
                href="/admin"
                className="p-2 sm:p-2.5 rounded-full text-[#1C241E] hover:text-[#1B3626] hover:bg-[#F4EFE6] transition-colors relative"
                title="Admin Centre"
                aria-label="Admin Centre"
              >
                <ShieldCheck className="w-5 h-5 stroke-[2] text-[#B85D3B]" />
              </Link>

              {/* Cart Icon Button */}
              <button
                onClick={toggleCart}
                className="p-2 sm:p-2.5 rounded-full text-[#1C241E] hover:text-[#1B3626] hover:bg-[#F4EFE6] transition-colors relative group"
                title="Open Cart"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5 stroke-[2] group-hover:scale-105 transition-transform" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-[#B85D3B] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {totalItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Customer Auth Modal */}
      <CustomerAuthModal isOpen={authModalOpen} onClose={closeAuthModal} />

      {/* Mobile Full-Screen Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-pahadi-charcoal/80 backdrop-blur-md z-50 lg:hidden"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed top-0 left-0 bottom-0 w-full max-w-sm bg-pahadi-offwhite text-pahadi-charcoal z-50 shadow-2xl flex flex-col justify-between overflow-y-auto lg:hidden"
            >
              {/* Mobile Drawer Header */}
              <div className="p-5 border-b border-pahadi-sand flex items-center justify-between bg-pahadi-paper">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-pahadi-green flex items-center justify-center text-pahadi-gold">
                    <Mountain className="w-4 h-4 stroke-[2]" />
                  </div>
                  <span className="font-playfair text-lg font-bold text-pahadi-green">
                    THE PAHADI SHER
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-pahadi-charcoal hover:bg-pahadi-sand rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Menu Body */}
              <div className="p-6 space-y-6 flex-1">
                {/* Search Bar in Mobile Menu */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery.trim()) {
                      setMobileMenuOpen(false);
                      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
                    }
                  }}
                  className="relative"
                >
                  <input
                    type="text"
                    placeholder="Search Shilajit, Pure Cow Ghee..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-pahadi-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-pahadi-green focus:outline-none focus:ring-1 focus:ring-pahadi-green"
                  />
                  <Search className="w-4 h-4 text-pahadi-brown absolute left-3 top-3" />
                </form>

                {/* Categories & Navigation Links */}
                <div className="space-y-1">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-pahadi-brown block mb-2">
                    Catalogue & Categories
                  </span>

                  {isAuthenticated ? (
                    <Link
                      href="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-between py-2.5 font-playfair font-bold text-base text-[#1B3626] border-b border-pahadi-sand/50 text-left"
                    >
                      <span className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#D49B35]" />
                        My Account ({user?.name.split(' ')[0]})
                      </span>
                      <ArrowRight className="w-4 h-4 text-pahadi-gold" />
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openAuthModal('login');
                      }}
                      className="w-full flex items-center justify-between py-2.5 font-playfair font-bold text-base text-[#1B3626] border-b border-pahadi-sand/50 text-left"
                    >
                      <span className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#D49B35]" />
                        Customer Sign In / Register
                      </span>
                      <ArrowRight className="w-4 h-4 text-pahadi-gold" />
                    </button>
                  )}

                  <Link
                    href="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 font-playfair font-bold text-base text-pahadi-green border-b border-pahadi-sand/50"
                  >
                    <span>Shop All Products</span>
                    <ArrowRight className="w-4 h-4 text-pahadi-gold" />
                  </Link>

                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2.5 font-playfair text-base text-pahadi-charcoal hover:text-pahadi-green border-b border-pahadi-sand/40"
                    >
                      {link.name}
                    </Link>
                  ))}

                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2.5 font-playfair text-base text-pahadi-charcoal hover:text-pahadi-green border-b border-pahadi-sand/40"
                  >
                    Admin Dashboard
                  </Link>
                </div>

                {/* Prominent Mobile CTA */}
                <div className="pt-2">
                  <Link
                    href="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full bg-pahadi-green text-pahadi-gold py-3.5 rounded-xl font-sans text-xs uppercase font-bold tracking-widest flex items-center justify-center space-x-2 shadow-md"
                  >
                    <span>Shop Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Trust Seal Card */}
                <div className="bg-pahadi-paper p-4 rounded-2xl border border-pahadi-border text-center space-y-2">
                  <ShieldCheck className="w-6 h-6 text-pahadi-gold mx-auto" />
                  <span className="text-xs font-serif font-bold text-pahadi-green block">
                    100% Himalayan Authenticity
                  </span>
                  <p className="text-[11px] text-pahadi-charcoal-muted">
                    Direct from Kumaon high altitude villages. Pure organic harvest.
                  </p>
                </div>
              </div>

              {/* Mobile Drawer Footer */}
              <div className="p-5 border-t border-pahadi-sand bg-pahadi-paper text-center text-xs text-pahadi-brown">
                © 2026 The Pahadi Sher • Himalayan D2C
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Global Quick Search Overlay */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

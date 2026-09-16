'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Search, Heart, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCustomerAuth } from '@/context/CustomerAuthContext';
import { GlobalSearchModal } from '@/components/search/GlobalSearchModal';

export const MobileBottomNav = () => {
  const pathname = usePathname();
  const { totalItemsCount, toggleCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated, openAuthModal } = useCustomerAuth();
  const [searchOpen, setSearchOpen] = React.useState(false);

  // Hide mobile bottom nav on checkout page
  if (pathname.startsWith('/checkout') || pathname.startsWith('/admin')) {
    return null;
  }

  const navItems = [
    {
      id: 'home',
      name: 'Home',
      href: '/',
      icon: Home,
      isActive: pathname === '/'
    },
    {
      id: 'shop',
      name: 'Catalogue',
      href: '/products',
      icon: Compass,
      isActive: pathname.startsWith('/products') || pathname.startsWith('/categories')
    },
    {
      id: 'account',
      name: isAuthenticated ? 'Account' : 'Sign In',
      href: isAuthenticated ? '/account' : undefined,
      onClick: !isAuthenticated ? () => openAuthModal('login') : undefined,
      icon: User,
      isActive: pathname.startsWith('/account') || pathname.startsWith('/login')
    },
    {
      id: 'wishlist',
      name: 'Wishlist',
      href: '/wishlist',
      icon: Heart,
      badge: wishlistCount,
      isActive: pathname === '/wishlist'
    },
    {
      id: 'cart',
      name: 'Cart',
      onClick: toggleCart,
      icon: ShoppingBag,
      badge: totalItemsCount,
      isActive: false
    }
  ];

  return (
    <>
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#1B3626]/95 backdrop-blur-md border-t border-[#E5DFC9]/30 shadow-2xl py-2 px-2">
        <div className="flex items-center justify-around">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = item.isActive;

            const content = (
              <div className="flex flex-col items-center gap-1 relative py-1 px-3">
                <div className={`relative transition-transform duration-200 ${active ? 'scale-110' : ''}`}>
                  <Icon className={`w-5 h-5 stroke-[2] ${active ? 'text-[#D49B35]' : 'text-[#FAF6F0]/70'}`} />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 w-4 h-4 bg-[#B85D3B] text-white text-[9px] font-bold font-mono rounded-full flex items-center justify-center border border-[#1B3626]">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-sans font-semibold uppercase tracking-wider ${
                  active ? 'text-[#D49B35] font-bold' : 'text-[#FAF6F0]/70'
                }`}>
                  {item.name}
                </span>
              </div>
            );

            if (item.onClick) {
              return (
                <button key={item.id} onClick={item.onClick} className="focus:outline-none">
                  {content}
                </button>
              );
            }

            return (
              <Link key={item.id} href={item.href || '/'}>
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

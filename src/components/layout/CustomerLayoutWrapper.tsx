'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { CartToast } from '@/components/cart/CartToast';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';

export const CustomerLayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <div className="min-h-screen w-full">{children}</div>;
  }

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-grow pb-16 md:pb-0">{children}</main>
      <CartDrawer />
      <CartToast />
      <Footer />
      <MobileBottomNav />
    </>
  );
};

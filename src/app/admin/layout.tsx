import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | The Pahadi Sher',
  description: 'Secure administrative control center for inventory, orders, products, customers, and analytics.',
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}

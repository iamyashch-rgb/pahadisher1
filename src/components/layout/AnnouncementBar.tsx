'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

const announcements = [
  "Limited time offer",
  "Free shipping on orders over ₹500",
  "100% organic ingredients",
  "Sustainably sourced",
  "Shop now and save 20%",
  "Direct from 18,000 Ft Kumaon Mountains",
  "Use Code PAHADI10 for 10% OFF"
];

export const AnnouncementBar = () => {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  return (
    <div className="bg-[#FDF1D8] text-[#3A2B18] text-xs font-sans py-2 px-4 border-b border-[#EEDDB2] overflow-hidden select-none">
      <div className="flex items-center justify-center space-x-6 whitespace-nowrap overflow-x-auto scrollbar-none text-[11.5px] font-medium tracking-wide">
        {announcements.map((item, idx) => (
          <React.Fragment key={idx}>
            <span className="flex items-center space-x-2 shrink-0">
              <span className="text-[#996515] text-[10px]">★</span>
              <span>{item}</span>
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

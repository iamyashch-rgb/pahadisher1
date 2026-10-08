import { NextResponse } from 'next/server';
import { readDb } from '@/utils/serverDb';
import { supabase } from '@/utils/supabaseClient';

export async function GET() {
  try {
    const dbData = readDb();

    // Optionally attempt Supabase sync if tables exist
    try {
      const [
        { data: sProds },
        { data: sOrders },
        { data: sReviews },
        { data: sCoupons },
        { data: sBlogs },
        { data: sCusts }
      ] = await Promise.all([
        supabase.from('products').select('*'),
        supabase.from('orders').select('*'),
        supabase.from('reviews').select('*'),
        supabase.from('coupons').select('*'),
        supabase.from('blog_posts').select('*'),
        supabase.from('customers').select('*')
      ]);

      if (sProds && sProds.length > 0) dbData.products = sProds;
      if (sOrders && sOrders.length > 0) dbData.orders = sOrders;
      if (sReviews && sReviews.length > 0) dbData.reviews = sReviews;
      if (sCoupons && sCoupons.length > 0) dbData.coupons = sCoupons;
      if (sBlogs && sBlogs.length > 0) dbData.blog_posts = sBlogs;
      if (sCusts && sCusts.length > 0) dbData.customers = sCusts;
    } catch (sErr) {
      // Supabase unconfigured or missing tables, fall back to serverDb cleanly
    }

    return NextResponse.json({
      success: true,
      data: dbData
    });
  } catch (error: any) {
    console.error('Error fetching all DB collections:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch database collections' },
      { status: 500 }
    );
  }
}

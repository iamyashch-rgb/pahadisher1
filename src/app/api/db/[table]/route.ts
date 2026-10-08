import { NextResponse } from 'next/server';
import { readDb, saveItem, deleteItem, getCollection, DatabaseStore } from '@/utils/serverDb';
import { supabase } from '@/utils/supabaseClient';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ table: string }> }
) {
  try {
    const resolvedParams = await params;
    const table = resolvedParams.table as keyof DatabaseStore;
    const collection = getCollection(table);

    // Attempt Supabase fetch
    try {
      const { data, error } = await supabase.from(table).select('*');
      if (!error && data && data.length > 0) {
        return NextResponse.json({ success: true, data });
      }
    } catch (e) {
      // Graceful fallback to serverDb
    }

    return NextResponse.json({ success: true, data: collection });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ table: string }> }
) {
  try {
    const resolvedParams = await params;
    const table = resolvedParams.table as keyof DatabaseStore;
    const body = await request.json();

    const savedInServer = saveItem(table, body);

    // Attempt Supabase upsert
    let savedInSupabase = false;
    try {
      const { error } = await supabase.from(table).upsert(body);
      savedInSupabase = !error;
    } catch (e) {
      // Ignore Supabase missing table error
    }

    return NextResponse.json({
      success: true,
      savedInServer,
      savedInSupabase,
      data: body
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ table: string }> }
) {
  try {
    const resolvedParams = await params;
    const table = resolvedParams.table as keyof DatabaseStore;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing id parameter' }, { status: 400 });
    }

    const deletedInServer = deleteItem(table, id);

    // Attempt Supabase delete
    let deletedInSupabase = false;
    try {
      const { error } = await supabase.from(table).delete().eq('id', id);
      deletedInSupabase = !error;
    } catch (e) {
      // Ignore
    }

    return NextResponse.json({
      success: true,
      deletedInServer,
      deletedInSupabase
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

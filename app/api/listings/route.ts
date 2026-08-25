import { NextResponse } from 'next/server';
import { INITIAL_LISTINGS } from '../../../lib/mockData';

let listingsStore = [...INITIAL_LISTINGS];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: listingsStore,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newListing = {
      ...body,
      id: `list-${Date.now()}`,
      createdAt: new Date().toISOString().slice(0, 10),
      status: body.status || 'ready',
    };
    listingsStore = [newListing, ...listingsStore];
    return NextResponse.json({
      success: true,
      data: newListing,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create listing' },
      { status: 400 },
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ success: false, error: 'Missing listing ID' }, { status: 400 });
  }
  listingsStore = listingsStore.filter((l) => l.id !== id);
  return NextResponse.json({ success: true, message: 'Listing deleted' });
}

import { NextResponse } from 'next/server';
import { INITIAL_STORES } from '../../../lib/mockData';
import { Store } from '../../../types';

// In-memory persistent store for API session
let currentStores: Store[] = [...INITIAL_STORES];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const store = currentStores.find((s) => s.id === id);
    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, store });
  }

  return NextResponse.json({
    success: true,
    totalStores: currentStores.length,
    stores: currentStores,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      country,
      countryCode,
      flag,
      currency,
      currencySymbol,
      accountRole,
      appKey,
      appSecret,
    } = body;

    if (!name) {
      return NextResponse.json({ error: 'Store name is required' }, { status: 400 });
    }

    const newStore: Store = {
      id: `store-${Date.now()}`,
      name: name.trim(),
      country: country || 'United States',
      countryCode: countryCode || 'US',
      flag: flag || '🇺🇸',
      currency: currency || 'USD',
      currencySymbol: currencySymbol || '$',
      isConnected: true,
      apiStatus: 'active',
      totalRevenue: 0,
      totalOrders: 0,
      netProfit: 0,
      margin: 0,
      growth: 0,
      lastSyncTime: 'Just now',
      accountRole: accountRole || 'Owner',
    };

    currentStores.push(newStore);

    return NextResponse.json(
      {
        success: true,
        message: `Successfully connected ${newStore.name}`,
        store: newStore,
        stores: currentStores,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Store ID is required' }, { status: 400 });
    }

    const index = currentStores.findIndex((s) => s.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    const [removed] = currentStores.splice(index, 1);
    if (!removed) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Store ${removed.name} disconnected successfully`,
      removedStoreId: id,
      stores: currentStores,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete store' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Store ID is required' }, { status: 400 });
    }

    const store = currentStores.find((s) => s.id === id);
    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    Object.assign(store, updates);

    return NextResponse.json({
      success: true,
      message: 'Store updated successfully',
      store,
      stores: currentStores,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update store' }, { status: 500 });
  }
}

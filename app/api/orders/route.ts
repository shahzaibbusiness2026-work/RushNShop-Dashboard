import { NextResponse } from 'next/server';
import { INITIAL_ORDERS } from '../../../lib/mockData';
import { Order } from '../../../types';

let currentOrders: Order[] = [...INITIAL_ORDERS];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const storeId = searchParams.get('storeId');

  let filtered = currentOrders;
  if (status && status !== 'all') {
    filtered = filtered.filter((o) => o.status === status);
  }
  if (storeId && storeId !== 'all') {
    filtered = filtered.filter((o) => o.storeId === storeId);
  }

  return NextResponse.json({
    success: true,
    totalOrders: filtered.length,
    orders: filtered,
  });
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    const order = currentOrders.find((o) => o.id === id);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (status) {
      order.status = status;
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}

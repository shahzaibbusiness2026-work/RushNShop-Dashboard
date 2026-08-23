import { NextResponse } from 'next/server';
import { INITIAL_PRODUCTS } from '../../../lib/mockData';
import { Product } from '../../../types';

let currentProducts: Product[] = [...INITIAL_PRODUCTS];

export async function GET() {
  return NextResponse.json({
    success: true,
    totalProducts: currentProducts.length,
    products: currentProducts,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      title: body.title || 'New Product',
      sku: body.sku || `RUSH-${Math.floor(1000 + Math.random() * 9000)}`,
      image: body.image || 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=150&auto=format&fit=crop&q=80',
      category: body.category || 'General',
      storeId: body.storeId || 'store-us',
      unitsSold: body.unitsSold || 0,
      revenue: body.revenue || 0,
      cogs: body.cogs || 0,
      shippingCost: body.shippingCost || 0,
      tiktokFees: body.tiktokFees || 0,
      affiliateCommission: body.affiliateCommission || 0,
      adCost: body.adCost || 0,
      totalCost: (body.cogs || 0) + (body.shippingCost || 0) + (body.tiktokFees || 0) + (body.affiliateCommission || 0) + (body.adCost || 0),
      netProfit: (body.revenue || 0) - ((body.cogs || 0) + (body.shippingCost || 0) + (body.tiktokFees || 0) + (body.affiliateCommission || 0) + (body.adCost || 0)),
      margin: body.revenue > 0 ? (((body.revenue - ((body.cogs || 0) + (body.shippingCost || 0) + (body.tiktokFees || 0) + (body.affiliateCommission || 0) + (body.adCost || 0))) / body.revenue) * 100) : 0,
      stock: body.stock || 100,
      status: body.status || 'profitable',
    };

    currentProducts.unshift(newProduct);
    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    const prod = currentProducts.find((p) => p.id === id);
    if (!prod) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    Object.assign(prod, updates);

    // Recalculate profit & margin if costs changed
    prod.totalCost = prod.cogs + prod.shippingCost + prod.tiktokFees + prod.affiliateCommission + prod.adCost;
    prod.netProfit = prod.revenue - prod.totalCost;
    prod.margin = prod.revenue > 0 ? (prod.netProfit / prod.revenue) * 100 : 0;

    return NextResponse.json({ success: true, product: prod });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

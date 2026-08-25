import { NextResponse } from 'next/server';
import { calculateUnitEconomics } from '../../../../lib/calculations';

export async function POST(request: Request) {
  try {
    const { items } = await request.json();
    if (!Array.isArray(items)) {
      return NextResponse.json(
        { success: false, error: 'Items must be an array' },
        { status: 400 },
      );
    }

    const calculated = items.map((item: any) => {
      const calc = calculateUnitEconomics({
        sellingPrice: parseFloat(item.sellingPrice) || 29.99,
        cogs: parseFloat(item.cogs) || 6.5,
        shippingCost: parseFloat(item.shippingCost) || 3.0,
        packagingCost: parseFloat(item.packagingCost) || 0.8,
        tiktokFeePercent: parseFloat(item.tiktokFeePercent) || 5.0,
        paymentFeePercent: 2.9,
        paymentFeeFixed: 0.3,
        affiliatePercent: parseFloat(item.affiliatePercent) || 10.0,
        adCpa: parseFloat(item.adCpa) || 4.5,
        otherExpenses: 0.5,
        targetMarginPercent: 35.0,
      });

      return {
        ...item,
        ...calc,
      };
    });

    return NextResponse.json({
      success: true,
      data: calculated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Bulk calculation failed' },
      { status: 500 },
    );
  }
}

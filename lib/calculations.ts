/**
 * Unit Economics and Profit Calculations Engine
 */

import { calculateUnitEconomics, UnitEconomicsOutput } from './utils';

export { calculateUnitEconomics };
export type { UnitEconomicsOutput };

export interface DetailedProductProfit {
  sellingPrice: number;
  cogs: number;
  shippingCost: number;
  packagingCost: number;
  tiktokFeeAmount: number;
  paymentFeeAmount: number;
  affiliateAmount: number;
  adCpa: number;
  otherExpenses: number;
  totalCost: number;
  netProfit: number;
  netMarginPercent: number;
  breakEvenPrice: number;
  maxAllowableCpa: number;
  recommendedPrice: number;
}

export function calculateDetailedProfit(params: {
  sellingPrice: number;
  cogs: number;
  shippingCost?: number;
  packagingCost?: number;
  tiktokFeePercent?: number;
  paymentFeePercent?: number;
  paymentFeeFixed?: number;
  affiliatePercent?: number;
  adCpa?: number;
  otherExpenses?: number;
  targetMarginPercent?: number;
}): DetailedProductProfit {
  const result = calculateUnitEconomics({
    sellingPrice: params.sellingPrice || 0,
    cogs: params.cogs || 0,
    shippingCost: params.shippingCost || 0,
    packagingCost: params.packagingCost || 0,
    tiktokFeePercent: params.tiktokFeePercent ?? 5.0,
    paymentFeePercent: params.paymentFeePercent ?? 2.9,
    paymentFeeFixed: params.paymentFeeFixed ?? 0.3,
    affiliatePercent: params.affiliatePercent ?? 10.0,
    adCpa: params.adCpa || 0,
    otherExpenses: params.otherExpenses || 0,
    targetMarginPercent: params.targetMarginPercent ?? 35.0,
  });

  return {
    sellingPrice: result.sellingPrice,
    cogs: result.cogs,
    shippingCost: result.shipping,
    packagingCost: result.packaging,
    tiktokFeeAmount: result.tiktokFee,
    paymentFeeAmount: result.paymentFee,
    affiliateAmount: result.affiliateCommission,
    adCpa: result.adCpa,
    otherExpenses: result.otherExpenses,
    totalCost: result.totalCost,
    netProfit: result.netProfit,
    netMarginPercent: result.profitMargin,
    breakEvenPrice: result.breakEvenPrice,
    maxAllowableCpa: result.maxAllowableCpa,
    recommendedPrice: result.recommendedPrice,
  };
}

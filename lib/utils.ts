import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  const symbol =
    currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : currency === 'CAD' ? 'CA$' : '$';
  const absFormatted = Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return amount < 0 ? `-${symbol}${absFormatted}` : `${symbol}${absFormatted}`;
}

export function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}

export function formatPercent(num: number): string {
  return `${num.toFixed(1)}%`;
}

export interface UnitEconomicsOutput {
  sellingPrice: number;
  cogs: number;
  shipmentCharges: number; // Supplier / Freight Inbound
  shippingCost: number; // Customer / 3PL Outbound
  shipping: number; // Combined shipping
  packaging: number;
  tiktokFee: number;
  paymentFee: number;
  affiliateCommission: number;
  adCpa: number;
  otherExpenses: number;
  totalCost: number;
  netProfit: number;
  profitMargin: number;
  breakEvenPrice: number;
  maxAllowableCpa: number;
  recommendedPrice: number;
}

export function calculateUnitEconomics(params: {
  sellingPrice: number;
  cogs: number;
  shipmentCharges?: number; // Inbound freight / shipment charge from supplier
  shippingCost: number; // Outbound customer courier shipping
  packagingCost: number;
  tiktokFeePercent: number; // e.g. 5 for 5%
  paymentFeePercent: number; // e.g. 2.9 for 2.9%
  paymentFeeFixed: number; // e.g. 0.30
  affiliatePercent: number; // e.g. 10 for 10%
  adCpa: number;
  otherExpenses: number;
  targetMarginPercent?: number; // e.g. 40 for 40%
}): UnitEconomicsOutput {
  const {
    sellingPrice,
    cogs,
    shipmentCharges = 0,
    shippingCost,
    packagingCost,
    tiktokFeePercent,
    paymentFeePercent,
    paymentFeeFixed,
    affiliatePercent,
    adCpa,
    otherExpenses,
    targetMarginPercent = 40,
  } = params;

  const totalShipping = shipmentCharges + shippingCost;
  const tiktokFee = (sellingPrice * tiktokFeePercent) / 100;
  const paymentFee = (sellingPrice * paymentFeePercent) / 100 + paymentFeeFixed;
  const affiliateCommission = (sellingPrice * affiliatePercent) / 100;

  const totalCost =
    cogs +
    totalShipping +
    packagingCost +
    tiktokFee +
    paymentFee +
    affiliateCommission +
    adCpa +
    otherExpenses;
  const netProfit = sellingPrice - totalCost;
  const profitMargin = sellingPrice > 0 ? (netProfit / sellingPrice) * 100 : 0;

  // Fixed unit costs without percent-based fees
  const fixedUnitCosts =
    cogs + totalShipping + packagingCost + adCpa + otherExpenses + paymentFeeFixed;
  const variableFeeRate = (tiktokFeePercent + paymentFeePercent + affiliatePercent) / 100;

  // Break-even selling price = fixedUnitCosts / (1 - variableFeeRate)
  const breakEvenPrice = variableFeeRate < 1 ? fixedUnitCosts / (1 - variableFeeRate) : 0;

  // Max CPA to still break even = Selling Price - all other costs (excluding adCpa)
  const costsWithoutAd =
    cogs +
    totalShipping +
    packagingCost +
    tiktokFee +
    paymentFee +
    affiliateCommission +
    otherExpenses;
  const maxAllowableCpa = Math.max(0, sellingPrice - costsWithoutAd);

  // Recommended price for target margin
  // Target Margin T = (Price - TotalCost) / Price
  // Price = fixedUnitCosts / (1 - variableFeeRate - (targetMargin / 100))
  const targetRate = targetMarginPercent / 100;
  const divisor = 1 - variableFeeRate - targetRate;
  const recommendedPrice = divisor > 0 ? fixedUnitCosts / divisor : breakEvenPrice * 1.5;

  return {
    sellingPrice,
    cogs,
    shipmentCharges,
    shippingCost,
    shipping: totalShipping,
    packaging: packagingCost,
    tiktokFee,
    paymentFee,
    affiliateCommission,
    adCpa,
    otherExpenses,
    totalCost,
    netProfit,
    profitMargin,
    breakEvenPrice,
    maxAllowableCpa,
    recommendedPrice,
  };
}


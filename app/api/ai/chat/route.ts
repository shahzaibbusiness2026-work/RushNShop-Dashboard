import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const lower = query.toLowerCase();
    let responseText = '';
    let metrics: any[] = [];
    let actionSuggestion = '';

    if (lower.includes('profit') || lower.includes('profitable')) {
      responseText = `🌟 **Top Performer Analysis**: **Portable Blender (SKU: RUSH-BLD-01)** generated the highest net profit across all stores this week with **$2,230.40 Net Profit** on **$4,245.80 Revenue** (52.5% Net Margin).\n\nKey growth drivers:\n- Blended TikTok Ads ROAS is strong at **4.31x** on the "Summer Sale" campaign.\n- Return rate is extremely low at only **0.8%**.\n- Average shipping cost is stable at **$3.00/unit**.\n\nRecommendation: Increase daily ad budget by **25%** on USA Store.`;
      metrics = [
        { label: 'Net Profit', value: '$2,230.40', trend: 'up' },
        { label: 'Net Margin', value: '52.5%', trend: 'up' },
        { label: 'Ad ROAS', value: '4.31x', trend: 'up' },
      ];
      actionSuggestion = 'Scale "Summer Sale" Ad Budget';
    } else if (lower.includes('stop') || lower.includes('pause') || lower.includes('bleed')) {
      responseText = `⚠️ **Ad Optimization Alert**: You should pause or restructure **"Sunset Lamp Broad Test"** immediately.\n\nFinancial Diagnostics:\n- Total Ad Spend: **$210.00**\n- Revenue: **$260.00**\n- Net Loss: **-$110.00** after COGS & shipping\n- CPA is **$26.25**, which exceeds your maximum break-even CPA of **$14.80**.\n\nStopping this campaign will instantly recover **~$45/day in lost profit**.`;
      metrics = [
        { label: 'Campaign Loss', value: '-$110.00', trend: 'down' },
        { label: 'Actual CPA', value: '$26.25', trend: 'down' },
        { label: 'Max Allowable CPA', value: '$14.80' },
      ];
      actionSuggestion = 'Pause Sunset Lamp Campaign';
    } else if (lower.includes('scale')) {
      responseText = `🚀 **Scale Opportunity Identified**: **LED Strip Lights (SKU: RUSH-LED-RGB)** is your best candidate for immediate scaling.\n\n- Gross margin is high at **48.6%**.\n- Current stock level is healthy (**890 units** in UK & US 3PL warehouses).\n- Retargeting CPA is exceptionally low at **$9.20** with **3.16x ROAS**.\n\nRecommendation: Duplicate the top-performing UGC video hook #2 into TikTok Spark Ads.`;
      metrics = [
        { label: 'Stock Buffer', value: '890 units' },
        { label: 'Margin', value: '48.6%', trend: 'up' },
        { label: 'CPA', value: '$9.20' },
      ];
      actionSuggestion = 'Launch TikTok Spark Ads for LED Lights';
    } else {
      responseText = `Based on your combined data across **4 TikTok Shops** ($25,430.80 Total Revenue, 52.0% Net Margin, 840 Orders):\n\nYour business is operating at strong efficiency. Total COGS represents **32.5%** of revenue, TikTok platform fees are **9.3%**, and advertising spend is **9.2%**.`;
    }

    return NextResponse.json({
      success: true,
      text: responseText,
      metrics,
      actionSuggestion,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process AI query' }, { status: 500 });
  }
}

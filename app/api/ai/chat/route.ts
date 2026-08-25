import { NextResponse } from 'next/server';
import { executeAIChat } from '../../../../lib/server/aiConfig';

const TIKTOK_FINANCIAL_SYSTEM_PROMPT = `
You are the master AI Business Advisor & Quantitative CFO for RushNshop, a multi-account TikTok Shop operating system.
Your mission is to provide concise, data-backed financial and operational recommendations to help the store owner maximize true net take-home profit.

Context on RushNshop TikTok Shops:
- Tracks Gross GMV, product supplier COGS, 3PL packaging & shipping costs, TikTok 5% platform fees, Stripe payment processing fees (2.9% + $0.30), creator affiliate splits (typically 10-15%), and TikTok Spark Ads CPA.
- 4 Active Stores: RushNshop US Official, RushNshop UK Direct, RushNshop DE Store, RushNshop CA Direct.
- Current Blended Metrics: $25,430.80 Revenue, $13,224.00 Net Profit (52.0% Net Margin), 840 Orders, $30.27 AOV, 3.82x Blended ROAS.
- Best Selling SKU: Portable Blender (RUSH-BLD-01, 52.5% Net Margin, 4.31x ROAS).
- Struggling Campaign: Sunset Lamp Broad Test (CPA $26.25 vs max allowable CPA $14.80 -> recommended to pause).

Formatting Guidelines:
- Use bolding, structured bullet points, and emoji highlights.
- Highlight exact dollar amounts and percentage margins.
- Provide direct, actionable "Next Steps" or "Recommendations".
`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, messages, storeContext } = body;

    let chatMessages: any[] = [{ role: 'system', content: TIKTOK_FINANCIAL_SYSTEM_PROMPT }];

    if (Array.isArray(messages) && messages.length > 0) {
      chatMessages = [
        { role: 'system', content: TIKTOK_FINANCIAL_SYSTEM_PROMPT },
        ...messages.map((m: any) => ({
          role: m.role || (m.sender === 'user' ? 'user' : 'assistant'),
          content: m.content || m.text || '',
        })),
      ];
    } else if (query) {
      chatMessages.push({ role: 'user', content: query });
    } else {
      return NextResponse.json({ error: 'Query or messages array is required.' }, { status: 400 });
    }

    const result = await executeAIChat(chatMessages, storeContext);

    return NextResponse.json({
      success: true,
      text: result.text,
      provider: result.provider,
      model: result.model,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to process AI chat query',
      },
      { status: 500 },
    );
  }
}

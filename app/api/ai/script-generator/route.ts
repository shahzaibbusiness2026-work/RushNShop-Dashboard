import { NextResponse } from 'next/server';
import { executeAIChat } from '../../../../lib/server/aiConfig';

const SCRIPT_SYSTEM_PROMPT = `
You are a viral TikTok Shop Direct-Response Copywriter & Content Strategist.
Generate high-converting TikTok Shop scripts, visual hooks, and SEO product listings.

When given product details, output a structured response with:
1. 🎯 Three 3-Second Visual & Audio Hooks (Curiosity, Problem-Agitate, Transformation)
2. 🎬 Complete 30-Second Scene-by-Scene Script (Visual Action, Spoken Audio Voiceover, On-Screen Text)
3. 📦 High-Converting SEO Bullet Points (3-4 benefit-driven bullet points with emojis)
4. 🏷️ Top 5 Viral TikTok Hashtags & Recommended Sound Style
`;

export async function POST(request: Request) {
  try {
    const { productName, targetAudience, price, sellingAngle } = await request.json();

    if (!productName) {
      return NextResponse.json({ error: 'Product name is required' }, { status: 400 });
    }

    const prompt = `
Product Name: ${productName}
Target Audience: ${targetAudience || 'TikTok Gen-Z & Millennial Shoppers'}
Selling Price: $${price || '29.99'}
Primary Selling Angle: ${sellingAngle || 'High convenience & viral problem solver'}

Generate the complete viral TikTok Shop video script package and listing copy.
`;

    const result = await executeAIChat([
      { role: 'system', content: SCRIPT_SYSTEM_PROMPT },
      { role: 'user', content: prompt },
    ]);

    return NextResponse.json({
      success: true,
      script: result.text,
      provider: result.provider,
      model: result.model,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to generate TikTok script',
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import {
  getServerAIConfig,
  updateServerAIConfig,
  getMaskedApiKey,
} from '../../../../lib/server/aiConfig';

export async function GET() {
  try {
    const config = getServerAIConfig();
    return NextResponse.json({
      success: true,
      provider: config.provider,
      model: config.model,
      customBaseUrl: config.customBaseUrl || '',
      temperature: config.temperature ?? 0.7,
      maxTokens: config.maxTokens ?? 1500,
      hasKey: Boolean(config.apiKey),
      maskedKey: getMaskedApiKey(config.apiKey),
      status: config.apiKey
        ? 'Connected to ' + config.provider.toUpperCase()
        : 'Intelligent Server Engine',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to get AI config' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { provider, apiKey, model, customBaseUrl, temperature, maxTokens } = body;

    const updated = updateServerAIConfig({
      ...(provider ? { provider } : {}),
      ...(apiKey !== undefined ? { apiKey } : {}),
      ...(model ? { model } : {}),
      ...(customBaseUrl !== undefined ? { customBaseUrl } : {}),
      ...(temperature !== undefined ? { temperature } : {}),
      ...(maxTokens !== undefined ? { maxTokens } : {}),
    });

    return NextResponse.json({
      success: true,
      message: 'Server AI configuration securely updated.',
      provider: updated.provider,
      model: updated.model,
      hasKey: Boolean(updated.apiKey),
      maskedKey: getMaskedApiKey(updated.apiKey),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update AI config' },
      { status: 500 },
    );
  }
}

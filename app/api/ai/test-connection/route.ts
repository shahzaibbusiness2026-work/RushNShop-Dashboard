import { NextResponse } from 'next/server';
import { executeAIChat } from '../../../../lib/server/aiConfig';

export async function POST(request: Request) {
  try {
    const startTime = Date.now();
    const result = await executeAIChat([
      {
        role: 'system',
        content: 'You are an AI diagnostic assistant for RushNshop TikTok Shop Operating System. Respond in 1 brief sentence verifying connection.',
      },
      {
        role: 'user',
        content: 'Diagnostic test: Verify AI backend connectivity and model readiness.',
      },
    ]);
    const latency = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      message: 'Backend AI connection verified successfully.',
      provider: result.provider,
      model: result.model,
      latency: `${latency}ms`,
      sampleReply: result.text.slice(0, 120),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to connect to AI provider backend',
      },
      { status: 400 }
    );
  }
}

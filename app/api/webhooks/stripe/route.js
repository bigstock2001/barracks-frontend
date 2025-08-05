import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.text();
    
    console.log('Webhook received:', body.substring(0, 100) + '...');
    
    // For now, just acknowledge the webhook
    return NextResponse.json({ received: true });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
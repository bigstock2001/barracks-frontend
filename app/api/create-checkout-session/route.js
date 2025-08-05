import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // For now, return a mock response until Stripe is properly configured
    const { priceId, customerEmail, heroesDiscount = false } = await request.json();
    
    console.log('Checkout session requested:', { priceId, customerEmail, heroesDiscount });
    
    // In production, this would create a real Stripe session
    return NextResponse.json({ 
      sessionId: 'mock_session_id',
      message: 'Stripe integration pending - contact support to complete subscription'
    });
    
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
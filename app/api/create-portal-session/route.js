import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { customerId } = await request.json();
    
    console.log('Portal session requested for customer:', customerId);
    
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY || 
        process.env.STRIPE_SECRET_KEY === 'your_stripe_secret_key_here' ||
        process.env.STRIPE_SECRET_KEY === '') {
      console.log('Demo mode: Stripe not configured');
      return NextResponse.json({ 
        url: '/account',
        message: 'Demo mode: Billing portal not available'
      });
    }
    
    // For now, redirect to account page
    return NextResponse.json({ 
      url: '/account',
      message: 'Billing portal integration pending'
    });
    
  } catch (error) {
    console.error('Error creating portal session:', error);
    return NextResponse.json(
      { error: 'Error creating portal session' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { customerId } = await request.json();
    
    console.log('Portal session requested for customer:', customerId);
    
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
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { priceId, customerEmail, podcastData, heroesDiscount = false } = await request.json();
    
    console.log('Checkout session requested:', { priceId, customerEmail, heroesDiscount, podcastData });
    
    // For demo mode - if no Stripe keys configured, create podcast directly
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'your_stripe_secret_key_here') {
      console.log('Demo mode: Creating podcast directly without payment');
      
      // Create the podcast entry directly
      const podcastResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/create-podcast-entry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(podcastData),
      });
      
      const podcastResult = await podcastResponse.json();
      
      if (podcastResponse.ok) {
        return NextResponse.json({ 
          success: true,
          message: 'Demo mode: Podcast created successfully!',
          podcastId: podcastResult.podcastId
        });
      } else {
        return NextResponse.json({ 
          error: 'Failed to create podcast: ' + podcastResult.error 
        }, { status: 500 });
      }
    }
    
    // TODO: Implement real Stripe checkout session creation
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: [{
    //     price: priceId,
    //     quantity: 1,
    //   }],
    //   mode: 'subscription',
    //   success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/upload/success?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/apply-podcast`,
    //   customer_email: customerEmail,
    //   metadata: {
    //     podcastData: JSON.stringify(podcastData)
    //   }
    // });
    // return NextResponse.json({ url: session.url });
    
    return NextResponse.json({ 
      message: 'Stripe integration pending - using demo mode for now'
    });
    
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
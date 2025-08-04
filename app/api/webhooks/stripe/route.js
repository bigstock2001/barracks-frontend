import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case 'customer.subscription.created':
        console.log('Subscription created:', event.data.object);
        // Update user's subscription status in your database
        break;
      
      case 'customer.subscription.updated':
        console.log('Subscription updated:', event.data.object);
        // Update user's subscription status in your database
        break;
      
      case 'customer.subscription.deleted':
        console.log('Subscription cancelled:', event.data.object);
        // Update user's subscription status in your database
        break;
      
      case 'invoice.payment_succeeded':
        console.log('Payment succeeded:', event.data.object);
        // Handle successful payment
        break;
      
      case 'invoice.payment_failed':
        console.log('Payment failed:', event.data.object);
        // Handle failed payment
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
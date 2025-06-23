
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-05-28.basil',
}) : null;

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: 'Payment processing not configured' }, { status: 500 });
    }

    const { paymentIntentId, orderId } = await request.json();

    if (!paymentIntentId || !orderId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify payment with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Update order status
      const order = await prisma.order.update({
        where: { id: orderId },
        data: {
          status: 'completed',
          paymentStatus: 'paid'
        },
        include: {
          orderItems: {
            include: {
              product: true
            }
          },
          user: true
        }
      });

      // Clear user's cart items (if stored in DB)
      await prisma.cartItem.deleteMany({
        where: { userId: order.userId }
      });

      return NextResponse.json({ 
        success: true, 
        order: order 
      });
    } else {
      // Update order as failed
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: 'cancelled',
          paymentStatus: 'failed'
        }
      });

      return NextResponse.json({ 
        error: 'Payment failed',
        paymentStatus: paymentIntent.status 
      }, { status: 400 });
    }

  } catch (error) {
    console.error('Payment confirmation error:', error);
    return NextResponse.json(
      { error: 'Failed to confirm payment' },
      { status: 500 }
    );
  }
}

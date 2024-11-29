import { NextResponse } from 'next/server';
import { getStripeSession } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const { priceId, userId } = await req.json();
    const session = await getStripeSession(priceId, userId);
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 });
  }
}
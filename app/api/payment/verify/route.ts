import { NextResponse } from 'next/server'
import { verifyPayment } from '@/lib/payment-service'

export async function POST(req: Request) {
  try {
    const paymentData = await req.json()
    const purchase = await verifyPayment(paymentData)
    return NextResponse.json({ purchase })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}
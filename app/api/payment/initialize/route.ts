import { NextResponse } from 'next/server'
import { initializePayment } from '@/lib/payment-service'

export async function POST(req: Request) {
  try {
    const { packageId, userId } = await req.json()
    const paymentUrl = await initializePayment(packageId, userId)
    return NextResponse.json({ paymentUrl })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to initialize payment' },
      { status: 500 }
    )
  }
}
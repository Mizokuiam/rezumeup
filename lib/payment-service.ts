import { BoostPurchase } from './types'

const BOOST_PACKAGES = {
  small: { id: '1', name: '20 Boosts', price: 10, boosts: 20 },
  medium: { id: '2', name: '50 Boosts', price: 25, boosts: 50 },
  large: { id: '3', name: '100 Boosts', price: 45, boosts: 100 },
}

export async function initializePayment(packageId: string, userId: string): Promise<string> {
  const selectedPackage = Object.values(BOOST_PACKAGES).find(pkg => pkg.id === packageId)
  if (!selectedPackage) throw new Error('Invalid package')

  // Generate signature for 2Checkout
  const merchantCode = process.env.NEXT_PUBLIC_2CHECKOUT_MERCHANT_CODE
  const secretKey = process.env.NEXT_PUBLIC_2CHECKOUT_SECRET_KEY
  
  // Return the payment URL that will be used to redirect the user
  return `https://sandbox.2checkout.com/checkout/purchase?merchant=${merchantCode}&dynamic=1&price=${selectedPackage.price}&currency=USD&return-url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_URL}/dashboard/success`)}&cancel-url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_URL}/dashboard/cancel`)}&product-id=${packageId}&customer-ref=${userId}`
}

export async function verifyPayment(paymentData: any): Promise<BoostPurchase> {
  // Verify the payment with 2Checkout API
  // This is a simplified version - you'll need to implement proper signature verification
  
  return {
    id: paymentData.order_number,
    userId: paymentData.customer_ref,
    amount: parseInt(paymentData.product_id),
    cost: parseFloat(paymentData.total),
    date: new Date().toISOString(),
  }
}
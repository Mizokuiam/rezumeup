import { PaymentPackage, PaymentResponse, PaymentVerification } from './types';
import { BOOST_PACKAGES, PAYMENT_CONFIG } from './config';
import { updateUserBoosts, getUserBoosts } from '@/lib/supabase/client';
import crypto from 'crypto';

export function getPackageById(packageId: string): PaymentPackage | undefined {
  return BOOST_PACKAGES.find(pkg => pkg.id === packageId);
}

export async function initializePayment(packageId: string, userId: string): Promise<PaymentResponse> {
  try {
    const selectedPackage = getPackageById(packageId);
    if (!selectedPackage) {
      throw new Error('Invalid package selected');
    }

    const timestamp = Math.floor(Date.now() / 1000).toString();
    const stringToSign = `${PAYMENT_CONFIG.merchantCode}${timestamp}${selectedPackage.price}USD`;
    const signature = crypto
      .createHmac('sha256', PAYMENT_CONFIG.secretKey)
      .update(stringToSign)
      .digest('hex');

    const params = new URLSearchParams({
      merchant: PAYMENT_CONFIG.merchantCode,
      'dynamic-price': selectedPackage.price.toString(),
      currency: 'USD',
      'return-url': `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/success`,
      'cancel-url': `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/cancel`,
      'product-id': packageId,
      'customer-ref': userId,
      signature,
      timestamp,
    });

    const baseUrl = PAYMENT_CONFIG.sandboxMode 
      ? 'https://sandbox.2checkout.com/checkout/purchase'
      : 'https://2checkout.com/checkout/purchase';

    return {
      success: true,
      redirectUrl: `${baseUrl}?${params.toString()}`
    };
  } catch (error) {
    console.error('Payment initialization error:', error);
    return {
      success: false,
      error: 'Failed to initialize payment'
    };
  }
}

export async function verifyPayment(data: PaymentVerification): Promise<boolean> {
  try {
    const { orderId, status, amount, userId, packageId } = data;
    
    if (status !== 'completed') {
      return false;
    }

    const package_ = getPackageById(packageId);
    if (!package_ || package_.price !== amount) {
      return false;
    }

    const currentBoosts = await getUserBoosts(userId);
    await updateUserBoosts(userId, currentBoosts + package_.boosts);

    return true;
  } catch (error) {
    console.error('Payment verification error:', error);
    return false;
  }
}
import { PaymentPackage } from './types';

export const BOOST_PACKAGES: PaymentPackage[] = [
  { id: '1', name: '20 Boosts', price: 10, boosts: 20 },
  { id: '2', name: '50 Boosts', price: 25, boosts: 50 },
  { id: '3', name: '100 Boosts', price: 45, boosts: 100 },
];

export const PAYMENT_CONFIG = {
  merchantCode: process.env.NEXT_PUBLIC_2CHECKOUT_MERCHANT_CODE!,
  secretKey: process.env.NEXT_PUBLIC_2CHECKOUT_SECRET_KEY!,
  publishableKey: process.env.NEXT_PUBLIC_2CHECKOUT_PUBLISHABLE_KEY!,
  sandboxMode: process.env.NODE_ENV !== 'production',
};
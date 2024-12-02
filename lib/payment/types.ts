export interface PaymentPackage {
  id: string;
  name: string;
  price: number;
  boosts: number;
}

export interface PaymentResponse {
  success: boolean;
  error?: string;
  redirectUrl?: string;
  transactionId?: string;
}

export interface PaymentVerification {
  orderId: string;
  status: string;
  amount: number;
  userId: string;
  packageId: string;
}
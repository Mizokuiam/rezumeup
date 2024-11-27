import React, { useState } from 'react';
import { X, CreditCard } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your_publishable_key');

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PlanOption {
  boosts: number;
  price: number;
  id: string;
}

const plans: PlanOption[] = [
  { boosts: 20, price: 10, id: 'price_20_boosts' },
  { boosts: 50, price: 25, id: 'price_50_boosts' },
  { boosts: 100, price: 45, id: 'price_100_boosts' },
];

export default function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<PlanOption | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = async (plan: PlanOption) => {
    setIsProcessing(true);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Here you would typically make an API call to your backend to create a Stripe session
      // For demo purposes, we'll just show a success message
      setTimeout(() => {
        alert('Payment successful! You will receive a confirmation email shortly.');
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl max-w-2xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Upgrade Your Account
          </h2>
          <p className="text-gray-600 mb-6">
            Choose a plan that works best for you
          </p>

          <div className="grid gap-4 mb-6">
            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                className={`p-4 border rounded-lg text-left transition ${
                  selectedPlan?.id === plan.id
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-600'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {plan.boosts} Boosts
                    </h3>
                    <p className="text-gray-600 text-sm">
                      ${plan.price} USD
                    </p>
                  </div>
                  <CreditCard className={`w-6 h-6 ${
                    selectedPlan?.id === plan.id
                      ? 'text-indigo-600'
                      : 'text-gray-400'
                  }`} />
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => selectedPlan && handlePurchase(selectedPlan)}
            disabled={!selectedPlan || isProcessing}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
              selectedPlan && !isProcessing
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {isProcessing ? 'Processing...' : 'Purchase Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
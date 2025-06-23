
import { Suspense } from 'react';
import { CheckoutSuccessContent } from '@/components/checkout/checkout-success-content';

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}

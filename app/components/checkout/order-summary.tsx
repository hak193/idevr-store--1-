
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

interface OrderSummaryItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderSummaryProps {
  items: OrderSummaryItem[];
  subtotal: number;
  tax: number;
  total: number;
}

export function OrderSummary({ items, subtotal, tax, total }: OrderSummaryProps) {
  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-start">
              <div className="flex space-x-3 flex-1">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-600 rounded"></div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm leading-tight">{item.name}</h4>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                {item.quantity > 1 && (
                  <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Totals */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-gray-50 rounded-lg p-4 mt-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <p className="text-sm text-gray-700">Secure SSL encrypted payment</p>
          </div>
        </div>

        {/* Order Info */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Digital products will be delivered via email</p>
          <p>• License keys included with purchase</p>
          <p>• 30-day money-back guarantee</p>
        </div>
      </CardContent>
    </Card>
  );
}

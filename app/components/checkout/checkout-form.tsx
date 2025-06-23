
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { CheckoutFormData } from '@/lib/types';

const checkoutSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerEmail: z.string().email('Invalid email address'),
  billingAddress: z.object({
    street: z.string().min(5, 'Street address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    postalCode: z.string().min(5, 'Postal code is required'),
    country: z.string().min(2, 'Country is required'),
  }),
  paymentMethod: z.enum(['stripe', 'paypal']),
});

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  isLoading: boolean;
  defaultEmail: string;
}

export function CheckoutForm({ onSubmit, isLoading, defaultEmail }: CheckoutFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerEmail: defaultEmail,
      paymentMethod: 'stripe',
      billingAddress: {
        country: 'United States',
      },
    },
  });

  const paymentMethod = watch('paymentMethod');

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming'
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Customer Details</h3>
            
            <div>
              <Label htmlFor="customerName">Full Name *</Label>
              <Input
                id="customerName"
                {...register('customerName')}
                placeholder="John Doe"
                className={errors.customerName ? 'border-red-500' : ''}
              />
              {errors.customerName && (
                <p className="text-sm text-red-500 mt-1">{errors.customerName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="customerEmail">Email Address *</Label>
              <Input
                id="customerEmail"
                type="email"
                {...register('customerEmail')}
                placeholder="john@example.com"
                className={errors.customerEmail ? 'border-red-500' : ''}
              />
              {errors.customerEmail && (
                <p className="text-sm text-red-500 mt-1">{errors.customerEmail.message}</p>
              )}
            </div>
          </div>

          {/* Billing Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Billing Address</h3>
            
            <div>
              <Label htmlFor="street">Street Address *</Label>
              <Input
                id="street"
                {...register('billingAddress.street')}
                placeholder="123 Main Street"
                className={errors.billingAddress?.street ? 'border-red-500' : ''}
              />
              {errors.billingAddress?.street && (
                <p className="text-sm text-red-500 mt-1">{errors.billingAddress.street.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  {...register('billingAddress.city')}
                  placeholder="New York"
                  className={errors.billingAddress?.city ? 'border-red-500' : ''}
                />
                {errors.billingAddress?.city && (
                  <p className="text-sm text-red-500 mt-1">{errors.billingAddress.city.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="state">State *</Label>
                <Select
                  onValueChange={(value) => setValue('billingAddress.state', value)}
                >
                  <SelectTrigger className={errors.billingAddress?.state ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.billingAddress?.state && (
                  <p className="text-sm text-red-500 mt-1">{errors.billingAddress.state.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="postalCode">Postal Code *</Label>
                <Input
                  id="postalCode"
                  {...register('billingAddress.postalCode')}
                  placeholder="10001"
                  className={errors.billingAddress?.postalCode ? 'border-red-500' : ''}
                />
                {errors.billingAddress?.postalCode && (
                  <p className="text-sm text-red-500 mt-1">{errors.billingAddress.postalCode.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="country">Country *</Label>
                <Select
                  defaultValue="United States"
                  onValueChange={(value) => setValue('billingAddress.country', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Payment Method</h3>
            
            <div className="space-y-3">
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  paymentMethod === 'stripe' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setValue('paymentMethod', 'stripe')}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    {...register('paymentMethod')}
                    value="stripe"
                    className="mr-3"
                  />
                  <div>
                    <p className="font-medium">Credit/Debit Card</p>
                    <p className="text-sm text-gray-600">Secure payment via Stripe</p>
                  </div>
                </div>
              </div>

              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-colors opacity-50 ${
                  paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    {...register('paymentMethod')}
                    value="paypal"
                    className="mr-3"
                    disabled
                  />
                  <div>
                    <p className="font-medium">PayPal</p>
                    <p className="text-sm text-gray-600">Coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              'Continue to Payment'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

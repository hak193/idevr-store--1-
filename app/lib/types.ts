
export interface Product {
  id: string;
  productId: string;
  name: string;
  description: string;
  category: string;
  platform: string;
  price: number;
  currency: string;
  tags: string[];
  isBundle: boolean;
  type: 'mobile' | 'desktop';
  pricingModel?: string;
  priceDetails?: any;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}

export interface Order {
  id: string;
  status: string;
  total: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  billingAddress: any;
  paymentMethod?: string;
  paymentStatus: string;
  orderItems: OrderItem[];
  createdAt: Date;
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface ServiceInquiry {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  serviceType: string;
  projectDetails: string;
  budget?: string;
  timeline?: string;
  additionalInfo?: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface CheckoutFormData {
  customerName: string;
  customerEmail: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: 'stripe' | 'paypal';
}

export interface PaymentIntent {
  id: string;
  clientSecret: string;
  status: string;
}

export interface OrderSummary {
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
}

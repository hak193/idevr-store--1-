
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Tag, Star, Shield, Download, Code, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/lib/cart-store';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/lib/types';
import { motion } from 'framer-motion';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  const { addItem } = useCartStore();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data.product);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
    });

    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-300 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-20 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const features = [
    'Complete source code included',
    'Detailed documentation',
    'Free updates for 1 year',
    'Technical support included',
    'Commercial license',
    'Customizable design',
  ];

  const specifications = [
    { label: 'Platform', value: product.platform },
    { label: 'Category', value: product.category },
    { label: 'Type', value: product.type === 'mobile' ? 'Mobile App' : 'Desktop Software' },
    { label: 'Bundle', value: product.isBundle ? 'Yes' : 'No' },
    { label: 'Currency', value: product.currency },
  ];

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link 
            href="/products" 
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </motion.div>

        {/* Product Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center overflow-hidden shadow-lg">
              <div className="text-white text-center">
                <div className="text-4xl font-bold mb-4">
                  {product.name.split(' ').map(word => word.charAt(0)).join('').slice(0, 3)}
                </div>
                <div className="text-lg opacity-75">{product.platform}</div>
                <div className="text-sm opacity-60 mt-2">{product.category}</div>
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center space-x-2 mb-4">
                {product.isBundle && (
                  <Badge variant="secondary">Bundle</Badge>
                )}
                <Badge variant="outline">{product.category}</Badge>
                <Badge variant="outline">{product.platform}</Badge>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">(4.8/5 based on reviews)</span>
                </div>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex items-center flex-wrap gap-2 mb-6">
                  <Tag className="h-4 w-4 text-gray-400" />
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Pricing */}
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">
                      {formatPrice(product.price)}
                    </div>
                    {product.pricingModel && (
                      <div className="text-sm text-gray-500">
                        {product.pricingModel}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">One-time payment</div>
                    <div className="text-sm text-green-600 font-medium">Instant download</div>
                  </div>
                </div>

                <Button 
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>

                <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                  <Shield className="h-4 w-4 mr-2" />
                  30-day money-back guarantee
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'features', label: 'Features' },
                { id: 'specifications', label: 'Specifications' },
                { id: 'support', label: 'Support' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {activeTab === 'overview' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Product Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {product.description}
                    </p>
                    
                    <h4 className="font-semibold text-gray-900 mb-3">What You Get:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <Code className="h-4 w-4 text-green-500 mr-3" />
                        Complete source code with documentation
                      </li>
                      <li className="flex items-center">
                        <Download className="h-4 w-4 text-green-500 mr-3" />
                        Instant download after purchase
                      </li>
                      <li className="flex items-center">
                        <Shield className="h-4 w-4 text-green-500 mr-3" />
                        Commercial license included
                      </li>
                    </ul>

                    <h4 className="font-semibold text-gray-900 mb-3 mt-6">Perfect For:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Entrepreneurs looking to launch quickly</li>
                      <li>• Developers who want to save time</li>
                      <li>• Businesses needing proven solutions</li>
                      <li>• Startups with limited budgets</li>
                    </ul>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'features' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Features & Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'specifications' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {specifications.map((spec, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                          <span className="font-medium text-gray-900">{spec.label}</span>
                          <span className="text-gray-600">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'support' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Support & Documentation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">What's Included:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Comprehensive setup documentation</li>
                        <li>• Code comments and explanations</li>
                        <li>• Installation guide</li>
                        <li>• Customization instructions</li>
                        <li>• Email support for 30 days</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Need Help?</h4>
                      <p className="text-gray-600 mb-4">
                        Our support team is here to help you get up and running quickly.
                      </p>
                      <Button variant="outline" asChild>
                        <Link href="/contact">Contact Support</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Purchase Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Purchase Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Price</span>
                    <span className="font-semibold">{formatPrice(product.price)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">License</span>
                    <span className="text-sm">Commercial</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Support</span>
                    <span className="text-sm">30 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Updates</span>
                    <span className="text-sm">1 year</span>
                  </div>
                  
                  <Button 
                    onClick={handleAddToCart}
                    className="w-full"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>

              {/* Trust Indicators */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4 text-center">
                    <div className="flex items-center justify-center">
                      <Shield className="h-8 w-8 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Secure Purchase</h4>
                      <p className="text-sm text-gray-600">
                        Your payment is protected with industry-standard encryption.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

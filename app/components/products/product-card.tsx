
'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Tag } from 'lucide-react';
import { WishlistButton } from '@/components/wishlist/wishlist-button';
import { useCartStore } from '@/lib/cart-store';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleAddToCart = () => {
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

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-4">
        {/* Product Image Placeholder */}
        <div className="aspect-video mb-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center overflow-hidden">
          <div className="text-white text-center">
            <div className="text-2xl font-bold mb-2">
              {product.name.split(' ').map(word => word.charAt(0)).join('').slice(0, 3)}
            </div>
            <div className="text-xs opacity-75">{product.platform}</div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
              <Link href={`/products/${product.id}`}>
                {product.name}
              </Link>
            </h3>
            {product.isBundle && (
              <Badge variant="secondary" className="ml-2 flex-shrink-0">
                Bundle
              </Badge>
            )}
          </div>

          <p className="text-sm text-gray-600 line-clamp-3">
            {product.description}
          </p>

          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {product.platform}
            </Badge>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex items-center flex-wrap gap-1">
              <Tag className="h-3 w-3 text-gray-400" />
              {product.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs text-gray-500">
                  {tag}
                </span>
              ))}
              {product.tags.length > 3 && (
                <span className="text-xs text-gray-400">
                  +{product.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="text-left">
          <div className="text-2xl font-bold text-blue-600">
            {formatPrice(product.price)}
          </div>
          {product.pricingModel && (
            <div className="text-xs text-gray-500">
              {product.pricingModel}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <WishlistButton productId={product.id} />
          <Button 
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

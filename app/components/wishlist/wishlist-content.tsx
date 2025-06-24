
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Product } from '@prisma/client';
import { ProductCard } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';

export function WishlistContent() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      axios.get('/api/wishlist').then((res) => {
        setWishlistItems(res.data?.items || []);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [session]);

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      await axios.delete(`/api/wishlist?productId=${productId}`);
      setWishlistItems((prev) => prev.filter((item) => item.productId !== productId));
      toast({
        title: 'Removed from wishlist',
      });
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!session?.user) {
    return <div>Please sign in to see your wishlist.</div>;
  }

  if (wishlistItems.length === 0) {
    return <div>Your wishlist is empty.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {wishlistItems.map((item) => (
        <div key={item.id} className="relative">
          <ProductCard product={item.product as Product} />
          <Button
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => handleRemoveFromWishlist(item.productId)}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}

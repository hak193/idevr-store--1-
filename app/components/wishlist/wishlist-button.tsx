
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';

interface WishlistButtonProps {
  productId: string;
}

export function WishlistButton({ productId }: WishlistButtonProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      // Fetch wishlist status when component mounts
      axios.get('/api/wishlist').then((res) => {
        const wishlist = res.data;
        if (wishlist && wishlist.items.some((item: any) => item.productId === productId)) {
          setIsInWishlist(true);
        }
      });
    }
  }, [session, productId]);

  const handleWishlistToggle = async () => {
    if (!session?.user) {
      toast({
        title: 'Please sign in',
        description: 'You need to be signed in to add items to your wishlist.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isInWishlist) {
        await axios.delete(`/api/wishlist?productId=${productId}`);
        toast({
          title: 'Removed from wishlist',
        });
      } else {
        await axios.post('/api/wishlist', { productId });
        toast({
          title: 'Added to wishlist',
        });
      }
      setIsInWishlist(!isInWishlist);
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleWishlistToggle}
      disabled={isLoading}
    >
      <Heart className={isInWishlist ? 'fill-red-500 text-red-500' : ''} />
    </Button>
  );
}

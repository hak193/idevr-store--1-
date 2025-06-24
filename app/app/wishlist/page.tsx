
import { WishlistContent } from '@/components/wishlist/wishlist-content';

export default function WishlistPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      <WishlistContent />
    </div>
  );
}

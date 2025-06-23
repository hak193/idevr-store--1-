
'use client';

import { CartSidebar } from './cart-sidebar';

export function CartProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CartSidebar />
    </>
  );
}

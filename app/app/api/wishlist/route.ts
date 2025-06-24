
import { NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const wishlist = await db.wishlist.findFirst({
      where: {
        userId: session.user.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(wishlist);
  } catch (error) {
    console.error('[WISHLIST_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const body = await req.json();
  const { productId } = body;

  if (!productId) {
    return new NextResponse('Product ID is required', { status: 400 });
  }

  try {
    let wishlist = await db.wishlist.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    if (!wishlist) {
      wishlist = await db.wishlist.create({
        data: {
          userId: session.user.id,
        },
      });
    }

    const wishlistItem = await db.wishlistItem.create({
      data: {
        wishlistId: wishlist.id,
        productId,
      },
    });

    return NextResponse.json(wishlistItem);
  } catch (error) {
    console.error('[WISHLIST_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId');

  if (!productId) {
    return new NextResponse('Product ID is required', { status: 400 });
  }

  try {
    const wishlist = await db.wishlist.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    if (!wishlist) {
      return new NextResponse('Wishlist not found', { status: 404 });
    }

    await db.wishlistItem.delete({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId,
        },
      },
    });

    return new NextResponse('Product removed from wishlist', { status: 200 });
  } catch (error) {
    console.error('[WISHLIST_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}


import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const type = searchParams.get('type'); // 'mobile' or 'desktop'
    const category = searchParams.get('category');
    const platform = searchParams.get('platform');
    const priceRange = searchParams.get('priceRange');
    const sortBy = searchParams.get('sortBy') || 'name';

    let whereClause: any = {};

    // Filter by type
    if (type && type !== 'all') {
      whereClause.type = type;
    }

    // Filter by category
    if (category && category !== 'all') {
      whereClause.category = category;
    }

    // Filter by platform
    if (platform && platform !== 'all') {
      whereClause.platform = {
        contains: platform,
        mode: 'insensitive'
      };
    }

    // Filter by price range
    if (priceRange && priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(p => {
        if (p === '500+') return [500, 999999];
        return parseInt(p);
      });

      if (priceRange === '500+') {
        whereClause.price = { gte: 500 };
      } else if (max) {
        whereClause.price = { gte: min, lte: max };
      }
    }

    // Sort logic
    let orderBy: any = {};
    switch (sortBy) {
      case 'price-low':
        orderBy = { price: 'asc' };
        break;
      case 'price-high':
        orderBy = { price: 'desc' };
        break;
      case 'category':
        orderBy = { category: 'asc' };
        break;
      default:
        orderBy = { name: 'asc' };
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy,
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

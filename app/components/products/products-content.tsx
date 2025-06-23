
'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/products/product-card';
import { ProductFilters, FilterState } from '@/components/products/product-filters';
import { Button } from '@/components/ui/button';
import { Smartphone, Monitor, Search } from 'lucide-react';
import { Product } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { useSearchParams } from 'next/navigation';

export function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('mobile');
  
  const searchParams = useSearchParams();

  useEffect(() => {
    // Set active tab from URL params
    const tab = searchParams.get('tab');
    if (tab === 'desktop' || tab === 'mobile') {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data.products || []);
        setFilteredProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleFiltersChange = (filters: FilterState) => {
    let filtered = [...products];

    // Filter by current tab
    filtered = filtered.filter(product => product.type === activeTab);

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Apply platform filter
    if (filters.platform !== 'all') {
      filtered = filtered.filter(product => 
        product.platform.toLowerCase().includes(filters.platform.toLowerCase())
      );
    }

    // Apply price range filter
    if (filters.priceRange !== 'all') {
      if (filters.priceRange === '500+') {
        filtered = filtered.filter(product => product.price >= 500);
      } else {
        const [minStr, maxStr] = filters.priceRange.split('-');
        const min = parseInt(minStr);
        const max = parseInt(maxStr);
        
        if (!isNaN(min) && !isNaN(max)) {
          filtered = filtered.filter(product => product.price >= min && product.price <= max);
        }
      }
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'category':
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    // Re-apply filters when tab changes
    handleFiltersChange({
      category: 'all',
      platform: 'all',
      priceRange: 'all',
      sortBy: 'name',
    });
  }, [activeTab, searchQuery, products]);

  const getCategories = (type: string) => {
    const typeProducts = products.filter(p => p.type === type);
    const categoriesSet = new Set(typeProducts.map(p => p.category));
    return Array.from(categoriesSet);
  };

  const getPlatforms = (type: string) => {
    const typeProducts = products.filter(p => p.type === type);
    const platformsSet = new Set(typeProducts.map(p => p.platform));
    return Array.from(platformsSet);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-300 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ready-Made Software Products
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Launch faster with our market-tested, ready-to-deploy software and app templates.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Product Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="mobile" className="flex items-center">
              <Smartphone className="h-4 w-4 mr-2" />
              Mobile Apps
            </TabsTrigger>
            <TabsTrigger value="desktop" className="flex items-center">
              <Monitor className="h-4 w-4 mr-2" />
              Desktop Software
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mobile" className="space-y-8">
            <ProductFilters
              categories={getCategories('mobile')}
              platforms={getPlatforms('mobile')}
              onFiltersChange={handleFiltersChange}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-gray-500 mb-4">No products found matching your criteria.</div>
                  <Button variant="outline" onClick={() => window.location.reload()}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="desktop" className="space-y-8">
            <ProductFilters
              categories={getCategories('desktop')}
              platforms={getPlatforms('desktop')}
              onFiltersChange={handleFiltersChange}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-gray-500 mb-4">No products found matching your criteria.</div>
                  <Button variant="outline" onClick={() => window.location.reload()}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

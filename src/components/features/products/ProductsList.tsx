import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Header } from '../../layout/Header';
import { Footer } from '../../layout/Footer';
import { productsService } from '../../../services/products.service';
import { ProductCard } from './ProductCard';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Search, Filter, Grid, List, ChevronDown } from 'lucide-react';

export function ProductsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: productsData, isLoading, error } = useQuery({
    queryKey: ['products', { 
      search: searchTerm, 
      categoryId: selectedCategory, 
      page: currentPage,
      limit: 12 
    }],
    queryFn: () => productsService.getProducts({
      search: searchTerm || undefined,
      categoryId: selectedCategory,
      page: currentPage,
      limit: 12,
    }),
  });

  const categories = [
    { id: 1, name: 'Chairs' },
    { id: 2, name: 'Tables' },
    { id: 3, name: 'Sofas' },
    { id: 4, name: 'Storage' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleCategoryFilter = (categoryId: number | undefined) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-50 to-teal-50 py-16">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Our Products
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Discover our carefully curated collection of modern furniture pieces
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </form>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === undefined ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategoryFilter(undefined)}
                className={selectedCategory === undefined ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryFilter(category.id)}
                  className={selectedCategory === category.id ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
                  <div className="aspect-square bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : productsData?.products && productsData.products.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-gray-600">
                  Showing {productsData.products.length} of {productsData.total} products
                </p>
              </div>
              
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                  : "space-y-6"
              }>
                {productsData.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {productsData.totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    
                    {Array.from({ length: productsData.totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                      >
                        {page}
                      </Button>
                    ))}
                    
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.min(productsData.totalPages, prev + 1))}
                      disabled={currentPage === productsData.totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No products found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedCategory 
                  ? "Try adjusting your search or filter criteria."
                  : "We're working on adding products to our catalog."
                }
              </p>
              {(searchTerm || selectedCategory) && (
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory(undefined);
                    setCurrentPage(1);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
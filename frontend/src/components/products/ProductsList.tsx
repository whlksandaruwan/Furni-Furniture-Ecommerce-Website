import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { productsService } from '../../services/products.service';
import { ProductCard } from './ProductCard';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Search, Filter, Grid, List } from 'lucide-react';

export function ProductsList() {
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data: productsData, isLoading, error } = useQuery({
    queryKey: ['products', { search, categoryId, page }],
    queryFn: () => productsService.getProducts({ 
      search, 
      categoryId, 
      page, 
      limit: 12 
    }),
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error loading products</h2>
          <p className="text-gray-600">Please try again later.</p>
        </div>
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
            <h1 className="text-5xl lg:text-6xl font-bold text-navyBlue-500 leading-tight mb-6">
              Our Complete
              <span className="text-emerald-600"> Collection</span>
            </h1>
            <p className="text-xl text-navyBlue-400 leading-relaxed max-w-3xl mx-auto">
              Discover our carefully curated selection of premium furniture pieces designed to transform your space into something extraordinary.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-gray-50 py-12">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Search and Filters */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-navyBlue-400" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                   className="pl-12 h-12 text-lg border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
            </form>
            
            {/* Filter Buttons */}
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-emerald-300">
                <span className="text-sm font-medium text-navyBlue-500 px-2">View:</span>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                   className={viewMode === 'grid' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'text-navyBlue-500 hover:bg-emerald-100'}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                   className={viewMode === 'list' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'text-navyBlue-500 hover:bg-emerald-100'}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                 className="border-emerald-500 text-emerald-500 hover:bg-emerald-50"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
          
          {/* Category Pills */}
          <div className="flex flex-wrap gap-3 mb-6">
            {['All', 'Chairs', 'Tables', 'Sofas', 'Storage', 'Lighting', 'Decor'].map((category) => (
              <Button
                key={category}
                variant={category === 'All' ? 'default' : 'outline'}
                size="sm"
                className={category === 'All' 
                   ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                   : 'border-emerald-300 text-navyBlue-500 hover:bg-emerald-100'
                }
              >
                {category}
              </Button>
            ))}
          </div>
          
          {/* Results Info */}
          {productsData && (
            <div className="flex justify-between items-center mb-6">
              <p className="text-navyBlue-400">
                Showing {productsData.products.length} of {productsData.total} products
              </p>
               <select className="border border-emerald-300 rounded-lg px-4 py-2 text-navyBlue-500 focus:border-emerald-500 focus:ring-emerald-500">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
                <option>Best Rating</option>
              </select>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {productsData && productsData.products.length > 0 ? (
          <>
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {productsData.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {productsData.totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <Button
                  variant="outline"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                   className="border-emerald-500 text-emerald-500 hover:bg-emerald-50"
                >
                  Previous
                </Button>
                
                <span className="text-navyBlue-500 font-medium px-4">
                  Page {page} of {productsData.totalPages}
                </span>
                
                <Button
                  variant="outline"
                  onClick={() => setPage(page + 1)}
                  disabled={page === productsData.totalPages}
                   className="border-emerald-500 text-emerald-500 hover:bg-emerald-50"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-navyBlue-500 mb-4">No products found</h2>
            <p className="text-navyBlue-400">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
      </div>
      <Footer />
    </div>
  );
}
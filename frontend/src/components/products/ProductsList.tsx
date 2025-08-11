import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { productsService } from '../../services/products.service';
import { ProductCard } from './ProductCard';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Search, Filter, Grid, List, ChevronDown, X, SlidersHorizontal } from 'lucide-react';

const categories = [
  { id: null, name: 'All Categories' },
  { id: 1, name: 'Chairs' },
  { id: 2, name: 'Tables' },
  { id: 3, name: 'Sofas' },
  { id: 4, name: 'Storage' },
  { id: 5, name: 'Lighting' },
  { id: 6, name: 'Decor' },
];

const priceRanges = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'under-100', label: 'Under $100', min: 0, max: 100 },
  { id: '100-300', label: '$100 - $300', min: 100, max: 300 },
  { id: '300-500', label: '$300 - $500', min: 300, max: 500 },
  { id: '500-1000', label: '$500 - $1000', min: 500, max: 1000 },
  { id: 'over-1000', label: 'Over $1000', min: 1000, max: Infinity },
];

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Best Rating' },
];

export function ProductsList() {
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isOnSale, setIsOnSale] = useState(false);

  const { data: productsData, isLoading, error } = useQuery({
    queryKey: ['products', { search, categoryId, page, isNew, isOnSale }],
    queryFn: () => productsService.getProducts({ 
      search, 
      categoryId: categoryId || undefined, 
      page, 
      limit: 12,
      isNew: isNew || undefined,
      isOnSale: isOnSale || undefined,
    }),
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const clearFilters = () => {
    setSearch('');
    setCategoryId(null);
    setPriceRange('all');
    setIsNew(false);
    setIsOnSale(false);
    setPage(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
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
      <section className="bg-gradient-to-r from-sage-50 to-primary-50 py-16 animate-in fade-in duration-1000">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-sage-800 leading-tight mb-6 animate-in slide-in-from-bottom-4 duration-1000 delay-200">
              Our Complete
              <span className="text-primary-500"> Collection</span>
            </h1>
            <p className="text-xl text-sage-600 leading-relaxed max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-1000 delay-400">
              Discover our carefully curated selection of premium furniture pieces designed to transform your space into something extraordinary.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-gray-50 py-12">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0`}>
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24 animate-in slide-in-from-left-4 duration-500">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-sage-800 flex items-center">
                    <SlidersHorizontal className="w-5 h-5 mr-2" />
                    Filters
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-sage-600 hover:text-primary-500 hover:bg-sage-50"
                  >
                    Clear All
                  </Button>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-sage-700 mb-2">Search</label>
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sage-400" />
                      <Input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 border-sage-200 focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                  </form>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-sage-700 mb-3">Category</label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category.id || 'all'} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          checked={categoryId === category.id}
                          onChange={() => setCategoryId(category.id)}
                          className="w-4 h-4 text-primary-500 border-sage-300 focus:ring-primary-500"
                        />
                        <span className="ml-3 text-sage-700 group-hover:text-primary-500 transition-colors">
                          {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-sage-700 mb-3">Price Range</label>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label key={range.id} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="priceRange"
                          checked={priceRange === range.id}
                          onChange={() => setPriceRange(range.id)}
                          className="w-4 h-4 text-primary-500 border-sage-300 focus:ring-primary-500"
                        />
                        <span className="ml-3 text-sage-700 group-hover:text-primary-500 transition-colors">
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Special Filters */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-sage-700 mb-3">Special</label>
                  <div className="space-y-3">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={isNew}
                        onChange={(e) => setIsNew(e.target.checked)}
                        className="w-4 h-4 text-primary-500 border-sage-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-3 text-sage-700 group-hover:text-primary-500 transition-colors">
                        New Arrivals
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={isOnSale}
                        onChange={(e) => setIsOnSale(e.target.checked)}
                        className="w-4 h-4 text-primary-500 border-sage-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-3 text-sage-700 group-hover:text-primary-500 transition-colors">
                        On Sale
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Top Bar */}
              <div className="mb-8 animate-in slide-in-from-top-4 duration-500 delay-200">
                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                  {/* Mobile Filter Toggle */}
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden border-sage-300 text-sage-700 hover:bg-sage-50"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                  </Button>
                  
                  {/* View Mode and Sort */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-sage-200 shadow-sm">
                      <span className="text-sm font-medium text-sage-700 px-2">View:</span>
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                        className={viewMode === 'grid' ? 'bg-primary-500 hover:bg-primary-600 text-white' : 'text-sage-700 hover:bg-sage-100'}
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                        className={viewMode === 'list' ? 'bg-primary-500 hover:bg-primary-600 text-white' : 'text-sage-700 hover:bg-sage-100'}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-sage-200 rounded-lg px-4 py-2 text-sage-700 bg-white focus:border-primary-500 focus:ring-primary-500 shadow-sm"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          Sort by: {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Results Info */}
                {productsData && (
                  <div className="flex justify-between items-center">
                    <p className="text-sage-600">
                      Showing {productsData.products.length} of {productsData.total} products
                    </p>
                  </div>
                )}
              </div>

              {/* Products Grid */}
              {productsData && productsData.products.length > 0 ? (
                <>
                  <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                      : 'grid-cols-1'
                  } animate-in fade-in duration-700 delay-300`}>
                    {productsData.products.map((product, index) => (
                      <div 
                        key={product.id} 
                        className="animate-in slide-in-from-bottom-4 duration-500"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {productsData.totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-12 animate-in slide-in-from-bottom-4 duration-500 delay-500">
                      <Button
                        variant="outline"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="border-sage-300 text-sage-700 hover:bg-sage-50"
                      >
                        Previous
                      </Button>
                      
                      <span className="text-sage-700 font-medium px-4">
                        Page {page} of {productsData.totalPages}
                      </span>
                      
                      <Button
                        variant="outline"
                        onClick={() => setPage(page + 1)}
                        disabled={page === productsData.totalPages}
                        className="border-sage-300 text-sage-700 hover:bg-sage-50"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 animate-in fade-in duration-500">
                  <h2 className="text-2xl font-bold text-sage-700 mb-4">No products found</h2>
                  <p className="text-sage-600 mb-6">Try adjusting your search criteria.</p>
                  <Button 
                    onClick={clearFilters}
                    className="bg-primary-500 hover:bg-primary-600 text-white"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
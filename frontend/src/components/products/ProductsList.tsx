import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { productsService } from '../../services/products.service';
import { ProductCard } from './ProductCard';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Search, Filter, Grid, List, ChevronDown } from 'lucide-react';

export function ProductsList() {
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortBy, setSortBy] = useState('featured');

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

  const categories = [
    { id: undefined, name: 'All Categories' },
    { id: 1, name: 'Chairs' },
    { id: 2, name: 'Tables' },
    { id: 3, name: 'Sofas' },
    { id: 4, name: 'Storage' },
    { id: 5, name: 'Lighting' },
    { id: 6, name: 'Decor' },
  ];

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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
                <h3 className="text-2xl font-bold text-navyBlue-500 mb-6">Filters</h3>
                
                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-navyBlue-500 mb-2">Search Products</label>
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-navyBlue-400" />
                      <Input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                  </form>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-navyBlue-500 mb-3">Categories</label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id || 'all'}
                        onClick={() => setCategoryId(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          categoryId === category.id
                            ? 'bg-emerald-100 text-emerald-700 font-medium'
                            : 'text-navyBlue-500 hover:bg-emerald-50'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-navyBlue-500 mb-3">Price Range</label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-navyBlue-400">${priceRange[0]}</span>
                      <span className="text-sm text-navyBlue-400">${priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="text-sm"
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 2000])}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Filter Tags */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-navyBlue-500 mb-3">Filter by</label>
                  <div className="space-y-2">
                    {['New Arrivals', 'On Sale', 'Featured', 'Best Sellers'].map((tag) => (
                      <label key={tag} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="ml-2 text-sm text-navyBlue-500">{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  className="w-full border-emerald-500 text-emerald-500 hover:bg-emerald-50"
                  onClick={() => {
                    setSearch('');
                    setCategoryId(undefined);
                    setPriceRange([0, 2000]);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Top Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                {/* Results Info */}
                {productsData && (
                  <p className="text-navyBlue-400">
                    Showing {productsData.products.length} of {productsData.total} products
                  </p>
                )}

                {/* View Mode and Sort */}
                <div className="flex items-center gap-4">
                  {/* View Mode */}
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

                  {/* Sort */}
                  <div className="relative">
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-emerald-300 rounded-lg px-4 py-2 pr-8 text-navyBlue-500 focus:border-emerald-500 focus:ring-emerald-500"
                    >
                      <option value="featured">Sort by: Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="newest">Newest First</option>
                      <option value="rating">Best Rating</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-navyBlue-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {productsData && productsData.products.length > 0 ? (
                <>
                  <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
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
        </div>
      </div>
      <Footer />
    </div>
  );
}
import React, { useState } from 'react';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Search, Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';

const featuredPost = {
  id: 1,
  title: 'The Ultimate Guide to Modern Living Room Design',
  excerpt: 'Discover the latest trends in modern living room design and learn how to create a space that\'s both stylish and functional.',
  image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  author: 'Sarah Johnson',
  date: '2024-01-15',
  readTime: '8 min read',
  category: 'Interior Design',
};

const blogPosts = [
  {
    id: 2,
    title: 'Sustainable Furniture: Why It Matters',
    excerpt: 'Learn about the importance of sustainable furniture and how to make eco-friendly choices for your home.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    author: 'Michael Chen',
    date: '2024-01-12',
    readTime: '6 min read',
    category: 'Sustainability',
  },
  {
    id: 3,
    title: 'Small Space, Big Style: Maximizing Your Apartment',
    excerpt: 'Tips and tricks for making the most of small living spaces without compromising on style.',
    image: 'https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    author: 'Emily Rodriguez',
    date: '2024-01-10',
    readTime: '5 min read',
    category: 'Small Spaces',
  },
  {
    id: 4,
    title: 'Color Psychology in Home Decor',
    excerpt: 'How different colors affect mood and atmosphere in your living space.',
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    author: 'David Kim',
    date: '2024-01-08',
    readTime: '7 min read',
    category: 'Design Tips',
  },
  {
    id: 5,
    title: 'Furniture Care: Making Your Investment Last',
    excerpt: 'Essential tips for maintaining and caring for your furniture to ensure it lasts for years.',
    image: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    author: 'Lisa Wang',
    date: '2024-01-05',
    readTime: '4 min read',
    category: 'Maintenance',
  },
  {
    id: 6,
    title: 'The Rise of Minimalist Furniture Design',
    excerpt: 'Exploring the minimalist movement in furniture design and its impact on modern homes.',
    image: 'https://images.unsplash.com/photo-1586286292644-67d0eda295b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    author: 'Alex Thompson',
    date: '2024-01-03',
    readTime: '6 min read',
    category: 'Trends',
  },
  {
    id: 7,
    title: 'Creating a Cozy Bedroom Sanctuary',
    excerpt: 'Transform your bedroom into a peaceful retreat with these design and furniture tips.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    author: 'Rachel Green',
    date: '2024-01-01',
    readTime: '5 min read',
    category: 'Bedroom',
  },
];

const categories = ['All', 'Interior Design', 'Sustainability', 'Small Spaces', 'Design Tips', 'Maintenance', 'Trends', 'Bedroom'];

export function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-50 to-teal-50 py-24">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <Badge className="bg-emerald-100 text-emerald-800 mb-4">Our Blog</Badge>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Design Inspiration &
              <span className="text-emerald-600"> Expert Tips</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
              Stay updated with the latest trends, tips, and insights from our furniture and design experts.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Article</h2>
            <p className="text-gray-600">Our latest and most popular content</p>
          </div>

          <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-video lg:aspect-square overflow-hidden">
                <ImageWithFallback
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <Badge className="bg-emerald-100 text-emerald-800 w-fit mb-4">
                  {featuredPost.category}
                </Badge>
                <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <User className="w-4 h-4 mr-2" />
                  <span className="mr-4">{featuredPost.author}</span>
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="mr-4">{new Date(featuredPost.date).toLocaleDateString()}</span>
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{featuredPost.readTime}</span>
                </div>
                <Button className="bg-emerald-600 hover:bg-emerald-700 w-fit">
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Articles</h2>
            <p className="text-gray-600">Discover insights, tips, and inspiration for your home</p>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <Badge className="bg-emerald-100 text-emerald-800 mb-3">
                      {post.category}
                    </Badge>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <User className="w-4 h-4 mr-2" />
                      <span className="mr-4">{post.author}</span>
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or category filter.</p>
            </div>
          )}

          {/* Load More Button */}
          {filteredPosts.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Never Miss an Update
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest design tips, trends, and exclusive content delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 bg-white border-0 text-gray-900 placeholder:text-gray-500"
              />
              <Button 
                size="lg" 
                className="bg-white text-emerald-600 hover:bg-gray-50 font-semibold h-12 px-8"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
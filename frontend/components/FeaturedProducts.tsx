import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Heart, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const products = [
  {
    id: 1,
    name: "Nordic Chair",
    price: 50.00,
    originalPrice: 80.00,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    reviews: 24,
    isNew: true,
    isSale: true
  },
  {
    id: 2,
    name: "Kruzo Aero Chair",
    price: 78.00,
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    reviews: 31,
    isNew: false,
    isSale: false
  },
  {
    id: 3,
    name: "Ergonomic Chair",
    price: 43.00,
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    reviews: 18,
    isNew: true,
    isSale: false
  }
];

export function FeaturedProducts() {
  return (
    <section className="py-20 bg-lightGray-100">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-navyBlue-500 mb-4">Crafted with excellent material.</h2>
          <p className="text-xl text-navyBlue-400 max-w-3xl mx-auto">
            Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
              <div className="relative aspect-square overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white">New</Badge>
                  )}
                  {product.isSale && (
                    <Badge className="bg-teal-600 hover:bg-teal-700 text-white">Sale</Badge>
                  )}
                </div>

                {/* Wishlist button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>

                {/* Quick add overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button className="bg-white text-navyBlue-500 hover:bg-emerald-50 border border-emerald-300">
                    Quick Add
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-navyBlue-500 mb-2">{product.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-sm text-navyBlue-400">({product.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold text-navyBlue-500">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-navyBlue-400 line-through">${product.originalPrice.toFixed(2)}</span>
                  )}
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
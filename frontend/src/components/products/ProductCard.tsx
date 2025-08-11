import React from 'react';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../services/products.service';
import { useAuth } from '../../contexts/AuthContext';
import { cartService } from '../../services/cart.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) =>
      cartService.addToCart(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }
    addToCartMutation.mutate({ productId: product.id, quantity: 1 });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-300 border border-primary-200">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-sage-500 hover:bg-sage-600 text-white">New</Badge>
          )}
          {product.isOnSale && (
            <Badge className="bg-dustyPink-500 hover:bg-dustyPink-600 text-white">Sale</Badge>
          )}
        </div>

        {/* Wishlist button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-white/90 hover:bg-white shadow-sm"
        >
          <Heart className="h-4 w-4 text-navyBlue-500" />
        </Button>

        {/* Quick add overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button 
            className="bg-white text-navyBlue-500 hover:bg-primary-50 border border-primary-300 shadow-lg"
            onClick={handleAddToCart}
            disabled={addToCartMutation.isPending}
          >
            {addToCartMutation.isPending ? 'Adding...' : 'Quick Add'}
          </Button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-navyBlue-500 mb-2">{product.name}</h3>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-sm text-navyBlue-400">({product.reviewCount} reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900">
          <span className="text-xl font-bold text-navyBlue-500">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-navyBlue-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to cart button */}
        <Button 
          className="w-full bg-sage-500 hover:bg-sage-600 text-white"
          onClick={handleAddToCart}
          disabled={addToCartMutation.isPending}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {addToCartMutation.isPending ? 'Adding...' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
} 
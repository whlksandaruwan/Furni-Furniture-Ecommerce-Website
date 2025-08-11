import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { Product } from '../../services/products.service';
import { cartService } from '../../services/cart.service';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: (productId: number) => cartService.addToCart(productId, 1),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const handleAddToCart = () => {
    addToCartMutation.mutate(product.id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
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
          {product.isOnSale && (
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
          <Button 
            className="bg-white text-navyBlue-500 hover:bg-emerald-50 border border-emerald-300"
            onClick={handleAddToCart}
            disabled={addToCartMutation.isPending}
          >
            {addToCartMutation.isPending ? 'Adding...' : 'Quick Add'}
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
          <span className="text-sm text-navyBlue-400">({product.reviewCount} reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-navyBlue-500">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-navyBlue-400 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        <Button 
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
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
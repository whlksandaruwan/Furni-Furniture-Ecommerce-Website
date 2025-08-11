import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { 
  ShoppingCart as ShoppingCartIcon, 
  Plus, 
  Minus, 
  Trash2, 
  X 
} from 'lucide-react';
import { cartService, Cart, CartItem } from '../../services/cart.service';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';

export function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: cartService.getCart,
  });

  const updateCartMutation = useMutation({
    mutationFn: ({ cartItemId, quantity }: { cartItemId: number; quantity: number }) =>
      cartService.updateCartItem(cartItemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: (cartItemId: number) => cartService.removeFromCart(cartItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: cartService.clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const handleUpdateQuantity = (cartItemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCartMutation.mutate(cartItemId);
    } else {
      updateCartMutation.mutate({ cartItemId, quantity: newQuantity });
    }
  };

  const handleRemoveItem = (cartItemId: number) => {
    removeFromCartMutation.mutate(cartItemId);
  };

  const handleClearCart = () => {
    clearCartMutation.mutate();
  };

  if (isLoading) {
    return (
      <Button variant="ghost" size="icon" className="hover:bg-primary-100 relative">
        <ShoppingCartIcon className="h-5 w-5 text-navyBlue-500" />
        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-sage-500 absolute -top-1 -right-1"></div>
      </Button>
    );
  }

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className="hover:bg-primary-100 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ShoppingCartIcon className="h-5 w-5 text-navyBlue-500" />
        {cart && cart.itemCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-sage-500 text-white text-xs">
            {cart.itemCount}
          </Badge>
        )}
      </Button>

      {/* Cart Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-xl border border-primary-200 z-50">
          <div className="p-4 border-b border-primary-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-navyBlue-500">Shopping Cart</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {cart && cart.items.length > 0 ? (
              <div className="p-4 space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-navyBlue-500 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-sm text-navyBlue-400">
                        ${item.product.price.toFixed(2)}
                      </p>
                      
                      <div className="flex items-center space-x-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={updateCartMutation.isPending}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="text-sm font-medium text-navyBlue-500 min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={updateCartMutation.isPending}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={removeFromCartMutation.isPending}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm font-semibold text-navyBlue-500">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <ShoppingCartIcon className="h-12 w-12 text-navyBlue-300 mx-auto mb-4" />
                <p className="text-navyBlue-400 mb-2">Your cart is empty</p>
                <p className="text-sm text-navyBlue-300">Add some items to get started</p>
              </div>
            )}
          </div>

          {cart && cart.items.length > 0 && (
            <div className="p-4 border-t border-primary-200 bg-primary-50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-navyBlue-500">Total:</span>
                <span className="text-lg font-bold text-sage-600">
                  ${cart.total.toFixed(2)}
                </span>
              </div>
              
              <div className="space-y-2">
                <Button 
                  className="w-full bg-sage-500 hover:bg-sage-600 text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Checkout
                </Button>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-sage-500 text-sage-500 hover:bg-sage-50"
                    onClick={() => setIsOpen(false)}
                  >
                    View Cart
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={handleClearCart}
                    disabled={clearCartMutation.isPending}
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
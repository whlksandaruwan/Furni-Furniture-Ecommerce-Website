import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { ShoppingCart as ShoppingCartIcon, X, Plus, Minus, Trash2 } from 'lucide-react';
import { cartService } from '../../../services/cart.service';
import { ImageWithFallback } from '../../common/ImageWithFallback';

export function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: cartService.getCart,
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ cartItemId, quantity }: { cartItemId: number; quantity: number }) =>
      cartService.updateCartItem(cartItemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: cartService.removeFromCart,
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
    if (newQuantity <= 0) {
      removeItemMutation.mutate(cartItemId);
    } else {
      updateQuantityMutation.mutate({ cartItemId, quantity: newQuantity });
    }
  };

  const handleRemoveItem = (cartItemId: number) => {
    removeItemMutation.mutate(cartItemId);
  };

  const handleClearCart = () => {
    clearCartMutation.mutate();
  };

  if (isLoading) {
    return (
      <Button variant="ghost" size="icon" className="hover:bg-white/20 w-10 h-10 relative">
        <ShoppingCartIcon className="h-6 w-6 text-white" />
      </Button>
    );
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-white/20 w-10 h-10 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ShoppingCartIcon className="h-6 w-6 text-white" />
        {cart && cart.itemCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-emerald-600 text-white">
            {cart.itemCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Cart Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-xl border z-50 max-h-96 overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Shopping Cart</h3>
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

            <div className="max-h-64 overflow-y-auto">
              {!cart || cart.items.length === 0 ? (
                <div className="p-8 text-center">
                  <ShoppingCartIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Your cart is empty</p>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <ImageWithFallback
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          ${item.product.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-red-600 hover:text-red-700"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart && cart.items.length > 0 && (
              <div className="p-4 border-t bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-900">
                    Total: ${cart.total.toFixed(2)}
                  </span>
                </div>
                <div className="space-y-2">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Checkout
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleClearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
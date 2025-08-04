import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { ShoppingCart as ShoppingCartIcon, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cartService, CartItem } from '../../services/cart.service';
import { productsService, Product } from '../../services/products.service';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function ShoppingCart() {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch cart data
  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: cartService.getCart,
    enabled: isAuthenticated,
  });

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) =>
      cartService.addToCart(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  // Update cart item mutation
  const updateCartItemMutation = useMutation({
    mutationFn: ({ cartItemId, quantity }: { cartItemId: number; quantity: number }) =>
      cartService.updateCartItem(cartItemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: cartService.removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const handleAddToCart = async (productId: number, quantity: number = 1) => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }
    addToCartMutation.mutate({ productId, quantity });
  };

  const handleUpdateQuantity = (cartItemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCartMutation.mutate(cartItemId);
    } else {
      updateCartItemMutation.mutate({ cartItemId, quantity });
    }
  };

  const handleRemoveItem = (cartItemId: number) => {
    removeFromCartMutation.mutate(cartItemId);
  };

  return (
    <>
      {/* Cart Icon */}
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCartIcon className="h-5 w-5" />
        {cart && cart.itemCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs">
            {cart.itemCount}
          </Badge>
        )}
      </Button>

      {/* Cart Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-4 overflow-y-auto max-h-[60vh]">
              {!isAuthenticated ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Please login to view your cart</p>
                  <Button onClick={() => setIsOpen(false)}>
                    Login
                  </Button>
                </div>
              ) : isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
                </div>
              ) : cart && cart.items.length > 0 ? (
                <div className="space-y-4">
                  {cart.items.map((item: CartItem) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="text-sm text-gray-600">
                          ${item.product.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={updateCartItemMutation.isPending}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={updateCartItemMutation.isPending}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={removeFromCartMutation.isPending}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShoppingCartIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Your cart is empty</p>
                </div>
              )}
            </div>

            {cart && cart.items.length > 0 && (
              <div className="p-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold">${cart.total.toFixed(2)}</span>
                </div>
                <Button className="w-full" onClick={() => setIsOpen(false)}>
                  Checkout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
} 
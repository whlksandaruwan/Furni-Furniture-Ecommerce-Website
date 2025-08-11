import api from './api';

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
  };
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export const cartService = {
  async getCart(): Promise<Cart> {
    const response = await api.get('/cart');
    return response.data;
  },

  async addToCart(productId: number, quantity: number): Promise<CartItem> {
    const response = await api.post('/cart', { productId, quantity });
    return response.data;
  },

  async updateCartItem(cartItemId: number, quantity: number): Promise<CartItem> {
    const response = await api.patch(`/cart/${cartItemId}`, { quantity });
    return response.data;
  },

  async removeFromCart(cartItemId: number): Promise<void> {
    await api.delete(`/cart/${cartItemId}`);
  },

  async clearCart(): Promise<void> {
    await api.delete('/cart');
  },
}; 
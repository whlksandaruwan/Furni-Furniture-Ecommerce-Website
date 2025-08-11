import api from './api';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isOnSale: boolean;
  rating: number;
  reviewCount: number;
  categoryId: number;
  category?: {
    id: number;
    name: string;
  };
  specifications?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const productsService = {
  async getProducts(params?: {
    page?: number;
    limit?: number;
    categoryId?: number;
    search?: string;
    isFeatured?: boolean;
    isNew?: boolean;
    isOnSale?: boolean;
  }): Promise<ProductsResponse> {
    const response = await api.get('/products', { params });
    return response.data;
  },

  async getProduct(id: number): Promise<Product> {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  async getFeaturedProducts(): Promise<Product[]> {
    const response = await api.get('/products/featured');
    return response.data;
  },

  async getNewProducts(): Promise<Product[]> {
    const response = await api.get('/products/new');
    return response.data;
  },

  async getOnSaleProducts(): Promise<Product[]> {
    const response = await api.get('/products/sale');
    return response.data;
  },
}; 
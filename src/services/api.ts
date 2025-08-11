// Mock API service - no backend required
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const api = {
  get: async (url: string, config?: any) => {
    await delay(500); // Simulate network delay
    
    if (url === '/cart') {
      return { data: mockCart };
    }
    
    if (url === '/products') {
      const params = config?.params || {};
      return { data: getFilteredProducts(params) };
    }
    
    if (url === '/products/featured') {
      return { data: mockProducts.filter(p => p.isFeatured).slice(0, 6) };
    }
    
    if (url === '/products/new') {
      return { data: mockProducts.filter(p => p.isNew).slice(0, 6) };
    }
    
    if (url === '/products/sale') {
      return { data: mockProducts.filter(p => p.isOnSale).slice(0, 6) };
    }
    
    if (url.startsWith('/products/')) {
      const id = parseInt(url.split('/')[2]);
      const product = mockProducts.find(p => p.id === id);
      if (product) {
        return { data: product };
      }
      throw new Error('Product not found');
    }
    
    throw new Error('Endpoint not found');
  },
  
  post: async (url: string, data: any) => {
    await delay(500);
    
    if (url === '/auth/login') {
      if (data.email === 'admin@furni.com' && data.password === 'admin123') {
        return { data: { user: mockAdminUser, token: 'mock-admin-token' } };
      }
      if (data.email === 'user@furni.com' && data.password === 'user123') {
        return { data: { user: mockUser, token: 'mock-user-token' } };
      }
      throw new Error('Invalid credentials');
    }
    
    if (url === '/auth/signup') {
      const newUser = {
        id: Date.now(),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: 'user',
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return { data: { user: newUser, token: 'mock-new-user-token' } };
    }
    
    if (url === '/cart') {
      const product = mockProducts.find(p => p.id === data.productId);
      if (product) {
        const newItem = {
          id: Date.now(),
          productId: data.productId,
          quantity: data.quantity,
          product: {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
          }
        };
        mockCart.items.push(newItem);
        mockCart.itemCount = mockCart.items.length;
        mockCart.total = mockCart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        return { data: newItem };
      }
      throw new Error('Product not found');
    }
    
    throw new Error('Endpoint not found');
  },
  
  patch: async (url: string, data: any) => {
    await delay(500);
    
    if (url.startsWith('/cart/')) {
      const itemId = parseInt(url.split('/')[2]);
      const item = mockCart.items.find(i => i.id === itemId);
      if (item) {
        item.quantity = data.quantity;
        mockCart.total = mockCart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        return { data: item };
      }
      throw new Error('Cart item not found');
    }
    
    if (url === '/users/profile') {
      return { data: { message: 'Profile updated successfully' } };
    }
    
    throw new Error('Endpoint not found');
  },
  
  delete: async (url: string) => {
    await delay(500);
    
    if (url.startsWith('/cart/')) {
      const itemId = parseInt(url.split('/')[2]);
      const index = mockCart.items.findIndex(i => i.id === itemId);
      if (index !== -1) {
        mockCart.items.splice(index, 1);
        mockCart.itemCount = mockCart.items.length;
        mockCart.total = mockCart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        return { data: { message: 'Item removed' } };
      }
      throw new Error('Cart item not found');
    }
    
    if (url === '/cart') {
      mockCart.items = [];
      mockCart.itemCount = 0;
      mockCart.total = 0;
      return { data: { message: 'Cart cleared' } };
    }
    
    throw new Error('Endpoint not found');
  }
};

// Mock data
const mockProducts = [
  {
    id: 1,
    name: "Nordic Chair",
    description: "A beautiful Nordic-style chair perfect for modern homes. Crafted with premium materials and designed for comfort.",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    ],
    stock: 15,
    isActive: true,
    isFeatured: true,
    isNew: true,
    isOnSale: true,
    rating: 4.8,
    reviewCount: 24,
    categoryId: 1,
    category: { id: 1, name: "Chairs" },
    specifications: {
      material: "Oak Wood",
      dimensions: "45cm x 50cm x 80cm",
      weight: "8kg"
    },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    name: "Kruzo Aero Chair",
    description: "Ergonomic office chair with premium comfort and modern design.",
    price: 450.00,
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    stock: 8,
    isActive: true,
    isFeatured: true,
    isNew: false,
    isOnSale: false,
    rating: 4.9,
    reviewCount: 31,
    categoryId: 1,
    category: { id: 1, name: "Chairs" },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: 3,
    name: "Ergonomic Chair",
    description: "Professional ergonomic chair designed for long working hours.",
    price: 320.00,
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    stock: 12,
    isActive: true,
    isFeatured: false,
    isNew: true,
    isOnSale: false,
    rating: 4.7,
    reviewCount: 18,
    categoryId: 1,
    category: { id: 1, name: "Chairs" },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: 4,
    name: "Modern Dining Table",
    description: "Elegant dining table perfect for family gatherings.",
    price: 899.00,
    originalPrice: 1199.00,
    image: "https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    stock: 5,
    isActive: true,
    isFeatured: true,
    isNew: false,
    isOnSale: true,
    rating: 4.6,
    reviewCount: 42,
    categoryId: 2,
    category: { id: 2, name: "Tables" },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: 5,
    name: "Luxury Sofa",
    description: "Premium 3-seater sofa with exceptional comfort.",
    price: 1299.00,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    stock: 3,
    isActive: true,
    isFeatured: true,
    isNew: true,
    isOnSale: false,
    rating: 4.9,
    reviewCount: 67,
    categoryId: 3,
    category: { id: 3, name: "Sofas" },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: 6,
    name: "Storage Cabinet",
    description: "Spacious storage cabinet with modern design.",
    price: 549.00,
    image: "https://images.unsplash.com/photo-1586286292644-67d0eda295b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    stock: 7,
    isActive: true,
    isFeatured: false,
    isNew: false,
    isOnSale: true,
    rating: 4.4,
    reviewCount: 23,
    categoryId: 4,
    category: { id: 4, name: "Storage" },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
];

const mockUser = {
  id: 1,
  email: "user@furni.com",
  firstName: "John",
  lastName: "Doe",
  role: "user" as const,
  phone: "+1234567890",
  address: "123 Main St",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  country: "USA",
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z"
};

const mockAdminUser = {
  id: 2,
  email: "admin@furni.com",
  firstName: "Admin",
  lastName: "User",
  role: "admin" as const,
  phone: "+1234567890",
  address: "456 Admin St",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  country: "USA",
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z"
};

let mockCart = {
  items: [] as any[],
  total: 0,
  itemCount: 0
};

function getFilteredProducts(params: any) {
  let filtered = [...mockProducts];
  
  if (params.search) {
    const search = params.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(search) || 
      p.description.toLowerCase().includes(search)
    );
  }
  
  if (params.categoryId) {
    filtered = filtered.filter(p => p.categoryId === parseInt(params.categoryId));
  }
  
  if (params.isFeatured) {
    filtered = filtered.filter(p => p.isFeatured);
  }
  
  if (params.isNew) {
    filtered = filtered.filter(p => p.isNew);
  }
  
  if (params.isOnSale) {
    filtered = filtered.filter(p => p.isOnSale);
  }
  
  const page = params.page || 1;
  const limit = params.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    products: filtered.slice(startIndex, endIndex),
    total: filtered.length,
    page,
    limit,
    totalPages: Math.ceil(filtered.length / limit)
  };
}

export default api;
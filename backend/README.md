# Furni Ecommerce Backend

A NestJS backend for the Furni furniture ecommerce website.

## Features

- 🔐 **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (User/Admin)
  - Login/Signup endpoints

- 🛍️ **Ecommerce Features**
  - Product management (CRUD)
  - Category management
  - Shopping cart functionality
  - Order management
  - User profiles

- 🗄️ **Database**
  - MySQL database
  - TypeORM for database operations
  - Entity relationships

## Setup

### Prerequisites

- Node.js (v16 or higher)
- MySQL database
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your database credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=your_password
   DB_DATABASE=furni_ecommerce
   JWT_SECRET=your-super-secret-jwt-key
   ```

3. **Database Setup**
   ```sql
   CREATE DATABASE furni_ecommerce;
   ```

4. **Run the application**
   ```bash
   # Development
   npm run start:dev
   
   # Production
   npm run build
   npm run start:prod
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/featured` - Get featured products
- `GET /api/products/new` - Get new products
- `GET /api/products/sale` - Get products on sale
- `POST /api/products` - Create product (Admin only)
- `PATCH /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

## Database Schema

### Users
- Authentication and user profiles
- Role-based access (User/Admin)

### Products
- Product catalog with categories
- Pricing, stock, and status management

### Categories
- Product categorization

### Cart Items
- Shopping cart functionality

### Orders
- Order management and tracking

## Development

### Running in Development Mode
```bash
npm run start:dev
```

### Running Tests
```bash
npm run test
npm run test:e2e
```

### Database Migrations
```bash
npm run typeorm migration:generate
npm run typeorm migration:run
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | Database host | localhost |
| `DB_PORT` | Database port | 3306 |
| `DB_USERNAME` | Database username | root |
| `DB_PASSWORD` | Database password | - |
| `DB_DATABASE` | Database name | furni_ecommerce |
| `JWT_SECRET` | JWT secret key | - |
| `JWT_EXPIRES_IN` | JWT expiration time | 7d |
| `PORT` | Server port | 3001 |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:5173 |

# Furni Furniture Ecommerce Website

A full-stack ecommerce application for a modern furniture store built with React, TypeScript, NestJS, and MySQL.

## 🏗️ Project Structure

```
furni-furniture-ecommerce/
├── frontend/          # React + TypeScript frontend
│   ├── components/    # UI components
│   ├── src/          # Source files
│   └── styles/       # CSS styles
├── backend/           # NestJS + MySQL backend
│   ├── src/          # Source files
│   │   ├── auth/     # Authentication
│   │   ├── products/ # Product management
│   │   └── entities/ # Database entities
│   └── env.example   # Environment variables
└── README.md         # This file
```

## 🚀 Features

### Frontend (React + TypeScript)
- ✅ **Modern UI/UX** with Tailwind CSS
- ✅ **Responsive Design** for all devices
- ✅ **Component Library** with Radix UI
- ✅ **TypeScript** for type safety
- ✅ **Vite** for fast development

### Backend (NestJS + MySQL)
- ✅ **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (User/Admin)
  - Login/Signup functionality
- ✅ **Ecommerce Features**
  - Product management (CRUD)
  - Category management
  - Shopping cart functionality
  - Order management
  - User profiles
- ✅ **Database**
  - MySQL database
  - TypeORM for database operations
  - Entity relationships

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Component library
- **Vite** - Build tool
- **Lucide React** - Icons

### Backend
- **NestJS** - Node.js framework
- **TypeScript** - Type safety
- **TypeORM** - Database ORM
- **MySQL** - Database
- **JWT** - Authentication
- **Passport** - Authentication strategy
- **bcryptjs** - Password hashing
- **class-validator** - Validation

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MySQL database
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd furni-furniture-ecommerce
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Update .env with your database credentials
# DB_HOST=localhost
# DB_PORT=3306
# DB_USERNAME=root
# DB_PASSWORD=your_password
# DB_DATABASE=furni_ecommerce
# JWT_SECRET=your-super-secret-jwt-key

# Create MySQL database
mysql -u root -p
CREATE DATABASE furni_ecommerce;

# Start the backend server
npm run start:dev
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🌐 Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001/api

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Product Endpoints
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/featured` - Get featured products
- `GET /api/products/new` - Get new products
- `GET /api/products/sale` - Get products on sale
- `POST /api/products` - Create product (Admin only)
- `PATCH /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

## 🗄️ Database Schema

### Core Entities
- **Users** - Authentication and user profiles
- **Products** - Product catalog with categories
- **Categories** - Product categorization
- **Cart Items** - Shopping cart functionality
- **Orders** - Order management and tracking

## 🔧 Development

### Running Both Servers
```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Database Migrations
```bash
cd backend
npm run typeorm migration:generate
npm run typeorm migration:run
```

### Testing
```bash
# Backend tests
cd backend
npm run test
npm run test:e2e

# Frontend tests (when implemented)
cd frontend
npm run test
```

## 🚀 Deployment

### Backend Deployment
1. Build the application
   ```bash
   cd backend
   npm run build
   ```

2. Set up production environment variables
3. Deploy to your preferred hosting service

### Frontend Deployment
1. Build the application
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the development team. 
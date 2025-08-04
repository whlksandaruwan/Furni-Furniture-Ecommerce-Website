import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './src/contexts/AuthContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Categories } from './components/Categories';
import { FeaturedProducts } from './components/FeaturedProducts';
import { Services } from './components/Services';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { Login } from './src/components/auth/Login';
import { Signup } from './src/components/auth/Signup';
import { Account } from './src/components/account/Account';
import { ProtectedRoute } from './src/components/auth/ProtectedRoute';
import { ProductsList } from './src/components/products/ProductsList';
import { AdminDashboard } from './src/components/admin/AdminDashboard';

const queryClient = new QueryClient();

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <Services />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/products" element={<ProductsList />} />
            <Route 
              path="/account" 
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}
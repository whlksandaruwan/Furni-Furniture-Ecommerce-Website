import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './src/contexts/AuthContext';
import { Header } from './src/components/layout/Header';
import { Hero } from './src/components/features/home/Hero';
import { Categories } from './src/components/features/home/Categories';
import { FeaturedProducts } from './src/components/features/home/FeaturedProducts';
import { Offers } from './src/components/features/home/Offers';
import { Services } from './src/components/features/home/Services';
import { Newsletter } from './src/components/features/home/Newsletter';
import { Footer } from './src/components/layout/Footer';
import { Login } from './src/components/features/auth/Login';
import { Signup } from './src/components/features/auth/Signup';
import { Account } from './src/components/features/account/Account';
import { ProtectedRoute } from './src/components/features/auth/ProtectedRoute';
import { ProductsList } from './src/components/features/products/ProductsList';
import { AdminDashboard } from './src/components/features/admin/AdminDashboard';
import { AboutUs } from './src/components/pages/AboutUs';
import { Services as ServicesPage } from './src/components/pages/Services';
import { Blog } from './src/components/pages/Blog';
import { ContactUs } from './src/components/pages/ContactUs';
import { Chatbot } from './src/components/features/chatbot/Chatbot';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router basename="/furni-furniture-ecommerce">
          <div className="min-h-screen bg-white">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <>
                  <Header />
                  <Hero />
                  <Categories />
                  <FeaturedProducts />
                  <Offers />
                  <Services />
                  <Newsletter />
                  <Footer />
                  <Chatbot />
                </>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/products" element={<ProductsList />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<ContactUs />} />

              {/* Protected Routes */}
              <Route path="/account" element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
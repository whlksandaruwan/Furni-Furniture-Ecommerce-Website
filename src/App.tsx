import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/layout/Header';
import { Hero } from './components/features/home/Hero';
import { Categories } from './components/features/home/Categories';
import { FeaturedProducts } from './components/features/home/FeaturedProducts';
import { Offers } from './components/features/home/Offers';
import { Services } from './components/features/home/Services';
import { Newsletter } from './components/features/home/Newsletter';
import { Footer } from './components/layout/Footer';
import { Login } from './components/features/auth/Login';
import { Signup } from './components/features/auth/Signup';
import { Account } from './components/features/account/Account';
import { ProtectedRoute } from './components/features/auth/ProtectedRoute';
import { ProductsList } from './components/features/products/ProductsList';
import { AdminDashboard } from './components/features/admin/AdminDashboard';
import { AboutUs } from './components/pages/AboutUs';
import { Services as ServicesPage } from './components/pages/Services';
import { Blog } from './components/pages/Blog';
import { ContactUs } from './components/pages/ContactUs';
import { Chatbot } from './components/features/chatbot/Chatbot';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <Categories />
                  <FeaturedProducts />
                  <Offers />
                  <Services />
                  <Newsletter />
                </>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/products" element={<ProductsList />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/account" element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
            </Routes>
            <Footer />
            <Chatbot />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
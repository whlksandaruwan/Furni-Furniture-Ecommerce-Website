import { Search, ShoppingCart as ShoppingCartIcon, Menu, X, User, LogOut, Settings, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState, useEffect } from 'react';
import { useAuth } from '../src/contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart as ShoppingCartComponent } from '../src/components/cart/ShoppingCart';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const location = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <header className="bg-white border-b border-sage-200 sticky top-0 z-50 shadow-sm backdrop-blur-sm bg-white/95 transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <h1 className="text-4xl font-bold text-black hover:text-primary-500 transition-colors duration-300">Furni.</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-lg text-sage-700 hover:text-primary-500 transition-all duration-300 font-medium relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/products" className="text-lg text-sage-700 hover:text-primary-500 transition-all duration-300 font-medium relative group">
              Shop
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/about" className="text-lg text-sage-700 hover:text-primary-500 transition-all duration-300 font-medium relative group">
              About us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/services" className="text-lg text-sage-700 hover:text-primary-500 transition-all duration-300 font-medium relative group">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/blog" className="text-lg text-sage-700 hover:text-primary-500 transition-all duration-300 font-medium relative group">
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/contact" className="text-lg text-sage-700 hover:text-primary-500 transition-all duration-300 font-medium relative group">
              Contact us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="icon" className="hover:bg-sage-100 transition-colors duration-300">
              <Search className="h-5 w-5 text-sage-700 hover:text-primary-500 transition-colors duration-300" />
            </Button>
            
            {/* Favorites */}
            <Button variant="ghost" size="icon" className="hover:bg-sage-100 transition-colors duration-300">
              <Heart className="h-5 w-5 text-sage-700 hover:text-primary-500 transition-colors duration-300" />
            </Button>
            
            {/* Shopping Cart */}
            <ShoppingCartComponent />

            {/* Profile/Auth */}
            {isAuthenticated ? (
              <div className="relative">
                <Link to="/account">
                  <Button variant="ghost" size="icon" className="hover:bg-sage-100 transition-colors duration-300">
                    <User className="h-5 w-5 text-sage-700 hover:text-primary-500 transition-colors duration-300" />
                  </Button>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon" className="hover:bg-sage-100 transition-colors duration-300">
                  <User className="h-5 w-5 text-sage-700 hover:text-primary-500 transition-colors duration-300" />
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden hover:bg-sage-100 transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5 text-sage-700" /> : <Menu className="h-5 w-5 text-sage-700" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-sage-200 py-4 bg-sage-50 animate-in slide-in-from-top-2 duration-300">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-lg text-sage-700 hover:text-primary-500 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-sage-100">Home</Link>
              <Link to="/products" className="text-lg text-sage-700 hover:text-primary-500 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-sage-100">Shop</Link>
              <Link to="/about" className="text-lg text-sage-700 hover:text-primary-500 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-sage-100">About us</Link>
              <Link to="/services" className="text-lg text-sage-700 hover:text-primary-500 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-sage-100">Services</Link>
              <Link to="/blog" className="text-lg text-sage-700 hover:text-primary-500 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-sage-100">Blog</Link>
              <Link to="/contact" className="text-lg text-sage-700 hover:text-primary-500 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-sage-100">Contact us</Link>
              
              {/* Mobile Auth Links */}
              {isAuthenticated ? (
                <div className="pt-4 border-t border-sage-200 space-y-4">
                  <Link to="/account" className="text-lg text-sage-700 hover:text-primary-500 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-sage-100">My Account</Link>
                  {isAdmin && (
                    <Link to="/admin" className="text-lg text-sage-700 hover:text-primary-500 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-sage-100">Admin Dashboard</Link>
                  )}
                  <button onClick={logout} className="text-lg text-sage-700 hover:text-primary-500 transition-colors font-medium text-left px-4 py-2 rounded-lg hover:bg-sage-100">
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-sage-200 space-y-4">
                  <Link to="/login" className="text-lg text-sage-700 hover:text-primary-500 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-sage-100">Sign In</Link>
                  <Link to="/signup" className="text-lg text-sage-700 hover:text-primary-500 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-sage-100">Sign Up</Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
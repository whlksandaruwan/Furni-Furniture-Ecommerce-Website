import { Search, ShoppingCart as ShoppingCartIcon, Menu, X, User, LogOut, Settings, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState } from 'react';
import { useAuth } from '../src/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { ShoppingCart as ShoppingCartComponent } from '../src/components/cart/ShoppingCart';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, isAdmin } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-3xl font-bold text-primary">Furni.</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-xl text-gray-700 hover:text-primary transition-colors font-medium">Home</Link>
            <Link to="/products" className="text-xl text-gray-700 hover:text-primary transition-colors font-medium">Shop</Link>
            <Link to="/about" className="text-xl text-gray-700 hover:text-primary transition-colors font-medium">About us</Link>
            <Link to="/services" className="text-xl text-gray-700 hover:text-primary transition-colors font-medium">Services</Link>
            <Link to="/blog" className="text-xl text-gray-700 hover:text-primary transition-colors font-medium">Blog</Link>
            <Link to="/contact" className="text-xl text-gray-700 hover:text-primary transition-colors font-medium">Contact us</Link>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            
            {/* Favorites */}
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            
            {/* Shopping Cart */}
            <ShoppingCartComponent />

            {/* Profile/Auth */}
            {isAuthenticated ? (
              <div className="relative">
                <Link to="/account">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-xl text-gray-700 hover:text-primary transition-colors font-medium">Home</Link>
              <Link to="/products" className="text-xl text-gray-700 hover:text-primary transition-colors font-medium">Shop</Link>
              <Link to="/about" className="text-xl text-gray-700 hover:text-primary transition-colors font-medium">About us</Link>
              <Link to="/services" className="text-xl text-gray-700 hover:text-primary transition-colors font-medium">Services</Link>
              <Link to="/blog" className="text-xl text-gray-700 hover:text-primary transition-colors font-medium">Blog</Link>
              <Link to="/contact" className="text-xl text-gray-700 hover:text-primary transition-colors font-medium">Contact us</Link>
              
              {/* Mobile Auth Links */}
              {isAuthenticated ? (
                <div className="pt-4 border-t border-gray-200 space-y-4">
                  <Link to="/account" className="text-xl text-gray-700 hover:text-primary transition-colors font-medium">My Account</Link>
                  {isAdmin && (
                    <Link to="/admin" className="text-xl text-gray-700 hover:text-primary transition-colors font-medium">Admin Dashboard</Link>
                  )}
                  <button onClick={logout} className="text-xl text-gray-700 hover:text-primary transition-colors font-medium text-left">
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 space-y-4">
                  <Link to="/login" className="text-xl text-gray-700 hover:text-primary transition-colors font-medium">Sign In</Link>
                  <Link to="/signup" className="text-xl text-gray-700 hover:text-primary transition-colors font-medium">Sign Up</Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
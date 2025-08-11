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
    <header className="bg-white border-b border-lightGray-300 sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-4xl font-bold text-black">Furni.</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-lg text-navyBlue-500 hover:text-emerald-600 transition-colors font-medium">Home</Link>
            <Link to="/products" className="text-lg text-navyBlue-500 hover:text-emerald-600 transition-colors font-medium">Shop</Link>
            <Link to="/about" className="text-lg text-navyBlue-500 hover:text-emerald-600 transition-colors font-medium">About us</Link>
            <Link to="/services" className="text-lg text-navyBlue-500 hover:text-emerald-600 transition-colors font-medium">Services</Link>
            <Link to="/blog" className="text-lg text-navyBlue-500 hover:text-emerald-600 transition-colors font-medium">Blog</Link>
            <Link to="/contact" className="text-lg text-navyBlue-500 hover:text-emerald-600 transition-colors font-medium">Contact us</Link>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="icon" className="hover:bg-emerald-100">
              <Search className="h-5 w-5 text-navyBlue-500" />
            </Button>
            
            {/* Favorites */}
            <Button variant="ghost" size="icon" className="hover:bg-emerald-100">
              <Heart className="h-5 w-5 text-navyBlue-500" />
            </Button>
            
            {/* Shopping Cart */}
            <ShoppingCartComponent />

            {/* Profile/Auth */}
            {isAuthenticated ? (
              <div className="relative">
                <Link to="/account">
                  <Button variant="ghost" size="icon" className="hover:bg-emerald-100">
                    <User className="h-5 w-5 text-navyBlue-500" />
                  </Button>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon" className="hover:bg-emerald-100">
                  <User className="h-5 w-5 text-navyBlue-500" />
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden hover:bg-emerald-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5 text-navyBlue-500" /> : <Menu className="h-5 w-5 text-navyBlue-500" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-lightGray-300 py-4 bg-emerald-50">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-lg text-navyBlue-500 hover:text-emerald-600 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-emerald-100">Home</Link>
              <Link to="/products" className="text-lg text-navyBlue-500 hover:text-emerald-600 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-emerald-100">Shop</Link>
              <Link to="/about" className="text-lg text-navyBlue-500 hover:text-emerald-600 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-emerald-100">About us</Link>
              <Link to="/services" className="text-lg text-navyBlue-500 hover:text-emerald-600 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-emerald-100">Services</Link>
              <Link to="/blog" className="text-lg text-navyBlue-500 hover:text-emerald-600 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-emerald-100">Blog</Link>
              <Link to="/contact" className="text-lg text-navyBlue-500 hover:text-emerald-600 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-emerald-100">Contact us</Link>
              
              {/* Mobile Auth Links */}
              {isAuthenticated ? (
                <div className="pt-4 border-t border-lightGray-300 space-y-4">
                  <Link to="/account" className="text-lg text-navyBlue-500 hover:text-emerald-600 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-emerald-100">My Account</Link>
                  {isAdmin && (
                    <Link to="/admin" className="text-lg text-navyBlue-500 hover:text-emerald-600 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-emerald-100">Admin Dashboard</Link>
                  )}
                  <button onClick={logout} className="text-lg text-navyBlue-500 hover:text-emerald-600 transition-colors font-medium text-left px-4 py-2 rounded-lg hover:bg-emerald-100">
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-lightGray-300 space-y-4">
                  <Link to="/login" className="text-lg text-navyBlue-500 hover:text-emerald-600 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-emerald-100">Sign In</Link>
                  <Link to="/signup" className="text-lg text-navyBlue-500 hover:text-emerald-600 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-emerald-100">Sign Up</Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
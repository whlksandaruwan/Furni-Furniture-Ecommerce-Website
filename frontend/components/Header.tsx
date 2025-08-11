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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <header className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-200 sticky top-0 z-50 shadow-sm backdrop-blur-sm">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <h1 className="text-4xl font-bold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer">Furni.</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-lg text-emerald-700 hover:text-emerald-800 transition-colors font-medium">Home</Link>
            <Link to="/products" className="text-lg text-emerald-700 hover:text-emerald-800 transition-colors font-medium">Shop</Link>
            <Link to="/about" className="text-lg text-emerald-700 hover:text-emerald-800 transition-colors font-medium">About us</Link>
            <Link to="/services" className="text-lg text-emerald-700 hover:text-emerald-800 transition-colors font-medium">Services</Link>
            <Link to="/blog" className="text-lg text-emerald-700 hover:text-emerald-800 transition-colors font-medium">Blog</Link>
            <Link to="/contact" className="text-lg text-emerald-700 hover:text-emerald-800 transition-colors font-medium">Contact us</Link>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="icon" className="hover:bg-emerald-200/50 w-10 h-10">
              <Search className="h-6 w-6 text-emerald-700" />
            </Button>
            
            {/* Favorites */}
            <Button variant="ghost" size="icon" className="hover:bg-emerald-200/50 w-10 h-10">
              <Heart className="h-6 w-6 text-emerald-700" />
            </Button>
            
            {/* Shopping Cart */}
            <ShoppingCartComponent />

            {/* Profile/Auth */}
            {isAuthenticated ? (
              <div className="relative">
                <Link to="/account">
                  <Button variant="ghost" size="icon" className="hover:bg-emerald-200/50 w-10 h-10">
                    <User className="h-6 w-6 text-emerald-700" />
                  </Button>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon" className="hover:bg-emerald-200/50 w-10 h-10">
                  <User className="h-6 w-6 text-emerald-700" />
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden hover:bg-emerald-200/50 w-10 h-10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6 text-emerald-700" /> : <Menu className="h-6 w-6 text-emerald-700" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-emerald-200 py-4 bg-emerald-100/50 backdrop-blur-sm">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-lg text-emerald-700 hover:text-emerald-800 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-emerald-200/50" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/products" className="text-lg text-emerald-700 hover:text-emerald-800 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-emerald-200/50" onClick={() => setIsMenuOpen(false)}>Shop</Link>
              <Link to="/about" className="text-lg text-emerald-700 hover:text-emerald-800 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-emerald-200/50" onClick={() => setIsMenuOpen(false)}>About us</Link>
              <Link to="/services" className="text-lg text-emerald-700 hover:text-emerald-800 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-emerald-200/50" onClick={() => setIsMenuOpen(false)}>Services</Link>
              <Link to="/blog" className="text-lg text-emerald-700 hover:text-emerald-800 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-emerald-200/50" onClick={() => setIsMenuOpen(false)}>Blog</Link>
              <Link to="/contact" className="text-lg text-emerald-700 hover:text-emerald-800 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-emerald-200/50" onClick={() => setIsMenuOpen(false)}>Contact us</Link>
              
              {/* Mobile Auth Links */}
              {isAuthenticated ? (
                <div className="pt-4 border-t border-emerald-200 space-y-4">
                  <Link to="/account" className="text-lg text-emerald-700 hover:text-emerald-800 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-emerald-200/50" onClick={() => setIsMenuOpen(false)}>My Account</Link>
                  {isAdmin && (
                    <Link to="/admin" className="text-lg text-emerald-700 hover:text-emerald-800 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-emerald-200/50" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</Link>
                  )}
                  <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-lg text-emerald-700 hover:text-emerald-800 transition-colors font-medium text-left px-4 py-2 rounded-lg hover:bg-emerald-200/50">
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-emerald-200 space-y-4">
                  <Link to="/login" className="text-lg text-emerald-700 hover:text-emerald-800 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-emerald-200/50" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                  <Link to="/signup" className="text-lg text-emerald-700 hover:text-emerald-800 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-emerald-200/50" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
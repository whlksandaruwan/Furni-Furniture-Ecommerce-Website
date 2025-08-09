import { Search, ShoppingCart as ShoppingCartIcon, Menu, X, User, LogOut, Settings } from 'lucide-react';
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
            <h1 className="text-2xl font-bold text-primary">Furni.</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-primary transition-colors">Shop</Link>
            <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">About us</Link>
            <Link to="/services" className="text-gray-700 hover:text-primary transition-colors">Services</Link>
            <Link to="/blog" className="text-gray-700 hover:text-primary transition-colors">Blog</Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">Contact us</Link>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>
            
            <ShoppingCartComponent />

            {/* Auth buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="ghost" size="icon">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </Link>
                )}
                <Link to="/account">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={logout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
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
              <Link to="/" className="text-gray-700 hover:text-primary transition-colors">Home</Link>
              <Link to="/products" className="text-gray-700 hover:text-primary transition-colors">Shop</Link>
              <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">About us</Link>
              <Link to="/services" className="text-gray-700 hover:text-primary transition-colors">Services</Link>
              <Link to="/blog" className="text-gray-700 hover:text-primary transition-colors">Blog</Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">Contact us</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
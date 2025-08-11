import { Search, ShoppingCart as ShoppingCartIcon, Menu, X, User, LogOut, Settings, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState, useEffect } from 'react';
import { useAuth } from '../src/contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart as ShoppingCartComponent } from '../src/components/cart/ShoppingCart';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const location = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // Scrolling up or at top - show header
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px - hide header
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`bg-navyBlue-500 border-b border-navyBlue-400 sticky top-0 z-50 shadow-lg backdrop-blur-sm transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <h1 className="text-4xl font-bold text-white hover:text-emerald-200 transition-colors cursor-pointer">Furni.</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-lg text-white hover:text-emerald-200 transition-colors font-medium">Home</Link>
            <Link to="/products" className="text-lg text-white hover:text-emerald-200 transition-colors font-medium">Shop</Link>
            <Link to="/about" className="text-lg text-white hover:text-emerald-200 transition-colors font-medium">About us</Link>
            <Link to="/services" className="text-lg text-white hover:text-emerald-200 transition-colors font-medium">Services</Link>
            <Link to="/blog" className="text-lg text-white hover:text-emerald-200 transition-colors font-medium">Blog</Link>
            <Link to="/contact" className="text-lg text-white hover:text-emerald-200 transition-colors font-medium">Contact us</Link>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="icon" className="hover:bg-white/20 w-10 h-10">
              <Search className="h-6 w-6 text-white" />
            </Button>
            
            {/* Favorites */}
            <Button variant="ghost" size="icon" className="hover:bg-white/20 w-10 h-10">
              <Heart className="h-6 w-6 text-white" />
            </Button>
            
            {/* Shopping Cart */}
            <ShoppingCartComponent />

            {/* Profile/Auth */}
            {isAuthenticated ? (
              <div className="relative">
                <Link to="/account">
                  <Button variant="ghost" size="icon" className="hover:bg-white/20 w-10 h-10">
                    <User className="h-6 w-6 text-white" />
                  </Button>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon" className="hover:bg-white/20 w-10 h-10">
                  <User className="h-6 w-6 text-white" />
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden hover:bg-white/20 w-10 h-10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-4 bg-navyBlue-600/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-lg text-white hover:text-emerald-200 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-white/20" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/products" className="text-lg text-white hover:text-emerald-200 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-white/20" onClick={() => setIsMenuOpen(false)}>Shop</Link>
              <Link to="/about" className="text-lg text-white hover:text-emerald-200 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-white/20" onClick={() => setIsMenuOpen(false)}>About us</Link>
              <Link to="/services" className="text-lg text-white hover:text-emerald-200 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-white/20" onClick={() => setIsMenuOpen(false)}>Services</Link>
              <Link to="/blog" className="text-lg text-white hover:text-emerald-200 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-white/20" onClick={() => setIsMenuOpen(false)}>Blog</Link>
              <Link to="/contact" className="text-lg text-white hover:text-emerald-200 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-white/20" onClick={() => setIsMenuOpen(false)}>Contact us</Link>
              
              {/* Mobile Auth Links */}
              {isAuthenticated ? (
                <div className="pt-4 border-t border-white/20 space-y-4">
                  <Link to="/account" className="text-lg text-white hover:text-emerald-200 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-white/20" onClick={() => setIsMenuOpen(false)}>My Account</Link>
                  {isAdmin && (
                    <Link to="/admin" className="text-lg text-white hover:text-emerald-200 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-white/20" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</Link>
                  )}
                  <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-lg text-white hover:text-emerald-200 transition-colors font-medium text-left px-4 py-2 rounded-lg hover:bg-white/20">
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-white/20 space-y-4">
                  <Link to="/login" className="text-lg text-white hover:text-emerald-200 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-white/20" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                  <Link to="/signup" className="text-lg text-white hover:text-emerald-200 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-white/20" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
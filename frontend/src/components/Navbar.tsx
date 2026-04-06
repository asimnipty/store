import { Link } from 'react-router-dom';
import { ShoppingCart, Zap, Menu, X } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useState } from 'react';

export function Navbar() {
  const { items, toggleCart } = useCartStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Zap className="h-8 w-8 text-blue-600" fill="currentColor" />
              <span className="font-bold text-xl tracking-tight text-gray-900">VoltStore</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Home</Link>
            <Link to="/shop" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Shop</Link>
            <button 
              onClick={toggleCart}
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-blue-600 rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleCart}
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-blue-600 rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

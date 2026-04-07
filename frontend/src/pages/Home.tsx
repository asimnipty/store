import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';
import { Product } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setFeaturedProducts(data.slice(0, 3));
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=2000"
            alt="Electronics background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Welcare – Your Trusted Partner in Saving Electricity
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10">
              Originality – Imagination - Aspiration
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-blue-600 border border-transparent rounded-full hover:bg-blue-700 transition-colors"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                View Offers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl">
              <div className="flex-shrink-0 p-3 bg-blue-100 text-blue-600 rounded-xl">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Lightning Fast</h3>
                <p className="text-sm text-gray-500">Next-day delivery on all orders</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl">
              <div className="flex-shrink-0 p-3 bg-blue-100 text-blue-600 rounded-xl">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Secure Warranty</h3>
                <p className="text-sm text-gray-500">2-year protection included</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl">
              <div className="flex-shrink-0 p-3 bg-blue-100 text-blue-600 rounded-xl">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Free Shipping</h3>
                <p className="text-sm text-gray-500">On orders over $50</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gray-50 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
              <p className="text-gray-600 max-w-2xl">Handpicked premium electronics designed to elevate your everyday workflow and entertainment.</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center text-blue-600 font-medium hover:text-blue-700">
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="mt-10 text-center md:hidden">
            <Link to="/shop" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700">
              View all products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

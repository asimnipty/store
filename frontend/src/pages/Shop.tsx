import { useState, useMemo, useEffect } from 'react';
import { Product } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Filter } from 'lucide-react';

export function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products", err);
        setLoading(false);
      });
  }, []);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter(p => p.category === selectedCategory);
  }, [selectedCategory, products]);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
            <p className="text-gray-600">Browse our complete collection of premium electronics.</p>
          </div>
          
          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <div className="flex items-center text-gray-500 mr-2">
              <Filter className="h-5 w-5 mr-2" />
              <span className="font-medium">Filter:</span>
            </div>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-24">
                <p className="text-xl text-gray-500">No products found in this category.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import ProductModal from '../components/ProductModal';

const ProductsPage = ({ onAddToCart, preSelectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(preSelectedCategory || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false); });
  }, []);

  useEffect(() => {
    let result = products;
    if (activeCategory !== 'All') result = result.filter(p => p.category === activeCategory);
    if (searchQuery) result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredProducts(result);
  }, [activeCategory, searchQuery, products]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Products</h1>
          <div className="flex gap-2">
            {['All', 'Electronics', 'Accessories'].map(cat => (
              <button key={cat} className="px-4 py-2 rounded-md bg-white border border-slate-200 text-xs font-bold text-slate-500 hover:border-blue-600 transition-all">
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product._id} className="bg-white p-6 rounded-lg border border-slate-100 hover:shadow-xl transition-all group">
              <div className="aspect-square bg-slate-50 rounded-md flex items-center justify-center text-4xl mb-4 group-hover:scale-105 transition-transform">📦</div>
              <h3 className="text-md font-bold text-slate-800">{product.name}</h3>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">{product.category}</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                <span className="text-lg font-bold text-slate-900">${product.price}</span>
                <button onClick={() => onAddToCart(product)} className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7v14"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
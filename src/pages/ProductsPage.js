import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { LoadingSpinner, ErrorMessage } from '../components/UI';
import { apiService } from '../services/api';

export function ProductsPage({ onAddToCart, preSelectedCategory = null }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(preSelectedCategory);

  useEffect(() => {
    setSelectedCategory(preSelectedCategory);
  }, [preSelectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      let data;
      
      if (selectedCategory) {
        data = await apiService.getProductsByCategory(selectedCategory);
      } else {
        data = await apiService.getAllProducts();
      }
      
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="container">
      {categories.length > 0 && (
        <div className="filters">
          <button 
            className={`filter-btn ${!selectedCategory ? 'active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            All Products
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      
      {!loading && !error && (
        <div className="products-grid">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsPage;

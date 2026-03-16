import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export function ProductCarousel({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await apiService.getAllProducts();
        // Sort by createdAt (latest first) and limit to 5
        const latestProducts = allProducts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);
        setProducts(latestProducts);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 2) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 2;
      return newIndex < 0 ? products.length - 2 : newIndex;
    });
  };

  if (loading) {
    return (
      <section className="carousel-section">
        <div className="carousel-loading">Loading carousel...</div>
      </section>
    );
  }

  if (error || products.length === 0) {
    return (
      <section className="carousel-section">
        <div className="carousel-error">{error || 'No products available'}</div>
      </section>
    );
  }

  const currentProduct1 = products[currentIndex];
  const currentProduct2 = products[(currentIndex + 1) % products.length];

  return (
    <section className="carousel-section">
      <div className="carousel-container">
        <button 
          className="carousel-btn carousel-prev"
          onClick={prevSlide}
          title="Previous products"
        >
          ❮
        </button>

        <div className="carousel-slide">
          <div className="carousel-product">
            <div className="carousel-image">📦</div>
            <h2 className="carousel-title">{currentProduct1.name}</h2>
            <p className="carousel-category">{currentProduct1.category}</p>
            <p className="carousel-description">{currentProduct1.description}</p>
            <div className="carousel-footer">
              <span className="carousel-price">${currentProduct1.price.toFixed(2)}</span>
              <button
                className="btn btn-primary"
                onClick={() => onAddToCart(currentProduct1)}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="carousel-product">
            <div className="carousel-image">📦</div>
            <h2 className="carousel-title">{currentProduct2.name}</h2>
            <p className="carousel-category">{currentProduct2.category}</p>
            <p className="carousel-description">{currentProduct2.description}</p>
            <div className="carousel-footer">
              <span className="carousel-price">${currentProduct2.price.toFixed(2)}</span>
              <button
                className="btn btn-primary"
                onClick={() => onAddToCart(currentProduct2)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <button 
          className="carousel-btn carousel-next"
          onClick={nextSlide}
          title="Next products"
        >
          ❯
        </button>
      </div>

      <div className="carousel-indicators">
        {products.map((_, index) => {
          if (index % 2 === 0) {
            return (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                title={`Go to products ${index + 1}-${index + 2}`}
              />
            );
          }
          return null;
        })}
      </div>
    </section>
  );
}

export default ProductCarousel;

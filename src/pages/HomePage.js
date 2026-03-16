import React from 'react';
import ProductCarousel from '../components/ProductCarousel';

export function HomePage({ onAddToCart }) {
  return (
    <section>
      <ProductCarousel onAddToCart={onAddToCart} />
    </section>
  );
}

export default HomePage;

import React from 'react';

export function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <div className="product-image">📦</div>
      <h3>{product.name}</h3>
      <p className="category">{product.category}</p>
      <p className="description">{product.description}</p>
      <div className="product-footer">
        <span className="price">${product.price.toFixed(2)}</span>
        <button 
          className="btn btn-primary"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

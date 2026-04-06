import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { useCartStore } from '../store/useCartStore';
import { ShoppingCart } from 'lucide-react';
import React from 'react';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
      <Link to={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
            <span className="px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-full uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </Link>
      
      <div className="flex flex-col flex-1 p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs font-medium text-blue-600 mb-1 uppercase tracking-wider">{product.category}</p>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              <Link to={`/product/${product.id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </Link>
            </h3>
          </div>
          <p className="text-lg font-bold text-gray-900">${product.price}</p>
        </div>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>
        
        <button
          onClick={(e) => {
            e.preventDefault();
            addItem(product);
          }}
          disabled={!product.inStock}
          className="relative z-10 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

import React from 'react';

export function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 group flex flex-col h-full">
      
      {/* Product Image Area */}
      <div className="aspect-square bg-slate-50 rounded-2xl flex items-center justify-center text-5xl mb-6 group-hover:scale-105 transition-transform duration-500 overflow-hidden">
        <span className="opacity-80">📦</span>
      </div>

      {/* Product Info */}
      <div className="flex-grow">
        <p className="text-[#7e57c2] text-[10px] font-bold uppercase tracking-widest mb-1">
          {product.category}
        </p>
        <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-6">
          {product.description}
        </p>
      </div>

      {/* Product Footer */}
      <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
        <span className="text-2xl font-bold text-slate-900">
          ${product.price.toFixed(2)}
        </span>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-100 active:scale-95 transition-all"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
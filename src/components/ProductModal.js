import React from 'react';

const ProductModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={onClose}></div>

      <div className="relative bg-white w-full max-w-3xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in duration-300">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>

        {/* Left: Image Area */}
        <div className="md:w-5/12 bg-slate-50 flex items-center justify-center p-12 border-r border-slate-100">
          <div className="text-[7rem] grayscale opacity-80">📦</div>
        </div>

        {/* Right: Info Area */}
        <div className="md:w-7/12 p-10 flex flex-col">
          <div className="flex-grow">
            <p className="text-[#7e57c2] text-[10px] font-black uppercase tracking-widest mb-2">{product.category}</p>
            
            {/* Reduced Title Size */}
            <h2 className="text-3xl font-bold text-slate-800 mb-4">{product.name}</h2>
            
            <p className="text-slate-500 text-sm leading-relaxed mb-6">{product.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-bold border border-slate-200/50">Stock: {product.stock} units</span>
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-bold border border-slate-200/50">Free Shipping</span>
            </div>
          </div>

          {/* Footer: Price & Button */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mb-1">Total Price</p>
              {/* Reduced Price Size */}
              <p className="text-3xl font-black text-slate-900">${product.price}</p>
            </div>
            
            <button 
              onClick={() => { onAddToCart(product); onClose(); }}
              className="bg-[#2563eb] hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl font-bold text-sm transition-all active:scale-95"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
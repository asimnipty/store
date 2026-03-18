import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export function ProductCarousel({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await apiService.getAllProducts();
        setProducts(allProducts.slice(0, 6));
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    fetchProducts();
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1 >= products.length - 2 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 < 0 ? products.length - 3 : prev - 1));

  if (loading || products.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 relative">
        
        {/* ARROW LAYER: Positioned absolutely over the cards */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between z-30 pointer-events-none px-2 md:px-0">
          <button 
            onClick={prevSlide}
            className="pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-600 hover:shadow-xl transition-all active:scale-90 ml-[-10px] md:ml-[-20px]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-600 hover:shadow-xl transition-all active:scale-90 mr-[-10px] md:mr-[-20px]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

        {/* CONTENT LAYER */}
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-700 ease-in-out" 
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {products.map((product) => (
              <div key={product._id} className="min-w-[100%] md:min-w-[33.333%] px-3">
                {/* Fixed height card ensures center is always the same */}
                <div className="bg-slate-50/50 rounded-2xl p-10 flex flex-col items-center text-center h-[400px] border border-transparent hover:border-slate-200 transition-all group">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm group-hover:scale-105 transition-transform duration-500">
                    📦
                  </div>
                  <div className="flex-grow flex flex-col justify-center">
                    <h3 className="text-xl font-semibold text-slate-800 mb-2 leading-tight">{product.name}</h3>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{product.category}</p>
                  </div>
                  <div className="mt-8">
                    <button 
                      onClick={() => onAddToCart(product)}
                      className="text-blue-600 font-bold text-sm hover:underline"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DOTS LAYER: Outside the absolute centering logic */}
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: products.length - 2 }).map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === i ? 'w-10 bg-blue-600' : 'w-2 bg-slate-200'}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
import React, { useState, useEffect } from 'react';

const HomePage = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const productsPerView = windowWidth < 768 ? 1 : 3;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => setCurrentIndex(prev => (prev < products.length - productsPerView ? prev + 1 : 0));
  const prevSlide = () => setCurrentIndex(prev => (prev > 0 ? prev - 1 : products.length - productsPerView));

  return (
    <div className="min-h-screen bg-slate-50 pt-24 animate-in fade-in duration-700">
      {/* Hero */}
      <section className="py-16 md:py-24 px-6 text-center max-w-4xl mx-auto">
        <p className="text-blue-600 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Welcare Power Ltd</p>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">Innovation in every <span className="text-blue-600">connection.</span></h1>
      </section>

      {/* Carousel Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-32">
        <div className="flex items-center gap-2 md:gap-6">
          {/* Arrow Left */}
          <button onClick={prevSlide} className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-blue-600 shadow-sm active:scale-95 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>

          {/* Cards Viewport */}
          <div className="flex-grow overflow-hidden">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * (100 / productsPerView)}%)` }}>
              {products.map((product) => (
                <div key={product._id} className="min-w-full md:min-w-[33.333%] px-2 md:px-3">
                  <div className="bg-white rounded-lg p-8 md:p-10 flex flex-col items-center text-center group border border-slate-100 hover:border-blue-300 transition-all h-[420px] md:h-[450px]">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-md flex items-center justify-center text-4xl mb-8 group-hover:scale-105 transition-transform">📦</div>
                    <div className="flex-grow flex flex-col justify-center">
                      <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-1">{product.name}</h3>
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{product.category}</p>
                    </div>
                    {/* <button onClick={() => onAddToCart(product)} className="mt-8 w-full bg-blue-600 text-white font-bold text-[11px] uppercase tracking-wider py-3.5 rounded-md hover:bg-blue-700 transition-all shadow-md active:scale-95">
                      Add to Cart
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow Right */}
          <button onClick={nextSlide} className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-blue-600 shadow-sm active:scale-95 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
import React, { useState } from 'react';
import logo from '../images/logo.png'; 

const Header = ({ cartCount, onHomeClick, onProductsClick, onAboutClick, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNav = (action) => {
    action();
    setIsMenuOpen(false); // Close mobile menu after clicking
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-black text-white z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-10 h-20 flex items-center justify-between">
        
        {/* LEFT: Original Logo - Consistent Size */}
        <div 
          className="flex items-center cursor-pointer shrink-0" 
          onClick={() => handleNav(onHomeClick)}
        >
          <img 
            src={logo} 
            alt="Welcare Power Ltd" 
            className="h-12 md:h-12 w-auto object-contain" 
          />
        </div>

        {/* RIGHT: Combined Nav and Cart */}
        <div className="flex items-center gap-4 md:gap-8">
          
          {/* Desktop Navigation - Hidden on Mobile */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={onHomeClick} className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Home</button>
            <button onClick={onProductsClick} className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Products</button>
            <button onClick={onAboutClick} className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">About</button>
          </nav>

          {/* Cart Button - Consistent Size & Style */}
          <button 
            onClick={() => handleNav(onCartClick)}
            className="bg-[#2563eb] hover:bg-blue-600 h-10 px-4 md:px-5 rounded-md flex items-center gap-3 transition-all active:scale-95 shadow-lg shadow-blue-600/20"
          >
            <span className="text-lg">🛒</span>
            <span className="font-bold text-sm hidden sm:inline">Cart</span>
            <span className="bg-white text-[#2563eb] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle (Hamburger) */}
          <button 
            className="md:hidden p-2 text-white flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-white/10 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-6 gap-6">
            <button onClick={() => handleNav(onHomeClick)} className="text-left text-lg font-bold border-b border-white/5 pb-2">Home</button>
            <button onClick={() => handleNav(onProductsClick)} className="text-left text-lg font-bold border-b border-white/5 pb-2">Products</button>
            <button onClick={() => handleNav(onAboutClick)} className="text-left text-lg font-bold">About</button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
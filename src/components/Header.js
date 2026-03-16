import React, { useState } from 'react';

export function Header({ cartCount, onCartClick, onHomeClick, onCategoryClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const categories = ['Electronics', 'Accessories'];

  const handleCategoryClick = (category) => {
    onCategoryClick(category);
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (callback) => {
    callback();
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container header-wrapper">
        <button 
          className="header-logo"
          onClick={onHomeClick}
          title="Go to home"
        >
          🛒 Store App
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          title="Toggle menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Navigation Menu */}
        <nav className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <button 
            className="nav-link"
            onClick={() => handleNavClick(onHomeClick)}
          >
            Products
          </button>
          
          <div className="nav-dropdown">
            <button 
              className={`nav-link dropdown-toggle ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              Categories ▼
            </button>
            
            {isMenuOpen && (
              <div className="dropdown-menu">
                {categories.map(category => (
                  <button
                    key={category}
                    className="dropdown-item"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            className="nav-link nav-about"
            onClick={() => {}}
            title="About page (coming soon)"
          >
            About
          </button>
        </nav>

        <button 
          className="btn btn-cart"
          onClick={onCartClick}
        >
          Cart 
          <span className="badge">{cartCount}</span>
        </button>
      </div>
    </header>
  );
}

export default Header;

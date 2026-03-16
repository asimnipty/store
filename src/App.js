import React, { useState } from 'react';
import Header from './components/Header';
import ProductCarousel from './components/ProductCarousel';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import Footer from './components/Footer';
import { useCart } from './hooks/useCart';
import './styles.css';

function App() {
  const [currentPage, setCurrentPage] = useState('products');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { cart, handleAddToCart, handleRemoveItem, handleClearCart } = useCart();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage('products');
  };

  return (
    <div className="App">
      <Header 
        cartCount={cart.length}
        onHomeClick={() => {
          setCurrentPage('products');
          setSelectedCategory(null);
        }}
        onCategoryClick={handleCategoryClick}
        onCartClick={() => setCurrentPage(currentPage === 'products' ? 'cart' : 'products')}
      />

      <main style={{ padding: '2rem 0' }}>
        {currentPage === 'products' ? (
          <>
            {!selectedCategory && (
              <ProductCarousel onAddToCart={handleAddToCart} />
            )}
            <ProductsPage 
              onAddToCart={handleAddToCart}
              preSelectedCategory={selectedCategory}
            />
          </>
        ) : (
          <CartPage 
            items={cart}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;

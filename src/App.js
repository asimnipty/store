import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import Footer from './components/Footer';
import { useCart } from './hooks/useCart';
import './styles.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { cart, handleAddToCart, handleRemoveItem, handleClearCart } = useCart();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage('products');
  };

  const handleProductsPageClick = () => {
    setCurrentPage('products');
    setSelectedCategory(null);
  };

  const handleHomeClick = () => {
    setCurrentPage('home');
    setSelectedCategory(null);
  };

  const handleCartClick = () => {
    setCurrentPage(currentPage === 'cart' ? 'home' : 'cart');
  };

  return (
    <div className="App">
      <Header 
        cartCount={cart.length}
        onHomeClick={handleHomeClick}
        onProductsClick={handleProductsPageClick}
        onCategoryClick={handleCategoryClick}
        onCartClick={handleCartClick}
      />

      <main>
        {currentPage === 'home' ? (
          <HomePage onAddToCart={handleAddToCart} />
        ) : currentPage === 'products' ? (
          <ProductsPage 
            onAddToCart={handleAddToCart}
            preSelectedCategory={selectedCategory}
          />
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

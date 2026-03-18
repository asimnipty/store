import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
// import CheckoutPage from './pages/CheckoutPage';
// import SuccessPage from './pages/SuccessPage';
import { useCart } from './hooks/useCart';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { cart, handleAddToCart, handleRemoveItem, handleClearCart } = useCart();

  // Scroll to top on every page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Total Calculation for Checkout
  const cartTotal = (cart.reduce((acc, item) => acc + item.price, 0) + (cart.length > 0 ? 15 : 0)).toFixed(2);

  // Navigation Logic
  const navigate = {
    home: () => { setCurrentPage('home'); setSelectedCategory(null); },
    products: (cat = null) => { setCurrentPage('products'); setSelectedCategory(cat); },
    about: () => { setCurrentPage('about'); setSelectedCategory(null); },
    cart: () => { setCurrentPage('cart'); },
  //   checkout: () => { setCurrentPage('checkout'); },
  //   success: () => { handleClearCart(); setCurrentPage('success'); }
   };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-700">
      <Header 
        cartCount={cart.length}
        onHomeClick={navigate.home}
        onProductsClick={() => navigate.products()}
        onAboutClick={navigate.about}
        onCartClick={navigate.cart}
        onCategoryClick={navigate.products}
      />

      <main className="flex-grow">
        {currentPage === 'home' && <HomePage onAddToCart={handleAddToCart} />}
        
        {currentPage === 'products' && (
          <ProductsPage 
            onAddToCart={handleAddToCart} 
            preSelectedCategory={selectedCategory} 
          />
        )}

        {currentPage === 'about' && <AboutPage />}

        {currentPage === 'cart' && (
          <CartPage 
            items={cart} 
            onRemoveItem={handleRemoveItem} 
            onClearCart={handleClearCart}
            onNavigateToProducts={() => navigate.products()}
            onNavigateToCheckout={navigate.checkout}
          />
        )}

        {/* {currentPage === 'checkout' && (
          <CheckoutPage 
            cart={cart} 
            total={cartTotal} 
            onOrderComplete={navigate.success} 
          />
        )}

        {currentPage === 'success' && <SuccessPage onReturnHome={navigate.home} />} */}
      </main>

      <Footer />
    </div>
  );
}

export default App;
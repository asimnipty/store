import { useState, useEffect } from 'react';
import { getCartFromStorage, saveCartToStorage } from '../utils/helpers';

export function useCart() {
  const [cart, setCart] = useState(() => getCartFromStorage());

  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    alert(`${product.name} added to cart!`);
  };

  const handleRemoveItem = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCart([]);
    }
  };

  return {
    cart,
    handleAddToCart,
    handleRemoveItem,
    handleClearCart
  };
}

export default useCart;

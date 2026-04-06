import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { Link } from 'react-router-dom';

export function CartDrawer() {
  const { items, isCartOpen, toggleCart, updateQuantity, removeItem, getCartTotal } = useCartStore();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={toggleCart}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart
          </h2>
          <button 
            onClick={toggleCart}
            className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-10 w-10 text-gray-300" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">Your cart is empty</p>
                <p className="text-gray-500 mt-1">Looks like you haven't added anything yet.</p>
              </div>
              <button 
                onClick={toggleCart}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3 className="line-clamp-1"><Link to={`/product/${item.id}`} onClick={toggleCart}>{item.name}</Link></h3>
                        <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-l-lg"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3 font-medium text-gray-900">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-r-lg"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="font-medium text-red-600 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-gray-50">
            <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
              <p>Subtotal</p>
              <p>${getCartTotal().toFixed(2)}</p>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Shipping and taxes calculated at checkout.
            </p>
            <button
              className="w-full flex items-center justify-center rounded-xl border border-transparent bg-blue-600 px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
              onClick={() => {
                alert('Checkout functionality would go here!');
                toggleCart();
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

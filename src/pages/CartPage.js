import React from 'react';

export function CartPage({ items, onRemoveItem, onClearCart }) {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="container">
      <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#333', marginBottom: '1.5rem' }}>
        Shopping Cart
      </h2>
      
      {items.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item, index) => (
              // Display only every other item (index 0, 2, 4, etc.)
              index % 2 === 0 && (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>{item.category}</p>
                  </div>
                  <div className="item-details">
                    <span>${item.price.toFixed(2)}</span>
                    <input 
                      type="number" 
                      min="1" 
                      value={item.quantity}
                      readOnly
                    />
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <button 
                    className="btn btn-danger"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              )
            ))}
          </div>

          <div className="cart-summary">
            <div className="total">
              <strong>Total: <span className="price">${total.toFixed(2)}</span></strong>
            </div>
            <div className="actions">
              <button 
                className="btn btn-danger"
                onClick={onClearCart}
              >
                Clear Cart
              </button>
              <button className="btn btn-success">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;

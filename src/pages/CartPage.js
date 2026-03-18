import React from 'react';

const CartPage = ({ items, onRemoveItem, onClearCart, onNavigateToProducts }) => {
  // Calculate totals
  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const shipping = items.length > 0 ? 15.00 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4 md:px-8 animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto">
        
        {/* Header with Breadcrumb-style back button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <button 
              onClick={onNavigateToProducts}
              className="text-[#7e57c2] text-xs font-bold uppercase tracking-widest hover:text-[#5c6bc0] transition-colors mb-2 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              Back to Shopping
            </button>
            <h1 className="text-4xl font-black text-slate-900">Your Cart</h1>
          </div>
          
          {items.length > 0 && (
            <button 
              onClick={onClearCart}
              className="bg-red-50 text-red-500 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition-all flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              Clear Cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          /* --- EMPTY STATE --- */
          <div className="bg-white rounded-3xl p-16 text-center shadow-xl border border-slate-100 flex flex-col items-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-5xl mb-6 shadow-inner animate-bounce">
              🛒
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
            <p className="text-slate-500 mb-8 max-w-xs mx-auto">
              Looks like you haven't added any premium electronics to your collection yet.
            </p>
            <button 
              onClick={onNavigateToProducts}
              className="bg-[#2563eb] text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          /* --- CART CONTENT --- */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <div 
                  key={`${item._id}-${index}`} 
                  className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-md transition-all group"
                >
                  <div className="w-24 h-24 bg-slate-50 rounded-2xl flex items-center justify-center text-4xl shadow-inner group-hover:scale-105 transition-transform">
                    📦
                  </div>

                  <div className="flex-grow">
                    <p className="text-[#7e57c2] text-[10px] font-black uppercase tracking-widest mb-1">{item.category}</p>
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#2563eb] transition-colors">{item.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                       <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">In Stock</span>
                       <span className="text-slate-300">|</span>
                       <span className="text-slate-400 text-xs">SKU: {item._id.slice(-6).toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-black text-slate-900 mb-2">${item.price}</p>
                    <button 
                      onClick={() => onRemoveItem(index)}
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      title="Remove Item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 sticky top-32">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-slate-500 font-medium">
                    <span>Subtotal ({items.length} items)</span>
                    <span className="text-slate-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 font-medium">
                    <span>Express Shipping</span>
                    <span className="text-slate-900">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-slate-100 pt-5 flex justify-between items-end">
                    <div>
                      <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-widest">Total Amount</span>
                      <span className="text-3xl font-black text-[#2563eb]">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button 
                  className="w-full bg-[#2563eb] hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 transition-all active:scale-95 mb-4 flex items-center justify-center gap-3"
                  onClick={() => alert('Redirecting to Payment Gateway...')}
                >
                  Checkout
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                </button>
                
                <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3">
                  <div className="text-blue-600 bg-white p-2 rounded-lg shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    SSL Encrypted & 100% Secure Checkout
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
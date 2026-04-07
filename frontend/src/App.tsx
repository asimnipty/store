/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Admin } from './pages/Admin';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
        <Navbar />
        <CartDrawer />
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-blue-500">⚡</span> VoltStore
                </h3>
                <p className="text-sm text-gray-400">
                  Your premium destination for the latest electronics and gadgets.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Newsletter</h4>
                <p className="text-sm text-gray-400 mb-4">Subscribe to get special offers and updates.</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 w-full text-sm focus:outline-none focus:border-blue-500"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center text-gray-500">
              &copy; {new Date().getFullYear()} VoltStore. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

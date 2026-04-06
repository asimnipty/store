import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../data/products';
import { useCartStore } from '../store/useCartStore';
import { ShoppingCart, ArrowLeft, Check, Shield, Truck } from 'lucide-react';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch product", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
        <Link to="/shop" className="text-blue-600 hover:underline flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/shop" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
        </Link>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          {/* Product Image */}
          <div className="lg:max-w-lg lg:self-end">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 border border-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:px-0 lg:mt-0">
            <div className="mb-6">
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">{product.category}</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>
            </div>

            <div className="mb-8">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl font-bold text-gray-900">${product.price}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Description</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mb-10">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Key Features</h3>
              <ul className="space-y-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => addItem(product)}
                disabled={!product.inStock}
                className="flex w-full items-center justify-center rounded-full border border-transparent bg-blue-600 px-8 py-4 text-lg font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-gray-50 text-sm font-medium text-gray-700">
                  <Truck className="h-5 w-5 text-blue-600" />
                  Free Delivery
                </div>
                <div className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-gray-50 text-sm font-medium text-gray-700">
                  <Shield className="h-5 w-5 text-blue-600" />
                  2 Year Warranty
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


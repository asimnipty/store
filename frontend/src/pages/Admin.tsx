import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Product } from '../data/products';

export function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: 'Accessories',
    image: '',
    features: [],
    inStock: true
  });
  const [newFeature, setNewFeature] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch products', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const url = isEditing ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct)
      });

      if (res.ok) {
        const updatedProduct = await res.json();
        if (isEditing) {
          setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
        } else {
          setProducts([...products, updatedProduct]);
        }
        resetForm();
        setMessage(isEditing ? 'Product updated successfully!' : 'Product created successfully!');
      } else {
        const error = await res.json();
        setMessage(error.message || 'Failed to save product');
      }
    } catch (error) {
      setMessage('An error occurred while saving');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
        setMessage('Product deleted successfully!');
      } else {
        setMessage('Failed to delete product');
      }
    } catch (error) {
      setMessage('An error occurred while deleting');
    }
  };

  const resetForm = () => {
    setEditingProduct({
      name: '',
      description: '',
      price: 0,
      category: 'Accessories',
      image: '',
      features: [],
      inStock: true
    });
    setIsEditing(false);
    setNewFeature('');
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setEditingProduct({
        ...editingProduct,
        features: [...(editingProduct.features || []), newFeature.trim()]
      });
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    const features = editingProduct.features?.filter((_, i) => i !== index) || [];
    setEditingProduct({ ...editingProduct, features });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your product catalog</p>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
          {message}
        </div>
      )}

      {/* Add/Edit Product Form */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              value={editingProduct.name || ''}
              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={editingProduct.description || ''}
              onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
            <input
              type="number"
              step="0.01"
              value={editingProduct.price || ''}
              onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={editingProduct.category || 'Accessories'}
              onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Laptops">Laptops</option>
              <option value="Audio">Audio</option>
              <option value="Phones">Phones</option>
              <option value="Wearables">Wearables</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              type="url"
              value={editingProduct.image || ''}
              onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add a feature"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(editingProduct.features || []).map((feature, index) => (
                <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                  {feature}
                  <button type="button" onClick={() => removeFeature(index)} className="text-red-500 hover:text-red-700">
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={editingProduct.inStock || false}
                onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                className="mr-2"
              />
              In Stock
            </label>
          </div>

          <div className="md:col-span-2 flex gap-4">
            <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <Save className="h-4 w-4" />
              {isEditing ? 'Update Product' : 'Create Product'}
            </button>
            {isEditing && (
              <button type="button" onClick={resetForm} className="flex items-center gap-2 px-6 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
                <X className="h-4 w-4" />
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Products List */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Product Catalog</h2>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Product</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Price</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Stock</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.description.substring(0, 50)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium">${product.price}</td>
                    <td className="py-4 px-4">{product.category}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
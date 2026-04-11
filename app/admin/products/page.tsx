'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin-sidebar';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import { getAllProducts, CakeProductItem } from '@/lib/products';
import { createClient } from '@/utils/supabase/client';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<CakeProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const supabase = createClient();

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category_slug: '',
    description: '',
    base_price: 0,
    image_url: '',
    has_flavours: false,
    has_add_ons: false,
  });

  const loadProducts = async () => {
    setLoading(true);
    const data = await getAllProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const { error } = await supabase.from('products').delete().eq('slug', slug);
      if (error) throw error;
      await loadProducts();
    } catch (e) {
      console.error(e);
      alert('Failed to delete product');
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('products').insert([
        formData
      ]);
      if (error) throw error;
      
      setIsAdding(false);
      setFormData({
        name: '',
        slug: '',
        category_slug: '',
        description: '',
        base_price: 0,
        image_url: '',
        has_flavours: false,
        has_add_ons: false,
      });
      await loadProducts();
    } catch(e) {
      console.error(e);
      alert('Failed to add product');
    }
  }

  return (
    <div className="min-h-screen bg-[#F0E8DF]/20">
      <AdminSidebar activeTab="products" />
      
      <div className="ml-64 pt-20 px-8 py-8">
        <div className="max-w-6xl">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-serif text-[#2C2C2C]">Products</h1>
              <p className="text-[#98898D] mt-2">Manage your catalog directly from the database.</p>
            </div>
            {!isAdding && (
              <button 
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-2 px-6 py-3 bg-[#F283AE] text-white rounded-full font-semibold hover:bg-[#E86FA3] transition-colors"
              >
                <Plus size={20} />
                Add Product
              </button>
            )}
          </div>

          {isAdding ? (
             <div className="bg-white rounded-2xl shadow-sm border border-[#FAC1B5]/30 p-8 relative">
               <button onClick={() => setIsAdding(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-700">
                  <X size={24} />
               </button>
               <h2 className="text-2xl font-serif text-[#2C2C2C] mb-6">Add New Product</h2>
               <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-semibold mb-2">Product Name</label>
                     <input required type="text" className="w-full border p-2 rounded" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                   </div>
                   <div>
                     <label className="block text-sm font-semibold mb-2">Slug (URL)</label>
                     <input required type="text" className="w-full border p-2 rounded" placeholder="e.g. elegant-pearl" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} />
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-semibold mb-2">Category Slug</label>
                     <input required type="text" className="w-full border p-2 rounded" placeholder="e.g. wedding-cakes" value={formData.category_slug} onChange={(e) => setFormData({...formData, category_slug: e.target.value})} />
                   </div>
                   <div>
                     <label className="block text-sm font-semibold mb-2">Base Price</label>
                     <input type="number" className="w-full border p-2 rounded" value={formData.base_price} onChange={(e) => setFormData({...formData, base_price: Number(e.target.value)})} />
                   </div>
                 </div>

                 <div>
                   <label className="block text-sm font-semibold mb-2">Description</label>
                   <textarea className="w-full border p-2 rounded h-24" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                 </div>

                 <div>
                   <label className="block text-sm font-semibold mb-2">Image URL</label>
                   <input type="text" className="w-full border p-2 rounded" placeholder="https://..." value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} />
                 </div>

                 <div className="flex gap-6 py-2">
                   <label className="flex items-center gap-2">
                      <input type="checkbox" checked={formData.has_flavours} onChange={(e) => setFormData({...formData, has_flavours: e.target.checked})} />
                      <span className="text-sm font-semibold">Has Flavours?</span>
                   </label>
                   <label className="flex items-center gap-2">
                      <input type="checkbox" checked={formData.has_add_ons} onChange={(e) => setFormData({...formData, has_add_ons: e.target.checked})} />
                      <span className="text-sm font-semibold">Has Add Ons?</span>
                   </label>
                 </div>

                 <button type="submit" className="px-6 py-3 bg-[#F283AE] text-white rounded-lg font-semibold w-full mt-4">
                   Save Product
                 </button>
               </form>
             </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-[#FAC1B5]/20 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#FAC1B5]/20 bg-[#F0E8DF]/30">
                    <th className="px-6 py-4 text-sm font-semibold text-[#98898D]">Product</th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#98898D]">Category</th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#98898D]">Price</th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#98898D] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-[#98898D]">Loading Database...</td>
                    </tr>
                  ) : products.map((product) => (
                    <tr key={product.id} className="border-b border-[#FAC1B5]/20 hover:bg-[#F0E8DF]/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {product.image ? (
                             <img src={product.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                          ) : (
                             <div className="w-10 h-10 rounded-lg bg-[#F0E8DF] flex items-center justify-center">🎂</div>
                          )}
                          <span className="font-semibold text-[#2C2C2C]">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#98898D] tracking-wider uppercase text-xs font-semibold">{product.category_slug}</td>
                      <td className="px-6 py-4 font-semibold text-[#2C2C2C]">
                         {product.price ? `Rs. ${product.price}` : 'Dynamic'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleDelete(product.id)} className="text-red-400 hover:text-red-600 transition-colors inline-block p-2">
                           <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {!loading && products.length === 0 && (
                     <tr>
                        <td colSpan={4} className="p-8 text-center text-[#98898D]">No products found in DB. Did you run the SQL script?</td>
                     </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

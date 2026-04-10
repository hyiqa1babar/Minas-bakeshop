import AdminSidebar from '@/components/admin-sidebar';
import { Plus } from 'lucide-react';

export default function AdminProductsPage() {
  const products = [
    { id: 1, name: 'Elegant White Pearl', category: 'Wedding', price: 'Rs. 8,500', emoji: '💍' },
    { id: 2, name: 'Rose Garden Romance', category: 'Wedding', price: 'Rs. 9,200', emoji: '🌹' },
    { id: 3, name: 'Teddy Bear', category: 'Baby', price: 'Rs. 5,500', emoji: '🧸' },
    { id: 4, name: 'Rose Bloom', category: 'Floral', price: 'Rs. 7,800', emoji: '🌹' },
    { id: 5, name: '2 Cupcake Bento', category: 'Luxury', price: 'Rs. 3,500', emoji: '🎁' },
  ];

  return (
    <div className="min-h-screen bg-[#F0E8DF]/20">
      <AdminSidebar activeTab="products" />
      
      <div className="ml-64 pt-20 px-8 py-8">
        <div className="max-w-6xl">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-serif text-[#2C2C2C]">Products</h1>
              <p className="text-[#98898D] mt-2">Manage your cake collection</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-[#F283AE] text-white rounded-full font-semibold hover:bg-[#E86FA3] transition-colors">
              <Plus size={20} />
              Add Product
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-[#FAC1B5]/20 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#FAC1B5]/20 bg-[#F0E8DF]/30">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-[#FAC1B5]/20 hover:bg-[#F0E8DF]/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{product.emoji}</span>
                        <span className="font-semibold text-[#2C2C2C]">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#98898D]">{product.category}</td>
                    <td className="px-6 py-4 font-semibold text-[#2C2C2C]">{product.price}</td>
                    <td className="px-6 py-4 space-x-3">
                      <button className="text-[#F283AE] hover:underline text-sm font-semibold">Edit</button>
                      <button className="text-red-500 hover:underline text-sm font-semibold">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

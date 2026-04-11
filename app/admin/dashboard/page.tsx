'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin-sidebar';
import Link from 'next/link';
import { TrendingUp, Users, ShoppingBag, Calendar, Star } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
     totalOrders: 0,
     totalRevenue: 0,
     totalProducts: 0,
     pendingReviews: 0
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      
      const { count: ordersCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });
      const { data: revData } = await supabase.from('orders').select('total_amount').eq('status', 'Delivered');
      const { count: productsCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
      const { count: reviewsCount } = await supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('status', 'pending');
      
      const { data: recent } = await supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5);

      setStats({
         totalOrders: ordersCount || 0,
         totalRevenue: revData ? revData.reduce((acc, curr) => acc + (Number(curr.total_amount) || 0), 0) : 0,
         totalProducts: productsCount || 0,
         pendingReviews: reviewsCount || 0
      });
      
      if (recent) setRecentOrders(recent);
      
      setLoading(false);
    }
    
    loadDashboard();
  }, []);

  const statCards = [
    {
      title: 'Total Orders',
      value: loading ? '...' : stats.totalOrders.toLocaleString(),
      change: 'Live',
      icon: ShoppingBag,
      color: '#F283AE'
    },
    {
      title: 'Net Revenue',
      value: loading ? '...' : `Rs. ${stats.totalRevenue.toLocaleString()}`,
      change: 'Delivered',
      icon: TrendingUp,
      color: '#C6C870'
    },
    {
      title: 'Active Products',
      value: loading ? '...' : stats.totalProducts.toLocaleString(),
      change: 'Catalog',
      icon: Package,
      color: '#98B8B9'
    },
    {
      title: 'Pending Reviews',
      value: loading ? '...' : stats.pendingReviews.toLocaleString(),
      change: 'Needs Approval',
      icon: Star,
      color: '#C59FBE'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F0E8DF]/20">
      <AdminSidebar activeTab="dashboard" />
      
      <div className="ml-64 pt-20 px-8 py-8">
        <div className="max-w-6xl">
          <div className="mb-12">
            <h1 className="text-4xl font-serif text-[#2C2C2C] mb-2">Dashboard</h1>
            <p className="text-[#98898D]">Welcome back! Here&apos;s what&apos;s happening with your bakery.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-[#FAC1B5]/20">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: `${stat.color}20` }}>
                      <Icon size={24} style={{ color: stat.color }} />
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-gray-100 rounded-full text-gray-500">{stat.change}</span>
                  </div>
                  <h3 className="text-[#98898D] text-sm font-semibold mb-1">{stat.title}</h3>
                  <p className="text-3xl font-bold text-[#2C2C2C]">{stat.value}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#FAC1B5]/20">
            <div className="px-6 py-5 border-b border-[#FAC1B5]/20 flex justify-between items-center bg-[#FDF8F5]/30">
              <h2 className="text-xl font-serif text-[#2C2C2C]">Recent Orders</h2>
              <Link href="/admin/orders" className="text-sm text-[#F283AE] font-semibold hover:underline">
                View All
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#FAC1B5]/20">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Status</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-[#98898D]">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={5} className="p-8 text-center text-gray-400">Loading...</td></tr>
                  ) : recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-[#FAC1B5]/20 hover:bg-[#F0E8DF]/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-[#2C2C2C]">{order.order_number}</td>
                      <td className="px-6 py-4 text-sm text-[#98898D]">{new Date(order.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm text-[#2C2C2C]">{order.customer_name}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold text-white" 
                           style={{ backgroundColor: order.status === 'Delivered' ? '#98B8B9' : order.status === 'Confirmed' ? '#F283AE' : '#C6C870' }}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-[#2C2C2C] text-right">Rs. {order.total_amount?.toLocaleString() || 0}</td>
                    </tr>
                  ))}
                  {!loading && recentOrders.length === 0 && (
                    <tr><td colSpan={5} className="p-8 text-center text-gray-400">No orders yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// Required icon import bypass
import { Package } from 'lucide-react';

'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin-sidebar';
import { createClient } from '@/utils/supabase/client';

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  order_type: string;
  total_amount: number;
  status: string;
  created_at: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const loadOrders = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) {
       setOrders(data as Order[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
    
    // Subscribe to realtime orders since this is an Admin Dashboard!
    const channel = supabase.channel('realtime_orders')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
         setOrders((current) => [payload.new as Order, ...current]);
      })
      .subscribe();
      
    return () => {
       supabase.removeChannel(channel);
    };
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    // Optimistic UI update
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    
    await supabase.from('orders').update({ status: newStatus }).eq('id', id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return '#98B8B9';
      case 'Confirmed': return '#F283AE';
      case 'Pending': return '#C6C870';
      case 'Cancelled': return '#e53e3e';
      default: return '#98898D';
    }
  };

  return (
    <div className="min-h-screen bg-[#F0E8DF]/20">
      <AdminSidebar activeTab="orders" />
      
      <div className="ml-64 pt-20 px-8 py-8">
        <div className="max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-serif text-[#2C2C2C]">Live Orders</h1>
            <p className="text-[#98898D] mt-2">Track customer checkouts as they happen in Realtime.</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-[#FAC1B5]/20 overflow-hidden">
            <div className="overflow-x-auto min-h-[400px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#FAC1B5]/20 bg-[#F0E8DF]/30">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Status Update</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={5} className="p-8 text-center text-[#98898D]">Fetching orders...</td></tr>
                  ) : orders.map((order) => (
                    <tr key={order.id} className="border-b border-[#FAC1B5]/20 hover:bg-[#F0E8DF]/20 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-[#2C2C2C]">{order.order_number}</span>
                        <div className="text-xs text-[#98898D] uppercase mt-1">{order.order_type}</div>
                      </td>
                      <td className="px-6 py-4 text-[#98898D] text-sm">
                        {new Date(order.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short'})}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-[#2C2C2C] font-semibold">{order.customer_name}</div>
                        <div className="text-[#98898D] text-xs">{order.customer_phone}</div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-[#2C2C2C]">
                        Rs. {order.total_amount?.toLocaleString() || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                         <select
                           value={order.status}
                           onChange={(e) => handleStatusChange(order.id, e.target.value)}
                           className="text-white text-xs font-semibold px-3 py-1.5 rounded-full outline-none cursor-pointer appearance-none text-center min-w-[100px]"
                           style={{ backgroundColor: getStatusColor(order.status) }}
                         >
                           <option value="Pending">Pending</option>
                           <option value="Confirmed">Confirmed</option>
                           <option value="Delivered">Delivered</option>
                           <option value="Cancelled">Cancelled</option>
                         </select>
                      </td>
                    </tr>
                  ))}
                  {!loading && orders.length === 0 && (
                     <tr>
                       <td colSpan={5} className="p-12 text-center text-[#98898D]">
                         No orders found yet.
                       </td>
                     </tr>
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

import AdminSidebar from '@/components/admin-sidebar';
import Link from 'next/link';
import { TrendingUp, Users, ShoppingBag, Calendar } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Total Orders',
      value: '1,240',
      change: '+12%',
      icon: ShoppingBag,
      color: '#F283AE'
    },
    {
      title: 'Total Customers',
      value: '856',
      change: '+8%',
      icon: Users,
      color: '#C59FBE'
    },
    {
      title: 'Total Products',
      value: '48',
      change: '+2',
      icon: TrendingUp,
      color: '#98B8B9'
    },
    {
      title: 'This Month Revenue',
      value: 'Rs. 2,45,000',
      change: '+18%',
      icon: Calendar,
      color: '#C6C870'
    }
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'Zainab Ahmed', date: '2024-04-03', status: 'Processing', amount: 'Rs. 8,500' },
    { id: 'ORD-002', customer: 'Fatima Khan', date: '2024-04-02', status: 'Delivered', amount: 'Rs. 6,200' },
    { id: 'ORD-003', customer: 'Aisha Malik', date: '2024-04-02', status: 'Confirmed', amount: 'Rs. 5,800' },
    { id: 'ORD-004', customer: 'Sara Hassan', date: '2024-04-01', status: 'Delivered', amount: 'Rs. 4,500' },
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

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-[#FAC1B5]/20">
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: `${stat.color}20` }}
                    >
                      <Icon size={24} style={{ color: stat.color }} />
                    </div>
                    <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                  </div>
                  <h3 className="text-[#98898D] text-sm font-semibold mb-1">{stat.title}</h3>
                  <p className="text-2xl font-bold text-[#2C2C2C]">{stat.value}</p>
                </div>
              );
            })}
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-sm border border-[#FAC1B5]/20">
            <div className="px-6 py-4 border-b border-[#FAC1B5]/20 flex justify-between items-center">
              <h2 className="text-xl font-serif text-[#2C2C2C]">Recent Orders</h2>
              <Link
                href="/admin/orders"
                className="text-sm text-[#F283AE] font-semibold hover:underline"
              >
                View All
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#FAC1B5]/20">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Status</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-[#98898D]">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-[#FAC1B5]/20 hover:bg-[#F0E8DF]/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-[#2C2C2C]">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-[#2C2C2C]">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-[#98898D]">{order.date}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            backgroundColor:
                              order.status === 'Delivered'
                                ? '#98B8B9'
                                : order.status === 'Confirmed'
                                ? '#F283AE'
                                : '#C6C870',
                            color: 'white'
                          }}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-[#2C2C2C] text-right">{order.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-[#FAC1B5]/20">
              <h3 className="text-xl font-serif text-[#2C2C2C] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/admin/products"
                  className="block p-4 border border-[#FAC1B5]/30 rounded-lg hover:bg-[#F0E8DF]/30 transition-colors text-[#2C2C2C] font-semibold"
                >
                  Add New Product
                </Link>
                <Link
                  href="/admin/orders"
                  className="block p-4 border border-[#FAC1B5]/30 rounded-lg hover:bg-[#F0E8DF]/30 transition-colors text-[#2C2C2C] font-semibold"
                >
                  View All Orders
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#F283AE]/10 to-[#C59FBE]/10 rounded-lg p-8 border border-[#F283AE]/30">
              <h3 className="text-xl font-serif text-[#2C2C2C] mb-2">Need Help?</h3>
              <p className="text-[#98898D] mb-4">For technical support or questions about your dashboard, please contact our support team.</p>
              <a href="mailto:admin@minasbakeshop.com" className="text-[#F283AE] font-semibold hover:underline">
                admin@minasbakeshop.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

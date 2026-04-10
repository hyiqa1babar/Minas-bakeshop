import AdminSidebar from '@/components/admin-sidebar';

export default function AdminOrdersPage() {
  const orders = [
    { id: 'ORD-001', customer: 'Zainab Ahmed', date: '2024-04-03', status: 'Processing', amount: 'Rs. 8,500' },
    { id: 'ORD-002', customer: 'Fatima Khan', date: '2024-04-02', status: 'Delivered', amount: 'Rs. 6,200' },
    { id: 'ORD-003', customer: 'Aisha Malik', date: '2024-04-02', status: 'Confirmed', amount: 'Rs. 5,800' },
    { id: 'ORD-004', customer: 'Sara Hassan', date: '2024-04-01', status: 'Delivered', amount: 'Rs. 4,500' },
    { id: 'ORD-005', customer: 'Mira Hassan', date: '2024-03-31', status: 'Processing', amount: 'Rs. 7,200' },
    { id: 'ORD-006', customer: 'Noor Ali', date: '2024-03-30', status: 'Delivered', amount: 'Rs. 5,000' },
  ];

  return (
    <div className="min-h-screen bg-[#F0E8DF]/20">
      <AdminSidebar activeTab="orders" />
      
      <div className="ml-64 pt-20 px-8 py-8">
        <div className="max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-serif text-[#2C2C2C]">Orders</h1>
            <p className="text-[#98898D] mt-2">Track and manage all customer orders</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-[#FAC1B5]/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#FAC1B5]/20 bg-[#F0E8DF]/30">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-[#FAC1B5]/20 hover:bg-[#F0E8DF]/20 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-[#2C2C2C]">{order.id}</span>
                      </td>
                      <td className="px-6 py-4 text-[#2C2C2C]">{order.customer}</td>
                      <td className="px-6 py-4 text-[#98898D]">{order.date}</td>
                      <td className="px-6 py-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                          style={{
                            backgroundColor:
                              order.status === 'Delivered'
                                ? '#98B8B9'
                                : order.status === 'Confirmed'
                                ? '#F283AE'
                                : '#C6C870',
                          }}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-[#2C2C2C]">{order.amount}</td>
                      <td className="px-6 py-4">
                        <button className="text-[#F283AE] hover:underline text-sm font-semibold">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-[#98898D] text-sm mt-4">Total Orders: {orders.length}</p>
        </div>
      </div>
    </div>
  );
}

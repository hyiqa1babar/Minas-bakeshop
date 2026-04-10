import AdminSidebar from '@/components/admin-sidebar';

export default function AdminCustomersPage() {
  const customers = [
    { id: 'CUST001', name: 'Zainab Ahmed', email: 'zainab@email.com', phone: '+92 300 1234567', orders: 5, totalSpent: 'Rs. 45,000' },
    { id: 'CUST002', name: 'Fatima Khan', email: 'fatima@email.com', phone: '+92 300 2345678', orders: 3, totalSpent: 'Rs. 28,000' },
    { id: 'CUST003', name: 'Aisha Malik', email: 'aisha@email.com', phone: '+92 300 3456789', orders: 8, totalSpent: 'Rs. 62,000' },
    { id: 'CUST004', name: 'Sara Hassan', email: 'sara@email.com', phone: '+92 300 4567890', orders: 2, totalSpent: 'Rs. 15,000' },
    { id: 'CUST005', name: 'Mira Hassan', email: 'mira@email.com', phone: '+92 300 5678901', orders: 4, totalSpent: 'Rs. 35,500' },
    { id: 'CUST006', name: 'Noor Ali', email: 'noor@email.com', phone: '+92 300 6789012', orders: 6, totalSpent: 'Rs. 52,200' },
  ];

  return (
    <div className="min-h-screen bg-[#F0E8DF]/20">
      <AdminSidebar activeTab="customers" />
      
      <div className="ml-64 pt-20 px-8 py-8">
        <div className="max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-serif text-[#2C2C2C]">Customers</h1>
            <p className="text-[#98898D] mt-2">View and manage your customer base</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-[#FAC1B5]/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#FAC1B5]/20 bg-[#F0E8DF]/30">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Phone</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Orders</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#98898D]">Total Spent</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id} className="border-b border-[#FAC1B5]/20 hover:bg-[#F0E8DF]/20 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-[#2C2C2C]">{customer.name}</span>
                      </td>
                      <td className="px-6 py-4 text-[#98898D]">{customer.email}</td>
                      <td className="px-6 py-4 text-[#98898D]">{customer.phone}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-[#F283AE]/10 text-[#F283AE] text-sm font-semibold">
                          {customer.orders}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-[#2C2C2C]">{customer.totalSpent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-[#98898D] text-sm mt-4">Total Customers: {customers.length}</p>
        </div>
      </div>
    </div>
  );
}

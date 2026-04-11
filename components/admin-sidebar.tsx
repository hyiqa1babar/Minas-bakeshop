import Link from 'next/link';
import { LayoutDashboard, ShoppingCart, Users, Package, Star } from 'lucide-react';

import { logout } from '@/app/admin/login/logout-action';
import { LogOut } from 'lucide-react';

export default function AdminSidebar({ activeTab }: { activeTab: string }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    { id: 'products', label: 'Products', icon: Package, href: '/admin/products' },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, href: '/admin/orders' },
    { id: 'customers', label: 'Customers', icon: Users, href: '/admin/customers' },
    { id: 'reviews', label: 'Reviews', icon: Star, href: '/admin/reviews' },
  ];

  return (
    <aside className="w-64 bg-[#2C2C2C] text-white min-h-screen fixed left-0 top-0 pt-20">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-xl font-serif">Admin Panel</h2>
        <p className="text-xs text-white/60 mt-1">Minas Bakeshop</p>
      </div>

      <nav className="p-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-[#F283AE] text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon size={20} />
              <span className="font-semibold">{item.label}</span>
            </Link>
          );
        })}
        
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors mt-8 border-t border-white/5 pt-8"
          >
            <LogOut size={20} />
            <span className="font-semibold">Log Out</span>
          </button>
        </form>
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <Link
          href="/"
          className="block w-full px-4 py-3 text-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors text-sm font-semibold"
        >
          Back to Store
        </Link>
      </div>
    </aside>
  );
}


'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  ListOrdered,
  User,
  ClipboardList,
  Package,
  Users,
} from 'lucide-react';
import { authClient } from '@/app/lib/auth-client';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login');
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-[var(--color-neutral)] text-sm">Loading...</p>
      </div>
    );
  }

  if (!session) return null;

  const isAdmin = session.user.role === 'admin';

  const navItems = [
    {
      href: '/dashboard',
      label: 'Overview',
      icon: LayoutDashboard,
      adminOnly: false,
    },
    {
      href: '/dashboard/orders',
      label: 'My Orders',
      icon: Package,
      adminOnly: false,
    },
    {
      href: '/items/add',
      label: 'Add Item',
      icon: PlusCircle,
      adminOnly: true,
    },
    {
      href: '/items/manage',
      label: 'Manage Items',
      icon: ListOrdered,
      adminOnly: true,
    },
    {
      href: '/items/orders',
      label: 'Manage Orders',
      icon: ClipboardList,
      adminOnly: true,
    },
    {
      href: '/items/users',
      label: 'Manage Users',
      icon: Users,
      adminOnly: true,
    },
    {
      href: '/dashboard/profile',
      label: 'Profile',
      icon: User,
      adminOnly: false,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
        <aside>
          <div className="bg-white border border-black/5 rounded-2xl p-5 sticky top-24">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-black/10">
              <div className="w-11 h-11 rounded-full bg-[var(--color-text)] text-white flex items-center justify-center font-medium uppercase">
                {session.user.name?.charAt(0) || 'U'}
              </div>
              <div>
                <p className="text-sm font-semibold">{session.user.name}</p>
                <p className="text-xs text-[var(--color-neutral)] capitalize">
                  {isAdmin ? 'Admin' : 'User'}
                </p>
              </div>
            </div>

            <nav className="flex flex-col gap-1">
              {navItems.map(item => {
                if (item.adminOnly && !isAdmin) return null;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    data-cursor-hover
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'bg-[var(--color-accent)] text-black'
                        : 'text-[var(--color-neutral)] hover:bg-[var(--color-bg)]'
                    }`}
                  >
                    <item.icon size={16} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <div>{children}</div>
      </div>
    </div>
  );
}

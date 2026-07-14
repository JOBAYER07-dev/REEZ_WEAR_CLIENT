'use client';

import { authClient } from '@/app/lib/auth-client';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const storeAnalyticsMockData = [
  { month: 'Jan', revenue: 38000 },
  { month: 'Feb', revenue: 44000 },
  { month: 'Mar', revenue: 72000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 89000 },
  { month: 'Jun', revenue: 105000 },
];

export default function DashboardOverview() {
  const { data: session } = authClient.useSession();
  const isAdmin = session?.user?.role === 'admin';

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Message */}
      <div>
        <h1 className="text-2xl md:text-3xl font-serif italic mb-2">
          Welcome, {session?.user?.name?.split(' ')[0]}
        </h1>
        <p className="text-[var(--color-neutral)] text-sm">
          {isAdmin
            ? 'Manage your store, track analytics, and oversee customer interactions from this dashboard.'
            : 'View your account overview and manage your preferences here.'}
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border border-black/5 rounded-2xl p-6">
          <p className="text-xs text-[var(--color-neutral)] mb-1">
            Account Type
          </p>
          <p className="text-xl font-semibold capitalize">
            {isAdmin ? 'Admin' : 'Customer'}
          </p>
        </div>
        <div className="bg-white border border-black/5 rounded-2xl p-6">
          <p className="text-xs text-[var(--color-neutral)] mb-1">Email</p>
          <p className="text-sm font-medium break-all">
            {session?.user?.email}
          </p>
        </div>
      </div>

      {/* 🎯 Recharts Integration: Beautiful Visual Analytics Graph */}
      <div className="bg-white border border-black/5 rounded-2xl p-6 md:p-8">
        <div className="mb-4">
          <h3 className="font-semibold text-base text-[var(--color-text)]">
            Store Performance & Activity
          </h3>
          <p className="text-xs text-[var(--color-neutral)]">
            Monthly traffic conversion and platform interaction statistics.
          </p>
        </div>

        <div className="w-full h-64 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={storeAnalyticsMockData}
              margin={{ top: 10, right: 5, left: -25, bottom: 0 }}
            >
              <defs>
                {/* REEZ Neon Accent Color (#D4FF3F) Gradient Smooth Fill */}
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4FF3F" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#D4FF3F" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E8E6E0"
              />
              <XAxis
                dataKey="month"
                stroke="#6B7280"
                fontSize={11}
                tickLine={false}
              />
              <YAxis stroke="#6B7280" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.05)',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#1A1D29',
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Engagement Score"
                stroke="#1A1D29"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Customer Message Option */}
      {!isAdmin && (
        <div className="bg-[#F1F0EB] rounded-2xl p-6">
          <p className="text-sm text-[var(--color-neutral)]">
            The option to add or manage products isn't visible because you don't
            have admin access. You can still continue shopping.{' '}
            <a href="/shop" className="underline font-medium text-black">
              Shop page
            </a>{' '}
            theke continuous style selection check koro.
          </p>
        </div>
      )}
    </div>
  );
}

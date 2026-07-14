'use client';

import { authClient } from '@/app/lib/auth-client';

export default function DashboardOverview() {
  const { data: session } = authClient.useSession();
  const isAdmin = session?.user?.role === 'admin';

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-serif italic mb-2">
        Welcome, {session?.user?.name?.split(' ')[0]}
      </h1>
      <p className="text-[var(--color-neutral)] text-sm mb-8">
        {isAdmin
          ? 'Tomar REEZ store dashboard theke product manage koro.'
          : 'Tomar account overview ekhaneই dekhte pabe.'}
      </p>

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

      {!isAdmin && (
        <div className="mt-8 bg-[#F1F0EB] rounded-2xl p-6">
          <p className="text-sm text-[var(--color-neutral)]">
            Admin access nei bole product add/manage korার option dekhা যাচ্ছে
            না। Shopping continue koro{' '}
            <a href="/shop" className="underline font-medium text-black">
              Shop page
            </a>{' '}
            theকে।
          </p>
        </div>
      )}
    </div>
  );
}

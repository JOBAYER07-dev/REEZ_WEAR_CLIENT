'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { authClient } from '@/app/lib/auth-client';

export default function ProfilePage() {
  const { data: session, isPending, refetch } = authClient.useSession();
  const [name, setName] = useState(session?.user?.name || '');
  const [loading, setLoading] = useState(false);

  if (isPending)
    return <p className="text-sm text-[var(--color-neutral)]">Loading...</p>;

  if (!session) return null;

  const isAdmin = session.user.role === 'admin';

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Naam khali rakha jाবে না');
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.updateUser({ name });

      if (error) {
        toast.error(error.message || 'Update failed');
        return;
      }

      toast.success('Profile update hoyeche');
      refetch();
    } catch {
      toast.error('Kিছু ভুল hoyeche');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white border border-black/5 rounded-2xl p-6 md:p-8">
        <h1 className="text-2xl font-serif italic mb-6">Profile Settings</h1>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-[var(--color-text)] text-white flex items-center justify-center text-xl font-medium uppercase">
            {session.user.name?.charAt(0) || 'U'}
          </div>
          <div>
            <p className="font-semibold">{session.user.name}</p>
            <p className="text-sm text-[var(--color-neutral)]">
              {session.user.email}
            </p>
            <span
              className={`inline-block mt-1 text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${
                isAdmin
                  ? 'bg-[var(--color-accent)] text-black'
                  : 'bg-[var(--color-bg)] text-[var(--color-neutral)]'
              }`}
            >
              {isAdmin ? 'Admin' : 'Customer'}
            </span>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4 max-w-md">
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border border-black/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)]"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <input
              type="email"
              value={session.user.email}
              disabled
              className="w-full border border-black/10 rounded-lg px-4 py-2.5 text-sm bg-[var(--color-bg)] text-[var(--color-neutral)] cursor-not-allowed"
            />
            <p className="text-xs text-[var(--color-neutral)] mt-1">
              Email address cannot be changed.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            data-cursor-hover
            className="w-full sm:w-auto sm:self-start bg-[var(--color-text)] text-white rounded-full px-6 py-2.5 text-sm font-medium hover:bg-[var(--color-accent)] hover:text-black transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? 'Save hocche...' : 'Save Changes'}
          </button>
        </form>
      </div>

      {/* Account Info Card */}
      <div className="bg-white border border-black/5 rounded-2xl p-6 md:p-8">
        <h2 className="text-lg font-semibold mb-4">Account Information</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-[var(--color-neutral)] mb-1">Account Type</dt>
            <dd className="font-medium capitalize">
              {isAdmin ? 'Admin' : 'Customer'}
            </dd>
          </div>
          <div>
            <dt className="text-[var(--color-neutral)] mb-1">Email Verified</dt>
            <dd className="font-medium">
              {session.user.emailVerified ? 'Yes' : 'No'}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

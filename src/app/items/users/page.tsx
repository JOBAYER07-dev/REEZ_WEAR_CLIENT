'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Users,
  Shield,
  User as UserIcon,
  Calendar,
  Loader2,
} from 'lucide-react';
import { authClient } from '@/app/lib/auth-client';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function ManageUsersPage() {
  const { data: session, isPending } = authClient.useSession();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('/api/users', { credentials: 'include' });
        const data = await res.json();
        if (data.users) {
          setUsers(data.users);
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to load registered users.');
      } finally {
        setLoading(false);
      }
    }

    if (session?.user?.role === 'admin') {
      setTimeout(() => {
        setLoading(true);
      }, 0);
      fetchUsers();
    } else if (!isPending && session?.user?.role !== 'admin') {
      setTimeout(() => {
        setLoading(false);
      }, 0);
    }
  }, [session, isPending]);
  const handleRoleChange = async (
    userId: string,
    currentRole: string,
    newRole: string,
  ) => {
    if (userId === session?.user?.id) {
      toast.error('You cannot change your own role.');
      return;
    }

    const confirmToggle = confirm(
      `Are you sure you want to change the role to "${newRole.toUpperCase()}"?`,
    );
    if (!confirmToggle) return;

    setUpdatingId(userId);
    try {
      const res = await fetch(`/api/users/${userId}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ role: newRole }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Role update failed');
        return;
      }

      toast.success('User role successfully updated!');
      setUsers(prev =>
        prev.map(u => (u.id === userId ? { ...u, role: newRole } : u)),
      );
    } catch {
      toast.error('Something went wrong');
    } finally {
      setUpdatingId(null);
    }
  };

  if (isPending)
    return (
      <p className="text-sm text-[var(--color-neutral)] p-10 text-center">
        Loading...
      </p>
    );

  if (session?.user?.role !== 'admin') {
    return (
      <div className="bg-white border border-black/5 rounded-2xl p-8 text-center">
        <p className="text-[var(--color-neutral)]">
          This page is for admins only.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
      <Link
        href="/dashboard"
        data-cursor-hover
        className="inline-flex items-center gap-2 text-sm text-[var(--color-neutral)] hover:text-black mb-6 transition-colors font-medium"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-serif italic mb-1 flex items-center gap-2">
          <Users size={24} /> Manage Users
        </h1>
        <p className="text-[var(--color-neutral)] text-sm font-medium">
          Total {users.length} registered user{users.length !== 1 ? 's' : ''} on
          REEZ
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-16 bg-white border border-black/5 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white border border-black/5 rounded-2xl p-12 text-center">
          <p className="text-[var(--color-neutral)]">
            No users found.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-black/5 rounded-2xl overflow-hidden">
          <div className="hidden md:grid grid-cols-[50px_1fr_1fr_150px_140px] gap-4 px-5 py-3 border-b border-black/10 text-xs font-semibold text-[var(--color-neutral)] uppercase">
            <span>Avatar</span>
            <span>Name</span>
            <span>Email</span>
            <span>Change Role</span>
            <span>Joined Date</span>
          </div>

          {users.map(user => (
            <div
              key={user.id}
              className="grid grid-cols-1 md:grid-cols-[50px_1fr_1fr_150px_140px] gap-3 md:gap-4 items-center px-5 py-4 border-b border-black/5 last:border-b-0"
            >
              <div className="w-9 h-9 rounded-full bg-[var(--color-bg)] text-black flex items-center justify-center font-bold text-sm uppercase border border-black/5 shrink-0">
                {user.name?.charAt(0) || 'U'}
              </div>

              <div>
                <p className="text-sm font-medium text-black">{user.name}</p>
                <div className="md:hidden mt-1 flex flex-col gap-1 text-xs text-[var(--color-neutral)]">
                  <p>{user.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span>Role:</span>
                    <select
                      value={user.role || 'user'}
                      disabled={
                        updatingId === user.id || user.id === session?.user?.id
                      }
                      onChange={e =>
                        handleRoleChange(user.id, user.role, e.target.value)
                      }
                      className="border border-black/10 rounded-lg px-2 py-1 text-xs outline-none bg-white"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
              </div>

              <span className="hidden md:block text-sm text-[var(--color-neutral)] break-all">
                {user.email}
              </span>

              <div className="hidden md:block relative">
                {updatingId === user.id ? (
                  <span className="flex items-center gap-1.5 text-xs text-[var(--color-neutral)] font-medium">
                    <Loader2 size={14} className="animate-spin text-black" />{' '}
                    Updating...
                  </span>
                ) : (
                  <select
                    value={user.role || 'user'}
                    disabled={user.id === session?.user?.id}
                    onChange={e =>
                      handleRoleChange(user.id, user.role, e.target.value)
                    }
                    data-cursor-hover
                    className={`text-xs font-semibold px-3 py-1.5 rounded-xl border border-black/10 outline-none cursor-pointer bg-white capitalize transition-all ${
                      user.role === 'admin'
                        ? 'text-purple-600 border-purple-200 bg-purple-50/40 focus:border-purple-400'
                        : 'text-blue-600 border-blue-200 bg-blue-50/40 focus:border-blue-400'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <option value="user">👤 User</option>
                    <option value="admin">🛡️ Admin</option>
                  </select>
                )}
              </div>

              <span className="hidden md:block text-xs text-[var(--color-neutral)] inline-flex items-center gap-1">
                <Calendar size={12} />
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

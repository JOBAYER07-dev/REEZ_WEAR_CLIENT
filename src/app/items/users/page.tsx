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

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const res = await fetch('/api/users', {
          credentials: 'include',
        });
        const data = await res.json();
        if (data.users) {
          setUsers(data.users);
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch registered users. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    if (session?.user?.role === 'admin') {
      fetchUsers();
    }
  }, [session]);

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
          You are not authorized to access this page.
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
            No registered users found.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-black/5 rounded-2xl overflow-hidden">
          <div className="hidden md:grid grid-cols-[50px_1fr_1fr_120px_140px] gap-4 px-5 py-3 border-b border-black/10 text-xs font-semibold text-[var(--color-neutral)] uppercase">
            <span>Avatar</span>
            <span>Name</span>
            <span>Email</span>
            <span>Role</span>
            <span>Joined Date</span>
          </div>
          {users.map(user => (
            <div
              key={user.id}
              className="grid grid-cols-1 md:grid-cols-[50px_1fr_1fr_120px_140px] gap-3 md:gap-4 items-center px-5 py-4 border-b border-black/5 last:border-b-0"
            >
              <div className="w-9 h-9 rounded-full bg-[var(--color-bg)] text-black flex items-center justify-center font-bold text-sm uppercase border border-black/5 shrink-0">
                {user.name?.charAt(0) || 'U'}
              </div>

              {/* নাম */}
              <div>
                <p className="text-sm font-medium text-black">{user.name}</p>
                <p className="text-xs text-[var(--color-neutral)] md:hidden">
                  {user.email} · {user.role}
                </p>
              </div>

              <span className="hidden md:block text-sm text-[var(--color-neutral)] break-all">
                {user.email}
              </span>

              <span className="hidden md:block">
                <span
                  className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase inline-flex items-center gap-1 ${
                    user.role === 'admin'
                      ? 'bg-purple-50 text-purple-600 border border-purple-200'
                      : 'bg-blue-50 text-blue-600 border border-blue-200'
                  }`}
                >
                  {user.role === 'admin' ? (
                    <Shield size={10} />
                  ) : (
                    <UserIcon size={10} />
                  )}
                  {user.role || 'user'}
                </span>
              </span>
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

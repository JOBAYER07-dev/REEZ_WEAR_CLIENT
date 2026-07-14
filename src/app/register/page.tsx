'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authClient } from '@/app/lib/auth-client';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Shob field pooron koro');
      return;
    }

    if (password.length < 8) {
      setError('Password kমপক্ষে 8 character হতে হবে');
      return;
    }

    if (password !== confirmPassword) {
      setError('Password mile নাই');
      return;
    }

    setLoading(true);
    const { error: authError } = await authClient.signUp.email({
      name,
      email,
      password,
    });
    setLoading(false);

    if (authError) {
      setError(authError.message || 'Registration failed, abar try koro');
      toast.error('Registration failed');
      return;
    }

    toast.success('Account created successfully!');
    router.push('/');
  };

  const handleGoogleSignup = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: `${process.env.NEXT_PUBLIC_CLIENT_URL}/`,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-semibold tracking-tight">
            REEZ
          </Link>
          <p className="text-[var(--color-neutral)] text-sm mt-2">
            Notun account banao, shopping shuru koro
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-black/5 p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Tomar naam"
                className="w-full border border-black/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)]"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-black/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)]"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Kমপক্ষে 8 character"
                className="w-full border border-black/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)]"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Abar password likho"
                className="w-full border border-black/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              data-cursor-hover
              className="w-full bg-[var(--color-text)] text-white rounded-full py-3 text-sm font-medium hover:bg-[var(--color-accent)] hover:text-black transition-colors disabled:opacity-50"
            >
              {loading ? 'Account banano hocche...' : 'Register'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-black/10" />
            <span className="text-xs text-[var(--color-neutral)]">OR</span>
            <div className="flex-1 h-px bg-black/10" />
          </div>

          <button
            onClick={handleGoogleSignup}
            data-cursor-hover
            className="w-full flex items-center justify-center gap-3 border border-black/10 rounded-full py-3 text-sm font-medium hover:bg-black/5 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google diye Register koro
          </button>

          <p className="text-center text-sm text-[var(--color-neutral)] mt-6">
            Already account ache?{' '}
            <Link
              href="/login"
              className="text-black font-medium underline underline-offset-4"
            >
              Login koro
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

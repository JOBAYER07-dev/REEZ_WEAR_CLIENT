'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { authClient } from '@/app/lib/auth-client';

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoggedIn = !!session;
  const isAdmin = session?.user?.role === 'admin';

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success('Logout hoye গেছে');
    router.push('/');
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[var(--color-bg)]/95 backdrop-blur-sm border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-semibold tracking-tight shrink-0"
        >
          REEZ
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center flex-1 max-w-md bg-white rounded-full px-4 py-2.5 border border-black/10">
          <Search size={18} className="text-[var(--color-neutral)]" />
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full bg-transparent outline-none px-3 text-sm"
          />
        </div>

        {/* Nav Links - Desktop */}
        <div className="hidden lg:flex items-center gap-7 text-sm font-medium shrink-0">
          <Link
            href="/shop"
            className="hover:text-[var(--color-accent)] transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="hover:text-[var(--color-accent)] transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-[var(--color-accent)] transition-colors"
          >
            Contact
          </Link>
          {isLoggedIn && (
            <>
              <Link
                href="/dashboard"
                className="hover:text-[var(--color-accent)] transition-colors"
              >
                Dashboard
              </Link>
              {isAdmin && (
                <Link
                  href="/items/manage"
                  className="hover:text-[var(--color-accent)] transition-colors"
                >
                  Manage Items
                </Link>
              )}
            </>
          )}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            aria-label="Wishlist"
            className="hidden sm:block relative"
            data-cursor-hover
          >
            <Heart size={20} />
          </button>
          <button
            aria-label="Cart"
            className="hidden sm:block relative"
            data-cursor-hover
          >
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-[var(--color-accent)] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>

          {!isPending && (
            <>
              {isLoggedIn ? (
                <div className="hidden sm:flex items-center gap-3">
                  <Link href="/dashboard" data-cursor-hover>
                    <div className="w-9 h-9 rounded-full bg-[var(--color-text)] text-white flex items-center justify-center text-sm font-medium uppercase">
                      {session.user.name?.charAt(0) || 'U'}
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    data-cursor-hover
                    className="text-xs font-medium text-[var(--color-neutral)] hover:text-black transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  data-cursor-hover
                  className="hidden sm:flex items-center gap-2 text-sm font-medium border border-black/10 rounded-full px-4 py-2 hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
                >
                  <User size={16} />
                  Login
                </Link>
              )}
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden"
            aria-label="Toggle menu"
            data-cursor-hover
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-black/5 px-6 py-5 flex flex-col gap-4">
          <div className="flex md:hidden items-center bg-[var(--color-bg)] rounded-full px-4 py-2.5 border border-black/10 mb-2">
            <Search size={18} className="text-[var(--color-neutral)]" />
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full bg-transparent outline-none px-3 text-sm"
            />
          </div>

          <Link
            href="/shop"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-medium"
          >
            Shop
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-medium"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-medium"
          >
            Contact
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium"
              >
                Dashboard
              </Link>
              {isAdmin && (
                <>
                  <Link
                    href="/items/add"
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium"
                  >
                    Add Item
                  </Link>
                  <Link
                    href="/items/manage"
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium"
                  >
                    Manage Items
                  </Link>
                </>
              )}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleLogout();
                }}
                className="text-sm font-medium text-left text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium bg-[var(--color-text)] text-white rounded-full px-4 py-2.5 text-center"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

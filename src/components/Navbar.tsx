'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, ShoppingCart, Heart, User } from 'lucide-react';

export default function Navbar() {
  const [isLoggedIn] = useState(false); // পরে Better Auth session diye replace korবো

  return (
    <nav className="sticky top-0 z-50 w-full bg-[var(--color-bg)]/95 backdrop-blur-sm border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold tracking-tight">
          REEZ
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md bg-white rounded-full px-4 py-2.5 border border-black/10">
          <Search size={18} className="text-[var(--color-neutral)]" />
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full bg-transparent outline-none px-3 text-sm"
          />
        </div>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
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
                href="/items/add"
                className="hover:text-[var(--color-accent)] transition-colors"
              >
                Add Item
              </Link>
              <Link
                href="/items/manage"
                className="hover:text-[var(--color-accent)] transition-colors"
              >
                Manage
              </Link>
            </>
          )}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <button aria-label="Wishlist" className="relative" data-cursor-hover>
            <Heart size={20} />
          </button>
          <button aria-label="Cart" className="relative" data-cursor-hover>
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-[var(--color-accent)] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>

          {isLoggedIn ? (
            <Link href="/dashboard" data-cursor-hover>
              <div className="w-9 h-9 rounded-full bg-[var(--color-text)] text-white flex items-center justify-center text-sm font-medium">
                U
              </div>
            </Link>
          ) : (
            <Link
              href="/login"
              data-cursor-hover
              className="flex items-center gap-2 text-sm font-medium border border-black/10 rounded-full px-4 py-2 hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
            >
              <User size={16} />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

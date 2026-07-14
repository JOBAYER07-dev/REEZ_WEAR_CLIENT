'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { authClient } from '@/app/lib/auth-client';
import type { Product } from '@/types/product';

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const { cartCount, cartItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // Search State
  const [searchVal, setSearchVal] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = !!session;
  const isAdmin = session?.user?.role === 'admin';

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  // 🎯 Real-time search suggestion fetch logic
  useEffect(() => {
    if (!searchVal.trim()) {
      setSuggestions([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products?search=${encodeURIComponent(searchVal.trim())}&limit=5`,
        );
        const data = await res.json();
        if (data && Array.isArray(data.products)) {
          setSuggestions(data.products);
        }
      } catch (error) {
        console.error('Suggestions fetch failed:', error);
      }
    }, 300); // 300ms Debounce taaki database-e beshi pressure na pore

    return () => clearTimeout(delayDebounceFn);
  }, [searchVal]);

  // Dropdown-er baire click korle jeno suggestion list bondho hoye jay
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success('Logout hoyeche');
    router.push('/');
    router.refresh();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchVal.trim())}`);
      setSearchVal('');
      setShowSuggestions(false);
      setMobileOpen(false);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-[var(--color-bg)]/95 backdrop-blur-sm border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-semibold tracking-tight shrink-0"
          >
            REEZ
          </Link>

          {/* 🎯 Search Bar - Desktop with Dynamic Floating Suggestions */}
          <div
            ref={suggestionRef}
            className="hidden md:block relative flex-1 max-w-md"
          >
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center w-full bg-white rounded-full px-4 py-2.5 border border-black/10"
            >
              <Search size={18} className="text-[var(--color-neutral)]" />
              <input
                type="text"
                value={searchVal}
                onChange={e => {
                  setSearchVal(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="What are you looking for?"
                className="w-full bg-transparent outline-none px-3 text-sm"
              />
            </form>

            {/* Floating Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white border border-black/5 rounded-2xl shadow-xl overflow-hidden z-50 flex flex-col divide-y divide-black/5">
                {suggestions.map(product => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={() => {
                      setSearchVal('');
                      setShowSuggestions(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--color-bg)] transition-colors text-left"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-10 h-10 object-cover rounded-lg bg-gray-50 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-black truncate">
                        {product.title}
                      </p>
                      <p className="text-xs text-[var(--color-neutral)] capitalize">
                        {product.category.replace('-', ' ')}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-black shrink-0">
                      ৳{product.price}
                    </span>
                  </Link>
                ))}
              </div>
            )}
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
                <Link
                  href="/dashboard/profile"
                  className="hover:text-[var(--color-accent)] transition-colors"
                >
                  Profile
                </Link>
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
              onClick={() => setCartOpen(true)}
              aria-label="Cart"
              className="relative flex items-center justify-center p-2"
              data-cursor-hover
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-[var(--color-accent)] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
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
            <form
              onSubmit={handleSearchSubmit}
              className="flex md:hidden items-center bg-[var(--color-bg)] rounded-full px-4 py-2.5 border border-black/10 mb-2"
            >
              <Search size={18} className="text-[var(--color-neutral)]" />
              <input
                type="text"
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                placeholder="What are you looking for?"
                className="w-full bg-transparent outline-none px-3 text-sm"
              />
            </form>

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
                <Link
                  href="/dashboard/profile"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium"
                >
                  Profile
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

      {/* RIGHT SIDE CART DRAWER OVERLAY */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setCartOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white h-full shadow-xl flex flex-col z-10 animate-slide-in">
            <div className="p-6 border-b border-black/5 flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <ShoppingCart size={20} /> Shopping Cart ({cartCount})
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 hover:bg-[var(--color-bg)] rounded-full transition-colors"
                data-cursor-hover
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-[var(--color-neutral)] gap-2">
                  <p className="text-sm">Tomar cart ekhono khali ache.</p>
                  <Link
                    href="/shop"
                    onClick={() => setCartOpen(false)}
                    className="text-xs font-semibold text-black underline underline-offset-4"
                  >
                    Shop Now koro
                  </Link>
                </div>
              ) : (
                cartItems.map(item => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 bg-[var(--color-bg)]/40 p-3 rounded-xl border border-black/5 items-center"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">
                        {item.product.title}
                      </h4>
                      <p className="text-xs text-[var(--color-neutral)] mt-0.5">
                        ৳{item.product.price} x {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-semibold">
                      ৳{item.product.price * item.quantity}
                    </span>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-black/5 bg-[var(--color-bg)]/30 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--color-neutral)] font-medium">
                    Subtotal
                  </span>
                  <span className="text-lg font-bold">৳{totalPrice}</span>
                </div>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    router.push('/checkout');
                  }}
                  data-cursor-hover
                  className="w-full bg-[var(--color-text)] text-white text-sm font-semibold py-3.5 rounded-full hover:bg-[var(--color-accent)] hover:text-black transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

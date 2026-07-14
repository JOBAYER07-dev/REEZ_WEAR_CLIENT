'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import type { Product } from '@/types/product';

const categories = [
  { name: 'All', slug: 'all' },
  { name: 'Personal Care', slug: 'personal-care' },
  { name: 'Accessories', slug: 'accessories' },
  { name: 'Shirts', slug: 'shirts' },
  { name: 'Sweat Pants', slug: 'sweat-pants' },
  { name: 'Parfume', slug: 'parfume' },
  { name: 'T-Shirt', slug: 't-shirt' },
  { name: 'Sneakers', slug: 'sneakers' },
  { name: 'Bags', slug: 'bags' },
];

function ShopContent() {
  const searchParams = useSearchParams();
  
  // 🎯 হোমপেজ বা অন্য পেজ থেকে ইউআরএল-এ আসা ফিল্টার রিড করা
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const limit = 8;

  useEffect(() => {
    let ignore = false;
    async function fetchProducts() {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
          sort,
        });

        if (category !== 'all') params.set('category', category);
        if (search) params.set('search', search);

        // 🎯 ব্যাকএন্ড এপিআই-তে প্রাইস ফিল্টার পাঠানো হচ্ছে
        if (minPrice) params.set('minPrice', minPrice);
        if (maxPrice) params.set('maxPrice', maxPrice);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products?${params.toString()}`,
        );
        const data = await res.json();

        if (!ignore) {
          setProducts(data.products);
          setTotalPages(Math.max(1, Math.ceil(data.total / limit)));
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        // লাইন ৭১ পরিবর্তন করে এটি করো:
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    
    fetchProducts();
    
    return () => {
      ignore = true;
    };
  }, [page, sort, category, search, minPrice, maxPrice]);

  const handleFilterChange = () => {
    setPage(1); // ফিল্টার চেঞ্জ হলে সবসময় ১ম পেজে ফেরত নিয়ে যাবে
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif italic mb-2">Explore Products</h1>
        <p className="text-[var(--color-neutral)] text-sm">
          Search and filter through our wide range of products to find exactly what you need.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 flex items-center bg-white rounded-full px-4 py-3 border border-black/10">
          <Search size={18} className="text-[var(--color-neutral)]" />
          <input
            type="text"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              handleFilterChange();
            }}
            placeholder="Search products..."
            className="w-full bg-transparent outline-none px-3 text-sm"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          data-cursor-hover
          className="flex items-center gap-2 border border-black/10 rounded-full px-4 py-3 text-sm font-medium hover:bg-white transition-colors lg:hidden"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar Filters */}
        <aside className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
          <div className="bg-white rounded-2xl border border-black/5 p-5 sticky top-24">
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3">Category</h3>
              <div className="flex flex-col gap-2">
                {categories.map(c => (
                  <button
                    key={c.slug}
                    onClick={() => {
                      setCategory(c.slug);
                      handleFilterChange();
                    }}
                    data-cursor-hover
                    className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                      category === c.slug
                        ? 'bg-[var(--color-accent)] font-medium text-black'
                        : 'hover:bg-[var(--color-bg)] text-[var(--color-neutral)]'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3">Price Range</h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={e => {
                    setMinPrice(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)] bg-[var(--color-bg)]/35"
                />
                <span className="text-[var(--color-neutral)]">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={e => {
                    setMaxPrice(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)] bg-[var(--color-bg)]/35"
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Sort By</h3>
              <select
                value={sort}
                onChange={e => {
                  setSort(e.target.value);
                  handleFilterChange();
                }}
                className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)] bg-white"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            ) : products.length === 0 ? (
              <p className="col-span-full text-center text-[var(--color-neutral)] py-16">
                There are no products matching your filters. Please adjust your criteria and try again.
              </p>
            ) : (
              products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>

          {/* Pagination */}
          {!loading && products.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                data-cursor-hover
                className="px-4 py-2 text-sm border border-black/10 rounded-full disabled:opacity-40 hover:bg-white transition-colors"
              >
                Previous
              </button>
              <span className="text-sm text-[var(--color-neutral)] px-3">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                data-cursor-hover
                className="px-4 py-2 text-sm border border-black/10 rounded-full disabled:opacity-40 hover:bg-white transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 🎯 Next.js App Router এর নিয়ম মেনে Suspense দিয়ে র্যাপ করা হলো
export default function ShopPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-sm text-[var(--color-neutral)]">Loading Shop Content...</div>}>
      <ShopContent />
    </Suspense>
  );
}
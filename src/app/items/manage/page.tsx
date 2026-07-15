'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Eye, Trash2, ArrowLeft, Edit } from 'lucide-react';
import { authClient } from '@/app/lib/auth-client';
import type { Product } from '@/types/product';

export default function ManageItemsPage() {
  const { data: session, isPending } = authClient.useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      try {
        const res = await fetch('/api/products?limit=100');
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product? It cannot be undone.'))
      return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) {
        toast.error('Failed to delete product. Please try again later.');
        return;
      }

      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Product successfully deleted!');
    } catch {
      toast.error('Something went wrong, please try again later');
    } finally {
      setDeletingId(null);
    }
  };

  if (isPending)
    return <p className="text-sm text-[var(--color-neutral)]">Loading...</p>;

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

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif italic mb-1">Manage Products</h1>
          <p className="text-[var(--color-neutral)] text-sm font-medium">
            Total {products.length} product{products.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/items/add"
          data-cursor-hover
          className="bg-[var(--color-text)] text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-[var(--color-accent)] hover:text-black transition-colors"
        >
          + Add New
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-16 bg-white border border-black/5 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white border border-black/5 rounded-2xl p-12 text-center">
          <p className="text-[var(--color-neutral)]">
            You haven't added any products yet. Click the "Add New" button to
            create your first product.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-black/5 rounded-2xl overflow-hidden">
          <div className="hidden md:grid grid-cols-[60px_1fr_100px_100px_80px_160px] gap-4 px-5 py-3 border-b border-black/10 text-xs font-semibold text-[var(--color-neutral)] uppercase">
            <span>Image</span>
            <span>Title</span>
            <span>Category</span>
            <span>Price</span>
            <span>Rating</span>
            <span>Actions</span>
          </div>

          {products.map(product => (
            <div
              key={product.id}
              className="grid grid-cols-1 md:grid-cols-[60px_1fr_100px_100px_80px_160px] gap-3 md:gap-4 items-center px-5 py-4 border-b border-black/5 last:border-b-0"
            >
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#F1F0EB] shrink-0">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium">{product.title}</p>
                <p className="text-xs text-[var(--color-neutral)] line-clamp-1 md:hidden">
                  {product.category.replace('-', ' ')} · ৳{product.price}
                </p>
              </div>
              <span className="hidden md:block text-sm text-[var(--color-neutral)] capitalize">
                {product.category.replace('-', ' ')}
              </span>
              <span className="hidden md:block text-sm font-medium">
                ৳{product.price}
              </span>
              <span className="hidden md:block text-sm text-[var(--color-neutral)]">
                {product.rating.toFixed(1)}
              </span>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href={`/product/${product.id}`}
                  data-cursor-hover
                  className="flex items-center gap-1 text-xs font-medium text-[var(--color-neutral)] hover:text-black transition-colors whitespace-nowrap"
                >
                  <Eye size={14} />
                  View
                </Link>
                <Link
                  href={`/items/edit/${product.id}`}
                  data-cursor-hover
                  className="flex items-center gap-1 text-xs font-medium text-blue-500 hover:text-blue-700 transition-colors whitespace-nowrap"
                >
                  <Edit size={14} />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  disabled={deletingId === product.id}
                  data-cursor-hover
                  className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700 transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  <Trash2 size={14} />
                  {deletingId === product.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

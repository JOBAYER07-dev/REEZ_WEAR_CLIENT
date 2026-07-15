'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { authClient } from '@/app/lib/auth-client';

const categories = [
  'personal-care',
  'accessories',
  'shirts',
  'sweat-pants',
  'parfume',
  't-shirt',
  'sneakers',
  'bags',
];

export default function AddItemPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('shirts');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (
      !title ||
      !shortDescription ||
      !fullDescription ||
      !price ||
      !category
    ) {
      setError('Please fill in all required fields');
      return;
    }

    if (Number(price) <= 0) {
      setError('Price must be a positive number');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title,
          shortDescription,
          fullDescription,
          price: Number(price),
          category,
          image,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        toast.error('Failed to add product. Please try again later.');
        setLoading(false);
        return;
      }

      toast.success('Product successfully added!');
      router.push('/items/manage');
    } catch {
      setError('Something went wrong, please try again later');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Link
        href="/dashboard"
        data-cursor-hover
        className="inline-flex items-center gap-2 text-sm text-[var(--color-neutral)] hover:text-black mb-6 transition-colors font-medium"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <div className="bg-white border border-black/5 rounded-2xl p-6 md:p-8">
        <h1 className="text-2xl font-serif italic mb-1">Add New Product</h1>
        <p className="text-[var(--color-neutral)] text-sm mb-6">
          Notun product-er details diye REEZ store-e live koro
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Title *</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="jemon: Oversized Cotton Tee"
              className="w-full border border-black/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] bg-[var(--color-bg)]/35"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Short Description *
            </label>
            <input
              type="text"
              value={shortDescription}
              onChange={e => setShortDescription(e.target.value)}
              placeholder="1-2 line summary"
              className="w-full border border-black/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] bg-[var(--color-bg)]/35"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Full Description *
            </label>
            <textarea
              value={fullDescription}
              onChange={e => setFullDescription(e.target.value)}
              placeholder="Details description — fabric, fit, care instructions ityadi"
              rows={4}
              className="w-full border border-black/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] resize-none bg-[var(--color-bg)]/35"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Price (৳) *
              </label>
              <input
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="850"
                className="w-full border border-black/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] bg-[var(--color-bg)]/35"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Category *
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full border border-black/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] bg-white capitalize"
              >
                {categories.map(c => (
                  <option key={c} value={c} className="capitalize">
                    {c.replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Image URL (Optional)
            </label>
            <input
              type="url"
              value={image}
              onChange={e => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full border border-black/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] bg-[var(--color-bg)]/35"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            data-cursor-hover
            className="w-full sm:w-auto sm:self-start bg-[var(--color-text)] text-white rounded-full px-8 py-3 text-sm font-medium hover:bg-[var(--color-accent)] hover:text-black transition-colors disabled:opacity-50"
          >
            {loading ? 'Add hocche...' : 'Submit Product'}
          </button>
        </form>
      </div>
    </div>
  );
}

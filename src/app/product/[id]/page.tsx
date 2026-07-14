'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Star, ShoppingCart, Heart, Tag } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import type { Product } from '@/types/product';

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function fetchProduct() {
      setLoading(true);
      setNotFound(false);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
        );

        if (res.status === 404) {
          if (!ignore) setNotFound(true);
          return;
        }

        const data: Product = await res.json();
        if (ignore) return;
        setProduct(data);

        // Related products — same category theke, current product bad diye
        const relatedRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products?category=${data.category}&limit=4`,
        );
        const relatedData = await relatedRes.json();
        if (!ignore) {
          setRelated(
            relatedData.products
              .filter((p: Product) => p.id !== data.id)
              .slice(0, 4),
          );
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    if (id) fetchProduct();

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-pulse">
          <div className="aspect-square bg-[#E8E6E0] rounded-2xl" />
          <div className="flex flex-col gap-4">
            <div className="h-8 bg-[#E8E6E0] rounded w-3/4" />
            <div className="h-4 bg-[#E8E6E0] rounded w-1/2" />
            <div className="h-24 bg-[#E8E6E0] rounded" />
            <div className="h-12 bg-[#E8E6E0] rounded-full w-40" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 text-center">
        <h1 className="text-2xl font-semibold mb-3">
          Product khুঁজে pাওয়া যায়নি
        </h1>
        <p className="text-[var(--color-neutral)] mb-6">
          Ei product ta হয়tো mucheদেওয়া হয়েছে, ba link ta ভুল।
        </p>
        <Link
          href="/shop"
          data-cursor-hover
          className="inline-block bg-[var(--color-text)] text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-[var(--color-accent)] hover:text-black transition-colors"
        >
          Shop-e Fere Jao
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
      {/* Breadcrumb */}
      <div className="text-sm text-[var(--color-neutral)] mb-8">
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-black">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-black">{product.title}</span>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <div className="aspect-square bg-[#F1F0EB] rounded-2xl overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-neutral)] mb-2">
            {product.category.replace('-', ' ')}
          </span>
          <h1 className="text-3xl md:text-4xl font-serif italic mb-3">
            {product.title}
          </h1>

          <div className="flex items-center gap-2 mb-5">
            <div className="flex items-center gap-1 text-sm">
              <Star
                size={16}
                fill="currentColor"
                className="text-[var(--color-accent)]"
              />
              <span className="font-medium">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-[var(--color-neutral)] text-sm">
              · Verified Product
            </span>
          </div>

          <p className="text-2xl font-semibold mb-6">৳{product.price}</p>

          <p className="text-[var(--color-neutral)] text-sm leading-relaxed mb-8">
            {product.shortDescription}
          </p>

          <div className="flex items-center gap-3 mb-8">
            <button
              data-cursor-hover
              className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-text)] text-white rounded-full py-3.5 text-sm font-medium hover:bg-[var(--color-accent)] hover:text-black transition-colors"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
            <button
              aria-label="Wishlist"
              data-cursor-hover
              className="w-12 h-12 flex items-center justify-center border border-black/10 rounded-full hover:border-[var(--color-accent)] transition-colors"
            >
              <Heart size={18} />
            </button>
          </div>

          {/* Key Info / Specifications */}
          <div className="border-t border-black/10 pt-6">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Tag size={16} />
              Key Information
            </h3>
            <dl className="grid grid-cols-2 gap-y-3 text-sm">
              <dt className="text-[var(--color-neutral)]">Category</dt>
              <dd className="font-medium capitalize">
                {product.category.replace('-', ' ')}
              </dd>

              <dt className="text-[var(--color-neutral)]">Price</dt>
              <dd className="font-medium">৳{product.price}</dd>

              <dt className="text-[var(--color-neutral)]">Rating</dt>
              <dd className="font-medium">{product.rating.toFixed(1)} / 5.0</dd>
            </dl>
          </div>
        </div>
      </div>

      {/* Description / Overview */}
      <div className="mb-16 max-w-3xl">
        <h2 className="text-2xl font-serif italic mb-4">Description</h2>
        <p className="text-[var(--color-neutral)] leading-relaxed">
          {product.fullDescription}
        </p>
      </div>

      {/* Reviews / Rating */}
      <div className="mb-16 max-w-3xl">
        <h2 className="text-2xl font-serif italic mb-4">Ratings</h2>
        <div className="bg-white border border-black/5 rounded-2xl p-6 flex items-center gap-6">
          <div className="text-center">
            <p className="text-4xl font-semibold">
              {product.rating.toFixed(1)}
            </p>
            <div className="flex items-center gap-0.5 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={
                    i < Math.round(product.rating) ? 'currentColor' : 'none'
                  }
                  className="text-[var(--color-accent)]"
                />
              ))}
            </div>
          </div>
          <div className="flex-1 text-sm text-[var(--color-neutral)]">
            Ei product-er overall rating {product.rating.toFixed(1)} out of 5,
            verified customer purchase-er ভিত্তিতে।
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl md:text-3xl font-serif italic mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              : related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}

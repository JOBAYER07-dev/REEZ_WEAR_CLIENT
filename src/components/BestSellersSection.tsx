'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import type { Product } from '@/types/product';

export default function BestSellersSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products?sort=newest&limit=4`,
        );
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-serif italic">Best Sellers</h2>
        <Link
          href="/shop"
          data-cursor-hover
          className="text-sm font-medium underline underline-offset-4 hover:text-[var(--color-accent)] transition-colors"
        >
          See All
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))
        ) : products.length === 0 ? (
          <p className="col-span-full text-center text-[var(--color-neutral)] py-8">
            No products added yet. Check back soon!
          </p>
        ) : (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </section>
  );
}

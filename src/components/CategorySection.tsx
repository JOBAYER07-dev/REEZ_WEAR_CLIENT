'use client';

import {
  Shirt,
  Watch,
  Footprints,
  ShoppingBag,
  Sparkles,
  Layers,
} from 'lucide-react';
import Link from 'next/link';

const categories = [
  { name: 'Personal Care', slug: 'personal-care', icon: Sparkles },
  { name: 'Accessories', slug: 'accessories', icon: Watch },
  { name: 'Shirts', slug: 'shirts', icon: Shirt },
  { name: 'Sweat Pants', slug: 'sweat-pants', icon: Layers },
  { name: 'Parfume', slug: 'parfume', icon: Sparkles },
  { name: 'T-Shirt', slug: 't-shirt', icon: Shirt },
  { name: 'Sneakers', slug: 'sneakers', icon: Footprints },
  { name: 'Bags', slug: 'bags', icon: ShoppingBag },
];

export default function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6 sm:gap-10 items-start">
        <div className="flex flex-col justify-between h-full sm:min-w-[140px] shrink-0">
          <h2 className="text-xl md:text-2xl font-semibold">
            Shop by Category
          </h2>
          <Link
            href="/shop"
            data-cursor-hover
            className="text-sm text-[var(--color-neutral)] underline underline-offset-4 hover:text-[var(--color-accent)] transition-colors mt-6 sm:mt-0"
          >
            See All
          </Link>
        </div>

        {/* min-w-0 na dile grid overflow hoy */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 min-w-0">
          {categories.map(({ name, slug, icon: Icon }) => (
            <Link
              key={slug}
              href={`/shop?category=${slug}`}
              data-cursor-hover
              className="min-w-0 flex items-center gap-3 bg-white border border-black/10 rounded-xl px-4 py-3.5 hover:border-[var(--color-accent)] transition-colors"
            >
              <span className="w-8 h-8 shrink-0 rounded-full bg-[#F1F0EB] flex items-center justify-center">
                <Icon size={16} strokeWidth={1.5} />
              </span>
              <span className="text-sm font-medium truncate">{name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

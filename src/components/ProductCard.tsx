import Link from 'next/link';
import { Star } from 'lucide-react';
import type { Product } from '@/types/product';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white border border-black/5 rounded-2xl overflow-hidden flex flex-col h-full hover:shadow-md hover:border-black/10 transition-all duration-300 group">
      {/* 🎯 Image Container: aspect-square করে লম্বা ভাব কমানো হয়েছে */}
      <div className="relative aspect-square w-full bg-[#F1F0EB] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col gap-1.5 flex-1 justify-between">
        <div>
          {/* Title & Rating */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-sm text-[var(--color-text)] line-clamp-1 flex-1">
              {product.title}
            </h3>
            <span className="flex items-center gap-1 text-[11px] font-medium text-[var(--color-neutral)] shrink-0 bg-[var(--color-bg)] px-2 py-0.5 rounded-full">
              <Star
                size={10}
                fill="currentColor"
                className="text-amber-400 stroke-amber-400"
              />
              {product.rating.toFixed(1)}
            </span>
          </div>

          {/* Short Description */}
          <p className="text-xs text-[var(--color-neutral)] line-clamp-1">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Action Button */}
        <div className="mt-3 pt-3 border-t border-black/5 flex items-center justify-between">
          <span className="font-bold text-sm text-[var(--color-text)]">
            ৳{product.price}
          </span>
          <Link
            href={`/product/${product.id}`}
            data-cursor-hover
            className="text-xs font-semibold bg-[var(--color-text)] text-white hover:bg-[var(--color-accent)] hover:text-black rounded-full px-3.5 py-2 transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

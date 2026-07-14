import Link from 'next/link';
import { Star } from 'lucide-react';
import type { Product } from '@/types/product';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white border border-black/5 rounded-2xl overflow-hidden flex flex-col h-full hover:border-[var(--color-accent)] transition-colors">
      {/* Image */}
      <div className="relative aspect-[3/4] bg-[#F1F0EB]">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-semibold text-sm line-clamp-1">{product.title}</h3>
        <p className="text-xs text-[var(--color-neutral)] line-clamp-2">
          {product.shortDescription}
        </p>

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="font-semibold text-sm">৳{product.price}</span>
          <span className="flex items-center gap-1 text-xs text-[var(--color-neutral)]">
            <Star size={12} fill="currentColor" />
            {product.rating.toFixed(1)}
          </span>
        </div>

        <Link
          href={`/product/${product.id}`}
          data-cursor-hover
          className="mt-3 w-full text-center text-sm font-medium border border-black/10 rounded-full py-2 hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

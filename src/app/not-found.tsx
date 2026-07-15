import Link from 'next/link';
import { ArrowRight, HelpCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="w-20 h-20 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center mb-6 text-[var(--color-text)]">
        <HelpCircle size={40} strokeWidth={1.5} />
      </div>

      <h1 className="text-7xl font-bold tracking-tight text-[var(--color-text)] mb-2">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-serif italic mb-4">
        Page Not Found
      </h2>

      <p className="text-sm text-[var(--color-neutral)] max-w-md leading-relaxed mb-8">
        The page you are looking for does not exist or has been removed. Please check the URL or return to the homepage.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/"
          data-cursor-hover
          className="bg-[var(--color-text)] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[var(--color-accent)] hover:text-black transition-colors inline-flex items-center gap-2"
        >
          Go to Home
        </Link>
        <Link
          href="/shop"
          data-cursor-hover
          className="border border-black/10 px-6 py-3 rounded-full text-sm font-semibold hover:border-black transition-colors inline-flex items-center gap-2"
        >
          Explore Shop <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // TODO: backend API e connect korte hobe (newsletter collection e save)
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
      <div className="bg-[var(--color-text)] rounded-3xl px-6 py-14 sm:px-14 flex flex-col items-center text-center gap-5">
        <div className="w-12 h-12 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
          <Mail size={22} className="text-black" />
        </div>

        <h2 className="text-3xl md:text-4xl font-serif italic text-white">
          Get 10% Off Your First Order
        </h2>
        <p className="text-sm text-white/60 max-w-md">
          Subscribe to our newsletter and receive a 10% discount code for your first order. Stay updated with our latest products and offers.
        </p>

        {submitted ? (
          <div className="flex items-center gap-2 text-[var(--color-accent)] font-medium text-sm mt-2">
            <CheckCircle2 size={18} />
            Thank you for subscribing! Check your inbox for the discount code.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 bg-white/10 text-white placeholder:text-white/40 rounded-full px-5 py-3 text-sm outline-none border border-white/10 focus:border-[var(--color-accent)] transition-colors"
            />
            <button
              type="submit"
              data-cursor-hover
              className="bg-[var(--color-accent)] text-black text-sm font-semibold rounded-full px-6 py-3 hover:opacity-90 transition-opacity"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

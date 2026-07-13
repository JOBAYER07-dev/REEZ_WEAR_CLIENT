'use client';

import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full h-[65vh] min-h-[500px] bg-[#E8E6E0] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-model.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/10" />

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col justify-between py-12">
        <div>
          <h1 className="text-6xl md:text-8xl font-serif italic text-white leading-[0.95]">
            Urban
            <br />
            Style
          </h1>
        </div>

        <div className="flex items-end justify-between">
          <p className="text-white text-sm md:text-base uppercase tracking-wider">
            Limited-Editions
            <br />
            Styles
          </p>

          <button
            data-cursor-hover
            className="w-14 h-14 rounded-full border border-white flex items-center justify-center text-white hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] hover:text-black transition-colors"
            aria-label="Scroll down"
          >
            <ArrowDown size={20} />
          </button>

          <p className="text-white text-sm md:text-base uppercase tracking-wider text-right hidden md:block">
            Designed to
            <br />
            Stand Out
          </p>
        </div>
      </div>
    </section>
  );
}

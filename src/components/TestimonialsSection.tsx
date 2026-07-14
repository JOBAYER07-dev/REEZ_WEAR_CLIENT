import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Rakibul Hasan',
    location: 'Dhaka',
    rating: 5,
    review:
      'Fabric quality onek bhalo, size guide onujay order kore perfect fit peyechi. Delivery o 2 diner moddhe peye gechi.',
  },
  {
    name: 'Shanto Ahmed',
    location: 'Chattogram',
    rating: 5,
    review:
      'REEZ-er oversized tee ta amar favorite hoye geche. Stitching neat, wash er porew color fade hoy nai.',
  },
  {
    name: 'Mahin Islam',
    location: 'Bhola',
    rating: 4,
    review:
      'Cargo pants ta khub comfortable, kintu ekটু size adjust korte hoyeche exchange kore. Support team fast response diyeche.',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-serif italic">
          What Our Customers Say
        </h2>
        <p className="text-sm text-[var(--color-neutral)] mt-2">
          Real feedback from real REEZ customers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map(t => (
          <div
            key={t.name}
            className="bg-white border border-black/5 rounded-2xl p-6 flex flex-col gap-4 h-full"
          >
            <Quote size={22} className="text-[var(--color-accent)]" />

            <p className="text-sm text-[var(--color-text)] leading-relaxed flex-1">
              {t.review}
            </p>

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < t.rating
                      ? 'fill-[var(--color-accent)] text-[var(--color-accent)]'
                      : 'text-black/10'
                  }
                />
              ))}
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-black/5">
              <div className="w-9 h-9 rounded-full bg-[var(--color-text)] text-white flex items-center justify-center text-sm font-medium">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-[var(--color-neutral)]">
                  {t.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

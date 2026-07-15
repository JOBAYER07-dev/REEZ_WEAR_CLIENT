'use client';

import { Truck, ShieldCheck, RefreshCw, Headset } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    desc: 'We offer fast and reliable delivery services, ensuring that your orders reach you in a timely manner.',
  },
  {
    icon: ShieldCheck,
    title: 'Authentic Quality',
    desc: 'All products are 100% authentic and sourced directly from authorized distributors and brands.',
  },
  {
    icon: RefreshCw,
    title: 'Easy Exchange',
    desc: 'Easy exchanges are available within 7 days, provided the product is unused and has its original tags attached.',
  },
  {
    icon: Headset,
    title: '24/7 Support',
    desc: 'Customer support always ready to help, 24/7, via chat or email.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#F1F0EB] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <h2 className="text-3xl md:text-4xl font-serif italic mb-10">
          Why Choose REEZ
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 border border-black/5 flex flex-col gap-4"
            >
              <div className="w-11 h-11 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center">
                <Icon size={20} />
              </div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-[var(--color-neutral)] leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

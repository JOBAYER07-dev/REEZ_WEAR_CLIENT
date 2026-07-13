'use client';

import { Truck, ShieldCheck, RefreshCw, Headset } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    desc: 'Dhaka-er vitor 24 ghontay ar shara Bangladesh e 2-3 diner moddhe delivery.',
  },
  {
    icon: ShieldCheck,
    title: 'Authentic Quality',
    desc: 'Prottek product hand-checked, premium fabric ar stitching guaranteed.',
  },
  {
    icon: RefreshCw,
    title: 'Easy Exchange',
    desc: 'Size na milleo chinta nei — 7 diner moddhe free exchange.',
  },
  {
    icon: Headset,
    title: '24/7 Support',
    desc: 'Order niye je kono proshno thakle amader team shomoy shara Facebook/phone e ready.',
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

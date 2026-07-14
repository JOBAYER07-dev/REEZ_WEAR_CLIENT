import { Target, Users, Leaf, Award } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    desc: 'To provide affordable premium quality streetwear for Bangladesh\'s youth, where fashion and comfort coexist.',
  },
  {
    icon: Leaf,
    title: 'Quality First',
    desc: 'We source the best quality fabrics from local markets and ensure that every product is crafted with care, so you can enjoy long lasting comfort and style.',
  },
  {
    icon: Users,
    title: 'Customer Centric',
    desc: 'With 4.7k+ followers and growing customer base, we\'ve proven that listening to real customer feedback helps us continuously improve both our designs and our service.',
  },
  {
    icon: Award,
    title: 'Authentic Design',
    desc: 'No copy-paste designs every REEZ collection is created from original concepts, inspired by local trends and designed with authenticity in mind.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-12">
        <p className="text-sm font-medium text-[var(--color-neutral)] uppercase tracking-wider mb-3">
          About REEZ
        </p>
        <h1 className="text-4xl md:text-6xl font-serif italic leading-tight max-w-2xl">
          Wear Your Vibe, Own Your Style
        </h1>
        <p className="text-base text-[var(--color-neutral)] mt-6 max-w-xl leading-relaxed">
          REEZ was born from a simple idea to create a clothing brand for
          Bangladesh's young generation that never compromises on quality while
          keeping its prices affordable for everyone.
        </p>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="aspect-[4/3] rounded-3xl bg-[#F1F0EB] overflow-hidden">
            <img
              src="/about-story.jpg"
              alt="REEZ brand story"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl md:text-3xl font-serif italic">
              Our Story
            </h2>
            <p className="text-sm text-[var(--color-neutral)] leading-relaxed">
              What started as a small Facebook page has grown into REEZ, a
              thriving community-driven brand. From the very beginning, we've
              believed that fashion is more than just clothing it's an identity,
              a statement.
            </p>
            <p className="text-sm text-[var(--color-neutral)] leading-relaxed">
              Before designing every collection, we listen to our customers'
              feedback, follow current trends, and source the best quality
              materials from local fabric markets so the final product is truly
              worth it for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#F1F0EB] py-16 mt-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <h2 className="text-2xl md:text-3xl font-serif italic mb-10">
            What We Stand For
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
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
    </>
  );
}

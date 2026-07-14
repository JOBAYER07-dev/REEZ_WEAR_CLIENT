import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Target, Users, Leaf, Award } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    desc: 'Bangladesh-er tarunder jonno affordable price-e premium quality streetwear pouche deya, jekhane fashion ar comfort ekshathe pawa jay.',
  },
  {
    icon: Leaf,
    title: 'Quality First',
    desc: 'Prottek fabric hand-selected, prottek stitch quality-checked — amra compromise kori na product quality e.',
  },
  {
    icon: Users,
    title: 'Customer Centric',
    desc: '4.7K+ follower ar growing customer base amader kache proman je real feedback shune amra design ar service improve kori.',
  },
  {
    icon: Award,
    title: 'Authentic Design',
    desc: 'Kono copy-paste design na — REEZ-er prottek collection original concept theke toiri, local trend bujhe.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-12">
        <p className="text-sm font-medium text-[var(--color-neutral)] uppercase tracking-wider mb-3">
          About REEZ
        </p>
        <h1 className="text-4xl md:text-6xl font-serif italic leading-tight max-w-2xl">
          Wear Your Vibe, Own Your Style
        </h1>
        <p className="text-base text-[var(--color-neutral)] mt-6 max-w-xl leading-relaxed">
          REEZ shuru hoyeche ekটা shimple idea theke — Bangladesh-er young
          generation-er jonno emon clothing brand toiri kora jা quality-te
          compromise kore na, kিন্তু price-e sobar nagaler moddhe thake।
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
              Ekটা choto Facebook page theke shuru kore aaj REEZ ekটা growing
              community-r brand hoye uthেছে। Amra shuru theke bishash kori,
              fashion mane shudhu porar jinis na — eta ekটা identity, statement.
            </p>
            <p className="text-sm text-[var(--color-neutral)] leading-relaxed">
              Prottek collection design korার age amra amader customer der
              feedback shuni, current trend follow kori, ar local fabric market
              theke best quality material khunje ber kori — jate final product
              ta shobar jonno worth-it hoy।
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

      <Footer />
    </>
  );
}

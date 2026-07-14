'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    question: 'Delivery koto din somoy lage?',
    answer:
      'Dhaka-er vitor 24-48 ghontar moddhe ar Dhaka-er baire shara Bangladesh e 2-3 kormo dibosh somoy lage।',
  },
  {
    question: 'Size na milleo exchange kora jabe?',
    answer:
      'Ha, order paware 7 diner moddhe free exchange kora jay, product unused ar original tag soho thakte hobe।',
  },
  {
    question: 'Payment kivabe korবো?',
    answer:
      'Cash on Delivery, bKash, Nagad ar card payment — shob option available checkout page e।',
  },
  {
    question: 'Product original ki na kivabe bujbo?',
    answer:
      'REEZ-er shob product in-house quality check kore packaging হয়, ar order confirm er por invoice soho pathano hoy authenticity proof hishebe।',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10">
        {/* Left: Heading + CTA */}
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl md:text-4xl font-serif italic">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[var(--color-neutral)] leading-relaxed">
            Ar kono proshno thakle amader shathe jogajog koro, amra shobshomoy
            help korte ready।
          </p>

          <Link
            href="/contact"
            data-cursor-hover
            className="w-fit bg-[var(--color-accent)] text-black text-sm font-semibold rounded-full px-6 py-3 hover:opacity-90 transition-opacity"
          >
            Contact Support
          </Link>
        </div>

        {/* Right: Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="bg-white border border-black/5 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  data-cursor-hover
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium">{faq.question}</span>
                  <span className="shrink-0 w-7 h-7 rounded-full bg-[#F1F0EB] flex items-center justify-center">
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 text-sm text-[var(--color-neutral)] leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

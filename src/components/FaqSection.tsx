'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    question: 'How long does delivery take?',
    answer:
      'Delivery within Dhaka takes 24-48 hours, and for areas outside Dhaka, it takes 2-3 days.',
  },
  {
    question: 'Can I exchange a product if I receive the wrong size?',
    answer:
      'Yes, you can exchange a product for the correct size within 7 days of receiving your order, provided the product is unused and has its original tag attached.',
  },
  {
    question: 'How can I pay for my order?',
    answer:
      'You can pay for your order using various methods including credit/debit cards, mobile banking, and cash on delivery (COD) where available.',
  },
  {
    question: 'Are the products authentic?',
    answer:
      'Yes, we guarantee that all products sold on our platform are 100% authentic and sourced directly from authorized distributors and brands.',
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
            Have a question that&apos;s not answered here?{' '}
            <Link
              href="/contact"
              className="text-[var(--color-accent)] hover:underline"
            >
              Contact us
            </Link>
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

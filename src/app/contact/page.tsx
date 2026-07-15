'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-20">
        <p className="text-sm font-medium text-[var(--color-neutral)] uppercase tracking-wider mb-3">
          Contact Us
        </p>
        <h1 className="text-4xl md:text-6xl font-serif italic leading-tight max-w-2xl mb-4">
          We&apos;d Love to Hear From You
        </h1>
        <p className="text-base text-[var(--color-neutral)] max-w-xl leading-relaxed mb-12">
          If you have any questions about orders, exchanges, or anything else,
          send us a message we are always ready to respond.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10">
          {/* Left: Contact Info */}
          <div className="flex flex-col gap-5">
            <div className="bg-white border border-black/5 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-11 h-11 shrink-0 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">Our Location</h3>
                <p className="text-sm text-[var(--color-neutral)]">
                  Mogbazar, Dhaka, Bangladesh
                </p>
              </div>
            </div>

            <div className="bg-white border border-black/5 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-11 h-11 shrink-0 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">Call Us</h3>
                <p className="text-sm text-[var(--color-neutral)]">
                  +8801861961550
                </p>
              </div>
            </div>

            <div className="bg-white border border-black/5 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-11 h-11 shrink-0 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">Email Us</h3>
                <p className="text-sm text-[var(--color-neutral)]">
                  reezz.bd@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white border border-black/5 rounded-2xl p-6 sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center gap-3 py-12">
                <CheckCircle2
                  size={40}
                  className="text-[var(--color-accent)]"
                />
                <h3 className="font-semibold text-lg">Message Sent!</h3>
                <p className="text-sm text-[var(--color-neutral)]">
                  We will get in touch with you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="border border-black/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="border border-black/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    className="border border-black/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  data-cursor-hover
                  className="flex items-center justify-center gap-2 bg-[var(--color-accent)] text-black text-sm font-semibold rounded-full px-6 py-3.5 hover:opacity-90 transition-opacity"
                >
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

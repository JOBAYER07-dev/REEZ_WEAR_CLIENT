import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com', letter: 'f' },
  { name: 'Instagram', href: 'https://instagram.com', letter: 'i' },
  { name: 'Twitter', href: 'https://twitter.com', letter: 'x' },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-text)] text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-semibold mb-3">REEZ</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Wear Your Vibe modern men&apos;s fashion, crafted for everyday
              style o comfort.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map(social => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  data-cursor-hover
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold hover:bg-[var(--color-accent)] hover:text-black transition-colors"
                >
                  {social.letter}
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-white/80">
              Shop
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-white/60">
              <li>
                <Link
                  href="/shop"
                  className="hover:text-[var(--color-accent)] transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=shirts"
                  className="hover:text-[var(--color-accent)] transition-colors"
                >
                  Shirts
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=sneakers"
                  className="hover:text-[var(--color-accent)] transition-colors"
                >
                  Sneakers
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=accessories"
                  className="hover:text-[var(--color-accent)] transition-colors"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-white/80">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-white/60">
              <li>
                <Link
                  href="/about"
                  className="hover:text-[var(--color-accent)] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[var(--color-accent)] transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-[var(--color-accent)] transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="hover:text-[var(--color-accent)] transition-colors"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-white/80">
              Contact
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-white/60">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="shrink-0 mt-0.5" />
                <span>Mogbazar, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="shrink-0" />
                <a
                  href="tel:+8801861961550"
                  className="hover:text-[var(--color-accent)] transition-colors"
                >
                  +8801861961550
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="shrink-0" />
                <a
                  href="mailto:support@reez.com"
                  className="hover:text-[var(--color-accent)] transition-colors"
                >
                  reezz.bd@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} REEZ. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

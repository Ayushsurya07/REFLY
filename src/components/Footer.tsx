import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { FaInstagram } from "react-icons/fa";

const footerLinks = [
  { label: 'Collections', href: '/collections' },
  { label: 'About', href: '/#about' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Contact', href: '/contact' },
];

const socialLinks = [
 { label: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/refly_clothing__/?hl=en' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        {/* Arc Browser Split Pattern */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-0">
          {/* Left — Logo + Tagline */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <AppLogo
                src="/assets/images/6391F31B-6325-43A2-8883-0AEF80565846-1785440876904.png"
                size={32}
              />
              <span className="font-display font-bold text-lg tracking-[0.15em] uppercase text-foreground">
                Refly
              </span>
            </Link>
            <p className="text-sm text-muted-foreground font-body max-w-xs leading-relaxed">
              Premium men&apos;s bottom wear.<br />Crafted for those who move different.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-display font-semibold tracking-widest uppercase text-gold">
                Made with love in India by 1life's WEB 
              </span>
              <span className="text-muted-foreground text-xs">🇮🇳</span>
            </div>
          </div>

          {/* Right — Links */}
          <div className="flex flex-col gap-6">
            <nav className="flex flex-wrap gap-x-8 gap-y-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-display font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 tracking-wide uppercase animated-underline"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 flex items-center justify-center border border-border text-muted-foreground hover:text-gold hover:border-gold transition-all duration-200"
                >
                  <FaInstagram size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground font-body">
            © 2026 Refly. All rights reserved. GST: EPTPS22X0000X0X
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-muted-foreground font-body">UPI · Razorpay · COD</span>
            <span className="text-xs text-muted-foreground font-body">Ships across India 🚚</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
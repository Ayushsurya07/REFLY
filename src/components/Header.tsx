'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import CartDrawer from '@/components/CartDrawer';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
  { label: 'Collections', href: '/collections' },
  { label: 'Jeans', href: '/collections' },
  { label: 'Cargo', href: '/collections' },
  { label: 'Formal', href: '/collections' },
  { label: 'About', href: '/#about' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [profileOpen, setProfileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, signOut, loading } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setProfileOpen(false);
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const displayInitials = user
    ? (user?.user_metadata?.full_name || user?.email || 'U')
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '';

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b' :'bg-transparent'
        }`}
        style={scrolled ? {
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottomColor: 'rgba(139,26,26,0.3)',
        } : {}}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 z-10">
              <AppLogo
                src="/assets/images/6391F31B-6325-43A2-8883-0AEF80565846-1785440876904.png"
                size={36}
                className="flex-shrink-0"
              />
              <span
                className={`font-display font-bold text-xl tracking-[0.15em] uppercase transition-colors duration-300 ${
                  scrolled ? 'text-white' : 'text-white'
                }`}
              >
                Refly
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks?.map((link) => (
                <Link
                  key={link?.label}
                  href={link?.href}
                  className={`font-display text-xs font-semibold tracking-[0.15em] uppercase animated-underline transition-colors duration-300 ${
                    scrolled ? 'text-white/80 hover:text-gold' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link?.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button
                aria-label="Search"
                className={`hidden lg:flex w-10 h-10 items-center justify-center transition-colors duration-300 ${
                  scrolled ? 'text-white/80 hover:text-gold' : 'text-white/80 hover:text-white'
                }`}
              >
                <Icon name="MagnifyingGlassIcon" size={20} />
              </button>

              {/* Wishlist */}
              {user ? (
                <Link
                  href="/wishlist"
                  aria-label="Wishlist"
                  className={`hidden lg:flex w-10 h-10 items-center justify-center transition-colors duration-300 ${
                    scrolled ? 'text-white/80 hover:text-gold' : 'text-white/80 hover:text-white'
                  }`}
                >
                  <Icon name="HeartIcon" size={20} />
                </Link>
              ) : (
                <button
                  aria-label="Wishlist"
                  onClick={() => router.push('/login')}
                  className={`hidden lg:flex w-10 h-10 items-center justify-center transition-colors duration-300 ${
                    scrolled ? 'text-white/80 hover:text-gold' : 'text-white/80 hover:text-white'
                  }`}
                >
                  <Icon name="HeartIcon" size={20} />
                </button>
              )}

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                aria-label="Cart"
                className={`relative flex w-10 h-10 items-center justify-center transition-colors duration-300 ${
                  scrolled ? 'text-white/80 hover:text-gold' : 'text-white/80 hover:text-white'
                }`}
              >
                <Icon name="ShoppingBagIcon" size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-gold-foreground text-[10px] font-display font-bold flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Auth — Desktop */}
              {!loading && (
                <div className="hidden lg:block">
                  {user ? (
                    <div ref={profileRef} className="relative">
                      <button
                        onClick={() => setProfileOpen(!profileOpen)}
                        aria-label="Account"
                        className={`w-9 h-9 flex items-center justify-center font-display font-bold text-xs tracking-wide border transition-colors duration-300 ${
                          scrolled
                            ? 'border-white/40 text-white hover:border-gold hover:text-gold' :'border-white/40 text-white hover:border-gold hover:text-gold'
                        }`}
                      >
                        {displayInitials}
                      </button>
                      {profileOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-black border border-white/15 shadow-2xl z-50">
                          <div className="px-4 py-3 border-b border-white/10">
                            <p className="font-body text-xs text-white/40 truncate">{user?.email}</p>
                          </div>
                          <Link
                            href="/dashboard"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 font-display text-xs font-semibold tracking-wide text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            Dashboard
                          </Link>
                          <Link
                            href="/orders"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 font-display text-xs font-semibold tracking-wide text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            My Orders
                          </Link>
                          <Link
                            href="/wishlist"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 font-display text-xs font-semibold tracking-wide text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            Wishlist
                          </Link>
                          <div className="border-t border-white/10">
                            <button
                              onClick={handleSignOut}
                              className="w-full text-left flex items-center gap-3 px-4 py-3 font-display text-xs font-semibold tracking-wide text-white/40 hover:text-red-400 hover:bg-white/5 transition-colors"
                            >
                              Sign Out
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      className={`font-display text-xs font-semibold tracking-[0.12em] uppercase transition-colors duration-300 ${
                        scrolled ? 'text-white/80 hover:text-gold' : 'text-white/80 hover:text-white'
                      }`}
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              )}

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                className={`lg:hidden flex flex-col gap-1.5 w-10 h-10 items-center justify-center transition-colors duration-300 ${
                  scrolled || mobileOpen ? 'text-white' : 'text-white'
                }`}
              >
                {mobileOpen ? (
                  <Icon name="XMarkIcon" size={24} />
                ) : (
                  <>
                    <span className="w-6 h-px bg-current block transition-all duration-300" />
                    <span className="w-4 h-px bg-current block transition-all duration-300" />
                    <span className="w-6 h-px bg-current block transition-all duration-300" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Gold accent line */}
        <div className={`h-px transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
          <div className="h-full gold-gradient" />
        </div>
      </header>
      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="mobile-nav lg:hidden">
          <nav className="flex flex-col items-center gap-8">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="font-display text-2xl font-bold text-white tracking-[0.2em] uppercase hover:text-gold transition-colors"
            >
              Home
            </Link>
            {navLinks?.map((link) => (
              <Link
                key={link?.label}
                href={link?.href}
                onClick={() => setMobileOpen(false)}
                className="font-display text-2xl font-bold text-white/70 tracking-[0.2em] uppercase hover:text-white transition-colors"
              >
                {link?.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-2xl font-bold text-white/70 tracking-[0.2em] uppercase hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => { handleSignOut(); setMobileOpen(false); }}
                  className="font-display text-xl font-bold text-white/40 tracking-[0.2em] uppercase hover:text-red-400 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="font-display text-2xl font-bold text-gold tracking-[0.2em] uppercase hover:text-white transition-colors"
              >
                Sign In
              </Link>
            )}
          </nav>
          <div className="absolute bottom-12 flex gap-6">
            <button aria-label="Search" className="text-white/60 hover:text-gold transition-colors">
              <Icon name="MagnifyingGlassIcon" size={24} />
            </button>
            <button aria-label="Wishlist" onClick={() => { router.push(user ? '/wishlist' : '/login'); setMobileOpen(false); }} className="text-white/60 hover:text-gold transition-colors">
              <Icon name="HeartIcon" size={24} />
            </button>
            <button onClick={() => { setCartOpen(true); setMobileOpen(false); }} aria-label="Cart" className="text-white/60 hover:text-gold transition-colors">
              <Icon name="ShoppingBagIcon" size={24} />
            </button>
          </div>
        </div>
      )}
      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
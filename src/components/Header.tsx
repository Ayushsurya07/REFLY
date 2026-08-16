'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import CartDrawer from '@/components/CartDrawer';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { PRODUCTS_LIST } from '@/lib/productsData';
import AppImage from '@/components/ui/AppImage';

const desktopNavLinks = [
  { label: 'Collections', href: '/collections' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact' },
];

const mobileNavLinks = [
  { label: 'Collections', href: '/collections' },
  { label: 'Cargos', href: '/collections?category=cargos' },
  { label: 'Linen', href: '/collections?category=linen' },
  { label: 'Cotton Pants', href: '/collections?category=cotton-pants' },
  { label: 'Shorts', href: '/collections?category=shorts' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const headerRef = useRef<HTMLElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { user, signOut, loading } = useAuth();
  const { cartCount, cartOpen, setCartOpen } = useCart();

  const searchResults = searchQuery.trim()
    ? PRODUCTS_LIST.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(searchQuery.toLowerCase())) ||
          p.fit.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen || searchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen, searchOpen]);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md border-b shadow-lg ${
          scrolled ? 'bg-black/70 border-white/10' : 'bg-black/40 border-white/5'
        }`}
        style={{
          background: scrolled ? 'rgba(0,0,0,0.70)' : 'rgba(0,0,0,0.40)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottomColor: scrolled ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)',
        }}
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
                className={`font-display font-bold text-xl tracking-[0.15em] uppercase transition-colors duration-300 ${scrolled ? 'text-white' : 'text-white'
                  }`}
              >
                Refly
              </span>
            </Link>

            {/* Desktop Nav — Rendered ONLY on Home Page per user request */}
            {isHomePage && (
              <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
                {desktopNavLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-display text-xs font-semibold tracking-[0.15em] uppercase text-white/70 hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            )}

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button
                suppressHydrationWarning
                onClick={() => setSearchOpen(true)}
                aria-label="Search products"
                className={`hidden lg:flex w-10 h-10 items-center justify-center transition-colors duration-300 ${scrolled ? 'text-white/80 hover:text-gold' : 'text-white/80 hover:text-white'
                  }`}
              >
                <Icon name="MagnifyingGlassIcon" size={20} />
              </button>

              {/* Wishlist */}
              {user ? (
                <Link
                  href="/wishlist"
                  aria-label="View Wishlist"
                  className={`hidden lg:flex w-10 h-10 items-center justify-center transition-colors duration-300 ${scrolled ? 'text-white/80 hover:text-gold' : 'text-white/80 hover:text-white'
                    }`}
                >
                  <Icon name="HeartIcon" size={20} />
                </Link>
              ) : (
                <button
                  aria-label="View Wishlist"
                  onClick={() => router.push('/login')}
                  className={`hidden lg:flex w-10 h-10 items-center justify-center transition-colors duration-300 ${scrolled ? 'text-white/80 hover:text-gold' : 'text-white/80 hover:text-white'
                    }`}
                >
                  <Icon name="HeartIcon" size={20} />
                </button>
              )}

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                aria-label="View Cart"
                className={`relative flex w-10 h-10 items-center justify-center transition-colors duration-300 ${scrolled ? 'text-white/80 hover:text-gold' : 'text-white/80 hover:text-white'
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
                        aria-label="User Account Menu"
                        aria-expanded={profileOpen}
                        className={`w-9 h-9 flex items-center justify-center font-display font-bold text-xs tracking-wide border transition-colors duration-300 ${scrolled
                          ? 'border-white/40 text-white hover:border-gold hover:text-gold' : 'border-white/40 text-white hover:border-gold hover:text-gold'
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
                          <Link
                            href="/#about"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 font-display text-xs font-semibold tracking-wide text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            About Us
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
                      className={`font-display text-xs font-semibold tracking-[0.12em] uppercase transition-colors duration-300 ${scrolled ? 'text-white/80 hover:text-gold' : 'text-white/80 hover:text-white'
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
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
                className={`lg:hidden flex flex-col gap-1.5 w-10 h-10 items-center justify-center transition-colors duration-300 ${scrolled || mobileOpen ? 'text-white' : 'text-white'
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
        <div id="mobile-navigation" className="mobile-nav lg:hidden">
          <nav className="flex flex-col items-center gap-8">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="font-display text-2xl font-bold text-white tracking-[0.2em] uppercase hover:text-gold transition-colors"
            >
              Home
            </Link>
            {mobileNavLinks?.map((link) => (
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
            <button
              suppressHydrationWarning
              aria-label="Search"
              onClick={() => { setSearchOpen(true); setMobileOpen(false); }}
              className="text-white/60 hover:text-gold transition-colors"
            >
              <Icon name="MagnifyingGlassIcon" size={24} />
            </button>
            <button suppressHydrationWarning aria-label="Wishlist" onClick={() => { router.push(user ? '/wishlist' : '/login'); setMobileOpen(false); }} className="text-white/60 hover:text-gold transition-colors">
              <Icon name="HeartIcon" size={24} />
            </button>
            <button suppressHydrationWarning onClick={() => { setCartOpen(true); setMobileOpen(false); }} aria-label="Cart" className="text-white/60 hover:text-gold transition-colors">
              <Icon name="ShoppingBagIcon" size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Live Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex flex-col p-6 lg:p-12 overflow-hidden">
          <div className="flex items-center justify-between max-w-5xl mx-auto w-full mb-8">
            <span className="font-display text-xs font-semibold tracking-[0.3em] uppercase text-gold">
              Live Product Search
            </span>
            <button
              onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
              className="w-10 h-10 border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Icon name="XMarkIcon" size={24} />
            </button>
          </div>

          <div className="max-w-5xl mx-auto w-full">
            <div className="relative mb-8">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Cargos, Linen, Shorts, Chinos, Formal..."
                className="w-full bg-white/10 border-b-2 border-gold text-white text-xl lg:text-2xl px-4 py-4 focus:outline-none placeholder:text-white/40 font-display"
              />
              <Icon name="MagnifyingGlassIcon" size={24} className="absolute right-4 top-5 text-white/50" />
            </div>

            <div className="overflow-y-auto max-h-[65vh] pr-2 space-y-4">
              {searchQuery.trim() === '' ? (
                <div className="text-center py-12 text-white/40 font-body text-sm">
                  Start typing to find fits (e.g. &quot;Cargo&quot;, &quot;Linen&quot;, &quot;Shorts&quot;, &quot;Cotton&quot;)
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-12 text-white/50 font-display text-base">
                  No products matching &quot;{searchQuery}&quot; found.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                      className="flex items-center gap-4 bg-white/5 border border-white/10 p-3 hover:border-gold/50 hover:bg-white/10 transition-all group"
                    >
                      <div className="w-16 h-20 relative flex-shrink-0 bg-black/40 overflow-hidden">
                        <AppImage src={product.images[0]?.src || ''} alt={product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-display text-[10px] text-gold uppercase tracking-wider block mb-0.5">
                          {product.category} · {product.fit}
                        </span>
                        <h4 className="font-display font-semibold text-sm text-white truncate group-hover:text-gold transition-colors">
                          {product.name}
                        </h4>
                        <span className="font-display font-bold text-xs text-white/80 block mt-1">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
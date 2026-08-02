'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { createClient } from '@/lib/supabase/client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/account/reset-password`,
      });
      if (error) throw error;
      setSent(true);
    } catch (err: any) {
      setError(err?.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 lg:px-12 py-6">
        <Link href="/" className="flex items-center gap-3">
          <AppLogo
            src="/assets/images/6391F31B-6325-43A2-8883-0AEF80565846-1785440876904.png"
            size={32}
          />
          <span className="font-display font-bold text-lg tracking-[0.15em] uppercase text-white">
            Refly
          </span>
        </Link>
        <Link
          href="/login"
          className="font-display text-xs font-semibold tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors"
        >
          Back to Sign In
        </Link>
      </div>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 border border-gold/40 flex items-center justify-center mx-auto mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8A96A" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h2 className="font-display font-bold text-2xl text-white mb-3">Check your inbox.</h2>
              <p className="font-body text-sm text-white/50 mb-8">
                We&apos;ve sent a password reset link to{' '}
                <span className="text-white">{email}</span>. Check your spam folder if you don&apos;t see it.
              </p>
              <Link
                href="/login"
                className="inline-block px-8 py-3 border border-white/20 text-white font-display text-xs font-semibold tracking-[0.15em] uppercase hover:border-gold hover:text-gold transition-colors"
              >
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <h1 className="font-display font-bold text-3xl lg:text-4xl text-white tracking-tight mb-2">
                  Reset password.
                </h1>
                <p className="font-body text-sm text-white/50">
                  Enter your email and we&apos;ll send you a reset link.
                </p>
              </div>

              {error && (
                <div className="mb-6 px-4 py-3 border border-red-500/30 bg-red-500/10 text-red-400 font-body text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <label className="block font-display text-xs font-semibold tracking-[0.1em] uppercase text-white/60 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full bg-white/5 border border-white/15 text-white font-body text-sm px-4 py-3.5 placeholder:text-white/25 focus:outline-none focus:border-gold/60 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-white text-black font-display text-xs font-bold tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : null}
                  Send Reset Link
                </button>
              </form>

              <p className="mt-8 text-center font-body text-sm text-white/40">
                Remember your password?{' '}
                <Link href="/login" className="text-white hover:text-gold transition-colors">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

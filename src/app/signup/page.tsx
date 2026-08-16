'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AppLogo from '@/components/ui/AppLogo';
import { createClient } from '@/lib/supabase/client';

export default function SignupPage() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    try {
      await signUp(email, password, { fullName });
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err?.message || 'Could not create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    setError('');
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
          skipBrowserRedirect: true,
        },
      });

      if (error) throw error;

      if (data?.url) {
        // Pre-check the OAuth endpoint before browser redirection to catch unsupported provider error gracefully
        try {
          const res = await fetch(data.url);
          if (!res.ok) {
            const json = await res.json().catch(() => ({}));
            if (res.status === 400 || json?.error_code === 'validation_failed' || json?.msg?.includes('not enabled')) {
              setError('Google Sign-In is not enabled on this Supabase project. Please create your account with email and password.');
              setGoogleLoading(false);
              return;
            }
          }
        } catch {
          // CORS or redirect response means valid OAuth URL endpoint — proceed to navigate
        }
        window.location.href = data.url;
      } else {
        throw new Error('Could not generate Google signup URL.');
      }
    } catch (err: any) {
      const errMsg = err?.message || JSON.stringify(err);
      if (errMsg.includes('validation_failed') || errMsg.includes('Unsupported provider') || errMsg.includes('not enabled')) {
        setError('Google Sign-In is not enabled on this Supabase project. Please create your account with email and password.');
      } else {
        setError(err?.message || 'Google sign-up failed. Please try again.');
      }
      setGoogleLoading(false);
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
          Sign In
        </Link>
      </div>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Title */}
          <div className="mb-10">
            <h1 className="font-display font-bold text-3xl lg:text-4xl text-white tracking-tight mb-2">
              Join Refly.
            </h1>
            <p className="font-body text-sm text-white/50">
              Create your account to track orders, save your wishlist, and more.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 px-4 py-3 border border-red-500/30 bg-red-500/10 text-red-400 font-body text-sm">
              {error}
            </div>
          )}

          {/* Google OAuth */}
          <button
            onClick={handleGoogleSignup}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 border border-white/20 text-white font-display text-xs font-semibold tracking-[0.1em] uppercase hover:border-white/40 hover:bg-white/5 transition-all duration-300 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {googleLoading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
            )}
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="font-body text-xs text-white/30 tracking-widest uppercase">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block font-display text-xs font-semibold tracking-[0.1em] uppercase text-white/60 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Your full name"
                className="w-full bg-white/5 border border-white/15 text-white font-body text-sm px-4 py-3.5 placeholder:text-white/25 focus:outline-none focus:border-gold/60 transition-colors"
              />
            </div>

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

            <div>
              <label className="block font-display text-xs font-semibold tracking-[0.1em] uppercase text-white/60 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Min. 8 characters"
                  className="w-full bg-white/5 border border-white/15 text-white font-body text-sm px-4 py-3.5 pr-12 placeholder:text-white/25 focus:outline-none focus:border-gold/60 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {showPassword ? (
                      <>
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </>
                    ) : (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full py-4 bg-white text-black font-display text-xs font-bold tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300 mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : null}
              Create Account
            </button>
          </form>

          <p className="mt-8 text-center font-body text-sm text-white/40">
            Already have an account?{' '}
            <Link href="/login" className="text-white hover:text-gold transition-colors">
              Sign in
            </Link>
          </p>

          <p className="mt-4 text-center font-body text-xs text-white/25">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-white/50 transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline hover:text-white/50 transition-colors">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

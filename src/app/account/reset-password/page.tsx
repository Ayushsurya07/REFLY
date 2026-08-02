'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import AppLogo from '@/components/ui/AppLogo';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    // Check if we have a valid recovery session
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSessionReady(true);
      } else {
        // No session — redirect to forgot password
        router.replace('/forgot-password?error=invalid_link');
      }
    });
  }, [router]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setSuccess(true);
      // Redirect to login after 3 seconds
      setTimeout(() => router.push('/login'), 3000);
    } catch (err: any) {
      setError(err?.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!sessionReady) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <span className="w-8 h-8 border-2 border-white/20 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      {success ? (
        <div className="text-center">
          <div className="w-16 h-16 border border-gold/40 flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8A96A" strokeWidth="1.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="font-display font-bold text-2xl text-white mb-3">Password updated.</h2>
          <p className="font-body text-sm text-white/50 mb-8">
            Your password has been reset successfully. Redirecting you to sign in…
          </p>
          <Link
            href="/login"
            className="inline-block px-8 py-3 border border-white/20 text-white font-display text-xs font-semibold tracking-[0.15em] uppercase hover:border-gold hover:text-gold transition-colors"
          >
            Sign In Now
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-10">
            <h1 className="font-display font-bold text-3xl lg:text-4xl text-white tracking-tight mb-2">
              New password.
            </h1>
            <p className="font-body text-sm text-white/50">
              Choose a strong password for your Refly account.
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
                New Password
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

            <div>
              <label className="block font-display text-xs font-semibold tracking-[0.1em] uppercase text-white/60 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Re-enter your password"
                  className="w-full bg-white/5 border border-white/15 text-white font-body text-sm px-4 py-3.5 pr-12 placeholder:text-white/25 focus:outline-none focus:border-gold/60 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {showConfirm ? (
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

            {/* Password strength indicator */}
            {password.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((level) => {
                    const strength = password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password) ? 4
                      : password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password) ? 3
                      : password.length >= 8 ? 2
                      : 1;
                    return (
                      <div
                        key={level}
                        className={`h-1 flex-1 transition-colors duration-300 ${
                          level <= strength
                            ? strength === 1 ? 'bg-red-500'
                              : strength === 2 ? 'bg-yellow-500'
                              : strength === 3 ? 'bg-blue-400' :'bg-green-400' :'bg-white/10'
                        }`}
                      />
                    );
                  })}
                </div>
                <p className="font-body text-xs text-white/30">
                  {password.length < 8 ? 'Too short' : password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password) ? 'Strong password' : password.length >= 10 && /[A-Z]/.test(password) ? 'Good password' : 'Acceptable — add uppercase, numbers, or symbols for stronger security'}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-white text-black font-display text-xs font-bold tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-300 mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : null}
              Update Password
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
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
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <Suspense fallback={
          <div className="flex items-center justify-center">
            <span className="w-8 h-8 border-2 border-white/20 border-t-gold rounded-full animate-spin" />
          </div>
        }>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { createClient } from '@/lib/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ─── Types ────────────────────────────────────────────────────────────────────

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
}

interface OrderItem {
  id: string;
  product_name: string;
  variant: string | null;
  size: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  image_url: string | null;
}

interface Order {
  id: string;
  order_number: string;
  order_status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  total_amount: number;
  shipping_method: string;
  created_at: string;
  order_items: OrderItem[];
}

interface WishlistItem {
  id: string;
  product_id: string;
  product_name: string;
  product_price: number;
  product_mrp: number;
  image_url: string | null;
  variant: string | null;
  created_at: string;
}

// ─── Status helpers ───────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { label: string; color: string; step: number }> = {
  pending:    { label: 'Pending',    color: 'text-yellow-400 border-yellow-400/40 bg-yellow-400/10',  step: 0 },
  confirmed:  { label: 'Confirmed',  color: 'text-blue-400 border-blue-400/40 bg-blue-400/10',        step: 1 },
  processing: { label: 'Processing', color: 'text-purple-400 border-purple-400/40 bg-purple-400/10',  step: 2 },
  shipped:    { label: 'Shipped',    color: 'text-gold border-gold/40 bg-gold/10',                    step: 3 },
  delivered:  { label: 'Delivered',  color: 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10', step: 4 },
  cancelled:  { label: 'Cancelled',  color: 'text-red-400 border-red-400/40 bg-red-400/10',           step: -1 },
  refunded:   { label: 'Refunded',   color: 'text-orange-400 border-orange-400/40 bg-orange-400/10',  step: -1 },
};

const TRACKING_STEPS = ['Confirmed', 'Processing', 'Shipped', 'Delivered'];

function getDeliveryEstimate(order: Order): string {
  const created = new Date(order.created_at);
  const days = order.shipping_method === 'express' ? 3 : order.shipping_method === 'overnight' ? 1 : 7;
  const est = new Date(created.getTime() + days * 24 * 60 * 60 * 1000);
  return est.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ─── Tab types ────────────────────────────────────────────────────────────────
type Tab = 'overview' | 'orders' | 'wishlist' | 'settings';

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { addToast } = useToast();
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const supabase = React.useMemo(() => createClient(), []);

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileForm, setProfileForm] = useState({ full_name: '', phone: '' });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);
  const [cancelModalOrder, setCancelModalOrder] = useState<Order | null>(null);

  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [wishlistLoading, setWishlistLoading] = useState(true);
  const [removingWishlist, setRemovingWishlist] = useState<string | null>(null);

  const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' });
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNextPass, setShowNextPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  // ── Fetch profile ──────────────────────────────────────────────────────────
  const fetchProfile = useCallback(async () => {
    if (!user) return;
    setProfileLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code === 'PGRST116') {
        const newProfile = {
          id: user.id,
          email: user.email || '',
          full_name: user.user_metadata?.full_name || '',
          phone: null,
          avatar_url: user.user_metadata?.avatar_url || null,
        };
        const { data: created } = await supabase
          .from('user_profiles')
          .insert(newProfile)
          .select()
          .single();
        if (created) {
          setProfile(created);
          setProfileForm({ full_name: created.full_name || '', phone: created.phone || '' });
        }
      } else if (data) {
        setProfile(data);
        setProfileForm({ full_name: data.full_name || '', phone: data.phone || '' });
      }
    } catch { /* silent */ }
    finally { setProfileLoading(false); }
  }, [user, supabase]);

  // ── Fetch orders ───────────────────────────────────────────────────────────
  const fetchOrders = useCallback(async () => {
    if (!user) return;
    setOrdersLoading(true);
    try {
      const { data } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setOrders((data as Order[]) || []);
    } catch { /* silent */ }
    finally { setOrdersLoading(false); }
  }, [user, supabase]);

  // ── Fetch wishlist ─────────────────────────────────────────────────────────
  const fetchWishlist = useCallback(async () => {
    if (!user) return;
    setWishlistLoading(true);
    try {
      const { data } = await supabase
        .from('wishlist')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setWishlist(data || []);
    } catch { /* silent */ }
    finally { setWishlistLoading(false); }
  }, [user, supabase]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchOrders();
      fetchWishlist();
    }
  }, [user, fetchProfile, fetchOrders, fetchWishlist]);

  // ── Save profile ───────────────────────────────────────────────────────────
  // ── Save profile ───────────────────────────────────────────────────────────
  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setProfileSaving(true);
    setProfileMsg(null);
    try {
      const { error } = await supabase.from('user_profiles').upsert({
        id: user.id,
        email: user.email || '',
        full_name: profileForm.full_name,
        phone: profileForm.phone || null,
      });
      if (error) throw error;
      setProfileMsg({ type: 'success', text: 'Profile updated successfully.' });
      addToast('Profile updated successfully', 'success');
      fetchProfile();
    } catch (err: any) {
      const msg = err?.message || 'Failed to update profile.';
      setProfileMsg({ type: 'error', text: msg });
      addToast(msg, 'error');
    } finally {
      setProfileSaving(false);
    }
  };

  // ── Change password (Secure with current password verification) ────────────
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) {
      setPasswordMsg({ type: 'error', text: 'Your session has expired. Please sign in again.' });
      return;
    }
    if (!passwordForm.current) {
      setPasswordMsg({ type: 'error', text: 'Current password is required.' });
      return;
    }
    if (passwordForm.next.length < 6) {
      setPasswordMsg({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }
    if (passwordForm.next === passwordForm.current) {
      setPasswordMsg({ type: 'error', text: 'New password cannot be identical to current password.' });
      return;
    }
    if (passwordForm.next !== passwordForm.confirm) {
      setPasswordMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    setPasswordSaving(true);
    setPasswordMsg(null);
    try {
      // Reauthenticate user with current password
      const { error: authErr } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: passwordForm.current,
      });

      if (authErr) {
        const msg = authErr.message?.includes('Invalid login credentials')
          ? 'Current password is incorrect.'
          : authErr.message || 'Current password is incorrect.';
        setPasswordMsg({ type: 'error', text: msg });
        addToast(msg, 'error');
        setPasswordSaving(false);
        return;
      }

      // Update password
      const { error: updateErr } = await supabase.auth.updateUser({ password: passwordForm.next });
      if (updateErr) throw updateErr;

      setPasswordMsg({ type: 'success', text: 'Password updated successfully.' });
      addToast('Password updated successfully', 'success');
      setPasswordForm({ current: '', next: '', confirm: '' });
    } catch (err: any) {
      const msg = err?.message || 'Failed to update password. Please try again.';
      setPasswordMsg({ type: 'error', text: msg });
      addToast(msg, 'error');
    } finally {
      setPasswordSaving(false);
    }
  };

  // ── Remove wishlist item ───────────────────────────────────────────────────
  const handleRemoveWishlist = async (id: string) => {
    setRemovingWishlist(id);
    try {
      await supabase.from('wishlist').delete().eq('id', id);
      setWishlist((prev) => prev.filter((w) => w.id !== id));
      addToast('Item removed from wishlist', 'info');
    } catch {
      addToast('Failed to remove item from wishlist', 'error');
    } finally {
      setRemovingWishlist(null);
    }
  };

  // ── Cancel Order ───────────────────────────────────────────────────────────
  const handleCancelOrder = async (orderId: string) => {
    if (!user) return;
    setCancellingOrderId(orderId);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ order_status: 'cancelled' })
        .eq('id', orderId)
        .eq('user_id', user.id);

      if (error) throw error;
      addToast('Order cancelled successfully', 'info');
      setCancelModalOrder(null);
      fetchOrders();
    } catch (err: any) {
      addToast(err?.message || 'Failed to cancel order. Please try again.', 'error');
    } finally {
      setCancellingOrderId(null);
    }
  };

  // ── Sign out ───────────────────────────────────────────────────────────────
  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <span className="w-8 h-8 border-2 border-white/20 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Member';
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'overview', label: 'Overview',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>,
    },
    {
      id: 'orders', label: 'Orders',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>,
    },
    {
      id: 'wishlist', label: 'Wishlist',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>,
    },
    {
      id: 'settings', label: 'Settings',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-20 pb-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">

          {/* ── Profile Header ── */}
          <div className="pt-10 pb-8 border-b border-white/8">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                <span className="font-display font-bold text-xl text-gold">{initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-xs text-white/40 tracking-widest uppercase mb-0.5">Welcome back</p>
                <h1 className="font-display font-bold text-2xl text-white truncate">{displayName}</h1>
                <p className="font-body text-xs text-white/40 mt-0.5 truncate">{user?.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="hidden sm:flex items-center gap-2 px-4 py-2 border border-white/10 text-white/40 font-display text-xs font-semibold tracking-[0.12em] uppercase hover:border-red-500/40 hover:text-red-400 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                Sign Out
              </button>
            </div>
          </div>

          {/* ── Tabs ── */}
          <div className="flex items-center gap-1 mt-6 mb-8 border-b border-white/8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 font-display text-xs font-semibold tracking-[0.12em] uppercase whitespace-nowrap border-b-2 transition-all duration-200 -mb-px ${
                  activeTab === tab.id
                    ? 'border-gold text-gold' :'border-transparent text-white/40 hover:text-white/70'
                }`}
              >
                {tab.icon}
                {tab.label}
                {tab.id === 'orders' && orders.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-gold/20 text-gold text-[10px] font-bold rounded-sm">{orders.length}</span>
                )}
                {tab.id === 'wishlist' && wishlist.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-white/10 text-white/50 text-[10px] font-bold rounded-sm">{wishlist.length}</span>
                )}
              </button>
            ))}
          </div>

          {/* ══════════════════════════════════════════════════════════════════ */}
          {/* OVERVIEW TAB */}
          {/* ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Total Orders', value: orders.length, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /></svg> },
                  { label: 'Delivered', value: orders.filter(o => o.order_status === 'delivered').length, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="20 6 9 17 4 12" /></svg> },
                  { label: 'In Transit', value: orders.filter(o => ['confirmed','processing','shipped'].includes(o.order_status)).length, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg> },
                  { label: 'Wishlist', value: wishlist.length, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg> },
                ].map((stat) => (
                  <div key={stat.label} className="border border-white/10 p-5 bg-white/[0.01]">
                    <div className="text-white/30 mb-3">{stat.icon}</div>
                    <p className="font-display font-bold text-2xl text-white">{stat.value}</p>
                    <p className="font-body text-xs text-white/40 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent orders */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-semibold text-sm tracking-[0.15em] uppercase text-white/60">Recent Orders</h2>
                  <button onClick={() => setActiveTab('orders')} className="font-body text-xs text-gold/70 hover:text-gold transition-colors">View all →</button>
                </div>
                {ordersLoading ? (
                  <div className="flex items-center justify-center py-10"><span className="w-6 h-6 border-2 border-white/20 border-t-gold rounded-full animate-spin" /></div>
                ) : orders.length === 0 ? (
                  <div className="border border-white/8 p-8 text-center">
                    <p className="font-body text-sm text-white/30 mb-3">No orders yet.</p>
                    <Link href="/collections" className="font-display text-xs font-semibold tracking-[0.12em] uppercase text-gold/70 hover:text-gold transition-colors">Start Shopping →</Link>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {orders.slice(0, 3).map((order) => {
                      const cfg = STATUS_CONFIG[order.order_status] || STATUS_CONFIG.pending;
                      return (
                        <div key={order.id} className="flex items-center justify-between border border-white/8 px-5 py-4 hover:border-white/15 transition-colors">
                          <div>
                            <p className="font-display font-semibold text-sm text-white">#{order.order_number}</p>
                            <p className="font-body text-xs text-white/40 mt-0.5">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`px-2.5 py-1 border font-display text-[10px] font-semibold tracking-widest uppercase ${cfg.color}`}>{cfg.label}</span>
                            <p className="font-display font-semibold text-sm text-white hidden sm:block">₹{Number(order.total_amount).toLocaleString('en-IN')}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Quick links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <Link href="/account/profile" className="group flex items-center gap-4 border border-white/10 hover:border-gold/30 p-5 transition-all duration-300">
                  <div className="text-white/30 group-hover:text-gold transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  </div>
                  <div>
                    <p className="font-display font-semibold text-sm text-white group-hover:text-gold transition-colors">Profile & Addresses</p>
                    <p className="font-body text-xs text-white/40 mt-0.5">Manage personal info & delivery addresses</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto text-white/20 group-hover:text-gold/60 transition-colors"><polyline points="9 18 15 12 9 6" /></svg>
                </Link>
                <Link href="/collections" className="group flex items-center gap-4 border border-white/10 hover:border-gold/30 p-5 transition-all duration-300">
                  <div className="text-white/30 group-hover:text-gold transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                  </div>
                  <div>
                    <p className="font-display font-semibold text-sm text-white group-hover:text-gold transition-colors">Browse Collections</p>
                    <p className="font-body text-xs text-white/40 mt-0.5">Explore our latest arrivals</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto text-white/20 group-hover:text-gold/60 transition-colors"><polyline points="9 18 15 12 9 6" /></svg>
                </Link>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════ */}
          {/* ORDERS TAB */}
          {/* ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'orders' && (
            <div>
              {ordersLoading ? (
                <div className="flex items-center justify-center py-20"><span className="w-8 h-8 border-2 border-white/20 border-t-gold rounded-full animate-spin" /></div>
              ) : orders.length === 0 ? (
                <div className="border border-white/8 p-16 text-center">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center mx-auto mb-5">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/30"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                  </div>
                  <p className="font-body text-sm text-white/30 mb-4">No orders placed yet.</p>
                  <Link href="/collections" className="font-display text-xs font-semibold tracking-[0.15em] uppercase text-gold/70 hover:text-gold transition-colors">Explore Collections →</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => {
                    const cfg = STATUS_CONFIG[order.order_status] || STATUS_CONFIG.pending;
                    const isExpanded = expandedOrder === order.id;
                    const step = cfg.step;
                    const isActive = step >= 0;

                    return (
                      <div key={order.id} className="border border-white/10 overflow-hidden">
                        {/* Order header */}
                        <button
                          onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                          className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors text-left"
                        >
                          <div className="flex items-center gap-4 min-w-0">
                            <div className="min-w-0">
                              <p className="font-display font-semibold text-sm text-white">#{order.order_number}</p>
                              <p className="font-body text-xs text-white/40 mt-0.5">
                                {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                {' · '}{order.order_items?.length || 0} item{(order.order_items?.length || 0) !== 1 ? 's' : ''}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 flex-shrink-0">
                            <span className={`px-2.5 py-1 border font-display text-[10px] font-semibold tracking-widest uppercase ${cfg.color}`}>{cfg.label}</span>
                            <p className="font-display font-semibold text-sm text-white hidden sm:block">₹{Number(order.total_amount).toLocaleString('en-IN')}</p>
                            <svg
                              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                              className={`text-white/30 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </div>
                        </button>

                        {/* Expanded details */}
                        {isExpanded && (
                          <div className="border-t border-white/8 px-5 py-5 space-y-5">
                            {/* Tracking steps */}
                            {isActive && (
                              <div>
                                <p className="font-body text-xs text-white/40 tracking-widest uppercase mb-4">Order Tracking</p>
                                <div className="flex items-center gap-0">
                                  {TRACKING_STEPS.map((s, i) => {
                                    const done = step > i;
                                    const current = step === i + 1;
                                    return (
                                      <React.Fragment key={s}>
                                        <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                                          <div className={`w-7 h-7 flex items-center justify-center border transition-colors ${
                                            done ? 'border-emerald-400/60 bg-emerald-400/15' : current ?'border-gold/60 bg-gold/15': 'border-white/15 bg-transparent'
                                          }`}>
                                            {done ? (
                                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-400"><polyline points="20 6 9 17 4 12" /></svg>
                                            ) : (
                                              <span className={`w-2 h-2 rounded-full ${current ? 'bg-gold' : 'bg-white/20'}`} />
                                            )}
                                          </div>
                                          <p className={`font-body text-[10px] tracking-wide ${done || current ? 'text-white/60' : 'text-white/25'}`}>{s}</p>
                                        </div>
                                        {i < TRACKING_STEPS.length - 1 && (
                                          <div className={`flex-1 h-px mx-1 mb-5 ${done ? 'bg-emerald-400/40' : 'bg-white/10'}`} />
                                        )}
                                      </React.Fragment>
                                    );
                                  })}
                                </div>
                                {order.order_status !== 'delivered' && (
                                  <p className="font-body text-xs text-white/40 mt-3">
                                    Estimated delivery: <span className="text-gold/80">{getDeliveryEstimate(order)}</span>
                                  </p>
                                )}
                              </div>
                            )}

                            {/* Order items */}
                            {order.order_items && order.order_items.length > 0 && (
                              <div>
                                <p className="font-body text-xs text-white/40 tracking-widest uppercase mb-3">Items</p>
                                <div className="space-y-3">
                                  {order.order_items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4">
                                      <div className="w-14 h-14 bg-white/5 border border-white/10 flex-shrink-0 overflow-hidden">
                                        {item.image_url ? (
                                          <img src={item.image_url} alt={item.product_name} className="w-full h-full object-cover" />
                                        ) : (
                                          <div className="w-full h-full flex items-center justify-center">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/20"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                                          </div>
                                        )}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="font-display font-semibold text-sm text-white truncate">{item.product_name}</p>
                                        <p className="font-body text-xs text-white/40 mt-0.5">
                                          {[item.variant, item.size && `Size: ${item.size}`, `Qty: ${item.quantity}`].filter(Boolean).join(' · ')}
                                        </p>
                                      </div>
                                      <p className="font-display font-semibold text-sm text-white flex-shrink-0">₹{Number(item.total_price).toLocaleString('en-IN')}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Order total & actions */}
                            <div className="border-t border-white/8 pt-4 flex items-center justify-between">
                              <div>
                                <p className="font-body text-xs text-white/40">Order Total</p>
                                <p className="font-display font-bold text-base text-white">₹{Number(order.total_amount).toLocaleString('en-IN')}</p>
                              </div>
                              {['pending', 'confirmed'].includes(order.order_status) && (
                                <button
                                  onClick={() => setCancelModalOrder(order)}
                                  disabled={cancellingOrderId === order.id}
                                  className="px-4 py-2 border border-red-500/30 text-red-400 font-display text-xs font-semibold tracking-wider uppercase hover:bg-red-500/10 transition-colors disabled:opacity-50 flex items-center gap-1.5"
                                >
                                  {cancellingOrderId === order.id && (
                                    <span className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin" />
                                  )}
                                  Cancel Order
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════ */}
          {/* WISHLIST TAB */}
          {/* ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'wishlist' && (
            <div>
              {wishlistLoading ? (
                <div className="flex items-center justify-center py-20"><span className="w-8 h-8 border-2 border-white/20 border-t-gold rounded-full animate-spin" /></div>
              ) : wishlist.length === 0 ? (
                <div className="border border-white/8 p-16 text-center">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center mx-auto mb-5">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/30"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                  </div>
                  <p className="font-body text-sm text-white/30 mb-4">Your wishlist is empty.</p>
                  <Link href="/collections" className="font-display text-xs font-semibold tracking-[0.15em] uppercase text-gold/70 hover:text-gold transition-colors">Discover Products →</Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlist.map((item) => (
                    <div key={item.id} className="group border border-white/10 hover:border-white/20 transition-colors overflow-hidden">
                      <div className="aspect-[3/4] bg-white/5 overflow-hidden relative">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.product_name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/15"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                          </div>
                        )}
                        <button
                          onClick={() => handleRemoveWishlist(item.id)}
                          disabled={removingWishlist === item.id}
                          className="absolute top-3 right-3 w-8 h-8 bg-black/70 border border-white/20 flex items-center justify-center text-white/50 hover:text-red-400 hover:border-red-400/40 transition-colors disabled:opacity-40"
                          aria-label="Remove from wishlist"
                        >
                          {removingWishlist === item.id ? (
                            <span className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                          )}
                        </button>
                      </div>
                      <div className="p-4">
                        <p className="font-display font-semibold text-sm text-white truncate">{item.product_name}</p>
                        {item.variant && <p className="font-body text-xs text-white/40 mt-0.5">{item.variant}</p>}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="font-display font-bold text-sm text-white">₹{Number(item.product_price).toLocaleString('en-IN')}</span>
                          {item.product_mrp > item.product_price && (
                            <span className="font-body text-xs text-white/30 line-through">₹{Number(item.product_mrp).toLocaleString('en-IN')}</span>
                          )}
                        </div>
                        <Link
                          href={`/products/${item.product_id}`}
                          className="mt-3 w-full py-2.5 border border-white/15 text-white/70 font-display text-xs font-semibold tracking-[0.12em] uppercase text-center hover:border-gold/40 hover:text-gold transition-colors block"
                        >
                          View Product
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════ */}
          {/* SETTINGS TAB */}
          {/* ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'settings' && (
            <div className="space-y-10 max-w-xl">
              {/* Profile info */}
              <section>
                <h2 className="font-display font-semibold text-sm tracking-[0.15em] uppercase text-white/60 mb-6">Personal Information</h2>
                <form onSubmit={handleProfileSave} className="space-y-5">
                  <div>
                    <label className="block font-body text-xs text-white/40 tracking-widest uppercase mb-2">Email Address</label>
                    <div className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 font-body text-sm text-white/40 cursor-not-allowed select-none">{user?.email}</div>
                    <p className="font-body text-xs text-white/25 mt-1.5">Email cannot be changed here.</p>
                  </div>
                  <div>
                    <label className="block font-body text-xs text-white/40 tracking-widest uppercase mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.full_name}
                      onChange={(e) => setProfileForm((p) => ({ ...p, full_name: e.target.value }))}
                      placeholder="Your full name"
                      className="w-full bg-transparent border border-white/15 px-4 py-3 font-body text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs text-white/40 tracking-widest uppercase mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={profileForm.phone || ''}
                      onChange={(e) => setProfileForm((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="+91 7760775621"
                      className="w-full bg-transparent border border-white/15 px-4 py-3 font-body text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold/50 transition-colors"
                    />
                  </div>
                  {profileMsg && (
                    <p className={`font-body text-xs ${profileMsg.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>{profileMsg.text}</p>
                  )}
                  <button
                    type="submit"
                    disabled={profileSaving}
                    className="px-8 py-3 bg-gold/10 border border-gold/40 text-gold font-display text-xs font-semibold tracking-[0.15em] uppercase hover:bg-gold/20 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {profileSaving && <span className="w-3.5 h-3.5 border border-gold/40 border-t-gold rounded-full animate-spin" />}
                    {profileSaving ? 'Saving…' : 'Save Changes'}
                  </button>
                </form>
              </section>

              <div className="h-px bg-white/8" />

              {/* Change password */}
              <section>
                <h2 className="font-display font-semibold text-sm tracking-[0.15em] uppercase text-white/60 mb-6">Change Password</h2>
                <form onSubmit={handlePasswordChange} className="space-y-5">
                  <div>
                    <label htmlFor="current-pass-input" className="block font-body text-xs text-white/40 tracking-widest uppercase mb-2">
                      Current Password *
                    </label>
                    <div className="relative">
                      <input
                        id="current-pass-input"
                        type={showCurrentPass ? 'text' : 'password'}
                        required
                        value={passwordForm.current}
                        onChange={(e) => setPasswordForm((p) => ({ ...p, current: e.target.value }))}
                        placeholder="Your existing password"
                        className="w-full bg-transparent border border-white/15 px-4 py-3 pr-12 font-body text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                        aria-label={showCurrentPass ? "Hide current password" : "Show current password"}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          {showCurrentPass ? (
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
                    <label htmlFor="new-pass-input" className="block font-body text-xs text-white/40 tracking-widest uppercase mb-2">
                      New Password *
                    </label>
                    <div className="relative">
                      <input
                        id="new-pass-input"
                        type={showNextPass ? 'text' : 'password'}
                        required
                        value={passwordForm.next}
                        onChange={(e) => setPasswordForm((p) => ({ ...p, next: e.target.value }))}
                        placeholder="Min. 6 characters"
                        className="w-full bg-transparent border border-white/15 px-4 py-3 pr-12 font-body text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNextPass(!showNextPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                        aria-label={showNextPass ? "Hide new password" : "Show new password"}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          {showNextPass ? (
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
                    <label htmlFor="confirm-pass-input" className="block font-body text-xs text-white/40 tracking-widest uppercase mb-2">
                      Confirm New Password *
                    </label>
                    <div className="relative">
                      <input
                        id="confirm-pass-input"
                        type={showConfirmPass ? 'text' : 'password'}
                        required
                        value={passwordForm.confirm}
                        onChange={(e) => setPasswordForm((p) => ({ ...p, confirm: e.target.value }))}
                        placeholder="Repeat new password"
                        className="w-full bg-transparent border border-white/15 px-4 py-3 pr-12 font-body text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                        aria-label={showConfirmPass ? "Hide confirm password" : "Show confirm password"}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          {showConfirmPass ? (
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

                  {passwordMsg && (
                    <p className={`font-body text-xs ${passwordMsg.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>{passwordMsg.text}</p>
                  )}
                  <button
                    type="submit"
                    disabled={passwordSaving}
                    className="px-8 py-3 bg-white/5 border border-white/15 text-white font-display text-xs font-semibold tracking-[0.15em] uppercase hover:border-gold/40 hover:text-gold transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {passwordSaving && <span className="w-3.5 h-3.5 border border-white/30 border-t-white rounded-full animate-spin" />}
                    {passwordSaving ? 'Updating…' : 'Update Password'}
                  </button>
                </form>
              </section>

              <div className="h-px bg-white/8" />

              {/* Danger zone */}
              <section>
                <h2 className="font-display font-semibold text-sm tracking-[0.15em] uppercase text-red-400/60 mb-4">Account Actions</h2>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-6 py-3 border border-red-500/20 text-red-400/70 font-display text-xs font-semibold tracking-[0.15em] uppercase hover:border-red-500/50 hover:text-red-400 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                  Sign Out of Account
                </button>
              </section>
            </div>
          )}

        </div>

        {/* Cancel Order Confirmation Modal */}
        {cancelModalOrder && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6" role="dialog" aria-modal="true" aria-labelledby="cancel-modal-title">
            <div className="bg-black border border-white/20 p-8 max-w-md w-full space-y-6">
              <h3 id="cancel-modal-title" className="font-display font-bold text-xl text-white uppercase tracking-tight">
                Cancel Order #{cancelModalOrder.order_number}?
              </h3>
              <p className="font-body text-sm text-white/60 leading-relaxed">
                Are you sure you want to cancel this order? This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => setCancelModalOrder(null)}
                  disabled={cancellingOrderId === cancelModalOrder.id}
                  className="px-6 py-3 border border-white/20 text-white font-display text-xs font-semibold tracking-wider uppercase hover:bg-white/10 transition-colors"
                >
                  Keep Order
                </button>
                <button
                  onClick={() => handleCancelOrder(cancelModalOrder.id)}
                  disabled={cancellingOrderId === cancelModalOrder.id}
                  className="px-6 py-3 bg-red-500/20 border border-red-500/50 text-red-400 font-display text-xs font-semibold tracking-wider uppercase hover:bg-red-500/30 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {cancellingOrderId === cancelModalOrder.id && (
                    <span className="w-3.5 h-3.5 border border-red-400 border-t-transparent rounded-full animate-spin" />
                  )}
                  Confirm Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

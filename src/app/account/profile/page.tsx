'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
}

interface Address {
  id: string;
  user_id: string;
  label: string;
  full_name: string;
  phone: string;
  flat: string;
  area: string;
  landmark: string | null;
  city: string;
  district: string;
  state: string;
  pin: string;
  is_default: boolean;
}

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Andaman and Nicobar Islands','Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu','Delhi','Jammu and Kashmir',
  'Ladakh','Lakshadweep','Puducherry',
];

const emptyAddress: Omit<Address, 'id' | 'user_id'> = {
  label: 'Home',
  full_name: '',
  phone: '',
  flat: '',
  area: '',
  landmark: '',
  city: '',
  district: '',
  state: '',
  pin: '',
  is_default: false,
};

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  // Profile state
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileForm, setProfileForm] = useState({ full_name: '', phone: '' });
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Address state
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addrLoading, setAddrLoading] = useState(true);
  const [showAddrForm, setShowAddrForm] = useState(false);
  const [editingAddr, setEditingAddr] = useState<Address | null>(null);
  const [addrForm, setAddrForm] = useState(emptyAddress);
  const [addrSaving, setAddrSaving] = useState(false);
  const [addrMsg, setAddrMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

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
        // Profile doesn't exist yet — create it
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
    } catch {
      // silent
    } finally {
      setProfileLoading(false);
    }
  }, [user, supabase]);

  const fetchAddresses = useCallback(async () => {
    if (!user) return;
    setAddrLoading(true);
    try {
      const { data } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: true });
      setAddresses(data || []);
    } catch {
      // silent
    } finally {
      setAddrLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchAddresses();
    }
  }, [user, fetchProfile, fetchAddresses]);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setProfileSaving(true);
    setProfileMsg(null);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.id,
          email: user.email || '',
          full_name: profileForm.full_name,
          phone: profileForm.phone || null,
        });
      if (error) throw error;
      setProfileMsg({ type: 'success', text: 'Profile updated successfully.' });
      fetchProfile();
    } catch (err: any) {
      setProfileMsg({ type: 'error', text: err.message || 'Failed to update profile.' });
    } finally {
      setProfileSaving(false);
    }
  };

  const openAddForm = () => {
    setEditingAddr(null);
    setAddrForm(emptyAddress);
    setAddrMsg(null);
    setShowAddrForm(true);
  };

  const openEditForm = (addr: Address) => {
    setEditingAddr(addr);
    setAddrForm({
      label: addr.label,
      full_name: addr.full_name,
      phone: addr.phone,
      flat: addr.flat,
      area: addr.area,
      landmark: addr.landmark || '',
      city: addr.city,
      district: addr.district,
      state: addr.state,
      pin: addr.pin,
      is_default: addr.is_default,
    });
    setAddrMsg(null);
    setShowAddrForm(true);
  };

  const handleAddrSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setAddrSaving(true);
    setAddrMsg(null);
    try {
      // If setting as default, unset others first
      if (addrForm.is_default) {
        await supabase
          .from('addresses')
          .update({ is_default: false })
          .eq('user_id', user.id);
      }

      if (editingAddr) {
        const { error } = await supabase
          .from('addresses')
          .update({ ...addrForm, landmark: addrForm.landmark || null })
          .eq('id', editingAddr.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('addresses')
          .insert({ ...addrForm, landmark: addrForm.landmark || null, user_id: user.id });
        if (error) throw error;
      }
      setAddrMsg({ type: 'success', text: editingAddr ? 'Address updated.' : 'Address added.' });
      fetchAddresses();
      setTimeout(() => {
        setShowAddrForm(false);
        setAddrMsg(null);
      }, 800);
    } catch (err: any) {
      setAddrMsg({ type: 'error', text: err.message || 'Failed to save address.' });
    } finally {
      setAddrSaving(false);
    }
  };

  const handleSetDefault = async (addr: Address) => {
    if (!user || addr.is_default) return;
    try {
      await supabase.from('addresses').update({ is_default: false }).eq('user_id', user.id);
      await supabase.from('addresses').update({ is_default: true }).eq('id', addr.id);
      fetchAddresses();
    } catch {
      // silent
    }
  };

  const handleDeleteAddr = async (id: string) => {
    if (!user) return;
    setDeletingId(id);
    try {
      await supabase.from('addresses').delete().eq('id', id);
      fetchAddresses();
    } catch {
      // silent
    } finally {
      setDeletingId(null);
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
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 pt-8 mb-8">
            <Link href="/dashboard" className="font-body text-xs text-white/40 hover:text-gold transition-colors tracking-widest uppercase">
              Dashboard
            </Link>
            <span className="text-white/20 text-xs">/</span>
            <span className="font-body text-xs text-white/60 tracking-widest uppercase">Profile</span>
          </div>

          {/* Header */}
          <div className="flex items-center gap-5 mb-10">
            <div className="w-14 h-14 bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
              <span className="font-display font-bold text-lg text-gold">{initials}</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-white">{displayName}</h1>
              <p className="font-body text-xs text-white/40 mt-0.5">{user?.email}</p>
            </div>
          </div>

          <div className="h-px gold-gradient mb-10 opacity-30" />

          {/* ── Personal Information ── */}
          <section className="mb-12">
            <h2 className="font-display font-semibold text-sm tracking-[0.15em] uppercase text-white/60 mb-6">
              Personal Information
            </h2>

            <form onSubmit={handleProfileSave} className="space-y-5">
              {/* Email (read-only) */}
              <div>
                <label className="block font-body text-xs text-white/40 tracking-widest uppercase mb-2">
                  Email Address
                </label>
                <div className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 font-body text-sm text-white/40 cursor-not-allowed select-none">
                  {user?.email}
                </div>
                <p className="font-body text-xs text-white/25 mt-1.5">Email cannot be changed here.</p>
              </div>

              {/* Full Name */}
              <div>
                <label className="block font-body text-xs text-white/40 tracking-widest uppercase mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileForm.full_name}
                  onChange={(e) => setProfileForm((p) => ({ ...p, full_name: e.target.value }))}
                  placeholder="Your full name"
                  className="w-full bg-transparent border border-white/15 px-4 py-3 font-body text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block font-body text-xs text-white/40 tracking-widest uppercase mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="+91 98765 43210"
                  className="w-full bg-transparent border border-white/15 px-4 py-3 font-body text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>

              {profileMsg && (
                <p className={`font-body text-xs ${profileMsg.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {profileMsg.text}
                </p>
              )}

              <button
                type="submit"
                disabled={profileSaving}
                className="px-8 py-3 bg-gold/10 border border-gold/40 text-gold font-display text-xs font-semibold tracking-[0.15em] uppercase hover:bg-gold/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {profileSaving && <span className="w-3.5 h-3.5 border border-gold/40 border-t-gold rounded-full animate-spin" />}
                {profileSaving ? 'Saving…' : 'Save Changes'}
              </button>
            </form>
          </section>

          <div className="h-px bg-white/8 mb-10" />

          {/* ── Address Book ── */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-semibold text-sm tracking-[0.15em] uppercase text-white/60">
                Address Book
              </h2>
              {!showAddrForm && (
                <button
                  onClick={openAddForm}
                  className="flex items-center gap-2 font-display text-xs font-semibold tracking-[0.12em] uppercase text-gold/80 hover:text-gold transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Add Address
                </button>
              )}
            </div>

            {/* Address Form */}
            {showAddrForm && (
              <div className="border border-white/10 p-6 mb-6 bg-white/[0.02]">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-display font-semibold text-sm text-white tracking-wide">
                    {editingAddr ? 'Edit Address' : 'New Address'}
                  </h3>
                  <button
                    onClick={() => { setShowAddrForm(false); setAddrMsg(null); }}
                    className="text-white/30 hover:text-white/60 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleAddrSave} className="space-y-4">
                  {/* Label */}
                  <div>
                    <label className="block font-body text-xs text-white/40 tracking-widest uppercase mb-2">Label</label>
                    <div className="flex gap-2">
                      {['Home', 'Work', 'Other'].map((lbl) => (
                        <button
                          key={lbl}
                          type="button"
                          onClick={() => setAddrForm((f) => ({ ...f, label: lbl }))}
                          className={`px-4 py-2 font-display text-xs font-semibold tracking-wide uppercase border transition-colors ${
                            addrForm.label === lbl
                              ? 'border-gold/60 text-gold bg-gold/10' :'border-white/15 text-white/40 hover:border-white/30'
                          }`}
                        >
                          {lbl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-xs text-white/40 tracking-widest uppercase mb-2">Full Name *</label>
                      <input
                        required
                        type="text"
                        value={addrForm.full_name}
                        onChange={(e) => setAddrForm((f) => ({ ...f, full_name: e.target.value }))}
                        placeholder="Recipient name"
                        className="w-full bg-transparent border border-white/15 px-4 py-2.5 font-body text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs text-white/40 tracking-widest uppercase mb-2">Phone *</label>
                      <input
                        required
                        type="tel"
                        value={addrForm.phone}
                        onChange={(e) => setAddrForm((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="10-digit mobile"
                        className="w-full bg-transparent border border-white/15 px-4 py-2.5 font-body text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Flat + Area */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-xs text-white/40 tracking-widest uppercase mb-2">Flat / House No. *</label>
                      <input
                        required
                        type="text"
                        value={addrForm.flat}
                        onChange={(e) => setAddrForm((f) => ({ ...f, flat: e.target.value }))}
                        placeholder="Flat, House No., Building"
                        className="w-full bg-transparent border border-white/15 px-4 py-2.5 font-body text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs text-white/40 tracking-widest uppercase mb-2">Area / Street *</label>
                      <input
                        required
                        type="text"
                        value={addrForm.area}
                        onChange={(e) => setAddrForm((f) => ({ ...f, area: e.target.value }))}
                        placeholder="Colony, Street, Locality"
                        className="w-full bg-transparent border border-white/15 px-4 py-2.5 font-body text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Landmark */}
                  <div>
                    <label className="block font-body text-xs text-white/40 tracking-widest uppercase mb-2">Landmark</label>
                    <input
                      type="text"
                      value={addrForm.landmark || ''}
                      onChange={(e) => setAddrForm((f) => ({ ...f, landmark: e.target.value }))}
                      placeholder="Near school, temple, etc."
                      className="w-full bg-transparent border border-white/15 px-4 py-2.5 font-body text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold/50 transition-colors"
                    />
                  </div>

                  {/* City + District */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-xs text-white/40 tracking-widest uppercase mb-2">City *</label>
                      <input
                        required
                        type="text"
                        value={addrForm.city}
                        onChange={(e) => setAddrForm((f) => ({ ...f, city: e.target.value }))}
                        placeholder="City"
                        className="w-full bg-transparent border border-white/15 px-4 py-2.5 font-body text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs text-white/40 tracking-widest uppercase mb-2">District *</label>
                      <input
                        required
                        type="text"
                        value={addrForm.district}
                        onChange={(e) => setAddrForm((f) => ({ ...f, district: e.target.value }))}
                        placeholder="District"
                        className="w-full bg-transparent border border-white/15 px-4 py-2.5 font-body text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* State + PIN */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-xs text-white/40 tracking-widest uppercase mb-2">State *</label>
                      <select
                        required
                        value={addrForm.state}
                        onChange={(e) => setAddrForm((f) => ({ ...f, state: e.target.value }))}
                        className="w-full bg-black border border-white/15 px-4 py-2.5 font-body text-sm text-white focus:outline-none focus:border-gold/50 transition-colors appearance-none"
                      >
                        <option value="" disabled className="text-white/40">Select state</option>
                        {INDIAN_STATES.map((s) => (
                          <option key={s} value={s} className="bg-black text-white">{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-body text-xs text-white/40 tracking-widest uppercase mb-2">PIN Code *</label>
                      <input
                        required
                        type="text"
                        maxLength={6}
                        pattern="[0-9]{6}"
                        value={addrForm.pin}
                        onChange={(e) => setAddrForm((f) => ({ ...f, pin: e.target.value.replace(/\D/g, '') }))}
                        placeholder="6-digit PIN"
                        className="w-full bg-transparent border border-white/15 px-4 py-2.5 font-body text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Default toggle */}
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                      onClick={() => setAddrForm((f) => ({ ...f, is_default: !f.is_default }))}
                      className={`w-10 h-5 rounded-full border transition-colors flex items-center ${
                        addrForm.is_default ? 'border-gold/60 bg-gold/20' : 'border-white/20 bg-white/5'
                      }`}
                    >
                      <span
                        className={`w-3.5 h-3.5 rounded-full transition-all mx-0.5 ${
                          addrForm.is_default ? 'translate-x-5 bg-gold' : 'translate-x-0 bg-white/30'
                        }`}
                      />
                    </div>
                    <span className="font-body text-xs text-white/50 group-hover:text-white/70 transition-colors">
                      Set as default address
                    </span>
                  </label>

                  {addrMsg && (
                    <p className={`font-body text-xs ${addrMsg.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {addrMsg.text}
                    </p>
                  )}

                  <div className="flex gap-3 pt-1">
                    <button
                      type="submit"
                      disabled={addrSaving}
                      className="px-6 py-2.5 bg-gold/10 border border-gold/40 text-gold font-display text-xs font-semibold tracking-[0.12em] uppercase hover:bg-gold/20 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      {addrSaving && <span className="w-3 h-3 border border-gold/40 border-t-gold rounded-full animate-spin" />}
                      {addrSaving ? 'Saving…' : editingAddr ? 'Update Address' : 'Save Address'}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShowAddrForm(false); setAddrMsg(null); }}
                      className="px-6 py-2.5 border border-white/10 text-white/40 font-display text-xs font-semibold tracking-[0.12em] uppercase hover:border-white/25 hover:text-white/60 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Address List */}
            {addrLoading ? (
              <div className="flex items-center justify-center py-12">
                <span className="w-6 h-6 border-2 border-white/20 border-t-gold rounded-full animate-spin" />
              </div>
            ) : addresses.length === 0 ? (
              <div className="border border-white/8 p-10 text-center">
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center mx-auto mb-4">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/30">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <p className="font-body text-sm text-white/30 mb-4">No saved addresses yet.</p>
                <button
                  onClick={openAddForm}
                  className="font-display text-xs font-semibold tracking-[0.12em] uppercase text-gold/70 hover:text-gold transition-colors"
                >
                  Add your first address
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`border p-5 transition-colors ${
                      addr.is_default ? 'border-gold/30 bg-gold/[0.03]' : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        {/* Label + Default badge */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-display text-xs font-semibold tracking-widest uppercase text-white/70">
                            {addr.label}
                          </span>
                          {addr.is_default && (
                            <span className="px-2 py-0.5 border border-gold/40 text-gold font-display text-[10px] font-semibold tracking-widest uppercase">
                              Default
                            </span>
                          )}
                        </div>

                        {/* Name + Phone */}
                        <p className="font-body text-sm text-white font-medium">{addr.full_name}</p>
                        <p className="font-body text-xs text-white/50 mt-0.5">{addr.phone}</p>

                        {/* Address lines */}
                        <p className="font-body text-xs text-white/40 mt-2 leading-relaxed">
                          {addr.flat}, {addr.area}
                          {addr.landmark ? `, ${addr.landmark}` : ''}
                          <br />
                          {addr.city}, {addr.district}, {addr.state} — {addr.pin}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => openEditForm(addr)}
                            className="font-body text-xs text-white/40 hover:text-gold transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteAddr(addr.id)}
                            disabled={deletingId === addr.id}
                            className="font-body text-xs text-white/30 hover:text-red-400 transition-colors disabled:opacity-40"
                          >
                            {deletingId === addr.id ? '…' : 'Delete'}
                          </button>
                        </div>
                        {!addr.is_default && (
                          <button
                            onClick={() => handleSetDefault(addr)}
                            className="font-body text-[10px] text-white/25 hover:text-gold/60 transition-colors tracking-wide"
                          >
                            Set as default
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

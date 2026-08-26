'use client';
import React, { useState, useRef, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { FaWhatsapp } from 'react-icons/fa';

export default function WholesaleSection() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    phone: '',
    email: '',
    quantity: '20-50 units',
    category: 'Cargos & Linen',
    notes: '',
  });

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      await supabase.from('wholesale_enquiries').insert([
        {
          business_name: formData.businessName,
          contact_name: formData.contactName,
          phone: formData.phone,
          email: formData.email,
          quantity_tier: formData.quantity,
          category_focus: formData.category,
        },
      ]);
    } catch {
      // Supabase optional fallback
    }

    // Auto-launch WhatsApp with lead details to owner
    const formattedLead = encodeURIComponent(
      `🏭 NEW B2B WHOLESALE ENQUIRY (REFLY Store)\n\n` +
        `🏢 Business: ${formData.businessName}\n` +
        `👤 Contact: ${formData.contactName}\n` +
        `📞 Phone: ${formData.phone}\n` +
        `✉️ Email: ${formData.email || 'N/A'}\n` +
        `📦 Quantity: ${formData.quantity}\n` +
        `🏷️ Category: ${formData.category}`
    );

    window.open(`https://wa.me/917760775621?text=${formattedLead}`, '_blank');
  };

  const whatsappMessage = encodeURIComponent(
    `Hello REFLY Wholesale Team,\nI am interested in bulk ordering / wholesale partnership.\n\n` +
      `Business: ${formData.businessName || 'N/A'}\nName: ${formData.contactName || 'N/A'}\n` +
      `Qty: ${formData.quantity}\nCategory: ${formData.category}`
  );

  return (
    <section
      id="wholesale"
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-black overflow-hidden border-t border-white/10"
    >
      {/* Background with subtle store texture */}
      <div className="absolute inset-0">
        <AppImage
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
          alt="REFLY Wholesale & B2B Distribution Warehouse"
          fill
          className="object-cover opacity-20 filter grayscale"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center reveal-up">
          <span className="font-display text-xs font-semibold tracking-[0.3em] uppercase text-gold block mb-4">
            REFLY B2B & WHOLESALE MARKETPLACE
          </span>
          <h2 className="section-heading text-white mb-6">
            Bulk Ordering &<br />
            <span className="italic text-white/50">Wholesale Partnership.</span>
          </h2>
          <p className="font-body text-white/70 text-base lg:text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Crafted for clothing retailers, boutique owners, and bulk buyers across India. Access
            direct factory pricing, tiered quantity discounts, and priority dispatch.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 text-left">
            <div className="p-5 bg-white/5 border border-white/10 backdrop-blur-sm space-y-2 hover:border-gold/50 transition-colors">
              <div className="w-10 h-10 bg-gold/15 text-gold flex items-center justify-center text-xl mb-3">
                📦
              </div>
              <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                Tiered Discounts
              </h3>
              <p className="font-body text-xs text-white/60 leading-relaxed">
                Exclusive B2B rates for 20+, 50+, and 200+ unit orders.
              </p>
            </div>

            <div className="p-5 bg-white/5 border border-white/10 backdrop-blur-sm space-y-2 hover:border-gold/50 transition-colors">
              <div className="w-10 h-10 bg-gold/15 text-gold flex items-center justify-center text-xl mb-3">
                ⚡
              </div>
              <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                Factory Dispatch
              </h3>
              <p className="font-body text-xs text-white/60 leading-relaxed">
                Direct dispatch within 24-48 hours with door-to-door tracking.
              </p>
            </div>

            <div className="p-5 bg-white/5 border border-white/10 backdrop-blur-sm space-y-2 hover:border-gold/50 transition-colors">
              <div className="w-10 h-10 bg-gold/15 text-gold flex items-center justify-center text-xl mb-3">
                📑
              </div>
              <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                GST B2B Invoice
              </h3>
              <p className="font-body text-xs text-white/60 leading-relaxed">
                100% Tax compliant invoicing with full GST credit claim.
              </p>
            </div>

            <div className="p-5 bg-white/5 border border-white/10 backdrop-blur-sm space-y-2 hover:border-gold/50 transition-colors">
              <div className="w-10 h-10 bg-gold/15 text-gold flex items-center justify-center text-xl mb-3">
                🤝
              </div>
              <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                Dedicated Manager
              </h3>
              <p className="font-body text-xs text-white/60 leading-relaxed">
                Instant WhatsApp & call support for custom sample orders.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setEnquiryOpen(true)}
              className="btn-gold px-8 py-4 text-xs font-display font-semibold tracking-widest uppercase w-full sm:w-auto"
            >
              Enquire Wholesale Pricing →
            </button>
            <a
              href={`https://wa.me/917760775621?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-green-500/50 text-green-400 bg-green-950/30 hover:bg-green-900/40 px-8 py-4 text-xs font-display font-semibold tracking-widest uppercase w-full sm:w-auto transition-colors"
            >
              <FaWhatsapp size={18} />
              Chat on WhatsApp
            </a>
          </div>

          <p className="font-body text-xs text-white/40 mt-6">
            Minimum Order Quantity (MOQ): 20 units · Samples available on request
          </p>
        </div>
      </div>

      {/* Interactive Wholesale Enquiry Modal */}
      {enquiryOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 lg:p-8"
          onClick={() => setEnquiryOpen(false)}
        >
          <div
            className="bg-black border border-white/20 max-w-lg w-full p-6 lg:p-8 text-left space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-display text-[10px] font-semibold tracking-widest uppercase text-gold">
                  REFLY B2B DESK
                </span>
                <h3 className="font-display font-bold text-xl text-white uppercase">
                  Wholesale Enquiry
                </h3>
              </div>
              <button
                onClick={() => setEnquiryOpen(false)}
                aria-label="Close modal"
                className="text-white/60 hover:text-white"
              >
                <Icon name="XMarkIcon" size={24} />
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 bg-green-500/20 text-green-400 border border-green-500/40 rounded-full flex items-center justify-center mx-auto">
                  <Icon name="CheckIcon" size={28} />
                </div>
                <h4 className="font-display font-bold text-lg text-white uppercase">
                  Enquiry Received!
                </h4>
                <p className="font-body text-xs text-white/70 max-w-xs mx-auto">
                  WhatsApp will open automatically to send your lead directly to our Wholesale Desk
                  (`+91 82966 64977`).
                </p>
                <div className="flex flex-col gap-3 pt-2">
                  <a
                    href={`https://wa.me/917760775621?text=${encodeURIComponent(
                      `🏭 NEW B2B WHOLESALE ENQUIRY (REFLY Store)\n\n` +
                        `🏢 Business: ${formData.businessName}\n` +
                        `👤 Contact: ${formData.contactName}\n` +
                        `📞 Phone: ${formData.phone}\n` +
                        `✉️ Email: ${formData.email || 'N/A'}\n` +
                        `📦 Quantity: ${formData.quantity}\n` +
                        `🏷️ Category: ${formData.category}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border border-green-500/50 text-green-400 bg-green-950/40 hover:bg-green-900/60 px-6 py-3 text-xs font-display font-semibold tracking-wider uppercase transition-colors"
                  >
                    <FaWhatsapp size={18} />
                    Send Lead on WhatsApp
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setEnquiryOpen(false);
                    }}
                    className="border border-white/20 text-white/60 hover:text-white text-xs px-6 py-2.5 uppercase font-display"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-display font-semibold tracking-widest uppercase text-white/70 mb-1">
                    Store / Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Apex Apparel Store"
                    className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-xs px-4 py-3 outline-none focus:border-gold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-display font-semibold tracking-widest uppercase text-white/70 mb-1">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="Your Name"
                      className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-xs px-4 py-3 outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-display font-semibold tracking-widest uppercase text-white/70 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-xs px-4 py-3 outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-display font-semibold tracking-widest uppercase text-white/70 mb-1">
                    Expected Order Quantity
                  </label>
                  <select
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-black border border-white/20 text-white text-xs px-4 py-3 outline-none focus:border-gold"
                  >
                    <option value="20-50 units">20 – 50 units (Sample / Trial)</option>
                    <option value="50-200 units">50 – 200 units (Standard Bulk)</option>
                    <option value="200+ units">200+ units (Distributor / Volume)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-display font-semibold tracking-widest uppercase text-white/70 mb-1">
                    Category Focus
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-black border border-white/20 text-white text-xs px-4 py-3 outline-none focus:border-gold"
                  >
                    <option value="Cargos">Cargos (Zip, Patch Pocket, Elastic, Loose Fit)</option>
                    <option value="Linen">Linen (Loose Fit, Chinos, Shorts)</option>
                    <option value="Cotton Pants">Cotton Pants (Chinos, Heavy Twill)</option>
                    <option value="Shorts">Shorts (Polyester, Cargo, Linen, Cotton)</option>
                    <option value="Formal">Formal Trousers</option>
                    <option value="All Categories">All Categories Mix</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn-gold w-full py-4 text-xs font-display font-semibold tracking-widest uppercase mt-4"
                >
                  Submit Wholesale Enquiry →
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

'use client';
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import Icon from '@/components/ui/AppIcon';
import { useToast } from '@/contexts/ToastContext';
import { FaInstagram } from 'react-icons/fa';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState<{ email?: string; name?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; name?: string; message?: string } = {};

    const cleanEmail = formData.email.trim();
    const cleanName = formData.name.trim();
    const cleanMessage = formData.message.trim();

    if (!cleanName) {
      newErrors.name = 'Please enter your name.';
    }

    if (!cleanEmail) {
      newErrors.email = 'Please enter your email address.';
    } else if (!EMAIL_REGEX.test(cleanEmail)) {
      newErrors.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    if (!cleanMessage) {
      newErrors.message = 'Please enter your message.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      addToast('Please correct the errors in the form.', 'error');
      return;
    }

    setErrors({});
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      addToast('Message sent successfully! We will get back to you shortly.', 'success');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Header />

      <main className="pt-28 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Header Banner */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-display text-xs font-semibold tracking-[0.3em] uppercase text-gold block mb-3">
              Customer Support & Concierge
            </span>
            <h1 className="font-display font-bold text-4xl lg:text-5xl tracking-tight uppercase mb-4">
              Get in Touch
            </h1>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              Have questions about your order, fit sizing, or custom requirements? Our team is available to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Contact Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="border border-border p-6 bg-white space-y-4">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center">
                  <Icon name="EnvelopeIcon" size={20} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base tracking-wide uppercase mb-1">Official Email</h3>
                  <p className="text-sm font-body text-muted-foreground">For orders, enquiries & business:</p>
                  <a href="mailto:shamim@reflystore.in" className="font-display font-semibold text-sm text-gold hover:underline block mt-1">
                    shamim@reflystore.in
                  </a>
                </div>
              </div>

              <div className="border border-border p-6 bg-white space-y-4">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center">
                  <FaInstagram size={20} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base tracking-wide uppercase mb-1">Instagram Direct</h3>
                  <p className="text-sm font-body text-muted-foreground">DM us for quick queries & drop alerts:</p>
                  <a
                    href="https://www.instagram.com/refly_clothing__/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display font-semibold text-sm text-gold hover:underline block mt-1"
                  >
                    @refly_clothing__
                  </a>
                </div>
              </div>

              <div className="border border-border p-6 bg-white space-y-4">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center">
                  <Icon name="TruckIcon" size={20} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base tracking-wide uppercase mb-1">Shipping & Dispatch</h3>
                  <p className="text-sm font-body text-muted-foreground">Pan-India express shipping within 24-48 hours. Orders above ₹1,500 ship FREE.</p>
                </div>
              </div>

              <div className="p-6 bg-black text-white space-y-3">
                <h3 className="font-display font-bold text-sm tracking-widest uppercase text-gold">Working Hours</h3>
                <p className="text-xs font-body text-white/70 leading-relaxed">
                  Monday – Saturday: 10:00 AM – 7:00 PM IST<br />
                  Sunday: Closed (Emails monitored for urgent queries)
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white border border-border p-8 lg:p-10">
              {submitted ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 bg-green-50 border border-green-200 text-green-700 flex items-center justify-center mx-auto rounded-full">
                    <Icon name="CheckIcon" size={32} />
                  </div>
                  <h3 className="font-display font-bold text-2xl tracking-wide uppercase">Message Received</h3>
                  <p className="font-body text-muted-foreground max-w-md mx-auto">
                    Thank you for contacting Refly. A support representative will respond to <strong>{formData.email}</strong> within 24 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-primary text-xs px-8 py-3 mt-4"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="font-display font-bold text-xl tracking-wide uppercase border-b border-border pb-4">
                    Send a Message
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-display font-semibold tracking-wider uppercase mb-2">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        className="input-luxury text-sm"
                      />
                      {errors.name && (
                        <p id="contact-name-error" className="text-xs text-red-500 font-body mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-display font-semibold tracking-wider uppercase mb-2">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        className="input-luxury text-sm"
                      />
                      {errors.email && (
                        <p id="contact-email-error" className="text-xs text-red-500 font-body mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-display font-semibold tracking-wider uppercase mb-2">
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 7760775621"
                        className="input-luxury text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-display font-semibold tracking-wider uppercase mb-2">
                        Subject *
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Order status / Exchange request"
                        className="input-luxury text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-display font-semibold tracking-wider uppercase mb-2">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help you?"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      className="input-luxury text-sm"
                    />
                    {errors.message && (
                      <p id="contact-message-error" className="text-xs text-red-500 font-body mt-1">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full py-4 text-xs disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {submitting && (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    )}
                    {submitting ? 'Sending…' : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

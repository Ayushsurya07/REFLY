'use client';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Header />

      <main className="pt-28 pb-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-display text-xs font-semibold tracking-[0.3em] uppercase text-gold block mb-3">
              Hassle-Free Policy
            </span>
            <h1 className="font-display font-bold text-4xl lg:text-5xl tracking-tight uppercase mb-4">
              Returns & Exchanges
            </h1>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              We stand by the craftsmanship of REFLY bottom wear. If your size isn&apos;t perfect or you wish to exchange, we offer a 7-day easy return policy.
            </p>
          </div>

          {/* Key Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="border border-border p-6 bg-white space-y-3">
              <div className="w-10 h-10 bg-black text-white font-display font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="font-display font-bold text-base tracking-wide uppercase">Request Return</h3>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                Initiate your return within 7 days of delivery through our Contact support or Email with your Order ID.
              </p>
            </div>

            <div className="border border-border p-6 bg-white space-y-3">
              <div className="w-10 h-10 bg-black text-white font-display font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="font-display font-bold text-base tracking-wide uppercase">Doorstep Door Pickup</h3>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                Our courier partner will pick up the item from your address. Please keep tags intact and item unused.
              </p>
            </div>

            <div className="border border-border p-6 bg-white space-y-3">
              <div className="w-10 h-10 bg-black text-white font-display font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="font-display font-bold text-base tracking-wide uppercase">Refund / Exchange</h3>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                Once quality inspected, your replacement size will be dispatched or refund credited within 3-5 business days.
              </p>
            </div>
          </div>

          {/* Details & Terms */}
          <div className="bg-white border border-border p-8 lg:p-12 space-y-8">
            <section className="space-y-3">
              <h2 className="font-display font-bold text-lg tracking-wide uppercase">Return Eligibility</h2>
              <ul className="list-disc list-inside font-body text-sm text-muted-foreground space-y-2 leading-relaxed">
                <li>Items must be returned within <strong>7 days</strong> from the date of delivery.</li>
                <li>Items must be unworn, unwashed, and in their original packaging with all tags attached.</li>
                <li>Items bought during clearance sales or promotional bundle discounts can be exchanged for size only.</li>
              </ul>
            </section>

            <section className="space-y-3 pt-6 border-t border-border">
              <h2 className="font-display font-bold text-lg tracking-wide uppercase">Refund Process</h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                For Prepaid orders (UPI / Card), refunds will be credited back to the original payment source. For Cash on Delivery (COD) orders, refunds will be transferred via Bank Transfer or UPI handle provided during return confirmation.
              </p>
            </section>

            <section className="space-y-3 pt-6 border-t border-border">
              <h2 className="font-display font-bold text-lg tracking-wide uppercase">Need Assistance?</h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Email our support team directly at{' '}
                <a href="mailto:shamim@reflystore.in" className="text-gold font-semibold hover:underline">
                  shamim@reflystore.in
                </a>{' '}
                or send us a DM on Instagram{' '}
                <a href="https://www.instagram.com/refly_clothing__/?hl=en" target="_blank" rel="noopener noreferrer" className="text-gold font-semibold hover:underline">
                  @refly_clothing__
                </a>.
              </p>
              <div className="pt-4">
                <Link href="/contact" className="btn-primary inline-block text-xs px-8 py-3">
                  Contact Support →
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

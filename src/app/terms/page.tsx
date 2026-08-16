import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Refly',
  description: 'Read the terms and conditions governing the use of Refly.',
};

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-3">Terms & Conditions</h1>

      <p className="text-gray-500 mb-10">Last Updated: August 3, 2026</p>

      <p className="mb-8 text-gray-700 leading-8">
        Welcome to <strong>reflystore.in</strong>. By accessing or using our website, you agree to
        be bound by these Terms & Conditions. If you do not agree with any part of these terms,
        please do not use our website.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">1. Products</h2>
        <p className="text-gray-700 leading-8">
          We strive to display our products accurately. How ever, slight variations in color or
          appearance may occur due to screen settings.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">2. Pricing</h2>
        <p className="text-gray-700 leading-8">
          All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless
          stated otherwise. Prices may change without prior notice.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">3. Orders</h2>
        <p className="text-gray-700 leading-8">
          Refly reserves the right to accept, reject, or cancel any order due to stock availability,
          pricing errors, suspected fraud, or other operational reasons.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">4. Payments</h2>
        <p className="text-gray-700 leading-8">
          Payments are processed securely through trusted payment partners. Refly does not store
          your card or UPI credentials.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">5. Shipping & Delivery</h2>
        <p className="text-gray-700 leading-8">
          Delivery timelines are estimates and may vary depending on your location, courier service,
          and unforeseen circumstances.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">6. Returns & Refunds</h2>
        <p className="text-gray-700 leading-8">
          Returns and refunds are governed by our Returns Policy. Please review that page before
          requesting a return.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">7. Intellectual Property</h2>
        <p className="text-gray-700 leading-8">
          All content on this website, including logos, text, graphics, images, and designs, is the
          property of Refly and may not be copied or used without written permission.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">8. Limitation of Liability</h2>
        <p className="text-gray-700 leading-8">
          Refly shall not be liable for any indirect, incidental, or consequential damages arising
          from the use of this website or our products.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">9. Contact Us</h2>
        <p className="text-gray-700 leading-8">
          For any questions regarding these Terms & Conditions, please contact:
        </p>

        <div className="mt-4 space-y-2 text-gray-700">
          <p>
            <strong>Refly</strong>
          </p>
          <p>Email: support@refly.store</p>
          <p>Phone: +91 7760775621</p>
        </div>
      </section>
    </main>
  );
}

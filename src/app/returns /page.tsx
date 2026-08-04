import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Exchange Policy | Refly",
  description:
    "Read Refly's Return & Exchange Policy for orders placed through our website.",
};

export default function ReturnExchangePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-3">
        Return & Exchange Policy
      </h1>

      <p className="text-gray-500 mb-10">
        Last Updated: August 3, 2026
      </p>

      <p className="mb-8 text-gray-700 leading-8">
        At <strong>Refly</strong>, customer satisfaction is our priority. If
        you're not completely satisfied with your purchase, we're here to help.
        Please read our Return & Exchange Policy carefully before placing an
        order.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          1. Return Eligibility
        </h2>
        <p className="text-gray-700 leading-8">
          Products can be returned within <strong>7 days</strong> of delivery if
          they are unused, unwashed, undamaged, and returned with all original
          tags and packaging intact.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          2. Exchange Eligibility
        </h2>
        <p className="text-gray-700 leading-8">
          We offer size exchanges subject to stock availability. Exchange
          requests must be raised within <strong>7 days</strong> of receiving
          your order.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          3. Non-Returnable Items
        </h2>
        <p className="text-gray-700 leading-8">
          Products that are used, washed, damaged by the customer, or purchased
          during clearance or final sale are not eligible for return or
          exchange.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          4. Refund Process
        </h2>
        <p className="text-gray-700 leading-8">
          Once we receive and inspect your returned product, eligible refunds
          will be processed to the original payment method within
          <strong> 5–7 business days</strong>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          5. Damaged or Incorrect Orders
        </h2>
        <p className="text-gray-700 leading-8">
          If you receive a damaged, defective, or incorrect item, please contact
          us within <strong>48 hours</strong> of delivery along with clear
          photographs of the product and packaging.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">
          6. Contact Us
        </h2>

        <p className="text-gray-700 leading-8">
          For any return or exchange requests, please contact:
        </p>

        <div className="mt-4 space-y-2 text-gray-700">
          <p>
            <strong>Refly</strong>
          </p>
          <p>Email: support@refly.store</p>
          <p>Phone: +91 XXXXXXXXXX</p>
        </div>
      </section>
    </main>
  );
}
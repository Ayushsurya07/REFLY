import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Refly",
  description:
    "Learn how Refly collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>

      <p className="text-gray-500 mb-10">
        Last Updated: August 3, 2026
      </p>

      <p className="mb-8 text-gray-700 leading-8">
        At <strong>Refly</strong>, your privacy matters to us. We are committed
        to protecting your personal information and being transparent about how
        we collect, use, and safeguard it. By using our website, you agree to
        the practices described in this Privacy Policy.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          1. Information We Collect
        </h2>
        <p className="text-gray-700 leading-8">
          When you place an order or interact with our website, we may collect
          your name, email address, phone number, shipping and billing address,
          and payment-related information. We may also collect basic device and
          browsing information through cookies to improve your shopping
          experience.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          2. How We Use Your Information
        </h2>
        <p className="text-gray-700 leading-8">
          We use your information to process orders, deliver products, provide
          customer support, send order updates, improve our website, prevent
          fraud, and share promotional offers (only if you choose to receive
          them).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">3. Payment Security</h2>
        <p className="text-gray-700 leading-8">
          All online payments are securely processed through trusted payment
          partners. Refly does not store your debit card, credit card, or UPI
          credentials on our servers.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">4. Cookies</h2>
        <p className="text-gray-700 leading-8">
          We use cookies to remember your preferences, improve website
          performance, analyze visitor behavior, and provide a smoother shopping
          experience.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          5. Sharing Your Information
        </h2>
        <p className="text-gray-700 leading-8">
          We never sell your personal information. Your data may only be shared
          with trusted logistics partners, payment providers, and service
          providers necessary to complete your order or operate our business.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">6. Data Security</h2>
        <p className="text-gray-700 leading-8">
          We implement appropriate technical and organizational measures to
          protect your information from unauthorized access, misuse, or
          disclosure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">7. Your Rights</h2>
        <p className="text-gray-700 leading-8">
          You may request access to, correction of, or deletion of your personal
          information by contacting us. We will respond within a reasonable
          timeframe, subject to applicable laws.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          8. Changes to This Policy
        </h2>
        <p className="text-gray-700 leading-8">
          Refly may update this Privacy Policy from time to time. Any changes
          will be published on this page with the updated revision date.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">9. Contact Us</h2>
        <p className="text-gray-700 leading-8">
          If you have any questions regarding this Privacy Policy, please
          contact us at:
        </p>

        <div className="mt-4 space-y-2 text-gray-700">
          <p>
            <strong>Refly</strong>
          </p>
          <p>Email: support@refly.store</p>
          <p>Phone: +91 7760775622</p>
        </div>
      </section>
    </main>
  );
}
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Poshace.com terms and conditions. Rules governing your use of our platform and purchase of products.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold">Terms and Conditions</h1>
      <p className="text-sm text-muted-foreground mt-2">
        Operated by Figureout Enterprises &bull; Last Updated: March 2025
      </p>

      <div className="mt-8 space-y-8 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">1. Introduction</h2>
          <p>
            Welcome to Poshace.com. These terms and conditions govern your use of our website and the purchase of products through our platform. By accessing or using Poshace.com, you agree to be bound by these terms. If you do not agree, please do not use our services.
          </p>
          <p className="mt-2">
            Poshace.com is operated by <strong>Figureout Enterprises</strong>, located at OLD-A/35, Lakshi Narayan Colony, Netaji Subhash Chandra Bose Road, Kolkata, 700047, India.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">2. Eligibility</h2>
          <p>
            You must be at least 16 years of age to use our services. By placing an order, you confirm that you are legally capable of entering into binding contracts.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">3. Products and Pricing</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>All products are imported and sourced from international suppliers</li>
            <li>Prices are displayed in Indian Rupees (INR) and include all applicable customs duties and taxes</li>
            <li>We reserve the right to modify prices at any time without prior notice</li>
            <li>Product availability is subject to stock levels and may change without notice</li>
            <li>Product images are for illustration purposes; actual products may vary slightly</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">4. Orders and Payment</h2>
          <p>
            By placing an order, you make an offer to purchase the selected products. We reserve the right to accept or decline any order. Payment is processed securely through Razorpay. We accept UPI, credit/debit cards, net banking, and select orders on Cash on Delivery (COD).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">5. Shipping and Delivery</h2>
          <p>
            Orders are processed within 4-10 business days and delivered within 14-21 business days after processing. We ship via FedEx and DHL with tracking provided for all orders. For full details, see our{" "}
            <a href="/shipping-policy" className="text-primary hover:underline">Shipping Policy</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">6. Returns and Refunds</h2>
          <p>
            We offer a 7-day return window from the date of delivery. For complete return conditions and process, see our{" "}
            <a href="/return-exchange-promise" className="text-primary hover:underline">Return &amp; Exchange Promise</a> and{" "}
            <a href="/return-refund-policy" className="text-primary hover:underline">Return &amp; Refund Policy</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, Figureout Enterprises shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability for any claim arising from or related to these terms shall not exceed the amount you paid for the specific product giving rise to the claim, or INR 4,000, whichever is lower.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">8. Intellectual Property</h2>
          <p>
            All content on Poshace.com, including text, images, logos, and software, is the property of Figureout Enterprises or its licensors. You may not reproduce, distribute, or create derivative works from any content on this website without prior written permission.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">9. Governing Law</h2>
          <p>
            These terms are governed by the laws of the State of West Bengal, India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Kolkata, India.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">10. Contact</h2>
          <p>
            For questions about these terms, contact us at{" "}
            <a href="mailto:support@poshace.com" className="text-primary hover:underline">support@poshace.com</a> or call (033) 6902 8439.
          </p>
        </section>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { Shield, Eye, Users, Globe, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Poshace.com privacy policy. How we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mt-2">
        Operated by Figureout Enterprises &bull; Effective: 15 December 2017 &bull; Last Updated: 15 December 2024
      </p>

      <div className="mt-8 space-y-8 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">1. Who We Are</h2>
          <p>
            Poshace.com is operated by <strong>Figureout Enterprises</strong>, based in Kolkata, India. We are committed to protecting and respecting your privacy. This policy explains how we collect, use, and safeguard your personal data when you visit our website or use our services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">2. Information We Collect</h2>
          <p className="mb-3">We collect the following types of personal information:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Card>
              <CardContent className="pt-4">
                <Shield className="h-5 w-5 text-primary mb-2" />
                <h3 className="font-semibold text-foreground text-sm">Account Information</h3>
                <p className="text-xs mt-1">Name, email address, phone number, password, and billing/shipping addresses</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <Eye className="h-5 w-5 text-primary mb-2" />
                <h3 className="font-semibold text-foreground text-sm">Usage Data</h3>
                <p className="text-xs mt-1">IP address, browser type, device information, pages visited, and cookies</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Processing and fulfilling your orders</li>
            <li>Managing your account and providing customer support</li>
            <li>Sending order confirmations, shipping updates, and delivery notifications</li>
            <li>Improving our website, products, and services</li>
            <li>Sending promotional communications (only with your consent)</li>
            <li>Preventing fraud and ensuring platform security</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">4. Third-Party Partners</h2>
          <p>We share your data with trusted partners only as necessary to provide our services:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li><strong>Shipping</strong>: DHL and FedEx (for order delivery and tracking)</li>
            <li><strong>Payments</strong>: Razorpay and PayPal (for secure payment processing)</li>
            <li><strong>Analytics</strong>: Google Analytics (for website usage analysis)</li>
          </ul>
          <p className="mt-2">We do not sell your personal data to any third party.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">5. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your personal information, including encrypted data transmission (SSL/TLS), secure server infrastructure, and restricted access to personal data. However, no method of internet transmission is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data (subject to legal requirements)</li>
            <li>Opt out of promotional communications at any time</li>
            <li>Withdraw consent for data processing</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">7. Cookies</h2>
          <p>
            We use cookies to improve your browsing experience. For details, please see our{" "}
            <a href="/cookie-policy" className="text-primary hover:underline">Cookie Policy</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">8. Age Restriction</h2>
          <p>
            Our services are intended for users aged 16 and above. We do not knowingly collect personal information from individuals under 16. If we become aware that we have collected data from a minor, we will take steps to delete it promptly.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">9. Contact Us</h2>
          <p>If you have questions about this privacy policy or your personal data, contact us:</p>
          <div className="mt-3 flex items-center gap-3">
            <Mail className="h-4 w-4 text-primary" />
            <span>support@poshace.com &bull; (960) 962 8888</span>
          </div>
        </section>
      </div>
    </div>
  );
}

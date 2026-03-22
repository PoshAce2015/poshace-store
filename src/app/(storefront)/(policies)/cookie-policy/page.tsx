import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Poshace.com cookie policy. How we use cookies to improve your shopping experience.",
};

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold">Cookie Policy</h1>
      <p className="text-sm text-muted-foreground mt-2">
        Figureout Enterprises &bull; Kolkata, West Bengal 700070, India
      </p>

      <div className="mt-8 space-y-8 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences and improve your browsing experience. Cookies do not contain personally identifiable information by themselves.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">How We Use Cookies</h2>
          <p className="mb-3">Poshace.com uses the following types of cookies:</p>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-foreground">Necessary / Essential Cookies</h3>
              <p className="mt-1">
                These cookies are required for the website to function properly. They enable core features like shopping cart functionality, account login, and secure checkout. You cannot opt out of these cookies.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-foreground">Functionality Cookies</h3>
              <p className="mt-1">
                These cookies remember your preferences such as language, region, and display settings to provide a personalized experience. They help us remember your choices so you do not have to re-enter them each visit.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-foreground">Analytics Cookies</h3>
              <p className="mt-1">
                We use analytics cookies (such as Google Analytics) to understand how visitors interact with our website. This data helps us improve our site layout, content, and performance. All analytics data is aggregated and anonymized.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Managing Cookies</h2>
          <p>
            You can control cookies through your browser settings. Most browsers allow you to block or delete cookies. However, blocking essential cookies may affect the functionality of our website, including the ability to shop and check out.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. Any changes will be posted on this page. We encourage you to review this policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Contact</h2>
          <p>
            For questions about our cookie practices, contact us at{" "}
            <a href="mailto:support@poshace.com" className="text-primary hover:underline">support@poshace.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}

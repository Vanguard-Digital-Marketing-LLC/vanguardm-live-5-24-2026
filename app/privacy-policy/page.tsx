import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Vanguard Digital Marketing — how we collect, use, and protect your information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="pt-24 pb-20" id="main-content">
      <section className="px-5 md:px-6 max-w-3xl mx-auto">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500 mb-10">Last updated: March 11, 2026</p>

        <div className="prose prose-invert prose-slate max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-slate-400 prose-li:text-slate-400 prose-a:text-emerald">
          <h2>1. Information We Collect</h2>
          <p>
            When you use our website, services, or academy, we may collect the following information:
          </p>
          <ul>
            <li><strong>Account information:</strong> name, email address, and password when you create an account.</li>
            <li><strong>Contact information:</strong> name, email, phone, and company when you submit a form.</li>
            <li><strong>Payment information:</strong> processed securely by Stripe. We do not store credit card numbers.</li>
            <li><strong>Usage data:</strong> pages visited, interactions, and device information via Google Analytics and Google Tag Manager.</li>
            <li><strong>Authentication data:</strong> if you sign in with Google, we receive your name, email, and profile picture from your Google account.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To provide and improve our services, academy courses, and client portal.</li>
            <li>To process payments and issue certificates.</li>
            <li>To communicate with you about your account, projects, or inquiries.</li>
            <li>To send marketing communications (only with your consent).</li>
            <li>To analyze website usage and improve user experience.</li>
            <li>To detect and prevent fraud or abuse.</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>We do not sell your personal information. We may share data with:</p>
          <ul>
            <li><strong>Service providers:</strong> Stripe (payments), Google (analytics, authentication), Cloudflare (security), and our hosting provider.</li>
            <li><strong>Legal compliance:</strong> when required by law, regulation, or legal process.</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We protect your data with industry-standard measures including encrypted connections (HTTPS/TLS), hashed passwords (bcrypt), role-based access controls, Cloudflare Turnstile verification, and rate limiting on all endpoints.
          </p>

          <h2>5. Cookies & Tracking</h2>
          <p>
            We use cookies and similar technologies for authentication sessions, analytics (Google Tag Manager / GA4), and security (Cloudflare Turnstile). You can control cookies through your browser settings.
          </p>

          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access, correct, or delete your personal data.</li>
            <li>Opt out of marketing communications.</li>
            <li>Request a copy of your data.</li>
            <li>Close your account at any time.</li>
          </ul>

          <h2>7. Google API Services Usage Disclosure</h2>
          <p>
            Vanguard Digital Marketing&apos;s use and transfer of information received from Google APIs
            to any other app will adhere to the{" "}
            <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">
              Google API Services User Data Policy
            </a>, including the Limited Use requirements.
          </p>
          <p>
            When you sign in with Google, we access only your basic profile information (name, email
            address, and profile picture) to create and manage your account. We do not request access
            to any other Google data. This information is used solely for authentication and account
            management purposes and is not shared with third parties except as described in this policy.
          </p>

          <h2>8. Third-Party Services</h2>
          <p>
            Our services integrate with third-party platforms. Their use of your information is governed by their own privacy policies:
          </p>
          <ul>
            <li><a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">Stripe Privacy Policy</a></li>
            <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
            <li><a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">Cloudflare Privacy Policy</a></li>
          </ul>

          <h2>9. Children&apos;s Privacy</h2>
          <p>
            Our services are not directed to individuals under 18. We do not knowingly collect personal information from children.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. We will notify you of material changes by posting the updated policy on this page.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, contact us at{" "}
            <a href="mailto:hello@vanguardm.com">hello@vanguardm.com</a> or call{" "}
            <a href="tel:+19363586500">(936) 358-6500</a>.
          </p>
          <p>
            Vanguard Digital Marketing<br />
            Conroe, TX 77302
          </p>
        </div>
      </section>
    </main>
  );
}

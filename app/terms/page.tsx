import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Vanguard Digital Marketing — the rules governing your use of our website and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="pt-24 pb-20" id="main-content">
      <section className="px-5 md:px-6 max-w-3xl mx-auto">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-500 mb-10">Last updated: March 11, 2026</p>

        <div className="prose prose-invert prose-slate max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-slate-400 prose-li:text-slate-400 prose-a:text-emerald">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Vanguard Digital Marketing website (vanguardm.com), services, client portal, or academy, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
          </p>

          <h2>2. Services</h2>
          <p>
            Vanguard Digital Marketing provides digital marketing services including SEO, PPC management, web design, social media marketing, branding, content marketing, and educational courses through our academy platform.
          </p>

          <h2>3. Accounts</h2>
          <ul>
            <li>You must provide accurate, current information when creating an account.</li>
            <li>You are responsible for maintaining the security of your account credentials.</li>
            <li>You must notify us immediately of any unauthorized use of your account.</li>
            <li>We reserve the right to suspend or terminate accounts that violate these terms.</li>
          </ul>

          <h2>4. Academy & Course Purchases</h2>
          <ul>
            <li>Course purchases are non-refundable once content has been accessed.</li>
            <li>Certificates are issued upon successful completion of course quizzes.</li>
            <li>Course content is for personal use only and may not be redistributed.</li>
            <li>We reserve the right to update or modify course content at any time.</li>
          </ul>

          <h2>5. Client Portal</h2>
          <ul>
            <li>Access to the client portal is provided to authorized users of active client accounts.</li>
            <li>Confidential project data, reports, and communications must not be shared with third parties.</li>
            <li>Portal access may be revoked upon termination of client services.</li>
          </ul>

          <h2>6. Payments</h2>
          <p>
            All payments are processed securely through Stripe. By making a purchase, you agree to Stripe&apos;s{" "}
            <a href="https://stripe.com/legal" target="_blank" rel="noopener noreferrer">Terms of Service</a>.
            Prices are in USD and may be subject to applicable taxes.
          </p>

          <h2>7. Intellectual Property</h2>
          <p>
            All content on this website — including text, graphics, logos, designs, code, course materials, and trademarks — is the property of Vanguard Digital Marketing or its licensors. You may not reproduce, distribute, or create derivative works without written permission.
          </p>

          <h2>8. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use our services for any unlawful purpose.</li>
            <li>Attempt to gain unauthorized access to our systems or other users&apos; accounts.</li>
            <li>Interfere with or disrupt the operation of our services.</li>
            <li>Submit false, misleading, or spam content through any form or API.</li>
            <li>Scrape, crawl, or use automated tools to extract content from our website.</li>
          </ul>

          <h2>9. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Vanguard Digital Marketing shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.
          </p>

          <h2>10. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Vanguard Digital Marketing, its officers, employees, and agents from any claims, damages, or expenses arising from your use of our services or violation of these terms.
          </p>

          <h2>11. Termination</h2>
          <p>
            We may terminate or suspend your access to our services at any time, with or without notice, for conduct that we believe violates these Terms of Service or is harmful to other users or our business.
          </p>

          <h2>12. Governing Law</h2>
          <p>
            These terms shall be governed by the laws of the State of Texas. Any disputes shall be resolved in the courts of Montgomery County, Texas.
          </p>

          <h2>13. Changes to These Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the updated terms.
          </p>

          <h2>14. Contact Us</h2>
          <p>
            If you have questions about these Terms of Service, contact us at{" "}
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

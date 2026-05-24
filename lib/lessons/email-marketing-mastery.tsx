export default function EmailMarketingMastery() {
  return (
    <>
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Introduction &amp; Overview
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Email marketing remains the highest-ROI digital marketing channel,
          generating an average return of $36-$42 for every $1 spent. Unlike social
          media platforms where algorithms control your reach, email gives you{" "}
          <strong>direct, owned access</strong> to your audience. Your email list is
          an asset you control — it cannot be taken away by a platform change,
          algorithm update, or account suspension.
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Modern email marketing goes far beyond batch-and-blast newsletters. It
          encompasses sophisticated segmentation, behavioral automation, dynamic
          personalization, and deliverability engineering. When done well, email
          nurtures leads through the funnel, onboards new customers, drives repeat
          purchases, reactivates dormant subscribers, and builds lasting brand
          relationships.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <p className="text-xs md:text-sm text-slate-400">
            <strong className="text-slate-300">Why it matters:</strong> 4.4 billion
            people use email worldwide, and 99% of email users check their inbox
            daily. Email is 40x more effective at acquiring new customers than
            Facebook and Twitter combined.
          </p>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-3">
          This lesson covers the complete email marketing system: building your
          list, segmentation strategies, automation workflows, deliverability
          fundamentals (SPF, DKIM, DMARC), copywriting techniques, and the
          analytics that drive continuous improvement.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Core Concepts
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Mastering email marketing requires understanding the fundamental principles
          that underpin every successful campaign.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          List Building Strategies
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Your email list is the foundation of everything. Focus on building a
          high-quality list of engaged subscribers who have explicitly opted in.
          Never buy email lists — purchased lists destroy deliverability, violate
          regulations (GDPR, CAN-SPAM), and attract disengaged recipients who
          damage your sender reputation.
        </p>
        <div className="glass rounded-xl p-4 mb-3">
          <h3 className="font-display font-semibold text-amber mb-1">
            Proven List Building Tactics
          </h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span><strong>Lead Magnets</strong> — E-books, templates, checklists, free tools, or exclusive content offered in exchange for an email address</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span><strong>Content Upgrades</strong> — Bonus resources specific to a blog post (e.g., a downloadable PDF version or worksheet)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span><strong>Exit-Intent Popups</strong> — Triggered when a user is about to leave, offering a compelling reason to subscribe</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span><strong>Webinar &amp; Event Registration</strong> — Collecting emails through educational events that demonstrate expertise</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span><strong>Referral Programs</strong> — Incentivize existing subscribers to refer friends through rewards or exclusive content</span>
            </li>
          </ul>
        </div>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Segmentation
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Segmentation is dividing your email list into smaller groups based on
          shared characteristics so you can send more targeted, relevant messages.
          Segmented campaigns drive 14.3% higher open rates and 100.9% higher
          click-through rates compared to non-segmented campaigns. Segment by
          demographics (location, job title, industry), behavior (purchase history,
          email engagement, website activity), lifecycle stage (new subscriber,
          active customer, at-risk), and preferences (content topics, email
          frequency).
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Email Deliverability
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Deliverability determines whether your emails actually reach the inbox
          rather than the spam folder. Three critical authentication protocols
          protect your sender reputation:
        </p>
        <div className="space-y-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              SPF (Sender Policy Framework)
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              A DNS TXT record that specifies which mail servers are authorized to
              send email on behalf of your domain. It prevents spammers from
              spoofing your &quot;from&quot; address.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              DKIM (DomainKeys Identified Mail)
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              A cryptographic signature added to your email headers that verifies
              the message was not altered in transit and was sent by an authorized
              sender. Uses public/private key pairs.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-amber mb-1">
              DMARC (Domain-based Message Authentication, Reporting &amp; Conformance)
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Builds on SPF and DKIM by telling receiving servers what to do when
              authentication fails (none, quarantine, or reject). Also provides
              reporting so you can monitor unauthorized use of your domain.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Strategy &amp; Planning
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          An effective email strategy requires planning your automation workflows,
          content calendar, and segmentation architecture before sending a single
          email.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Email Automation Workflows
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Automation sends the right message to the right person at the right time
          based on triggers and conditions. Essential automated workflows include:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-sm mb-1">Welcome Sequence</h3>
            <p className="text-xs text-slate-400">
              3-7 emails sent over 1-2 weeks after signup that introduce your brand,
              set expectations, deliver the lead magnet, and guide the subscriber
              toward key actions.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-sm mb-1">Nurture Sequence</h3>
            <p className="text-xs text-slate-400">
              Ongoing educational emails that build trust and move subscribers
              through the funnel, typically triggered by content engagement or
              lead scoring thresholds.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-sm mb-1">Abandoned Cart</h3>
            <p className="text-xs text-slate-400">
              Triggered when a user adds items to cart but does not complete
              checkout. Typically 3 emails over 48 hours with escalating urgency
              and social proof.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-sm mb-1">Re-engagement</h3>
            <p className="text-xs text-slate-400">
              Targets subscribers who have not opened or clicked in 60-90 days.
              Offers a compelling reason to re-engage or a clean opt-out to
              maintain list health.
            </p>
          </div>
        </div>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Campaign Planning &amp; Calendar
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Plan your email calendar around three types of sends:{" "}
          <strong>automated flows</strong> (triggered by behavior),{" "}
          <strong>regular broadcasts</strong> (newsletters, promotions), and{" "}
          <strong>event-driven campaigns</strong> (product launches, seasonal
          promotions, holidays). Map each email to a goal: awareness, engagement,
          conversion, or retention. Establish a sending frequency that balances
          staying top-of-mind with avoiding subscriber fatigue — most B2B companies
          send 1-2 emails per week while B2C brands may send 3-5.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Compliance &amp; Regulations
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Email marketing is governed by laws like <strong>CAN-SPAM</strong> (US),{" "}
          <strong>GDPR</strong> (EU), and <strong>CASL</strong> (Canada). Key
          requirements include: obtaining explicit consent before sending marketing
          emails, including your physical mailing address, providing a clear
          one-click unsubscribe mechanism, honoring unsubscribe requests within 10
          business days, and never using deceptive subject lines. Violations can
          result in fines of up to $50,120 per email (CAN-SPAM) or 4% of annual
          global revenue (GDPR).
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Execution &amp; Implementation
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Great email marketing combines compelling copy, smart design, and
          technical excellence. Here is how to execute at a high level.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Email Copywriting
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Email copy must be concise, scannable, and action-oriented. The{" "}
          <strong>subject line</strong> is the gatekeeper — it determines whether
          your email gets opened. Keep subject lines under 50 characters, create
          curiosity or urgency, personalize when possible, and avoid spam trigger
          words (free, guarantee, act now). The <strong>preview text</strong>{" "}
          (preheader) should complement the subject line, not repeat it.
        </p>
        <ul className="space-y-2 text-sm text-slate-300 mb-3">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span><strong>One Email, One Goal</strong> — Every email should have a single primary call-to-action</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span><strong>Write Conversationally</strong> — Use &quot;you&quot; language, short sentences, and a friendly tone</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span><strong>Front-Load Value</strong> — Put the most important information in the first paragraph</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span><strong>Use Power Words</strong> — Words like &quot;discover,&quot; &quot;unlock,&quot; &quot;proven,&quot; and &quot;exclusive&quot; drive action</span>
          </li>
        </ul>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Design &amp; Technical Best Practices
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Design emails for readability across all devices. Over 60% of email opens
          occur on mobile, so use a single-column layout, large tap targets for
          buttons (minimum 44x44 pixels), and font sizes of at least 14px for body
          text. Keep emails under 100KB to avoid clipping in Gmail. Use a balanced
          text-to-image ratio — too many images trigger spam filters and many email
          clients block images by default.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          A/B Testing
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Test systematically to improve performance. Test one variable at a time:
          subject lines, send times, CTAs, email length, personalization, or design
          elements. Send the test to a statistically significant sample (at least
          1,000 per variation), wait for sufficient data (typically 2-4 hours for
          open rate tests, 24 hours for click tests), then send the winning
          variation to the remaining list. Over time, document your test results to
          build a playbook of what works for your audience.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Measurement &amp; Optimization
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Data-driven optimization is what separates great email programs from
          mediocre ones. Track the right metrics, benchmark against industry
          standards, and iterate continuously.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Key Email Metrics
        </h3>
        <div className="glass rounded-xl p-4 mb-3">
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span><strong>Open Rate</strong> — Percentage of recipients who open the email (industry avg: 20-25%). Note: Apple Mail Privacy Protection inflates open rates since 2021</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span><strong>Click-Through Rate (CTR)</strong> — Percentage of recipients who click a link (industry avg: 2-5%)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span><strong>Click-to-Open Rate (CTOR)</strong> — Clicks divided by opens — measures content effectiveness independent of subject line</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span><strong>Conversion Rate</strong> — Percentage of recipients who complete the desired action (purchase, signup, download)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span><strong>Bounce Rate</strong> — Hard bounces (invalid addresses) and soft bounces (temporary failures) — keep under 2%</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald mt-0.5">&#10003;</span>
              <span><strong>Unsubscribe Rate</strong> — Should stay below 0.5% per campaign — spikes indicate content or frequency issues</span>
            </li>
          </ul>
        </div>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          List Health &amp; Hygiene
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          A healthy list is more important than a large list. Regularly clean your
          list by removing hard bounces immediately, suppressing unsubscribes,
          sunsetting chronically unengaged subscribers (no opens in 90-180 days),
          and running re-engagement campaigns before removing inactive contacts.
          Monitor your sender reputation through tools like Google Postmaster Tools,
          Microsoft SNDS, and third-party services like Sender Score.
        </p>

        <div className="glass rounded-xl p-4 mt-3">
          <p className="text-xs md:text-sm text-slate-400">
            <strong className="text-slate-300">Key Takeaway:</strong> Email
            marketing&#39;s power lies in its directness and personalization.
            Build your list ethically, authenticate your domain properly (SPF,
            DKIM, DMARC), segment aggressively, automate intelligently, write
            compelling copy with clear CTAs, and maintain impeccable list hygiene.
            The compound effect of consistent, data-driven email marketing creates
            a revenue engine that outperforms every other digital channel.
          </p>
        </div>
      </section>
    </>
  );
}

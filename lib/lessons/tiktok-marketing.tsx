export default function TiktokMarketing() {
  return (
    <>
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Introduction &amp; Overview
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          TikTok has redefined social media marketing with its algorithm-first
          approach to content distribution. Unlike platforms where reach is
          gated by follower count, TikTok&apos;s For You Page (FYP) serves
          content to anyone based on predicted interest. This means a brand-new
          account can reach millions of viewers with a single video — something
          virtually impossible on any other platform.
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          With over 1.5 billion monthly active users and average daily usage
          exceeding 90 minutes, TikTok is no longer just a Gen Z platform. It
          spans all demographics and has become a primary search engine for
          younger audiences. This lesson covers the For You Page algorithm,
          trend mechanics, content hooks, TikTok SEO, TikTok Shop, and Ads
          Manager.
        </p>
        <div className="glass rounded-xl p-4 mt-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            TikTok&apos;s Core Philosophy
          </h3>
          <p className="text-xs md:text-sm text-slate-400">
            TikTok&apos;s motto for creators is &quot;Don&apos;t make ads, make
            TikToks.&quot; Content that feels native to the platform
            outperforms polished, ad-like content. Authenticity, entertainment
            value, and trend participation are the currency of TikTok success.
          </p>
        </div>
        <ul className="space-y-2 text-sm text-slate-300 mt-4">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Algorithm-First</strong> — Content is distributed based on
              engagement signals, not follower count
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Entertainment-Driven</strong> — Users come to be
              entertained first, informed second
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Trend-Powered</strong> — Participating in trends gives
              your content an immediate algorithmic boost
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Commerce-Integrated</strong> — TikTok Shop is the
              fastest-growing social commerce platform globally
            </span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Core Concepts
        </h2>

        <h3 className="font-display font-semibold text-amber mb-2">
          The For You Page Algorithm
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          The FYP algorithm evaluates each video independently through a series
          of signals. When you publish a video, TikTok shows it to a small
          batch of users (typically a few hundred). If those viewers engage
          positively, TikTok expands distribution to larger batches. This
          process continues until the engagement rate drops below a threshold.
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          The primary ranking signals are:
        </p>
        <ul className="space-y-2 text-sm text-slate-300 mb-3">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Watch Time</strong> — The most important signal. Videos
              watched to completion or rewatched get massive distribution.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Shares</strong> — Sharing a video is the strongest
              engagement action, signaling high value to the algorithm.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Comments</strong> — Both volume and velocity of comments
              boost distribution.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Saves</strong> — Indicates the content has lasting value
              worth revisiting.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Profile Visits</strong> — When a viewer visits your profile
              after watching, it signals strong interest.
            </span>
          </li>
        </ul>

        <h3 className="font-display font-semibold text-amber mb-2">
          Trend Mechanics
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          TikTok trends are sounds, effects, formats, or concepts that gain
          rapid popularity. The algorithm actively promotes content using
          trending elements. Jump on trends within the first 24-72 hours for
          maximum impact. The key is to put your unique brand spin on the trend
          rather than copying it exactly. Use the TikTok Creative Center to
          discover trending sounds and hashtags in real time.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2">
          Content Hooks
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          You have roughly 0.5-1 second to capture attention on TikTok. Strong
          hooks include:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-sm mb-1">
              Pattern Interrupt
            </h3>
            <p className="text-xs text-slate-400">
              Start with an unexpected visual, sound, or statement that breaks
              the scroll pattern
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-sm mb-1">
              Open Loop
            </h3>
            <p className="text-xs text-slate-400">
              &quot;Wait until the end&quot; or starting mid-action creates
              curiosity that drives watch time
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-sm mb-1">
              Bold Claim
            </h3>
            <p className="text-xs text-slate-400">
              &quot;This one trick doubled our sales&quot; — provokes curiosity
              and emotional response
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-sm mb-1">
              Relatable Scenario
            </h3>
            <p className="text-xs text-slate-400">
              Starting with a common frustration or situation your audience
              immediately recognizes
            </p>
          </div>
        </div>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          TikTok SEO
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          TikTok is increasingly used as a search engine, especially by Gen Z.
          Optimize your content for TikTok search by including keywords in your
          captions, on-screen text, and spoken audio. Use the search bar to
          research popular queries in your niche. Add relevant hashtags as
          keyword signals. TikTok indexes all of these elements to surface
          content in search results.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Strategy &amp; Planning
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          A TikTok strategy must balance trend responsiveness with consistent
          brand messaging. The platform rewards volume, experimentation, and
          speed.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2">
          Content Categories
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Organize your TikTok content into three buckets:
        </p>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Hero Content (10%)</strong> — High-production tentpole
              videos designed for maximum reach and brand awareness
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Hub Content (30%)</strong> — Recurring series and formats
              that build audience loyalty and expectations
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Help Content (60%)</strong> — Educational, how-to, and
              tip-based content that answers common questions
            </span>
          </li>
        </ul>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Posting Volume &amp; Frequency
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          TikTok rewards volume more than any other platform. During growth
          phases, aim for 1-3 posts per day. Since each video is evaluated
          independently, more posts mean more chances to go viral. Once you
          establish a baseline, analyze which posting times generate the
          strongest initial engagement and optimize your schedule accordingly.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2">
          TikTok Shop Strategy
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          TikTok Shop allows you to sell products directly through the app via
          shoppable videos, live shopping events, and a dedicated shop tab. The
          platform actively promotes shoppable content in the algorithm. To
          succeed with TikTok Shop, create authentic product demonstrations,
          leverage affiliate creators, and run live shopping sessions during
          peak hours.
        </p>

        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Creator Collaboration Framework
          </h3>
          <p className="text-xs md:text-sm text-slate-400">
            Partner with TikTok creators who genuinely align with your brand.
            Use TikTok Creator Marketplace to find creators by audience
            demographics, engagement rates, and content style. Give creators
            creative freedom — they know what resonates with their audience
            better than any brand brief.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Execution &amp; Implementation
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          TikTok execution is about speed, experimentation, and iteration.
          Perfectionism is the enemy of TikTok success.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2">
          Video Production Tips
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Film vertically (9:16 ratio). Use natural lighting or a simple ring
          light. Keep videos short (15-30 seconds for maximum completion rate).
          Add on-screen text for viewers watching without sound (up to 50% of
          TikTok viewing is muted). Use trending sounds when they align with
          your content. Edit in the TikTok app or CapCut for native-feeling
          content.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2">
          Scripting for TikTok
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Script your hooks and key talking points, but keep delivery
          conversational. The structure for high-performing TikToks is: Hook
          (0-1 second) &rarr; Context (1-5 seconds) &rarr; Value Delivery
          (5-20 seconds) &rarr; Payoff or CTA (final 2-3 seconds). Avoid
          long intros — get to the point immediately.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2">
          TikTok Ads Manager
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          TikTok Ads Manager offers several ad formats:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-sm mb-1">
              In-Feed Ads
            </h3>
            <p className="text-xs text-slate-400">
              Appear in the For You feed. Must feel native — use UGC-style
              creative for best results.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-sm mb-1">
              Spark Ads
            </h3>
            <p className="text-xs text-slate-400">
              Boost existing organic posts or creator content. Highest ROAS due
              to social proof.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-sm mb-1">
              TopView Ads
            </h3>
            <p className="text-xs text-slate-400">
              First ad users see when opening TikTok. Premium placement for
              maximum brand awareness.
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display font-semibold text-sm mb-1">
              Shopping Ads
            </h3>
            <p className="text-xs text-slate-400">
              Product-focused ads that drive directly to TikTok Shop or your
              website for purchase.
            </p>
          </div>
        </div>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Community Engagement
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Reply to comments with video responses — these often go viral and
          show the algorithm you are an active creator. Pin your best comments
          to the top. Stitch and Duet with trending content to ride the wave of
          existing momentum. Go live regularly to deepen connections and boost
          your account&apos;s standing with the algorithm.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Measurement &amp; Optimization
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          TikTok Analytics (available on Business and Creator accounts) provides
          detailed performance data. Use it to refine your content strategy
          continuously.
        </p>

        <h3 className="font-display font-semibold text-amber mb-2">
          Key Metrics
        </h3>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Average Watch Time</strong> — How long viewers watch before
              scrolling. The single most important metric for TikTok content.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Completion Rate</strong> — Percentage of viewers who watch
              the entire video. Higher rates trigger broader distribution.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Share Rate</strong> — Shares per 1,000 views. The
              strongest signal of content worth to the algorithm.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Traffic Source</strong> — For You Page vs. Following vs.
              Search. Shows how your content is being discovered.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald mt-0.5">&#10003;</span>
            <span>
              <strong>Follower Activity</strong> — When your audience is most
              active. Optimize posting times to these windows.
            </span>
          </li>
        </ul>

        <h3 className="font-display font-semibold text-amber mb-2 mt-4">
          Optimization Strategies
        </h3>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
          Analyze your top 10% of videos by views each month. Identify the
          hooks, formats, sounds, and topics that drove outperformance. Create
          more variations of winning content. Kill formats that consistently
          underperform after 10+ attempts. Test one variable at a time: hook
          style, video length, posting time, or sound choice.
        </p>

        <div className="glass rounded-xl p-4 mt-4">
          <p className="text-xs text-slate-400">
            <strong className="text-slate-300">Key Takeaway:</strong> TikTok
            rewards authenticity, speed, and volume. Focus on strong hooks,
            trend participation, and high completion rates. Every video is a
            fresh opportunity regardless of your follower count. Think like an
            entertainer first and a marketer second — the sales will follow.
          </p>
        </div>
      </section>
    </>
  );
}

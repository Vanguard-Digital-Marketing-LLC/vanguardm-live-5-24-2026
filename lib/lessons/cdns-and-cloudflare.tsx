export default function CdnsAndCloudflareLesson() {
  return (
    <div className="space-y-10">
      {/* 1. What is a CDN */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          What is a CDN?
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
          A CDN (Content Delivery Network) is a globally distributed network of servers that
          delivers your website&apos;s content to visitors from the server closest to their
          physical location. Instead of every visitor hitting your single origin server (which
          might be in Dallas, Texas), a CDN copies your content to dozens or hundreds of
          servers worldwide called &ldquo;edge nodes&rdquo; or &ldquo;points of presence&rdquo;
          (PoPs).
        </p>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            How a CDN Works
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-3">
            Imagine your origin server is in Texas. Without a CDN, a visitor from Tokyo has to
            send a request across the Pacific Ocean and back &mdash; adding hundreds of
            milliseconds of latency. With a CDN:
          </p>
          <ol className="text-sm md:text-base text-slate-300 leading-relaxed list-decimal list-inside space-y-2">
            <li>A visitor in Tokyo requests your page</li>
            <li>The CDN routes the request to the nearest edge server (e.g., Tokyo PoP)</li>
            <li>If the edge server has a cached copy, it responds immediately &mdash; no need to contact Texas</li>
            <li>If not cached, the edge server fetches it from your origin, caches it, then serves it</li>
            <li>Subsequent visitors in the region get the cached version instantly</li>
          </ol>
        </div>
        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            Key CDN Benefits
          </h3>
          <ul className="text-sm md:text-base text-slate-300 leading-relaxed list-disc list-inside space-y-1">
            <li><strong>Faster load times</strong> &mdash; Content served from nearby servers</li>
            <li><strong>Reduced server load</strong> &mdash; Origin handles fewer requests</li>
            <li><strong>DDoS protection</strong> &mdash; Distributed network absorbs attacks</li>
            <li><strong>High availability</strong> &mdash; If one server fails, another takes over</li>
            <li><strong>Bandwidth savings</strong> &mdash; Caching reduces data transfer from origin</li>
          </ul>
        </div>
      </section>

      {/* 2. Why CDNs Matter for SEO */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Why CDNs Matter for SEO
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
          Page speed is a confirmed Google ranking factor, and CDNs are one of the most
          effective ways to improve it. Here&apos;s exactly how a CDN impacts your SEO:
        </p>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            TTFB (Time to First Byte)
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            TTFB measures how long it takes for a browser to receive the first byte of data from
            the server. CDNs dramatically reduce TTFB by serving cached content from edge servers
            close to the user. A good TTFB is under 800ms, and CDNs can often bring this under
            100ms for cached content.
          </p>
        </div>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            Core Web Vitals Impact
          </h3>
          <ul className="text-sm md:text-base text-slate-300 leading-relaxed list-disc list-inside space-y-1">
            <li><strong>LCP</strong> &mdash; Faster delivery of hero images and large content elements</li>
            <li><strong>INP</strong> &mdash; Reduced server latency means faster round-trips for interactive features</li>
            <li><strong>CLS</strong> &mdash; Faster resource loading reduces late-loading shifts</li>
          </ul>
        </div>
        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            Crawl Efficiency
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Faster server response times mean Googlebot can crawl more pages within your crawl
            budget. Google has noted that improving server response time can lead to more
            efficient crawling of your site.
          </p>
        </div>
      </section>

      {/* 3. What is Cloudflare */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          What is Cloudflare?
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
          Cloudflare is one of the world&apos;s largest CDN and web security providers, with
          over 300 data centers across 100+ countries. It offers a generous free tier that
          includes CDN caching, DDoS protection, SSL certificates, and DNS management &mdash;
          making it an excellent choice for businesses of all sizes.
        </p>
        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            Cloudflare Services Overview
          </h3>
          <ul className="text-sm md:text-base text-slate-300 leading-relaxed list-disc list-inside space-y-1">
            <li><strong>CDN &amp; Caching</strong> &mdash; Global content delivery and intelligent caching</li>
            <li><strong>DNS</strong> &mdash; Fast, authoritative DNS with DNSSEC support</li>
            <li><strong>SSL/TLS</strong> &mdash; Free universal SSL certificates</li>
            <li><strong>DDoS Protection</strong> &mdash; Automatic attack mitigation</li>
            <li><strong>Web Application Firewall (WAF)</strong> &mdash; Protection against common vulnerabilities</li>
            <li><strong>Bot Management</strong> &mdash; Block malicious bots while allowing search engines</li>
            <li><strong>Analytics</strong> &mdash; Traffic and performance insights</li>
            <li><strong>Workers</strong> &mdash; Serverless computing at the edge</li>
          </ul>
        </div>
      </section>

      {/* 4. Step 1: Create a Cloudflare Account */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Step 1: Create a Cloudflare Account
        </h2>
        <div className="glass rounded-xl p-4">
          <ol className="text-sm md:text-base text-slate-300 leading-relaxed list-decimal list-inside space-y-2">
            <li>
              Go to{" "}
              <a href="https://dash.cloudflare.com/sign-up" className="text-emerald hover:underline" target="_blank" rel="noopener noreferrer">
                dash.cloudflare.com/sign-up
              </a>
            </li>
            <li>Enter your email address and create a strong password</li>
            <li>Verify your email address by clicking the link Cloudflare sends you</li>
            <li>You&apos;ll land on the Cloudflare dashboard &mdash; the free plan includes everything you need to get started</li>
          </ol>
        </div>
      </section>

      {/* 5. Step 2: Add Your Domain */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Step 2: Add Your Domain
        </h2>
        <div className="glass rounded-xl p-4 mb-4">
          <ol className="text-sm md:text-base text-slate-300 leading-relaxed list-decimal list-inside space-y-2">
            <li>From the Cloudflare dashboard, click <strong>&ldquo;Add a Site&rdquo;</strong></li>
            <li>Enter your domain name (e.g., <code className="text-emerald">example.com</code>) &mdash; without www or https</li>
            <li>Select the <strong>Free plan</strong> (you can upgrade later if needed)</li>
            <li>Cloudflare will automatically scan your existing DNS records</li>
            <li>Review the DNS records &mdash; make sure all your existing records are present</li>
            <li>Ensure the <strong>orange cloud icon</strong> (proxy enabled) is on for your A and CNAME records pointing to your web server</li>
          </ol>
        </div>
        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            Proxy On vs. Off (Orange vs. Grey Cloud)
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            <strong>Orange cloud (Proxied)</strong> &mdash; Traffic flows through Cloudflare, enabling CDN
            caching, DDoS protection, and SSL. Use this for your web traffic records.
            <br />
            <strong>Grey cloud (DNS Only)</strong> &mdash; Cloudflare only provides DNS resolution; no CDN or
            security features. Use this for records that should bypass Cloudflare (e.g., email MX records).
          </p>
        </div>
      </section>

      {/* 6. Step 3: Update DNS Nameservers */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Step 3: Update DNS Nameservers
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
          After adding your domain, Cloudflare will give you two nameservers (e.g.,{" "}
          <code className="text-emerald">ada.ns.cloudflare.com</code> and{" "}
          <code className="text-emerald">bob.ns.cloudflare.com</code>). You need to update your
          domain registrar to point to these nameservers.
        </p>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            How to Change Nameservers
          </h3>
          <ol className="text-sm md:text-base text-slate-300 leading-relaxed list-decimal list-inside space-y-2">
            <li>Log in to your domain registrar (GoDaddy, Namecheap, Google Domains, etc.)</li>
            <li>Find the DNS or Nameserver settings for your domain</li>
            <li>Replace the existing nameservers with the two Cloudflare nameservers</li>
            <li>Save the changes</li>
            <li>Return to Cloudflare and click <strong>&ldquo;Check Nameservers&rdquo;</strong></li>
          </ol>
        </div>
        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            Important Notes
          </h3>
          <ul className="text-sm md:text-base text-slate-300 leading-relaxed list-disc list-inside space-y-1">
            <li>DNS propagation can take up to 24&ndash;48 hours, but usually completes within a few hours</li>
            <li>During propagation, some visitors may hit the old servers &mdash; this is normal</li>
            <li>Cloudflare will send you an email once your nameservers are verified</li>
            <li>Do NOT delete your old DNS records at your registrar &mdash; just change the nameservers</li>
          </ul>
        </div>
      </section>

      {/* 7. Step 4: Configure SSL/TLS */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Step 4: Configure SSL/TLS
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
          Cloudflare provides free SSL certificates, but you need to configure the right
          encryption mode to avoid issues.
        </p>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            SSL/TLS Modes Explained
          </h3>
          <ul className="text-sm md:text-base text-slate-300 leading-relaxed list-disc list-inside space-y-2">
            <li>
              <strong>Off</strong> &mdash; No encryption. Never use this.
            </li>
            <li>
              <strong>Flexible</strong> &mdash; Encrypts between visitor and Cloudflare, but NOT between
              Cloudflare and your server. Can cause redirect loops.
            </li>
            <li>
              <strong>Full</strong> &mdash; Encrypts both connections, but doesn&apos;t validate your
              origin certificate.
            </li>
            <li>
              <strong className="text-emerald">Full (Strict)</strong> &mdash; Encrypts both connections AND validates your origin
              certificate. <strong>This is the recommended setting.</strong>
            </li>
          </ul>
        </div>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            How to Set Full (Strict) Mode
          </h3>
          <ol className="text-sm md:text-base text-slate-300 leading-relaxed list-decimal list-inside space-y-2">
            <li>In the Cloudflare dashboard, go to <strong>SSL/TLS &rarr; Overview</strong></li>
            <li>Select <strong>Full (Strict)</strong></li>
            <li>If your origin server doesn&apos;t have an SSL certificate, go to <strong>SSL/TLS &rarr; Origin Server</strong> and create a free Cloudflare Origin Certificate</li>
            <li>Install the origin certificate on your web server</li>
            <li>Also enable <strong>&ldquo;Always Use HTTPS&rdquo;</strong> under SSL/TLS &rarr; Edge Certificates</li>
          </ol>
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-xs text-slate-500">
            Source: <a href="https://developers.cloudflare.com/ssl/" className="text-emerald hover:underline" target="_blank" rel="noopener noreferrer">Cloudflare Docs &mdash; SSL/TLS</a>
          </p>
        </div>
      </section>

      {/* 8. Step 5: Enable Caching */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Step 5: Enable Caching
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
          Caching is where the CDN magic happens. Cloudflare automatically caches static assets
          (images, CSS, JavaScript), but you can fine-tune the behavior for better performance.
        </p>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Caching Configuration
          </h3>
          <ol className="text-sm md:text-base text-slate-300 leading-relaxed list-decimal list-inside space-y-2">
            <li>Go to <strong>Caching &rarr; Configuration</strong> in the dashboard</li>
            <li>Set <strong>Caching Level</strong> to <strong>Standard</strong> (recommended for most sites)</li>
            <li>Set <strong>Browser Cache TTL</strong> to <strong>Respect Existing Headers</strong> or a specific duration like 4 hours</li>
            <li>Enable <strong>&ldquo;Always Online&rdquo;</strong> &mdash; shows cached pages if your origin goes down</li>
          </ol>
        </div>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            Cache Rules (Replacing Page Rules)
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-2">
            Cloudflare now uses Cache Rules instead of the older Page Rules system. Cache Rules
            let you customize caching behavior for specific URL patterns:
          </p>
          <ul className="text-sm md:text-base text-slate-300 leading-relaxed list-disc list-inside space-y-1">
            <li><strong>Cache Everything</strong> &mdash; Cache HTML pages in addition to static assets (useful for static sites)</li>
            <li><strong>Bypass Cache</strong> &mdash; Skip caching for dynamic pages (e.g., login, checkout)</li>
            <li><strong>Custom TTL</strong> &mdash; Set specific cache durations per URL pattern</li>
          </ul>
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-xs text-slate-500">
            Source: <a href="https://developers.cloudflare.com/cache/" className="text-emerald hover:underline" target="_blank" rel="noopener noreferrer">Cloudflare Docs &mdash; Caching</a>
          </p>
        </div>
      </section>

      {/* 9. Step 6: Enable Auto Minify & Brotli */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Step 6: Enable Auto Minify &amp; Brotli
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
          These settings reduce the size of files sent to visitors, directly improving load times.
        </p>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Auto Minify
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-2">
            Auto Minify removes unnecessary whitespace and comments from your HTML, CSS, and
            JavaScript files, reducing file sizes without affecting functionality.
          </p>
          <ol className="text-sm md:text-base text-slate-300 leading-relaxed list-decimal list-inside space-y-1">
            <li>Go to <strong>Speed &rarr; Optimization &rarr; Content Optimization</strong></li>
            <li>Enable Auto Minify for <strong>JavaScript</strong>, <strong>CSS</strong>, and <strong>HTML</strong></li>
          </ol>
        </div>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-2">
            Brotli Compression
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-2">
            Brotli is a modern compression algorithm developed by Google that compresses files
            15&ndash;25% better than gzip. Cloudflare supports Brotli on all plans.
          </p>
          <ol className="text-sm md:text-base text-slate-300 leading-relaxed list-decimal list-inside space-y-1">
            <li>Go to <strong>Speed &rarr; Optimization &rarr; Content Optimization</strong></li>
            <li>Ensure <strong>Brotli</strong> is toggled on (it&apos;s enabled by default)</li>
          </ol>
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-xs text-slate-500">
            Source: <a href="https://developers.cloudflare.com/speed/" className="text-emerald hover:underline" target="_blank" rel="noopener noreferrer">Cloudflare Docs &mdash; Speed</a>
          </p>
        </div>
      </section>

      {/* 10. Cloudflare Performance Features */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Cloudflare Performance Features
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
          Beyond basic CDN caching, Cloudflare offers several advanced performance features
          that can further boost your site speed.
        </p>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            Rocket Loader
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Rocket Loader defers the loading of all JavaScript on your page until after the
            page&apos;s main content has rendered. This can significantly improve paint times
            and perceived load speed. Enable it under <strong>Speed &rarr; Optimization &rarr; Content Optimization</strong>.
            Note: test thoroughly, as it can occasionally break complex JavaScript applications.
          </p>
        </div>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            Early Hints (103)
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Early Hints sends preload and preconnect headers to the browser before the full
            response is ready. While Cloudflare is still waiting for your origin server to
            respond, it tells the browser to start downloading critical CSS, fonts, and other
            resources. Enable it under <strong>Speed &rarr; Optimization &rarr; Protocol Optimization</strong>.
          </p>
        </div>
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            Polish (Pro+ Plan)
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Polish automatically optimizes images served through Cloudflare. It can compress
            images losslessly or with lossy compression, and convert images to WebP format for
            browsers that support it. This feature requires the Pro plan or higher.
          </p>
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-xs text-slate-500">
            Source: <a href="https://developers.cloudflare.com/speed/" className="text-emerald hover:underline" target="_blank" rel="noopener noreferrer">Cloudflare Docs &mdash; Speed</a>, <a href="https://www.cloudflare.com/learning/" className="text-emerald hover:underline" target="_blank" rel="noopener noreferrer">Cloudflare Learning Center</a>
          </p>
        </div>
      </section>

      {/* 11. Troubleshooting Common Issues */}
      <section>
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-emerald">
          Troubleshooting Common Issues
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
          Cloudflare is straightforward to set up, but a few common issues can trip up
          beginners. Here&apos;s how to solve them.
        </p>

        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            SSL Errors (525, 526)
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-2">
            <strong>Error 525 &mdash; SSL Handshake Failed:</strong> Your origin server doesn&apos;t
            have a valid SSL certificate, or it&apos;s not configured correctly. Install a Cloudflare
            Origin Certificate or a certificate from a trusted CA.
          </p>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            <strong>Error 526 &mdash; Invalid SSL Certificate:</strong> You&apos;re using Full (Strict)
            mode but your origin certificate is self-signed or expired. Either install a valid
            certificate or temporarily switch to Full mode (not recommended long-term).
          </p>
        </div>

        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            Too Many Redirects (ERR_TOO_MANY_REDIRECTS)
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-2">
            This is the most common Cloudflare issue. It usually happens when:
          </p>
          <ul className="text-sm md:text-base text-slate-300 leading-relaxed list-disc list-inside space-y-1 mb-2">
            <li>SSL mode is set to <strong>Flexible</strong> but your origin server forces HTTPS, creating an infinite redirect loop</li>
            <li>Your origin has a redirect from HTTP to HTTPS, and Cloudflare connects to your origin over HTTP</li>
          </ul>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            <strong>Fix:</strong> Change the SSL mode to <strong>Full</strong> or <strong>Full (Strict)</strong>
            and ensure your origin server has a valid SSL certificate.
          </p>
        </div>

        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            Stale Content After Updates
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            If you update your site but visitors still see old content, you need to purge the
            Cloudflare cache. Go to <strong>Caching &rarr; Configuration &rarr; Purge Cache</strong>.
            You can purge individual URLs or purge everything. Use &ldquo;Purge Everything&rdquo;
            sparingly, as it temporarily increases origin server load.
          </p>
        </div>

        <div className="glass rounded-xl p-4">
          <h3 className="font-display font-semibold text-amber mb-1">
            Cloudflare Blocking Legitimate Traffic
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            If legitimate users or services are being blocked, check the <strong>Security &rarr;
            Events</strong> log to see what triggered the block. You can create WAF exception
            rules or reduce the security level under <strong>Security &rarr; Settings</strong>.
            Make sure you&apos;re not accidentally blocking search engine crawlers.
          </p>
        </div>
      </section>
    </div>
  );
}

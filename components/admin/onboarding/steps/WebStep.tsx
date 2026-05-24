"use client";

const inputClass =
  "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:border-emerald-400/50 focus:outline-none";

export default function WebStep({
  data,
  onChange,
}: {
  data: Record<string, any>;
  onChange: (field: string, value: any) => void;
}) {
  const v = (field: string) => data[field] ?? "";

  const toggleMulti = (field: string, val: string) => {
    const arr: string[] = data[field] || [];
    const checked = arr.includes(val);
    onChange(
      field,
      checked ? arr.filter((x: string) => x !== val) : [...arr, val]
    );
  };

  const isChecked = (field: string, val: string) =>
    (data[field] || []).includes(val);

  const styleOptions = [
    "Modern/Clean",
    "Bold/Colorful",
    "Minimal",
    "Corporate",
    "Creative/Artistic",
    "Warm/Welcoming",
  ];

  const requiredPagesOptions = [
    "Home",
    "About",
    "Services",
    "Contact",
    "Blog",
    "Portfolio/Gallery",
    "Team",
    "Testimonials",
    "FAQ",
    "Pricing",
    "Careers",
    "Privacy Policy",
    "Terms",
  ];

  const featureOptions = [
    "Contact Forms",
    "Live Chat",
    "Booking/Scheduling",
    "E-commerce",
    "Client Portal",
    "Blog",
    "Photo Gallery",
    "Video Gallery",
    "Team Directory",
    "Testimonials/Reviews",
    "Newsletter Signup",
    "Social Media Feeds",
    "Maps/Directions",
    "Search",
    "Multi-language",
  ];

  return (
    <div className="space-y-8">
      <p className="text-xs text-slate-500">
        Fields marked <span className="text-red-400">*</span> are required.
      </p>
      {/* Current Site */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Current Site
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="web-current-url" className="block text-xs text-slate-400 mb-1">
              Website URL <span className="text-red-400">*</span>
            </label>
            <input
              id="web-current-url"
              type="url"
              className={inputClass}
              placeholder="https://example.com"
              value={v("web_current_url")}
              onChange={(e) => onChange("web_current_url", e.target.value)}
            />
            <p className="text-xs text-slate-500 mt-1">
              Auto-filled from Business Information if provided.
            </p>
          </div>
          <div>
            <label htmlFor="web-platform" className="block text-xs text-slate-400 mb-1">
              Platform / CMS
            </label>
            <select
              id="web-platform"
              className={inputClass}
              value={v("web_platform")}
              onChange={(e) => onChange("web_platform", e.target.value)}
            >
              <option value="">Select platform</option>
              <option value="WordPress">WordPress</option>
              <option value="Squarespace">Squarespace</option>
              <option value="Wix">Wix</option>
              <option value="Shopify">Shopify</option>
              <option value="Custom">Custom</option>
              <option value="None">None</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="web-hosting-provider" className="block text-xs text-slate-400 mb-1">
              Hosting Provider
            </label>
            <input
              id="web-hosting-provider"
              type="text"
              className={inputClass}
              placeholder="e.g. GoDaddy, Bluehost, AWS"
              value={v("web_hosting_provider")}
              onChange={(e) => onChange("web_hosting_provider", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="web-domain-registrar" className="block text-xs text-slate-400 mb-1">
              Domain Registrar
            </label>
            <input
              id="web-domain-registrar"
              type="text"
              className={inputClass}
              placeholder="e.g. GoDaddy, Namecheap, Cloudflare"
              value={v("web_domain_registrar")}
              onChange={(e) =>
                onChange("web_domain_registrar", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="web-admin-access" className="block text-xs text-slate-400 mb-1">
              Do you have admin access?
            </label>
            <select
              id="web-admin-access"
              className={inputClass}
              value={v("web_admin_access")}
              onChange={(e) => onChange("web_admin_access", e.target.value)}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="web-likes" className="block text-xs text-slate-400 mb-1">
            What do you like about your current site?
          </label>
          <textarea
            id="web-likes"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="Features, layout, or content you want to keep"
            value={v("web_likes")}
            onChange={(e) => onChange("web_likes", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="web-dislikes" className="block text-xs text-slate-400 mb-1">
            What do you dislike about your current site?
          </label>
          <textarea
            id="web-dislikes"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="What needs to change or improve?"
            value={v("web_dislikes")}
            onChange={(e) => onChange("web_dislikes", e.target.value)}
          />
        </div>
      </div>

      {/* Design Preferences */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Design Preferences
        </h3>
        <div>
          <span className="block text-xs text-slate-400 mb-1">
            Style Preferences
          </span>
          <div className="flex flex-wrap gap-2">
            {styleOptions.map((style) => {
              const checked = isChecked("web_style_preferences", style);
              return (
                <label
                  key={style}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                    checked
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      : "bg-white/[0.03] border-white/10 text-slate-400 hover:border-white/20"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={checked}
                    onChange={() =>
                      toggleMulti("web_style_preferences", style)
                    }
                  />
                  {style}
                </label>
              );
            })}
          </div>
        </div>
        <div>
          <label htmlFor="web-example-sites" className="block text-xs text-slate-400 mb-1">
            Example Sites You Like
          </label>
          <textarea
            id="web-example-sites"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="List URLs of websites you admire and why"
            value={v("web_example_sites")}
            onChange={(e) => onChange("web_example_sites", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="web-color-scheme" className="block text-xs text-slate-400 mb-1">
              Preferred Color Scheme
            </label>
            <input
              id="web-color-scheme"
              type="text"
              className={inputClass}
              placeholder="e.g. Blue and white, earth tones"
              value={v("web_color_scheme")}
              onChange={(e) => onChange("web_color_scheme", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="web-brand-guidelines" className="block text-xs text-slate-400 mb-1">
              Have brand guidelines?
            </label>
            <select
              id="web-brand-guidelines"
              className={inputClass}
              value={v("web_brand_guidelines")}
              onChange={(e) =>
                onChange("web_brand_guidelines", e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="web-logo-files" className="block text-xs text-slate-400 mb-1">
              Have logo files?
            </label>
            <select
              id="web-logo-files"
              className={inputClass}
              value={v("web_logo_files")}
              onChange={(e) => onChange("web_logo_files", e.target.value)}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Content
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="web-page-count" className="block text-xs text-slate-400 mb-1">
              Estimated Page Count
            </label>
            <input
              id="web-page-count"
              type="number"
              className={inputClass}
              placeholder="e.g. 10"
              value={v("web_page_count")}
              onChange={(e) => onChange("web_page_count", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="web-content-status" className="block text-xs text-slate-400 mb-1">
              Existing Content Status
            </label>
            <select
              id="web-content-status"
              className={inputClass}
              value={v("web_content_status")}
              onChange={(e) => onChange("web_content_status", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Have all content">Have all content</option>
              <option value="Have some content">Have some content</option>
              <option value="Need all content">Need all content</option>
            </select>
          </div>
        </div>
        <div>
          <span className="block text-xs text-slate-400 mb-1">
            Required Pages
          </span>
          <div className="flex flex-wrap gap-2">
            {requiredPagesOptions.map((page) => {
              const checked = isChecked("web_required_pages", page);
              return (
                <label
                  key={page}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                    checked
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      : "bg-white/[0.03] border-white/10 text-slate-400 hover:border-white/20"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={checked}
                    onChange={() => toggleMulti("web_required_pages", page)}
                  />
                  {page}
                </label>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="web-need-copywriting" className="block text-xs text-slate-400 mb-1">
              Need copywriting?
            </label>
            <select
              id="web-need-copywriting"
              className={inputClass}
              value={v("web_need_copywriting")}
              onChange={(e) =>
                onChange("web_need_copywriting", e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="web-need-photography" className="block text-xs text-slate-400 mb-1">
              Need photography?
            </label>
            <select
              id="web-need-photography"
              className={inputClass}
              value={v("web_need_photography")}
              onChange={(e) =>
                onChange("web_need_photography", e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="web-need-video" className="block text-xs text-slate-400 mb-1">
              Need video?
            </label>
            <select
              id="web-need-video"
              className={inputClass}
              value={v("web_need_video")}
              onChange={(e) => onChange("web_need_video", e.target.value)}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
      </div>

      {/* Functionality */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Functionality
        </h3>
        <div>
          <span className="block text-xs text-slate-400 mb-1">
            Feature Checklist
          </span>
          <div className="flex flex-wrap gap-2">
            {featureOptions.map((feature) => {
              const checked = isChecked("web_features", feature);
              return (
                <label
                  key={feature}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                    checked
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      : "bg-white/[0.03] border-white/10 text-slate-400 hover:border-white/20"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={checked}
                    onChange={() => toggleMulti("web_features", feature)}
                  />
                  {feature}
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* Integrations */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Integrations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="web-ga4" className="block text-xs text-slate-400 mb-1">
              GA4 Tracking?
            </label>
            <select
              id="web-ga4"
              className={inputClass}
              value={v("web_ga4")}
              onChange={(e) => onChange("web_ga4", e.target.value)}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          {v("web_ga4") === "yes" && (
            <div>
              <label htmlFor="web-ga4-id" className="block text-xs text-slate-400 mb-1">
                GA4 Measurement ID
              </label>
              <input
                id="web-ga4-id"
                type="text"
                className={inputClass}
                placeholder="G-XXXXXXXXXX"
                value={v("web_ga4_id")}
                onChange={(e) => onChange("web_ga4_id", e.target.value)}
              />
            </div>
          )}
          <div>
            <label htmlFor="web-gtm" className="block text-xs text-slate-400 mb-1">
              GTM?
            </label>
            <select
              id="web-gtm"
              className={inputClass}
              value={v("web_gtm")}
              onChange={(e) => onChange("web_gtm", e.target.value)}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          {v("web_gtm") === "yes" && (
            <div>
              <label htmlFor="web-gtm-id" className="block text-xs text-slate-400 mb-1">
                GTM Container ID
              </label>
              <input
                id="web-gtm-id"
                type="text"
                className={inputClass}
                placeholder="GTM-XXXXXXX"
                value={v("web_gtm_id")}
                onChange={(e) => onChange("web_gtm_id", e.target.value)}
              />
            </div>
          )}
          <div>
            <label htmlFor="web-crm" className="block text-xs text-slate-400 mb-1">
              CRM Name
            </label>
            <input
              id="web-crm"
              type="text"
              className={inputClass}
              placeholder="e.g. HubSpot, Salesforce"
              value={v("web_crm")}
              onChange={(e) => onChange("web_crm", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="web-email-platform" className="block text-xs text-slate-400 mb-1">
              Email Marketing Platform
            </label>
            <input
              id="web-email-platform"
              type="text"
              className={inputClass}
              placeholder="e.g. Mailchimp, Constant Contact"
              value={v("web_email_platform")}
              onChange={(e) => onChange("web_email_platform", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="web-payment-processor" className="block text-xs text-slate-400 mb-1">
              Payment Processor
            </label>
            <input
              id="web-payment-processor"
              type="text"
              className={inputClass}
              placeholder="e.g. Stripe, PayPal, Square"
              value={v("web_payment_processor")}
              onChange={(e) =>
                onChange("web_payment_processor", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="web-scheduling-tool" className="block text-xs text-slate-400 mb-1">
              Scheduling Tool
            </label>
            <input
              id="web-scheduling-tool"
              type="text"
              className={inputClass}
              placeholder="e.g. Calendly, Acuity"
              value={v("web_scheduling_tool")}
              onChange={(e) => onChange("web_scheduling_tool", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="web-chat-tool" className="block text-xs text-slate-400 mb-1">
              Chat Tool
            </label>
            <input
              id="web-chat-tool"
              type="text"
              className={inputClass}
              placeholder="e.g. Tawk.to, Intercom"
              value={v("web_chat_tool")}
              onChange={(e) => onChange("web_chat_tool", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="web-review-platform" className="block text-xs text-slate-400 mb-1">
              Review Platform
            </label>
            <input
              id="web-review-platform"
              type="text"
              className={inputClass}
              placeholder="e.g. Google Reviews, Yelp"
              value={v("web_review_platform")}
              onChange={(e) => onChange("web_review_platform", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* CMS & Training */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          CMS & Training
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="web-cms-preference" className="block text-xs text-slate-400 mb-1">
              CMS Preference
            </label>
            <select
              id="web-cms-preference"
              className={inputClass}
              value={v("web_cms_preference")}
              onChange={(e) => onChange("web_cms_preference", e.target.value)}
            >
              <option value="">Select</option>
              <option value="We'll manage it">
                We&apos;ll manage it
              </option>
              <option value="Want to make edits">Want to make edits</option>
              <option value="Full control needed">Full control needed</option>
            </select>
          </div>
          <div>
            <label htmlFor="web-training-needed" className="block text-xs text-slate-400 mb-1">
              Training needed?
            </label>
            <select
              id="web-training-needed"
              className={inputClass}
              value={v("web_training_needed")}
              onChange={(e) => onChange("web_training_needed", e.target.value)}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="web-editor-count" className="block text-xs text-slate-400 mb-1">
              Number of Editors
            </label>
            <input
              id="web-editor-count"
              type="number"
              className={inputClass}
              placeholder="How many people need CMS access?"
              value={v("web_editor_count")}
              onChange={(e) => onChange("web_editor_count", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Timeline
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="web-launch-deadline" className="block text-xs text-slate-400 mb-1">
              Launch Deadline
            </label>
            <input
              id="web-launch-deadline"
              type="date"
              className={inputClass}
              value={v("web_launch_deadline")}
              onChange={(e) => onChange("web_launch_deadline", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="web-hard-deadline" className="block text-xs text-slate-400 mb-1">
              Hard deadline?
            </label>
            <select
              id="web-hard-deadline"
              className={inputClass}
              value={v("web_hard_deadline")}
              onChange={(e) => onChange("web_hard_deadline", e.target.value)}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="web-priority" className="block text-xs text-slate-400 mb-1">
              Priority Level
            </label>
            <select
              id="web-priority"
              className={inputClass}
              value={v("web_priority")}
              onChange={(e) => onChange("web_priority", e.target.value)}
            >
              <option value="">Select</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

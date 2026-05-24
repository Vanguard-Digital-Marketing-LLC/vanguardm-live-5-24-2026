"use client";

const inputClass =
  "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:border-emerald-400/50 focus:outline-none";

const platforms = [
  "Facebook",
  "Instagram",
  "Twitter/X",
  "LinkedIn",
  "TikTok",
  "YouTube",
  "Pinterest",
];

export default function SmaStep({
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

  const contentTypeOptions = [
    "Photos",
    "Videos/Reels",
    "Stories",
    "Carousels",
    "Infographics",
    "User-generated",
    "Behind-the-scenes",
    "Educational",
    "Promotional",
  ];

  const personalityOptions = [
    "Professional",
    "Friendly",
    "Humorous",
    "Educational",
    "Inspirational",
    "Bold",
    "Conversational",
  ];

  return (
    <div className="space-y-8">
      <p className="text-xs text-slate-500">
        Fields marked <span className="text-red-400">*</span> are required.
      </p>
      {/* Current Presence */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Current Presence
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {platforms.map((platform) => {
            const key = platform.toLowerCase().replace(/[\/\s]/g, "_");
            return (
              <div
                key={platform}
                className="rounded-lg border border-white/10 bg-white/[0.02] p-4 space-y-3"
              >
                <h4 className="text-sm font-medium text-white">{platform}</h4>
                <div>
                  <label htmlFor={`sma-${key}-url`} className="block text-xs text-slate-400 mb-1">
                    Profile URL
                  </label>
                  <input
                    id={`sma-${key}-url`}
                    type="text"
                    className={inputClass}
                    placeholder={`${platform} URL`}
                    value={v(`sma_${key}_url`)}
                    onChange={(e) =>
                      onChange(`sma_${key}_url`, e.target.value)
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={`sma-${key}-access`} className="block text-xs text-slate-400 mb-1">
                      Have access?
                    </label>
                    <select
                      id={`sma-${key}-access`}
                      className={inputClass}
                      value={v(`sma_${key}_access`)}
                      onChange={(e) =>
                        onChange(`sma_${key}_access`, e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`sma-${key}-followers`} className="block text-xs text-slate-400 mb-1">
                      Followers
                    </label>
                    <input
                      id={`sma-${key}-followers`}
                      type="number"
                      className={inputClass}
                      placeholder="0"
                      value={v(`sma_${key}_followers`)}
                      onChange={(e) =>
                        onChange(`sma_${key}_followers`, e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Account Access */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Account Access
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="sma-meta-business-access" className="block text-xs text-slate-400 mb-1">
              Meta Business Suite access?
            </label>
            <select
              id="sma-meta-business-access"
              className={inputClass}
              value={v("sma_meta_business_access")}
              onChange={(e) =>
                onChange("sma_meta_business_access", e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="sma-scheduling-tool" className="block text-xs text-slate-400 mb-1">
              Current Scheduling Tool
            </label>
            <input
              id="sma-scheduling-tool"
              type="text"
              className={inputClass}
              placeholder="e.g. Hootsuite, Buffer, Later"
              value={v("sma_scheduling_tool")}
              onChange={(e) => onChange("sma_scheduling_tool", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="sma-admin-emails" className="block text-xs text-slate-400 mb-1">
            Admin Contact Emails
          </label>
          <textarea
            id="sma-admin-emails"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="List emails of people with admin access to your social accounts"
            value={v("sma_admin_emails")}
            onChange={(e) => onChange("sma_admin_emails", e.target.value)}
          />
        </div>
      </div>

      {/* Content Strategy */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Content Strategy
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="sma-posting-frequency" className="block text-xs text-slate-400 mb-1">
              Desired Posting Frequency
            </label>
            <select
              id="sma-posting-frequency"
              className={inputClass}
              value={v("sma_posting_frequency")}
              onChange={(e) =>
                onChange("sma_posting_frequency", e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="Daily">Daily</option>
              <option value="3-5x/week">3-5x/week</option>
              <option value="1-2x/week">1-2x/week</option>
              <option value="A few per month">A few per month</option>
            </select>
          </div>
          <div>
            <label htmlFor="sma-content-library" className="block text-xs text-slate-400 mb-1">
              Existing content library?
            </label>
            <select
              id="sma-content-library"
              className={inputClass}
              value={v("sma_content_library")}
              onChange={(e) => onChange("sma_content_library", e.target.value)}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="sma-need-content-creation" className="block text-xs text-slate-400 mb-1">
              Need content creation?
            </label>
            <select
              id="sma-need-content-creation"
              className={inputClass}
              value={v("sma_need_content_creation")}
              onChange={(e) =>
                onChange("sma_need_content_creation", e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
        <div>
          <span className="block text-xs text-slate-400 mb-1">
            Content Types
          </span>
          <div className="flex flex-wrap gap-2">
            {contentTypeOptions.map((type) => {
              const checked = isChecked("sma_content_types", type);
              return (
                <label
                  key={type}
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
                    onChange={() => toggleMulti("sma_content_types", type)}
                  />
                  {type}
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* Brand Voice */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Brand Voice
        </h3>
        <div>
          <span className="block text-xs text-slate-400 mb-1">
            Personality Traits
          </span>
          <div className="flex flex-wrap gap-2">
            {personalityOptions.map((trait) => {
              const checked = isChecked("sma_personality_traits", trait);
              return (
                <label
                  key={trait}
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
                      toggleMulti("sma_personality_traits", trait)
                    }
                  />
                  {trait}
                </label>
              );
            })}
          </div>
        </div>
        <div>
          <label htmlFor="sma-topics-avoid" className="block text-xs text-slate-400 mb-1">
            Topics to Avoid
          </label>
          <textarea
            id="sma-topics-avoid"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="Subjects or themes to stay away from"
            value={v("sma_topics_avoid")}
            onChange={(e) => onChange("sma_topics_avoid", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="sma-topics-emphasize" className="block text-xs text-slate-400 mb-1">
            Topics to Emphasize
          </label>
          <textarea
            id="sma-topics-emphasize"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="Key themes and messages to highlight"
            value={v("sma_topics_emphasize")}
            onChange={(e) => onChange("sma_topics_emphasize", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="sma-hashtag-strategy" className="block text-xs text-slate-400 mb-1">
            Hashtag Strategy
          </label>
          <textarea
            id="sma-hashtag-strategy"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="Branded hashtags, industry hashtags, etc."
            value={v("sma_hashtag_strategy")}
            onChange={(e) => onChange("sma_hashtag_strategy", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="sma-emoji-usage" className="block text-xs text-slate-400 mb-1">
            Emoji Usage
          </label>
          <select
            id="sma-emoji-usage"
            className={inputClass}
            value={v("sma_emoji_usage")}
            onChange={(e) => onChange("sma_emoji_usage", e.target.value)}
          >
            <option value="">Select</option>
            <option value="Liberal">Liberal</option>
            <option value="Moderate">Moderate</option>
            <option value="Minimal">Minimal</option>
            <option value="None">None</option>
          </select>
        </div>
      </div>

      {/* Engagement */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Engagement
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="sma-response-time" className="block text-xs text-slate-400 mb-1">
              Target Response Time
            </label>
            <select
              id="sma-response-time"
              className={inputClass}
              value={v("sma_response_time")}
              onChange={(e) => onChange("sma_response_time", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Within 1hr">Within 1hr</option>
              <option value="Within 4hrs">Within 4hrs</option>
              <option value="Same day">Same day</option>
              <option value="Next business day">Next business day</option>
            </select>
          </div>
          <div>
            <label htmlFor="sma-influencer-partnerships" className="block text-xs text-slate-400 mb-1">
              Influencer Partnerships?
            </label>
            <select
              id="sma-influencer-partnerships"
              className={inputClass}
              value={v("sma_influencer_partnerships")}
              onChange={(e) =>
                onChange("sma_influencer_partnerships", e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="sma-negative-handling" className="block text-xs text-slate-400 mb-1">
            Negative Comment Handling
          </label>
          <textarea
            id="sma-negative-handling"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="How should negative comments or reviews be handled?"
            value={v("sma_negative_handling")}
            onChange={(e) => onChange("sma_negative_handling", e.target.value)}
          />
        </div>
        {v("sma_influencer_partnerships") === "yes" && (
          <div>
            <label htmlFor="sma-influencer-details" className="block text-xs text-slate-400 mb-1">
              Influencer Partnership Details
            </label>
            <textarea
              id="sma-influencer-details"
              className={`${inputClass} min-h-[80px] resize-y`}
              placeholder="Current or desired influencer partnerships"
              value={v("sma_influencer_details")}
              onChange={(e) =>
                onChange("sma_influencer_details", e.target.value)
              }
            />
          </div>
        )}
      </div>

      {/* Goals */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Goals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="sma-primary-goal" className="block text-xs text-slate-400 mb-1">
              Primary Goal <span className="text-red-400">*</span>
            </label>
            <select
              id="sma-primary-goal"
              className={inputClass}
              value={v("sma_primary_goal")}
              onChange={(e) => onChange("sma_primary_goal", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Brand Awareness">Brand Awareness</option>
              <option value="Community Engagement">Community Engagement</option>
              <option value="Lead Generation">Lead Generation</option>
              <option value="Traffic">Traffic</option>
              <option value="Sales">Sales</option>
              <option value="Customer Service">Customer Service</option>
            </select>
          </div>
          <div>
            <label htmlFor="sma-ad-budget" className="block text-xs text-slate-400 mb-1">
              Monthly Ad Budget for Boosted Posts
            </label>
            <input
              id="sma-ad-budget"
              type="text"
              className={inputClass}
              placeholder="e.g. $500/month"
              value={v("sma_ad_budget")}
              onChange={(e) => onChange("sma_ad_budget", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="sma-target-kpis" className="block text-xs text-slate-400 mb-1">
            Target KPIs
          </label>
          <textarea
            id="sma-target-kpis"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="What metrics matter most? (followers, engagement rate, clicks, etc.)"
            value={v("sma_target_kpis")}
            onChange={(e) => onChange("sma_target_kpis", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="sma-competitors" className="block text-xs text-slate-400 mb-1">
            Competitors to Watch{" "}
            <span className="text-xs text-slate-500 font-normal">
              (channel-specific — general competitors are in Business Info)
            </span>
          </label>
          <textarea
            id="sma-competitors"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="Social media accounts of competitors to monitor"
            value={v("sma_competitors")}
            onChange={(e) => onChange("sma_competitors", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

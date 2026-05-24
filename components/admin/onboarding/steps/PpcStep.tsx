"use client";

const inputClass =
  "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:border-emerald-400/50 focus:outline-none";

export default function PpcStep({
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

  const conversionActions = [
    "Phone Calls",
    "Form Submissions",
    "Purchases",
    "Sign-ups",
    "Downloads",
    "Chat Inquiries",
  ];

  return (
    <div className="space-y-8">
      <p className="text-xs text-slate-500">
        Fields marked <span className="text-red-400">*</span> are required.
      </p>
      {/* Current Accounts */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Current Accounts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ppc-google-ads-id" className="block text-xs text-slate-400 mb-1">
              Google Ads Customer ID
            </label>
            <input
              id="ppc-google-ads-id"
              type="text"
              className={inputClass}
              placeholder="XXX-XXX-XXXX"
              value={v("ppc_google_ads_id")}
              onChange={(e) => onChange("ppc_google_ads_id", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="ppc-microsoft-ads-id" className="block text-xs text-slate-400 mb-1">
              Microsoft Ads ID
            </label>
            <input
              id="ppc-microsoft-ads-id"
              type="text"
              className={inputClass}
              placeholder="Account ID"
              value={v("ppc_microsoft_ads_id")}
              onChange={(e) =>
                onChange("ppc_microsoft_ads_id", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="ppc-meta-ads-id" className="block text-xs text-slate-400 mb-1">
              Meta Ads ID
            </label>
            <input
              id="ppc-meta-ads-id"
              type="text"
              className={inputClass}
              placeholder="Ad account ID"
              value={v("ppc_meta_ads_id")}
              onChange={(e) => onChange("ppc_meta_ads_id", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="ppc-other-platforms" className="block text-xs text-slate-400 mb-1">
            Other Platforms
          </label>
          <textarea
            id="ppc-other-platforms"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="List any other advertising platforms (LinkedIn, TikTok, etc.)"
            value={v("ppc_other_platforms")}
            onChange={(e) => onChange("ppc_other_platforms", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ppc-access-emails" className="block text-xs text-slate-400 mb-1">
            Access Emails
          </label>
          <textarea
            id="ppc-access-emails"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="Email addresses with access to ad accounts"
            value={v("ppc_access_emails")}
            onChange={(e) => onChange("ppc_access_emails", e.target.value)}
          />
        </div>
      </div>

      {/* History */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          History
        </h3>
        <div>
          <label htmlFor="ppc-previous-experience" className="block text-xs text-slate-400 mb-1">
            Previous PPC experience?
          </label>
          <select
            id="ppc-previous-experience"
            className={inputClass}
            value={v("ppc_previous_experience")}
            onChange={(e) =>
              onChange("ppc_previous_experience", e.target.value)
            }
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        {v("ppc_previous_experience") === "yes" && (
          <>
            <div>
              <label htmlFor="ppc-previous-spend" className="block text-xs text-slate-400 mb-1">
                Previous Monthly Spend
              </label>
              <input
                id="ppc-previous-spend"
                type="text"
                className={inputClass}
                placeholder="e.g. $2,000/month"
                value={v("ppc_previous_spend")}
                onChange={(e) =>
                  onChange("ppc_previous_spend", e.target.value)
                }
              />
            </div>
            <div>
              <label htmlFor="ppc-what-worked" className="block text-xs text-slate-400 mb-1">
                What Worked
              </label>
              <textarea
                id="ppc-what-worked"
                className={`${inputClass} min-h-[80px] resize-y`}
                placeholder="What campaigns or strategies performed well?"
                value={v("ppc_what_worked")}
                onChange={(e) => onChange("ppc_what_worked", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="ppc-what-didnt-work" className="block text-xs text-slate-400 mb-1">
                What Didn&apos;t Work
              </label>
              <textarea
                id="ppc-what-didnt-work"
                className={`${inputClass} min-h-[80px] resize-y`}
                placeholder="What campaigns or strategies underperformed?"
                value={v("ppc_what_didnt_work")}
                onChange={(e) =>
                  onChange("ppc_what_didnt_work", e.target.value)
                }
              />
            </div>
          </>
        )}
      </div>

      {/* Budget */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Budget
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ppc-monthly-spend" className="block text-xs text-slate-400 mb-1">
              Monthly PPC Spend <span className="text-red-400">*</span>
            </label>
            <input
              id="ppc-monthly-spend"
              type="text"
              className={inputClass}
              placeholder="e.g. $3,000/month"
              value={v("ppc_monthly_spend")}
              onChange={(e) => onChange("ppc_monthly_spend", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="ppc-budget-flexibility" className="block text-xs text-slate-400 mb-1">
              Budget Flexibility
            </label>
            <select
              id="ppc-budget-flexibility"
              className={inputClass}
              value={v("ppc_budget_flexibility")}
              onChange={(e) =>
                onChange("ppc_budget_flexibility", e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="Fixed">Fixed</option>
              <option value="Flexible +/- 10%">Flexible +/- 10%</option>
              <option value="Flexible +/- 25%">Flexible +/- 25%</option>
              <option value="Open to recommendations">
                Open to recommendations
              </option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="ppc-budget-notes" className="block text-xs text-slate-400 mb-1">
            Budget Allocation Notes
          </label>
          <textarea
            id="ppc-budget-notes"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="Any preferences for how budget should be split across platforms or campaigns?"
            value={v("ppc_budget_notes")}
            onChange={(e) => onChange("ppc_budget_notes", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ppc-seasonal-changes" className="block text-xs text-slate-400 mb-1">
            Seasonal budget changes?
          </label>
          <select
            id="ppc-seasonal-changes"
            className={inputClass}
            value={v("ppc_seasonal_changes")}
            onChange={(e) => onChange("ppc_seasonal_changes", e.target.value)}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        {v("ppc_seasonal_changes") === "yes" && (
          <div>
            <label htmlFor="ppc-seasonal-details" className="block text-xs text-slate-400 mb-1">
              Seasonal Details
            </label>
            <textarea
              id="ppc-seasonal-details"
              className={`${inputClass} min-h-[80px] resize-y`}
              placeholder="Describe your busy/slow seasons and how budget should change"
              value={v("ppc_seasonal_details")}
              onChange={(e) =>
                onChange("ppc_seasonal_details", e.target.value)
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
            <label htmlFor="ppc-primary-goal" className="block text-xs text-slate-400 mb-1">
              Primary Goal <span className="text-red-400">*</span>
            </label>
            <select
              id="ppc-primary-goal"
              className={inputClass}
              value={v("ppc_primary_goal")}
              onChange={(e) => onChange("ppc_primary_goal", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Leads">Leads</option>
              <option value="Sales">Sales</option>
              <option value="Traffic">Traffic</option>
              <option value="Brand Awareness">Brand Awareness</option>
              <option value="App Installs">App Installs</option>
            </select>
          </div>
          <div>
            <label htmlFor="ppc-target-cpa" className="block text-xs text-slate-400 mb-1">
              Target CPA
            </label>
            <input
              id="ppc-target-cpa"
              type="text"
              className={inputClass}
              placeholder="e.g. $50"
              value={v("ppc_target_cpa")}
              onChange={(e) => onChange("ppc_target_cpa", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="ppc-target-roas" className="block text-xs text-slate-400 mb-1">
              Target ROAS
            </label>
            <input
              id="ppc-target-roas"
              type="text"
              className={inputClass}
              placeholder="e.g. 4:1"
              value={v("ppc_target_roas")}
              onChange={(e) => onChange("ppc_target_roas", e.target.value)}
            />
          </div>
        </div>
        <div>
          <span className="block text-xs text-slate-400 mb-1">
            Conversion Actions
          </span>
          <div className="flex flex-wrap gap-2">
            {conversionActions.map((action) => {
              const checked = isChecked("ppc_conversion_actions", action);
              return (
                <label
                  key={action}
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
                      toggleMulti("ppc_conversion_actions", action)
                    }
                  />
                  {action}
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* Targeting */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Targeting
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ppc-target-locations" className="block text-xs text-slate-400 mb-1">
              Target Locations
            </label>
            <textarea
              id="ppc-target-locations"
              className={`${inputClass} min-h-[80px] resize-y`}
              placeholder="Cities, states, zip codes, or radius targets"
              value={v("ppc_target_locations")}
              onChange={(e) =>
                onChange("ppc_target_locations", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="ppc-exclude-locations" className="block text-xs text-slate-400 mb-1">
              Exclude Locations
            </label>
            <textarea
              id="ppc-exclude-locations"
              className={`${inputClass} min-h-[80px] resize-y`}
              placeholder="Areas to exclude from targeting"
              value={v("ppc_exclude_locations")}
              onChange={(e) =>
                onChange("ppc_exclude_locations", e.target.value)
              }
            />
          </div>
        </div>
        <div>
          <label htmlFor="ppc-demographics" className="block text-xs text-slate-400 mb-1">
            Demographics Notes
          </label>
          <textarea
            id="ppc-demographics"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="Age ranges, income levels, interests, etc."
            value={v("ppc_demographics")}
            onChange={(e) => onChange("ppc_demographics", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ppc-b2b-b2c" className="block text-xs text-slate-400 mb-1">
              B2B or B2C?
            </label>
            <select
              id="ppc-b2b-b2c"
              className={inputClass}
              value={v("ppc_b2b_b2c")}
              onChange={(e) => onChange("ppc_b2b_b2c", e.target.value)}
            >
              <option value="">Select</option>
              <option value="B2B">B2B</option>
              <option value="B2C">B2C</option>
              <option value="Both">Both</option>
            </select>
          </div>
        </div>
        {(v("ppc_b2b_b2c") === "B2B" || v("ppc_b2b_b2c") === "Both") && (
          <div>
            <label htmlFor="ppc-target-business-types" className="block text-xs text-slate-400 mb-1">
              Target Business Types
            </label>
            <textarea
              id="ppc-target-business-types"
              className={`${inputClass} min-h-[80px] resize-y`}
              placeholder="Industries, company sizes, job titles to target"
              value={v("ppc_target_business_types")}
              onChange={(e) =>
                onChange("ppc_target_business_types", e.target.value)
              }
            />
          </div>
        )}
      </div>

      {/* Keywords & Creative */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Keywords & Creative
        </h3>
        <div>
          <label htmlFor="ppc-target-keywords" className="block text-xs text-slate-400 mb-1">
            Target Keywords
          </label>
          <textarea
            id="ppc-target-keywords"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="Keywords you want to target (one per line)"
            value={v("ppc_target_keywords")}
            onChange={(e) => onChange("ppc_target_keywords", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ppc-negative-keywords" className="block text-xs text-slate-400 mb-1">
            Negative Keywords
          </label>
          <textarea
            id="ppc-negative-keywords"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="Keywords to exclude (one per line)"
            value={v("ppc_negative_keywords")}
            onChange={(e) => onChange("ppc_negative_keywords", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ppc-competitor-targeting" className="block text-xs text-slate-400 mb-1">
              Competitor targeting?{" "}
              <span className="text-xs text-slate-500 font-normal">
                (channel-specific)
              </span>
            </label>
            <select
              id="ppc-competitor-targeting"
              className={inputClass}
              value={v("ppc_competitor_targeting")}
              onChange={(e) =>
                onChange("ppc_competitor_targeting", e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="ppc-promotions" className="block text-xs text-slate-400 mb-1">
            Current Promotions / Offers
          </label>
          <textarea
            id="ppc-promotions"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="Any active deals, discounts, or offers to highlight in ads"
            value={v("ppc_promotions")}
            onChange={(e) => onChange("ppc_promotions", e.target.value)}
          />
        </div>
      </div>

      {/* Landing Pages */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Landing Pages
        </h3>
        <div>
          <label htmlFor="ppc-landing-page-urls" className="block text-xs text-slate-400 mb-1">
            Existing Landing Page URLs
          </label>
          <textarea
            id="ppc-landing-page-urls"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="List URLs of existing landing pages"
            value={v("ppc_landing_page_urls")}
            onChange={(e) =>
              onChange("ppc_landing_page_urls", e.target.value)
            }
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ppc-need-landing-pages" className="block text-xs text-slate-400 mb-1">
              Need new landing pages?
            </label>
            <select
              id="ppc-need-landing-pages"
              className={inputClass}
              value={v("ppc_need_landing_pages")}
              onChange={(e) =>
                onChange("ppc_need_landing_pages", e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          {v("ppc_need_landing_pages") === "yes" && (
            <div>
              <label htmlFor="ppc-landing-pages-count" className="block text-xs text-slate-400 mb-1">
                How Many Needed
              </label>
              <input
                id="ppc-landing-pages-count"
                type="number"
                className={inputClass}
                placeholder="Number of landing pages"
                value={v("ppc_landing_pages_count")}
                onChange={(e) =>
                  onChange("ppc_landing_pages_count", e.target.value)
                }
              />
            </div>
          )}
        </div>
      </div>

      {/* Tracking */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Tracking
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ppc-conversion-tracking" className="block text-xs text-slate-400 mb-1">
              Conversion tracking set up?
            </label>
            <select
              id="ppc-conversion-tracking"
              className={inputClass}
              value={v("ppc_conversion_tracking")}
              onChange={(e) =>
                onChange("ppc_conversion_tracking", e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="ppc-ga4-id" className="block text-xs text-slate-400 mb-1">
              GA4 Property ID
            </label>
            <input
              id="ppc-ga4-id"
              type="text"
              className={inputClass}
              placeholder="G-XXXXXXXXXX"
              value={v("ppc_ga4_id")}
              onChange={(e) => onChange("ppc_ga4_id", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="ppc-call-tracking" className="block text-xs text-slate-400 mb-1">
              Call Tracking Provider
            </label>
            <input
              id="ppc-call-tracking"
              type="text"
              className={inputClass}
              placeholder="e.g. CallRail, CallTrackingMetrics"
              value={v("ppc_call_tracking")}
              onChange={(e) => onChange("ppc_call_tracking", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="ppc-reporting-frequency" className="block text-xs text-slate-400 mb-1">
              Preferred Reporting Frequency
            </label>
            <select
              id="ppc-reporting-frequency"
              className={inputClass}
              value={v("ppc_reporting_frequency")}
              onChange={(e) =>
                onChange("ppc_reporting_frequency", e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="Weekly">Weekly</option>
              <option value="Bi-weekly">Bi-weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="ppc-key-metrics" className="block text-xs text-slate-400 mb-1">
            Key Metrics to Track
          </label>
          <textarea
            id="ppc-key-metrics"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="What metrics are most important to you? (CTR, CPC, conversions, ROAS, etc.)"
            value={v("ppc_key_metrics")}
            onChange={(e) => onChange("ppc_key_metrics", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

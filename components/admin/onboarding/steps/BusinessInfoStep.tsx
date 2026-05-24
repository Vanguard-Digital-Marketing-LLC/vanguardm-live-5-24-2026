"use client";

const inputClass =
  "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:border-emerald-400/50 focus:outline-none";

export default function BusinessInfoStep({
  data,
  onChange,
}: {
  data: Record<string, any>;
  onChange: (field: string, value: any) => void;
}) {
  const v = (field: string) => data[field] ?? "";

  const voiceToneOptions = [
    "Professional",
    "Friendly",
    "Bold",
    "Technical",
    "Casual",
    "Authoritative",
    "Humorous",
    "Inspirational",
  ];

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

  const billingMatchesPrimary = !!data["billing_same_as_primary"];

  return (
    <div className="space-y-8">
      <p className="text-xs text-slate-500">
        Fields marked <span className="text-red-400">*</span> are required.
      </p>
      {/* Company */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Company
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="biz-legal-name" className="block text-xs text-slate-400 mb-1">
              Legal Name <span className="text-red-400">*</span>
            </label>
            <input
              id="biz-legal-name"
              type="text"
              className={inputClass}
              placeholder="Legal business name"
              value={v("legal_name")}
              onChange={(e) => onChange("legal_name", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="biz-dba-name" className="block text-xs text-slate-400 mb-1">
              DBA / Brand Name
            </label>
            <input
              id="biz-dba-name"
              type="text"
              className={inputClass}
              placeholder="Doing business as"
              value={v("dba_name")}
              onChange={(e) => onChange("dba_name", e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="biz-website-url" className="block text-xs text-slate-400 mb-1">
              Website URL
            </label>
            <input
              id="biz-website-url"
              type="url"
              className={inputClass}
              placeholder="https://example.com"
              value={v("website_url")}
              onChange={(e) => onChange("website_url", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="biz-business-category" className="block text-xs text-slate-400 mb-1">
              Business Category
            </label>
            <select
              id="biz-business-category"
              className={inputClass}
              value={v("business_category")}
              onChange={(e) => onChange("business_category", e.target.value)}
            >
              <option value="">Select category</option>
              <option value="Web App">Web App</option>
              <option value="Phone App">Phone App</option>
              <option value="Website">Website</option>
              <option value="E-commerce Store">E-commerce Store</option>
              <option value="SaaS Platform">SaaS Platform</option>
              <option value="None (New Build)">None (New Build)</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="biz-business-objective" className="block text-xs text-slate-400 mb-1">
              Business Objective <span className="text-red-400">*</span>
            </label>
            <select
              id="biz-business-objective"
              className={inputClass}
              value={v("industry")}
              onChange={(e) => onChange("industry", e.target.value)}
            >
              <option value="">Select objective</option>
              <option value="Automotive">Automotive</option>
              <option value="Construction">Construction</option>
              <option value="Dental">Dental</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Education">Education</option>
              <option value="Financial Services">Financial Services</option>
              <option value="Food & Beverage">Food & Beverage</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Home Services">Home Services</option>
              <option value="Hospitality">Hospitality</option>
              <option value="Insurance">Insurance</option>
              <option value="Legal">Legal</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Nonprofit">Nonprofit</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Retail">Retail</option>
              <option value="SaaS / Technology">SaaS / Technology</option>
              <option value="Veterinary">Veterinary</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="biz-year-established" className="block text-xs text-slate-400 mb-1">
              Year Established
            </label>
            <input
              id="biz-year-established"
              type="number"
              className={inputClass}
              placeholder="e.g. 2015"
              value={v("year_established")}
              onChange={(e) => onChange("year_established", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="biz-employee-count" className="block text-xs text-slate-400 mb-1">
              Employee Count
            </label>
            <select
              id="biz-employee-count"
              className={inputClass}
              value={v("employee_count")}
              onChange={(e) => onChange("employee_count", e.target.value)}
            >
              <option value="">Select range</option>
              <option value="1-5">1-5</option>
              <option value="6-25">6-25</option>
              <option value="26-100">26-100</option>
              <option value="101-500">101-500</option>
              <option value="500+">500+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Primary Contact */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Primary Contact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="biz-primary-contact-name" className="block text-xs text-slate-400 mb-1">Name <span className="text-red-400">*</span></label>
            <input
              id="biz-primary-contact-name"
              type="text"
              className={inputClass}
              placeholder="Full name"
              value={v("primary_contact_name")}
              onChange={(e) =>
                onChange("primary_contact_name", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="biz-primary-contact-title" className="block text-xs text-slate-400 mb-1">Title</label>
            <input
              id="biz-primary-contact-title"
              type="text"
              className={inputClass}
              placeholder="Job title"
              value={v("primary_contact_title")}
              onChange={(e) =>
                onChange("primary_contact_title", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="biz-primary-contact-email" className="block text-xs text-slate-400 mb-1">Email <span className="text-red-400">*</span></label>
            <input
              id="biz-primary-contact-email"
              type="email"
              className={inputClass}
              placeholder="email@example.com"
              value={v("primary_contact_email")}
              onChange={(e) =>
                onChange("primary_contact_email", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="biz-primary-contact-phone" className="block text-xs text-slate-400 mb-1">Phone <span className="text-red-400">*</span></label>
            <input
              id="biz-primary-contact-phone"
              type="tel"
              className={inputClass}
              placeholder="(555) 555-5555"
              value={v("primary_contact_phone")}
              onChange={(e) =>
                onChange("primary_contact_phone", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* Secondary Contact */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Secondary Contact{" "}
          <span className="text-xs text-slate-500 font-normal">(optional)</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="biz-secondary-contact-name" className="block text-xs text-slate-400 mb-1">Name</label>
            <input
              id="biz-secondary-contact-name"
              type="text"
              className={inputClass}
              placeholder="Full name"
              value={v("secondary_contact_name")}
              onChange={(e) =>
                onChange("secondary_contact_name", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="biz-secondary-contact-title" className="block text-xs text-slate-400 mb-1">Title</label>
            <input
              id="biz-secondary-contact-title"
              type="text"
              className={inputClass}
              placeholder="Job title"
              value={v("secondary_contact_title")}
              onChange={(e) =>
                onChange("secondary_contact_title", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="biz-secondary-contact-email" className="block text-xs text-slate-400 mb-1">Email</label>
            <input
              id="biz-secondary-contact-email"
              type="email"
              className={inputClass}
              placeholder="email@example.com"
              value={v("secondary_contact_email")}
              onChange={(e) =>
                onChange("secondary_contact_email", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="biz-secondary-contact-phone" className="block text-xs text-slate-400 mb-1">Phone</label>
            <input
              id="biz-secondary-contact-phone"
              type="tel"
              className={inputClass}
              placeholder="(555) 555-5555"
              value={v("secondary_contact_phone")}
              onChange={(e) =>
                onChange("secondary_contact_phone", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* Billing Contact */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Billing Contact{" "}
          <span className="text-xs text-slate-500 font-normal">(optional)</span>
        </h3>
        <label className="flex items-center gap-2 text-sm text-slate-300 mb-2 cursor-pointer">
          <input
            id="biz-billing-same-as-primary"
            type="checkbox"
            className="accent-emerald-500"
            checked={billingMatchesPrimary}
            onChange={(e) =>
              onChange("billing_same_as_primary", e.target.checked)
            }
          />
          Same as primary contact
        </label>
        {!billingMatchesPrimary && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="biz-billing-contact-name" className="block text-xs text-slate-400 mb-1">Name</label>
              <input
                id="biz-billing-contact-name"
                type="text"
                className={inputClass}
                placeholder="Full name"
                value={v("billing_contact_name")}
                onChange={(e) =>
                  onChange("billing_contact_name", e.target.value)
                }
              />
            </div>
            <div>
              <label htmlFor="biz-billing-contact-email" className="block text-xs text-slate-400 mb-1">
                Email
              </label>
              <input
                id="biz-billing-contact-email"
                type="email"
                className={inputClass}
                placeholder="email@example.com"
                value={v("billing_contact_email")}
                onChange={(e) =>
                  onChange("billing_contact_email", e.target.value)
                }
              />
            </div>
            <div>
              <label htmlFor="biz-billing-contact-phone" className="block text-xs text-slate-400 mb-1">
                Phone
              </label>
              <input
                id="biz-billing-contact-phone"
                type="tel"
                className={inputClass}
                placeholder="(555) 555-5555"
                value={v("billing_contact_phone")}
                onChange={(e) =>
                  onChange("billing_contact_phone", e.target.value)
                }
              />
            </div>
          </div>
        )}
      </div>

      {/* Address */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="biz-address-street" className="block text-xs text-slate-400 mb-1">
              Street Address <span className="text-red-400">*</span>
            </label>
            <input
              id="biz-address-street"
              type="text"
              className={inputClass}
              placeholder="123 Main St"
              value={v("address_street")}
              onChange={(e) => onChange("address_street", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="biz-address-city" className="block text-xs text-slate-400 mb-1">City <span className="text-red-400">*</span></label>
            <input
              id="biz-address-city"
              type="text"
              className={inputClass}
              placeholder="City"
              value={v("address_city")}
              onChange={(e) => onChange("address_city", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="biz-address-state" className="block text-xs text-slate-400 mb-1">State <span className="text-red-400">*</span></label>
            <input
              id="biz-address-state"
              type="text"
              className={inputClass}
              placeholder="State"
              value={v("address_state")}
              onChange={(e) => onChange("address_state", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="biz-address-zip" className="block text-xs text-slate-400 mb-1">ZIP <span className="text-red-400">*</span></label>
            <input
              id="biz-address-zip"
              type="text"
              className={inputClass}
              placeholder="ZIP code"
              value={v("address_zip")}
              onChange={(e) => onChange("address_zip", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="biz-address-country" className="block text-xs text-slate-400 mb-1">
              Country
            </label>
            <input
              id="biz-address-country"
              type="text"
              className={inputClass}
              placeholder="Country"
              value={data["address_country"] ?? "US"}
              onChange={(e) => onChange("address_country", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="biz-additional-locations" className="block text-xs text-slate-400 mb-1">
            Additional Locations
          </label>
          <textarea
            id="biz-additional-locations"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="List any additional office or business locations"
            value={v("additional_locations")}
            onChange={(e) => onChange("additional_locations", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="biz-service-area-description" className="block text-xs text-slate-400 mb-1">
            Service Area Description
          </label>
          <textarea
            id="biz-service-area-description"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="Describe the geographic area you serve"
            value={v("service_area_description")}
            onChange={(e) =>
              onChange("service_area_description", e.target.value)
            }
          />
        </div>
      </div>

      {/* Brand */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Brand
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="biz-tagline" className="block text-xs text-slate-400 mb-1">
              Tagline
            </label>
            <input
              id="biz-tagline"
              type="text"
              className={inputClass}
              placeholder="Your brand tagline"
              value={v("tagline")}
              onChange={(e) => onChange("tagline", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="biz-mission-statement" className="block text-xs text-slate-400 mb-1">
            Mission Statement
          </label>
          <textarea
            id="biz-mission-statement"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="Your company's mission statement"
            value={v("mission_statement")}
            onChange={(e) => onChange("mission_statement", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="biz-usp" className="block text-xs text-slate-400 mb-1">
            Unique Selling Proposition (USP)
          </label>
          <textarea
            id="biz-usp"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="What makes your business different from competitors?"
            value={v("usp")}
            onChange={(e) => onChange("usp", e.target.value)}
          />
        </div>
        <div>
          <span className="block text-xs text-slate-400 mb-1">
            Voice / Tone
          </span>
          <div className="flex flex-wrap gap-2">
            {voiceToneOptions.map((tone) => {
              const checked = isChecked("voice_tone", tone);
              return (
                <label
                  key={tone}
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
                    onChange={() => toggleMulti("voice_tone", tone)}
                  />
                  {tone}
                </label>
              );
            })}
          </div>
        </div>
        <div>
          <label htmlFor="biz-target-audience" className="block text-xs text-slate-400 mb-1">
            Target Audience
          </label>
          <textarea
            id="biz-target-audience"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="Describe your ideal customers"
            value={v("target_audience")}
            onChange={(e) => onChange("target_audience", e.target.value)}
          />
        </div>
        <div>
          <span className="block text-xs text-slate-400 mb-1">
            Top 3 Competitors
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              id="biz-competitor-1"
              aria-label="Competitor 1"
              type="text"
              className={inputClass}
              placeholder="Competitor 1"
              value={v("competitor_1")}
              onChange={(e) => onChange("competitor_1", e.target.value)}
            />
            <input
              id="biz-competitor-2"
              aria-label="Competitor 2"
              type="text"
              className={inputClass}
              placeholder="Competitor 2"
              value={v("competitor_2")}
              onChange={(e) => onChange("competitor_2", e.target.value)}
            />
            <input
              id="biz-competitor-3"
              aria-label="Competitor 3"
              type="text"
              className={inputClass}
              placeholder="Competitor 3"
              value={v("competitor_3")}
              onChange={(e) => onChange("competitor_3", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Current Marketing */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Current Marketing
        </h3>
        <div>
          <label htmlFor="biz-current-marketing-efforts" className="block text-xs text-slate-400 mb-1">
            Current Marketing Efforts
          </label>
          <textarea
            id="biz-current-marketing-efforts"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="Describe what marketing you currently do"
            value={v("current_marketing_efforts")}
            onChange={(e) =>
              onChange("current_marketing_efforts", e.target.value)
            }
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="biz-monthly-budget-range" className="block text-xs text-slate-400 mb-1">
              Monthly Budget Range
            </label>
            <select
              id="biz-monthly-budget-range"
              className={inputClass}
              value={v("monthly_budget_range")}
              onChange={(e) =>
                onChange("monthly_budget_range", e.target.value)
              }
            >
              <option value="">Select range</option>
              <option value="Under $1k">Under $1k</option>
              <option value="$1-3k">$1-3k</option>
              <option value="$3-5k">$3-5k</option>
              <option value="$5-10k">$5-10k</option>
              <option value="$10-25k">$10-25k</option>
              <option value="$25k+">$25k+</option>
            </select>
          </div>
          <div>
            <label htmlFor="biz-previous-agency" className="block text-xs text-slate-400 mb-1">
              Previous Agency Experience?
            </label>
            <select
              id="biz-previous-agency"
              className={inputClass}
              value={data["previous_agency"] ?? "no"}
              onChange={(e) => onChange("previous_agency", e.target.value)}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
        </div>
        {v("previous_agency") === "yes" && (
          <div>
            <label htmlFor="biz-previous-agency-details" className="block text-xs text-slate-400 mb-1">
              Previous Agency Details
            </label>
            <textarea
              id="biz-previous-agency-details"
              className={`${inputClass} min-h-[80px] resize-y`}
              placeholder="Who did you work with and what was the experience like?"
              value={v("previous_agency_details")}
              onChange={(e) =>
                onChange("previous_agency_details", e.target.value)
              }
            />
          </div>
        )}
        <div>
          <label htmlFor="biz-biggest-marketing-challenge" className="block text-xs text-slate-400 mb-1">
            Biggest Marketing Challenge
          </label>
          <textarea
            id="biz-biggest-marketing-challenge"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="What is your biggest marketing pain point?"
            value={v("biggest_marketing_challenge")}
            onChange={(e) =>
              onChange("biggest_marketing_challenge", e.target.value)
            }
          />
        </div>
      </div>

      {/* Goals */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Goals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="biz-primary-business-goal" className="block text-xs text-slate-400 mb-1">
              Primary Business Goal
            </label>
            <select
              id="biz-primary-business-goal"
              className={inputClass}
              value={v("primary_business_goal")}
              onChange={(e) =>
                onChange("primary_business_goal", e.target.value)
              }
            >
              <option value="">Select goal</option>
              <option value="Lead Generation">Lead Generation</option>
              <option value="Brand Awareness">Brand Awareness</option>
              <option value="Online Sales">Online Sales</option>
              <option value="Local Visibility">Local Visibility</option>
              <option value="Customer Retention">Customer Retention</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="biz-expected-timeline" className="block text-xs text-slate-400 mb-1">
              Expected Timeline
            </label>
            <select
              id="biz-expected-timeline"
              className={inputClass}
              value={v("expected_timeline")}
              onChange={(e) => onChange("expected_timeline", e.target.value)}
            >
              <option value="">Select timeline</option>
              <option value="1-3 months">1-3 months</option>
              <option value="3-6 months">3-6 months</option>
              <option value="6-12 months">6-12 months</option>
              <option value="12+ months">12+ months</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

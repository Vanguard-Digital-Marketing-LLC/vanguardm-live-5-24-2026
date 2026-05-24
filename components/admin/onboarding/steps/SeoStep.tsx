"use client";

const inputClass =
  "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:border-emerald-400/50 focus:outline-none";

export default function SeoStep({
  data,
  onChange,
}: {
  data: Record<string, any>;
  onChange: (field: string, value: any) => void;
}) {
  const v = (field: string) => data[field] ?? "";

  return (
    <div className="space-y-8">
      <p className="text-xs text-slate-500">
        Fields marked <span className="text-red-400">*</span> are required.
      </p>
      {/* Current Status */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Current Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="seo-gsc-access" className="block text-xs text-slate-400 mb-1">
              Google Search Console access?
            </label>
            <select
              id="seo-gsc-access"
              className={inputClass}
              value={v("seo_gsc_access")}
              onChange={(e) => onChange("seo_gsc_access", e.target.value)}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="seo-ga4-access" className="block text-xs text-slate-400 mb-1">
              GA4 access?
            </label>
            <select
              id="seo-ga4-access"
              className={inputClass}
              value={v("seo_ga4_access")}
              onChange={(e) => onChange("seo_ga4_access", e.target.value)}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          {v("seo_ga4_access") === "yes" && (
            <div>
              <label htmlFor="seo-ga4-property-id" className="block text-xs text-slate-400 mb-1">
                GA4 Property ID
              </label>
              <input
                id="seo-ga4-property-id"
                type="text"
                className={inputClass}
                placeholder="G-XXXXXXXXXX"
                value={v("seo_ga4_property_id")}
                onChange={(e) =>
                  onChange("seo_ga4_property_id", e.target.value)
                }
              />
            </div>
          )}
          <div>
            <label htmlFor="seo-gbp-access" className="block text-xs text-slate-400 mb-1">
              Google Business Profile access?
            </label>
            <select
              id="seo-gbp-access"
              className={inputClass}
              value={v("seo_gbp_access")}
              onChange={(e) => onChange("seo_gbp_access", e.target.value)}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          {v("seo_gbp_access") === "yes" && (
            <div>
              <label htmlFor="seo-gbp-name" className="block text-xs text-slate-400 mb-1">
                Google Business Profile Name
              </label>
              <input
                id="seo-gbp-name"
                type="text"
                className={inputClass}
                placeholder="Business listing name"
                value={v("seo_gbp_name")}
                onChange={(e) => onChange("seo_gbp_name", e.target.value)}
              />
            </div>
          )}
          <div>
            <label htmlFor="seo-organic-traffic" className="block text-xs text-slate-400 mb-1">
              Estimated Monthly Organic Traffic
            </label>
            <input
              id="seo-organic-traffic"
              type="text"
              className={inputClass}
              placeholder="e.g. 500 visits/month"
              value={v("seo_organic_traffic")}
              onChange={(e) => onChange("seo_organic_traffic", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="seo-previous-work" className="block text-xs text-slate-400 mb-1">
              Previous SEO work?
            </label>
            <select
              id="seo-previous-work"
              className={inputClass}
              value={v("seo_previous_work")}
              onChange={(e) => onChange("seo_previous_work", e.target.value)}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
        {v("seo_previous_work") === "yes" && (
          <div>
            <label htmlFor="seo-previous-work-details" className="block text-xs text-slate-400 mb-1">
              Previous SEO Details
            </label>
            <textarea
              id="seo-previous-work-details"
              className={`${inputClass} min-h-[80px] resize-y`}
              placeholder="Who did your SEO and what was done?"
              value={v("seo_previous_work_details")}
              onChange={(e) =>
                onChange("seo_previous_work_details", e.target.value)
              }
            />
          </div>
        )}
        <div>
          <label htmlFor="seo-penalties" className="block text-xs text-slate-400 mb-1">
            Any penalties?
          </label>
          <select
            id="seo-penalties"
            className={inputClass}
            value={v("seo_penalties")}
            onChange={(e) => onChange("seo_penalties", e.target.value)}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        {v("seo_penalties") === "yes" && (
          <div>
            <label htmlFor="seo-penalty-details" className="block text-xs text-slate-400 mb-1">
              Penalty Details
            </label>
            <textarea
              id="seo-penalty-details"
              className={`${inputClass} min-h-[80px] resize-y`}
              placeholder="Describe the penalty and any recovery efforts"
              value={v("seo_penalty_details")}
              onChange={(e) =>
                onChange("seo_penalty_details", e.target.value)
              }
            />
          </div>
        )}
      </div>

      {/* Keywords */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Keywords
        </h3>
        <div>
          <label htmlFor="seo-target-keywords" className="block text-xs text-slate-400 mb-1">
            Target Keywords
          </label>
          <textarea
            id="seo-target-keywords"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="Keywords you want to rank for (one per line)"
            value={v("seo_target_keywords")}
            onChange={(e) => onChange("seo_target_keywords", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="seo-current-rankings" className="block text-xs text-slate-400 mb-1">
            Current Known Rankings
          </label>
          <textarea
            id="seo-current-rankings"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="Keywords you currently rank for and positions"
            value={v("seo_current_rankings")}
            onChange={(e) => onChange("seo_current_rankings", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="seo-local-national" className="block text-xs text-slate-400 mb-1">
              Local vs National Focus
            </label>
            <select
              id="seo-local-national"
              className={inputClass}
              value={v("seo_local_national")}
              onChange={(e) => onChange("seo_local_national", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Local">Local</option>
              <option value="National">National</option>
              <option value="Both">Both</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="seo-priority-services" className="block text-xs text-slate-400 mb-1">
            Priority Products / Services
          </label>
          <textarea
            id="seo-priority-services"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="Which products or services should be prioritized for SEO?"
            value={v("seo_priority_services")}
            onChange={(e) => onChange("seo_priority_services", e.target.value)}
          />
        </div>
      </div>

      {/* Local SEO */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Local SEO
        </h3>
        <div>
          <label htmlFor="seo-service-area-cities" className="block text-xs text-slate-400 mb-1">
            Service Area Cities <span className="text-red-400">*</span>
          </label>
          <textarea
            id="seo-service-area-cities"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="List the cities and areas you serve"
            value={v("seo_service_area_cities")}
            onChange={(e) =>
              onChange("seo_service_area_cities", e.target.value)
            }
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="seo-location-count" className="block text-xs text-slate-400 mb-1">
              Number of Locations
            </label>
            <input
              id="seo-location-count"
              type="number"
              className={inputClass}
              placeholder="e.g. 1"
              value={v("seo_location_count")}
              onChange={(e) => onChange("seo_location_count", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="seo-nap-consistent" className="block text-xs text-slate-400 mb-1">
              NAP Consistent Across Directories?
            </label>
            <select
              id="seo-nap-consistent"
              className={inputClass}
              value={v("seo_nap_consistent")}
              onChange={(e) => onChange("seo_nap_consistent", e.target.value)}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="unsure">Unsure</option>
            </select>
          </div>
          <div>
            <label htmlFor="seo-google-rating" className="block text-xs text-slate-400 mb-1">
              Current Google Rating
            </label>
            <input
              id="seo-google-rating"
              type="number"
              className={inputClass}
              placeholder="1-5"
              min="1"
              max="5"
              step="0.1"
              value={v("seo_google_rating")}
              onChange={(e) => onChange("seo_google_rating", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="seo-directory-listings" className="block text-xs text-slate-400 mb-1">
            Directory Listings
          </label>
          <textarea
            id="seo-directory-listings"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="Which directories are you listed on? (Yelp, BBB, etc.)"
            value={v("seo_directory_listings")}
            onChange={(e) =>
              onChange("seo_directory_listings", e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="seo-review-strategy" className="block text-xs text-slate-400 mb-1">
            Review Strategy
          </label>
          <textarea
            id="seo-review-strategy"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="How do you currently collect and manage reviews?"
            value={v("seo_review_strategy")}
            onChange={(e) => onChange("seo_review_strategy", e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Content
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="seo-has-blog" className="block text-xs text-slate-400 mb-1">
              Have a blog?
            </label>
            <select
              id="seo-has-blog"
              className={inputClass}
              value={v("seo_has_blog")}
              onChange={(e) => onChange("seo_has_blog", e.target.value)}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="seo-blog-frequency" className="block text-xs text-slate-400 mb-1">
              Posting Frequency
            </label>
            <select
              id="seo-blog-frequency"
              className={inputClass}
              value={v("seo_blog_frequency")}
              onChange={(e) => onChange("seo_blog_frequency", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Weekly">Weekly</option>
              <option value="Bi-weekly">Bi-weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Rarely">Rarely</option>
              <option value="Never">Never</option>
            </select>
          </div>
          <div>
            <label htmlFor="seo-sme" className="block text-xs text-slate-400 mb-1">
              Have subject matter experts?
            </label>
            <select
              id="seo-sme"
              className={inputClass}
              value={v("seo_sme")}
              onChange={(e) => onChange("seo_sme", e.target.value)}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="seo-topic-areas" className="block text-xs text-slate-400 mb-1">
            Topic Areas
          </label>
          <textarea
            id="seo-topic-areas"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="What topics should content focus on?"
            value={v("seo_topic_areas")}
            onChange={(e) => onChange("seo_topic_areas", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="seo-content-approval" className="block text-xs text-slate-400 mb-1">
            Content Approval Process
          </label>
          <textarea
            id="seo-content-approval"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="Who needs to approve content before publishing?"
            value={v("seo_content_approval")}
            onChange={(e) => onChange("seo_content_approval", e.target.value)}
          />
        </div>
      </div>

      {/* Technical */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Technical
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="seo-site-speed" className="block text-xs text-slate-400 mb-1">
              Site Speed Rating
            </label>
            <select
              id="seo-site-speed"
              className={inputClass}
              value={v("seo_site_speed")}
              onChange={(e) => onChange("seo_site_speed", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Fast">Fast</option>
              <option value="Average">Average</option>
              <option value="Slow">Slow</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>
          <div>
            <label htmlFor="seo-mobile-responsive" className="block text-xs text-slate-400 mb-1">
              Mobile Responsive?
            </label>
            <select
              id="seo-mobile-responsive"
              className={inputClass}
              value={v("seo_mobile_responsive")}
              onChange={(e) =>
                onChange("seo_mobile_responsive", e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          <div>
            <label htmlFor="seo-https" className="block text-xs text-slate-400 mb-1">
              HTTPS?
            </label>
            <select
              id="seo-https"
              className={inputClass}
              value={v("seo_https")}
              onChange={(e) => onChange("seo_https", e.target.value)}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="seo-has-sitemap" className="block text-xs text-slate-400 mb-1">
              Has Sitemap?
            </label>
            <select
              id="seo-has-sitemap"
              className={inputClass}
              value={v("seo_has_sitemap")}
              onChange={(e) => onChange("seo_has_sitemap", e.target.value)}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          <div>
            <label htmlFor="seo-has-schema" className="block text-xs text-slate-400 mb-1">
              Has Schema Markup?
            </label>
            <select
              id="seo-has-schema"
              className={inputClass}
              value={v("seo_has_schema")}
              onChange={(e) => onChange("seo_has_schema", e.target.value)}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="seo-technical-issues" className="block text-xs text-slate-400 mb-1">
            Known Technical Issues
          </label>
          <textarea
            id="seo-technical-issues"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="Any known technical SEO problems?"
            value={v("seo_technical_issues")}
            onChange={(e) => onChange("seo_technical_issues", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="seo-upcoming-changes" className="block text-xs text-slate-400 mb-1">
            Any upcoming site changes?
          </label>
          <select
            id="seo-upcoming-changes"
            className={inputClass}
            value={v("seo_upcoming_changes")}
            onChange={(e) => onChange("seo_upcoming_changes", e.target.value)}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        {v("seo_upcoming_changes") === "yes" && (
          <div>
            <label htmlFor="seo-upcoming-changes-details" className="block text-xs text-slate-400 mb-1">
              Upcoming Changes Details
            </label>
            <textarea
              id="seo-upcoming-changes-details"
              className={`${inputClass} min-h-[80px] resize-y`}
              placeholder="Describe planned redesigns, migrations, or major changes"
              value={v("seo_upcoming_changes_details")}
              onChange={(e) =>
                onChange("seo_upcoming_changes_details", e.target.value)
              }
            />
          </div>
        )}
      </div>

      {/* Link Building */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">
          Link Building
        </h3>
        <div>
          <label htmlFor="seo-previous-link-building" className="block text-xs text-slate-400 mb-1">
            Previous link building?
          </label>
          <select
            id="seo-previous-link-building"
            className={inputClass}
            value={v("seo_previous_link_building")}
            onChange={(e) =>
              onChange("seo_previous_link_building", e.target.value)
            }
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        {v("seo_previous_link_building") === "yes" && (
          <div>
            <label htmlFor="seo-link-building-details" className="block text-xs text-slate-400 mb-1">
              Link Building Details
            </label>
            <textarea
              id="seo-link-building-details"
              className={`${inputClass} min-h-[80px] resize-y`}
              placeholder="What link building strategies were used?"
              value={v("seo_link_building_details")}
              onChange={(e) =>
                onChange("seo_link_building_details", e.target.value)
              }
            />
          </div>
        )}
        <div>
          <label htmlFor="seo-industry-associations" className="block text-xs text-slate-400 mb-1">
            Industry Associations
          </label>
          <textarea
            id="seo-industry-associations"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="Professional associations or memberships"
            value={v("seo_industry_associations")}
            onChange={(e) =>
              onChange("seo_industry_associations", e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="seo-community-involvement" className="block text-xs text-slate-400 mb-1">
            Community Involvement
          </label>
          <textarea
            id="seo-community-involvement"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="Sponsorships, events, community activities"
            value={v("seo_community_involvement")}
            onChange={(e) =>
              onChange("seo_community_involvement", e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="seo-pr-opportunities" className="block text-xs text-slate-400 mb-1">
            PR Opportunities
          </label>
          <textarea
            id="seo-pr-opportunities"
            className={`${inputClass} min-h-[80px] resize-y`}
            placeholder="Any newsworthy stories, awards, or media opportunities?"
            value={v("seo_pr_opportunities")}
            onChange={(e) => onChange("seo_pr_opportunities", e.target.value)}
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
            <label htmlFor="seo-primary-goal" className="block text-xs text-slate-400 mb-1">
              Primary SEO Goal <span className="text-red-400">*</span>
            </label>
            <select
              id="seo-primary-goal"
              className={inputClass}
              value={v("seo_primary_goal")}
              onChange={(e) => onChange("seo_primary_goal", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Increase Organic Traffic">
                Increase Organic Traffic
              </option>
              <option value="Improve Local Rankings">
                Improve Local Rankings
              </option>
              <option value="National Rankings">National Rankings</option>
              <option value="E-commerce SEO">E-commerce SEO</option>
              <option value="Recovery from Penalty">
                Recovery from Penalty
              </option>
              <option value="Brand Visibility">Brand Visibility</option>
            </select>
          </div>
          <div>
            <label htmlFor="seo-timeframe" className="block text-xs text-slate-400 mb-1">
              Timeframe
            </label>
            <select
              id="seo-timeframe"
              className={inputClass}
              value={v("seo_timeframe")}
              onChange={(e) => onChange("seo_timeframe", e.target.value)}
            >
              <option value="">Select</option>
              <option value="3-6 months">3-6 months</option>
              <option value="6-12 months">6-12 months</option>
              <option value="12+ months">12+ months</option>
              <option value="Ongoing">Ongoing</option>
            </select>
          </div>
          <div>
            <label htmlFor="seo-reporting-frequency" className="block text-xs text-slate-400 mb-1">
              Preferred Reporting Frequency
            </label>
            <select
              id="seo-reporting-frequency"
              className={inputClass}
              value={v("seo_reporting_frequency")}
              onChange={(e) =>
                onChange("seo_reporting_frequency", e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="Weekly">Weekly</option>
              <option value="Bi-weekly">Bi-weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

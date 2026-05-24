"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface SocialData {
  followers?: number;
  followersChange?: number;
  engagementRate?: number;
  reach?: number;
  impressions?: number;
  platformBreakdown?: { platform: string; followers: number; engagement: number; reach: number }[];
  topPosts?: { platform: string; content: string; engagement: number; reach: number; date: string }[];
}

interface SocialSectionFormProps {
  data: SocialData;
  onChange: (data: SocialData) => void;
}

export default function SocialSectionForm({ data, onChange }: SocialSectionFormProps) {
  const [localData, setLocalData] = useState<SocialData>({
    followers: 0,
    followersChange: 0,
    engagementRate: 0,
    reach: 0,
    impressions: 0,
    platformBreakdown: [],
    topPosts: [],
    ...data,
  });

  function update(partial: Partial<SocialData>) {
    const next = { ...localData, ...partial };
    setLocalData(next);
    onChange(next);
  }

  // Platform Breakdown helpers
  function addPlatform() {
    update({ platformBreakdown: [...(localData.platformBreakdown || []), { platform: "", followers: 0, engagement: 0, reach: 0 }] });
  }
  function removePlatform(idx: number) {
    update({ platformBreakdown: (localData.platformBreakdown || []).filter((_, i) => i !== idx) });
  }
  function updatePlatform(idx: number, field: string, value: string | number) {
    const entries = [...(localData.platformBreakdown || [])];
    entries[idx] = { ...entries[idx], [field]: value };
    update({ platformBreakdown: entries });
  }

  // Top Posts helpers
  function addPost() {
    update({ topPosts: [...(localData.topPosts || []), { platform: "", content: "", engagement: 0, reach: 0, date: "" }] });
  }
  function removePost(idx: number) {
    update({ topPosts: (localData.topPosts || []).filter((_, i) => i !== idx) });
  }
  function updatePost(idx: number, field: string, value: string | number) {
    const entries = [...(localData.topPosts || [])];
    entries[idx] = { ...entries[idx], [field]: value };
    update({ topPosts: entries });
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label htmlFor="social-followers" className="block text-xs text-slate-400 mb-1">Total Followers</label>
          <input
            id="social-followers"
            type="number"
            value={localData.followers || ""}
            onChange={(e) => update({ followers: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none"
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="social-followers-change" className="block text-xs text-slate-400 mb-1">Followers Change</label>
          <input
            id="social-followers-change"
            type="number"
            value={localData.followersChange || ""}
            onChange={(e) => update({ followersChange: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none"
            placeholder="+/-"
          />
        </div>
        <div>
          <label htmlFor="social-engagement-rate" className="block text-xs text-slate-400 mb-1">Engagement Rate (%)</label>
          <input
            id="social-engagement-rate"
            type="number"
            step="0.01"
            value={localData.engagementRate || ""}
            onChange={(e) => update({ engagementRate: parseFloat(e.target.value) || 0 })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none"
            placeholder="0.00"
          />
        </div>
        <div>
          <label htmlFor="social-reach" className="block text-xs text-slate-400 mb-1">Reach</label>
          <input
            id="social-reach"
            type="number"
            value={localData.reach || ""}
            onChange={(e) => update({ reach: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none"
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="social-impressions" className="block text-xs text-slate-400 mb-1">Impressions</label>
          <input
            id="social-impressions"
            type="number"
            value={localData.impressions || ""}
            onChange={(e) => update({ impressions: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none"
            placeholder="0"
          />
        </div>
      </div>

      {/* Platform Breakdown */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Platform Breakdown</span>
          <button type="button" onClick={addPlatform} className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300">
            <Plus size={14} /> Add Platform
          </button>
        </div>
        {(localData.platformBreakdown || []).length > 0 && (
          <div className="space-y-2">
            <div className="grid grid-cols-[1fr_100px_100px_100px_32px] gap-2 text-[10px] text-slate-500 uppercase tracking-wider px-1">
              <span>Platform</span><span>Followers</span><span>Eng. Rate</span><span>Reach</span><span />
            </div>
            {(localData.platformBreakdown || []).map((p, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_100px_100px_100px_32px] gap-2">
                <select
                  value={p.platform}
                  onChange={(e) => updatePlatform(idx, "platform", e.target.value)}
                  aria-label="Platform"
                  className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                >
                  <option value="" className="bg-slate-900">Select...</option>
                  <option value="Facebook" className="bg-slate-900">Facebook</option>
                  <option value="Instagram" className="bg-slate-900">Instagram</option>
                  <option value="LinkedIn" className="bg-slate-900">LinkedIn</option>
                  <option value="X/Twitter" className="bg-slate-900">X/Twitter</option>
                  <option value="TikTok" className="bg-slate-900">TikTok</option>
                  <option value="YouTube" className="bg-slate-900">YouTube</option>
                  <option value="Other" className="bg-slate-900">Other</option>
                </select>
                <input type="number" value={p.followers || ""} onChange={(e) => updatePlatform(idx, "followers", parseInt(e.target.value) || 0)} aria-label="Followers" className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none" />
                <input type="number" step="0.01" value={p.engagement || ""} onChange={(e) => updatePlatform(idx, "engagement", parseFloat(e.target.value) || 0)} aria-label="Engagement Rate" className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none" />
                <input type="number" value={p.reach || ""} onChange={(e) => updatePlatform(idx, "reach", parseInt(e.target.value) || 0)} aria-label="Reach" className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none" />
                <button type="button" onClick={() => removePlatform(idx)} className="text-red-400/60 hover:text-red-400"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top Posts */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Top Posts</span>
          <button type="button" onClick={addPost} className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300">
            <Plus size={14} /> Add Post
          </button>
        </div>
        {(localData.topPosts || []).length > 0 && (
          <div className="space-y-3">
            {(localData.topPosts || []).map((post, idx) => (
              <div key={idx} className="p-3 bg-white/[0.02] border border-white/5 rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <select
                    value={post.platform}
                    onChange={(e) => updatePost(idx, "platform", e.target.value)}
                    aria-label="Platform"
                    className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                  >
                    <option value="" className="bg-slate-900">Platform</option>
                    <option value="Facebook" className="bg-slate-900">Facebook</option>
                    <option value="Instagram" className="bg-slate-900">Instagram</option>
                    <option value="LinkedIn" className="bg-slate-900">LinkedIn</option>
                    <option value="X/Twitter" className="bg-slate-900">X/Twitter</option>
                    <option value="TikTok" className="bg-slate-900">TikTok</option>
                  </select>
                  <input type="date" value={post.date} onChange={(e) => updatePost(idx, "date", e.target.value)} aria-label="Date" className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none" />
                  <input type="number" value={post.engagement || ""} onChange={(e) => updatePost(idx, "engagement", parseInt(e.target.value) || 0)} aria-label="Engagement" placeholder="Engagement" className="w-28 px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none" />
                  <input type="number" value={post.reach || ""} onChange={(e) => updatePost(idx, "reach", parseInt(e.target.value) || 0)} aria-label="Reach" placeholder="Reach" className="w-28 px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white focus:border-emerald-500/50 focus:outline-none" />
                  <button type="button" onClick={() => removePost(idx)} className="text-red-400/60 hover:text-red-400 ml-auto"><Trash2 size={14} /></button>
                </div>
                <textarea
                  value={post.content}
                  onChange={(e) => updatePost(idx, "content", e.target.value)}
                  aria-label="Content"
                  rows={2}
                  placeholder="Post content / description..."
                  className="w-full px-2 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none resize-none"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

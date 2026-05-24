"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, X } from "lucide-react";

const inputClass =
  "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:border-emerald-400/50 focus:outline-none";

const selectClass =
  "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:border-emerald-400/50 focus:outline-none";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

interface TagOption {
  id: string;
  name: string;
  slug: string;
}

interface CategoryOption {
  id: string;
  name: string;
  slug: string;
}

interface PostMetaPanelProps {
  status: string;
  onStatusChange: (v: string) => void;
  coverImage: string;
  onCoverImageChange: (v: string) => void;
  metaTitle: string;
  onMetaTitleChange: (v: string) => void;
  metaDescription: string;
  onMetaDescriptionChange: (v: string) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  selectedCategories: string[];
  onCategoriesChange: (cats: string[]) => void;
  readingTime: number;
}

export default function PostMetaPanel({
  status,
  onStatusChange,
  coverImage,
  onCoverImageChange,
  metaTitle,
  onMetaTitleChange,
  metaDescription,
  onMetaDescriptionChange,
  selectedTags,
  onTagsChange,
  selectedCategories,
  onCategoriesChange,
  readingTime,
}: PostMetaPanelProps) {
  const [availableTags, setAvailableTags] = useState<TagOption[]>([]);
  const [availableCategories, setAvailableCategories] = useState<CategoryOption[]>([]);
  const [newTag, setNewTag] = useState("");
  const [newCategory, setNewCategory] = useState("");

  // Load existing tags and categories
  useEffect(() => {
    fetch("/api/admin/blog/tags")
      .then((r) => r.json())
      .then((data) => setAvailableTags(Array.isArray(data) ? data : []))
      .catch(() => {});
    fetch("/api/admin/blog/categories")
      .then((r) => r.json())
      .then((data) => setAvailableCategories(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const toggleTag = (name: string) => {
    onTagsChange(
      selectedTags.includes(name)
        ? selectedTags.filter((t) => t !== name)
        : [...selectedTags, name]
    );
  };

  const toggleCategory = (name: string) => {
    onCategoriesChange(
      selectedCategories.includes(name)
        ? selectedCategories.filter((c) => c !== name)
        : [...selectedCategories, name]
    );
  };

  const addNewTag = useCallback(() => {
    const trimmed = newTag.trim();
    if (!trimmed) return;
    if (!selectedTags.includes(trimmed)) {
      onTagsChange([...selectedTags, trimmed]);
    }
    if (!availableTags.find((t) => t.name.toLowerCase() === trimmed.toLowerCase())) {
      setAvailableTags((prev) => [
        ...prev,
        { id: `new-${trimmed}`, name: trimmed, slug: generateSlug(trimmed) },
      ]);
    }
    setNewTag("");
  }, [newTag, selectedTags, availableTags, onTagsChange]);

  const addNewCategory = useCallback(() => {
    const trimmed = newCategory.trim();
    if (!trimmed) return;
    if (!selectedCategories.includes(trimmed)) {
      onCategoriesChange([...selectedCategories, trimmed]);
    }
    if (!availableCategories.find((c) => c.name.toLowerCase() === trimmed.toLowerCase())) {
      setAvailableCategories((prev) => [
        ...prev,
        { id: `new-${trimmed}`, name: trimmed, slug: generateSlug(trimmed) },
      ]);
    }
    setNewCategory("");
  }, [newCategory, selectedCategories, availableCategories, onCategoriesChange]);

  return (
    <div className="space-y-5">
      {/* Status */}
      <div className="bg-[#111827] border border-white/6 rounded-xl p-4">
        <label htmlFor="post-status" className="block text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wider">
          Status
        </label>
        <select id="post-status" value={status} onChange={(e) => onStatusChange(e.target.value)} className={selectClass}>
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="ARCHIVED">Archived</option>
        </select>
        <p className="text-[10px] text-slate-500 mt-1.5">
          ~{readingTime} min read
        </p>
      </div>

      {/* Cover Image */}
      <div className="bg-[#111827] border border-white/6 rounded-xl p-4">
        <label htmlFor="post-cover-image" className="block text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wider">
          Cover Image
        </label>
        <input
          id="post-cover-image"
          type="url"
          value={coverImage}
          onChange={(e) => onCoverImageChange(e.target.value)}
          placeholder="https://..."
          className={inputClass}
        />
        {coverImage && (
          <div className="mt-2 relative rounded-lg overflow-hidden border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverImage}
              alt="Cover preview"
              className="w-full h-32 object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="bg-[#111827] border border-white/6 rounded-xl p-4">
        <span className="block text-xs text-slate-400 mb-2 font-semibold uppercase tracking-wider">
          Tags
        </span>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {availableTags.map((tag) => {
            const selected = selectedTags.includes(tag.name);
            return (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.name)}
                className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-colors ${
                  selected
                    ? "bg-cyan-400/15 text-cyan-400 border border-cyan-400/30"
                    : "bg-white/5 text-slate-400 border border-white/10 hover:border-white/20"
                }`}
              >
                {tag.name}
                {selected && <X size={9} className="inline ml-0.5" />}
              </button>
            );
          })}
        </div>
        <div className="flex gap-1.5">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addNewTag();
              }
            }}
            placeholder="New tag..."
            aria-label="Add new tag"
            className={`${inputClass} text-xs`}
          />
          <button
            type="button"
            onClick={addNewTag}
            className="px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <Plus size={12} />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-[#111827] border border-white/6 rounded-xl p-4">
        <span className="block text-xs text-slate-400 mb-2 font-semibold uppercase tracking-wider">
          Categories
        </span>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {availableCategories.map((cat) => {
            const selected = selectedCategories.includes(cat.name);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleCategory(cat.name)}
                className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-colors ${
                  selected
                    ? "bg-purple-400/15 text-purple-400 border border-purple-400/30"
                    : "bg-white/5 text-slate-400 border border-white/10 hover:border-white/20"
                }`}
              >
                {cat.name}
                {selected && <X size={9} className="inline ml-0.5" />}
              </button>
            );
          })}
        </div>
        <div className="flex gap-1.5">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addNewCategory();
              }
            }}
            placeholder="New category..."
            aria-label="Add new category"
            className={`${inputClass} text-xs`}
          />
          <button
            type="button"
            onClick={addNewCategory}
            className="px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <Plus size={12} />
          </button>
        </div>
      </div>

      {/* SEO Settings */}
      <div className="bg-[#111827] border border-white/6 rounded-xl p-4 space-y-3">
        <h3 className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
          SEO
        </h3>
        <div>
          <label htmlFor="post-meta-title" className="block text-[10px] text-slate-500 mb-1">Meta Title</label>
          <input
            id="post-meta-title"
            type="text"
            value={metaTitle}
            onChange={(e) => onMetaTitleChange(e.target.value)}
            placeholder="Custom meta title..."
            className={`${inputClass} text-xs`}
          />
          <p className="text-[10px] text-slate-600 mt-0.5">
            {metaTitle.length}/60
          </p>
        </div>
        <div>
          <label htmlFor="post-meta-description" className="block text-[10px] text-slate-500 mb-1">Meta Description</label>
          <textarea
            id="post-meta-description"
            value={metaDescription}
            onChange={(e) => onMetaDescriptionChange(e.target.value)}
            rows={3}
            placeholder="SEO description..."
            className={`${inputClass} text-xs resize-y`}
          />
          <p className="text-[10px] text-slate-600 mt-0.5">
            {metaDescription.length}/160
          </p>
        </div>
      </div>
    </div>
  );
}

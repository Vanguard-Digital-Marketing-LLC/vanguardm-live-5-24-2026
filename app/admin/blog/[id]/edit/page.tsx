"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, Save, Trash2, X, Plus } from "lucide-react";
import ConfirmModal from "@/components/admin/shared/ConfirmModal";
import BlogContent from "@/components/blog/BlogContent";

const inputClass =
  "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:border-emerald-400/50 focus:outline-none";

const selectClass =
  "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:border-emerald-400/50 focus:outline-none";

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

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(true); // Manual by default for editing
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [status, setStatus] = useState("DRAFT");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  // Tags & Categories
  const [availableTags, setAvailableTags] = useState<TagOption[]>([]);
  const [availableCategories, setAvailableCategories] = useState<CategoryOption[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [newCategory, setNewCategory] = useState("");

  // Load post data, tags, and categories on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [postRes, tagsRes, catsRes] = await Promise.all([
          fetch(`/api/admin/blog/${postId}`),
          fetch("/api/admin/blog/tags"),
          fetch("/api/admin/blog/categories"),
        ]);

        if (!postRes.ok) throw new Error("Post not found");

        const post = await postRes.json();
        const tags = await tagsRes.json();
        const cats = await catsRes.json();

        setTitle(post.title);
        setSlug(post.slug);
        setContent(post.content);
        setExcerpt(post.excerpt || "");
        setCoverImage(post.coverImage || "");
        setStatus(post.status);
        setMetaTitle(post.metaTitle || "");
        setMetaDescription(post.metaDescription || "");
        setSelectedTags(post.tags.map((t: { tag: TagOption }) => t.tag.name));
        setSelectedCategories(post.categories.map((c: { category: CategoryOption }) => c.category.name));
        setAvailableTags(Array.isArray(tags) ? tags : []);
        setAvailableCategories(Array.isArray(cats) ? cats : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [postId]);

  const toggleTag = (name: string) => {
    setSelectedTags((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]
    );
  };

  const toggleCategory = (name: string) => {
    setSelectedCategories((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const addNewTag = useCallback(() => {
    const trimmed = newTag.trim();
    if (!trimmed) return;
    if (!selectedTags.includes(trimmed)) {
      setSelectedTags((prev) => [...prev, trimmed]);
    }
    if (!availableTags.find((t) => t.name.toLowerCase() === trimmed.toLowerCase())) {
      setAvailableTags((prev) => [...prev, { id: `new-${trimmed}`, name: trimmed, slug: generateSlug(trimmed) }]);
    }
    setNewTag("");
  }, [newTag, selectedTags, availableTags]);

  const addNewCategory = useCallback(() => {
    const trimmed = newCategory.trim();
    if (!trimmed) return;
    if (!selectedCategories.includes(trimmed)) {
      setSelectedCategories((prev) => [...prev, trimmed]);
    }
    if (!availableCategories.find((c) => c.name.toLowerCase() === trimmed.toLowerCase())) {
      setAvailableCategories((prev) => [...prev, { id: `new-${trimmed}`, name: trimmed, slug: generateSlug(trimmed) }]);
    }
    setNewCategory("");
  }, [newCategory, selectedCategories, availableCategories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return setError("Title is required");
    if (!content.trim()) return setError("Content is required");

    setError("");
    setSubmitting(true);

    try {
      const res = await fetch(`/api/admin/blog/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug.trim(),
          content,
          excerpt: excerpt.trim() || null,
          coverImage: coverImage.trim() || null,
          status,
          metaTitle: metaTitle.trim() || null,
          metaDescription: metaDescription.trim() || null,
          tags: selectedTags,
          categories: selectedCategories,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update post");
      }

      router.push("/admin/blog");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/blog/${postId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      router.push("/admin/blog");
    } catch {
      setError("Failed to delete post");
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-sm text-slate-500">Loading post...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white font-display">Edit Post</h1>
            <p className="text-sm text-slate-400 mt-0.5">Update blog post details</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-sm text-slate-400 hover:text-white transition-colors"
          >
            {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/30 text-sm text-red-400 hover:text-red-300 hover:border-red-500/50 transition-colors"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title & Slug */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label htmlFor="edit-blog-title" className="block text-xs text-slate-400 mb-1">Title *</label>
            <input
              id="edit-blog-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title..."
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="edit-blog-slug" className="block text-xs text-slate-400 mb-1">
              Slug
              {slugManual && (
                <button
                  type="button"
                  onClick={() => { setSlugManual(false); setSlug(generateSlug(title)); }}
                  className="ml-2 text-emerald-400 hover:text-emerald-300"
                >
                  (auto)
                </button>
              )}
            </label>
            <input
              id="edit-blog-slug"
              type="text"
              value={slug}
              onChange={(e) => { setSlugManual(true); setSlug(e.target.value); }}
              placeholder="post-slug"
              className={inputClass}
            />
          </div>
        </div>

        {/* Status & Cover Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label htmlFor="edit-blog-status" className="block text-xs text-slate-400 mb-1">Status</label>
            <select id="edit-blog-status" value={status} onChange={(e) => setStatus(e.target.value)} className={selectClass}>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
          <div>
            <label htmlFor="edit-blog-cover-image" className="block text-xs text-slate-400 mb-1">Cover Image URL</label>
            <input
              id="edit-blog-cover-image"
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://..."
              className={inputClass}
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label htmlFor="edit-blog-excerpt" className="block text-xs text-slate-400 mb-1">Excerpt</label>
          <textarea
            id="edit-blog-excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            placeholder="Brief description for listing pages and SEO..."
            className={`${inputClass} resize-y`}
          />
        </div>

        {/* Content Editor / Preview */}
        <div>
          <label htmlFor="edit-blog-content" className="block text-xs text-slate-400 mb-1">Content * (Markdown)</label>
          <div className={`grid gap-4 ${showPreview ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
            <textarea
              id="edit-blog-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={20}
              placeholder="Write your post content in markdown..."
              className={`${inputClass} resize-y font-mono text-xs leading-relaxed`}
            />
            {showPreview && (
              <div className="bg-[#111827] border border-white/10 rounded-lg p-4 overflow-y-auto max-h-[520px]">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-3 font-semibold">Preview</p>
                {content ? (
                  <BlogContent content={content} />
                ) : (
                  <p className="text-sm text-slate-500 italic">Start typing to see preview...</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        <div>
          <span className="block text-xs text-slate-400 mb-2">Tags</span>
          <div className="flex flex-wrap gap-2 mb-2">
            {availableTags.map((tag) => {
              const selected = selectedTags.includes(tag.name);
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => toggleTag(tag.name)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    selected
                      ? "bg-cyan-400/15 text-cyan-400 border border-cyan-400/30"
                      : "bg-white/5 text-slate-400 border border-white/10 hover:border-white/20"
                  }`}
                >
                  {tag.name}
                  {selected && <X size={10} className="inline ml-1" />}
                </button>
              );
            })}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addNewTag(); } }}
              placeholder="Add new tag..."
              aria-label="Add new tag"
              className={`${inputClass} max-w-xs`}
            />
            <button
              type="button"
              onClick={addNewTag}
              className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div>
          <span className="block text-xs text-slate-400 mb-2">Categories</span>
          <div className="flex flex-wrap gap-2 mb-2">
            {availableCategories.map((cat) => {
              const selected = selectedCategories.includes(cat.name);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleCategory(cat.name)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    selected
                      ? "bg-purple-400/15 text-purple-400 border border-purple-400/30"
                      : "bg-white/5 text-slate-400 border border-white/10 hover:border-white/20"
                  }`}
                >
                  {cat.name}
                  {selected && <X size={10} className="inline ml-1" />}
                </button>
              );
            })}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addNewCategory(); } }}
              placeholder="Add new category..."
              aria-label="Add new category"
              className={`${inputClass} max-w-xs`}
            />
            <button
              type="button"
              onClick={addNewCategory}
              className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* SEO Fields */}
        <div className="bg-[#111827] border border-white/6 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white font-display">SEO Settings</h3>
          <div>
            <label htmlFor="edit-blog-meta-title" className="block text-xs text-slate-400 mb-1">Meta Title</label>
            <input
              id="edit-blog-meta-title"
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder={title || "Custom meta title..."}
              className={inputClass}
            />
            <p className="text-[10px] text-slate-500 mt-1">{metaTitle.length}/60 characters</p>
          </div>
          <div>
            <label htmlFor="edit-blog-meta-description" className="block text-xs text-slate-400 mb-1">Meta Description</label>
            <textarea
              id="edit-blog-meta-description"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={2}
              placeholder="SEO description for search results..."
              className={`${inputClass} resize-y`}
            />
            <p className="text-[10px] text-slate-500 mt-1">{metaDescription.length}/160 characters</p>
          </div>
        </div>

        {/* Error */}
        {error && <p className="text-sm text-red-400">{error}</p>}

        {/* Submit */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm transition-colors disabled:opacity-50"
          >
            <Save size={16} />
            {submitting ? "Saving..." : "Update Post"}
          </button>
          <Link
            href="/admin/blog"
            className="px-4 py-3 rounded-lg border border-white/10 text-sm text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Blog Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmLabel="Delete Post"
        danger
        loading={deleting}
      />
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Save, Trash2 } from "lucide-react";
import PostMetaPanel from "./PostMetaPanel";
import BlogContent from "@/components/blog/BlogContent";
import { countWords } from "@/lib/word-count";

interface PostData {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  status: string;
  metaTitle: string;
  metaDescription: string;
  readingTime?: number | null;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  author?: { id: string; name: string | null; email: string };
  tags: string[];
  categories: string[];
}

interface PostEditorProps {
  post?: PostData;
}

const inputClass =
  "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:border-emerald-400/50 focus:outline-none";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function PostEditor({ post }: PostEditorProps) {
  const router = useRouter();
  const isEditing = !!post?.id;
  const [showPreview, setShowPreview] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Form state
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [slugManual, setSlugManual] = useState(!!post?.id);
  const [content, setContent] = useState(post?.content || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [coverImage, setCoverImage] = useState(post?.coverImage || "");
  const [status, setStatus] = useState(post?.status || "DRAFT");
  const [metaTitle, setMetaTitle] = useState(post?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(post?.metaDescription || "");
  const [selectedTags, setSelectedTags] = useState<string[]>(post?.tags || []);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(post?.categories || []);

  // Auto-generate slug from title (only for new posts)
  useEffect(() => {
    if (!slugManual && title) {
      setSlug(generateSlug(title));
    }
  }, [title, slugManual]);

  // Auto-calculate reading time
  const wordCount = countWords(content);
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const handleSubmit = async (overrideStatus?: string) => {
    if (!title.trim()) return setError("Title is required");
    if (!content.trim()) return setError("Content is required");

    setError("");
    setSuccessMsg("");
    setSubmitting(true);

    const finalStatus = overrideStatus || status;
    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      content,
      excerpt: excerpt.trim() || undefined,
      coverImage: coverImage.trim() || undefined,
      status: finalStatus,
      metaTitle: metaTitle.trim() || undefined,
      metaDescription: metaDescription.trim() || undefined,
      tags: selectedTags,
      categories: selectedCategories,
    };

    try {
      const url = isEditing ? `/api/admin/blog/${post.id}` : "/api/admin/blog";
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `Failed to ${isEditing ? "update" : "create"} post`);
      }

      if (isEditing) {
        setSuccessMsg("Post updated successfully");
        setTimeout(() => setSuccessMsg(""), 3000);
        router.refresh();
      } else {
        router.push("/admin/blog");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = useCallback(async () => {
    if (!isEditing || !confirm("Are you sure you want to delete this post? This cannot be undone.")) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/blog/${post.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete post");
      }
      router.push("/admin/blog");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
      setDeleting(false);
    }
  }, [isEditing, post?.id, router]);

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-sm text-slate-400 hover:text-white transition-colors"
          >
            {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
          {isEditing && (
            <span className="text-xs text-slate-500">
              {readingTime} min read / {wordCount} words
            </span>
          )}
        </div>
        {isEditing && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-400/20 text-sm text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-50"
          >
            <Trash2 size={14} />
            {deleting ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main editor area */}
        <div className="xl:col-span-3 space-y-4">
          {/* Title & Slug */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label htmlFor="post-title" className="block text-xs text-slate-400 mb-1">Title *</label>
              <input
                id="post-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post title..."
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="post-slug" className="block text-xs text-slate-400 mb-1">
                Slug
                {slugManual && !isEditing && (
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
                id="post-slug"
                type="text"
                value={slug}
                onChange={(e) => { setSlugManual(true); setSlug(e.target.value); }}
                placeholder="post-slug"
                className={inputClass}
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label htmlFor="post-excerpt" className="block text-xs text-slate-400 mb-1">Excerpt</label>
            <textarea
              id="post-excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              placeholder="Brief description for listing pages and SEO..."
              className={`${inputClass} resize-y`}
            />
          </div>

          {/* Content Editor / Preview */}
          <div>
            <label htmlFor="post-content" className="block text-xs text-slate-400 mb-1">
              Content * (Markdown)
              <span className="ml-2 text-slate-600">{wordCount} words / ~{readingTime} min read</span>
            </label>
            <div className={`grid gap-4 ${showPreview ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
              <textarea
                id="post-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={24}
                placeholder="Write your post content in markdown..."
                className={`${inputClass} resize-y font-mono text-xs leading-relaxed`}
              />
              {showPreview && (
                <div className="bg-[#111827] border border-white/10 rounded-lg p-4 overflow-y-auto max-h-[600px]">
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
        </div>

        {/* Meta sidebar */}
        <div className="xl:col-span-1">
          <PostMetaPanel
            status={status}
            onStatusChange={setStatus}
            coverImage={coverImage}
            onCoverImageChange={setCoverImage}
            metaTitle={metaTitle}
            onMetaTitleChange={setMetaTitle}
            metaDescription={metaDescription}
            onMetaDescriptionChange={setMetaDescription}
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
            selectedCategories={selectedCategories}
            onCategoriesChange={setSelectedCategories}
            readingTime={readingTime}
          />
        </div>
      </div>

      {/* Error / Success */}
      {error && <p className="text-sm text-red-400">{error}</p>}
      {successMsg && <p className="text-sm text-emerald-400">{successMsg}</p>}

      {/* Action buttons */}
      <div className="flex items-center gap-3 border-t border-white/6 pt-6">
        <button
          type="button"
          onClick={() => handleSubmit()}
          disabled={submitting}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm transition-colors disabled:opacity-50"
        >
          <Save size={16} />
          {submitting ? "Saving..." : isEditing ? "Update Post" : "Create Post"}
        </button>

        {status !== "PUBLISHED" && (
          <button
            type="button"
            onClick={() => handleSubmit("PUBLISHED")}
            disabled={submitting}
            className="px-5 py-3 rounded-lg bg-amber/10 border border-amber/30 text-amber hover:bg-amber/20 font-semibold text-sm transition-colors disabled:opacity-50"
          >
            Publish Now
          </button>
        )}

        <button
          type="button"
          onClick={() => router.push("/admin/blog")}
          className="px-4 py-3 rounded-lg border border-white/10 text-sm text-slate-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

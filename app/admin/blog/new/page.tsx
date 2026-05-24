"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PostEditor from "@/components/admin/blog/PostEditor";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          Back
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white font-display">New Post</h1>
          <p className="text-sm text-slate-400 mt-0.5">Create a new blog post</p>
        </div>
      </div>

      <PostEditor />
    </div>
  );
}

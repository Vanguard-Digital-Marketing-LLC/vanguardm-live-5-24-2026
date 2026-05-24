"use client";

export function hasAccess(courseSlug: string): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(`course_${courseSlug}_purchased`) === "true";
}

export function grantAccess(courseSlug: string) {
  localStorage.setItem(`course_${courseSlug}_purchased`, "true");
}

export function checkUrlForPurchase(courseSlug: string) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  if (params.get("purchased") === "true") {
    grantAccess(courseSlug);
    // Clean URL without reload
    const url = new URL(window.location.href);
    url.searchParams.delete("purchased");
    window.history.replaceState({}, "", url.toString());
  }
}

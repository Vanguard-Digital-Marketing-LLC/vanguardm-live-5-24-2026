"use client";

export async function redirectToCheckout(
  priceId: string,
  courseSlug: string,
) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId, courseSlug }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Checkout failed");
  }

  window.location.href = data.url;
}

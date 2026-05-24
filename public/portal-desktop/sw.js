// Minimal service worker — just enough to satisfy PWA install criteria.
// Network-first; no offline strategy beyond letting the browser cache normally.

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Pass through. Browsers require a fetch handler for installability.
  event.respondWith(fetch(event.request).catch(() => new Response("", { status: 504 })));
});

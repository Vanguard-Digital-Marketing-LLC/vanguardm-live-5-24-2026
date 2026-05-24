declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function trackEvent(event: string, params?: Record<string, string | number | boolean>) {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({ event, ...params });
  }
}

import {
  type CLSMetric,
  type FCPMetric,
  type INPMetric,
  type LCPMetric,
  type TTFBMetric,
  onCLS,
  onFCP,
  onINP,
  onLCP,
  onTTFB,
} from 'web-vitals';

export type WebVitalsMetric =
  | CLSMetric
  | FCPMetric
  | INPMetric
  | LCPMetric
  | TTFBMetric;

export function sendToAnalytics(metric: WebVitalsMetric) {
  // Create a custom metric payload
  const body = JSON.stringify({
    id: metric.id,
    name: metric.name,
    value: metric.value.toFixed(2),
    rating: metric.rating, // 'good', 'needs-improvement', or 'poor'
    delta: metric.delta,
    navigationType: getNavigationType(),
    // Optional additional data
    pageUrl: globalThis.location.href,
    userAgent: navigator.userAgent,
  });

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', JSON.parse(body));
  }

  // Send to your analytics service
  // Example with navigator.sendBeacon (fallback to fetch)
  const url = '/api/analytics/web-vitals'; // Your API endpoint
  (navigator.sendBeacon && navigator.sendBeacon(url, body)) ||
    fetch(url, {
      body,
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
    });
}

// Get navigation type (navigate, reload, back_forward, prerender)
function getNavigationType() {
  const nav = performance.getEntriesByType('navigation')[0]!;
  return nav.type || 'unknown';
}

// Register all available web vitals metrics
export function registerWebVitals() {
  onCLS(sendToAnalytics);
  onFCP(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}

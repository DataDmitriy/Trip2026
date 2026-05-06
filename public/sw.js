// Minimal service worker: app-shell + Mapbox tile cache.
// Bumps cache name to invalidate on each deploy.

const VERSION = "trip-helper-v1";
const APP_SHELL = "trip-shell-" + VERSION;
const RUNTIME = "trip-runtime-" + VERSION;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(APP_SHELL).then((cache) => cache.addAll([
      "/",
      "/manifest.webmanifest",
    ])).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== APP_SHELL && k !== RUNTIME)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Network-first for API / Next.js dynamic.
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/_next/data/")) {
    return;
  }

  // Cache-first for Mapbox tiles, then update.
  if (url.hostname.endsWith("mapbox.com") || url.hostname.endsWith("tiles.mapbox.com")) {
    event.respondWith(
      caches.open(RUNTIME).then(async (cache) => {
        const cached = await cache.match(req);
        const fetched = fetch(req).then((res) => {
          if (res.ok) cache.put(req, res.clone());
          return res;
        }).catch(() => cached);
        return cached || fetched;
      })
    );
    return;
  }

  // Stale-while-revalidate for our own static.
  if (url.origin === location.origin) {
    event.respondWith(
      caches.open(APP_SHELL).then(async (cache) => {
        const cached = await cache.match(req);
        const fetched = fetch(req).then((res) => {
          if (res.ok) cache.put(req, res.clone());
          return res;
        }).catch(() => cached);
        return cached || fetched;
      })
    );
  }
});

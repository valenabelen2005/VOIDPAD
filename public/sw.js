const CACHE = 'voidpad-v1'
const STATIC = ['/manifest.json', '/icons/icon-192.png', '/icons/icon-512.png']

const OFFLINE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>VOIDPAD — Offline</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #0a0a0f; color: #f0f0f5; font-family: sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; text-align: center; padding: 2rem; }
    h1 { font-size: 1.5rem; font-weight: 700; color: #00e5ff; margin-bottom: 0.75rem; letter-spacing: 0.05em; }
    p { color: #8888a0; font-size: 0.9rem; line-height: 1.6; }
  </style>
</head>
<body>
  <div>
    <h1>VOIDPAD</h1>
    <p>You're offline.<br/>Come back when you're connected.</p>
  </div>
</body>
</html>`

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(STATIC))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  if (!request.url.startsWith(self.location.origin)) return

  // Next.js internals: network first, then cache
  if (request.url.includes('/_next/')) {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const clone = res.clone()
          caches.open(CACHE).then((c) => c.put(request, clone))
          return res
        })
        .catch(() => caches.match(request))
    )
    return
  }

  // Images: cache first
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((res) => {
            const clone = res.clone()
            caches.open(CACHE).then((c) => c.put(request, clone))
            return res
          })
      )
    )
    return
  }

  // Navigation: network first, offline fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(
        () =>
          caches.match(request) ||
          new Response(OFFLINE_HTML, { headers: { 'Content-Type': 'text/html' } })
      )
    )
  }
})

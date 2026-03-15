# 👻 Phantom Proxy

A fast, modern web proxy built with Node.js, Fastify, and a custom service worker engine.

## Features

- Custom proxy engine (service worker based)
- libcurl-transport for modern site support (TikTok, streaming)
- Wisp WebSocket tunneling
- HTML, CSS, JS, and HLS/m3u8 URL rewriting
- Runtime page injection for JS-driven navigation
- DuckDuckGo search fallback
- COOP/COEP headers for WebAssembly game support
- Deploy anywhere Node.js runs

## Setup

```bash
npm install
npm start
```

Server runs on port `8080` by default, or whatever `PORT` env var is set to.

## Deploy to Railway / Render / Fly.io

1. Push this repo to GitHub
2. Connect repo to Railway / Render / Fly.io
3. Set start command to `npm start`
4. Done — HTTPS is handled automatically

## File Structure

```
phantom/
├── src/
│   └── index.js          # Fastify server + Wisp routing
├── public/
│   ├── index.html        # Homepage
│   ├── style.css         # Styles
│   ├── 404.html          # 404 page
│   ├── phantom.config.js # Proxy config (prefix + encode/decode)
│   ├── sw.js             # Service worker — the proxy engine
│   ├── phantom.client.js # Injected into every proxied page
│   ├── register-sw.js    # Service worker registration
│   ├── search.js         # URL vs search query detection
│   └── app.js            # Frontend wiring + BareMux setup
└── package.json
```

## Requirements

- Node.js 18+
- HTTPS in production (required for service workers)
- 

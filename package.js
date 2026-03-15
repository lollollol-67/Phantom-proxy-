{
  "name": "phantom-proxy",
  "version": "1.0.0",
  "description": "Phantom - A fast, modern web proxy",
  "type": "module",
  "engines": {
    "node": ">=18.0.0"
  },
  "scripts": {
    "start": "node src/index.js"
  },
  "keywords": ["proxy", "web-proxy", "phantom", "unblock"],
  "license": "MIT",
  "dependencies": {
    "fastify": "^5.4.0",
    "@fastify/static": "^8.2.0",
    "@fastify/cookie": "^11.0.0",
    "@mercuryworkshop/bare-mux": "^2.1.7",
    "@mercuryworkshop/libcurl-transport": "^1.5.2",
    "@mercuryworkshop/wisp-js": "^0.4.1",
    "ws": "^8.18.3"
  }
  }

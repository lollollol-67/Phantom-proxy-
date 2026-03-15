// Phantom Proxy Configuration
// This file runs in both the Service Worker context and the page context.
// "self" refers to the SW global scope when imported via importScripts,
// and to "window" when loaded as a regular script tag.

const __phantom$KEY = 0x26; // XOR rotation key for URL encoding

self.__phantom$config = {
  // The prefix all proxied requests travel under
  prefix: "/phantom/service/",

  // Encode a URL into a safe path segment using XOR + base64url
  encodeUrl(url) {
    const xored = Array.from(url)
      .map((c, i) =>
        String.fromCharCode(c.charCodeAt(0) ^ ((__phantom$KEY + i) % 256))
      )
      .join("");
    return btoa(xored)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  },

  // Decode a path segment back to the original URL
  decodeUrl(encoded) {
    try {
      let s = encoded.replace(/-/g, "+").replace(/_/g, "/");
      while (s.length % 4) s += "=";
      const decoded = atob(s);
      return Array.from(decoded)
        .map((c, i) =>
          String.fromCharCode(c.charCodeAt(0) ^ ((__phantom$KEY + i) % 256))
        )
        .join("");
    } catch {
      return null;
    }
  },
};

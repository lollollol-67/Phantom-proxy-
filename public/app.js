"use strict";

const form    = document.getElementById("phantom-form");
const address = document.getElementById("phantom-address");
const errEl   = document.getElementById("phantom-error");
const frame   = document.getElementById("phantom-frame");

// All non-URL queries go to DuckDuckGo
const SEARCH_ENGINE = "https://duckduckgo.com/?q=%s";

// BareMux connection — manages our libcurl transport
const connection = new BareMux.BareMuxConnection("/baremux/worker.js");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errEl.textContent = "";
  errEl.style.color = "#ff6b8a";

  const input = address.value.trim();
  if (!input) return;

  // Resolve input to a URL (or DuckDuckGo search)
  const url = search(input, SEARCH_ENGINE);

  // Register the service worker
  try {
    await registerSW();
  } catch (err) {
    errEl.textContent = "⚠ " + err.message;
    return;
  }

  // Set up the libcurl transport (tunnels through Wisp on the server)
  try {
    const wispUrl =
      (location.protocol === "https:" ? "wss" : "ws") +
      "://" +
      location.host +
      "/wisp/";

    const currentTransport = await connection.getTransport();
    if (currentTransport !== "/libcurl/index.mjs") {
      await connection.setTransport("/libcurl/index.mjs", [
        { websocket: wispUrl },
      ]);
    }
  } catch (err) {
    errEl.textContent = "⚠ Transport error: " + err.message;
    return;
  }

  // Navigate the frame to the proxied URL
  const proxied =
    __phantom$config.prefix + __phantom$config.encodeUrl(url);

  frame.style.display = "block";
  frame.src = proxied;

  // Hide the main page UI so the frame takes over full screen
  document.getElementById("phantom-page").style.display = "none";
});

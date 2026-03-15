"use strict";

const form    = document.getElementById("phantom-form");
const address = document.getElementById("phantom-address");
const errEl   = document.getElementById("phantom-error");

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

  // Open about:blank tab immediately — MUST happen here synchronously
  // inside the user gesture (submit event) or browsers will block it as a popup
  const newTab = window.open("about:blank", "_blank");

  if (!newTab) {
    errEl.textContent = "⚠ Pop-up blocked — please allow pop-ups for this site and try again.";
    return;
  }

  // Register the service worker on the current origin
  try {
    await registerSW();
  } catch (err) {
    newTab.close();
    errEl.textContent = "⚠ " + err.message;
    return;
  }

  // Set up libcurl transport through Wisp tunnel
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
    newTab.close();
    errEl.textContent = "⚠ Transport error: " + err.message;
    return;
  }

  // Navigate the new tab to the proxied URL
  // SW covers the new tab automatically since it's the same origin
  const proxied = __phantom$config.prefix + __phantom$config.encodeUrl(url);
  newTab.location.href = proxied;
});

"use strict";

/**
 * Resolve user input to a fully qualified URL.
 * Falls back to DuckDuckGo search for non-URL queries.
 *
 * @param {string} input   - Raw user input from the search bar
 * @param {string} template - Search URL template with %s placeholder
 * @returns {string} Fully qualified URL
 */
function search(input, template) {
  input = input.trim();

  // Direct valid URL: https://example.com
  try {
    return new URL(input).toString();
  } catch {}

  // URL with missing scheme: example.com, example.com/path
  try {
    const url = new URL("http://" + input);
    if (url.hostname.includes(".")) return url.toString();
  } catch {}

  // Treat as search query — use DuckDuckGo (or whatever template is passed)
  return template.replace("%s", encodeURIComponent(input));
}

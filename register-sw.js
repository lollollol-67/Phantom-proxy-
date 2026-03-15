"use strict";

const stockSW = "/sw.js";

// Hostnames allowed to run service workers on plain HTTP
const swAllowedHostnames = ["localhost", "127.0.0.1"];

async function registerSW() {
  if (!navigator.serviceWorker) {
    if (
      location.protocol !== "https:" &&
      !swAllowedHostnames.includes(location.hostname)
    ) {
      throw new Error(
        "Phantom requires HTTPS to run (except on localhost). Make sure your server has SSL."
      );
    }
    throw new Error("Your browser does not support service workers.");
  }

  await navigator.serviceWorker.register(stockSW, { scope: "/" });
}

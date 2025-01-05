#!/usr/bin/env node
"use strict";
process.env.INFERABLE_API_SECRET = process.argv
    .find((arg) => arg.startsWith("--secret="))
    ?.split("=")[1];
Promise.all([
    import("./sql-to-text/service.js"),
    import("./terminal-copilot/service.js"),
]);
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

#!/usr/bin/env node
"use strict";
process.env.INFERABLE_API_SECRET = process.argv
    .find((arg) => arg.startsWith("--secret="))
    ?.split("=")[1];
Promise.all([
    require("./sql-to-text/service"),
    require("./terminal-copilot/service"),
]);
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

#!/usr/bin/env node
import "./sql-to-text/service.js";
import "./terminal-copilot/service.js";
process.env.INFERABLE_API_SECRET =
    process.env.INFERABLE_API_SECRET || process.argv[2];
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
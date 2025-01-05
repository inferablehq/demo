#!/usr/bin/env node
"use strict";
Promise.all([
    require("./sql-to-text/service"),
    require("./terminal-copilot/service"),
]);
const secretArg = process.argv.find((arg) => arg.startsWith("--secret="));
process.env.INFERABLE_API_SECRET =
    process.env.INFERABLE_API_SECRET ||
        (secretArg ? secretArg.split("=")[1] : undefined);
if (!process.env.INFERABLE_API_SECRET) {
    console.log(process.argv);
    process.exit(1);
}
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

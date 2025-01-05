#!/usr/bin/env node

Promise.all([
  require("./sql-to-text/service"),
  require("./terminal-copilot/service"),
]);

const secretArg = process.argv.find((arg) => arg.startsWith("--secret="));
process.env.INFERABLE_API_SECRET =
  process.env.INFERABLE_API_SECRET ||
  (secretArg ? secretArg.split("=")[1] : undefined);

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

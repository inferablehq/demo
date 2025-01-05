Promise.all([
  require("./sql-to-text/service"),
  require("./terminal-copilot/service"),
]);

process.env.INFERABLE_API_SECRET =
  process.env.INFERABLE_API_SECRET || process.argv[2];

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

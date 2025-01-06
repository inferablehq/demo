#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("./sql-to-text/service"));
const service_2 = __importDefault(require("./terminal-copilot/service"));
Promise.all([service_1.default.start(), service_2.default.start()]).then(() => {
    console.log("🚀 Services started!");
});
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

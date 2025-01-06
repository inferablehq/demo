"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiSecret = void 0;
exports.apiSecret = process.argv
    .find((arg) => arg.startsWith("--secret="))
    ?.split("=")[1];

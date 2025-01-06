"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inferable_1 = require("inferable");
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = __importDefault(require("path"));
const secret_1 = require("../secret");
const zod_1 = require("zod");
const db = new better_sqlite3_1.default(path_1.default.resolve(__dirname, "../database.sqlite"));
const client = new inferable_1.Inferable({
    apiSecret: secret_1.apiSecret,
});
const service = client.service({
    name: "sqlite",
});
service.register({
    name: "getDatabaseContext",
    func: async () => {
        console.log("SQLite: Getting database context");
        return {
            tables: db
                .prepare("SELECT name FROM sqlite_master WHERE type='table'")
                .all(),
            schema: db
                .prepare("SELECT sql FROM sqlite_master WHERE type='table'")
                .all(),
        };
    },
    schema: {
        input: zod_1.z.object({}),
    },
});
service.register({
    name: "executeSql",
    func: async (input) => {
        console.log("SQLite: Executing SQL", input.sql);
        return db.prepare(input.sql).all();
    },
    schema: {
        input: zod_1.z.object({
            sql: zod_1.z.string(),
        }),
    },
});
exports.default = service;

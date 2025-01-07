"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inferable_1 = require("inferable");
const zod_1 = require("zod");
const secret_1 = require("../secret");
const seed_1 = __importDefault(require("./seed"));
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
            tables: seed_1.default
                .prepare("SELECT name FROM sqlite_master WHERE type='table'")
                .all(),
            schema: seed_1.default
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
        const mutation = input.sql.includes("UPDATE") ||
            input.sql.includes("INSERT") ||
            input.sql.includes("DELETE");
        if (mutation) {
            return seed_1.default.prepare(input.sql).run();
        }
        else {
            return seed_1.default.prepare(input.sql).all();
        }
    },
    schema: {
        input: zod_1.z.object({
            sql: zod_1.z.string(),
        }),
    },
});
exports.default = service;

import { Inferable } from "inferable";
import Database from "better-sqlite3";
import path from "path";
import { apiSecret } from "../secret";
import { z } from "zod";
const db = new Database(path.resolve(process.cwd(), "database.sqlite"));
const client = new Inferable({
    apiSecret,
});
const service = client.service({
    name: "sqlite",
});
service.register({
    name: "getDatabaseContext",
    func: async () => {
        // better-sqlite3 provides direct access to database information
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
        input: z.object({}),
    },
});
service.register({
    name: "executeSql",
    func: async (input) => {
        return db.prepare(input.sql).all();
    },
    schema: {
        input: z.object({
            sql: z.string(),
        }),
    },
});
export default service;

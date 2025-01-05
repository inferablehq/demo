import { Inferable } from "inferable";

import sqlite3 from "sqlite3";
import { promisify } from "util";
import { z } from "zod";

const db = new sqlite3.Database("database.sqlite");
const run = promisify(db.run.bind(db));

const client = new Inferable({
  apiSecret: process.env.INFERABLE_API_SECRET,
});

const service = client.service({
  name: "userDB",
});

service.register({
  name: "getDatabaseContext",
  func: async () => {
    return run(`SELECT * FROM sqlite_schema`);
  },
  schema: {
    input: z.object({}),
  },
});

service.register({
  name: "executeSql",
  func: async (input: { sql: string }) => {
    return run(input.sql);
  },
  schema: {
    input: z.object({
      sql: z.string(),
    }),
  },
});

service.start();

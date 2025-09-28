import { createClient } from "@libsql/client";

export const db = createClient({
  url: process.env.flexliving_TURSO_DATABASE_URL,
  authToken: process.env.flexliving_TURSO_AUTH_TOKEN,
});

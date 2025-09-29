import { createClient } from "@libsql/client";
import mockData from "../../../_data/mock_reviews.json" with { type: "json" };
import { normalizeReviews } from "../../../_lib/normalize.js";
import { setCorsHeaders } from "../../../_lib/cors.js";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { id } = req.query;

  try {
    await client.execute({
      sql: "INSERT OR IGNORE INTO approved_reviews (id) VALUES (?)",
      args: [String(id)],
    });

    res.status(200).json({ message: `Review ${id} approved` });
  } catch (err) {
    console.error("Approve error:", err);
    res.status(500).json({ error: err.message });
  }
}

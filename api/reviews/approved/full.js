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
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    const result = await client.execute("SELECT id FROM approved_reviews");
    const approvedIds = result.rows.map((row) => String(row.id));

    const normalized = normalizeReviews(mockData.result || []);
    const filtered = normalized.filter((r) =>
      approvedIds.includes(String(r.reviewId))
    );

    res.status(200).json({ reviews: filtered });
  } catch (err) {
    console.error("Full approved error:", err);
    res.status(500).json({ error: err.message });
  }
}

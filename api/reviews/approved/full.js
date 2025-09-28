import mockData from "../../_data/mock_reviews.json" with { type: "json" };
import { normalizeReviews } from "../../_lib/normalize.js";
import { readApproved } from "../../_lib/memoryStore.js";
import { setCorsHeaders } from "../../_lib/cors.js";

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const normalized = normalizeReviews(mockData.result || []);
    const approvedSet = new Set(readApproved().map(String));
    const filtered = normalized.filter((r) =>
      approvedSet.has(String(r.reviewId))
    );
    return res.status(200).json({ reviews: filtered });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

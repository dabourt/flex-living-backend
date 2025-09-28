import { normalizeReviews } from "../../../_lib/normalize.js";
import { readApproved } from "../../../_lib/memoryStore.js";
import mockData from "../../../_data/mock_reviews.json" with { type: "json" };
import { setCorsHeaders } from "../../../_lib/cors.js";

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const approvedSet = new Set(readApproved().map(String));
    const normalized = normalizeReviews(mockData.result || []);
    const filtered = normalized.filter((r) =>
      approvedSet.has(String(r.reviewId))
    );

    return res.status(200).json({ reviews: filtered });
  } catch (err) {
    console.error("Full handler error:", err);
    return res.status(500).json({ error: err.message });
  }
}

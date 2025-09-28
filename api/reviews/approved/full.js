import mockData from "../../../_data/mock_reviews.json" with { type: "json" };
import { normalizeReviews } from "../../../_lib/normalize.js";
import { readApproved } from "../../../_lib/githubStore.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const normalized = normalizeReviews(mockData.result || []);
    const approved = await readApproved();
    const approvedSet = new Set((approved || []).map(String));

    const filtered = normalized.filter(r =>
      approvedSet.has(String(r.reviewId))
    );

    return res.status(200).json({ reviews: filtered });
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: err.message });
  }
}

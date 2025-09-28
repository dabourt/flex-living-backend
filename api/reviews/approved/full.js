import { normalizeReviews } from "../../../_lib/normalize.js";
import mockData from "../../../_data/mock_reviews.json" with { type: "json" };
import { setCorsHeaders } from "../../../_lib/cors.js";

let approvedIds = []; // تخزين مؤقت في نفس الملف (يعيش طول ما السيرفر حي)

export function addApproved(id) {
  if (!approvedIds.includes(id)) {
    approvedIds.push(id);
  }
}

export function removeApproved(id) {
  approvedIds = approvedIds.filter((r) => r !== id);
}

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });

  try {
    const normalized = normalizeReviews(mockData.result || []);
    const filtered = normalized.filter((r) =>
      approvedIds.includes(String(r.reviewId))
    );

    return res.status(200).json({ reviews: filtered });
  } catch (err) {
    console.error("Full handler error:", err);
    return res.status(500).json({ error: err.message });
  }
}

import mockData from "../../_data/mock_reviews.json" with { type: "json" };
import { normalizeReviews } from "../../_lib/normalize.js";
import { setCorsHeaders } from "../../_lib/cors.js";

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // preflight
  }

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const normalized = normalizeReviews(mockData.result || []);
    return res.status(200).json({ reviews: normalized });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

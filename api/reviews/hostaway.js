import mockData from "../../_data/mock_reviews.json" with { type: "json" };
import { normalizeReviews } from "../../_lib/normalize.js";

export default async function handler(req, res) {
  // ✅ fix CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
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

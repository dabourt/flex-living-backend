import { setCorsHeaders } from "../../../_lib/cors.js";
import { normalizeReviews } from "../../_lib/normalize.js";
import mockData from "../../_data/mock_reviews.json" with { type: "json" };
import { readFileSync } from "fs";
import path from "path";

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const filePath = path.join(process.cwd(), "api/_data/approved_reviews.json");
    const approved = JSON.parse(readFileSync(filePath, "utf8") || "[]");
    const normalized = normalizeReviews(mockData.result || []);
    const filtered = normalized.filter((r) =>
      approved.includes(String(r.reviewId))
    );

    return res.status(200).json({ reviews: filtered });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

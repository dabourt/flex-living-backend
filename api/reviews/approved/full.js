import fs from "fs";
import path from "path";
import { normalizeReviews } from "../../../_lib/normalize.js";
import { setCorsHeaders } from "../../../_lib/cors.js";

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });

  try {
    const reviewsPath = path.join(process.cwd(), "_data/mock_reviews.json");
    const approvedPath = path.join(process.cwd(), "_data/approved_reviews.json");

    const rawReviews = fs.readFileSync(reviewsPath, "utf8");
    const rawApproved = fs.existsSync(approvedPath) ? fs.readFileSync(approvedPath, "utf8") : "[]";

    const allReviews = JSON.parse(rawReviews);
    const approved = JSON.parse(rawApproved);

    const normalized = normalizeReviews(allReviews.result || []);
    const approvedSet = new Set(approved.map(String));
    const filtered = normalized.filter(r => approvedSet.has(String(r.reviewId)));

    return res.status(200).json({ reviews: filtered });
  } catch (err) {
    console.error("Approved error:", err);
    return res.status(500).json({ error: err.message });
  }
}

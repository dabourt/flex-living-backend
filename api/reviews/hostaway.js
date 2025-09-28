import fs from "fs";
import path from "path";
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
    const filePath = path.join(process.cwd(), "_data/mock_reviews.json");
    const raw = fs.readFileSync(filePath, "utf8");
    const mockData = JSON.parse(raw);

    const normalized = normalizeReviews(mockData.result || []);
    return res.status(200).json({ reviews: normalized });
  } catch (err) {
    console.error("Hostaway handler error:", err);
    return res.status(500).json({ error: err.message });
  }
}

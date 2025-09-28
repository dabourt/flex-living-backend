import { setCorsHeaders } from "../../../_lib/cors.js";
import { writeFileSync, readFileSync } from "fs";
import path from "path";

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id } = req.query;
    const filePath = path.join(process.cwd(), "api/_data/approved_reviews.json");
    const approved = JSON.parse(readFileSync(filePath, "utf8") || "[]");

    if (!approved.includes(id)) {
      approved.push(id);
      writeFileSync(filePath, JSON.stringify(approved, null, 2));
    }

    return res.status(200).json({ message: `Review ${id} approved`, approved });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

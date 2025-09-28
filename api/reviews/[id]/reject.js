import fs from "fs";
import path from "path";
import { setCorsHeaders } from "../../../_lib/cors.js";

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    const { id } = req.query;
    const approvedPath = path.join(process.cwd(), "_data/approved_reviews.json");

    const raw = fs.existsSync(approvedPath) ? fs.readFileSync(approvedPath, "utf8") : "[]";
    let approved = JSON.parse(raw);

    approved = approved.filter(rid => String(rid) !== String(id));
    fs.writeFileSync(approvedPath, JSON.stringify(approved, null, 2));

    return res.status(200).json({ message: `Review ${id} rejected`, approved });
  } catch (err) {
    console.error("Reject error:", err);
    return res.status(500).json({ error: err.message });
  }
}

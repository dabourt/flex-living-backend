import { setCorsHeaders } from "../../../_lib/cors.js";

let approvedIds = [];

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id } = req.query;

    if (!approvedIds.includes(id)) {
      approvedIds.push(id);
    }

    return res.status(200).json({ message: `Review ${id} approved`, approved: approvedIds });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

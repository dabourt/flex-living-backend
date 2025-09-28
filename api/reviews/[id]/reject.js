import { removeApproved } from "../../../_lib/memoryStore.js";
import { setCorsHeaders } from "../../../_lib/cors.js";

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id } = req.query;
    const approved = removeApproved(id);
    return res.status(200).json({ message: `Review ${id} rejected`, approved });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

import { setCorsHeaders } from "../../../_lib/cors.js";
import { addApprovedId } from "../approved/full.js";

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    const { id } = req.query;
    addApprovedId(id);
    return res.status(200).json({ message: `Review ${id} approved` });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

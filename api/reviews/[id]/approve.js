import { writeApproved, readApproved } from "../../../_lib/githubStore.js";
import { setCorsHeaders } from "../../../_lib/cors.js";

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    const { id } = req.query;
    console.log("Approving review:", id);

    const approved = await readApproved();
    console.log("Before approve, approved:", approved);

    const updated = [...(approved || []), id];
    await writeApproved(updated);

    console.log("After approve, approved:", updated);
    return res.status(200).json({ message: `Review ${id} approved` });
  } catch (err) {
    console.error("Approve error:", err);
    return res.status(500).json({ error: err.message });
  }
}

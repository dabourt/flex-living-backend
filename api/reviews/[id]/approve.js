import { readApproved, writeApproved } from "../../../_lib/githubStore.js";
import { setCorsHeaders } from "../../../_lib/cors.js";

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Preflight CORS
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id } = req.query;
    if (!id) {
      console.error("Approve error: missing review ID");
      return res.status(400).json({ error: "Review ID is required" });
    }

    console.log("Approving review:", id);

    const approved = await readApproved();
    console.log("Before approve, approved:", approved);

    const updated = Array.from(new Set([...(approved || []), String(id)]));
    await writeApproved(updated);

    console.log("After approve, approved:", updated);

    return res.status(200).json({
      message: `Review ${id} approved`,
      approved: updated,
    });
  } catch (err) {
    console.error("Approve handler error:", err);
    return res.status(500).json({ error: err.message });
  }
}

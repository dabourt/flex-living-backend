import { readApproved, writeApproved } from "../../../_lib/githubStore.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id } = req.query;
    const approved = await readApproved();
    const updated = Array.from(new Set([...approved, String(id)]));

    await writeApproved(updated);

    return res.status(200).json({ message: `Review ${id} approved`, approved: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

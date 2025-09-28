import { writeApproved } from "../../../_lib/githubStore.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { id } = req.query;
  try {
    await writeApproved(id, true);
    return res.status(200).json({ message: `Review ${id} approved` });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

import { readApproved, writeApproved } from "../../../_lib/githubStore.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id } = req.query;
    let approved = await readApproved();
    approved = approved.filter(r => String(r) !== String(id));

    await writeApproved(approved);

    return res.status(200).json({ message: `Review ${id} rejected`, approved });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "_data", "approved_reviews.json");

export async function readApproved() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function writeApproved(id, approve = true) {
  let approved = await readApproved();
  if (approve) {
    if (!approved.includes(id)) approved.push(id);
  } else {
    approved = approved.filter((x) => x !== id);
  }
  await fs.writeFile(filePath, JSON.stringify(approved, null, 2));
}

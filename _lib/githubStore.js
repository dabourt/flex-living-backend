import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "_data/approved_reviews.json");

export async function readApproved() {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn("⚠️ approved_reviews.json not found, returning empty []");
      return [];
    }
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.error("❌ readApproved error:", err);
    return [];
  }
}

// كتابة البيانات
export async function writeApproved(data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    console.log("✅ writeApproved success:", data);
  } catch (err) {
    console.error("❌ writeApproved error:", err);
    throw err;
  }
}

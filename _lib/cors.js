export function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // ممكن تحدد الدومين بدل *
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

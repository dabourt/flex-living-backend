// in-memory storage (temporary)
let approved = [];

export function readApproved() {
  return approved;
}

export function addApproved(id) {
  if (!approved.includes(id)) {
    approved.push(id);
  }
  return approved;
}

export function removeApproved(id) {
  approved = approved.filter((x) => x !== id);
  return approved;
}

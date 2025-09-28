export function normalizeReviews(raw) {
  return raw.map((r) => ({
    reviewId: r.id,
    guestName: r.guestName,
    listingName: r.listingName,
    rating: r.rating,
    categories: r.reviewCategory || [],
    publicReview: r.publicReview,
    submittedAt: r.submittedAt,
    type: r.type,
  }));
}

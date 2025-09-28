export default function handler(req, res) {
  res.status(200).json({
    reviews: [
      {
        id: 7453,
        guest: "Shane Finkelstein",
        listing: "2B N1 A - 29 Shoreditch Heights",
        review: "Shane and family are wonderful! Would definitely host again :)"
      },
      {
        id: 7454,
        guest: "Maria Lopez",
        listing: "3B Soho Apartments",
        review: "Great stay, very clean and good communication."
      }
    ]
  });
}

# 🌱 FlexLiving Backend

This is the backend service for **FlexLiving Reviews**.  
It provides API endpoints to fetch, approve, and reject reviews, and to list approved ones.  
Built with **Vercel Functions** and **Turso Database**.

---

## 🔗 Live API
Base URL (deployed on Vercel):  
https://flex-living-backend-65.vercel.app


---

## 📡 API Endpoints

### 1. Get all reviews


GET /api/reviews/hostaway

Returns all mock reviews (raw list).

**Example Response:**
```json
{
  "reviews": [
    {
      "reviewId": 7453,
      "guestName": "Shane Finkelstein",
      "listingName": "2B N1 A - 29 Shoreditch Heights",
      "rating": 10,
      "publicReview": "Shane and family are wonderful! Would definitely host again :)",
      "submittedAt": "2020-08-21 22:45:14",
      "type": "host-to-guest"
    }
  ]
}

2. Approve a review
POST /api/reviews/:id/approve


Marks a review as approved (saves to Turso DB).

Example Response:

{
  "message": "Review 7453 approved",
  "approved": ["7453"]
}

3. Reject a review
POST /api/reviews/:id/reject


Removes a review from the approved list.

Example Response:

{
  "message": "Review 7453 rejected",
  "approved": []
}

4. Get approved reviews (full list)
GET /api/reviews/approved/full


Returns all reviews that were approved.

Example Response:

{
  "reviews": [
    {
      "reviewId": 7453,
      "guestName": "Shane Finkelstein",
      "listingName": "2B N1 A - 29 Shoreditch Heights",
      "rating": 10,
      "publicReview": "Shane and family are wonderful! Would definitely host again :)",
      "submittedAt": "2020-08-21 22:45:14"
    }
  ]
}

5. Setup database (one-time)
GET /api/setup


Creates the approved_reviews table in Turso.
Use only once during deployment.

🚀 Run Locally

Clone repo and install dependencies:

npm install


Set up environment variables in .env.local:

TURSO_DATABASE_URL=your_turso_url
TURSO_AUTH_TOKEN=your_turso_token


Run development server:

vercel dev


API runs at: http://localhost:3000
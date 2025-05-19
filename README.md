# Next.js Real-Time Messaging Dashboard

A modern web application built with Next.js (App Router), TypeScript, and Tailwind CSS. The app allows users to submit messages in real time, stores data per user in memory, and displays user-specific message histories.

---

## 🚀 Features

- User-specific message storage and retrieval (in-memory only)
- Real-time or near-real-time updates
- Form input for name, message, and unique user ID
- API endpoints for posting and retrieving messages
- Responsive dashboard built with Tailwind CSS
- Simple local setup

---

## 🏗️ Project Structure

/app
  /dashboard
    page.tsx       # Dashboard with form and message list
  /api/messages
    route.ts       # API for GET/POST user messages
    all.ts         # API for getting all messages (all users)
  page.tsx         # Landing page
  layout.tsx

---

## ⚡ API Reference

### POST `/api/messages`

- Purpose: Submit a new message.
- Request Body:
{
  "name": "string",
  "message": "string",
  "userId": "string"
}
- Response:
200 OK
{
  "success": true
}

---

### GET `/api/messages?userId=<user_id>`

- Purpose: Get all messages for a specific user.
- Query Parameter:
  - userId: string (required)
- Response:
200 OK
[
  {
    "name": "string",
    "message": "string",
    "userId": "string",
    "timestamp": 1715912870
  }
  // ...
]

---

### GET `/api/messages/all`

- Purpose: Retrieve all messages from all users.
- Response:
200 OK
[
  {
    "userId": "string",
    "msgs": [
      {
        "name": "string",
        "message": "string",
        "userId": "string",
        "timestamp": 1715912870
      }
    ]
  }
]


---

## 🗂️ Data Persistence

- Note: This project uses **in-memory storage only**.
  - All messages are stored in the server's memory.
  - Data is **lost** when the server restarts, reloads, or redeploys.
  - This setup is intended for demos, development, or testing only.

---

## 💻 Local Setup

1. Clone the repository  
   git clone <your-repo-url>  
   cd <repo-folder>

2. Install dependencies  
   npm install

3. Run the app  
   npm run dev

4. Open http://localhost:3000

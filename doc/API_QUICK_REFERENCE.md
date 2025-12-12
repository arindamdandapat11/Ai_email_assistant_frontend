# API Quick Reference

**Base URL:** `http://localhost:8080/api/email`

---

## Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/generate-reply` | Generate email reply |
| GET | `/replies` | Get all replies |
| GET | `/replies/recent` | Get recent replies (30 days) |
| GET | `/replies/{id}` | Get reply by ID |

---

## 1. Generate Reply

**POST** `/api/email/generate-reply`

**Request:**
```json
{
  "sender": "alice@example.com",     // Optional
  "subject": "Product issue",         // Optional
  "body": "Hello, the invoice...",    // Required
  "tone": "professional"               // Required: "professional" | "friendly" | "concise"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "sender": "alice@example.com",
  "subject": "Product issue",
  "body": "Hello, the invoice feature is not working.",
  "tone": "professional",
  "generatedReply": "Thank you for reporting...",
  "createdAt": "2025-12-12T00:01:45.147407+05:30",
  "updatedAt": "2025-12-12T00:01:45.147407+05:30",
  "success": true,
  "message": "Reply generated successfully"
}
```

---

## 2. Get All Replies

**GET** `/api/email/replies`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "sender": "alice@example.com",
    "subject": "Product issue",
    "body": "Hello...",
    "tone": "professional",
    "generatedReply": "Thank you...",
    "createdAt": "2025-12-12T00:01:45.147407+05:30",
    "updatedAt": "2025-12-12T00:01:45.147407+05:30"
  }
]
```

---

## 3. Get Recent Replies

**GET** `/api/email/replies/recent`

**Response:** Same as Get All Replies (last 30 days only)

---

## 4. Get Reply by ID

**GET** `/api/email/replies/{id}`

**Response (200 OK):** Single reply object (same structure as above)

**Response (404):** Not Found

---

## 5. Health Check

**GET** `/api/email/health`

**Response (200 OK):**
```
"Email Assistant API is running!"
```

---

## Quick JavaScript Example

```javascript
// Generate Reply
const response = await fetch('http://localhost:8080/api/email/generate-reply', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    sender: "user@example.com",
    subject: "Issue",
    body: "The feature is not working.",
    tone: "professional"
  })
});
const result = await response.json();
console.log(result.generatedReply);
```

---

## Tone Options

- `"professional"` - Formal and business-like
- `"friendly"` - Casual and warm
- `"concise"` - Brief and to the point

---

## Error Handling

```javascript
try {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  const data = await response.json();
  return data;
} catch (error) {
  console.error('API Error:', error);
}
```


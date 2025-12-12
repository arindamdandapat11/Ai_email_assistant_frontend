# Email Assistant API Documentation

**Base URL:** `http://localhost:8080/api/email`

**CORS:** Enabled for `http://localhost:5173` and `http://localhost:8080`

---

## 1. Health Check

Check if the API is running.

### Endpoint
```
GET /api/email/health
```

### Request
No request body required.

### Response
**Status:** `200 OK`

```json
"Email Assistant API is running!"
```

### Example (JavaScript/Fetch)
```javascript
const response = await fetch('http://localhost:8080/api/email/health');
const message = await response.text();
console.log(message); // "Email Assistant API is running!"
```

---

## 2. Generate Email Reply

Generate an AI-powered email reply based on the input email and tone.

### Endpoint
```
POST /api/email/generate-reply
```

### Request Headers
```
Content-Type: application/json
```

### Request Body
```json
{
  "sender": "alice@example.com",        // Optional: Email sender
  "subject": "Product issue",            // Optional: Email subject
  "body": "Hello, the invoice feature is not working.",  // Required: Email body
  "tone": "professional"                 // Required: "professional" | "friendly" | "concise"
}
```

### Field Validation
- `body`: **Required** - Cannot be empty
- `tone`: **Required** - Must be one of: `"professional"`, `"friendly"`, or `"concise"`
- `sender`: Optional
- `subject`: Optional

### Success Response
**Status:** `200 OK`

```json
{
  "id": 1,
  "sender": "alice@example.com",
  "subject": "Product issue",
  "body": "Hello, the invoice feature is not working.",
  "tone": "professional",
  "generatedReply": "Thank you for reporting the issue with the invoice feature. We are currently investigating the problem...",
  "createdAt": "2025-12-12T00:01:45.147407+05:30",
  "updatedAt": "2025-12-12T00:01:45.147407+05:30",
  "success": true,
  "message": "Reply generated successfully"
}
```

### Error Response
**Status:** `400 Bad Request` (Validation Error)

```json
{
  "success": false,
  "message": "Validation failed: Tone must be professional, friendly, or concise"
}
```

**Status:** `500 Internal Server Error` (Server Error)

```json
{
  "id": null,
  "sender": null,
  "subject": null,
  "body": null,
  "tone": null,
  "generatedReply": null,
  "createdAt": null,
  "updatedAt": null,
  "success": false,
  "message": "Failed to generate reply: [error details]"
}
```

### Example (JavaScript/Fetch)
```javascript
const generateReply = async (emailData) => {
  try {
    const response = await fetch('http://localhost:8080/api/email/generate-reply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: emailData.sender,
        subject: emailData.subject,
        body: emailData.body,
        tone: emailData.tone // "professional" | "friendly" | "concise"
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate reply');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error generating reply:', error);
    throw error;
  }
};

// Usage
const result = await generateReply({
  sender: "alice@example.com",
  subject: "Product issue",
  body: "Hello, the invoice feature is not working.",
  tone: "professional"
});

console.log(result.generatedReply);
```

### Example (React Hook)
```javascript
import { useState } from 'react';

const useEmailReply = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateReply = async (emailData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8080/api/email/generate-reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: emailData.sender || '',
          subject: emailData.subject || '',
          body: emailData.body,
          tone: emailData.tone
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate reply');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { generateReply, loading, error };
};

export default useEmailReply;
```

---

## 3. Get All Replies

Retrieve all email replies from the database.

### Endpoint
```
GET /api/email/replies
```

### Request
No request body or query parameters required.

### Response
**Status:** `200 OK`

```json
[
  {
    "id": 1,
    "sender": "alice@example.com",
    "subject": "Product issue",
    "body": "Hello, the invoice feature is not working.",
    "tone": "professional",
    "generatedReply": "Thank you for reporting the issue...",
    "createdAt": "2025-12-12T00:01:45.147407+05:30",
    "updatedAt": "2025-12-12T00:01:45.147407+05:30"
  },
  {
    "id": 2,
    "sender": "bob@example.com",
    "subject": "Feature request",
    "body": "Can you add dark mode?",
    "tone": "friendly",
    "generatedReply": "Thanks for your suggestion!...",
    "createdAt": "2025-12-12T00:05:12.234567+05:30",
    "updatedAt": "2025-12-12T00:05:12.234567+05:30"
  }
]
```

### Example (JavaScript/Fetch)
```javascript
const getAllReplies = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/email/replies');
    const replies = await response.json();
    return replies;
  } catch (error) {
    console.error('Error fetching replies:', error);
    throw error;
  }
};
```

---

## 4. Get Recent Replies

Retrieve email replies from the last 30 days.

### Endpoint
```
GET /api/email/replies/recent
```

### Request
No request body or query parameters required.

### Response
**Status:** `200 OK`

```json
[
  {
    "id": 1,
    "sender": "alice@example.com",
    "subject": "Product issue",
    "body": "Hello, the invoice feature is not working.",
    "tone": "professional",
    "generatedReply": "Thank you for reporting the issue...",
    "createdAt": "2025-12-12T00:01:45.147407+05:30",
    "updatedAt": "2025-12-12T00:01:45.147407+05:30"
  }
]
```

### Example (JavaScript/Fetch)
```javascript
const getRecentReplies = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/email/replies/recent');
    const replies = await response.json();
    return replies;
  } catch (error) {
    console.error('Error fetching recent replies:', error);
    throw error;
  }
};
```

---

## 5. Get Reply by ID

Retrieve a specific email reply by its ID.

### Endpoint
```
GET /api/email/replies/{id}
```

### Path Parameters
- `id` (Long): The ID of the email reply

### Request
No request body required.

### Success Response
**Status:** `200 OK`

```json
{
  "id": 1,
  "sender": "alice@example.com",
  "subject": "Product issue",
  "body": "Hello, the invoice feature is not working.",
  "tone": "professional",
  "generatedReply": "Thank you for reporting the issue...",
  "createdAt": "2025-12-12T00:01:45.147407+05:30",
  "updatedAt": "2025-12-12T00:01:45.147407+05:30"
}
```

### Error Response
**Status:** `404 Not Found`

No response body.

### Example (JavaScript/Fetch)
```javascript
const getReplyById = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/email/replies/${id}`);
    
    if (response.status === 404) {
      throw new Error('Reply not found');
    }
    
    const reply = await response.json();
    return reply;
  } catch (error) {
    console.error('Error fetching reply:', error);
    throw error;
  }
};
```

---

## Complete TypeScript/React Example

```typescript
// types.ts
export interface EmailReplyRequest {
  sender?: string;
  subject?: string;
  body: string;
  tone: 'professional' | 'friendly' | 'concise';
}

export interface EmailReplyResponse {
  id: number;
  sender: string | null;
  subject: string | null;
  body: string;
  tone: string;
  generatedReply: string;
  createdAt: string;
  updatedAt: string;
  success: boolean;
  message: string;
}

// api.ts
const API_BASE_URL = 'http://localhost:8080/api/email';

export const emailApi = {
  // Health check
  healthCheck: async (): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/health`);
    return await response.text();
  },

  // Generate reply
  generateReply: async (request: EmailReplyRequest): Promise<EmailReplyResponse> => {
    const response = await fetch(`${API_BASE_URL}/generate-reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate reply');
    }

    return await response.json();
  },

  // Get all replies
  getAllReplies: async (): Promise<EmailReplyResponse[]> => {
    const response = await fetch(`${API_BASE_URL}/replies`);
    return await response.json();
  },

  // Get recent replies
  getRecentReplies: async (): Promise<EmailReplyResponse[]> => {
    const response = await fetch(`${API_BASE_URL}/replies/recent`);
    return await response.json();
  },

  // Get reply by ID
  getReplyById: async (id: number): Promise<EmailReplyResponse> => {
    const response = await fetch(`${API_BASE_URL}/replies/${id}`);
    
    if (response.status === 404) {
      throw new Error('Reply not found');
    }

    return await response.json();
  },
};
```

---

## Error Handling

All endpoints may return the following error statuses:

- **400 Bad Request**: Invalid request data or validation errors
- **404 Not Found**: Resource not found (for GET by ID)
- **500 Internal Server Error**: Server-side errors

Always check `response.ok` or `response.status` before parsing JSON.

---

## Notes

1. **Tone Values**: Only `"professional"`, `"friendly"`, or `"concise"` are accepted
2. **Timestamps**: All timestamps are in ISO 8601 format with timezone offset
3. **CORS**: Already configured for `http://localhost:5173` (Vite default port)
4. **Content-Type**: Always use `application/json` for POST requests


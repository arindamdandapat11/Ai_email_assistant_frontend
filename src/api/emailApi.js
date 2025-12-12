const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/email';

export const checkHealth = async () => {
  const response = await fetch(`${API_BASE_URL}/health`);
  return await response.text();
};

export const generateReply = async (emailData) => {
  const url = `${API_BASE_URL}/generate-reply`;
  console.debug('API: POST', url, emailData);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    
    body: JSON.stringify({
      sender: emailData.sender || '',
      subject: emailData.subject || '',
      body: emailData.body,
      tone: emailData.tone,
    }),
  });

  if (!response.ok) {
    let message = 'Failed to generate reply';
    try {
      const errorJson = await response.json();
      message = errorJson.message || message;
    } catch (_) {
      try {
        const text = await response.text();
        if (text) message = text;
      } catch (_) {}
    }
    console.warn('API error status', response.status, message);
    console.debug('API response headers:', Array.from(response.headers.entries()));
    const rawText = await response.text().catch(() => null);
    if (rawText) console.debug('API raw body:', rawText);
    throw new Error(message);
  }

  return await response.json();
};

export default { checkHealth, generateReply };

const API_BASE_URL = 'http://localhost:8080/api/email';

export const checkHealth = async () => {
  const response = await fetch(`${API_BASE_URL}/health`);
  return await response.text();
};

export const generateReply = async (emailData) => {
  const response = await fetch(`${API_BASE_URL}/generate-reply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: emailData.sender || '',
      subject: emailData.subject || '',
      body: emailData.body,
      tone: emailData.tone,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to generate reply');
  }

  return await response.json();
};

export const getAllReplies = async () => {
  const response = await fetch(`${API_BASE_URL}/replies`);
  if (!response.ok) {
    throw new Error('Failed to fetch replies');
  }
  return await response.json();
};

export const getRecentReplies = async () => {
  const response = await fetch(`${API_BASE_URL}/replies/recent`);
  if (!response.ok) {
    throw new Error('Failed to fetch recent replies');
  }
  return await response.json();
};

export const getReplyById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/replies/${id}`);
  
  if (response.status === 404) {
    throw new Error('Reply not found');
  }
  
  if (!response.ok) {
    throw new Error('Failed to fetch reply');
  }
  
  return await response.json();
};

import { useState, useCallback } from 'react';

export const useEmailReply = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = useCallback(async (emailData) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await generateReply(emailData);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { generate, loading, error };
};

 
const example1 = async () => {
  try {
    const result = await generateReply({
      sender: 'alice@example.com',
      subject: 'Product issue',
      body: 'Hello, the invoice feature is not working.',
      tone: 'professional'
    });
    
    console.log('Generated Reply:', result.generatedReply);
    console.log('Reply ID:', result.id);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

 
const example2 = async () => {
  try {
    const replies = await getAllReplies();
    console.log('Total replies:', replies.length);
    replies.forEach(reply => {
      console.log(`ID: ${reply.id}, Tone: ${reply.tone}, Created: ${reply.createdAt}`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
};

 
const EmailReplyComponent = () => {
  const { generate, loading, error } = useEmailReply();
  const [reply, setReply] = useState(null);

  const handleGenerate = async () => {
    try {
      const result = await generate({
        body: 'The feature is not working.',
        tone: 'professional'
      });
      setReply(result.generatedReply);
    } catch (err) {
      
    }
  };

  return (
    <div>
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Reply'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {reply && <div>{reply}</div>}
    </div>
  );
};


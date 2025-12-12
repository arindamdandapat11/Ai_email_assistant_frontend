import React, { useState, useEffect } from 'react';
import './email-assistant.css';
import EmailForm from './EmailForm';
import ReplyPreview from './ReplyPreview';
import { generateReply, checkHealth } from '../api/emailApi';

export default function EmailAssistant() {
  const [generated, setGenerated] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [health, setHealth] = useState('');

  const handleGenerate = async (emailData) => {
    setLoading(true);
    setError(null);
    setGenerated('');
    try {
      const result = await generateReply(emailData);
      setGenerated(result.generatedReply || '');
    } catch (err) {
      setError(err.message || 'Failed to generate reply');
      setGenerated(
        `Hi ${emailData.sender || 'there'},\n\nThanks for reaching out. We'll look into this and get back to you shortly.\n\nBest regards,\nYour Team`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const msg = await checkHealth();
        if (mounted) setHealth(msg);
      } catch (err) {
        if (mounted) setHealth('Backend unreachable');
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleEdit = (value) => setGenerated(value);

  const handleCopy = () => {
    if (!generated) return;
    navigator.clipboard.writeText(generated);
  };

  return (
    <div className="ea-wrapper">
      <div className="ea-card">
        <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>
          API: {health || 'Unknown'}
        </div>
        <div className="ea-intro">
          <h1>AI Email Reply Assistant</h1>
          <p><strong>Tech Stack:</strong> React, Spring Boot, Postgres, OpenAI API</p>
          <p>
            Writing repetitive email replies consumes time. AI can help draft responses
            based on prior context. Paste or type an email thread, select a tone,
            and hit Generate to see a suggested reply.
          </p>
        </div>

        <EmailForm onGenerate={handleGenerate} loading={loading} />
        {error && <p style={{ color: 'var(--error, #ff6b6b)' }}>{error}</p>}
      </div>

      <div className="ea-card">
        <ReplyPreview reply={generated} onEdit={handleEdit} onCopy={handleCopy} />
        <div style={{ marginTop: '1rem' }}>
          <h4>Tasks</h4>
          <ol>
            <li>Input: email thread (sender, subject, body).</li>
            <li>Prompt LLM to generate a professional reply.</li>
            <li>Allow tone selection: formal, friendly, concise.</li>
            <li>Display suggested reply with editing options.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

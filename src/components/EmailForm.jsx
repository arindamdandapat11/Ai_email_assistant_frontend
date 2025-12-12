import React, { useState } from 'react';
import './email-assistant.css';

const ToneOptions = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'concise', label: 'Concise' },
];

export default function EmailForm({ onGenerate, loading }) {
  const [sender, setSender] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [tone, setTone] = useState('professional');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({ sender, subject, body, tone });
  };

  return (
    <form className="ea-form" onSubmit={handleSubmit}>
      <div className="field">
        <label>Sender</label>
        <input
          type="email"
          placeholder="sender@example.com"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Subject</label>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Body</label>
        <textarea
          placeholder="Paste the email body or thread here"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={6}
        />
      </div>

      <div className="field tone-field">
        <label>Tone</label>
        <div className="tone-options">
          {ToneOptions.map((opt) => (
            <label key={opt.value} className="tone-option">
              <input
                type="radio"
                name="tone"
                value={opt.value}
                checked={tone === opt.value}
                onChange={() => setTone(opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <div className="field">
        <button type="submit" className="generate-btn" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Reply'}
        </button>
      </div>
    </form>
  );
}

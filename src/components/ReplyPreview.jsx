import React from 'react';
import './email-assistant.css';

export default function ReplyPreview({ reply, onEdit, onCopy }) {
  if (!reply) {
    return (
      <div className="reply-preview empty">
        <p>No generated reply yet. Use the form to create one.</p>
      </div>
    );
  }

  return (
    <div className="reply-preview">
      <h3>Suggested Reply</h3>
      <textarea
        value={reply}
        onChange={(e) => onEdit(e.target.value)}
        rows={12}
      />
      <div className="preview-actions">
        <button onClick={() => onCopy()} className="secondary">Copy</button>
      </div>
    </div>
  );
}

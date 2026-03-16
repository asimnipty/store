import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

export function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      <p>⚠️ {message}</p>
    </div>
  );
}

export default { LoadingSpinner, ErrorMessage };

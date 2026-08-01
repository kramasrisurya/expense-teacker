function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{text}</p>
    </div>
  );
}

export default LoadingSpinner;

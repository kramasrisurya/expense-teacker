function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="spinner"></div>
      <p className="text-sm text-neutral-500">{text}</p>
    </div>
  );
}

export default LoadingSpinner;

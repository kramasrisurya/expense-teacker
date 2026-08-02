import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        aria-hidden="true"
        className="float-slow pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
      />
      <p className="relative font-display text-8xl font-medium italic text-accent sm:text-9xl">
        404
      </p>
      <h2 className="relative mt-6 font-display text-3xl font-medium tracking-tight text-white">
        Page not found.
      </h2>
      <p className="relative mt-3 text-neutral-500">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn-primary relative mt-8">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;

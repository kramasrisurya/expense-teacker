import { Link } from 'react-router-dom';
import '../css/NotFound.css';

function NotFound() {
  return (
    <div className="not-found page-enter">
      <div className="not-found-content">
        <div className="not-found-code">404</div>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;

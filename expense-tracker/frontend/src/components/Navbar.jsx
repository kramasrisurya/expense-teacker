import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineClipboardList, HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import '../css/Navbar.css';

function Navbar({ user, logout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const linkIsActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to={user ? '/dashboard' : '/'} className="nav-logo">
          <HiOutlineClipboardList className="nav-logo-icon" />
          ExpenseTracker
        </Link>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {user ? (
            <>
              <Link to="/dashboard" className={`nav-link ${linkIsActive('/dashboard')}`}
                onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/add" className={`nav-link ${linkIsActive('/add')}`}
                onClick={() => setMenuOpen(false)}>Add Expense</Link>
              <div className="nav-user">
                <div className="nav-avatar">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <button onClick={handleLogout} className="nav-btn-logout">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/" className={`nav-link ${linkIsActive('/')}`}
                onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/login" className={`nav-link ${linkIsActive('/login')}`}
                onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className={`nav-link ${linkIsActive('/register')}`}
                onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

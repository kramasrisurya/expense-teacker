import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { useScrolled } from '../hooks/useAnimations';

function Navbar({ user, logout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(50);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate('/');
  };

  const linkClass = (path) =>
    `text-sm transition-colors duration-300 ${
      location.pathname === path
        ? 'text-white'
        : 'text-neutral-500 hover:text-white'
    }`;

  const close = () => setMenuOpen(false);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-30 transition-all duration-500 ${
        scrolled || menuOpen
          ? 'border-b border-white/10 bg-ink/80 py-4 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent py-8'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <Link
          to={user ? '/dashboard' : '/'}
          onClick={close}
          className="font-display text-2xl font-semibold tracking-tight text-white"
        >
          Expense<span className="text-accent">.</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {user ? (
            <>
              <Link to="/dashboard" className={linkClass('/dashboard')}>Dashboard</Link>
              <span className="text-sm text-neutral-600">
                {user.name}
              </span>
              <button onClick={handleLogout} className="btn-ghost px-5! py-2!">
                Logout
              </button>
              <Link to="/add" className="btn-primary px-5! py-2!">
                Add Expense
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className={linkClass('/')}>Home</Link>
              <Link to="/login" className={linkClass('/login')}>Login</Link>
              <Link to="/register" className="btn-primary px-5! py-2!">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="text-2xl text-neutral-300 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-ink/95 px-6 py-6 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-5">
            {user ? (
              <>
                <Link to="/dashboard" className={linkClass('/dashboard')} onClick={close}>Dashboard</Link>
                <Link to="/add" className={linkClass('/add')} onClick={close}>Add Expense</Link>
                <button onClick={handleLogout} className="btn-ghost self-start px-5! py-2!">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/" className={linkClass('/')} onClick={close}>Home</Link>
                <Link to="/login" className={linkClass('/login')} onClick={close}>Login</Link>
                <Link to="/register" className="btn-primary self-start px-5! py-2!" onClick={close}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

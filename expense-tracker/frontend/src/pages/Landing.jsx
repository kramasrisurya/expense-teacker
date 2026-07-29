import { Link } from 'react-router-dom';
import { HiOutlineShieldCheck, HiOutlineChartBar, HiOutlineDeviceMobile, HiOutlineSparkles } from 'react-icons/hi';
import '../css/Landing.css';

const features = [
  {
    icon: <HiOutlineSparkles />,
    title: 'Track Expenses',
    desc: 'Log every expense in seconds with our simple form.',
    bg: '#EEF2FF',
    color: '#4F46E5',
  },
  {
    icon: <HiOutlineChartBar />,
    title: 'Visual Insights',
    desc: 'See where your money goes with beautiful charts.',
    bg: '#ECFEFF',
    color: '#06B6D4',
  },
  {
    icon: <HiOutlineShieldCheck />,
    title: 'Secure & Private',
    desc: 'Your data is protected with JWT authentication.',
    bg: '#F0FDF4',
    color: '#22C55E',
  },
  {
    icon: <HiOutlineDeviceMobile />,
    title: 'Works Everywhere',
    desc: 'Fully responsive — use it on any device.',
    bg: '#FDF2F8',
    color: '#EC4899',
  },
];

function Landing() {
  return (
    <div className="landing page-enter">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <HiOutlineSparkles /> College Mini Project
          </div>
          <h1>
            Take Control of <span>Your Expenses</span>
          </h1>
          <p>
            A simple, beautiful way to track your spending. Register, add expenses,
            and see where your money goes — all in one place.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">
              Get Started Free
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Why Use Expense Tracker?</h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon" style={{ background: f.bg, color: f.color }}>
                {f.icon}
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        &copy; {new Date().getFullYear()} Expense Tracker — College Mini Project
      </footer>
    </div>
  );
}

export default Landing;

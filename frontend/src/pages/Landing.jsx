import { Link } from 'react-router-dom';
import {
  HiOutlineShieldCheck, HiOutlineChartBar,
  HiOutlineDeviceMobile, HiOutlineSparkles,
} from 'react-icons/hi';
import { useReveal } from '../hooks/useAnimations';

const features = [
  {
    icon: <HiOutlineSparkles />,
    title: 'Track Expenses',
    desc: 'Log every expense in seconds with our simple form.',
    parallax: 'parallax-up',
  },
  {
    icon: <HiOutlineChartBar />,
    title: 'Visual Insights',
    desc: 'See where your money goes with clear, honest charts.',
    parallax: 'parallax-down',
  },
  {
    icon: <HiOutlineShieldCheck />,
    title: 'Secure & Private',
    desc: 'Your data is protected with JWT authentication.',
    parallax: 'parallax-up',
  },
  {
    icon: <HiOutlineDeviceMobile />,
    title: 'Works Everywhere',
    desc: 'Fully responsive — use it on any device.',
    parallax: 'parallax-down',
  },
];

function Landing() {
  useReveal([]);

  return (
    <div className="relative overflow-x-clip">
      {/* Hero */}
      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div
          aria-hidden="true"
          className="float-slow pointer-events-none absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        />

        <div className="reveal relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
            <HiOutlineSparkles className="text-accent" /> College Mini Project
          </span>
        </div>

        <h1 className="reveal relative mt-8 font-display text-5xl font-medium tracking-tight text-white sm:text-7xl md:text-8xl">
          Take control of
          <br />
          <span className="italic text-accent">your expenses</span>.
        </h1>

        <p className="reveal relative mt-8 max-w-xl text-lg text-neutral-400">
          A simple, beautiful way to track your spending. Register, add expenses,
          and see where your money goes — all in one place.
        </p>

        <div className="reveal relative mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/register" className="btn-primary px-8! py-3.5!">
            Get Started Free
          </Link>
          <Link to="/login" className="btn-ghost px-8! py-3.5!">
            Sign In
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <h2 className="reveal font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
          Why use it<span className="text-accent">?</span>
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className={`card glow-card reveal ${f.parallax} p-7`}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-xl text-accent">
                {f.icon}
              </div>
              <h3 className="mt-5 text-base font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Oversized faint wordmark footer */}
      <footer className="overflow-hidden pb-8 text-center">
        <p className="wordmark text-white">EXPENSE.</p>
        <p className="mt-4 text-xs text-neutral-600">
          &copy; {new Date().getFullYear()} Expense Tracker — College Mini Project
        </p>
      </footer>
    </div>
  );
}

export default Landing;

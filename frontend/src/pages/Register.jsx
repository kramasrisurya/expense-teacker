import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { useReveal } from '../hooks/useAnimations';

function Register({ loginUser }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useReveal([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/register', form);
      loginUser(res.data.token, res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-20">
      <div
        aria-hidden="true"
        className="float-slow pointer-events-none absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="card glow-card reveal relative w-full max-w-md p-8 sm:p-10">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
          Start tracking
        </p>
        <h2 className="mt-2 font-display text-4xl font-medium tracking-tight text-white">
          Create <span className="italic text-accent">account</span>.
        </h2>

        {error && (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
              Name
            </label>
            <input
              type="text" name="name" value={form.name} onChange={handleChange}
              placeholder="Your name" required className="field"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
              Email
            </label>
            <input
              type="email" name="email" value={form.email} onChange={handleChange}
              placeholder="you@example.com" required className="field"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
              Password (min 6 chars)
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password" value={form.password} onChange={handleChange}
                placeholder="Create a password" minLength={6} required className="field pr-12"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 transition-colors hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary mt-2 w-full">
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-neutral-500">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-accent hover:brightness-110">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

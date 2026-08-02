import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { HiOutlineX } from 'react-icons/hi';
import LoadingSpinner from '../components/LoadingSpinner';

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Other'];

function EditExpense() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    title: '', amount: '', category: 'Other', date: '', description: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/api/expenses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const exp = res.data;
        setForm({
          title: exp.title,
          amount: exp.amount,
          category: exp.category,
          date: exp.date ? exp.date.split('T')[0] : '',
          description: exp.description || '',
        });
      } catch (err) {
        setError('Failed to load expense');
      } finally {
        setLoading(false);
      }
    };
    fetchExpense();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/expenses/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update expense');
    }
  };

  if (loading) return <LoadingSpinner text="Loading expense..." />;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) navigate('/dashboard'); }}
    >
      <div className="card modal-panel w-full max-w-lg p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
              Edit Entry
            </p>
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-white">
              Edit Expense
            </h2>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="rounded-full border border-white/10 p-2 text-neutral-500 transition-colors hover:border-white/30 hover:text-white"
            aria-label="Close"
          >
            <HiOutlineX />
          </button>
        </div>

        {error && (
          <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5">
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
              Title
            </label>
            <input
              type="text" name="title" value={form.title} onChange={handleChange}
              required className="field"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
                Amount (₹)
              </label>
              <input
                type="number" name="amount" value={form.amount} onChange={handleChange}
                min="0" step="1" required className="field tabular-nums"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
                Category
              </label>
              <select name="category" value={form.category} onChange={handleChange} className="field">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
              Date
            </label>
            <input type="date" name="date" value={form.date} onChange={handleChange} className="field" />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
              Description
            </label>
            <textarea
              name="description" value={form.description} onChange={handleChange}
              rows={3} className="field resize-none"
            />
          </div>

          <div className="mt-2 flex gap-3">
            <button type="submit" className="btn-primary flex-1">Update Expense</button>
            <button type="button" className="btn-ghost" onClick={() => navigate('/dashboard')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditExpense;

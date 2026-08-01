import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  HiOutlineTag, HiOutlineCash, HiOutlineCalendar,
  HiOutlineClipboardList, HiOutlinePencilAlt, HiOutlineX,
} from 'react-icons/hi';
import LoadingSpinner from '../components/LoadingSpinner';
import '../css/Form.css';
import '../css/Auth.css';

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
    <div className="form-page page-enter">
      <div className="form-card">
        <h2><HiOutlinePencilAlt style={{ color: 'var(--warning)' }} /> Edit Expense</h2>

        {error && <div className="error-msg"><HiOutlineX /> {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <div className="input-wrapper">
              <HiOutlineTag className="input-icon" />
              <input
                type="text" name="title" value={form.title}
                onChange={handleChange} required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Amount (₹)</label>
              <div className="input-wrapper">
                <HiOutlineCash className="input-icon" />
                <input
                  type="number" name="amount" value={form.amount}
                  onChange={handleChange} min="0" step="0.01" required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Category</label>
              <div className="input-wrapper">
                <HiOutlineClipboardList className="input-icon" />
                <select name="category" value={form.category} onChange={handleChange}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Date</label>
            <div className="input-wrapper">
              <HiOutlineCalendar className="input-icon" />
              <input type="date" name="date" value={form.date} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <div className="input-wrapper">
              <textarea name="description" value={form.description} onChange={handleChange} />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Update Expense</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditExpense;

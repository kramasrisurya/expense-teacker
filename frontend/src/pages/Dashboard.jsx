import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  HiOutlinePlus, HiOutlinePencil, HiOutlineTrash,
  HiOutlineSearch, HiOutlineCash, HiOutlineChartPie,
  HiOutlineTag, HiOutlineCalendar, HiOutlineClipboardList,
} from 'react-icons/hi';
import StatCard from '../components/StatCard';
import ExpenseChart from '../components/ExpenseChart';
import LoadingSpinner from '../components/LoadingSpinner';
import '../css/Dashboard.css';

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchExpenses(); }, []);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/expenses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(res.data);
    } catch (err) {
      console.error('Failed to fetch expenses:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (id) => {
    if (!window.confirm('Delete this expense?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(expenses.filter((exp) => exp._id !== id));
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  // Compute stats
  const totalExpenses = expenses.length;
  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
  const categories = [...new Set(expenses.map((e) => e.category))];
  const thisMonth = expenses.filter((e) => {
    const d = new Date(e.date);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const monthTotal = thisMonth.reduce((sum, e) => sum + e.amount, 0);

  // Filter by search
  const filtered = expenses.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.category.toLowerCase().includes(search.toLowerCase())
  );

  // Category icon/class mapping
  const catClass = (cat) => {
    const map = {
      Food: 'cat-food', Transport: 'cat-transport',
      Shopping: 'cat-shopping', Bills: 'cat-bills',
      Entertainment: 'cat-entertainment', Other: 'cat-other',
    };
    return map[cat] || 'cat-other';
  };

  if (loading) return <LoadingSpinner text="Loading expenses..." />;

  return (
    <div className="dashboard page-enter">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <h1>My Expenses</h1>
        <p>Track, manage, and analyze your spending.</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <StatCard icon={<HiOutlineCash />} label="Total Expenses" value={totalExpenses} color="purple" />
        <StatCard icon={<HiOutlineChartPie />} label="Total Amount" value={`$${totalAmount.toFixed(2)}`} color="green" />
        <StatCard icon={<HiOutlineTag />} label="Categories" value={categories.length} color="cyan" />
        <StatCard icon={<HiOutlineCalendar />} label="This Month" value={`$${monthTotal.toFixed(2)}`} color="pink" />
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <Link to="/add" className="quick-action-btn">
          <HiOutlinePlus className="quick-action-icon" /> Add Expense
        </Link>
      </div>

      {/* Chart + Recent */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2><HiOutlineChartPie style={{ color: 'var(--primary)' }} /> Spending by Category</h2>
          <div className="chart-container">
            <ExpenseChart expenses={expenses} />
          </div>
        </div>
        <div className="dashboard-card">
          <h2><HiOutlineClipboardList style={{ color: 'var(--secondary)' }} /> Recent Expenses</h2>
          {expenses.length === 0 ? (
            <div className="empty-state" style={{ padding: '2rem 0' }}>
              <p>No expenses yet</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {expenses.slice(0, 5).map((e) => (
                <div key={e._id} style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', padding: '0.6rem 0.8rem',
                  background: 'var(--bg)', borderRadius: '8px',
                }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{e.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>
                      {new Date(e.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--primary)' }}>
                    ${e.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Full Expense Table */}
      <div className="table-container">
        <div className="table-header">
          <h2><HiOutlineClipboardList /> All Expenses</h2>
          <div className="search-box">
            <HiOutlineSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search expenses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon"><HiOutlineClipboardList /></div>
            <p>{search ? 'No matching expenses' : 'No expenses yet. Start tracking!'}</p>
            {!search && (
              <Link to="/add" className="btn btn-primary">Add Your First Expense</Link>
            )}
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="expense-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((expense) => (
                  <tr key={expense._id}>
                    <td style={{ fontWeight: 600 }}>{expense.title}</td>
                    <td>
                      <span className={`category-badge ${catClass(expense.category)}`}>
                        {expense.category}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--primary)' }}>
                      ${expense.amount.toFixed(2)}
                    </td>
                    <td style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td>
                      <div className="action-btns">
                        <Link to={`/edit/${expense._id}`} className="btn-icon-edit">
                          <HiOutlinePencil /> Edit
                        </Link>
                        <button
                          onClick={() => deleteExpense(expense._id)}
                          className="btn-icon-delete"
                        >
                          <HiOutlineTrash /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

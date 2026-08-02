import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineSearch } from 'react-icons/hi';
import StatCard from '../components/StatCard';
import ExpenseChart from '../components/ExpenseChart';
import LoadingSpinner from '../components/LoadingSpinner';
import { useReveal } from '../hooks/useAnimations';

const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

function Dashboard({ user }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchExpenses(); }, []);
  useReveal([loading]);

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
  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
  const categories = [...new Set(expenses.map((e) => e.category))];
  const now = new Date();
  const thisMonth = expenses.filter((e) => {
    const d = new Date(e.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const monthTotal = thisMonth.reduce((sum, e) => sum + e.amount, 0);

  // Filter by search
  const filtered = expenses.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingSpinner text="Loading expenses..." />;

  return (
    <div className="relative mx-auto max-w-6xl overflow-x-clip px-6 pt-32 sm:pt-36">
      {/* Decorative floating orb behind the greeting */}
      <div
        aria-hidden="true"
        className="float-slow pointer-events-none absolute -top-10 right-0 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
      />

      {/* Greeting */}
      <header className="reveal relative flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
            Dashboard
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl">
            {greeting()},{' '}
            <span className="italic text-accent">{user?.name?.split(' ')[0] || 'there'}</span>.
          </h1>
          <p className="mt-4 max-w-md text-neutral-500">
            Track, manage, and analyze your spending — all in one place.
          </p>
        </div>
        <Link to="/add" className="btn-primary">
          <HiOutlinePlus /> Add Expense
        </Link>
      </header>

      {/* Stats */}
      <section className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Spent"
          value={`₹${Math.round(totalAmount)}`}
          chip={`${expenses.length} expense${expenses.length === 1 ? '' : 's'}`}
        />
        <StatCard
          label="This Month"
          value={`₹${Math.round(monthTotal)}`}
          chip={`${thisMonth.length} this month`}
        />
        <StatCard
          label="Categories"
          value={categories.length}
          chip="in use"
        />
        <StatCard
          label="Avg. Expense"
          value={`₹${expenses.length ? Math.round(totalAmount / expenses.length) : 0}`}
          chip="per entry"
        />
      </section>

      {/* Chart + Recent */}
      <section className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card glow-card reveal parallax-up p-7">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
            Spending by Category
          </h2>
          <div className="mt-6 h-72">
            <ExpenseChart expenses={expenses} />
          </div>
        </div>

        <div className="card glow-card reveal parallax-down p-7">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
            Recent Expenses
          </h2>
          {expenses.length === 0 ? (
            <p className="mt-10 text-sm text-neutral-600">No expenses yet</p>
          ) : (
            <div className="mt-5 flex flex-col divide-y divide-white/[0.06]">
              {expenses.slice(0, 5).map((e) => (
                <div key={e._id} className="flex items-center justify-between py-3.5">
                  <div>
                    <p className="text-sm font-medium text-neutral-100">{e.title}</p>
                    <p className="mt-0.5 text-xs text-neutral-600">
                      {e.category} · {new Date(e.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-sm font-semibold tabular-nums text-white">
                    ₹{Math.round(e.amount)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Full expense table */}
      <section className="card reveal mt-14 p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
            All Expenses
          </h2>
          <div className="relative">
            <HiOutlineSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600" />
            <input
              type="text"
              placeholder="Search expenses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="field w-64 py-2.5! pl-10!"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-14 text-center">
            <p className="text-sm text-neutral-600">
              {search ? 'No matching expenses' : 'No expenses yet. Start tracking!'}
            </p>
            {!search && (
              <Link to="/add" className="btn-primary mt-6">
                Add Your First Expense
              </Link>
            )}
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-[0.14em] text-neutral-600">
                  <th className="py-3 pr-4 font-medium">Title</th>
                  <th className="py-3 pr-4 font-medium">Category</th>
                  <th className="py-3 pr-4 font-medium">Amount</th>
                  <th className="py-3 pr-4 font-medium">Date</th>
                  <th className="py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {filtered.map((expense) => (
                  <tr key={expense._id} className="group transition-colors hover:bg-white/[0.02]">
                    <td className="py-4 pr-4 font-medium text-neutral-100">{expense.title}</td>
                    <td className="py-4 pr-4">
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-400">
                        {expense.category}
                      </span>
                    </td>
                    <td className="py-4 pr-4 font-semibold tabular-nums text-white">
                      ₹{Math.round(expense.amount)}
                    </td>
                    <td className="py-4 pr-4 text-neutral-500">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/edit/${expense._id}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:border-white/30 hover:text-white"
                        >
                          <HiOutlinePencil /> Edit
                        </Link>
                        <button
                          onClick={() => deleteExpense(expense._id)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:border-red-500/50 hover:text-red-400"
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
      </section>

      {/* Oversized faint wordmark footer */}
      <footer className="mt-20 overflow-hidden pb-6 text-center">
        <p className="wordmark text-white">EXPENSE.</p>
      </footer>
    </div>
  );
}

export default Dashboard;

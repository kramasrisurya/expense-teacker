import {
  ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, Tooltip, LabelList,
} from 'recharts';

// Single-hue ordinal ramp of the accent orange, lightest = biggest spend.
// Validated against the #111111 card surface (dataviz six-checks).
const RAMP = ['#FFC9B3', '#FF9C76', '#FF6A3D', '#DE4E20', '#AC3B15'];

function ExpenseChart({ expenses }) {
  const totals = {};
  expenses.forEach((exp) => {
    totals[exp.category] = (totals[exp.category] || 0) + exp.amount;
  });

  const data = Object.entries(totals)
    .map(([name, value]) => ({ name, value: Math.round(value) }))
    .sort((a, b) => b.value - a.value);

  if (data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-neutral-600">
        No data to chart yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 8, right: 64, left: 0, bottom: 8 }}
        barCategoryGap="38%"
      >
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="name"
          axisLine={false}
          tickLine={false}
          width={104}
          tick={{ fill: '#898781', fontSize: 12, fontFamily: 'Inter' }}
        />
        <Tooltip
          cursor={{ fill: 'rgba(255,255,255,0.04)' }}
          formatter={(value) => [`₹${value}`, 'Spent']}
          contentStyle={{
            background: '#171717',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            fontSize: '13px',
          }}
          labelStyle={{ color: '#ffffff', fontWeight: 600 }}
          itemStyle={{ color: '#c3c2b7' }}
        />
        <Bar dataKey="value" barSize={16} radius={[0, 4, 4, 0]}>
          {data.map((entry, i) => (
            <Cell key={entry.name} fill={RAMP[Math.min(i, RAMP.length - 1)]} />
          ))}
          <LabelList
            dataKey="value"
            position="right"
            formatter={(v) => `₹${v}`}
            style={{ fill: '#c3c2b7', fontSize: 12, fontVariantNumeric: 'tabular-nums' }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ExpenseChart;

function StatCard({ label, value, chip }) {
  return (
    <div className="card glow-card reveal p-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold tabular-nums text-white sm:text-4xl">
        {value}
      </p>
      {chip && (
        <span className="mt-4 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          {chip}
        </span>
      )}
    </div>
  );
}

export default StatCard;

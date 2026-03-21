export default function PointDescription() {
  const points = [
    { score: 5, label: "Excellent", color: "bg-emerald-500 shadow-emerald-500/30" },
    { score: 4, label: "Good",      color: "bg-violet-500 shadow-violet-500/30" },
    { score: 3, label: "Average",   color: "bg-amber-400 shadow-amber-400/30" },
    { score: 2, label: "Poor",      color: "bg-orange-400 shadow-orange-400/30" },
    { score: 1, label: "Terrible",  color: "bg-rose-500 shadow-rose-500/30" },
  ];

  return (
    <div className="max-w-xs mt-6 rounded-xl border border-white/8 bg-zinc-900/50 backdrop-blur-sm p-6">
      <h3 className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-4">
        Score Legend
      </h3>
      <ul className="space-y-2.5">
        {points.map((p) => (
          <li key={p.score} className="flex items-center gap-3">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md shrink-0 ${p.color}`}
            >
              {p.score}
            </span>
            <span className="text-zinc-400 text-sm font-medium">{p.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

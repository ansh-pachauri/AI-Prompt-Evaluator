import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const criteria = [
  {
    name: "Relevance",
    desc: "How well does the response address the user's query?",
    color: "text-indigo-500",
  },
  {
    name: "Intent Match",
    desc: "Does the response align with the user's intent and expected outcome?",
    color: "text-violet-500",
  },
  {
    name: "Groundedness",
    desc: "Is the response backed by verifiable facts or logical reasoning?",
    color: "text-cyan-500",
  },
  {
    name: "Fluency",
    desc: "Is the language smooth, natural, and free of grammatical errors?",
    color: "text-emerald-500",
  },
  {
    name: "Conciseness",
    desc: "Is the response brief yet informative, avoiding unnecessary repetition?",
    color: "text-amber-500",
  },
  {
    name: "Reference Alignment",
    desc: "Does the response accurately reflect and align with any provided references or context?",
    color: "text-orange-500",
  },
  {
    name: "Tonality",
    desc: "Is the tone appropriate, clear, and consistent with the prompt's style?",
    color: "text-rose-500",
  },
];

export default function EvaluationDescription() {
  return (
    <div className="max-w-5xl mx-auto mt-16 mb-8 px-6">
      <Card className="bg-white border border-slate-200 rounded-2xl shadow-sm" style={{ gap: 0 }}>
        <CardHeader className="pt-8 pb-6">
          <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
            Evaluation Criteria
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-8 px-6">
          <ul className="space-y-0">
            {criteria.map(({ name, desc, color }, i) => (
              <li
                key={name}
                className={`flex items-start gap-5 py-4 ${
                  i < criteria.length - 1 ? "border-b border-slate-100" : ""
                }`}
              >
                <span className={`text-xs font-black tabular-nums w-5 shrink-0 mt-0.5 select-none ${color}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <span className="text-sm font-bold text-slate-900">{name}</span>
                  <span className="text-slate-500 text-sm"> — {desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

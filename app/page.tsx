import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Clock,
  Cpu,
  Layers,
  Menu,
  MessageSquare,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "10K+", label: "Prompts Evaluated" },
  { value: "7",    label: "Quality Dimensions" },
  { value: "~30s", label: "Average Analysis Time" },
  { value: "Free", label: "Credits to Get Started" },
] as const;

type AccentColor = "violet" | "fuchsia" | "purple" | "pink" | "emerald" | "sky" | "amber";

interface Feature {
  Icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
  accent: AccentColor;
  wide?: boolean;
}

const FEATURES: Feature[] = [
  {
    Icon: BarChart3, iconColor: "text-violet-400", accent: "violet", wide: true,
    title: "Multi-Dimensional Scoring",
    description: "Evaluate prompts across 7 dimensions: Groundedness, Fluency, Conciseness, Tonality, Relevance, Intent Match, and Reference Alignment — every angle covered.",
  },
  {
    Icon: Zap, iconColor: "text-fuchsia-400", accent: "fuchsia",
    title: "Instant Analysis",
    description: "Detailed feedback in under 30 seconds using advanced AI analysis.",
  },
  {
    Icon: TrendingUp, iconColor: "text-purple-400", accent: "purple",
    title: "Improved Prompt Suggestions",
    description: "Get a rewritten, optimized version of your prompt — ready to copy and use.",
  },
  {
    Icon: Target, iconColor: "text-pink-400", accent: "pink", wide: true,
    title: "Visual Score Breakdown",
    description: "Donut charts and score bars make it effortless to spot your prompt's weakest points at a glance.",
  },
  {
    Icon: Shield, iconColor: "text-emerald-400", accent: "emerald",
    title: "Credit System",
    description: "Fair usage with built-in credits — each evaluation uses one credit, no surprise bills.",
  },
  {
    Icon: MessageSquare, iconColor: "text-sky-400", accent: "sky",
    title: "Detailed Feedback",
    description: "Human-readable explanations for every score — not just numbers, but actionable insight.",
  },
  {
    Icon: Layers, iconColor: "text-amber-400", accent: "amber",
    title: "Context Memory",
    description: "Powered by Alchemyst AI's memory layer for smarter, context-aware evaluations over time.",
  },
];

interface Step {
  number: string;
  Icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: "01", Icon: MessageSquare, iconColor: "text-violet-400",
    title: "Paste Your Prompt",
    description: "Enter any AI prompt you've written — for ChatGPT, Claude, or any other LLM.",
  },
  {
    number: "02", Icon: Cpu, iconColor: "text-fuchsia-400",
    title: "AI Evaluates It",
    description: "Advanced AI analyzes your prompt across 7 quality dimensions in under 30 seconds.",
  },
  {
    number: "03", Icon: TrendingUp, iconColor: "text-purple-400",
    title: "Improve & Iterate",
    description: "Review your scores, read the feedback, and copy the AI-generated improved version.",
  },
];

interface Dimension {
  name: string;
  description: string;
  Icon: LucideIcon;
  iconColor: string;
}

const DIMENSIONS: Dimension[] = [
  { name: "Clarity",       description: "Is the prompt clear and unambiguous?",       Icon: Star,          iconColor: "text-violet-400"  },
  { name: "Specificity",   description: "Does it include precise, useful details?",   Icon: Target,        iconColor: "text-fuchsia-400" },
  { name: "Context",       description: "Is enough background information provided?", Icon: Layers,        iconColor: "text-purple-400"  },
  { name: "Actionability", description: "Does it lead to a clear, useful output?",    Icon: Zap,           iconColor: "text-pink-400"    },
  { name: "Tone",          description: "Is the tone appropriate for the use case?",  Icon: MessageSquare, iconColor: "text-emerald-400" },
  { name: "Completeness",  description: "Are all necessary elements included?",       Icon: CheckCircle2,  iconColor: "text-sky-400"     },
];

interface FAQItem { question: string; answer: string; }

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is Prompt Evaluator?",
    answer: "A tool that uses AI to analyze and score your prompts across 7 quality dimensions, then suggests an improved version you can copy immediately.",
  },
  {
    question: "Which AI models does it work for?",
    answer: "Any LLM — ChatGPT, Claude, Mistral, or any other. The evaluation principles apply universally.",
  },
  {
    question: "How does the credit system work?",
    answer: "Each account starts with free credits. Every prompt evaluation uses one credit — fair, predictable, and sustainable.",
  },
  {
    question: "How accurate is the scoring?",
    answer: "Scores reflect established prompt engineering best practices. Think of it as a strong guide rather than a rigid rulebook.",
  },
  {
    question: "Is my data private?",
    answer: "Yes. Prompts are only sent for evaluation and are not stored on our servers beyond the current session.",
  },
];

const MOCK_SCORES = [
  { label: "Clarity",       score: 88, barColor: "bg-violet-500" },
  { label: "Specificity",   score: 74, barColor: "bg-fuchsia-500" },
  { label: "Context",       score: 91, barColor: "bg-purple-500" },
  { label: "Actionability", score: 65, barColor: "bg-pink-500"   },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-linear-to-r from-violet-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
      {children}
    </span>
  );
}

function GlowOrb({ className }: { className: string }) {
  return (
    <div aria-hidden="true" className={`absolute rounded-full blur-3xl pointer-events-none ${className}`} />
  );
}

function SectionHeader({
  badge,
  badgeColor = "text-violet-400",
  title,
  subtitle,
  center = true,
}: {
  badge: string;
  badgeColor?: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-12 sm:mb-14 ${center ? "text-center" : ""}`}>
      <p className={`text-sm font-semibold mb-3 uppercase tracking-widest ${badgeColor}`}>{badge}</p>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-zinc-50 tracking-tight mb-4">{title}</h2>
      {subtitle && (
        <p className={`text-zinc-500 text-base sm:text-lg ${center ? "max-w-xl mx-auto" : "max-w-xl"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function PrimaryLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-200 hover:bg-violet-500 hover:shadow-[0_0_28px_rgba(139,92,246,0.45)] hover:-translate-y-0.5 cursor-pointer ${className}`}
    >
      {children}
    </Link>
  );
}

function OutlineLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-zinc-200 transition-all duration-200 hover:bg-white/10 hover:border-white/20 cursor-pointer ${className}`}
    >
      {children}
    </Link>
  );
}

const ACCENT_CLASSES: Record<AccentColor, { iconBg: string; iconBorder: string }> = {
  violet:  { iconBg: "bg-violet-500/10",  iconBorder: "border-violet-500/20"  },
  fuchsia: { iconBg: "bg-fuchsia-500/10", iconBorder: "border-fuchsia-500/20" },
  purple:  { iconBg: "bg-purple-500/10",  iconBorder: "border-purple-500/20"  },
  pink:    { iconBg: "bg-pink-500/10",    iconBorder: "border-pink-500/20"    },
  emerald: { iconBg: "bg-emerald-500/10", iconBorder: "border-emerald-500/20" },
  sky:     { iconBg: "bg-sky-500/10",     iconBorder: "border-sky-500/20"     },
  amber:   { iconBg: "bg-amber-500/10",   iconBorder: "border-amber-500/20"   },
};

function FeatureCard({ feature }: { feature: Feature }) {
  const { Icon, iconColor, title, description, accent, wide } = feature;
  const { iconBg, iconBorder } = ACCENT_CLASSES[accent];
  return (
    <div
      className={`group rounded-xl border border-white/8 bg-zinc-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:bg-zinc-900/80 hover:shadow-[0_0_20px_rgba(139,92,246,0.06)] cursor-default ${wide ? "md:col-span-2" : ""}`}
    >
      <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border ${iconBg} ${iconBorder}`}>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <h3 className={`mb-2 font-semibold text-zinc-50 ${wide ? "text-xl" : "text-base"}`}>{title}</h3>
      <p className="text-sm leading-relaxed text-zinc-500">{description}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTIONS
// ─────────────────────────────────────────────────────────────────────────────

function Navbar() {
  const navLinks = ["Features", "How it works", "FAQ"] as const;
  return (
    <nav className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2">
      <div className="flex items-center justify-between rounded-xl border border-white/8 bg-zinc-950/80 px-4 sm:px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-600 shadow-[0_0_16px_rgba(139,92,246,0.4)]">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-zinc-50">Prompt Evaluator</span>
        </div>

        {/* Desktop nav links */}
        <div className="hidden gap-6 text-sm text-zinc-500 md:flex">
          {navLinks.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(" ", "-")}`}
              className="cursor-pointer transition-colors duration-200 hover:text-zinc-100"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <PrimaryLink href="/login" className="px-4 py-2 text-sm">
            Get Started <ArrowRight className="h-3.5 w-3.5" />
          </PrimaryLink>

          {/* Mobile hamburger using details/summary */}
          <details className="md:hidden relative">
            <summary className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-xl border border-white/8 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-zinc-200 transition-colors duration-200">
              <Menu className="h-4 w-4" />
            </summary>
            <div className="absolute right-0 top-12 w-44 rounded-xl border border-white/8 bg-zinc-900/95 py-2 shadow-2xl backdrop-blur-xl">
              {navLinks.map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase().replace(" ", "-")}`}
                  className="block px-4 py-2.5 text-sm text-zinc-400 hover:bg-white/5 hover:text-zinc-100 transition-colors cursor-pointer"
                >
                  {label}
                </a>
              ))}
            </div>
          </details>
        </div>
      </div>
    </nav>
  );
}

function HeroMockup() {
  return (
    <div className="relative mx-auto max-w-3xl">
      <div aria-hidden="true" className="absolute inset-0 scale-105 rounded-2xl bg-linear-to-b from-violet-500/15 to-fuchsia-500/8 blur-xl" />
      <div className="relative overflow-hidden rounded-xl border border-white/8 bg-zinc-900/90 shadow-[0_32px_80px_rgba(0,0,0,0.6)] backdrop-blur-sm">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-white/5 bg-zinc-950/60 px-5 py-3.5">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-zinc-700" />
            <span className="h-3 w-3 rounded-full bg-zinc-700" />
            <span className="h-3 w-3 rounded-full bg-zinc-700" />
          </div>
          <div className="mx-auto rounded-full bg-white/5 px-4 py-1 text-xs text-zinc-500">
            promptevaluator.app
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 sm:grid-cols-2">
          {/* Prompt input skeleton */}
          <div className="space-y-3">
            <div className="h-3 w-24 rounded-full bg-zinc-800" />
            <div className="space-y-2 rounded-xl border border-white/5 bg-zinc-900 p-4">
              <div className="h-2 w-full rounded-full bg-zinc-800" />
              <div className="h-2 w-4/5 rounded-full bg-zinc-800" />
              <div className="h-2 w-3/4 rounded-full bg-zinc-800" />
              <div className="h-2 w-2/3 rounded-full bg-zinc-800" />
            </div>
            <div className="flex justify-end">
              <div className="flex h-8 w-28 items-center justify-center rounded-lg bg-violet-600/80 shadow-[0_0_12px_rgba(139,92,246,0.3)]">
                <span className="text-xs font-medium text-white">Evaluate</span>
              </div>
            </div>
          </div>

          {/* Score bars */}
          <div className="space-y-3">
            <div className="h-3 w-20 rounded-full bg-zinc-800" />
            {MOCK_SCORES.map(({ label, score, barColor }) => (
              <div key={label} className="space-y-1">
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>{label}</span>
                  <span className="font-medium text-zinc-300">{score}</span>
                </div>
                <div className="h-1.5 rounded-full bg-zinc-800">
                  <div className={`h-1.5 rounded-full ${barColor}`} style={{ width: `${score}%` }} />
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-white/5 pt-2">
              <span className="text-xs text-zinc-500">Overall Score</span>
              <span className="text-lg font-bold text-zinc-50">
                79<span className="text-sm text-zinc-600">/100</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 pb-16 pt-28 sm:pt-24">
      <GlowOrb className="h-96 w-96 lg:h-[600px] lg:w-[600px] bg-violet-600/12 -top-32 -left-32" />
      <GlowOrb className="h-80 w-80 lg:h-[480px] lg:w-[480px] bg-fuchsia-600/8 top-1/2 -right-48" />
      <GlowOrb className="h-64 w-64 bg-purple-600/8 bottom-0 left-1/2 -translate-x-1/2" />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(#8b5cf6 1px, transparent 1px), linear-gradient(90deg, #8b5cf6 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <h1 className="mb-6 text-4xl font-semibold leading-tight tracking-tight text-zinc-50 sm:text-6xl lg:text-7xl">
          Write Prompts That <br className="hidden sm:block" />
          <GradientText>Actually Work</GradientText>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-zinc-500 sm:text-xl">
          Instantly evaluate, score, and improve your AI prompts with multi-dimensional analysis.
          Stop guessing — start crafting prompts that get results.
        </p>

        <div className="mb-14 sm:mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <PrimaryLink href="/login" className="w-full sm:w-auto px-7 py-3.5 text-base">
            <Zap className="h-5 w-5" /> Start for Free
          </PrimaryLink>
          <OutlineLink href="#how-it-works" className="w-full sm:w-auto px-7 py-3.5 text-base">
            See How It Works <ChevronDown className="h-4 w-4" />
          </OutlineLink>
        </div>

        <HeroMockup />
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="border-y border-white/8 bg-zinc-900">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4 md:py-12">
        {STATS.map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="mb-1 text-2xl sm:text-3xl font-semibold text-zinc-50">{value}</p>
            <p className="text-xs sm:text-sm text-zinc-500">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="bg-zinc-950 px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          badge="Features"
          title={<>Everything you need to <GradientText>level up your prompts</GradientText></>}
          subtitle="A complete toolkit for understanding and improving every aspect of your AI prompts."
        />
        <div className="grid grid-cols-1 gap-4 sm:gap-4 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-zinc-900 px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          badge="How It Works"
          badgeColor="text-fuchsia-400"
          title={<>From prompt to <GradientText>perfect in 3 steps</GradientText></>}
          subtitle="No setup, no learning curve. Just paste, evaluate, and improve."
        />

        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          <div
            aria-hidden="true"
            className="absolute top-12 hidden h-px bg-linear-to-r from-violet-500/40 via-fuchsia-500/40 to-purple-500/40 md:block"
            style={{ left: "calc(16.67% + 2rem)", right: "calc(16.67% + 2rem)" }}
          />
          {STEPS.map(({ number, Icon, iconColor, title, description }) => (
            <div key={number} className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/8 bg-zinc-800 shadow-xl">
                  <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                  {number}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-zinc-50">{title}</h3>
              <p className="text-sm leading-relaxed text-zinc-500 max-w-xs">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScoringSection() {
  return (
    <section className="bg-zinc-950 px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="lg:w-1/2 text-center lg:text-left">
            <SectionHeader
              badge="Scoring"
              title={<>7 dimensions.<br /><GradientText>One clear score.</GradientText></>}
              center={false}
            />
            <p className="mb-8 leading-relaxed text-zinc-500">
              Each dimension measures a distinct quality that determines whether an AI will
              understand and execute your intent precisely.
            </p>
            <PrimaryLink href="/login">
              Try It Free <ArrowRight className="h-4 w-4" />
            </PrimaryLink>
          </div>

          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:w-1/2">
            {DIMENSIONS.map(({ name, description, Icon, iconColor }) => (
              <div
                key={name}
                className="flex items-start gap-3 rounded-xl border border-white/8 bg-zinc-900/50 p-4 transition-all duration-200 hover:border-white/15 hover:bg-zinc-900/80 cursor-default"
              >
                <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${iconColor}`} />
                <div>
                  <p className="text-sm font-semibold text-zinc-100">{name}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="bg-zinc-900 px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeader badge="FAQ" badgeColor="text-purple-400" title="Common questions" />
        <div className="space-y-3">
          {FAQ_ITEMS.map(({ question, answer }) => (
            <details
              key={question}
              className="group overflow-hidden rounded-xl border border-white/8 bg-zinc-950/50"
            >
              <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-4 p-5 hover:bg-white/5 transition-colors duration-200">
                <span className="text-sm font-medium text-zinc-100">{question}</span>
                <ChevronDown className="h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="border-t border-white/5 px-5 pb-5 pt-4 text-sm leading-relaxed text-zinc-500">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 px-6 py-24 sm:py-28">
      <GlowOrb className="h-80 w-80 sm:h-[500px] sm:w-[500px] bg-violet-600/12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/8 px-4 py-2 text-xs font-semibold text-violet-300">
          <Clock className="h-3.5 w-3.5" />
          Takes less than 60 seconds to get started
        </div>

        <h2 className="mb-5 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          Stop writing prompts <GradientText>in the dark</GradientText>
        </h2>
        <p className="mb-10 text-base leading-relaxed text-zinc-500 sm:text-lg">
          Evaluate and improve your prompts with AI-powered insights.
          Free to start, no credit card required.
        </p>

        <PrimaryLink
          href="/login"
          className="px-7 py-4 text-base font-bold shadow-[0_0_40px_rgba(139,92,246,0.35)]"
        >
          <Sparkles className="h-5 w-5" />
          Start Evaluating Free
          <ArrowRight className="h-5 w-5" />
        </PrimaryLink>

        <p className="mt-5 text-sm text-zinc-600">Sign in with Google · No credit card · Free credits included</p>
      </div>
    </section>
  );
}

function LandingFooter() {
  return (
    <footer className="border-t border-white/8 bg-zinc-900">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-violet-500 to-fuchsia-600">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-zinc-50">Prompt Evaluator</span>
        </div>

        <p className="text-center text-xs text-zinc-600">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://github.com/Alchemyst-ai/awesome-saas/"
            className="text-zinc-500 transition-colors duration-200 hover:text-violet-400"
          >
            Ansh Pachauri
          </a>
          . Built with Next.js &amp; D3.js.
        </p>

        <div className="flex items-center gap-1.5 text-xs text-zinc-600">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          Context Memory by Alchemyst AI
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <StatsBar />
      <FeaturesSection />
      <HowItWorksSection />
      <ScoringSection />
      <FAQSection />
      <CTABanner />
      <LandingFooter />
    </div>
  );
}

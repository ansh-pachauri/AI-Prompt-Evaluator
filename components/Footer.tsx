export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-7 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-slate-400">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://github.com/Alchemyst-ai/awesome-saas/"
            className="text-slate-600 font-medium hover:text-indigo-600 transition-colors"
          >
            Ansh Pachauri
          </a>
          . Built with Next.js, Google Gemini &amp; D3.js.
        </p>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Context Memory Layer by Alchemyst AI.
        </div>
      </div>
    </footer>
  );
}

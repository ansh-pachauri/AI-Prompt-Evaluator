export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-slate-400">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://github.com/Alchemyst-ai/awesome-saas/"
            className="text-slate-600 font-medium hover:text-slate-900 transition-colors"
          >
            Alchemyst AI
          </a>
          . Built with Next.js, Google Gemini &amp; D3.js.
        </p>
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-400">Made with 💙</span>
        </div>
      </div>
    </footer>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-zinc-950 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-7 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-zinc-600">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://github.com/Alchemyst-ai/awesome-saas/"
            className="text-zinc-500 font-medium hover:text-violet-400 transition-colors duration-200"
          >
            Ansh Pachauri
          </a>
          . Built with Next.js &amp; D3.js.
        </p>
        <div className="flex items-center gap-1.5 text-xs text-zinc-600">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Context Memory by Alchemyst AI
        </div>
      </div>
    </footer>
  );
}

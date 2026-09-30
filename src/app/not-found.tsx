export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20 texture-paper">
      <div className="max-w-lg text-center">
        <p className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground mb-4 font-medium">
          404
        </p>
        <h1
          className="text-4xl font-bold tracking-tight sm:text-5xl mb-6"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          You found a page I haven't built yet.
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">
          Maybe it's in the next deploy. Or maybe it never existed. Either way, the work you're looking for is probably on the homepage.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
        >
          ← Back to portfolio
        </a>
      </div>
    </main>
  );
}

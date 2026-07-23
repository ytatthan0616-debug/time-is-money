export function Header() {
  return (
    <header className="border-b border-amber-100 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">
            ⏳
          </span>
          <div>
            <p className="text-lg font-bold tracking-tight text-zinc-900">
              タイムイズマネー
            </p>
            <p className="text-xs text-zinc-500">勉強時間を、将来の年収に変えよう</p>
          </div>
        </div>
      </div>
    </header>
  );
}

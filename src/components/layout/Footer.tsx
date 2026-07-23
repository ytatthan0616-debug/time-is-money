export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-100 bg-white/70 py-6 text-center text-xs text-zinc-400">
      <p>© {new Date().getFullYear()} タイムイズマネー — 学習用タイマー</p>
      <p className="mt-1">
        表示される年収アップ額はあくまでモチベーション向上のためのシミュレーションです。
      </p>
    </footer>
  );
}

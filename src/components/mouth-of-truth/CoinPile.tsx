export function CoinPile({ totalCoins }: { totalCoins: number }) {
  const pileHeight = Math.min(10 + totalCoins * 0.6, 56);

  return (
    <div className="flex w-full flex-col items-center pb-8 pt-2">
      <p className="mb-2 text-sm font-medium text-amber-700">
        🪙 {totalCoins.toLocaleString("ja-JP")} <span className="font-normal">枚</span>
      </p>
      <div
        className="w-44 rounded-t-full bg-gradient-to-b from-amber-300 to-amber-500 transition-[height] duration-500 ease-out"
        style={{ height: `${pileHeight}px` }}
        aria-hidden="true"
      />
    </div>
  );
}

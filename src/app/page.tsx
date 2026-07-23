import { HeroSection } from "@/components/hero/HeroSection";
import { StatsPanel } from "@/components/stats/StatsPanel";
import { WageProjectionChart } from "@/components/stats/WageProjectionChart";
import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { AdSlot } from "@/components/ads/AdSlot";

export default function Home() {
  return (
    <main className="flex w-full flex-1 flex-col bg-white">
      <div className="mx-auto w-full max-w-2xl px-4 pt-8 text-center">
        <h1 className="text-xl font-bold text-zinc-900 sm:text-2xl">
          勉強時間を、将来の年収アップに変えよう
        </h1>
        <p className="mt-2 text-xs text-zinc-500 sm:text-sm">
          タイマーで勉強時間を計測すると、真実の口からコインが降ってきます。
        </p>
      </div>

      <HeroSection />

      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 pb-12">
        <AdSlot slot="0000000000" className="h-24 w-full" />
        <StatsPanel />
        <WageProjectionChart />
        <SettingsPanel />
        <AdSlot slot="0000000001" className="h-24 w-full" />
      </div>
    </main>
  );
}

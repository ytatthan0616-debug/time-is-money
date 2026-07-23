import { TimerCard } from "@/components/timer/TimerCard";
import { MouthOfTruth } from "@/components/mouth-of-truth/MouthOfTruth";
import { StatsPanel } from "@/components/stats/StatsPanel";
import { WageProjectionChart } from "@/components/stats/WageProjectionChart";
import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { AdSlot } from "@/components/ads/AdSlot";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
          勉強時間を、将来の年収アップに変えよう
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          タイマーで勉強時間を計測すると、真実の口からコインが降ってきます。
          貯まったコインは、将来得られる賃金の上昇として可視化されます。
        </p>
      </div>

      <AdSlot slot="0000000000" className="h-24 w-full" />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <TimerCard />
          <MouthOfTruth />
        </div>
        <div className="flex flex-col gap-6">
          <StatsPanel />
          <WageProjectionChart />
          <SettingsPanel />
        </div>
      </div>

      <AdSlot slot="0000000001" className="h-24 w-full" />
    </main>
  );
}

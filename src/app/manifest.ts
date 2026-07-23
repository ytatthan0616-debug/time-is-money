import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "タイムイズマネー | 学習タイマー",
    short_name: "タイムイズマネー",
    description:
      "勉強時間を計測すると真実の口からコインが落ち、将来の年収アップ額として可視化される学習タイマー。",
    start_url: "/",
    display: "standalone",
    background_color: "#fffbeb",
    theme_color: "#f59e0b",
    lang: "ja",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

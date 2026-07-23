# タイムイズマネー (Time Is Money)

勉強時間を計測すると「真実の口」からコインが降ってきて、貯まった学習時間が将来の年収アップ額としてシミュレーション表示される学習タイマー Web アプリです。

## 機能

- タイマー: ストップウォッチ / カウントダウン / ポモドーロ（作業・休憩の自動サイクル）
- 学習中、1分経過するごとに真実の口からコインが降ってくる演出
- 累計学習時間・累計コインから、将来の年収アップ額をシンプルな換算式で可視化
  - `推定年収アップ額 = 累計学習時間(h) × 時給換算レート(円/h) × 学習ジャンル係数`
  - 時給換算レート・学習ジャンルは設定パネルから変更可能（ジャンルは任意項目）
- すべてのデータはブラウザの `localStorage` に保存（アカウント登録不要）
- SEO対応（メタデータ / OGP / sitemap.xml / robots.txt / JSON-LD）
- Google AdSense 広告枠（環境変数を設定するだけで有効化）

## 開発

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開くと確認できます。

## 環境変数

`.env.example` を `.env.local` にコピーして設定してください。

```bash
cp .env.example .env.local
```

| 変数名 | 説明 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 本番公開URL（OGP・sitemap・robots.txtの生成に使用） |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Google AdSenseのクライアントID（`ca-pub-...`）。未設定時は広告枠にプレースホルダーが表示されます |

AdSense広告枠のスロットIDは `src/app/page.tsx` の `<AdSlot slot="..." />` に直接指定しているため、実際に発行されたスロットIDに差し替えてください。

## ビルド

```bash
npm run build
npm run start
```

## 本番デプロイ（Vercel）

1. [vercel.com/new](https://vercel.com/new) にアクセスし、GitHubアカウントでログイン
2. `time-is-money` リポジトリを Import
3. 「Environment Variables」で以下を設定してから Deploy
   | 変数名 | 値 |
   | --- | --- |
   | `NEXT_PUBLIC_ADSENSE_CLIENT` | `ca-pub-2071457256389322` |
   | `NEXT_PUBLIC_SITE_URL` | 一旦空でOK（デプロイ後に発行されるURLを設定して再デプロイ） |
4. デプロイ完了後に発行されるURL（例: `https://time-is-money.vercel.app`）を確認し、Vercelの Project Settings → Environment Variables で `NEXT_PUBLIC_SITE_URL` をそのURLに更新 → 再デプロイ
5. Google AdSenseの管理画面で本サイトを「サイト」として追加し、審査を申請する
   - `public/ads.txt`（パブリッシャーID `pub-2071457256389322` を含む）は既にリポジトリに含まれているため追加設定は不要
6. カスタムドメインを使う場合は Vercel の Project Settings → Domains で追加し、`NEXT_PUBLIC_SITE_URL` もそのドメインに合わせて更新する

## 技術スタック

- Next.js (App Router) / TypeScript / Tailwind CSS
- recharts（年収アップ額の推移グラフ）

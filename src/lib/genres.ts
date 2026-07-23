import type { GenreKey } from "@/types";

export interface GenreDefinition {
  key: GenreKey;
  label: string;
  coefficient: number;
  description: string;
}

export const GENRES: GenreDefinition[] = [
  {
    key: "general",
    label: "汎用・その他",
    coefficient: 1.0,
    description: "特にジャンルを指定しない学習全般",
  },
  {
    key: "programming",
    label: "プログラミング",
    coefficient: 1.3,
    description: "エンジニアリング・IT関連スキル",
  },
  {
    key: "language",
    label: "語学",
    coefficient: 1.15,
    description: "英語などの外国語学習",
  },
  {
    key: "certification",
    label: "資格試験",
    coefficient: 1.1,
    description: "国家資格・検定試験の勉強",
  },
  {
    key: "reading",
    label: "読書・自己啓発",
    coefficient: 0.9,
    description: "ビジネス書・教養書などの読書",
  },
];

export function getGenre(key: GenreKey): GenreDefinition {
  return GENRES.find((g) => g.key === key) ?? GENRES[0];
}

import type { Work } from "../../types";

import revatiJp from "../../assets/works/revati-jp.webp";
import revatiStudio from "../../assets/works/studio-revati-jp.webp";

export const SERVICE = [
  {
    title: "REVATI",
    clientName: "REVATI",
    createdAt: "2023-01-21",
    tags: ["Webサイト"],
    authors: ["Rinrin.rs", "GEN3987", "Retoruto9900K", "しろねこ"],
    assets: [
      {
        type: "website",
        title: "revati.jp",
        url: "https://revati.jp",
        thumbnail: revatiJp,
      },
      {
        type: "external",
        title: "ソースコード（リポジトリ）はこちら",
        url: "https://github.com/Sarf-Esports/website",
      },
    ],
  },
  {
    title: "REVATI Studio",
    clientName: "REVATI Studio",
    createdAt: "2025-07-24",
    tags: ["Webサイト"],
    authors: ["RetoRuto9900K", "Rinrin.rs", "Studio Members"],
    assets: [
      {
        type: "website",
        title: "studio.revati.jp",
        url: "https://studio.revati.jp",
        thumbnail: revatiStudio,
      },
      {
        type: "external",
        title: "ソースコード（リポジトリ）はこちら",
        url: "https://github.com/Sarf-Esports/studio-website",
      },
    ],
    border: "3px solid #494040ff",
  },
  {
    title: "英語ドキュメンタリー翻訳",
    clientName: "ObsSojourn",
    createdAt: "2025-10-03",
    tags: ["翻訳/通訳"],
    authors: ["KISHI"],
    assets: [
      {
        type: "video",
        title:
          "どのようにして13歳の神童はOverWatchの「ミスター・ワールドワイド」になったのだろう？ | TOPDRAGON",
        src: "https://www.youtube.com/watch?v=ryLfOLm2-88",
      },
    ],
  },
  {
    title: "英語ドキュメンタリー翻訳",
    clientName: "ObsSojourn",
    createdAt: "2025-11-04",
    tags: ["翻訳/通訳"],
    authors: ["KISHI"],
    assets: [
      {
        type: "video",
        title:
          "このD.Va天才少年はいかにしてOWCSの頂点へとたどり着いたのか｜ZIYAD",
        src: "https://www.youtube.com/watch?v=djK1Wt2NUDk",
      },
    ],
  },
] satisfies Work[];

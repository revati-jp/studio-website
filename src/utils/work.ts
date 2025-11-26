import { WORKS } from "../data/work";
import type {
  Asset,
  AssetType,
  Work,
  Track,
  ImageSource,
  IconImage,
} from "../types";

/** Work IDを生成する関数 */
export function getWorkId(work: Work): string {
  return `${work.title}_${work.createdAt}`;
}

/** IconImageかどうかを判定する型ガード */
export function isIconImage(img: unknown): img is IconImage {
  return (
    img !== null &&
    typeof img === "object" &&
    "icon" in img &&
    "backgroundColor" in img
  );
}

/**
 * Workオブジェクトからサムネイル画像のソースを特定する関数
 *
 * IconImageの場合はnullを返す（最適化対象外）
 */
export function getThumbnailSource(work: Work): ImageSource | null {
  if ("thumbnail" in work && work.thumbnail !== undefined) {
    if (isIconImage(work.thumbnail)) return null;
    return work.thumbnail;
  }

  const firstAsset = work.assets[0];
  if (
    firstAsset &&
    "thumbnail" in firstAsset &&
    firstAsset.thumbnail !== undefined
  )
    return firstAsset.thumbnail;

  const imageAsset = work.assets.find((asset) => asset.type === "image");
  if (imageAsset && imageAsset.type === "image") return imageAsset.src;

  return null;
}

export interface WorkEntry extends Work {
  category: keyof WORKS;
}

export interface WorkQueryOptions {
  category?: keyof WORKS;
  author?: string;
  tags?: string[];
}

export function queryWorks(options?: WorkQueryOptions): WorkEntry[] {
  const works: WorkEntry[] = [];

  for (const category in WORKS) {
    if (options?.category && options.category !== category) continue;
    const categoryWorks = WORKS[category as keyof WORKS];

    for (const work of categoryWorks) {
      if (options?.author && !work.authors.includes(options.author)) continue;
      if (
        options?.tags &&
        !options.tags.every((tag) => work.tags.includes(tag))
      )
        continue;

      works.push({
        ...work,
        category: category as keyof WORKS,
      });
    }
  }

  return works;
}

export interface AssetQueryOptions {
  category?: keyof WORKS;
  type?: AssetType;
  excludeHideFromCarousel?: boolean;
}

export function queryAssets(options?: AssetQueryOptions): Asset[] {
  const works = queryWorks();
  const assets: Asset[] = [];

  if (!options) return works.flatMap((work) => work.assets);

  for (const work of works) {
    if (options.category && work.category !== options.category) continue;

    for (const asset of work.assets) {
      if (options.type && asset.type !== options.type) continue;
      if (
        options.excludeHideFromCarousel &&
        asset.type === "image" &&
        asset.hideFromCarousel === true
      )
        continue;

      assets.push(asset);
    }
  }

  return assets;
}

export function getMusicList(): Track[] {
  const works = queryWorks({ category: "music" });
  const tracks: Track[] = [];

  for (const work of works) {
    for (const asset of work.assets) {
      if (asset.type === "music") {
        tracks.push({
          title: asset.title,
          artist: work.authors.join(", "),
          src: asset.src,
        });
      }
    }
  }

  return tracks;
}

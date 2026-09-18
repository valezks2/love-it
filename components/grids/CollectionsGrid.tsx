"use client";
import Link from "next/link";
import Image from "next/image";

export interface CollectionItem {
  id: number;
  title: string;
  imageCount: number;
  images: string[];
  followers?: string;
}

const defaultCollections: CollectionItem[] = [
  {
    id: 1,
    title: "Painting With Words",
    imageCount: 15,
    followers: "1.2k",
    images: ["/1.jpg", "/2.jpg", "/3.avif"],
  },
  {
    id: 2,
    title: "Nature at its best",
    imageCount: 32,
    followers: "4.8k",
    images: ["/1.jpg", "/2.jpg", "/3.avif"],
  },
  {
    id: 3,
    title: "Vibes & Aesthetics",
    imageCount: 8,
    followers: "950",
    images: ["/1.jpg", "/2.jpg", "/3.avif"],
  },
  {
    id: 4,
    title: "Minimal Living",
    imageCount: 21,
    followers: "2.3k",
    images: ["/1.jpg", "/2.jpg", "/3.avif"],
  },
];

interface CollectionsGridProps {
  collections?: CollectionItem[];
}

export default function CollectionsGrid({
  collections = defaultCollections,
}: CollectionsGridProps) {
  const itemsToRender = collections || [];

  if (itemsToRender.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-zinc-500">
        No collections found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {itemsToRender.map((collection) => (
        <Link
          key={collection.id}
          href={`/collection/${collection.id}`}
          className="group block overflow-hidden rounded-3xl bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
        >
          <div className="aspect-[4/3] flex gap-1 p-1 bg-white dark:bg-[#141414]">
            <div className="relative w-[66.6%] h-full overflow-hidden rounded-l-2xl bg-gray-100 dark:bg-[#1f1f1f]">
              {collection.images?.[0] ? (
                <Image
                  src={collection.images[0]}
                  alt={`${collection.title} grande`}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-zinc-500 text-xs">
                  No Image
                </div>
              )}
            </div>

            <div className="w-[33.3%] flex flex-col gap-1 h-full">
              <div className="relative flex-1 w-full overflow-hidden rounded-tr-2xl bg-gray-50 dark:bg-[#1f1f1f]">
                {collection.images?.[1] && (
                  <Image
                    src={collection.images[1]}
                    alt={`${collection.title} superior`}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                )}
              </div>

              <div className="relative flex-1 w-full overflow-hidden rounded-br-2xl bg-gray-50 dark:bg-[#1f1f1f]">
                {collection.images?.[2] && (
                  <Image
                    src={collection.images[2]}
                    alt={`${collection.title} inferior`}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="p-5 border-t border-gray-100 dark:border-[#262626]">
            <h3 className="text-base font-semibold tracking-tight text-gray-800 dark:text-[#ededed] transition-colors group-hover:text-[#b72c0f] dark:group-hover:text-[#b72c0f]">
              {collection.title}
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-zinc-400 font-medium flex items-center gap-1.5">
              <span>{collection.imageCount} images</span>
              {collection.followers && (
                <>
                  <span className="text-gray-300 dark:text-[#262626]">•</span>
                  <span>{collection.followers} followers</span>
                </>
              )}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

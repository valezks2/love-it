"use client";
import Link from "next/link";
import Image from "next/image";

const collections = [
  {
    id: 1,
    title: "Painting With Words",
    imageCount: 15,
    images: ["/1.jpg", "/2.jpg", "/3.avif"],
  },
  {
    id: 2,
    title: "Nature at its best",
    imageCount: 32,
    images: ["/1.jpg", "/2.jpg", "/3.avif"],
  },
  {
    id: 3,
    title: "Vibes & Aesthetics",
    imageCount: 8,
    images: ["/1.jpg", "/2.jpg", "/3.avif"],
  },
  {
    id: 4,
    title: "Minimal Living",
    imageCount: 21,
    images: ["/1.jpg", "/2.jpg", "/3.avif"],
  },
];

export default function CollectionsGrid() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {collections.map((collection) => (
        <div
          key={collection.id}
          className="group relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
        >
          <div className="aspect-[4/3] flex gap-1 p-1 bg-white">
            <div className="relative w-[66.6%] h-full overflow-hidden rounded-l-2xl">
              <Image
                src={collection.images[0]}
                alt={`${collection.title} grande`}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>

            <div className="w-[33.3%] flex flex-col gap-1 h-full">
              <div className="relative flex-1 w-full overflow-hidden rounded-tr-2xl">
                <Image
                  src={collection.images[1] || collection.images[0]}
                  alt={`${collection.title} superior`}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              <div className="relative flex-1 w-full overflow-hidden rounded-br-2xl">
                <Image
                  src={collection.images[2] || collection.images[0]}
                  alt={`${collection.title} inferior`}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          <div className="p-5 border-t border-gray-100 flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-base font-semibold tracking-tight text-gray-800 transition-colors group-hover:text-[#b72c0f]">
                {collection.title}
              </h3>
              <p className="mt-1 text-xs text-gray-500 font-medium">
                {collection.imageCount} images
              </p>
            </div>
            <Link href={`/collection/${collection.id}`}>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-[#b72c0f]/10 hover:text-[#b72c0f] cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

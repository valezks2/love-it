"use client";
import Link from "next/link";
import Image from "next/image";

const collections = [
  {
    id: 1,
    title: "Painting With Words",
    imageCount: 15,
    images: ["/1.jpg", "/2.jpg", "/3.avif", "/4.jpg"],
  },
  {
    id: 2,
    title: "Nature at its best",
    imageCount: 32,
    images: ["/1.jpg", "/2.jpg", "/3.avif", "/4.jpg"],
  },
  {
    id: 3,
    title: "Vibes & Aesthetics",
    imageCount: 8,
    images: ["/1.jpg", "/2.jpg", "/3.avif", "/4.jpg"],
  },
  {
    id: 4,
    title: "Minimal Living",
    imageCount: 21,
    images: ["/1.jpg", "/2.jpg", "/3.avif", "/4.jpg"],
  },
];

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#fafafa] font-sans antialiased text-gray-800">
      <section
        className="relative h-[30vh] min-h-[200px] w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/10 z-0" />
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-20">
        <section className="relative z-10 flex flex-col items-center bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-gray-100">
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="relative h-28 w-28 md:h-36 md:w-36 overflow-hidden rounded-full border-4 border-white shadow-xl">
              <Image
                src="/hero.jpg"
                alt="Mitt Ray"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex flex-col items-center">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-gray-950">
                Valezka
              </h1>
              <p className="mt-2 text-sm md:text-base font-medium text-gray-700 max-w-lg leading-relaxed">
                Software engineer and hobbyist artist.
              </p>

              <div className="mt-3 text-xs md:text-sm flex items-center gap-1.5 text-gray-500 font-medium">
                <span>Zulia, Venezuela</span>
                <span>•</span>
                <a
                  href="https://valezka-dev.pages.dev/"
                  target="_blank"
                  className="text-[#b72c0f] hover:underline"
                >
                  https://valezka-dev.pages.dev/
                </a>
              </div>

              <div className="mt-3 flex items-center gap-4 text-xs md:text-sm font-medium text-gray-600">
                <div>
                  <span className="font-bold text-gray-900">1,240</span>{" "}
                  followers
                </div>
                <div className="text-gray-300">•</div>
                <div>
                  <span className="font-bold text-gray-900">482</span> following
                </div>
              </div>
            </div>
          </div>

          <nav className="mt-8 border-t border-gray-100 pt-6 w-full flex justify-center">
            <ul className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-gray-600">
              <li>
                <Link
                  href="/profile/dashboard"
                  className="px-4 py-2 rounded-full transition-colors hover:bg-gray-100"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/collections"
                  className="px-4 py-2 rounded-full bg-[#b72c0f]/10 text-[#b72c0f] transition-colors"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/hearts"
                  className="px-4 py-2 rounded-full transition-colors hover:bg-gray-100"
                >
                  Hearts
                </Link>
              </li>
            </ul>
          </nav>
        </section>

        <section className="mt-10 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className="group relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
              >
                <div className="aspect-[4/3] grid grid-cols-2 grid-rows-2 gap-0.5 p-0.5 bg-gray-50">
                  {collection.images.map((img, index) => (
                    <div
                      key={index}
                      className="relative w-full h-full overflow-hidden"
                    >
                      <Image
                        src={img}
                        alt={`${collection.title} detail ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>
                  ))}
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
        </section>
      </div>
    </main>
  );
}

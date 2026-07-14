"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AddToCollectionModal from "@/components/ui/AddToCollectionModal";
import Toast from "@/components/ui/Toast";

const COLLECTIONS_DB = [
  {
    id: 1,
    title: "Painting With Words",
    imageCount: 15,
    heartsCount: 616,
    followersCount: 1360,
    description: "Inspiración y fragmentos poéticos para el alma.",
    bannerImage: "/1.jpg",
    creator: {
      name: "Valezka",
      username: "@valezks2",
      avatar: "/hero.jpg",
    },
    images: [
      { id: 101, src: "/1.jpg", alt: "Aesthetic post 1" },
      { id: 102, src: "/2.jpg", alt: "Aesthetic post 2" },
      { id: 103, src: "/3.avif", alt: "Aesthetic post 3" },
      { id: 104, src: "/4.jpg", alt: "Aesthetic post 4" },
      { id: 105, src: "/2.jpg", alt: "Aesthetic post 5" },
      { id: 106, src: "/1.jpg", alt: "Aesthetic post 6" },
      { id: 107, src: "/4.jpg", alt: "Aesthetic post 7" },
      { id: 108, src: "/3.avif", alt: "Aesthetic post 8" },
    ],
  },
  {
    id: 2,
    title: "Nature at its best",
    imageCount: 32,
    heartsCount: 840,
    followersCount: 1120,
    description: "The great outdoors, winter snow and green fields.",
    bannerImage: "/2.jpg",
    creator: {
      name: "Valezka",
      username: "@valezks2",
      avatar: "/hero.jpg",
    },
    images: [
      { id: 201, src: "/2.jpg", alt: "Nature 1" },
      { id: 202, src: "/1.jpg", alt: "Nature 2" },
      { id: 203, src: "/3.avif", alt: "Nature 3" },
      { id: 204, src: "/4.jpg", alt: "Nature 4" },
    ],
  },
];

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
}

export default function CollectionDetailPage() {
  const router = useRouter();
  const { id } = useParams();

  const collection = COLLECTIONS_DB.find((col) => col.id === Number(id));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!collection) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-white">
        <p className="text-gray-500 font-medium">Collection not found</p>
        <button
          onClick={() => router.back()}
          className="text-[#b72c0f] font-semibold hover:text-[#96240c] transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleOpenModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const toggleLike = (uniqueId: string) => {
    setLikedItems((prev) => {
      const isCurrentlyLiked = prev.includes(uniqueId);
      if (isCurrentlyLiked) {
        return prev.filter((id) => id !== uniqueId);
      } else {
        setToastMessage("Saved successfully to profile");
        return [...prev, uniqueId];
      }
    });
  };

  const toggleDropdown = (e: React.MouseEvent, uniqueId: string) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === uniqueId ? null : uniqueId);
  };

  const handleDropdownAction = (action: string) => {
    setActiveDropdown(null);
    setToastMessage(null);
    setTimeout(() => {
      if (action === "Download") {
        setToastMessage("Image downloaded successfully");
      } else if (action === "Share") {
        setToastMessage("Link shared successfully");
      } else if (action === "Report") {
        setToastMessage("Image reported successfully");
      }
    }, 50);
  };

  return (
    <main className="min-h-screen bg-white font-sans antialiased text-gray-800 pb-16 relative">
      <section
        className="relative h-[35vh] min-h-[240px] w-full bg-cover bg-center flex items-end p-6 md:p-10"
        style={{ backgroundImage: `url('${collection.bannerImage}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30 z-0" />

        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition hover:bg-black/40 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-2 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-sm">
            {collection.title.toLowerCase()}.
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-5">
        <section className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-full overflow-hidden border border-gray-100 bg-gray-200">
            <Image
              src={collection.creator.avatar}
              alt={collection.creator.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-600 transition">
              {collection.creator.username}
            </h2>
          </div>
        </section>

        {collection.description && (
          <p className="mt-3 text-sm font-medium text-gray-400 max-w-2xl leading-relaxed">
            {collection.description}
          </p>
        )}

        <section className="mt-5 py-3 border-y border-gray-100 flex items-center justify-between text-sm font-bold tracking-tight">
          <div className="text-gray-400 font-semibold">
            <span className="text-gray-900 font-extrabold mr-1">
              {collection.heartsCount}
            </span>{" "}
            Hearts
          </div>
          <div className="text-[#b72c0f] flex items-center gap-1 cursor-pointer hover:opacity-80 transition">
            <span>{collection.followersCount} Seguidores</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-3.5 h-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </section>

        <section className="mt-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {collection.images.map((img) => {
              const uniqueId = `collection-${img.id}`;
              const isLiked = likedItems.includes(uniqueId);
              const isDropdownOpen = activeDropdown === uniqueId;

              return (
                <div
                  key={uniqueId}
                  className="group relative aspect-square w-full overflow-hidden bg-gray-50 rounded-xl border border-gray-100"
                >
                  <Link
                    href={`/post/${img.id}`}
                    className="block h-full w-full"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-102"
                    />
                  </Link>

                  <div
                    className={`absolute inset-0 bg-black/25 transition-opacity duration-300 flex items-start justify-end p-4 gap-2 ${
                      isDropdownOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 group-hover:opacity-100 pointer-events-none"
                    }`}
                  >
                    <button
                      onClick={() => toggleLike(uniqueId)}
                      className={`flex h-9 w-9 items-center justify-center rounded-full shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-110 active:scale-90 pointer-events-auto cursor-pointer ${
                        isLiked
                          ? "bg-[#b72c0f] text-white"
                          : "bg-white/95 text-gray-700 hover:bg-white hover:text-[#b72c0f]"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                      >
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                      </svg>
                    </button>

                    <button
                      onClick={() => handleOpenModal(img)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-[#b72c0f] hover:scale-110 active:scale-90 pointer-events-auto cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z"
                        />
                      </svg>
                    </button>

                    <div
                      className="relative pointer-events-auto"
                      ref={isDropdownOpen ? dropdownRef : null}
                    >
                      <button
                        onClick={(e) => toggleDropdown(e, uniqueId)}
                        className={`flex h-9 w-9 items-center justify-center rounded-full shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer ${
                          isDropdownOpen
                            ? "bg-[#b72c0f] text-white"
                            : "bg-white/95 text-gray-700 hover:bg-white hover:text-[#b72c0f]"
                        }`}
                      >
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
                            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0"
                          />
                        </svg>
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-36 origin-top-right rounded-xl bg-white p-1.5 shadow-lg border border-gray-100 ring-1 ring-black/5 z-30 animate-fadeIn">
                          <button
                            onClick={() => handleDropdownAction("Download")}
                            className="flex w-full items-center px-3 py-2 text-left text-xs font-semibold text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Download
                          </button>
                          <button
                            onClick={() => handleDropdownAction("Share")}
                            className="flex w-full items-center px-3 py-2 text-left text-xs font-semibold text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Share
                          </button>
                          <hr className="my-1 border-gray-100" />
                          <button
                            onClick={() => handleDropdownAction("Report")}
                            className="flex w-full items-center px-3 py-2 text-left text-xs font-semibold text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            Report
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {isModalOpen && selectedItem && (
        <AddToCollectionModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          imageSrc={selectedItem.src}
          imageAlt={selectedItem.alt}
        />
      )}

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </main>
  );
}

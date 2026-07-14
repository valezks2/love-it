"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AddToCollectionModal from "@/components/ui/AddToCollectionModal";
import Toast from "@/components/ui/Toast";

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
}

interface CollectionItem {
  id: number;
  title: string;
  imageCount: number;
  images: string[];
}

interface UserItem {
  id: number;
  name: string;
  username: string;
  avatar: string;
  followersCount: number;
  photosCount: number;
}

const baseItems: GalleryItem[] = [
  { id: 1, src: "/1.jpg", alt: "Beautiful beach" },
  { id: 2, src: "/2.jpg", alt: "Food aesthetic" },
  { id: 3, src: "/3.avif", alt: "Korea aesthetic" },
  { id: 4, src: "/4.jpg", alt: "Flowers aesthetic" },
];

const galleryItems: GalleryItem[] = Array.from({ length: 4 }).flatMap(
  (_, rowIndex) =>
    baseItems.map((item, itemIndex) => ({
      ...item,
      id: rowIndex * baseItems.length + itemIndex + 1,
    })),
);

const collectionsData: CollectionItem[] = [
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

const usersData: UserItem[] = [
  {
    id: 1,
    name: "Sofía Rodríguez",
    username: "sofiarodriguez",
    avatar: "/hero.jpg",
    followersCount: 1420,
    photosCount: 38,
  },
  {
    id: 2,
    name: "Mateo Silva",
    username: "mateosilva",
    avatar: "/hero.jpg",
    followersCount: 980,
    photosCount: 24,
  },
  {
    id: 3,
    name: "Yuki Tanaka",
    username: "yukitanaka",
    avatar: "/hero.jpg",
    followersCount: 2540,
    photosCount: 56,
  },
  {
    id: 4,
    name: "Emma Watson",
    username: "emmawatson",
    avatar: "/hero.jpg",
    followersCount: 41200,
    photosCount: 112,
  },
];

export default function SearchResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-20 text-gray-500">Loading search...</div>
      }
    >
      <SearchResultsContent />
    </Suspense>
  );
}

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [activeTab, setActiveTab] = useState<
    "photos" | "collections" | "users"
  >("photos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const [followedUsers, setFollowedUsers] = useState<number[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const filteredPhotos = galleryItems.filter((item) =>
    item.alt.toLowerCase().includes(query.toLowerCase()),
  );

  const filteredCollections = collectionsData.filter((col) =>
    col.title.toLowerCase().includes(query.toLowerCase()),
  );

  const filteredUsers = usersData.filter(
    (user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.username.toLowerCase().includes(query.toLowerCase()),
  );

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

  const handleOpenModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    setActiveDropdown(null);
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

  const toggleFollowUser = (userId: number) => {
    setFollowedUsers((prev) => {
      const isFollowing = prev.includes(userId);
      if (isFollowing) {
        return prev.filter((id) => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handleDropdownAction = (action: string) => {
    setActiveDropdown(null);
    setToastMessage(null);
    setTimeout(() => {
      if (action === "Download")
        setToastMessage("Image downloaded successfully");
      else if (action === "Share") setToastMessage("Link shared successfully");
      else if (action === "Report")
        setToastMessage("Image reported successfully");
    }, 50);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          {query ? (
            <>
              Results for <span className="text-[#b72c0f]">"{query}"</span>
            </>
          ) : (
            "Explore all"
          )}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          We found {filteredPhotos.length} photos, {filteredCollections.length}{" "}
          collections and {filteredUsers.length} users.
        </p>
      </div>

      <div className="mb-8 border-b border-gray-200">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("photos")}
            className={`pb-3 text-sm font-semibold transition-all border-b-2 cursor-pointer ${
              activeTab === "photos"
                ? "border-[#b72c0f] text-[#b72c0f]"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            Photos ({filteredPhotos.length})
          </button>
          <button
            onClick={() => setActiveTab("collections")}
            className={`pb-3 text-sm font-semibold transition-all border-b-2 cursor-pointer ${
              activeTab === "collections"
                ? "border-[#b72c0f] text-[#b72c0f]"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            Collections ({filteredCollections.length})
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`pb-3 text-sm font-semibold transition-all border-b-2 cursor-pointer ${
              activeTab === "users"
                ? "border-[#b72c0f] text-[#b72c0f]"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            Users ({filteredUsers.length})
          </button>
        </div>
      </div>

      {activeTab === "photos" &&
        (filteredPhotos.length === 0 ? (
          <div className="py-20 text-center text-gray-500">
            No photos found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredPhotos.map((item) => {
              const uniqueId = `gallery-${item.id}`;
              const isLiked = likedItems.includes(uniqueId);
              const isDropdownOpen = activeDropdown === uniqueId;

              return (
                <div
                  key={uniqueId}
                  className="group relative aspect-square w-full overflow-hidden bg-gray-50 rounded-xl border border-gray-100"
                >
                  <Link
                    href={`/post/${item.id}`}
                    className="block h-full w-full"
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-102"
                    />
                  </Link>

                  <div
                    className={`absolute inset-0 bg-black/25 transition-opacity duration-300 flex items-start justify-end p-4 gap-2 ${
                      isDropdownOpen
                        ? "opacity-100"
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
                      onClick={() => handleOpenModal(item)}
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
                          d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15a2.25 2.25 0 0 0 2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z"
                        />
                      </svg>
                    </button>

                    <div
                      className="relative pointer-events-auto"
                      ref={isDropdownOpen ? dropdownRef : null}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdown(isDropdownOpen ? null : uniqueId);
                        }}
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
                        <div className="absolute right-0 mt-2 w-36 origin-top-right rounded-xl bg-white p-1.5 shadow-lg border border-gray-100 z-30">
                          <button
                            onClick={() => handleDropdownAction("Download")}
                            className="flex w-full items-center px-3 py-2 text-left text-xs font-semibold text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer"
                          >
                            Download
                          </button>
                          <button
                            onClick={() => handleDropdownAction("Share")}
                            className="flex w-full items-center px-3 py-2 text-left text-xs font-semibold text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer"
                          >
                            Share
                          </button>
                          <hr className="my-1 border-gray-100" />
                          <button
                            onClick={() => handleDropdownAction("Report")}
                            className="flex w-full items-center px-3 py-2 text-left text-xs font-semibold text-red-600 rounded-lg hover:bg-red-50 cursor-pointer"
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
        ))}

      {activeTab === "collections" &&
        (filteredCollections.length === 0 ? (
          <div className="py-20 text-center text-gray-500">
            No collections found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCollections.map((collection) => (
              <div
                key={collection.id}
                className="group relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
              >
                <div className="aspect-[4/3] flex gap-1 p-1 bg-white">
                  <div className="relative w-[66.6%] h-full overflow-hidden rounded-l-2xl">
                    <Image
                      src={collection.images[0]}
                      alt={`${collection.title} large`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="w-[33.3%] flex flex-col gap-1 h-full">
                    <div className="relative flex-1 w-full overflow-hidden rounded-tr-2xl">
                      <Image
                        src={collection.images[1] || collection.images[0]}
                        alt={`${collection.title} top`}
                        fill
                        sizes="(max-width: 768px) 33vw, 15vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>

                    <div className="relative flex-1 w-full overflow-hidden rounded-br-2xl">
                      <Image
                        src={collection.images[2] || collection.images[0]}
                        alt={`${collection.title} bottom`}
                        fill
                        sizes="(max-width: 768px) 33vw, 15vw"
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
        ))}

      {activeTab === "users" &&
        (filteredUsers.length === 0 ? (
          <div className="py-20 text-center text-gray-500">
            No users found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredUsers.map((user) => {
              const isFollowing = followedUsers.includes(user.id);
              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/user/${user.username}`}
                      className="relative h-11 w-11 shrink-0 rounded-full bg-gray-200 overflow-hidden border border-gray-100 cursor-pointer"
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    </Link>
                    <div>
                      <Link href={`/user/${user.username}`}>
                        <h3 className="font-bold text-gray-800 flex items-center gap-1 text-sm cursor-pointer hover:text-[#b72c0f] transition">
                          {user.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-gray-400">@{user.username}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleFollowUser(user.id)}
                    className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition cursor-pointer shrink-0 ${
                      isFollowing
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        : "bg-[#b72c0f] text-white hover:bg-[#96240c]"
                    }`}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                </div>
              );
            })}
          </div>
        ))}

      {isModalOpen && selectedItem && (
        <AddToCollectionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          imageSrc={selectedItem.src}
          imageAlt={selectedItem.alt}
        />
      )}

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}

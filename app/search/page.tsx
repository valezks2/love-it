"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AddToCollectionModal from "@/components/ui/AddToCollectionModal";
import Toast from "@/components/ui/Toast";
import ImageGrid from "@/components/ui/ImageGrid";
import CollectionsGrid, {
  CollectionItem,
} from "@/components/ui/CollectionsGrid";
import { GalleryItem } from "@/components/ui/ImageCard";

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
        <div className="text-center py-20 text-gray-500 font-medium">
          Loading search...
        </div>
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

  const handleOpenModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const toggleLike = (uniqueId: string) => {
    setLikedItems((prev) => {
      const isCurrentlyLiked = prev.includes(uniqueId);
      if (isCurrentlyLiked) {
        return prev.filter((id) => id !== uniqueId);
      } else {
        showToast("Saved successfully to profile");
        return [...prev, uniqueId];
      }
    });
  };

  const toggleFollowUser = (userId: number) => {
    setFollowedUsers((prev) => {
      const isFollowing = prev.includes(userId);
      return isFollowing
        ? prev.filter((id) => id !== userId)
        : [...prev, userId];
    });
  };

  const showToast = (message: string) => {
    setToastMessage(null);
    setTimeout(() => {
      setToastMessage(message);
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
        <p className="mt-2 text-sm text-gray-500 font-medium">
          We found {filteredPhotos.length} photos, {filteredCollections.length}{" "}
          collections and {filteredUsers.length} users.
        </p>
      </div>

      <div className="mb-8 border-b border-gray-200">
        <div className="flex gap-6">
          {(["photos", "collections", "users"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-semibold capitalize transition-all border-b-2 cursor-pointer ${
                activeTab === tab
                  ? "border-[#b72c0f] text-[#b72c0f]"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab} (
              {tab === "photos"
                ? filteredPhotos.length
                : tab === "collections"
                  ? filteredCollections.length
                  : filteredUsers.length}
              )
            </button>
          ))}
        </div>
      </div>

      {activeTab === "photos" &&
        (filteredPhotos.length === 0 ? (
          <div className="py-20 text-center text-gray-500 font-medium">
            No photos found matching your search.
          </div>
        ) : (
          <ImageGrid
            items={filteredPhotos}
            sectionPrefix="gallery"
            likedItems={likedItems}
            onToggleLike={toggleLike}
            onOpenCollectionModal={handleOpenModal}
            onToastMessage={showToast}
          />
        ))}

      {activeTab === "collections" &&
        (filteredCollections.length === 0 ? (
          <div className="py-20 text-center text-gray-500 font-medium">
            No collections found matching your search.
          </div>
        ) : (
          <CollectionsGrid collections={filteredCollections} />
        ))}

      {activeTab === "users" &&
        (filteredUsers.length === 0 ? (
          <div className="py-20 text-center text-gray-500 font-medium">
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

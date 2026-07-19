"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import AddToCollectionModal from "@/components/ui/AddToCollectionModal";
import UpdateModal from "@/components/ui/UpdateCollectionModal";
import Toast from "@/components/ui/Toast";
import ImageGrid from "@/components/ui/ImageGrid";
import { GalleryItem } from "@/components/ui/ImageCard";

const COLLECTIONS_DB = [
  {
    id: 1,
    title: "Painting With Words",
    imageCount: 15,
    heartsCount: 616,
    followersCount: 1360,
    description: "Inspiration and poetic snippets for the soul.",
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

export default function CollectionDetailPage() {
  const router = useRouter();
  const { id } = useParams();

  const initialCollection = COLLECTIONS_DB.find((col) => col.id === Number(id));

  const [collection, setCollection] = useState(initialCollection || null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
        showToast("Saved successfully to profile");
        return [...prev, uniqueId];
      }
    });
  };

  const showToast = (message: string) => {
    setToastMessage(null);
    setTimeout(() => {
      setToastMessage(message);
    }, 50);
  };

  const handleSaveCollectionUpdates = (updatedData: {
    title: string;
    description: string;
    bannerImage: string;
  }) => {
    setCollection((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        title: updatedData.title,
        description: updatedData.description,
        bannerImage: updatedData.bannerImage,
      };
    });
    showToast("Collection settings updated successfully");
  };

  return (
    <main className="min-h-screen bg-white font-sans antialiased text-gray-800 pb-16 relative">
      <section
        className="relative h-[35vh] min-h-[240px] w-full bg-cover bg-center flex items-end px-4 pb-6 md:px-8 md:pb-10"
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

        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setIsUpdateModalOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition hover:bg-black/40 hover:rotate-45 duration-350 ease-out cursor-pointer"
            aria-label="Collection Settings"
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
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
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
            <span>{collection.followersCount} Followers</span>
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
          <ImageGrid
            items={collection.images}
            sectionPrefix={`collection-${collection.id}`}
            likedItems={likedItems}
            onToggleLike={toggleLike}
            onOpenCollectionModal={handleOpenModal}
            onToastMessage={showToast}
          />
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

      {isUpdateModalOpen && (
        <UpdateModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          initialTitle={collection.title}
          initialDescription={collection.description || ""}
          initialBannerImage={collection.bannerImage}
          onSave={handleSaveCollectionUpdates}
        />
      )}

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </main>
  );
}

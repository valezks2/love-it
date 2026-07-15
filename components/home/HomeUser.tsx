"use client";
import { useState } from "react";
import AddToCollectionModal from "@/components/ui/AddToCollectionModal";
import Toast from "@/components/ui/Toast";
import ImageGrid from "@/components/ui/ImageGrid";
import CollectionsGrid from "@/components/ui/CollectionsGrid";
import { GalleryItem } from "@/components/ui/ImageCard";

export default function HomeUser() {
  const baseItems: GalleryItem[] = [
    { id: 1, src: "/1.jpg", alt: "Beautiful beach" },
    { id: 2, src: "/2.jpg", alt: "Food aesthetic" },
    { id: 3, src: "/3.avif", alt: "Korea aesthetic" },
    { id: 4, src: "/4.jpg", alt: "Flowers aesthetic" },
  ];

  const items: GalleryItem[] = Array.from({ length: 5 }).flatMap(
    (_, rowIndex) =>
      baseItems.map((item, itemIndex) => ({
        ...item,
        id: rowIndex * baseItems.length + itemIndex + 1,
      })),
  );

  const [activeTab, setActiveTab] = useState<"photos" | "collections">(
    "photos",
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  return (
    <main className="min-h-screen bg-white font-sans antialiased relative">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10 border-b border-gray-200">
          <div className="flex gap-8 justify-center sm:justify-start">
            <button
              onClick={() => setActiveTab("photos")}
              className={`pb-4 text-base font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === "photos"
                  ? "border-b-2 border-[#b72c0f] text-[#b72c0f]"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              Photos
            </button>
            <button
              onClick={() => setActiveTab("collections")}
              className={`pb-4 text-base font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === "collections"
                  ? "border-b-2 border-[#b72c0f] text-[#b72c0f]"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              Collections
            </button>
          </div>
        </div>

        {activeTab === "photos" ? (
          <div className="space-y-14">
            <section>
              <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold tracking-tight text-gray-800 md:text-2xl">
                  Top Today Images
                </h2>
              </div>
              <ImageGrid
                items={items}
                sectionPrefix="top"
                likedItems={likedItems}
                onToggleLike={toggleLike}
                onOpenCollectionModal={handleOpenModal}
                onToastMessage={showToast}
              />
            </section>

            <section>
              <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold tracking-tight text-gray-800 md:text-2xl">
                  Following
                </h2>
              </div>
              <ImageGrid
                items={items}
                sectionPrefix="feed"
                likedItems={likedItems}
                onToggleLike={toggleLike}
                onOpenCollectionModal={handleOpenModal}
                onToastMessage={showToast}
              />
            </section>

            <section>
              <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold tracking-tight text-gray-800 md:text-2xl">
                  Favorite Tags
                </h2>
              </div>
              <ImageGrid
                items={[...items].reverse()}
                sectionPrefix="tags"
                likedItems={likedItems}
                onToggleLike={toggleLike}
                onOpenCollectionModal={handleOpenModal}
                onToastMessage={showToast}
              />
            </section>
          </div>
        ) : (
          <CollectionsGrid />
        )}
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

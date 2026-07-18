"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import AddToCollectionModal from "@/components/ui/AddToCollectionModal";
import Toast from "@/components/ui/Toast";
import ImageGrid from "@/components/ui/ImageGrid";
import { GalleryItem } from "@/components/ui/ImageCard";

const baseItems: GalleryItem[] = [
  { id: 1, src: "/1.jpg", alt: "Beautiful beach" },
  { id: 2, src: "/2.jpg", alt: "Food aesthetic" },
  { id: 3, src: "/3.avif", alt: "Korea aesthetic" },
  { id: 4, src: "/4.jpg", alt: "Flowers aesthetic" },
];

const galleryItemsWithTags = Array.from({ length: 4 }).flatMap((_, rowIndex) =>
  baseItems.map((item, itemIndex) => ({
    ...item,
    id: rowIndex * baseItems.length + itemIndex + 1,
    tags:
      itemIndex === 0
        ? ["nature", "beach"]
        : itemIndex === 1
          ? ["food", "aesthetic"]
          : itemIndex === 2
            ? ["korea", "travel", "aesthetic"]
            : ["flowers", "spring"],
  })),
);

export default function TagResultsPage() {
  const { id } = useParams();
  const currentTag = typeof id === "string" ? decodeURIComponent(id) : "";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredPhotos = galleryItemsWithTags.filter((item) =>
    item.tags.some((t) => t.toLowerCase() === currentTag.toLowerCase()),
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
          Results for the tag{" "}
          <span className="text-[#b72c0f]">"{currentTag}"</span>{" "}
        </h1>
        <p className="mt-2 text-sm text-gray-500 font-medium">
          We found {filteredPhotos.length}{" "}
          {filteredPhotos.length === 1 ? "photo" : "photos"} matching this tag.
        </p>
      </div>

      {filteredPhotos.length === 0 ? (
        <div className="py-20 text-center text-gray-500 font-medium">
          No photos found matching this tag.
        </div>
      ) : (
        <ImageGrid
          items={filteredPhotos}
          sectionPrefix="tags-gallery"
          likedItems={likedItems}
          onToggleLike={toggleLike}
          onOpenCollectionModal={handleOpenModal}
          onToastMessage={showToast}
        />
      )}

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

"use client";
import { useState } from "react";
import ProfileWrapper from "@/components/ui/ProfileWrapper";
import AddToCollectionModal from "@/components/ui/AddToCollectionModal";
import Toast from "@/components/ui/Toast";
import ImageGrid from "@/components/ui/ImageGrid";
import { GalleryItem } from "@/components/ui/ImageCard";

export default function LovedPage() {
  const baseItems: GalleryItem[] = [
    { id: 1, src: "/1.jpg", alt: "Beautiful beach" },
    { id: 2, src: "/2.jpg", alt: "Food aesthetic" },
    { id: 3, src: "/3.avif", alt: "Korea aesthetic" },
    { id: 4, src: "/4.jpg", alt: "Flowers aesthetic" },
  ];

  const items: GalleryItem[] = Array.from({ length: 3 }).flatMap(
    (_, rowIndex) =>
      baseItems.map((item, itemIndex) => ({
        ...item,
        id: rowIndex * baseItems.length + itemIndex + 1,
      })),
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const [likedItems, setLikedItems] = useState<string[]>(
    items.map((item) => `loved-${item.id}`),
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
    <ProfileWrapper activeTab="loved">
      <ImageGrid
        items={items}
        sectionPrefix="loved"
        likedItems={likedItems}
        onToggleLike={toggleLike}
        onOpenCollectionModal={handleOpenModal}
        onToastMessage={showToast}
      />

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
    </ProfileWrapper>
  );
}

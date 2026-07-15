"use client";
import ImageCard, { GalleryItem } from "@/components/ui/ImageCard";

interface ImageGridProps {
  items: GalleryItem[];
  sectionPrefix: string;
  likedItems: string[];
  onToggleLike: (uniqueId: string) => void;
  onOpenCollectionModal: (item: GalleryItem) => void;
  onToastMessage: (message: string) => void;
}

export default function ImageGrid({
  items,
  sectionPrefix,
  likedItems,
  onToggleLike,
  onOpenCollectionModal,
  onToastMessage,
}: ImageGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => {
        const uniqueId = `${sectionPrefix}-${item.id}`;
        const isLiked = likedItems.includes(uniqueId);

        return (
          <ImageCard
            key={uniqueId}
            item={item}
            sectionPrefix={sectionPrefix}
            isLiked={isLiked}
            onToggleLike={onToggleLike}
            onOpenCollectionModal={onOpenCollectionModal}
            onActionSuccess={onToastMessage}
          />
        );
      })}
    </div>
  );
}

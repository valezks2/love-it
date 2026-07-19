"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AddToCollectionModal from "@/components/ui/AddToCollectionModal";
import Toast from "@/components/ui/Toast";
import ImageGrid from "@/components/ui/ImageGrid";
import { GalleryItem } from "@/components/ui/ImageCard";

export default function HomePage() {
  const router = useRouter();

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("user_session");
    if (session) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleOpenModal = (item: GalleryItem) => {
    if (!isLoggedIn) {
      router.push("/auth/login");
      return;
    }

    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const toggleLike = (uniqueId: string) => {
    if (!isLoggedIn) {
      router.push("/auth/login");
      return;
    }

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
    <main className="min-h-screen bg-white dark:bg-[#141414] text-gray-900 dark:text-[#e5e5e5] font-sans antialiased relative transition-colors duration-200">
      <section
        className="relative flex h-[50vh] min-h-[350px] items-center justify-center bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40 z-0" />

        <div className="relative z-10 text-center px-4 max-w-2xl flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-sm text-white">
            Find what you love!
          </h1>
          <p className="mt-3 text-base md:text-lg text-gray-200 dark:text-zinc-200 font-medium drop-shadow-sm">
            Explore and collect your daily dose of inspiration.
          </p>

          <Link
            href="/auth/sign-up"
            className="mt-6 inline-block px-6 py-2.5 rounded-full bg-white/90 text-gray-900 dark:bg-zinc-100 dark:text-zinc-950 font-semibold text-sm shadow-md backdrop-blur-sm transition-all duration-200 hover:bg-white hover:scale-105 active:scale-95"
          >
            Join Love It
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between border-b border-gray-100 dark:border-zinc-900 pb-4">
          <h2 className="text-xl font-bold tracking-tight text-gray-800 dark:text-[#e5e5e5] md:text-2xl">
            Top Today Images
          </h2>
        </div>

        <ImageGrid
          items={items}
          sectionPrefix="today"
          likedItems={likedItems}
          onToggleLike={toggleLike}
          onOpenCollectionModal={handleOpenModal}
          onToastMessage={showToast}
        />
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

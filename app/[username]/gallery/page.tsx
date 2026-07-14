"use client";
import { useState, useEffect, useRef } from "react";
import ProfileWrapper from "@/components/ui/ProfileWrapper";
import Link from "next/link";
import AddToCollectionModal from "@/components/ui/AddToCollectionModal";
import Toast from "@/components/ui/Toast";

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
}

export default function DashboardPage() {
  const baseItems: GalleryItem[] = [
    { id: 1, src: "/1.jpg", alt: "Beautiful beach" },
    { id: 2, src: "/2.jpg", alt: "Food aesthetic" },
    { id: 3, src: "/3.avif", alt: "Korea aesthetic" },
    { id: 4, src: "/4.jpg", alt: "Flowers aesthetic" },
  ];

  const items: GalleryItem[] = Array.from({ length: 4 }).flatMap(
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
    <ProfileWrapper activeTab="gallery">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => {
          const uniqueId = `gallery-${item.id}`;
          const isLiked = likedItems.includes(uniqueId);
          const isDropdownOpen = activeDropdown === uniqueId;

          return (
            <div
              key={uniqueId}
              className="group relative aspect-square w-full overflow-hidden bg-gray-50 rounded-xl border border-gray-100"
            >
              <Link href={`/post/${item.id}`} className="block h-full w-full">
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
                      d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z"
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
                        className="flex w-full items-center px-3 py-2 text-left text-xs font-semibold text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => handleDropdownAction("Share")}
                        className="flex w-full items-center px-3 py-2 text-left text-xs font-semibold text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Share
                      </button>
                      <hr className="my-1 border-gray-100" />
                      <button
                        onClick={() => handleDropdownAction("Report")}
                        className="flex w-full items-center px-3 py-2 text-left text-xs font-semibold text-red-600 rounded-lg hover:bg-red-50"
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

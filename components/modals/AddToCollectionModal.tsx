"use client";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";

interface Collection {
  id: number;
  title: string;
  imageCount: number;
}

interface AddToCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

export default function AddToCollectionModal({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
}: AddToCollectionModalProps) {
  const [collections, setCollections] = useState<Collection[]>([
    { id: 1, title: "Painting With Words", imageCount: 15 },
    { id: 2, title: "Nature at its best", imageCount: 32 },
    { id: 3, title: "Vibes & Aesthetics", imageCount: 8 },
    { id: 4, title: "Minimal Living", imageCount: 21 },
    { id: 5, title: "Travel & Places", imageCount: 14 },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newCollectionTitle, setNewCollectionTitle] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const filteredCollections = useMemo(() => {
    return collections.filter((collection) =>
      collection.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [collections, searchQuery]);

  if (!isOpen) return null;

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionTitle.trim()) return;

    const newColl: Collection = {
      id: Date.now(),
      title: newCollectionTitle,
      imageCount: 0,
    };

    setCollections([newColl, ...collections]);
    setNewCollectionTitle("");
    setIsCreating(false);
    setSearchQuery("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white dark:bg-nav p-6 shadow-2xl border border-gray-100 dark:border-border-custom z-10 flex flex-col gap-4 max-h-[85vh] transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-background border border-gray-200 dark:border-border-custom">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-main tracking-tight">
              Save to collection
            </h3>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-400 dark:text-muted hover:bg-gray-100 dark:hover:bg-background hover:text-gray-700 dark:hover:text-main transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {!isCreating && (
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search your collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-9 pr-4 bg-gray-50 dark:bg-background border border-gray-200 dark:border-border-custom rounded-2xl text-sm text-gray-700 dark:text-main placeholder-gray-400 dark:placeholder-muted/50 focus:outline-none focus:bg-white dark:focus:bg-background focus:border-gray-300 dark:focus:border-border-custom transition-all"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="absolute left-3 w-4 h-4 text-gray-400 dark:text-muted/60"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.602z"
              />
            </svg>
          </div>
        )}

        <div className="flex-1 overflow-y-auto pr-1 py-0.5 flex flex-col gap-1 max-h-[260px] scrollbar-thin">
          {filteredCollections.length > 0 ? (
            filteredCollections.map((collection) => (
              <button
                key={collection.id}
                onClick={() => {
                  console.log(`Saved to ${collection.title}`);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl text-left font-semibold text-sm text-gray-700 dark:text-muted hover:bg-gray-50 dark:hover:bg-background border border-transparent hover:border-gray-100 dark:hover:border-border-custom transition-all duration-200 hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
              >
                <span className="truncate mr-4 text-gray-800 dark:text-main">
                  {collection.title}
                </span>
                <span className="text-xs text-gray-400 dark:text-muted/60 font-medium bg-gray-100 dark:bg-background px-2 py-0.5 rounded-full flex-shrink-0 border border-transparent dark:border-border-custom">
                  {collection.imageCount} imgs
                </span>
              </button>
            ))
          ) : (
            <div className="text-center py-6 text-xs font-medium text-gray-400 dark:text-muted/50">
              No collections found.
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 dark:border-border-custom pt-3">
          {!isCreating ? (
            <button
              onClick={() => {
                setIsCreating(true);
                setNewCollectionTitle(searchQuery);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#b72c0f] hover:bg-[#96240c] text-sm font-bold text-white shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Create new collection
            </button>
          ) : (
            <form onSubmit={handleCreateCollection} className="flex gap-2">
              <input
                type="text"
                autoFocus
                placeholder="Collection title..."
                value={newCollectionTitle}
                onChange={(e) => setNewCollectionTitle(e.target.value)}
                className="flex-1 py-2 px-4 bg-gray-50 dark:bg-background border border-gray-200 dark:border-border-custom rounded-full text-sm text-gray-700 dark:text-main focus:outline-none focus:bg-white dark:focus:bg-background focus:border-[#b72c0f] dark:focus:border-[#b72c0f] focus:ring-1 focus:ring-[#b72c0f] transition-all"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#b72c0f] text-white text-sm font-bold rounded-full hover:bg-[#96240c] transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-3 py-2 text-gray-500 dark:text-muted hover:text-gray-700 dark:hover:text-main text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

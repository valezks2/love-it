"use client";
import { useState, useEffect, useRef } from "react";
import ShareModal from "@/components/ui/ShareModal";

interface ImageItem {
  id: number;
  src: string;
  alt: string;
}

interface ImageActionsDropdownProps {
  item: ImageItem;
  onActionSuccess: (message: string) => void;
  align?: "left" | "right";
  onDropdownStateChange?: (isOpen: boolean) => void;
}

export default function ImageActionsDropdown({
  item,
  onActionSuccess,
  align = "right",
  onDropdownStateChange,
}: ImageActionsDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/post/${item.id}`
      : `/post/${item.id}`;

  useEffect(() => {
    onDropdownStateChange?.(isDropdownOpen);
  }, [isDropdownOpen, onDropdownStateChange]);

  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const handleDropdownAction = async (action: string) => {
    setIsDropdownOpen(false);

    if (action === "Download") {
      try {
        const response = await fetch(item.src);
        if (!response.ok) throw new Error("Network response was not ok");

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;

        const filename = item.alt
          ? `${item.alt.replace(/\s+/g, "-").toLowerCase()}.jpg`
          : `image-${item.id}.jpg`;
        a.download = filename;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        onActionSuccess("Image downloaded successfully");
      } catch (error) {
        console.error("Error downloading the image:", error);
        onActionSuccess("Failed to download image");
      }
    } else if (action === "Share") {
      setIsShareOpen(true);
    } else if (action === "Report") {
      setTimeout(() => {
        onActionSuccess("Image reported successfully");
      }, 50);
    }
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsDropdownOpen((prev) => !prev);
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
        <div
          className={`absolute ${
            align === "right" ? "right-0" : "left-0"
          } mt-2 w-36 origin-top-right rounded-xl bg-white p-1.5 shadow-lg border border-gray-100 ring-1 ring-black/5 z-30 animate-fadeIn`}
        >
          <button
            onClick={() => handleDropdownAction("Download")}
            className="flex w-full items-center px-3 py-2 text-left text-xs font-semibold text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Download
          </button>
          <button
            onClick={() => handleDropdownAction("Share")}
            className="flex w-full items-center px-3 py-2 text-left text-xs font-semibold text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Share
          </button>
          <hr className="my-1 border-gray-100" />
          <button
            onClick={() => handleDropdownAction("Report")}
            className="flex w-full items-center px-3 py-2 text-left text-xs font-semibold text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
          >
            Report
          </button>
        </div>
      )}

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        shareUrl={shareUrl}
      />
    </div>
  );
}

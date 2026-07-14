"use client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Toast from "@/components/ui/Toast";

const ITEMS_DB = [
  {
    id: 1,
    src: "/1.jpg",
    alt: "Beautiful beach",
    user: "Valezka",
    time: "3 days ago",
    hearts: 1475,
    tags: ["nature", "snow", "weather", "winter"],
  },
  {
    id: 2,
    src: "/2.jpg",
    alt: "Food aesthetic",
    user: "Alex",
    time: "1 day ago",
    hearts: 520,
    tags: ["food", "aesthetic", "delicious"],
  },
  {
    id: 3,
    src: "/3.avif",
    alt: "Korea aesthetic",
    user: "Ji-woo",
    time: "5 hours ago",
    hearts: 2310,
    tags: ["korea", "travel", "seoul", "aesthetic"],
  },
  {
    id: 4,
    src: "/4.jpg",
    alt: "Flowers aesthetic",
    user: "Elena",
    time: "1 week ago",
    hearts: 890,
    tags: ["flowers", "spring", "vintage"],
  },
];

export default function PostDetailPage() {
  const router = useRouter();
  const { id } = useParams();

  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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
  }, []);

  const item = ITEMS_DB.find((img) => img.id === Number(id));

  if (!item) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-white">
        <p className="text-gray-500 font-medium">Post not found</p>
        <button
          onClick={() => router.back()}
          className="text-[#b72c0f] font-semibold hover:text-[#96240c] transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  const recommendations = ITEMS_DB.filter((img) => img.id !== item.id);

  const handleLikeToggle = () => {
    setIsLiked((prev) => {
      if (!prev) {
        setToastMessage("Saved successfully to profile");
      }
      return !prev;
    });
  };

  const handleDropdownAction = (action: string) => {
    setIsDropdownOpen(false);
    setToastMessage(null);
    setTimeout(() => {
      if (action === "Download") {
        setToastMessage("Image downloaded successfully");
      } else if (action === "Share") {
        setToastMessage("Link shared successfully");
      } else if (action === "Report") {
        setToastMessage("Image reported successfully");
      }
    }, 50);
  };

  return (
    <main className="min-h-screen bg-white font-sans antialiased pb-10 relative">
      <div className="md:max-w-4xl md:mx-auto">
        <div className="relative w-full bg-black/5 md:rounded-lg overflow-hidden">
          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition hover:bg-black/40 cursor-pointer"
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

          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-auto max-h-[75vh] object-contain mx-auto"
          />
        </div>

        <div className="relative border-b border-gray-100 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6 text-gray-500">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="hover:text-gray-800 cursor-pointer flex items-center justify-center h-6 w-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-40 rounded-xl bg-white shadow-lg border border-gray-100 py-1 z-30 animate-fadeIn">
                  <button
                    onClick={() => handleDropdownAction("Download")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleDropdownAction("Share")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium"
                  >
                    Share link
                  </button>
                  <hr className="border-gray-100 my-1" />
                  <button
                    onClick={() => handleDropdownAction("Report")}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                  >
                    Report post
                  </button>
                </div>
              )}
            </div>

            <button className="hover:text-gray-800 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z"
                />
              </svg>
            </button>
            <button className="hover:text-gray-800 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185z"
                />
              </svg>
            </button>
          </div>

          <button
            onClick={handleLikeToggle}
            className={`absolute -top-7 right-4 flex h-14 w-14 items-center justify-center rounded-full shadow-md border border-gray-100/50 transition-all duration-200 transform active:scale-95 hover:scale-105 cursor-pointer ${
              isLiked
                ? "bg-[#b72c0f] text-white hover:bg-[#96240c]"
                : "bg-white text-gray-500 hover:bg-gray-50 hover:text-[#b72c0f]"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-7 h-7"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </button>
        </div>

        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 rounded-full bg-gray-200 overflow-hidden border border-gray-100 cursor-pointer">
              <img
                src="/hero.jpg"
                alt={item.user}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 flex items-center gap-1 text-sm md:text-base cursor-pointer">
                {item.user}
              </h3>
              <p className="text-xs text-gray-400">{item.time}</p>
            </div>
          </div>

          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
              isFollowing
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                : "bg-[#b72c0f] text-white hover:bg-[#96240c]"
            }`}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>

        <div className="px-4 py-2 space-y-4">
          <div className="flex items-start gap-2 text-gray-600">
            <span className="text-2xl font-serif text-gray-300 leading-none">
              “
            </span>
            <p className="text-sm font-medium pt-1">peace</p>
            <span className="text-2xl font-serif text-gray-300 leading-none">
              ”
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-50 border border-gray-100 px-3 py-1 text-xs font-medium text-gray-500 hover:bg-gray-100 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 pt-2 border-t border-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <span>
              loved by{" "}
              <strong className="text-gray-700">
                {isLiked ? item.hearts + 1 : item.hearts} people
              </strong>
            </span>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-100 pt-6 px-4">
          <h4 className="text-sm font-semibold text-gray-500 mb-4 tracking-wide">
            You might like these too
          </h4>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {recommendations.map((rec) => (
              <Link
                key={rec.id}
                href={`/post/${rec.id}`}
                className="group aspect-square overflow-hidden bg-gray-50 rounded-xl border border-gray-100"
              >
                <img
                  src={rec.src}
                  alt={rec.alt}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-102"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </main>
  );
}

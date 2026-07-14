"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

interface MockUser {
  email: string;
  name: string;
  avatar?: string;
}

interface Notification {
  id: string;
  text: string;
  time: string;
  isRead: boolean;
}

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [user, setUser] = useState<MockUser | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      text: "Someone liked your photo",
      time: "5m ago",
      isRead: false,
    },
    {
      id: "2",
      text: "New comment on your rustic design",
      time: "1h ago",
      isRead: false,
    },
    {
      id: "3",
      text: "Your upload was processed successfully",
      time: "1d ago",
      isRead: true,
    },
  ]);

  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setSearchQuery(q);
      setIsSearchOpen(true);
    } else {
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  }, [searchParams]);

  useEffect(() => {
    const session = localStorage.getItem("user_session");
    if (session) {
      setUser(JSON.parse(session));
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (menuRef.current && !menuRef.current.contains(target)) {
        setIsOpen(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(target) &&
        !searchQuery
      ) {
        setIsSearchOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(target)
      ) {
        setIsNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchQuery]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      } else {
        router.push("/search");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user_session");
    setUser(null);
    setIsOpen(false);
    window.location.href = "/";
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const hasUnread = notifications.some((n) => !n.isRead);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-white px-4 py-3 shadow-sm md:px-8">
      <div className="flex items-center gap-6 flex-shrink-0">
        <Link href="/">
          <img
            src="/logo.png"
            alt="Love It Logo"
            className="h-11 md:h-12 w-auto object-contain cursor-pointer transition-transform duration-200 hover:scale-105"
          />
        </Link>
      </div>

      <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end">
        {user ? (
          <div className="flex items-center gap-2 md:gap-3 w-full justify-end">
            <div
              ref={searchRef}
              className={`transition-all duration-300 ${isSearchOpen ? "flex-1 max-w-xs md:max-w-md mx-2" : "w-auto"}`}
            >
              {isSearchOpen ? (
                <div className="relative w-full">
                  <input
                    type="search"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    placeholder="Search images, styles..."
                    className="w-full py-1.5 pl-4 pr-14 bg-gray-50 border border-[#b72c0f] rounded-full text-sm text-gray-700 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#b72c0f] [&::-webkit-search-cancel-button]:appearance-none"
                  />

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-8 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors focus:outline-none"
                      aria-label="Clear search"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}

                  <div className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z"
                      />
                    </svg>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                  aria-label="Open search"
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
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z"
                    />
                  </svg>
                </button>
              )}
            </div>

            <Link
              href="/upload"
              aria-label="Upload content"
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer flex-shrink-0"
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
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </Link>

            <div ref={notificationsRef} className="relative flex-shrink-0">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer focus:outline-none"
                aria-label="Notifications"
                aria-expanded={isNotificationsOpen}
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
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
                {hasUnread && (
                  <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500"></span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-lg z-50 overflow-hidden">
                  <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2.5">
                    <h3 className="font-semibold text-sm text-gray-800">
                      Notifications
                    </h3>
                    {hasUnread && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs font-medium text-[#b72c0f] hover:underline cursor-pointer"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-6 text-center text-sm text-gray-500">
                        You have no notifications
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-50">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={`flex flex-col gap-1 p-3 text-left transition-colors hover:bg-gray-50 cursor-pointer ${
                              !notif.isRead ? "bg-red-50/30" : ""
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm text-gray-700">
                                {notif.text}
                              </p>
                              {!notif.isRead && (
                                <span className="h-1.5 w-1.5 mt-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                              )}
                            </div>
                            <span className="text-[10px] text-gray-400">
                              {notif.time}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-100 p-2 text-center">
                    <Link
                      href="/notifications"
                      onClick={() => setIsNotificationsOpen(false)}
                      className="block text-xs font-medium text-gray-500 hover:text-gray-800 py-1"
                    >
                      See all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div
              ref={menuRef}
              className="relative border-l border-gray-200 pl-2 md:pl-4 flex-shrink-0"
            >
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 p-1 rounded-full hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
              >
                <img
                  src={user.avatar || "/hero.jpg"}
                  alt={`Profile of ${user.name}`}
                  className="w-8 h-8 rounded-full object-cover border-2 border-gray-100"
                />
                <span
                  className={`text-gray-400 text-xs transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </button>

              {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 rounded-md border border-gray-200 bg-white shadow-lg z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800 capitalize">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile
                    </Link>

                    <hr className="border-gray-100 my-1" />

                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                      onClick={() => setIsOpen(false)}
                    >
                      Settings
                    </Link>

                    <hr className="border-gray-100 my-1" />

                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="w-full rounded-full border border-gray-300 bg-white py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 cursor-pointer"
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <Link href="/auth/login">
              <button className="px-4 py-2 text-sm font-semibold text-gray-600 rounded-full transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
                Log In
              </button>
            </Link>

            <Link href="/auth/sign-up">
              <button className="px-5 py-2 text-sm font-semibold text-white bg-[#b72c0f] border border-[#b72c0f] rounded-full transition-all duration-200 shadow-sm hover:bg-[#96240c] hover:border-[#96240c] hover:shadow-md active:scale-95 cursor-pointer">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

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
  type: "like" | "comment" | "save" | "system";
  avatar?: string;
  imagePreview?: string;
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
      text: "Jane Doe loved your photo",
      time: "5m ago",
      isRead: false,
      type: "like",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      imagePreview:
        "https://images.unsplash.com/photo-1542241647-9cbb2225278b?w=150",
    },
    {
      id: "2",
      text: "Alex River commented on your rustic design",
      time: "1h ago",
      isRead: false,
      type: "comment",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      imagePreview:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=150",
    },
    {
      id: "3",
      text: "Jane Doe saved your picture in their collection",
      time: "1d ago",
      isRead: true,
      type: "save",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      imagePreview:
        "https://images.unsplash.com/photo-1542241647-9cbb2225278b?w=150",
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
    isOpen && setIsOpen(false);
    window.location.href = "/";
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const toggleReadStatus = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const hasUnread = notifications.some((n) => !n.isRead);

  const renderNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "like":
        return (
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white shadow-sm ring-2 ring-white dark:ring-nav">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3 h-3"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </span>
        );
      case "comment":
        return (
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white shadow-sm ring-2 ring-white dark:ring-nav">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3 h-3"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75a9.75 9.75 0 0 0 1.946 5.866L3.1 20.91a.75.75 0 0 0 .928.928l3.044-1.09a9.75 9.75 0 1 0 4.928-18.5Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        );
      case "save":
        return (
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm ring-2 ring-white dark:ring-nav">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3 h-3"
            >
              <path
                fillRule="evenodd"
                d="M6.32 2.577a3 3 0 0 1 3.16.507l3.02 2.418A1 1 0 0 0 13.14 6H19a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-13a3 3 0 0 1 4.32-2.723Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        );
      default:
        return (
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-500 text-white shadow-sm ring-2 ring-white dark:ring-nav">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3 h-3"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.13c1.434-1.25 3.8-1.25 5.233 0a.75.75 0 01-.99 1.13zM13.25 13.5a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        );
    }
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-white dark:bg-nav px-4 py-3 shadow-sm md:px-8 border-b border-transparent dark:border-border-custom transition-colors duration-300">
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
                    className="w-full py-1.5 pl-4 pr-16 bg-gray-50 dark:bg-background border border-[#b72c0f] rounded-full text-sm text-gray-700 dark:text-main focus:outline-none focus:bg-white dark:focus:bg-background focus:ring-1 focus:ring-[#b72c0f] [&::-webkit-search-cancel-button]:appearance-none"
                  />

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-10 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-main cursor-pointer transition-colors focus:outline-none"
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

                  <div className="absolute right-3 top-2.5 flex items-center pl-1.5 border-l border-gray-300 dark:border-border-custom text-gray-400 pointer-events-none">
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
                  className="p-2 text-gray-600 dark:text-muted hover:bg-gray-100 dark:hover:bg-background rounded-full transition-colors cursor-pointer"
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
              className="p-2 text-gray-600 dark:text-muted hover:bg-gray-100 dark:hover:bg-background rounded-full transition-colors cursor-pointer flex-shrink-0"
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
                className="relative p-2 text-gray-600 dark:text-muted hover:bg-gray-100 dark:hover:bg-background rounded-full transition-colors cursor-pointer focus:outline-none"
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
                <div className="absolute right-[-60px] md:right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-85 rounded-xl border border-gray-100 dark:border-border-custom bg-white dark:bg-nav shadow-xl z-50 overflow-hidden transition-all duration-200">
                  <div className="flex items-center justify-between border-b border-gray-100 dark:border-border-custom px-4 py-3 bg-gray-50/50 dark:bg-background/20">
                    <h3 className="font-bold text-sm text-gray-900 dark:text-main">
                      Notifications
                    </h3>
                    {hasUnread && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs font-semibold text-[#b72c0f] hover:text-[#96240c] transition-colors cursor-pointer"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-8 text-center text-sm text-gray-400 dark:text-muted flex flex-col items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-8 h-8 text-gray-300 dark:text-border-custom"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                          />
                        </svg>
                        You have no notifications
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-100 dark:divide-border-custom">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => toggleReadStatus(notif.id)}
                            className={`flex items-center gap-3 p-3.5 text-left transition-colors hover:bg-gray-50/80 dark:hover:bg-background/40 cursor-pointer relative ${
                              !notif.isRead
                                ? "bg-red-50/15 dark:bg-red-950/10"
                                : ""
                            }`}
                          >
                            <div className="relative flex-shrink-0">
                              <img
                                src={notif.avatar || "/logo.png"}
                                alt="User indicator"
                                className={`w-10 h-10 rounded-full object-cover bg-gray-100 dark:bg-background ${
                                  notif.type === "system"
                                    ? "p-1.5 object-contain border border-gray-200 dark:border-border-custom"
                                    : ""
                                }`}
                              />
                              {renderNotificationIcon(notif.type)}
                            </div>

                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-sm text-gray-700 dark:text-muted leading-tight ${!notif.isRead ? "font-medium text-gray-900 dark:text-main" : ""}`}
                              >
                                {notif.text}
                              </p>
                              <span className="text-[11px] font-medium text-gray-400 dark:text-muted/60 block mt-1">
                                {notif.time}
                              </span>
                            </div>

                            {notif.imagePreview ? (
                              <div className="flex-shrink-0 ml-1 relative">
                                <img
                                  src={notif.imagePreview}
                                  alt="Content preview"
                                  className="w-10 h-10 rounded-lg object-cover border border-gray-100 dark:border-border-custom"
                                />
                                {!notif.isRead && (
                                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
                                )}
                              </div>
                            ) : (
                              !notif.isRead && (
                                <span className="h-2 w-2 rounded-full bg-red-500 flex-shrink-0 ml-auto"></span>
                              )
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-100 dark:border-border-custom bg-gray-50/30 dark:bg-background/20 p-2 text-center">
                    <Link
                      href="/notifications"
                      onClick={() => setIsNotificationsOpen(false)}
                      className="block text-xs font-bold text-gray-500 dark:text-muted hover:text-gray-800 dark:hover:text-main transition-colors py-1.5"
                    >
                      See all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div
              ref={menuRef}
              className="relative border-l border-gray-200 dark:border-border-custom pl-2 md:pl-4 flex-shrink-0"
            >
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 p-1 rounded-full hover:bg-gray-50 dark:hover:bg-background transition-colors cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
              >
                <img
                  src={user.avatar || "/hero.jpg"}
                  alt={`Profile of ${user.name}`}
                  className="w-8 h-8 rounded-full object-cover border-2 border-gray-100 dark:border-border-custom"
                />
                <span
                  className={`text-gray-400 dark:text-muted text-xs transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </button>

              {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 rounded-md border border-gray-200 dark:border-border-custom bg-white dark:bg-nav shadow-lg z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-border-custom">
                      <p className="text-sm font-semibold text-gray-800 dark:text-main capitalize">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-muted truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-600 dark:text-muted hover:bg-gray-50 dark:hover:bg-background"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile
                    </Link>

                    <hr className="border-gray-100 dark:border-border-custom my-1" />

                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-600 dark:text-muted hover:bg-gray-50 dark:hover:bg-background"
                      onClick={() => setIsOpen(false)}
                    >
                      Settings
                    </Link>

                    <hr className="border-gray-100 dark:border-border-custom my-1" />

                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="w-full rounded-full border border-gray-300 dark:border-border-custom bg-white dark:bg-background py-1.5 text-sm font-medium text-gray-600 dark:text-muted transition-colors hover:bg-gray-50 dark:hover:bg-nav cursor-pointer"
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
              <button className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-muted rounded-full transition-all duration-200 hover:bg-gray-100 dark:hover:bg-background hover:text-gray-900 dark:hover:text-main hover:scale-105 active:scale-95 cursor-pointer">
                Log In
              </button>
            </Link>

            <Link href="/auth/sign-up">
              <button className="px-5 py-2 text-sm font-semibold text-white bg-[#b72c0f] border border-[#b72c0f] rounded-full transition-all duration-200 shadow-sm hover:bg-[#96240c] hover:border-[#96240c] hover:shadow-md hover:scale-105 active:scale-95 cursor-pointer">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

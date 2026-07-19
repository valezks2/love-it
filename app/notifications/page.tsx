"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Notification {
  id: string;
  text: string;
  time: string;
  isRead: boolean;
  type: "like" | "comment" | "save" | "system";
  avatar?: string;
  imagePreview?: string;
}

export default function NotificationsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "unread">("all");

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

  useEffect(() => {
    const session = localStorage.getItem("user_session");
    if (!session) {
    }
  }, [router]);

  const toggleReadStatus = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.isRead;
    return true;
  });

  const hasUnread = notifications.some((n) => !n.isRead);

  const renderBadgeIcon = (type: Notification["type"]) => {
    const baseBadgeClass =
      "absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-white shadow-sm ring-2 ring-white dark:ring-[#1f1f1f]";

    switch (type) {
      case "like":
        return (
          <span className={`${baseBadgeClass} bg-red-500`}>
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
          <span className={`${baseBadgeClass} bg-blue-500`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3 h-3"
            >
              <path
                fillRule="evenodd"
                d="M5.337 21.718a.75.75 0 0 1-.621-.832l1.241-7.443A7.5 7.5 0 0 1 12 4.5c4.142 0 7.5 3.134 7.5 7a7 7 0 0 1-7.5 7 7.46 7.46 0 0 1-3.616-.93l-2.915 2.04a.75.75 0 0 1-.632.108Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        );
      case "save":
        return (
          <span className={`${baseBadgeClass} bg-emerald-500`}>
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
          <span className={`${baseBadgeClass} bg-gray-500 dark:bg-zinc-600`}>
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
    <main className="min-h-screen bg-white dark:bg-[#141414] text-gray-900 dark:text-[#e5e5e5] font-sans antialiased relative pb-16 transition-colors duration-200">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-[#e5e5e5] md:text-3xl">
              Notifications
            </h1>
            <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
              Stay updated with your community interactions
            </p>
          </div>

          {hasUnread && (
            <button
              onClick={markAllAsRead}
              className="self-start sm:self-center text-sm font-bold text-[#b72c0f] hover:text-[#96240c] transition-colors cursor-pointer"
            >
              Mark all as read
            </button>
          )}
        </div>

        <div className="mb-6 border-b border-gray-100 dark:border-zinc-800">
          <div className="flex gap-6">
            <button
              onClick={() => setFilter("all")}
              className={`pb-3 text-sm font-bold transition-all border-b-2 cursor-pointer ${
                filter === "all"
                  ? "border-[#b72c0f] text-[#b72c0f]"
                  : "border-transparent text-gray-400 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-300"
              }`}
            >
              All Activity
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`pb-3 text-sm font-bold transition-all border-b-2 cursor-pointer relative ${
                filter === "unread"
                  ? "border-[#b72c0f] text-[#b72c0f]"
                  : "border-transparent text-gray-400 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-300"
              }`}
            >
              Unread
              {hasUnread && (
                <span className="absolute top-0 -right-2.5 h-1.5 w-1.5 rounded-full bg-[#b72c0f]"></span>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1f1f1f] rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden">
          {filteredNotifications.length === 0 ? (
            <div className="py-20 text-center text-sm text-gray-400 dark:text-zinc-500 flex flex-col items-center gap-3">
              <div className="p-4 bg-gray-50 dark:bg-[#262626] rounded-full text-gray-300 dark:text-zinc-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </div>
              <span className="text-base font-semibold text-gray-500 dark:text-zinc-400">
                No notifications here
              </span>
              <p className="text-xs text-gray-400 dark:text-zinc-500 max-w-xs">
                {filter === "unread"
                  ? "You've caught up with everything!"
                  : "When users interact with your collections, they'll show up here."}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-zinc-800">
              {filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => toggleReadStatus(notif.id)}
                  className={`group flex items-center gap-4 p-4 text-left transition-all hover:bg-gray-50/70 dark:hover:bg-[#262626]/50 cursor-pointer relative ${
                    !notif.isRead ? "bg-red-50/10 dark:bg-red-500/5" : ""
                  }`}
                >
                  {!notif.isRead && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#b72c0f]" />
                  )}

                  <div className="relative flex-shrink-0">
                    <img
                      src={notif.avatar || "/logo.png"}
                      alt="User dynamic action profile indicator"
                      className={`w-11 h-11 rounded-full object-cover bg-gray-50 dark:bg-zinc-800 ${
                        notif.type === "system"
                          ? "p-1.5 object-contain border border-gray-200 dark:border-zinc-700"
                          : ""
                      }`}
                    />
                    {renderBadgeIcon(notif.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm text-gray-700 dark:text-zinc-300 leading-normal ${
                        !notif.isRead
                          ? "font-medium text-gray-900 dark:text-[#e5e5e5]"
                          : ""
                      }`}
                    >
                      {notif.text}
                    </p>
                    <span className="text-xs font-medium text-gray-400 dark:text-zinc-500 block mt-1">
                      {notif.time}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                    {notif.imagePreview && (
                      <img
                        src={notif.imagePreview}
                        alt="Content item attachment preview"
                        className="w-12 h-12 rounded-xl object-cover border border-gray-100 dark:border-zinc-800 shadow-2xs"
                      />
                    )}

                    <button
                      onClick={(e) => deleteNotification(notif.id, e)}
                      className="p-1.5 text-gray-300 dark:text-zinc-600 hover:text-gray-500 dark:hover:text-zinc-400 rounded-lg hover:bg-gray-100 dark:hover:bg-[#262626] opacity-0 group-hover:opacity-100 transition-all duration-150"
                      title="Delete notification"
                    >
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

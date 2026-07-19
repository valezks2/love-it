"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
}

export default function ShareModal({
  isOpen,
  onClose,
  shareUrl,
}: ShareModalProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!isOpen || !mounted) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(
      () => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      },
      (err) => {
        console.error("Failed to copy link: ", err);
      },
    );
  };

  const socialPlatforms = [
    {
      name: "WhatsApp",
      icon: (
        <svg
          className="w-5 h-5 shrink-0 text-[#25D366]"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      icon: (
        <svg
          className="w-5 h-5 text-[#1877F2] shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "X",
      icon: (
        <svg
          className="w-4 h-4 text-black shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "Reddit",
      icon: (
        <svg
          className="w-5 h-5 text-[#FF4500] shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.16 8.64a2.21 2.21 0 0 0-2.21-2.2 2.17 2.17 0 0 0-1.26.4 10.42 10.42 0 0 0-4.54-1.37l.96-3.03 3.13.67a1.44 1.44 0 1 0 1.44-1.43 1.42 1.42 0 0 0-1.34.93l-3.48-.74a.48.48 0 0 0-.55.33l-1.07 3.37a10.33 10.33 0 0 0-4.6 1.36 2.16 2.16 0 0 0-1.25-.4 2.21 2.21 0 0 0-2.21 2.21c0 .9.53 1.68 1.3 2.04a6.76 6.76 0 0 0-.06.84c0 3.39 4.1 6.14 9.13 6.14s9.14-2.75 9.14-6.14c0-.29-.02-.57-.06-.85a2.2 2.2 0 0 0 1.25-2.03zm-11.28.89a1.18 1.18 0 1 1 1.18 1.18 1.18 1.18 0 0 1-1.18-1.18zm6.54 3.96a4.57 4.57 0 0 1-6.84 0 .36.36 0 0 1 .5-.51 3.84 3.84 0 0 0 5.84 0 .36.36 0 0 1 .5.51zm-.26-2.78a1.18 1.18 0 1 1 1.18-1.18 1.18 1.18 0 0 1-1.18 1.18z" />
        </svg>
      ),
    },
    {
      name: "Email",
      icon: (
        <svg
          className="w-5 h-5 text-gray-600 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
      ),
    },
  ];

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-6 shadow-2xl border border-gray-100 z-10 flex flex-col gap-5"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900 tracking-tight">
            Share
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
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

        <div className="flex items-center justify-between gap-3 pl-4 pr-1.5 py-1.5 border border-gray-200 rounded-full bg-gray-50/50 focus-within:bg-white focus-within:border-[#b72c0f] focus-within:ring-1 focus-within:ring-[#b72c0f] transition-all">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="w-full bg-transparent text-sm text-gray-600 focus:outline-none truncate"
          />
          <button
            onClick={handleCopyLink}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0 cursor-pointer ${
              copySuccess
                ? "bg-[#fdf2f0] text-[#b72c0f]"
                : "bg-[#b72c0f] text-white hover:bg-[#96240c] shadow-sm"
            }`}
          >
            {copySuccess ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="grid grid-cols-5 gap-2 pt-1">
          {socialPlatforms.map((platform) => (
            <button
              key={platform.name}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-50 border border-gray-100 shadow-sm transition-all duration-200 group-hover:bg-gray-100 group-hover:scale-105 active:scale-95">
                {platform.icon}
              </div>
              <span className="text-[11px] font-medium text-gray-500 group-hover:text-gray-900 transition-colors truncate max-w-full">
                {platform.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}

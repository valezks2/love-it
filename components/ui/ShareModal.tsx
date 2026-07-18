"use client";

import { useState } from "react";

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

  if (!isOpen) return null;

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
          className="w-6 h-6 text-[#25D366]"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.503-5.729-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.977 14.053.953 11.5.953c-5.44 0-9.866 4.372-9.87 9.802 0 1.698.452 3.355 1.308 4.811L1.95 21.903l6.591-1.722z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      icon: (
        <svg
          className="w-6 h-6 text-[#1877F2]"
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
          className="w-[22px] h-[22px] text-black"
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
          className="w-6 h-6 text-[#FF4500]"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-.533 1.026c.324.438.52.954.55 1.514 1.23.16 2.193 1.204 2.193 2.483 0 1.4-1.138 2.534-2.542 2.534-.14 0-.277-.012-.412-.034-.51 1.157-1.636 1.957-2.956 1.957-.497 0-.965-.115-1.393-.316l-2.222 1.55a.501.501 0 0 1-.68-.113l-.004-.006a.501.501 0 0 1 .116-.68l2.13-1.485c-.328-.275-.6-.6-.803-.967-.318.067-.65.103-.99.103-1.4 0-2.542-1.135-2.542-2.534 0-1.215.856-2.226 1.992-2.46-.02-.124-.03-.25-.03-.379 0-1.748 1.424-3.17 3.174-3.17.653 0 1.26.2 1.77.541a1.247 1.247 0 0 1 1.15-.753zm-5.01 5.323c-.582 0-1.054.472-1.054 1.054a1.053 1.053 0 0 0 1.054 1.053c.581 0 1.053-.471 1.053-1.053a1.055 1.055 0 0 0-1.053-1.054zm3.824 0c-.582 0-1.054.472-1.054 1.054a1.054 1.054 0 0 0 1.054 1.053c.582 0 1.054-.471 1.054-1.053a1.055 1.055 0 0 0-1.054-1.054z" />
        </svg>
      ),
    },
    {
      name: "Email",
      icon: (
        <svg
          className="w-[22px] h-[22px] text-gray-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-6 shadow-2xl border border-gray-100 z-10 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900 tracking-tight">
            Share
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
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
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all active:scale-95 flex-shrink-0 cursor-pointer ${
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
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-50 border border-gray-100 shadow-sm transition-all group-hover:bg-gray-100 group-hover:scale-105 active:scale-95">
                {platform.icon}
              </div>
              <span className="text-[11px] font-medium text-gray-500 group-hover:text-gray-900 transition-colors truncate max-w-full">
                {platform.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

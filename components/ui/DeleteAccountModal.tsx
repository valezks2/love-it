"use client";

import { useState, useEffect, FormEvent } from "react";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: (password: string) => Promise<void> | void;
}

export default function DeleteAccountModal({
  isOpen,
  onClose,
  onConfirmDelete,
}: DeleteAccountModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  useEffect(() => {
    if (isOpen) {
      password;
      setPassword("");
      setError(null);
      setIsDeleting(false);
      setShowPassword(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!password.trim()) {
      setError("Please enter your password to proceed.");
      return;
    }

    setIsDeleting(true);
    try {
      await onConfirmDelete(password);
    } catch (err: any) {
      setError(err?.message || "Incorrect password. Please try again.");
      setIsDeleting(false);
    }
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
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/40 text-[#b72c0f]">
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
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-main tracking-tight">
              Delete Account
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

        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-muted leading-relaxed">
            Are you sure you want to delete your account? This action is{" "}
            <strong className="text-gray-900 dark:text-main">permanent</strong>{" "}
            and all your data, collections, and preferences will be lost
            forever.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="confirm-password"
              className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-muted/60 pl-1"
            >
              Enter your password
            </label>
            <div className="relative flex items-center">
              <input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isDeleting}
                className="w-full py-2.5 pl-4 pr-10 bg-gray-50 dark:bg-background border border-gray-200 dark:border-border-custom rounded-2xl text-sm text-gray-700 dark:text-main placeholder-gray-400 dark:placeholder-muted/50 focus:outline-none focus:bg-white dark:focus:bg-background focus:border-[#b72c0f] dark:focus:border-[#b72c0f] focus:ring-1 focus:ring-[#b72c0f] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isDeleting}
                className="absolute right-3 p-1 text-gray-400 dark:text-muted hover:text-gray-600 dark:hover:text-main transition-colors cursor-pointer"
              >
                {showPassword ? (
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
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
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
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {error && (
              <p className="text-xs font-semibold text-[#b72c0f] pl-1 pt-0.5 animate-in fade-in duration-200">
                {error}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100 dark:border-border-custom">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-bold text-gray-500 dark:text-muted hover:text-gray-700 dark:hover:text-main hover:bg-gray-50 dark:hover:bg-background rounded-full transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isDeleting}
              className={`px-6 py-2.5 rounded-full text-sm font-bold text-white bg-[#b72c0f] shadow-sm hover:bg-[#96240c] transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${
                isDeleting ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {isDeleting ? (
                <>
                  <svg
                    className="animate-spin h-3.5 w-3.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Deleting account...
                </>
              ) : (
                "Delete permanently"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

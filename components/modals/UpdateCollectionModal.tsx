"use client";

import {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  DragEvent,
  FormEvent,
} from "react";
import Image from "next/image";

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTitle: string;
  initialDescription: string;
  initialBannerImage: string;
  onSave: (updatedData: {
    title: string;
    description: string;
    bannerImage: string;
  }) => void;
}

export default function UpdateModal({
  isOpen,
  onClose,
  initialTitle,
  initialDescription,
  initialBannerImage,
  onSave,
}: UpdateModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [bannerPreview, setBannerPreview] =
    useState<string>(initialBannerImage);
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; banner?: string }>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setTitle(initialTitle);
      setDescription(initialDescription);
      setBannerPreview(initialBannerImage);
      setErrors({});
    }
  }, [isOpen, initialTitle, initialDescription, initialBannerImage]);

  if (!isOpen) return null;

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        banner: "Please upload a valid image file.",
      }));
      return;
    }
    setErrors((prev) => ({ ...prev, banner: undefined }));
    const reader = new FileReader();
    reader.onloadend = () => {
      setBannerPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const currentErrors: typeof errors = {};
    if (!title.trim()) {
      currentErrors.title = "Collection title is required.";
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    setIsSaving(true);

    setTimeout(() => {
      onSave({
        title: title.trim(),
        description: description.trim(),
        bannerImage: bannerPreview,
      });
      setIsSaving(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg h-auto rounded-3xl bg-white dark:bg-[#141414] p-5 shadow-2xl border border-gray-100 dark:border-[#262626] z-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-bold text-gray-900 dark:text-[#ededed] tracking-tight">
            Edit Collection details
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-400 dark:text-zinc-500 hover:bg-gray-100 dark:hover:bg-[#262626] hover:text-gray-700 dark:hover:text-[#ededed] transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
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
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500">
              Header Banner Image
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative aspect-[3/1] w-full rounded-xl overflow-hidden border flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
                isDragging
                  ? "border-[#b72c0f] bg-[#b72c0f]/5 text-[#b72c0f]"
                  : "border-gray-100 dark:border-[#262626] bg-gray-50 dark:bg-[#1f1f1f] text-gray-400 dark:text-zinc-500 hover:border-gray-200 dark:hover:border-zinc-700"
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              {bannerPreview ? (
                <div className="relative w-full h-full group">
                  <Image
                    src={bannerPreview}
                    alt="Collection Header Preview"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <span className="px-3 py-1.5 bg-white dark:bg-[#141414] text-gray-700 dark:text-[#e5e5e5] text-xs font-semibold rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-[#1f1f1f] transition cursor-pointer border dark:border-[#262626]">
                      Change Banner
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center pointer-events-none text-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-400 dark:text-zinc-500 mb-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  <p className="text-[11px] font-semibold text-gray-600 dark:text-zinc-400">
                    Drag and drop or click to upload
                  </p>
                </div>
              )}
            </div>
            {errors.banner && (
              <p className="text-xs font-semibold text-[#b72c0f] pl-1">
                {errors.banner}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="modal-title"
              className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500"
            >
              Collection Title
            </label>
            <input
              id="modal-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g. Painting With Words"
              className="w-full py-2 px-4 bg-gray-50 dark:bg-[#1f1f1f] border border-gray-200 dark:border-[#262626] rounded-full text-sm text-gray-700 dark:text-[#e5e5e5] placeholder-gray-400 dark:placeholder-zinc-600 focus:outline-none focus:bg-white dark:focus:bg-[#141414] focus:border-[#b72c0f] focus:ring-1 focus:ring-[#b72c0f] transition-all"
            />
            {errors.title && (
              <p className="text-xs font-semibold text-[#b72c0f] pl-1">
                {errors.title}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="modal-description"
              className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500"
            >
              Description
            </label>
            <div className="relative flex items-start bg-gray-50 dark:bg-[#1f1f1f] rounded-xl border border-gray-200 dark:border-[#262626] p-2.5 focus-within:bg-white dark:focus-within:bg-[#141414] focus-within:border-[#b72c0f] focus-within:ring-1 focus-within:ring-[#b72c0f] transition-all">
              <span className="text-xl font-serif text-gray-300 dark:text-zinc-700 leading-none mr-1 select-none">
                “
              </span>
              <textarea
                id="modal-description"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Inspiration and poetic snippets for the soul..."
                className="w-full bg-transparent text-sm text-gray-700 dark:text-[#e5e5e5] placeholder-gray-400 dark:placeholder-zinc-600 font-medium resize-none focus:outline-none pt-0"
              />
              <span className="text-xl font-serif text-gray-300 dark:text-zinc-700 leading-none ml-1 align-bottom self-end select-none">
                ”
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100 dark:border-[#262626]">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 text-sm font-bold text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-[#ededed] hover:bg-gray-50 dark:hover:bg-[#1f1f1f] rounded-full transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className={`px-6 py-2 rounded-full text-sm font-bold text-white bg-[#b72c0f] shadow-sm hover:bg-[#96240c] transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${
                isSaving ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {isSaving ? (
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
                  Saving...
                </>
              ) : (
                "Save changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

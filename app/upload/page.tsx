"use client";
import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/ui/Toast";

interface Collection {
  id: string;
  name: string;
}

export default function UploadPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [collections, setCollections] = useState<Collection[]>([
    { id: "1", name: "Winter Aesthetics" },
    { id: "2", name: "Daily Mood" },
    { id: "3", name: "Inspiration" },
  ]);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");

  const [errors, setErrors] = useState<{
    image?: string;
    title?: string;
    collection?: string;
  }>({});

  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        image: "Please select a valid image file (PNG, JPG, AVIF).",
      }));
      return;
    }
    setErrors((prev) => ({ ...prev, image: undefined }));
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const cleanTag = tagInput.trim().toLowerCase().replace(/,/g, "");
      if (cleanTag && !tags.includes(cleanTag)) {
        setTags([...tags, cleanTag]);
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleCreateCollection = () => {
    const nameClean = newCollectionName.trim();
    if (!nameClean) return;

    const newColl: Collection = {
      id: Date.now().toString(),
      name: nameClean,
    };

    setCollections([...collections, newColl]);
    setSelectedCollection(newColl.id);
    setNewCollectionName("");
    setIsCreatingCollection(false);
    setErrors((prev) => ({ ...prev, collection: undefined }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const currentErrors: typeof errors = {};
    if (!imagePreview) currentErrors.image = "An image file is required.";
    if (!title.trim())
      currentErrors.title = "Please provide a title for your post.";

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setToastMessage("Post published successfully!");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-[#141414] font-sans antialiased pt-12 md:pt-16 pb-16 relative transition-colors duration-200">
      <div className="md:max-w-4xl md:mx-auto px-4 md:px-0">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
        >
          <div className="md:col-span-7 w-full relative">
            <button
              type="button"
              onClick={() => router.back()}
              className="absolute top-4 left-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition hover:bg-black/40 cursor-pointer border border-transparent"
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

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !imagePreview && fileInputRef.current?.click()}
              className={`relative aspect-square w-full rounded-2xl overflow-hidden border flex flex-col items-center justify-center p-4 text-center transition-all duration-200 ${
                imagePreview
                  ? "border-transparent bg-black/5 dark:bg-[#1f1f1f]"
                  : isDragging
                    ? "border-[#b72c0f] bg-[#b72c0f]/5 text-[#b72c0f]"
                    : "border-gray-100 dark:border-[#262626] bg-gray-50 dark:bg-[#1f1f1f] text-gray-400 dark:text-zinc-500 hover:border-gray-200 dark:hover:border-zinc-700 cursor-pointer"
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              {imagePreview ? (
                <div className="relative w-full h-full rounded-xl overflow-hidden group">
                  <img
                    src={imagePreview}
                    alt="Upload preview"
                    className="w-full h-full object-contain mx-auto"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="px-4 py-2 bg-white dark:bg-[#141414] text-gray-700 dark:text-[#e5e5e5] text-xs font-semibold rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-[#262626] transition cursor-pointer"
                    >
                      Change
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImagePreview(null);
                      }}
                      className="px-4 py-2 bg-[#b72c0f] text-white text-xs font-semibold rounded-full shadow-sm hover:bg-[#96240c] transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center pointer-events-none px-4">
                  <div className="p-4 bg-white dark:bg-[#141414] shadow-sm border border-gray-100 dark:border-[#262626] rounded-full mb-3 text-gray-400 dark:text-zinc-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-[#e5e5e5]">
                    Drag and drop your inspiration canvas
                  </p>
                  <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1">
                    or select a file from device storage
                  </p>
                </div>
              )}
            </div>
            {errors.image && (
              <p className="text-xs font-semibold text-[#b72c0f] mt-2 pl-1">
                {errors.image}
              </p>
            )}
          </div>

          <div className="md:col-span-5 space-y-5">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500">
                  Choose a collection
                </label>
                <button
                  type="button"
                  onClick={() => setIsCreatingCollection(!isCreatingCollection)}
                  className="text-xs font-bold text-[#b72c0f] hover:text-[#96240c] transition cursor-pointer bg-transparent focus:outline-none"
                >
                  {isCreatingCollection ? "Cancel" : "Create new collection"}
                </button>
              </div>

              {isCreatingCollection ? (
                <div className="flex gap-2 animate-fadeIn">
                  <input
                    type="text"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    placeholder="Collection name..."
                    className="flex-1 py-2.5 px-4 bg-gray-50 dark:bg-[#1f1f1f] border border-gray-100 dark:border-[#262626] rounded-full text-sm text-gray-700 dark:text-[#e5e5e5] placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:bg-white dark:focus:bg-[#141414] focus:border-[#b72c0f] focus:ring-1 focus:ring-[#b72c0f] transition-all"
                  />
                  <button
                    type="button"
                    onClick={handleCreateCollection}
                    className="px-5 py-2.5 text-sm font-bold bg-[#b72c0f] text-white rounded-full hover:bg-[#96240c] transition cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <select
                    id="collection"
                    value={selectedCollection}
                    onChange={(e) => setSelectedCollection(e.target.value)}
                    className="w-full py-2.5 px-4 bg-gray-50 dark:bg-[#1f1f1f] border border-gray-200 dark:border-[#262626] rounded-full text-sm text-gray-700 dark:text-[#e5e5e5] appearance-none focus:outline-none focus:bg-white dark:focus:bg-[#141414] focus:border-[#b72c0f] focus:ring-1 focus:ring-[#b72c0f] cursor-pointer"
                  >
                    <option value="" className="dark:bg-[#141414]">
                      Profile
                    </option>
                    {collections.map((col) => (
                      <option
                        key={col.id}
                        value={col.id}
                        className="dark:bg-[#141414]"
                      >
                        {col.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 dark:text-zinc-500">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="description"
                className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500"
              >
                Description
              </label>
              <div className="relative flex items-start bg-gray-50 dark:bg-[#1f1f1f] rounded-2xl border border-gray-200 dark:border-[#262626] p-3.5 focus-within:bg-white dark:focus-within:bg-[#141414] focus-within:border-[#b72c0f] focus-within:ring-1 focus-within:ring-[#b72c0f] transition-all">
                <span className="text-2xl font-serif text-gray-300 dark:text-zinc-700 leading-none mr-1 select-none">
                  “
                </span>
                <textarea
                  id="description"
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="It's easy to get away by lying..."
                  className="w-full bg-transparent text-sm text-gray-700 dark:text-[#e5e5e5] placeholder-gray-400 dark:placeholder-zinc-500 font-medium resize-none focus:outline-none pt-0.5"
                />
                <span className="text-2xl font-serif text-gray-300 dark:text-zinc-700 leading-none ml-1 align-bottom self-end select-none">
                  ”
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="tags"
                className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500"
              >
                Describe the image with tags
              </label>
              <input
                id="tags"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="E.g. Black and White, Girl, Trees"
                className="w-full py-2.5 px-4 bg-gray-50 dark:bg-[#1f1f1f] border border-gray-200 dark:border-[#262626] rounded-full text-sm text-gray-700 dark:text-[#e5e5e5] placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:bg-white dark:focus:bg-[#141414] focus:border-[#b72c0f] focus:ring-1 focus:ring-[#b72c0f] transition-all"
              />
              <p className="text-[11px] text-gray-400 dark:text-zinc-500 tracking-normal pl-3">
                Write keywords separated with commas
              </p>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1 pl-1">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-full bg-gray-50 dark:bg-[#1f1f1f] border border-gray-200 dark:border-[#262626] px-3 py-1 text-xs font-medium text-gray-500 dark:text-zinc-400"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-gray-400 dark:text-zinc-500 hover:text-[#b72c0f] dark:hover:text-[#b72c0f] cursor-pointer font-bold focus:outline-none"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-auto px-8 py-2.5 rounded-full text-sm font-bold text-white bg-[#b72c0f] shadow-sm transition-all duration-200 hover:bg-[#96240c] active:scale-95 cursor-pointer flex items-center justify-center gap-2 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
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
                    Posting...
                  </>
                ) : (
                  "Post"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </main>
  );
}

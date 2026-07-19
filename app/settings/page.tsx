"use client";
import { useState, useRef, useEffect } from "react";
import DeleteAccountModal from "@/components/ui/DeleteAccountModal";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Account");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");
  const [matureContent, setMatureContent] = useState(false);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [headerFile, setHeaderFile] = useState<File | null>(null);
  const [headerPreview, setHeaderPreview] = useState<string>("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "system";
    }
    return "system";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.add("light");
    } else {
      localStorage.removeItem("theme");
      return;
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const headerInputRef = useRef<HTMLInputElement>(null);

  const navigationItems = [
    { id: "Account", label: "Public profile" },
    { id: "Privacy", label: "Privacy & safety" },
    { id: "Theme", label: "Display theme" },
  ];

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "header",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      if (type === "avatar") {
        setAvatarFile(file);
        setAvatarPreview(previewUrl);
      }
      if (type === "header") {
        setHeaderFile(file);
        setHeaderPreview(previewUrl);
      }
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    if (activeTab === "Account") {
      if (!name.trim()) {
        newErrors.name = "The name cannot be empty.";
      }
    }

    if (activeTab === "Privacy") {
      if (!email.trim()) {
        newErrors.email = "Please enter your email.";
      }

      if (password.length > 0) {
        const strongPasswordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,\-_])(?=.{8,})/;
        if (!strongPasswordRegex.test(password)) {
          newErrors.password =
            "The password must have at least 8 characters, including uppercase, lowercase, a number and a symbol.";
        }
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    alert("Changes saved successfully!");
  };

  const handleDeleteAccount = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDeleteAccount = async (password: string) => {
    console.log("Iniciando eliminación con la contraseña:", password);
    alert("Account permanently deleted.");
    setIsDeleteModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-nav font-sans antialiased py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-8 pl-1">
          Settings
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          <nav className="flex md:flex-col flex-wrap gap-1 bg-nav p-1.5 rounded-2xl border border-border-custom">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  setErrors({});
                }}
                className={`w-full text-left px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                  activeTab === item.id
                    ? "bg-background text-[#b72c0f] shadow-sm"
                    : "text-muted hover:text-foreground hover:bg-border-custom/50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="md:col-span-3 bg-card rounded-3xl border border-border-custom p-6 md:p-10 shadow-sm">
            {activeTab === "Account" && (
              <form onSubmit={handleSave} className="space-y-6" noValidate>
                <div className="space-y-1 border-b border-border-custom pb-5 mb-6">
                  <h2 className="text-xl font-bold text-foreground">
                    Public profile
                  </h2>
                  <p className="text-sm text-muted">
                    Manage how your identity appears across the platform.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 items-start border-b border-border-custom pb-6">
                  <label className="text-sm font-bold text-main md:pt-4">
                    Profile picture
                  </label>
                  <div className="md:col-span-3 flex items-center gap-5">
                    <div className="w-16 h-16 rounded-full bg-nav border border-border-custom shrink-0 overflow-hidden flex items-center justify-center">
                      {avatarPreview ? (
                        <img
                          src={avatarPreview}
                          alt="Avatar preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-muted text-xs">No image</span>
                      )}
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <input
                        type="file"
                        ref={avatarInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, "avatar")}
                      />
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => avatarInputRef.current?.click()}
                          className="px-4 py-2 text-xs font-semibold text-foreground bg-background border border-border-custom rounded-xl hover:bg-nav transition-colors cursor-pointer"
                        >
                          Choose file
                        </button>
                        <span className="text-xs text-muted truncate max-w-xs">
                          {avatarFile ? avatarFile.name : "No file chosen"}
                        </span>
                      </div>
                      <p className="text-xs text-muted pl-1">
                        JPG, PNG or WEBP. Recommend square ratio.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 items-start border-b border-border-custom pb-6">
                  <label className="text-sm font-bold text-main md:pt-4">
                    Profile header
                  </label>
                  <div className="md:col-span-3 flex flex-col sm:flex-row sm:items-center gap-5">
                    <div className="w-full sm:w-32 h-16 rounded-xl bg-nav border border-border-custom shrink-0 overflow-hidden flex items-center justify-center">
                      {headerPreview ? (
                        <img
                          src={headerPreview}
                          alt="Header preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-muted text-xs">No banner</span>
                      )}
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <input
                        type="file"
                        ref={headerInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, "header")}
                      />
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => headerInputRef.current?.click()}
                          className="px-4 py-2 text-xs font-semibold text-foreground bg-background border border-border-custom rounded-xl hover:bg-nav transition-colors cursor-pointer"
                        >
                          Choose file
                        </button>
                        <span className="text-xs text-muted truncate max-w-xs">
                          {headerFile ? headerFile.name : "No file chosen"}
                        </span>
                      </div>
                      <p className="text-xs text-muted pl-1">
                        This banner image will appear at the top of your
                        profile.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 items-start border-b border-border-custom pb-6">
                  <label className="text-sm font-bold text-main md:pt-2">
                    Name
                  </label>
                  <div className="md:col-span-3 space-y-1.5">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name or display name"
                      className={`w-full px-4 py-2.5 bg-input-bg border rounded-2xl text-sm text-foreground transition-all duration-300 focus:outline-none focus:bg-background ${
                        errors.name
                          ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                          : "border-border-custom focus:border-[#b72c0f] focus:ring-1 focus:ring-[#b72c0f]"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs font-medium text-red-500 pl-3 mt-0.5">
                        {errors.name}
                      </p>
                    )}
                    <p className="text-xs text-muted pl-1">
                      Help people discover your account by using your name.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 items-start border-b border-border-custom pb-6">
                  <label className="text-sm font-bold text-main md:pt-2">
                    Username
                  </label>
                  <div className="md:col-span-3 space-y-1.5">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Choose a unique username"
                      className="w-full px-4 py-2.5 bg-input-bg border border-border-custom rounded-2xl text-sm text-foreground transition-all duration-300 focus:outline-none focus:bg-background focus:border-[#b72c0f] focus:ring-1 focus:ring-[#b72c0f]"
                    />
                    <p className="text-xs text-muted pl-1">
                      Your profile URL: example.com/{username || "username"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 items-start border-b border-border-custom pb-6">
                  <label className="text-sm font-bold text-main md:pt-2">
                    Bio
                  </label>
                  <div className="md:col-span-3 space-y-1.5">
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="A few words about you"
                      rows={3}
                      className="w-full px-4 py-2.5 bg-input-bg border border-border-custom rounded-2xl text-sm text-foreground transition-all duration-300 focus:outline-none focus:bg-background focus:border-[#b72c0f] focus:ring-1 focus:ring-[#b72c0f] resize-none"
                    />
                    <p className="text-xs text-muted pl-1">
                      Tell the community who you are.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 items-start border-b border-border-custom pb-6">
                  <label className="text-sm font-bold text-main md:pt-2">
                    Location
                  </label>
                  <div className="md:col-span-3 space-y-1.5">
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Where are you from?"
                      className="w-full px-4 py-2.5 bg-input-bg border border-border-custom rounded-2xl text-sm text-foreground transition-all duration-300 focus:outline-none focus:bg-background focus:border-[#b72c0f] focus:ring-1 focus:ring-[#b72c0f]"
                    />
                    <p className="text-xs text-muted pl-1">
                      E.g. Paris, France or Seoul, Korea.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 items-start border-b border-border-custom pb-6">
                  <label className="text-sm font-bold text-main md:pt-2">
                    Link
                  </label>
                  <div className="md:col-span-3 space-y-1.5">
                    <input
                      type="url"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      placeholder="Have a blog or website?"
                      className="w-full px-4 py-2.5 bg-input-bg border border-border-custom rounded-2xl text-sm text-foreground transition-all duration-300 focus:outline-none focus:bg-background focus:border-[#b72c0f] focus:ring-1 focus:ring-[#b72c0f]"
                    />
                    <p className="text-xs text-muted pl-1">
                      Add your personal website, portfolio or social link.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 items-start border-b border-border-custom pb-6">
                  <label className="text-sm font-bold text-main md:pt-0.5">
                    Mature content
                  </label>
                  <div className="md:col-span-3 space-y-2">
                    <label className="inline-flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={matureContent}
                        onChange={(e) => setMatureContent(e.target.checked)}
                        className="w-4 h-4 rounded text-[#b72c0f] bg-input-bg border-border-custom focus:ring-[#b72c0f] focus:ring-offset-0 focus:ring-1 accent-[#b72c0f]"
                      />
                      <span className="text-sm font-medium text-main">
                        Show mature content
                      </span>
                    </label>
                    <p className="text-xs text-muted">
                      Mature content may contain nudity or other sensitive
                      visual art content.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-[#b72c0f] border border-[#b72c0f] rounded-full transition-all duration-200 shadow-sm hover:bg-[#96240c] hover:border-[#96240c] hover:shadow-md active:scale-95 cursor-pointer"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            )}

            {activeTab === "Privacy" && (
              <div className="space-y-10">
                <form onSubmit={handleSave} className="space-y-6" noValidate>
                  <div className="space-y-1 border-b border-border-custom pb-5 mb-6">
                    <h2 className="text-xl font-bold text-foreground">
                      Privacy & safety
                    </h2>
                    <p className="text-sm text-muted">
                      Update your login details, security keys, and account
                      access permissions.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 items-start border-b border-border-custom pb-6">
                    <label className="text-sm font-bold text-main md:pt-2">
                      Email address
                    </label>
                    <div className="md:col-span-3 space-y-1.5">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className={`w-full px-4 py-2.5 bg-input-bg border rounded-2xl text-sm text-foreground transition-all duration-300 focus:outline-none focus:bg-background ${
                          errors.email
                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-border-custom focus:border-[#b72c0f] focus:ring-1 focus:ring-[#b72c0f]"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs font-medium text-red-500 pl-3 mt-0.5">
                          {errors.email}
                        </p>
                      )}
                      <p className="text-xs text-muted pl-1">
                        Your primary email address for account notifications and
                        security.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 items-start border-b border-border-custom pb-6">
                    <label className="text-sm font-bold text-main md:pt-2">
                      New password
                    </label>
                    <div className="md:col-span-3 space-y-1.5">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`w-full px-4 py-2.5 bg-input-bg border rounded-2xl text-sm text-foreground transition-all duration-300 focus:outline-none focus:bg-background ${
                          errors.password
                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-border-custom focus:border-[#b72c0f] focus:ring-1 focus:ring-[#b72c0f]"
                        }`}
                      />
                      {errors.password && (
                        <p className="text-xs font-medium text-red-500 pl-3 mt-0.5">
                          {errors.password}
                        </p>
                      )}
                      <p className="text-xs text-muted pl-1">
                        Choose a secure, complex password to safeguard your
                        account.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      className="px-6 py-2.5 text-sm font-semibold text-white bg-[#b72c0f] border border-[#b72c0f] rounded-full transition-all duration-200 shadow-sm hover:bg-[#96240c] hover:border-[#96240c] hover:shadow-md active:scale-95 cursor-pointer"
                    >
                      Update credentials
                    </button>
                  </div>
                </form>

                <div className="pt-8 border-t border-red-500/20 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-red-500">
                      Danger Zone
                    </h3>
                    <p className="text-sm text-muted">
                      Irreversible actions regarding your credentials and
                      account data.
                    </p>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-foreground">
                        Delete this account
                      </p>
                      <p className="text-xs text-muted">
                        Once you delete your account, there is no going back.
                        Please be certain.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleDeleteAccount}
                      className="px-5 py-2.5 text-sm font-semibold text-white bg-red-600 border border-red-600 rounded-xl transition-all duration-200 shadow-sm hover:bg-red-700 hover:border-red-700 hover:shadow-md active:scale-95 cursor-pointer self-start sm:self-center"
                    >
                      Delete account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Theme" && (
              <form onSubmit={handleSave} className="space-y-8" noValidate>
                <div className="space-y-1 border-b border-border-custom pb-5 mb-6">
                  <h2 className="text-xl font-bold text-foreground">
                    Interface theme
                  </h2>
                  <p className="text-sm text-muted">
                    Customize the appearance of your workspace dashboard.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setTheme("light")}
                    className={`group relative flex flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 cursor-pointer p-1.5 ${
                      theme === "light"
                        ? "border-[#b72c0f] bg-background ring-2 ring-[#b72c0f]/10 shadow-md"
                        : "border-border-custom bg-card hover:border-neutral-400"
                    }`}
                  >
                    <div className="aspect-[4/3] w-full rounded-xl bg-white border border-gray-100 p-3 flex flex-col gap-3">
                      <div className="flex gap-3 border-b border-gray-200 pb-1 shrink-0">
                        <div className="h-4 border-b-2 border-[#b72c0f] pr-1">
                          <div className="h-2 w-6 rounded-sm bg-[#b72c0f]" />
                        </div>
                        <div className="h-4 border-b-2 border-transparent">
                          <div className="h-2 w-8 rounded-sm bg-gray-200" />
                        </div>
                      </div>
                      <div className="h-2 w-1/3 rounded-sm bg-gray-200 shrink-0" />
                      <div className="grid grid-cols-4 gap-1.5 flex-1 items-start">
                        <div className="aspect-square w-full rounded-md bg-gray-50 border border-gray-100" />
                        <div className="aspect-square w-full rounded-md bg-gray-50 border border-gray-100" />
                        <div className="aspect-square w-full rounded-md bg-gray-50 border border-gray-100" />
                        <div className="aspect-square w-full rounded-md bg-gray-50 border border-gray-100" />
                      </div>
                    </div>
                    <div className="p-3 pt-4 flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all ${theme === "light" ? "border-[#b72c0f] bg-[#b72c0f]" : "border-gray-300 bg-background"}`}
                      >
                        {theme === "light" && (
                          <div className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-foreground">
                          Light mode
                        </p>
                        <p className="text-xs text-muted">
                          Clean and bright view.
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTheme("dark")}
                    className={`group relative flex flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 cursor-pointer p-1.5 ${
                      theme === "dark"
                        ? "border-[#b72c0f] bg-background ring-2 ring-[#b72c0f]/10 shadow-md"
                        : "border-border-custom bg-card hover:border-gray-300 shadow-xs hover:shadow-sm"
                    }`}
                  >
                    <div className="aspect-[4/3] w-full rounded-xl bg-neutral-900 p-3 flex flex-col gap-3 border border-neutral-800">
                      <div className="flex gap-3 border-b border-neutral-800 pb-1 shrink-0">
                        <div className="h-4 border-b-2 border-[#b72c0f] pr-1">
                          <div className="h-2 w-6 rounded-sm bg-[#b72c0f]" />
                        </div>
                        <div className="h-4 border-b-2 border-transparent">
                          <div className="h-2 w-8 rounded-sm bg-neutral-700" />
                        </div>
                      </div>
                      <div className="h-2 w-1/3 rounded-sm bg-neutral-700 shrink-0" />
                      <div className="grid grid-cols-4 gap-1.5 flex-1 items-start">
                        <div className="aspect-square w-full rounded-md bg-neutral-800 border border-neutral-700" />
                        <div className="aspect-square w-full rounded-md bg-neutral-800 border border-neutral-700" />
                        <div className="aspect-square w-full rounded-md bg-neutral-800 border border-neutral-700" />
                        <div className="aspect-square w-full rounded-md bg-neutral-800 border border-neutral-700" />
                      </div>
                    </div>

                    <div className="p-3 pt-4 flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all ${theme === "dark" ? "border-[#b72c0f] bg-[#b72c0f]" : "border-gray-300 bg-background"}`}
                      >
                        {theme === "dark" && (
                          <div className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-foreground">
                          Dark mode
                        </p>
                        <p className="text-xs text-muted">Easy on the eyes.</p>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTheme("system")}
                    className={`group relative flex flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 cursor-pointer p-1.5 ${
                      theme === "system"
                        ? "border-[#b72c0f] bg-background ring-2 ring-[#b72c0f]/10 shadow-md"
                        : "border-border-custom bg-card hover:border-gray-300 shadow-xs hover:shadow-sm"
                    }`}
                  >
                    <div className="aspect-[4/3] w-full rounded-xl relative flex overflow-hidden border border-border-custom">
                      <div className="w-1/2 bg-white p-3 pr-1 flex flex-col gap-3 border-r border-gray-200">
                        <div className="flex gap-2 border-b border-gray-200 pb-1 shrink-0">
                          <div className="h-4 border-b-2 border-[#b72c0f] pr-0.5">
                            <div className="h-2 w-4 rounded-sm bg-[#b72c0f]" />
                          </div>
                        </div>
                        <div className="h-2 w-3/4 rounded-sm bg-gray-200 shrink-0" />
                        <div className="grid grid-cols-2 gap-1.5 flex-1 items-start">
                          <div className="aspect-square w-full rounded-md bg-gray-50 border border-gray-100" />
                          <div className="aspect-square w-full rounded-md bg-gray-50 border border-gray-100" />
                        </div>
                      </div>
                      <div className="w-1/2 bg-neutral-900 p-3 pl-1 flex flex-col gap-3">
                        <div className="flex gap-2 border-b border-neutral-800 pb-1 shrink-0 justify-end">
                          <div className="h-4 border-b-2 border-transparent">
                            <div className="h-2 w-5 rounded-sm bg-neutral-700" />
                          </div>
                        </div>
                        <div className="h-2 w-3/4 rounded-sm bg-neutral-700 shrink-0 ml-auto" />
                        <div className="grid grid-cols-2 gap-1.5 flex-1 items-start">
                          <div className="aspect-square w-full rounded-md bg-neutral-800 border border-neutral-700" />
                          <div className="aspect-square w-full rounded-md bg-neutral-800 border border-neutral-700" />
                        </div>
                      </div>
                    </div>

                    <div className="p-3 pt-4 flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all ${theme === "system" ? "border-[#b72c0f] bg-[#b72c0f]" : "border-gray-300 bg-background"}`}
                      >
                        {theme === "system" && (
                          <div className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-foreground">
                          Automatic
                        </p>
                        <p className="text-xs text-muted">Syncs with system.</p>
                      </div>
                    </div>
                  </button>
                </div>

                <div className="flex justify-end pt-6 border-t border-border-custom">
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-[#b72c0f] border border-[#b72c0f] rounded-full transition-all duration-200 shadow-sm hover:bg-[#96240c] hover:border-[#96240c] hover:shadow-md active:scale-95 cursor-pointer"
                  >
                    Save configuration
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirmDelete={handleConfirmDeleteAccount}
      />
    </main>
  );
}

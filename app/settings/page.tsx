"use client";
import { useState, useRef } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Theme");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");
  const [matureContent, setMatureContent] = useState(false);
  const [avatarFile, setAvatarFile] = useState("");
  const [headerFile, setHeaderFile] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [theme, setTheme] = useState("system");

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
      if (type === "avatar") setAvatarFile(file.name);
      if (type === "header") setHeaderFile(file.name);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Changes saved successfully!");
  };

  return (
    <main className="min-h-screen bg-[#fafafa] font-sans antialiased py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-800 mb-8 pl-1">
          Settings
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          <nav className="flex md:flex-col flex-wrap gap-1 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                  activeTab === item.id
                    ? "bg-white text-[#b72c0f] shadow-sm"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/60"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="md:col-span-3 bg-white rounded-3xl border border-gray-100 p-6 md:p-10 shadow-sm">
            {activeTab === "Account" && (
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 items-start border-b border-gray-100 pb-6">
                  <label className="text-sm font-bold text-gray-700 md:pt-2">
                    Profile picture
                  </label>
                  <div className="md:col-span-3 space-y-1.5">
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
                        className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        Choose file
                      </button>
                      <span className="text-xs text-gray-500 truncate max-w-xs">
                        {avatarFile || "No file chosen"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 pl-1">
                      JPG, PNG or WEBP. Recommend square ratio.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 items-start border-b border-gray-100 pb-6">
                  <label className="text-sm font-bold text-gray-700 md:pt-2">
                    Profile header
                  </label>
                  <div className="md:col-span-3 space-y-1.5">
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
                        className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        Choose file
                      </button>
                      <span className="text-xs text-gray-500 truncate max-w-xs">
                        {headerFile || "No file chosen"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 pl-1">
                      This banner image will appear at the top of your profile.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 items-start border-b border-gray-100 pb-6">
                  <label className="text-sm font-bold text-gray-700 md:pt-2">
                    Name
                  </label>
                  <div className="md:col-span-3 space-y-1.5">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name or display name"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-700 transition-all duration-300 focus:outline-none focus:bg-white focus:border-[#b72c0f] focus:ring-1 focus:ring-[#b72c0f]"
                    />
                    <p className="text-xs text-gray-400 pl-1">
                      Help people discover your account by using your name.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 items-start border-b border-gray-100 pb-6">
                  <label className="text-sm font-bold text-gray-700 md:pt-2">
                    Username
                  </label>
                  <div className="md:col-span-3 space-y-1.5">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Choose a unique username"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-700 transition-all duration-300 focus:outline-none focus:bg-white focus:border-[#b72c0f] focus:ring-1 focus:ring-[#b72c0f]"
                    />
                    <p className="text-xs text-gray-400 pl-1">
                      Your profile URL: example.com/{username || "username"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 items-start border-b border-gray-100 pb-6">
                  <label className="text-sm font-bold text-gray-700 md:pt-2">
                    Bio
                  </label>
                  <div className="md:col-span-3 space-y-1.5">
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="A few words about you"
                      rows={3}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-700 transition-all duration-300 focus:outline-none focus:bg-white focus:border-[#b72c0f] focus:ring-1 focus:ring-[#b72c0f] resize-none"
                    />
                    <p className="text-xs text-gray-400 pl-1">
                      Tell the community who you are.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 items-start border-b border-gray-100 pb-6">
                  <label className="text-sm font-bold text-gray-700 md:pt-2">
                    Location
                  </label>
                  <div className="md:col-span-3 space-y-1.5">
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Where are you from?"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-700 transition-all duration-300 focus:outline-none focus:bg-white focus:border-[#b72c0f] focus:ring-1 focus:ring-[#b72c0f]"
                    />
                    <p className="text-xs text-gray-400 pl-1">
                      E.g. Paris, France or Seoul, Korea.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 items-start border-b border-gray-100 pb-6">
                  <label className="text-sm font-bold text-gray-700 md:pt-2">
                    Link
                  </label>
                  <div className="md:col-span-3 space-y-1.5">
                    <input
                      type="url"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      placeholder="Have a blog or website?"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-700 transition-all duration-300 focus:outline-none focus:bg-white focus:border-[#b72c0f] focus:ring-1 focus:ring-[#b72c0f]"
                    />
                    <p className="text-xs text-gray-400 pl-1">
                      Add your personal website, portfolio or social link.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 items-start border-b border-gray-100 pb-6">
                  <label className="text-sm font-bold text-gray-700 md:pt-0.5">
                    Mature content
                  </label>
                  <div className="md:col-span-3 space-y-2">
                    <label className="inline-flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={matureContent}
                        onChange={(e) => setMatureContent(e.target.checked)}
                        className="w-4 h-4 rounded text-[#b72c0f] bg-gray-50 border-gray-200 focus:ring-[#b72c0f] focus:ring-offset-0 focus:ring-1 accent-[#b72c0f]"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Show mature content
                      </span>
                    </label>
                    <p className="text-xs text-gray-400">
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
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 items-start border-b border-gray-100 pb-6">
                  <label className="text-sm font-bold text-gray-700 md:pt-2">
                    Email address
                  </label>
                  <div className="md:col-span-3 space-y-1.5">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-700 transition-all duration-300 focus:outline-none focus:bg-white focus:border-[#b72c0f] focus:ring-1 focus:ring-[#b72c0f]"
                    />
                    <p className="text-xs text-gray-400 pl-1">
                      Your primary email address for account notifications and
                      security.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 items-start border-b border-gray-100 pb-6">
                  <label className="text-sm font-bold text-gray-700 md:pt-2">
                    New password
                  </label>
                  <div className="md:col-span-3 space-y-1.5">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-700 transition-all duration-300 focus:outline-none focus:bg-white focus:border-[#b72c0f] focus:ring-1 focus:ring-[#b72c0f]"
                    />
                    <p className="text-xs text-gray-400 pl-1">
                      Choose a secure, complex password to safeguard your
                      account.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 items-start border-b border-gray-100 pb-6">
                  <label className="text-sm font-bold text-gray-700 md:pt-2">
                    Confirm password
                  </label>
                  <div className="md:col-span-3 space-y-1.5">
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-700 transition-all duration-300 focus:outline-none focus:bg-white focus:border-[#b72c0f] focus:ring-1 focus:ring-[#b72c0f]"
                    />
                    <p className="text-xs text-gray-400 pl-1">
                      Please type your new password again to ensure accuracy.
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
            )}

            {activeTab === "Theme" && (
              <form onSubmit={handleSave} className="space-y-8">
                <div className="space-y-1 border-b border-gray-100 pb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    Interface theme
                  </h2>
                  <p className="text-sm text-gray-400">
                    Customize the appearance of your workspace dashboard.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setTheme("light")}
                    className={`group relative flex flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 cursor-pointer p-1.5 ${
                      theme === "light"
                        ? "border-[#b72c0f] bg-white ring-2 ring-[#b72c0f]/10 shadow-md"
                        : "border-gray-200 bg-white hover:border-gray-300 shadow-xs hover:shadow-sm"
                    }`}
                  >
                    <div className="aspect-[4/3] w-full rounded-xl bg-gray-100 p-3 flex flex-col gap-1.5 transition-colors duration-300 group-hover:bg-gray-200/50">
                      <div className="h-2 w-1/3 rounded-sm bg-gray-300" />
                      <div className="flex-1 rounded-lg bg-white p-2 shadow-2xs flex flex-col gap-1">
                        <div className="h-1.5 w-full rounded-sm bg-gray-200" />
                        <div className="h-1.5 w-4/5 rounded-sm bg-gray-200" />
                        <div className="h-3 w-1/4 rounded-md bg-[#b72c0f]/20 mt-auto ml-auto" />
                      </div>
                    </div>
                    <div className="p-3 pt-4 flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all ${
                          theme === "light"
                            ? "border-[#b72c0f] bg-[#b72c0f]"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {theme === "light" && (
                          <div className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-gray-800">
                          Light mode
                        </p>
                        <p className="text-xs text-gray-400">
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
                        ? "border-[#b72c0f] bg-white ring-2 ring-[#b72c0f]/10 shadow-md"
                        : "border-gray-200 bg-white hover:border-gray-300 shadow-xs hover:shadow-sm"
                    }`}
                  >
                    <div className="aspect-[4/3] w-full rounded-xl bg-gray-900 p-3 flex flex-col gap-1.5">
                      <div className="h-2 w-1/3 rounded-sm bg-gray-700" />
                      <div className="flex-1 rounded-lg bg-gray-800 p-2 shadow-2xs flex flex-col gap-1">
                        <div className="h-1.5 w-full rounded-sm bg-gray-700" />
                        <div className="h-1.5 w-4/5 rounded-sm bg-gray-700" />
                        <div className="h-3 w-1/4 rounded-md bg-[#b72c0f]/40 mt-auto ml-auto" />
                      </div>
                    </div>
                    <div className="p-3 pt-4 flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all ${
                          theme === "dark"
                            ? "border-[#b72c0f] bg-[#b72c0f]"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {theme === "dark" && (
                          <div className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-gray-800">
                          Dark mode
                        </p>
                        <p className="text-xs text-gray-400">
                          Easy on the eyes.
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTheme("system")}
                    className={`group relative flex flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 cursor-pointer p-1.5 ${
                      theme === "system"
                        ? "border-[#b72c0f] bg-white ring-2 ring-[#b72c0f]/10 shadow-md"
                        : "border-gray-200 bg-white hover:border-gray-300 shadow-xs hover:shadow-sm"
                    }`}
                  >
                    <div className="aspect-[4/3] w-full rounded-xl bg-gray-100 relative flex overflow-hidden">
                      <div className="w-1/2 bg-gray-100 p-3 pr-1.5 flex flex-col gap-1.5">
                        <div className="h-2 w-2/3 rounded-sm bg-gray-300" />
                        <div className="flex-1 rounded-l-lg rounded-r-none bg-white p-2 border-r border-gray-100 shadow-2xs flex flex-col gap-1">
                          <div className="h-1.5 w-full rounded-sm bg-gray-200" />
                          <div className="h-1.5 w-full rounded-sm bg-gray-200" />
                        </div>
                      </div>
                      <div className="w-1/2 bg-gray-900 p-3 pl-1.5 flex flex-col gap-1.5">
                        <div className="h-2 w-2/3 rounded-sm bg-gray-700 ml-auto" />
                        <div className="flex-1 rounded-r-lg rounded-l-none bg-gray-800 p-2 shadow-2xs flex flex-col gap-1">
                          <div className="h-1.5 w-full rounded-sm bg-gray-700" />
                          <div className="h-1.5 w-full rounded-sm bg-gray-700" />
                        </div>
                      </div>
                    </div>
                    <div className="p-3 pt-4 flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all ${
                          theme === "system"
                            ? "border-[#b72c0f] bg-[#b72c0f]"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {theme === "system" && (
                          <div className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-gray-800">
                          Automatic
                        </p>
                        <p className="text-xs text-gray-400">
                          Syncs with system.
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
                <div className="flex justify-end pt-6 border-t border-gray-100">
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
    </main>
  );
}

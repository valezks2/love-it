"use client";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

interface ProfileWrapperProps {
  children: React.ReactNode;
  activeTab: "gallery" | "collections" | "loved";
}

export default function ProfileWrapper({
  children,
  activeTab,
}: ProfileWrapperProps) {
  const params = useParams();
  const username = (params?.username as string) || "valezks2";

  const userProfile = {
    name: "Valezka",
    username: `@${username}`,
    avatar: "/hero.jpg",
    banner: "/hero.jpg",
    bio: "Software engineer and hobbyist artist.",
    location: "Zulia, Venezuela",
    website: "https://valezka-dev.pages.dev/",
    followers: "1,240",
    following: "482",
  };

  const getTabClass = (tab: "gallery" | "collections" | "loved") =>
    `px-4 py-2 rounded-full transition-colors text-xs md:text-sm font-semibold ${
      activeTab === tab
        ? "bg-[#b72c0f]/10 text-[#b72c0f]"
        : "text-gray-600 hover:bg-gray-200/50"
    }`;

  return (
    <main className="min-h-screen bg-white font-sans antialiased text-gray-800">
      <section
        className="relative h-[30vh] min-h-[200px] w-full bg-cover bg-center"
        style={{ backgroundImage: `url('${userProfile.banner}')` }}
      >
        <div className="absolute inset-0 bg-black/10 z-0" />
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="relative z-10 flex flex-col items-center text-center -mt-16 md:-mt-20">
          <div className="flex flex-col items-center gap-5">
            <div className="relative h-28 w-28 md:h-36 md:w-36 overflow-hidden rounded-full border-4 border-[#FCFCFC] shadow-xl bg-white">
              <Image
                src={userProfile.avatar}
                alt={userProfile.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex flex-col items-center">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-gray-950">
                {userProfile.name}
              </h1>
              <p className="text-sm font-semibold text-[#b72c0f] mt-0.5 tracking-tight">
                {userProfile.username}
              </p>

              <p className="mt-3 text-sm md:text-base font-medium text-gray-700 max-w-lg leading-relaxed">
                {userProfile.bio}
              </p>

              <div className="mt-3 text-xs md:text-sm flex items-center gap-1.5 text-gray-500 font-medium">
                <span>{userProfile.location}</span>
                <span>•</span>
                <a
                  href={userProfile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b72c0f] hover:underline"
                >
                  {userProfile.website}
                </a>
              </div>

              <div className="mt-3 flex items-center gap-4 text-xs md:text-sm font-medium text-gray-600">
                <div>
                  <span className="font-bold text-gray-900">
                    {userProfile.followers}
                  </span>{" "}
                  followers
                </div>
                <div className="text-gray-300">•</div>
                <div>
                  <span className="font-bold text-gray-900">
                    {userProfile.following}
                  </span>{" "}
                  following
                </div>
              </div>
            </div>
          </div>

          <nav className="mt-8 border-t border-gray-200/60 pt-6 w-full flex justify-center">
            <ul className="flex items-center gap-1.5">
              <li>
                <Link
                  href={`/${username}/gallery`}
                  className={getTabClass("gallery")}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href={`/${username}/collections`}
                  className={getTabClass("collections")}
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  href={`/${username}/loved`}
                  className={getTabClass("loved")}
                >
                  Loved
                </Link>
              </li>
            </ul>
          </nav>
        </section>

        <section className="mt-10 py-8">{children}</section>
      </div>
    </main>
  );
}

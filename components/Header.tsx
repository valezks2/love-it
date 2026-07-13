"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-white px-4 py-3 shadow-sm md:px-8">
      <div className="flex items-center flex-shrink-0">
        <Link href="/">
          <img
            src="/logo.png"
            alt="Love It Logo"
            className="h-11 md:h-12 w-auto object-contain cursor-pointer transition-transform duration-200 hover:scale-105"
          />
        </Link>
      </div>

      <div className="hidden md:flex flex-1 max-w-xl mx-8">
        <div className="relative w-full">
          <input
            type="search"
            placeholder="Search images, collections, styles..."
            className="w-full py-2 pl-4 pr-10 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-700 transition-all duration-300 focus:outline-none focus:bg-white focus:border-[#b72c0f] focus:ring-1 focus:ring-[#b72c0f]"
          />
          <div className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
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
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Link href="/auth/login">
          <button className="px-4 py-2 text-sm font-semibold text-gray-600 rounded-full transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
            Log In
          </button>
        </Link>

        <Link href="/auth/sign-up">
          <button className="px-5 py-2 text-sm font-semibold text-white bg-[#b72c0f] border border-[#b72c0f] rounded-full transition-all duration-200 shadow-sm hover:bg-[#96240c] hover:border-[#96240c] hover:shadow-md active:scale-95 cursor-pointer">
            Sign Up
          </button>
        </Link>
      </div>
    </header>
  );
}

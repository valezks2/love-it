"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-10 bg-transparent py-6">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 md:gap-8">
          <div className="flex flex-col gap-3">
            <div className="relative h-14 w-44">
              <Image
                src="/logo.png"
                alt="Love It Logo"
                fill
                className="object-contain object-left cursor-pointer"
                priority
              />
            </div>
            <p className="mt-1 text-sm leading-relaxed text-gray-500 max-w-xs">
              Share, collect, and discover the content you love. Inspired by the
              authentic essence and aesthetic of We Heart It.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Links
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm font-medium text-gray-600">
              <li>
                <Link
                  href="/"
                  className="transition-colors duration-200 hover:text-[#b72c0f]"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/explore"
                  className="transition-colors duration-200 hover:text-[#b72c0f]"
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="transition-colors duration-200 hover:text-[#b72c0f]"
                >
                  Log In
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="transition-colors duration-200 hover:text-[#b72c0f]"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Legal
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm font-medium text-gray-600">
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors duration-200 hover:text-[#b72c0f]"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="transition-colors duration-200 hover:text-[#b72c0f]"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition-colors duration-200 hover:text-[#b72c0f]"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200/40 pt-6 text-center text-xs tracking-wide text-gray-400">
          &copy; {new Date().getFullYear()} Love It. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

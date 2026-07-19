"use client";
import { useState } from "react";
import Link from "next/link";

export default function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    username?: string;
    email?: string;
    password?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    const cleanName = name.trim();
    if (!cleanName) {
      newErrors.name = "The name cannot be empty.";
    } else if (cleanName.length > 10) {
      newErrors.name = "The name cannot exceed 10 characters.";
    }

    const cleanUsername = username.trim();
    if (!cleanUsername) {
      newErrors.username = "Please choose a username.";
    } else if (cleanUsername.length < 3 || cleanUsername.length > 20) {
      newErrors.username = "The username must be between 3 and 20 characters.";
    } else {
      const usernameRegex = /^[a-zA-Z0-9_]+$/;
      if (!usernameRegex.test(cleanUsername)) {
        newErrors.username =
          "The username can only contain letters, numbers, and underscores.";
      }
    }

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      newErrors.email = "Please enter your email address.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanEmail)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,\-_])(?=.{8,})/;
    if (!password) {
      newErrors.password = "Please create a password.";
    } else if (!strongPasswordRegex.test(password)) {
      newErrors.password =
        "The password must have at least 8 characters, including uppercase, lowercase, a number and a symbol.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    console.log("Account created successfully", {
      name: cleanName,
      username: cleanUsername,
      email: cleanEmail,
      password,
    });
  };

  return (
    <div className="flex min-h-[90vh] items-center justify-center bg-white dark:bg-[#141414] px-4 py-12 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="w-full max-w-md bg-white dark:bg-[#1f1f1f] rounded-3xl border border-gray-100 dark:border-zinc-800 p-8 shadow-sm md:p-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-[#e5e5e5] md:text-3xl">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
            Join Love It and start sharing inspiration
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="name"
              className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              maxLength={10}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-[#262626] border rounded-full text-sm text-gray-700 dark:text-zinc-200 transition-all duration-300 focus:outline-none focus:bg-white dark:focus:bg-[#1f1f1f] ${
                errors.name
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 dark:border-zinc-700 focus:border-[#b72c0f]"
              }`}
            />
            {errors.name && (
              <p className="text-xs font-medium text-red-500 pl-3 mt-0.5">
                {errors.name}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="username"
              className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              maxLength={20}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-[#262626] border rounded-full text-sm text-gray-700 dark:text-zinc-200 transition-all duration-300 focus:outline-none focus:bg-white dark:focus:bg-[#1f1f1f] ${
                errors.username
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 dark:border-zinc-700 focus:border-[#b72c0f]"
              }`}
            />
            {errors.username && (
              <p className="text-xs font-medium text-red-500 pl-3 mt-0.5">
                {errors.username}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-[#262626] border rounded-full text-sm text-gray-700 dark:text-zinc-200 transition-all duration-300 focus:outline-none focus:bg-white dark:focus:bg-[#1f1f1f] ${
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 dark:border-zinc-700 focus:border-[#b72c0f]"
              }`}
            />
            {errors.email && (
              <p className="text-xs font-medium text-red-500 pl-3 mt-0.5">
                {errors.email}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-4 pr-12 py-2.5 bg-gray-50 dark:bg-[#262626] border rounded-full text-sm text-gray-700 dark:text-zinc-200 transition-all duration-300 focus:outline-none focus:bg-white dark:focus:bg-[#1f1f1f] ${
                  errors.password
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 dark:border-zinc-700 focus:border-[#b72c0f]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300"
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
            {errors.password && (
              <p className="text-xs font-medium text-red-500 pl-3 mt-0.5">
                {errors.password}
              </p>
            )}
          </div>

          <div className="pt-2 px-1">
            <p className="text-xs leading-relaxed text-gray-400 dark:text-zinc-500 text-center">
              By creating your account, you confirm that you've read and
              accepted our{" "}
              <Link
                href="/privacy"
                className="font-semibold text-gray-500 dark:text-zinc-400 hover:text-[#b72c0f] underline"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/terms"
                className="font-semibold text-gray-500 dark:text-zinc-400 hover:text-[#b72c0f] underline"
              >
                Terms of Service
              </Link>
              .
            </p>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-2.5 bg-[#b72c0f] text-white font-semibold text-sm rounded-full transition-all hover:bg-[#96240c] shadow-sm"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-8 border-t border-gray-50 dark:border-zinc-800 pt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-[#b72c0f] hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

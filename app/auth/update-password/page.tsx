"use client";

import { useState } from "react";
import Link from "next/link";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    if (!password) {
      newErrors.password = "Please enter your new password";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSuccess(true);
    console.log("Password updated successfully");
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-white dark:bg-[#141414] px-4 py-12 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="w-full max-w-md bg-white dark:bg-[#1f1f1f] rounded-3xl border border-gray-100 dark:border-zinc-800 p-8 shadow-sm md:p-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-[#e5e5e5] md:text-3xl">
            Update your password
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
            {!isSuccess
              ? "Choose a strong password to secure your account"
              : "Your security has been updated!"}
          </p>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="At least 6 characters"
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
                      d={
                        showPassword
                          ? "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          : "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178zM15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      }
                    />
                  </svg>
                </button>
              </div>
              {errors.password && (
                <p className="text-xs font-medium text-red-500 pl-3 mt-0.5">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Repeat your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pl-4 pr-12 py-2.5 bg-gray-50 dark:bg-[#262626] border rounded-full text-sm text-gray-700 dark:text-zinc-200 transition-all duration-300 focus:outline-none focus:bg-white dark:focus:bg-[#1f1f1f] ${
                    errors.confirmPassword
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 dark:border-zinc-700 focus:border-[#b72c0f]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-3 text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300"
                >
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
                      d={
                        showConfirmPassword
                          ? "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          : "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178zM15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      }
                    />
                  </svg>
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs font-medium text-red-500 pl-3 mt-0.5">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#b72c0f] text-white font-semibold text-sm rounded-full transition-all hover:bg-[#96240c] shadow-sm"
            >
              Save New Password
            </button>
          </form>
        ) : (
          <div className="text-center space-y-6">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
              Your password has been successfully updated. You can now log in
              using your new credentials.
            </p>
            <div className="pt-2">
              <Link
                href="/login"
                className="block w-full py-2.5 bg-gray-900 dark:bg-[#e5e5e5] text-white dark:text-[#141414] font-semibold text-sm rounded-full transition-all hover:bg-gray-800 dark:hover:bg-white shadow-sm"
              >
                Go to Log In
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setError("");
    setIsSubmitted(true);
    console.log("Verification email requested for:", email);
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-[#FCFCFC] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-3xl border border-gray-100 p-8 shadow-sm md:p-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            Reset your password
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            {!isSubmitted
              ? "Enter your email address and we'll send you a verification code"
              : "Check your inbox!"}
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs font-bold uppercase tracking-wider text-gray-400"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2.5 bg-gray-50 border rounded-full text-sm text-gray-700 transition-all duration-300 focus:outline-none focus:bg-white ${
                  error
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-200 focus:border-[#b72c0f] focus:ring-1 focus:ring-[#b72c0f]"
                }`}
              />
              {error && (
                <p className="text-xs font-medium text-red-500 pl-3 mt-0.5">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#b72c0f] border border-[#b72c0f] text-white font-semibold text-sm rounded-full transition-all duration-200 shadow-sm hover:bg-[#96240c] hover:border-[#96240c] hover:shadow-md active:scale-[0.98] cursor-pointer"
            >
              Send Verification Code
            </button>
          </form>
        ) : (
          <div className="text-center space-y-6 animate-fadeIn">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
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
            <p className="text-sm text-gray-600 leading-relaxed">
              We have sent a secure verification code to{" "}
              <span className="font-semibold text-gray-900">{email}</span>.
              Please check your email to complete the reset process.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-xs font-semibold text-[#b72c0f] hover:underline"
            >
              Resend code or try another email
            </button>
          </div>
        )}

        <div className="mt-8 border-t border-gray-50 pt-6 text-center">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors duration-200 hover:text-[#b72c0f]"
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
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

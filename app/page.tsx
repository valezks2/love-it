"use client";
import { useEffect, useState } from "react";
import HomeGuest from "@/components/home/HomeGuest";
import HomeUser from "@/components/home/HomeUser";

export default function Home() {
  const [hasSession, setHasSession] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkSession = () => {
      const session = localStorage.getItem("user_session");
      setHasSession(!!session);
      setLoading(false);
    };

    checkSession();

    window.addEventListener("storage", checkSession);

    return () => {
      window.removeEventListener("storage", checkSession);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#b72c0f] border-t-transparent"></div>
      </div>
    );
  }

  return <>{hasSession ? <HomeUser /> : <HomeGuest />}</>;
}

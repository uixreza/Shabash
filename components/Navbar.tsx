"use client";

import Link from "next/link";
import { useState } from "react";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <nav className="fixed bottom-8 right-8 z-50 ">
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <div className="flex flex-row items-center gap-1.5 rounded-2xl  border-2 border-primary/20 bg-background px-2 py-3  backdrop-blur-xl">
        <button
          onClick={() => setAuthOpen(true)}
          className="flex w-20 flex-col items-center gap-0.5 rounded-xl bg-primary px-4 py-2 text-white transition-all hover:bg-primary/90 active:scale-95">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span className="text-[10px] leading-tight">ورود</span>
        </button>
        <Link
          href="/about"
          className="flex w-20 flex-col items-center gap-0.5 rounded-xl px-4 py-2 text-foreground/60 transition-all hover:bg-primary/10 hover:text-foreground active:scale-95">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          <span className="text-[10px] leading-tight">درباره</span>
        </Link>
      </div>
    </nav>
  );
}

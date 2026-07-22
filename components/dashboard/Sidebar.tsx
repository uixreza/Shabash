"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    label: "برنامه عروسی",
    href: "/dashboard/schedule",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
      </svg>
    ),
  },
  {
    label: "وضعیت درخواست‌ها",
    href: "/dashboard/requests",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect width="8" height="4" x="8" y="3" rx="1" />
        <path d="M9 14 7 12" />
        <path d="m9 14 2-2" />
        <path d="M13 14h4" />
      </svg>
    ),
  },
  {
    label: "حساب کاربری",
    href: "/dashboard/account",
    icon: (
      <span className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span className="absolute -left-1.5 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-400 text-[8px] font-bold text-white">
          !
        </span>
      </span>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-30 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-background text-foreground shadow-lg md:hidden">
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
          <line x1="3" x2="21" y1="6" y2="6" />
          <line x1="3" x2="21" y1="12" y2="12" />
          <line x1="3" x2="21" y1="18" y2="18" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`flex h-full flex-col border-l border-primary/10 bg-background/80 p-4 backdrop-blur-md transition-all ${
          open
            ? "fixed bottom-0 left-0 right-0 z-50 max-h-[70vh] rounded-t-2xl border border-primary/10 shadow-2xl"
            : "hidden md:flex md:w-64"
        }`}>
        <div className="mb-8 flex items-center justify-between px-3 pt-2">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white">
              ش
            </div>
            <span className="text-base font-bold text-foreground">شاباشچی</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-foreground/40 transition-colors hover:text-foreground md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1.5">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all active:scale-[0.98] ${
                  active
                    ? "bg-primary text-white shadow-sm shadow-primary/30"
                    : "text-foreground/60 hover:bg-primary/10 hover:text-foreground"
                }`}>
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/50 transition-all hover:bg-red-500  hover:text-white active:scale-[0.98]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
          خروج
        </button>
      </aside>
    </>
  );
}

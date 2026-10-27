"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { sileo } from "sileo";

const items: {
  label: string;
  href: string;
  exact?: boolean;
  icon: ReactNode;
}[] = [
  {
    label: "داشبورد",
    href: "/dashboard",
    exact: true,
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
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
      </svg>
    ),
  },
  {
    label: "درخواست‌ها",
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
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
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

  function confirmLogout() {
    const id = sileo.warning({
      title: "خروج از حساب",
      description: (
        <div
          className="mt-1 flex gap-2"
          onPointerDown={(e) => e.stopPropagation()}>
          <span
            role="button"
            tabIndex={0}
            onClick={() => signOut({ callbackUrl: "/" })}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") signOut({ callbackUrl: "/" });
            }}
            className="cursor-pointer rounded-lg bg-red-500/90 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-red-500">
            بله، خروج
          </span>
          <span
            role="button"
            tabIndex={0}
            onClick={() => sileo.dismiss(id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") sileo.dismiss(id);
            }}
            className="cursor-pointer rounded-lg bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80 transition-colors hover:bg-white/15">
            خیر
          </span>
        </div>
      ),
      duration: null,
      fill: "#2b220c",
      styles: {
        title: "text-white!",
        description: "text-white/75!",
        badge: "bg-white/10!",
      },
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-30 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-background text-foreground shadow-lg transition-all hover:border-primary/40 hover:text-primary active:scale-95 md:hidden">
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

      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-x-0 bottom-0 z-50 flex max-h-[70vh] flex-col overflow-y-auto rounded-t-2xl border-t border-primary/10 bg-background/90 p-4 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out md:static md:z-auto md:h-full md:max-h-none md:w-64 md:translate-y-0 md:overflow-visible md:rounded-none md:border-t-0 md:border-l md:border-primary/10 md:shadow-none ${
          open ? "translate-y-0" : "translate-y-full"
        }`}>
        <div className="mb-8 flex items-center justify-between px-3 pt-2">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt="لوگوی شاباش"
              width={36}
              height={36}
              className="h-9 w-9 rounded-xl object-cover shadow-sm ring-1 ring-primary/30"
            />
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
            const active = item.exact
              ? pathname === item.href
              : pathname === item.href ||
                pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all active:scale-[0.98] ${
                  active
                    ? "bg-primary text-primary-fg shadow-sm shadow-primary/30"
                    : "text-foreground/60 hover:bg-primary/10 hover:text-foreground"
                }`}>
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={confirmLogout}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/50 transition-all hover:bg-red-500  hover:text-white active:scale-[0.98]">
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

"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function DashboardHeader({
  area = "user",
}: {
  area?: "user" | "admin";
}) {
  const { data: session } = useSession();
  const phone = session?.user?.phone;
  const name = session?.user?.name;
  const isAdmin = session?.user?.role === "admin";
  const ticketsHref = area === "admin" ? "/console/tickets" : "/dashboard/tickets";

  return (
    <header className="flex h-16 items-center justify-between border-b border-primary/10 bg-background/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
          {name ? name.slice(0, 1) : "ک"}
        </div>
        <div>
          {name ? (
            <p className="text-sm font-medium text-foreground">{name}</p>
          ) : null}
          <p
            dir="ltr"
            className={`${name ? "text-[11px] text-foreground/40" : "text-sm font-medium text-foreground"} text-right`}>
            {phone ?? "—"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isAdmin &&
          (area === "admin" ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-xl border border-primary/20 px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-primary/10 hover:border-primary/40 active:scale-95">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              داشبورد کاربری
            </Link>
          ) : (
            <Link
              href="/console"
              className="flex items-center gap-2 rounded-xl border border-primary/20 px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-primary/10 hover:border-primary/40 active:scale-95">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              کنسول مدیریت
            </Link>
          ))}

        <Link
          href={ticketsHref}
          className="flex items-center gap-2 rounded-xl border border-primary/20 px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-primary/10 hover:border-primary/40 active:scale-95">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" x2="8" y1="13" y2="13" />
            <line x1="16" x2="8" y1="17" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          تیکت‌ها
        </Link>
      </div>
    </header>
  );
}

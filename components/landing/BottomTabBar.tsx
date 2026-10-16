"use client";

import { useState } from "react";
import AuthModal from "../AuthModal";
import {
  CalendarIcon,
  HomeIcon,
  SparklesIcon,
  UserIcon,
  VillaIcon,
} from "./icons";

const tabs = [
  { id: "home", label: "خانه", href: "#hero", Icon: HomeIcon },
  { id: "venues", label: "تالارها", href: "#featured-venues", Icon: VillaIcon },
  { id: "services", label: "خدمات", href: "#services", Icon: SparklesIcon },
  { id: "booking", label: "رزرو", href: "#lead-form", Icon: CalendarIcon },
] as const;

export default function BottomTabBar() {
  const [active, setActive] = useState<string>("home");
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <nav
        aria-label="منوی اصلی"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-lp-border bg-lp-bg/90 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-md items-stretch justify-around px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {tabs.map(({ id, label, href, Icon }) => {
            const isActive = active === id;
            return (
              <a
                key={id}
                href={href}
                onClick={() => setActive(id)}
                className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 transition-colors ${
                  isActive ? "text-lp-gold" : "text-lp-muted"
                }`}>
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-bold">{label}</span>
                <span
                  className={`h-0.5 w-4 rounded-full transition-all ${
                    isActive ? "lp-gold-gradient" : "bg-transparent"
                  }`}
                />
              </a>
            );
          })}
          <button
            type="button"
            onClick={() => {
              setActive("profile");
              setAuthOpen(true);
            }}
            className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 transition-colors ${
              active === "profile" ? "text-lp-gold" : "text-lp-muted"
            }`}>
            <UserIcon className="h-5 w-5" />
            <span className="text-[10px] font-bold">پروفایل</span>
            <span
              className={`h-0.5 w-4 rounded-full transition-all ${
                active === "profile" ? "lp-gold-gradient" : "bg-transparent"
              }`}
            />
          </button>
        </div>
      </nav>
    </>
  );
}

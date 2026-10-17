"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useTheme } from "@/components/Wrapper";
import statesCities from "@/data/states-cities.json";
import AuthModal from "./AuthModal";
import {
  ChevronDownIcon,
  MapPinIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
  XIcon,
} from "./landing/icons";

export default function Header() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedState, setSelectedState] = useState<string | null>(
    "خراسان شمالی",
  );
  const [selectedCity, setSelectedCity] = useState<string | null>("بجنورد");

  const states = Object.keys(statesCities);
  const cities = selectedState
    ? (statesCities as Record<string, string[]>)[selectedState]
    : [];

  function handleSelectState(state: string) {
    setSelectedState(state);
    setSelectedCity(null);
  }

  function handleSelectCity(city: string) {
    setSelectedCity(city);
    setOpen(false);
  }

  function handleReset() {
    setSelectedState(null);
    setSelectedCity(null);
  }

  const locationLabel = selectedCity
    ? `${selectedState}، ${selectedCity}`
    : "انتخاب شهر";

  const themeButton = (
    <button
      type="button"
      aria-label="تغییر تم"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-lp-border bg-lp-surface text-lp-muted backdrop-blur-md transition-all hover:border-lp-gold/60 hover:text-lp-gold active:scale-95">
      {theme === "dark" ? (
        <SunIcon className="h-[18px] w-[18px]" />
      ) : (
        <MoonIcon className="h-[18px] w-[18px]" />
      )}
    </button>
  );

  const locationPicker = (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border border-lp-border bg-lp-surface px-3.5 py-2 text-xs font-semibold text-lp-text backdrop-blur-md transition-all hover:border-lp-gold/50 hover:text-lp-gold active:scale-95 sm:px-4">
        <MapPinIcon className="h-4 w-4 flex-shrink-0 text-lp-gold" />
        <span className="max-w-[9rem] truncate">{locationLabel}</span>
        <ChevronDownIcon
          className={`h-3.5 w-3.5 text-lp-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full right-0 z-50 mt-2 max-h-72 w-64 overflow-y-auto rounded-2xl border border-lp-border bg-lp-surface-strong p-2 shadow-2xl backdrop-blur-xl sm:left-0 sm:right-auto">
            {!selectedState ? (
              <div className="space-y-1">
                <p className="px-3 py-2 text-[11px] font-bold text-lp-muted">
                  استان را انتخاب کنید
                </p>
                {states.map((state) => (
                  <button
                    key={state}
                    type="button"
                    onClick={() => handleSelectState(state)}
                    className="w-full rounded-xl px-3 py-2.5 text-right text-sm font-medium text-lp-text transition-all hover:bg-lp-gold-soft hover:text-lp-gold">
                    {state}
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex items-center justify-between px-3 py-2">
                  <p className="text-[11px] font-bold text-lp-muted">
                    شهرهای {selectedState}
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-[11px] font-bold text-lp-gold transition-colors hover:underline">
                    تغییر استان
                  </button>
                </div>
                {cities.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => handleSelectCity(city)}
                    className="w-full rounded-xl px-3 py-2.5 text-right text-sm font-medium text-lp-text transition-all hover:bg-lp-gold-soft hover:text-lp-gold">
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );

  const navLinks = [
    { label: "خدمات", href: "#services" },
    { label: "تالارها و باغ‌ها", href: "#featured-venues" },
    { label: "درباره ما", href: "/about" },
  ];

  if (isDashboard) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-primary/10 bg-background/80 px-6 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="relative">
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-xl border border-primary/30 px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-primary/10 hover:border-primary/50 active:scale-95">
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
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {selectedCity ? (
                  <span>
                    {selectedState}، {selectedCity}
                  </span>
                ) : (
                  <span>انتخاب شهر</span>
                )}
              </button>

              {open && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 z-50 w-72 rounded-2xl border border-primary/10 bg-background p-2 shadow-xl shadow-primary/10 backdrop-blur-xl">
                    {!selectedState ? (
                      <div className="space-y-1">
                        <p className="px-3 py-2 text-xs font-medium text-foreground/40">
                          استان را انتخاب کنید
                        </p>
                        {states.map((state) => (
                          <button
                            key={state}
                            onClick={() => handleSelectState(state)}
                            className="w-full rounded-xl px-3 py-2.5 text-right text-sm font-medium text-foreground transition-all hover:bg-primary/10">
                            {state}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between px-3 py-2">
                          <p className="text-xs font-medium text-foreground/40">
                            شهرهای {selectedState}
                          </p>
                          <button
                            onClick={handleReset}
                            className="text-xs text-primary transition-colors hover:text-primary/70">
                            تغییر استان
                          </button>
                        </div>
                        {cities.map((city) => (
                          <button
                            key={city}
                            onClick={() => handleSelectCity(city)}
                            className="w-full rounded-xl px-3 py-2.5 text-right text-sm font-medium text-foreground transition-all hover:bg-primary/10">
                            {city}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/30 text-foreground transition-all hover:bg-primary/10 hover:border-primary/50 active:scale-95">
            {theme === "dark" ? (
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
                <circle cx="12" cy="12" r="5" />
                <line x1="12" x2="12" y1="1" y2="3" />
                <line x1="12" x2="12" y1="21" y2="23" />
                <line x1="4.22" x2="5.64" y1="4.22" y2="5.64" />
                <line x1="18.36" x2="19.78" y1="18.36" y2="19.78" />
                <line x1="1" x2="3" y1="12" y2="12" />
                <line x1="21" x2="23" y1="12" y2="12" />
                <line x1="4.22" x2="5.64" y1="19.78" y2="18.36" />
                <line x1="18.36" x2="19.78" y1="5.64" y2="4.22" />
              </svg>
            ) : (
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
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
      </header>
    );
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-lp-border bg-lp-bg/80 backdrop-blur-xl">
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="sm:hidden">{locationPicker}</div>
          <a href="#hero" className="group hidden items-center gap-2.5 sm:flex">
            <span className="relative block h-9 w-9 overflow-hidden rounded-xl shadow-md ring-1 ring-lp-gold/40">
              <Image
                src="/logo.jpg"
                alt="لوگوی شاباشچی"
                width={36}
                height={36}
                className="absolute inset-0 h-full w-full scale-[1.35] object-cover transition-transform duration-300 group-hover:scale-[1.45]"
              />
            </span>
            <div className="flex flex-col">
              <span className="text-lg leading-none font-bold text-lp-gold">
                شاباشچی
              </span>
              <span className="mt-1 text-[9px] leading-none tracking-[0.2em] text-lp-muted uppercase">
                Shabashchi Luxury
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-lp-muted transition-colors hover:bg-lp-gold-soft hover:text-lp-gold">
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">{locationPicker}</div>
          {themeButton}
          <button
            type="button"
            onClick={() => setAuthOpen(true)}
            className="lp-gold-gradient hidden items-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-bold text-lp-on-gold shadow-[0_0_18px_rgba(212,175,55,0.25)] transition-all hover:brightness-110 active:scale-95 md:inline-flex">
            <UserIcon className="h-4 w-4" />
            ورود / ثبت‌نام
          </button>
          <button
            type="button"
            aria-label="منو"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-lp-border bg-lp-surface text-lp-muted backdrop-blur-md transition-all hover:border-lp-gold/60 hover:text-lp-gold active:scale-95 lg:hidden">
            {menuOpen ? (
              <XIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-lp-border bg-lp-surface-strong/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-lp-text transition-colors hover:bg-lp-gold-soft hover:text-lp-gold">
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setAuthOpen(true);
              }}
              className="lp-gold-gradient mt-2 flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-lp-on-gold md:hidden">
              <UserIcon className="h-4 w-4" />
              ورود / ثبت‌نام
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

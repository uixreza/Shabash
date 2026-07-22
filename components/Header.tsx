"use client";

import { useState } from "react";
import { useTheme } from "@/components/Wrapper";
import statesCities from "@/data/states-cities.json";
import AuthModal from "./AuthModal";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-primary/10 bg-background/80 px-6 py-3 backdrop-blur-md">
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <div className="flex items-center gap-2">
        <button
          onClick={() => setAuthOpen(true)}
          className="flex items-center gap-1.5 rounded-xl border-2 border-primary bg-primary/15 px-3 py-2 text-sm font-medium text-primary shadow-sm transition-all hover:bg-primary/25 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          ورود
        </button>
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
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/30 text-foreground transition-all hover:bg-primary/10 hover:border-primary/50 active:scale-95"
      >
        {theme === "dark" ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" /><line x1="12" x2="12" y1="1" y2="3" /><line x1="12" x2="12" y1="21" y2="23" /><line x1="4.22" x2="5.64" y1="4.22" y2="5.64" /><line x1="18.36" x2="19.78" y1="18.36" y2="19.78" /><line x1="1" x2="3" y1="12" y2="12" /><line x1="21" x2="23" y1="12" y2="12" /><line x1="4.22" x2="5.64" y1="19.78" y2="18.36" /><line x1="18.36" x2="19.78" y1="5.64" y2="4.22" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
    </header>
  );
}

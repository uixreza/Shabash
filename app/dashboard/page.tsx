"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import Onboarding from "@/components/Onboarding";

export default function DashboardPage() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const done = localStorage.getItem("shabash-onboarding");
    setShowOnboarding(!done);
    setReady(true);
  }, []);

  function handleComplete() {
    localStorage.setItem("shabash-onboarding", "1");
    setShowOnboarding(false);
  }

  if (!ready) return null;

  return (
    <>
      {showOnboarding && <Onboarding onComplete={handleComplete} />}
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="mx-auto max-w-4xl">
              <h1 className="text-2xl font-bold text-foreground">خوش آمدید</h1>
              <p className="mt-1 text-sm text-foreground/50">به داشبورد شاباش خوش آمدید</p>
              <p className="mt-4 rounded-xl border border-primary/10 bg-primary/5 px-4 py-3 text-sm text-foreground/60 leading-relaxed">
                برای افزودن برنامه عروسی جدید گزینه <span className="font-medium text-primary">برنامه عروسی</span> را انتخاب کنید. پیگیری تغییرات در بخش <span className="font-medium text-primary">وضعیت درخواست‌ها</span> قابل مشاهده است.
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

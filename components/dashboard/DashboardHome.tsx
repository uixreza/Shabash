"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Onboarding from "@/components/Onboarding";
import {
  REQUEST_STATUS_LABELS,
  type RequestStatus,
  type WeddingRequest,
} from "@/data/requests";
import { toFaDigits } from "@/lib/format";

function statusColor(status: RequestStatus) {
  switch (status) {
    case "submitted":
      return "bg-sky-100 text-sky-700";
    case "under_review":
      return "bg-amber-100 text-amber-700";
    case "consultation_scheduled":
      return "bg-primary/15 text-primary";
    case "consultation_completed":
      return "bg-green-100 text-green-700";
  }
}

function buildStats(requests: WeddingRequest[]) {
  return [
    {
      label: "کل درخواست‌ها",
      value: requests.length,
      icon: (
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
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
        </svg>
      ),
    },
    {
      label: "در حال بررسی",
      value: requests.filter((r) => r.status === "under_review").length,
      icon: (
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
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      label: "مشاوره‌های رزروشده",
      value: requests.filter((r) => r.status === "consultation_scheduled")
        .length,
      icon: (
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
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
    {
      label: "تیکت‌های باز",
      value: 2,
      icon: (
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
          <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
          <path d="M13 5v2" />
          <path d="M13 17v2" />
          <path d="M13 11v2" />
        </svg>
      ),
    },
  ];
}

export default function DashboardHome({
  requests,
}: {
  requests: WeddingRequest[];
}) {
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

  const stats = buildStats(requests);

  return (
    <>
      {showOnboarding && <Onboarding onComplete={handleComplete} />}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold text-foreground">خوش آمدید</h1>
          <p className="mt-1 text-sm text-foreground/50">
            به داشبورد شاباشچی خوش آمدید
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-primary/10 bg-primary/[0.02] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground/50">
                    {stat.label}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {stat.icon}
                  </span>
                </div>
                <p className="mt-3 text-2xl font-bold text-foreground">
                  {toFaDigits(stat.value)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-primary/10 bg-primary/[0.02] p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-foreground">
                آخرین درخواست‌ها
              </h2>
              <Link
                href="/dashboard/requests"
                className="text-xs font-medium text-primary transition-colors hover:text-primary/80">
                مشاهده همه
              </Link>
            </div>
            <div className="mt-3 divide-y divide-primary/5">
              {requests.length === 0 ? (
                <p className="py-4 text-center text-sm text-foreground/50">
                  هنوز درخواستی ثبت نکرده‌اید
                </p>
              ) : (
                requests.map((request) => (
                  <Link
                    key={request.id}
                    href={`/dashboard/requests/${request.id}`}
                    className="flex items-center justify-between gap-3 py-3 transition-colors hover:bg-primary/[0.03]">
                    <div className="flex items-center gap-3">
                      <span className="rounded-lg bg-primary/[0.06] px-2.5 py-1 font-mono text-xs font-semibold tracking-wide text-primary">
                        {request.id}
                      </span>
                      <span className="text-sm text-foreground/70">
                        {request.groomName} و {request.brideName}
                      </span>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor(request.status)}`}>
                      {REQUEST_STATUS_LABELS[request.status]}
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>

          <p className="mt-6 rounded-xl border border-primary/10 bg-primary/5 px-4 py-3 text-sm text-foreground/60 leading-relaxed">
            برای افزودن عروسی جدید گزینه{" "}
            <span className="font-medium text-primary">درخواست‌ها</span> را
            انتخاب کنید. جزئیات و وضعیت هر درخواست در همان بخش قابل مشاهده است.
          </p>
        </div>
      </main>
    </>
  );
}

import Link from "next/link";

export default function DashboardHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-primary/10 bg-background/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
          ع
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">علی رضایی</p>
          <p className="text-[11px] text-foreground/40">کاربر</p>
        </div>
      </div>

      <Link href="/dashboard/tickets" className="flex items-center gap-2 rounded-xl border border-primary/20 px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-primary/10 hover:border-primary/40 active:scale-95">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        تیکت‌ها
      </Link>
    </header>
  );
}

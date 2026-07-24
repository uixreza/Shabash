export default function RequestsPage() {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold text-foreground">وضعیت درخواست‌ها</h1>
        <p className="mt-1 text-sm text-foreground/50">پیگیری وضعیت درخواست‌های ثبت شده</p>

        <div className="mt-6 space-y-3">
          {[
            { service: "رزرو تالار", provider: "تالار پردیس", date: "۱۴۰۵/۰۵/۱۲", status: "تأیید شده" },
            { service: "عکاسی", provider: "استودیو نور", date: "۱۴۰۵/۰۵/۲۰", status: "در حال بررسی" },
            { service: "موسیقی", provider: "گروه آوای دل", date: "۱۴۰۵/۰۶/۰۱", status: "لغو شده" },
          ].map((req, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl border border-primary/10 bg-background/60 p-4 transition-all hover:border-primary/20 hover:shadow-sm">
              <div className="flex items-center gap-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                  req.status === "تأیید شده" ? "bg-green-100 text-green-700" :
                  req.status === "در حال بررسی" ? "bg-amber-100 text-amber-700" :
                  "bg-red-100 text-red-600"
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{req.service}</p>
                  <p className="text-xs text-foreground/40">{req.provider} • {req.date}</p>
                </div>
              </div>
              <span className={`rounded-lg px-2.5 py-1 text-[11px] font-medium ${
                req.status === "تأیید شده" ? "bg-green-100 text-green-700" :
                req.status === "در حال بررسی" ? "bg-amber-100 text-amber-700" :
                "bg-red-100 text-red-600"
              }`}>
                {req.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";

export default function SchedulePage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-2xl font-bold text-foreground">برنامه عروسی</h1>
            <p className="mt-1 text-sm text-foreground/50">مراحل برنامه‌ریزی عروسی خود را مدیریت کنید</p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                { step: "۱", title: "رزرو تالار", desc: "انتخاب و رزرو تالار مورد نظر", done: true },
                { step: "۲", title: "عکاسی", desc: "انتخاب عکاس و ثبت زمان", done: false },
                { step: "۳", title: "موسیقی", desc: "انتخاب گروه موسیقی", done: false },
                { step: "۴", title: "آرایشگاه", desc: "رزرو آرایشگاه عروس و داماد", done: false },
              ].map((item, i) => (
                <div key={i} className={`rounded-xl border p-4 transition-all ${
                  item.done
                    ? "border-primary/20 bg-primary/5"
                    : "border-primary/10 bg-background/60 hover:border-primary/20 hover:shadow-sm"
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                      item.done
                        ? "bg-primary text-white"
                        : "border border-primary/30 text-primary"
                    }`}>
                      {item.done ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : item.step}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-foreground/40">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

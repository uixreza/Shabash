"use client";

export default function AccountPage() {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="mx-auto max-w-2xl">
            <h1 className="text-2xl font-bold text-foreground">حساب کاربری</h1>
            <p className="mt-1 text-sm text-foreground/50">اطلاعات شخصی خود را تکمیل کنید</p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground/60">نام و نام خانوادگی</label>
                <input
                  type="text"
                  placeholder="مثال: علی رضایی"
                  className="w-full rounded-xl border border-primary/20 bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-foreground/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground/60">شماره موبایل</label>
                <input
                  type="tel"
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  className="w-full rounded-xl border border-primary/20 bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-foreground/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground/60">کد ملی</label>
                <input
                  type="text"
                  placeholder="۱۰ رقمی"
                  className="w-full rounded-xl border border-primary/20 bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-foreground/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground/60">تاریخ تولد</label>
                <input
                  type="text"
                  placeholder="مثال: ۱۳۷۵/۰۶/۱۵"
                  className="w-full rounded-xl border border-primary/20 bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-foreground/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <button className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-white transition-all hover:bg-primary/90 active:scale-[0.98]">
                ذخیره اطلاعات
              </button>
            </div>
          </div>
        </main>
  );
}

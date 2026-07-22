import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden bg-background">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-primary/8 blur-[100px]" />
        <div className="absolute top-1/3 left-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[90px]" />
      </div>

      <main className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        <span className="text-8xl font-black tracking-tight text-primary/20 md:text-9xl">۴۰۴</span>

        <h1 className="-mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          صفحه مورد نظر یافت نشد
        </h1>

        <p className="max-w-md text-lg text-foreground/60">
          صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
        </p>

        <Link
          href="/"
          className="mt-2 rounded-xl border border-primary/30 px-6 py-3 text-sm font-medium text-primary transition-all hover:bg-primary/10 hover:border-primary/50 active:scale-95"
        >
          بازگشت به صفحه اصلی
        </Link>
      </main>
    </div>
  );
}

import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function About() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden bg-background">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-primary/8 blur-[100px]" />
        <div className="absolute top-1/3 left-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[90px]" />
      </div>

      <main className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">درباره شاباش</h1>

        <p className="max-w-lg text-lg leading-relaxed text-foreground/70 md:text-xl">
          شاباش تیمی است مستقر در خراسان شمالی، بجنورد که به زوج‌ها کمک می‌کند به راحتی مراسم عروسی خود را مدیریت کنند و دیگر نگران سردرگمی‌های آن نباشند.
        </p>

        <Link href="/" className="mt-4 rounded-xl border border-primary/30 px-6 py-3 text-sm font-medium text-primary transition-all hover:bg-primary/10 hover:border-primary/50 active:scale-95">
          بازگشت به صفحه اصلی
        </Link>
      </main>

      <Navbar />
    </div>
  );
}

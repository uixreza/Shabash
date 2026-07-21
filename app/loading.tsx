export default function Loading() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6 overflow-hidden bg-background">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-primary/8 blur-[100px]" />
        <div className="absolute top-1/3 left-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[90px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
        <p className="text-sm text-foreground/50">در حال بارگذاری...</p>
      </div>
    </div>
  );
}

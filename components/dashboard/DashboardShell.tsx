import DashboardHeader from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardShell({
  area,
  children,
}: {
  area: "user" | "admin";
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-y-hidden">
      <Sidebar area={area} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader area={area} />
        {children}
      </div>
    </div>
  );
}

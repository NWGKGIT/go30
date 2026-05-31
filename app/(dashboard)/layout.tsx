import { getAuthUser, ensureDayProgressRecords } from "@/lib/auth";
import Sidebar from "@/components/shell/Sidebar";
import BottomNav from "@/components/shell/BottomNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUser();
  await ensureDayProgressRecords(user.id);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <Sidebar streak={user.streak} xp={user.xp} />

      {/* Main content */}
      <main className="md:pl-[240px] min-h-screen pb-16 md:pb-0">
        {/* Mobile top bar */}
        <header className="md:hidden sticky top-0 z-30 bg-background border-b border-surface-border flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent-blue rounded flex items-center justify-center">
              <span className="text-white font-black text-xs">g</span>
            </div>
            <span className="font-black text-text-primary text-base">go30</span>
          </div>
          <div className="flex items-center gap-3 text-text-secondary text-xs">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-accent-coral">
                local_fire_department
              </span>
              {user.streak}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-accent-purple">
                military_tech
              </span>
              {user.xp.toLocaleString()}
            </span>
          </div>
        </header>

        <div className="max-w-[900px] mx-auto px-4 md:px-6 py-6">
          {children}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <BottomNav />
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/actions/auth";
import { Icons, Icon, IconName } from "@/components/ui/icons";

interface NavItem {
  href: string;
  label: string;
  icon: IconName;
}

const navItems: NavItem[] = [
  { href: "/", label: "Dashboard", icon: "dashboard" },
  { href: "/roadmap", label: "Roadmap", icon: "map" },
  { href: "/journal", label: "Journal", icon: "edit_note" },
];

interface SidebarProps {
  streak: number;
  xp: number;
}

export default function Sidebar({ streak, xp }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex fixed left-0 top-0 h-full w-[240px] bg-surface border-r border-surface-border flex-col justify-between py-6 z-40">
      {/* Top: Logo + Nav */}
      <div>
        {/* Logo */}
        <div className="px-5 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-accent-blue rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-sm">g</span>
            </div>
            <div>
              <div className="font-black text-text-primary text-base leading-none">
                go30
              </div>
              <div className="text-text-muted text-2xs leading-none mt-0.5">
                Learning Tracker
              </div>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <ul className="flex flex-col gap-0.5 px-3">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={isActive ? "nav-link-active" : "nav-link"}
                >
                  <Icon
                    name={item.icon}
                    size={20}
                    fill={isActive}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom: Stats + Logout */}
      <div className="px-5">
        <div className="border-t border-surface-border pt-4 mb-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-text-secondary text-xs">
            <Icons.local_fire_department size={16} className="text-accent-coral" />
            <span>
              Streak:{" "}
              <span className="text-text-primary font-semibold">
                {streak} days
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-text-secondary text-xs">
            <Icons.military_tech size={16} className="text-accent-purple" fill />
            <span>
              XP:{" "}
              <span className="text-text-primary font-semibold">
                {xp.toLocaleString()}
              </span>
            </span>
          </div>
        </div>

        <form action={signOut}>
          <button
            type="submit"
            className="w-full btn-outline text-xs py-1.5 text-center flex items-center justify-center gap-2"
          >
            <Icons.logout size={14} />
            Logout
          </button>
        </form>
      </div>
    </nav>
  );
}

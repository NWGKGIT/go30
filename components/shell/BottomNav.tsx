"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard", icon: "dashboard" },
  { href: "/roadmap", label: "Roadmap", icon: "map" },
  { href: "/journal", label: "Journal", icon: "edit_note" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 w-full bg-surface border-t border-surface-border flex justify-around items-center h-16 z-50">
      {navItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors ${
              isActive
                ? "text-accent-blue"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            {isActive && (
              <div className="absolute top-0 w-8 h-0.5 bg-accent-blue rounded-b-full" />
            )}
            <span
              className="material-symbols-outlined text-[22px]"
              style={{
                fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              {item.icon}
            </span>
            <span className="text-2xs font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

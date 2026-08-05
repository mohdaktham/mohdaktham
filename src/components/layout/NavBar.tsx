"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseIcon, SearchIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/search", label: "Search", icon: SearchIcon },
  { href: "/tracker", label: "Tracker", icon: BriefcaseIcon },
] as const;

export function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/search" className="text-base font-semibold tracking-tight">
          Job Tracker
        </Link>
        <nav className="flex items-center gap-1">
          {LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

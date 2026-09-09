"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BookOpen,
  Calendar,
  CalendarClock,
  ExternalLink,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Mail,
  Newspaper,
  Sparkles,
  User,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
  },
  {
    label: "News",
    href: "/admin/blog",
    icon: Newspaper,
  },
  {
    label: "Books",
    href: "/admin/books",
    icon: BookOpen,
  },
  {
    label: "Consultations",
    href: "/admin/consultations",
    icon: Calendar,
  },
  {
    label: "Schedule",
    href: "/admin/schedule",
    icon: CalendarClock,
  },
  {
    label: "Messages",
    href: "/admin/messages",
    icon: Mail,
  },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [badgeCounts, setBadgeCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/auth/me")
      .then((response) => response.json())
      .then((data) => setEmail(data.email || null))
      .catch(() => setEmail(null));
  }, []);

  useEffect(() => {
    const loadCount = async (href: string, endpoint: string, key: string) => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) return;
        const data = await response.json();
        const items: { status: string }[] = data[key] || [];
        const count = items.filter((item) => item.status === "new").length;
        setBadgeCounts((current) => ({ ...current, [href]: count }));
      } catch {
        setBadgeCounts((current) => ({ ...current, [href]: 0 }));
      }
    };

    loadCount("/admin/messages", "/api/admin/messages", "messages");
    loadCount("/admin/consultations", "/api/admin/consultations", "consultations");
    loadCount("/admin/schedule", "/api/admin/schedule", "requests");
  }, [pathname]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  const activeItem = navItems.find((item) => item.href === pathname) || navItems[0];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <aside className="fixed inset-y-0 left-0 z-40 block w-20 border-r border-border bg-card md:w-64">
          <div className="flex h-full flex-col">
            <div className="border-b border-border p-3 md:p-5">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-bold leading-tight">Admin Panel</p>
                  <p className="text-xs text-muted-foreground">Content Dashboard</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 space-y-1 p-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;

                const count = badgeCounts[item.href] || 0;
                const showBadge = count > 0;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex min-h-11 items-center justify-center gap-3 rounded-lg px-3 text-sm font-semibold transition md:justify-start ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                    title={item.label}
                  >
                    <span className="relative">
                      <Icon className="h-4 w-4" />
                      {showBadge && (
                        <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-destructive text-[8px] font-bold text-destructive-foreground md:hidden">
                          {count > 9 ? "9+" : count}
                        </span>
                      )}
                    </span>
                    <span className="hidden md:inline">{item.label}</span>
                    {showBadge && (
                      <span
                        className={`ml-auto hidden min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-bold md:inline-flex ${
                          active
                            ? "bg-primary-foreground/20 text-primary-foreground"
                            : "bg-destructive text-destructive-foreground"
                        }`}
                      >
                        {count > 99 ? "99+" : count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-border p-3">
              <Link
                href="/"
                target="_blank"
                className="mb-1 flex min-h-11 items-center justify-center gap-3 rounded-lg px-3 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground md:justify-start"
                title="View live site"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="hidden md:inline">View Site</span>
              </Link>
              <button
                onClick={logout}
                className="flex min-h-11 w-full items-center justify-center gap-3 rounded-lg px-3 text-sm font-semibold text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive md:justify-start"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        <div className="flex min-h-screen w-full flex-col pl-20 md:pl-64">
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur md:px-8">
            <p className="text-sm font-semibold text-foreground">{activeItem.label}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="hidden sm:inline">{email || "Admin"}</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User className="h-4 w-4" />
              </span>
            </div>
          </header>

          <div className="flex-1 px-4 py-8 md:px-8 lg:px-10">{children}</div>
        </div>
      </div>
    </main>
  );
}

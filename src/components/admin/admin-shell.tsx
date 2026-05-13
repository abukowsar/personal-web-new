"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Newspaper,
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
    label: "Blog",
    href: "/admin/blog",
    icon: Newspaper,
  },
  {
    label: "Books",
    href: "/admin/books",
    icon: BookOpen,
  },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <aside className="fixed inset-y-0 left-0 z-40 block w-20 border-r border-border bg-card md:w-64">
          <div className="flex h-full flex-col">
            <div className="border-b border-border p-3 md:p-5">
              <div className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary md:justify-start">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:inline">Admin Panel</span>
              </div>
              <h1 className="mt-2 hidden text-xl font-bold md:block">
                Content Dashboard
              </h1>
            </div>

            <nav className="flex-1 space-y-1 p-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex min-h-11 items-center justify-center gap-3 rounded-lg px-3 text-sm font-semibold transition md:justify-start ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                    title={item.label}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden md:inline">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-border p-3">
              <button
                onClick={logout}
                className="flex min-h-11 w-full items-center justify-center gap-3 rounded-lg px-3 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground md:justify-start"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        <div className="flex min-h-screen w-full flex-col pl-20 md:pl-64">
          <div className="flex-1 px-4 py-8 md:px-8 lg:px-10">{children}</div>
        </div>
      </div>
    </main>
  );
}

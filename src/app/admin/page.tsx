"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  FolderKanban,
  LayoutDashboard,
  Newspaper,
  Pencil,
} from "lucide-react";
import AdminShell from "@/components/admin/admin-shell";

const dashboardCards = [
  {
    label: "Projects",
    href: "/admin/projects",
    type: "projects",
    icon: FolderKanban,
    description: "Manage portfolio projects and homepage project cards.",
  },
  {
    label: "Blog",
    href: "/admin/blog",
    type: "blog",
    icon: Newspaper,
    description: "Manage blog posts and news cards.",
  },
  {
    label: "Books",
    href: "/admin/books",
    type: "books",
    icon: BookOpen,
    description: "Manage publications, book metadata, and links.",
  },
];

type QuickItem = {
  id: string;
  title: string;
  category?: string;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [quickLists, setQuickLists] = useState<Record<string, QuickItem[]>>({});

  useEffect(() => {
    const loadDashboard = async () => {
      const authResponse = await fetch("/api/auth/me");
      const authData = await authResponse.json();

      if (!authData.authenticated) {
        router.push("/login");
        return;
      }

      const nextCounts: Record<string, number> = {};
      const nextQuickLists: Record<string, QuickItem[]> = {};

      await Promise.all(
        dashboardCards.map(async (card) => {
          const response = await fetch(`/api/admin/content/${card.type}`);

          if (response.ok) {
            const data = await response.json();
            nextCounts[card.type] = data.items?.length || 0;
            nextQuickLists[card.type] = data.items || [];
          }
        })
      );

      setCounts(nextCounts);
      setQuickLists(nextQuickLists);
      setCheckingAuth(false);
    };

    loadDashboard();
  }, [router]);

  if (checkingAuth) {
    return <p className="text-sm text-muted-foreground">Checking admin session...</p>;
  }

  return (
    <AdminShell>
      <header className="mb-8 border-b border-border pb-6">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
          <LayoutDashboard className="h-4 w-4" />
          Admin Dashboard
        </div>
        <h1 className="mt-2 text-3xl font-bold">Content Management</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Use the sidebar to manage projects, blog posts, and books from their
          dedicated pages.
        </p>
      </header>

      <div className="grid gap-4 xl:grid-cols-3">
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          const items = quickLists[card.type] || [];

          return (
            <section
              key={card.href}
              className="rounded-lg border border-border bg-card p-5"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-background px-3 py-1 text-sm font-semibold text-muted-foreground">
                  {counts[card.type] || 0}
                </span>
              </div>
              <h2 className="text-xl font-bold">{card.label}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {card.description}
              </p>

              <div className="mt-5 divide-y divide-border rounded-lg border border-border bg-background">
                {items.length === 0 ? (
                  <p className="px-3 py-4 text-sm text-muted-foreground">
                    No {card.label.toLowerCase()} found.
                  </p>
                ) : (
                  items.slice(0, 6).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 px-3 py-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.category || "General"}
                        </p>
                      </div>
                      <Link
                        href={`${card.href}?edit=${item.id}`}
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-primary transition hover:bg-primary/10"
                        aria-label={`Edit ${item.title}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </div>
                  ))
                )}
              </div>

              <Link
                href={card.href}
                className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Manage {card.label}
              </Link>
            </section>
          );
        })}
      </div>
    </AdminShell>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Database,
  FolderKanban,
  LayoutDashboard,
  Newspaper,
  Pencil,
  RefreshCw,
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
    label: "News",
    href: "/admin/blog",
    type: "blog",
    icon: Newspaper,
    description: "Manage news posts and homepage news cards.",
  },
  {
    label: "Books",
    href: "/admin/books",
    type: "books",
    icon: BookOpen,
    description: "Manage publications, book metadata, and links.",
  },
  {
    label: "Models",
    href: "/admin/models",
    type: "models",
    icon: BrainCircuit,
    description: "Manage AI/ML models shown in the homepage Models section.",
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
  const [refreshing, setRefreshing] = useState(false);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [quickLists, setQuickLists] = useState<Record<string, QuickItem[]>>({});
  const [loadErrors, setLoadErrors] = useState<string[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      setRefreshing(true);

      try {
        const authResponse = await fetch("/api/auth/me");
        const authData = await authResponse.json();

        if (!authData.authenticated) {
          router.push("/login");
          return;
        }

        const nextCounts: Record<string, number> = {};
        const nextQuickLists: Record<string, QuickItem[]> = {};
        const nextErrors: string[] = [];

        await Promise.all(
          dashboardCards.map(async (card) => {
            try {
              const response = await fetch(`/api/admin/content/${card.type}`);
              const data = await response.json();

              if (!response.ok) {
                throw new Error(data.message || `Unable to load ${card.label}`);
              }

              nextCounts[card.type] = data.items?.length || 0;
              nextQuickLists[card.type] = data.items || [];
            } catch (error) {
              nextErrors.push(error instanceof Error ? error.message : `Unable to load ${card.label}`);
            }
          })
        );

        setCounts(nextCounts);
        setQuickLists(nextQuickLists);
        setLoadErrors(nextErrors);
        setLastUpdated(new Date());
      } catch {
        setLoadErrors(["The admin dashboard could not connect to the content API."]);
      } finally {
        setCheckingAuth(false);
        setRefreshing(false);
      }
    };

    loadDashboard();
  }, [router]);

  if (checkingAuth) {
    return <p className="text-sm text-muted-foreground">Checking admin session...</p>;
  }

  return (
    <AdminShell>
      <header className="mb-8 flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
            <LayoutDashboard className="h-4 w-4" />
            Admin Dashboard
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Content Management</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Manage the live projects, news, and publications stored in MongoDB.
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={() => window.location.reload()}
            disabled={refreshing}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm font-semibold transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh data
          </button>
          {lastUpdated && (
            <p className="text-xs text-muted-foreground">
              Last updated {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
      </header>

      <div className={`mb-6 flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${loadErrors.length ? "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200" : "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200"}`}>
        {loadErrors.length ? <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" /> : <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />}
        <div>
          <p className="font-semibold">{loadErrors.length ? "MongoDB data is unavailable" : "MongoDB content is connected"}</p>
          <p className="mt-1 opacity-80">
            {loadErrors.length ? loadErrors.join(" ") : "Your changes are being read from the live content collections."}
          </p>
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between text-muted-foreground"><span className="text-sm">Total records</span><Database className="h-4 w-4" /></div>
          <p className="mt-2 text-2xl font-bold">{Object.values(counts).reduce((total, count) => total + count, 0)}</p>
          <p className="mt-1 text-xs text-muted-foreground">Across managed collections</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between text-muted-foreground"><span className="text-sm">Collections</span><LayoutDashboard className="h-4 w-4" /></div>
          <p className="mt-2 text-2xl font-bold">{dashboardCards.length}</p>
          <p className="mt-1 text-xs text-muted-foreground">Projects, news, and books</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between text-muted-foreground"><span className="text-sm">Connection</span><Database className="h-4 w-4" /></div>
          <p className="mt-2 text-2xl font-bold">{loadErrors.length ? "Offline" : "Online"}</p>
          <p className="mt-1 text-xs text-muted-foreground">Admin API health</p>
        </div>
      </div>

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

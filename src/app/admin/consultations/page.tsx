"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Phone,
  RefreshCw,
  Reply,
  Trash2,
  X,
} from "lucide-react";
import AdminShell from "@/components/admin/admin-shell";

type Consultation = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
  status: "new" | "contacted" | "scheduled" | "completed";
  createdAt: string;
};

const statusStyles: Record<Consultation["status"], string> = {
  new: "bg-primary/10 text-primary",
  contacted: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
  scheduled: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
  completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
};

const statusLabels: Record<Consultation["status"], string> = {
  new: "New",
  contacted: "Contacted",
  scheduled: "Scheduled",
  completed: "Completed",
};

export default function AdminConsultationsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [viewing, setViewing] = useState<Consultation | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Consultation | null>(null);

  const notify = (text: string, type: "success" | "error") => setNotice({ text, type });

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 4500);
    return () => clearTimeout(timer);
  }, [notice]);

  const loadConsultations = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/admin/consultations");

      if (response.status === 401) {
        router.push("/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load consultations");
      }

      setConsultations(data.consultations || []);
    } catch (error) {
      notify(error instanceof Error ? error.message : "Unable to load consultations", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/auth/me");
      const data = await response.json();

      if (!data.authenticated) {
        router.push("/login");
        return;
      }

      loadConsultations();
    };

    checkAuth();
  }, [router]);

  const updateStatus = async (id: string, status: Consultation["status"]) => {
    const response = await fetch(`/api/admin/consultations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (response.ok) {
      const data = await response.json();
      setConsultations((current) =>
        current.map((item) => (item.id === id ? data.consultation : item))
      );

      if (viewing?.id === id) {
        setViewing(data.consultation);
      }
    }
  };

  const openConsultation = (item: Consultation) => {
    setViewing(item);

    if (item.status === "new") {
      updateStatus(item.id, "contacted");
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const target = deleteTarget;
    setDeleteTarget(null);

    try {
      const response = await fetch(`/api/admin/consultations/${target.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Consultation could not be deleted");
      }

      setConsultations((current) => current.filter((item) => item.id !== target.id));

      if (viewing?.id === target.id) {
        setViewing(null);
      }

      notify("Consultation deleted", "success");
    } catch (error) {
      notify(error instanceof Error ? error.message : "Consultation could not be deleted", "error");
    }
  };

  const filteredConsultations = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) return consultations;

    return consultations.filter((item) =>
      [item.name, item.email, item.service, item.company, item.message]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedSearch))
    );
  }, [consultations, search]);

  const newCount = consultations.filter((item) => item.status === "new").length;

  return (
    <AdminShell>
      <header className="mb-8 border-b border-border pb-6">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
          <Calendar className="h-4 w-4" />
          Bookings
        </div>
        <h1 className="mt-2 text-3xl font-bold">Consultations</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Requests submitted through the &quot;Book a Consultation&quot; form on the homepage, stored in MongoDB.
        </p>
      </header>

      {notice && (
        <div
          className={`mb-6 flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${
            notice.type === "success"
              ? "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200"
              : "border-destructive/30 bg-destructive/10 text-destructive"
          }`}
        >
          {notice.type === "success" ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          )}
          {notice.text}
        </div>
      )}

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">
            {filteredConsultations.length} of {consultations.length} requests
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{newCount} new</p>
        </div>
        <div className="flex gap-2">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search consultations"
            aria-label="Search consultations"
            className="min-h-10 w-52 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <button
            onClick={loadConsultations}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm font-semibold transition hover:bg-muted"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Requester</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Received</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <tr key={index} className="border-b border-border last:border-0">
                  {Array.from({ length: 6 }).map((__, cell) => (
                    <td key={cell} className="px-4 py-4">
                      <div className="h-4 animate-pulse rounded bg-muted" />
                    </td>
                  ))}
                </tr>
              ))
            ) : filteredConsultations.length === 0 ? (
              <tr>
                <td className="px-4 py-10 text-center text-muted-foreground" colSpan={6}>
                  {consultations.length === 0
                    ? "No consultation requests yet."
                    : "No matching requests found."}
                </td>
              </tr>
            ) : (
              filteredConsultations.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => openConsultation(item)}
                  className={`cursor-pointer border-b border-border last:border-0 hover:bg-muted/30 ${
                    item.status === "new" ? "bg-primary/5" : ""
                  }`}
                >
                  <td className="max-w-[200px] px-4 py-3">
                    <p className="truncate font-semibold">{item.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{item.email}</p>
                  </td>
                  <td className="max-w-[180px] truncate px-4 py-3">{item.service}</td>
                  <td className="max-w-[160px] truncate px-4 py-3 text-muted-foreground">
                    {item.company || "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[item.status]}`}
                    >
                      {statusLabels[item.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        setDeleteTarget(item);
                      }}
                      aria-label={`Delete consultation request from ${item.name}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-destructive transition hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {viewing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          role="dialog"
          aria-modal="true"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setViewing(null);
          }}
        >
          <div className="w-full max-w-lg rounded-lg border border-border bg-card p-6 shadow-lg">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{viewing.service}</h3>
                  <p className="text-sm text-muted-foreground">
                    {viewing.name} &lt;{viewing.email}&gt;
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(viewing.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewing(null)}
                aria-label="Close consultation request"
                className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{viewing.phone || "Not provided"}</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{viewing.company || "Not provided"}</span>
              </div>
            </div>

            <div className="mb-4 flex items-center gap-2 text-sm">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{viewing.service}</span>
            </div>

            <div className="max-h-[40vh] overflow-y-auto whitespace-pre-line rounded-lg border border-border bg-background p-4 text-sm">
              {viewing.message}
            </div>

            <div className="mt-5 flex items-center gap-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Status
              </label>
              <select
                value={viewing.status}
                onChange={(event) =>
                  updateStatus(viewing.id, event.target.value as Consultation["status"])
                }
                className="min-h-9 flex-1 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="mt-4 flex gap-3">
              <a
                href={`mailto:${viewing.email}?subject=${encodeURIComponent(`Re: Consultation Request - ${viewing.service}`)}`}
                className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <Reply className="h-4 w-4" />
                Reply by Email
              </a>
              <button
                onClick={() => setDeleteTarget(viewing)}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm font-semibold text-destructive transition hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-sm rounded-lg border border-border bg-card p-5 shadow-lg">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
              <Trash2 className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold">Delete this request?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The consultation request from <span className="font-semibold text-foreground">{deleteTarget.name}</span> will be permanently removed from MongoDB.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="inline-flex min-h-10 flex-1 items-center justify-center rounded-lg border border-border text-sm font-semibold transition hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="inline-flex min-h-10 flex-1 items-center justify-center rounded-lg bg-destructive text-sm font-semibold text-destructive-foreground transition hover:opacity-90"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

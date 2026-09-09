"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  Mail,
  MailOpen,
  RefreshCw,
  Reply,
  Trash2,
  X,
} from "lucide-react";
import AdminShell from "@/components/admin/admin-shell";

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
};

export default function AdminMessagesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [viewing, setViewing] = useState<Message | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Message | null>(null);

  const notify = (text: string, type: "success" | "error") => setNotice({ text, type });

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 4500);
    return () => clearTimeout(timer);
  }, [notice]);

  const loadMessages = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/admin/messages");

      if (response.status === 401) {
        router.push("/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load messages");
      }

      setMessages(data.messages || []);
    } catch (error) {
      notify(error instanceof Error ? error.message : "Unable to load messages", "error");
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

      loadMessages();
    };

    checkAuth();
  }, [router]);

  const updateStatus = async (id: string, status: Message["status"]) => {
    const response = await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (response.ok) {
      const data = await response.json();
      setMessages((current) => current.map((item) => (item.id === id ? data.message : item)));
    }
  };

  const openMessage = (item: Message) => {
    setViewing(item);

    if (item.status === "new") {
      updateStatus(item.id, "read");
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const target = deleteTarget;
    setDeleteTarget(null);

    try {
      const response = await fetch(`/api/admin/messages/${target.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Message could not be deleted");
      }

      setMessages((current) => current.filter((item) => item.id !== target.id));

      if (viewing?.id === target.id) {
        setViewing(null);
      }

      notify("Message deleted", "success");
    } catch (error) {
      notify(error instanceof Error ? error.message : "Message could not be deleted", "error");
    }
  };

  const filteredMessages = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) return messages;

    return messages.filter((item) =>
      [item.name, item.email, item.subject, item.message]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedSearch))
    );
  }, [messages, search]);

  const unreadCount = messages.filter((item) => item.status === "new").length;

  return (
    <AdminShell>
      <header className="mb-8 border-b border-border pb-6">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
          <Mail className="h-4 w-4" />
          Inbox
        </div>
        <h1 className="mt-2 text-3xl font-bold">Messages</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Submissions from the &quot;Book a Consultation&quot; and &quot;Send Message&quot; forms, stored in MongoDB.
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
            {filteredMessages.length} of {messages.length} messages
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {unreadCount} unread
          </p>
        </div>
        <div className="flex gap-2">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search messages"
            aria-label="Search messages"
            className="min-h-10 w-52 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <button
            onClick={loadMessages}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm font-semibold transition hover:bg-muted"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">From</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Message</th>
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
            ) : filteredMessages.length === 0 ? (
              <tr>
                <td className="px-4 py-10 text-center text-muted-foreground" colSpan={6}>
                  {messages.length === 0
                    ? "No messages yet."
                    : "No matching messages found."}
                </td>
              </tr>
            ) : (
              filteredMessages.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => openMessage(item)}
                  className={`cursor-pointer border-b border-border last:border-0 hover:bg-muted/30 ${
                    item.status === "new" ? "bg-primary/5" : ""
                  }`}
                >
                  <td className="max-w-[200px] px-4 py-3">
                    <p className="truncate font-semibold">{item.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{item.email}</p>
                  </td>
                  <td className="max-w-[200px] truncate px-4 py-3">{item.subject}</td>
                  <td className="max-w-[260px] truncate px-4 py-3 text-muted-foreground">
                    {item.message}
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
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                        item.status === "new"
                          ? "bg-primary/10 text-primary"
                          : item.status === "replied"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {item.status === "new" ? "New" : item.status === "replied" ? "Replied" : "Read"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        setDeleteTarget(item);
                      }}
                      aria-label={`Delete message from ${item.name}`}
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
                  <MailOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{viewing.subject}</h3>
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
                aria-label="Close message"
                className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[50vh] overflow-y-auto whitespace-pre-line rounded-lg border border-border bg-background p-4 text-sm">
              {viewing.message}
            </div>

            <div className="mt-5 flex gap-3">
              <a
                href={`mailto:${viewing.email}?subject=${encodeURIComponent(`Re: ${viewing.subject}`)}`}
                onClick={() => updateStatus(viewing.id, "replied")}
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
            <h3 className="text-lg font-bold">Delete this message?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The message from <span className="font-semibold text-foreground">{deleteTarget.name}</span> will be permanently removed from MongoDB.
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

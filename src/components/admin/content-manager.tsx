"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  FolderKanban,
  ImageIcon,
  Newspaper,
  Plus,
  Pencil,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";
import BookCoverArt from "@/components/book-cover-art";

const COVER_ART_WIDTH = 192;
const COVER_ART_HEIGHT = 256;

export type Section = "projects" | "blog" | "books" | "models";

type Item = {
  id: string;
  title: string;
  description?: string;
  excerpt?: string;
  category?: string;
  year?: string;
  publishYear?: string;
  status?: string;
  tags?: string[];
  featured?: boolean;
  author?: string;
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  date?: string;
  readTime?: string;
  icon?: string;
  color?: string;
  subtitle?: string;
  rating?: number;
  reviews?: number;
  pages?: number;
  language?: string;
  price?: string;
  downloadUrl?: string;
  previewUrl?: string;
  pdfUrl?: string;
  architecture?: string;
  trainingData?: string;
  performance?: string;
  useCase?: string;
};

type AssetImage = {
  name: string;
  path: string;
  url: string;
};

type AssetFile = {
  name: string;
  path: string;
  url: string;
};

const sectionConfig = {
  projects: {
    label: "Projects",
    singular: "Project",
    icon: FolderKanban,
    description: "Add and manage portfolio projects shown on the homepage projects section.",
  },
  blog: {
    label: "News",
    singular: "News Post",
    icon: Newspaper,
    description: "Add and manage news and article cards shown in the News section.",
  },
  books: {
    label: "Books",
    singular: "Book",
    icon: BookOpen,
    description: "Add and manage publication cards shown in the books section.",
  },
  models: {
    label: "Models",
    singular: "Model",
    icon: BrainCircuit,
    description: "Add and manage AI/ML models shown in the homepage Models section.",
  },
};

const emptyForms = {
  projects: {
    title: "",
    description: "",
    tags: "",
    imageUrl: "",
    category: "General",
    year: String(new Date().getFullYear()),
    status: "Live",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  blog: {
    title: "",
    excerpt: "",
    category: "General",
    date: new Date().toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    readTime: "5 min read",
    imageUrl: "",
    icon: "News",
    color: "bg-blue-500",
    featured: true,
  },
  books: {
    title: "",
    subtitle: "",
    author: "Abu Kowsar",
    description: "",
    category: "General",
    rating: "4.8",
    reviews: "0",
    pages: "0",
    language: "English",
    publishYear: String(new Date().getFullYear()),
    price: "$0.00",
    imageUrl: "",
    color: "bg-blue-500",
    icon: "Book",
    downloadUrl: "#",
    previewUrl: "#",
    pdfUrl: "",
    featured: true,
  },
  models: {
    title: "",
    description: "",
    category: "AI/ML",
    architecture: "",
    trainingData: "",
    performance: "",
    useCase: "",
    tags: "",
    imageUrl: "",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
};

export default function ContentManager({ section }: { section: Section }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForms[section]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Item | null>(null);

  const notify = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
  };

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 4500);
    return () => clearTimeout(timer);
  }, [message]);

  const config = useMemo(() => sectionConfig[section], [section]);
  const Icon = config.icon;

  const loadItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/content/${section}`);

      if (response.status === 401) {
        router.push("/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Unable to load ${config.label.toLowerCase()}`);
      }

      const loadedItems = data.items || [];
      setItems(loadedItems);

      const editId = searchParams.get("edit");

      if (editId) {
        const item = loadedItems.find((contentItem: Item) => contentItem.id === editId);

        if (item) {
          startEditing(item, false);
        }
      }
    } catch (error) {
      notify(error instanceof Error ? error.message : "Unable to load content", "error");
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

      loadItems();
    };

    checkAuth();
  }, [router, section, searchParams]);

  const updateForm = (key: string, value: string | boolean) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch(
        editingId
          ? `/api/admin/content/${section}/${editingId}`
          : `/api/admin/content/${section}`,
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        notify(data.message || "Item could not be saved", "error");
        return;
      }

      if (editingId) {
        setItems((current) =>
          current.map((item) => (item.id === editingId ? data.item : item))
        );
        notify(`${config.singular} updated successfully`, "success");
        cancelEditing();
      } else {
        setItems((current) => [data.item, ...current]);
        setForm(emptyForms[section]);
        notify(`${config.singular} saved successfully`, "success");
      }
    } catch {
      notify("Network error: content could not be saved", "error");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const item = deleteTarget;
    setDeleteTarget(null);

    try {
      const response = await fetch(`/api/admin/content/${section}/${item.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Item could not be deleted");
      }

      setItems((current) => current.filter((contentItem) => contentItem.id !== item.id));
      notify(`${config.singular} deleted successfully`, "success");
    } catch (error) {
      notify(error instanceof Error ? error.message : "Item could not be deleted", "error");
    }
  };

  const filteredItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) return items;

    return items.filter((item) =>
      [item.title, item.category, item.description, item.excerpt]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedSearch))
    );
  }, [items, search]);

  const startEditing = (item: Item, updateUrl = true) => {
    setEditingId(item.id);
    setMessage(null);
    setForm(mapItemToForm(section, item));

    if (updateUrl) {
      router.replace(`/admin/${section}?edit=${item.id}`, { scroll: false });
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
    setForm(emptyForms[section]);
    router.replace(`/admin/${section}`, { scroll: false });
  };

  return (
    <div>
      <header className="mb-8 border-b border-border pb-6">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
          <Icon className="h-4 w-4" />
          Manage {config.label}
        </div>
        <h1 className="mt-2 text-3xl font-bold">{config.label}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {config.description}
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[390px_1fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-border bg-card p-5"
        >
          <div className="mb-5 flex items-center gap-3">
            <Icon className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">
              {editingId ? `Edit ${config.singular}` : `Add ${config.singular}`}
            </h2>
          </div>

          <FormFields active={section} form={form} updateForm={updateForm} />

          {message && (
            <p
              className={`mt-4 flex items-start gap-2 rounded-lg border px-3 py-2 text-sm ${
                message.type === "success"
                  ? "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200"
                  : "border-destructive/30 bg-destructive/10 text-destructive"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              ) : (
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              )}
              {message.text}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Plus className="h-4 w-4" />
            {saving
              ? "Saving..."
              : editingId
                ? `Update ${config.singular}`
                : `Add ${config.singular}`}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={cancelEditing}
              className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm font-semibold transition hover:bg-muted"
            >
              <X className="h-4 w-4" />
              Cancel Edit
            </button>
          )}
        </form>

        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">{config.label} Table</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Showing {filteredItems.length} of {items.length}
              </p>
            </div>
            <div className="flex gap-2">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={`Search ${config.label.toLowerCase()}`}
                aria-label={`Search ${config.label.toLowerCase()}`}
                className="min-h-10 w-44 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <button
                onClick={loadItems}
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
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Meta</th>
                  <th className="px-4 py-3">Summary</th>
                  <th className="px-4 py-3">Featured</th>
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
                ) : filteredItems.length === 0 ? (
                  <tr>
                    <td className="px-4 py-10 text-center text-muted-foreground" colSpan={6}>
                      {items.length === 0
                        ? `No ${config.label.toLowerCase()} added yet.`
                        : "No matching content found."}
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                      <td className="max-w-[260px] px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`shrink-0 overflow-hidden rounded-lg border border-border bg-muted ${
                              section === "books" ? "h-14 w-10" : "h-10 w-10"
                            }`}
                          >
                            {item.imageUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={item.imageUrl} alt="" className="h-full w-full object-cover" />
                            ) : section === "books" ? (
                              <div
                                style={{
                                  width: COVER_ART_WIDTH,
                                  height: COVER_ART_HEIGHT,
                                  transform: `scale(${40 / COVER_ART_WIDTH})`,
                                  transformOrigin: "top left",
                                }}
                              >
                                <BookCoverArt
                                  title={item.title}
                                  subtitle={item.subtitle}
                                  author={item.author}
                                  category={item.category}
                                  color={item.color}
                                  icon={item.icon}
                                />
                              </div>
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                <ImageIcon className="h-4 w-4" />
                              </div>
                            )}
                          </div>
                          <span className="truncate font-semibold">{item.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">{item.category || "General"}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {section === "books"
                          ? item.publishYear
                          : section === "projects"
                            ? item.year || item.status
                            : section === "models"
                              ? item.architecture || "—"
                              : item.status || item.author || "Published"}
                      </td>
                      <td className="max-w-[260px] truncate px-4 py-3 text-muted-foreground">
                        {item.excerpt || item.description || item.tags?.join(", ")}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                            item.featured
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {item.featured ? "Featured" : "Standard"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => startEditing(item)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-primary transition hover:bg-primary/10"
                            aria-label={`Edit ${item.title}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(item)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-destructive transition hover:bg-destructive/10"
                            aria-label={`Delete ${item.title}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

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
            <h3 className="text-lg font-bold">Delete {config.singular.toLowerCase()}?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              This will permanently remove <span className="font-semibold text-foreground">{deleteTarget.title}</span> from MongoDB. This cannot be undone.
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
    </div>
  );
}

function mapItemToForm(section: Section, item: Item) {
  if (section === "projects") {
    return {
      title: item.title || "",
      description: item.description || "",
      tags: item.tags?.join(", ") || "",
      imageUrl: item.imageUrl || "",
      category: item.category || "General",
      year: item.year || String(new Date().getFullYear()),
      status: item.status || "Live",
      liveUrl: item.liveUrl || "#",
      githubUrl: item.githubUrl || "#",
      featured: Boolean(item.featured),
    };
  }

  if (section === "blog") {
    return {
      title: item.title || "",
      excerpt: item.excerpt || "",
      category: item.category || "General",
      date: item.date || "",
      readTime: item.readTime || "5 min read",
      imageUrl: item.imageUrl || "",
      icon: item.icon || "News",
      color: item.color || "bg-blue-500",
      featured: Boolean(item.featured),
    };
  }

  if (section === "books") {
    return {
      title: item.title || "",
      subtitle: item.subtitle || "",
      author: item.author || "Abu Kowsar",
      description: item.description || "",
      category: item.category || "General",
      rating: String(item.rating || "4.8"),
      reviews: String(item.reviews || "0"),
      pages: String(item.pages || "0"),
      language: item.language || "English",
      publishYear: item.publishYear || String(new Date().getFullYear()),
      price: item.price || "$0.00",
      imageUrl: item.imageUrl || "",
      color: item.color || "bg-blue-500",
      icon: item.icon || "Book",
      downloadUrl: item.downloadUrl || "#",
      previewUrl: item.previewUrl || "#",
      pdfUrl: item.pdfUrl || "",
      featured: Boolean(item.featured),
    };
  }

  return {
    title: item.title || "",
    description: item.description || "",
    category: item.category || "AI/ML",
    architecture: item.architecture || "",
    trainingData: item.trainingData || "",
    performance: item.performance || "",
    useCase: item.useCase || "",
    tags: item.tags?.join(", ") || "",
    imageUrl: item.imageUrl || "",
    liveUrl: item.liveUrl || "#",
    githubUrl: item.githubUrl || "#",
    featured: Boolean(item.featured),
  };
}

function FormFields({
  active,
  form,
  updateForm,
}: {
  active: Section;
  form: Record<string, string | boolean>;
  updateForm: (key: string, value: string | boolean) => void;
}) {
  if (active === "projects") {
    return (
      <div className="space-y-4">
        <Field label="Title" value={String(form.title)} onChange={(value) => updateForm("title", value)} required />
        <Textarea label="Description" value={String(form.description)} onChange={(value) => updateForm("description", value)} required />
        <Field label="Tags" value={String(form.tags)} onChange={(value) => updateForm("tags", value)} placeholder="React, Node.js, MongoDB" />
        <ImageField value={String(form.imageUrl)} onChange={(value) => updateForm("imageUrl", value)} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Category" value={String(form.category)} onChange={(value) => updateForm("category", value)} />
          <Field label="Year" value={String(form.year)} onChange={(value) => updateForm("year", value)} />
        </div>
        <Field label="Status" value={String(form.status)} onChange={(value) => updateForm("status", value)} />
        <Field label="Live URL" value={String(form.liveUrl)} onChange={(value) => updateForm("liveUrl", value)} />
        <Field label="GitHub URL" value={String(form.githubUrl)} onChange={(value) => updateForm("githubUrl", value)} />
        <Featured checked={Boolean(form.featured)} onChange={(value) => updateForm("featured", value)} />
      </div>
    );
  }

  if (active === "blog") {
    return (
      <div className="space-y-4">
        <Field label="Title" value={String(form.title)} onChange={(value) => updateForm("title", value)} required />
        <Textarea label="Excerpt" value={String(form.excerpt)} onChange={(value) => updateForm("excerpt", value)} required />
        <Field label="Category" value={String(form.category)} onChange={(value) => updateForm("category", value)} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Date" value={String(form.date)} onChange={(value) => updateForm("date", value)} />
          <Field label="Read Time" value={String(form.readTime)} onChange={(value) => updateForm("readTime", value)} />
        </div>
        <ImageField value={String(form.imageUrl)} onChange={(value) => updateForm("imageUrl", value)} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Icon Text" value={String(form.icon)} onChange={(value) => updateForm("icon", value)} />
          <Field label="Color Class" value={String(form.color)} onChange={(value) => updateForm("color", value)} />
        </div>
        <Featured checked={Boolean(form.featured)} onChange={(value) => updateForm("featured", value)} />
      </div>
    );
  }

  if (active === "books") {
    return (
      <div className="space-y-4">
        <Field label="Title" value={String(form.title)} onChange={(value) => updateForm("title", value)} required />
        <Field label="Subtitle" value={String(form.subtitle)} onChange={(value) => updateForm("subtitle", value)} />
        <Field label="Author" value={String(form.author)} onChange={(value) => updateForm("author", value)} />
        <Textarea label="Description" value={String(form.description)} onChange={(value) => updateForm("description", value)} required />
        <Field label="Category" value={String(form.category)} onChange={(value) => updateForm("category", value)} />
        <div className="grid grid-cols-3 gap-3">
          <Field label="Rating" value={String(form.rating)} onChange={(value) => updateForm("rating", value)} />
          <Field label="Reviews" value={String(form.reviews)} onChange={(value) => updateForm("reviews", value)} />
          <Field label="Pages" value={String(form.pages)} onChange={(value) => updateForm("pages", value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Language" value={String(form.language)} onChange={(value) => updateForm("language", value)} />
          <Field label="Year" value={String(form.publishYear)} onChange={(value) => updateForm("publishYear", value)} />
        </div>
        <Field label="Price" value={String(form.price)} onChange={(value) => updateForm("price", value)} />
        <ImageField value={String(form.imageUrl)} onChange={(value) => updateForm("imageUrl", value)} />
        <PdfField value={String(form.pdfUrl)} onChange={(value) => updateForm("pdfUrl", value)} />
        <Field label="Download URL" value={String(form.downloadUrl)} onChange={(value) => updateForm("downloadUrl", value)} />
        <Field label="Preview URL" value={String(form.previewUrl)} onChange={(value) => updateForm("previewUrl", value)} />
        <Featured checked={Boolean(form.featured)} onChange={(value) => updateForm("featured", value)} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Field label="Title" value={String(form.title)} onChange={(value) => updateForm("title", value)} required />
      <Textarea label="Description" value={String(form.description)} onChange={(value) => updateForm("description", value)} required />
      <Field label="Category" value={String(form.category)} onChange={(value) => updateForm("category", value)} />
      <Field label="Architecture" value={String(form.architecture)} onChange={(value) => updateForm("architecture", value)} placeholder="e.g. Transformer, fine-tuned LLaMA-3 8B" />
      <Field label="Training Data" value={String(form.trainingData)} onChange={(value) => updateForm("trainingData", value)} placeholder="e.g. 50M Bengali news & social posts" />
      <Field label="Performance" value={String(form.performance)} onChange={(value) => updateForm("performance", value)} placeholder="e.g. 94% F1 on fact-verification benchmark" />
      <Field label="Use Case" value={String(form.useCase)} onChange={(value) => updateForm("useCase", value)} placeholder="e.g. Real-time Bengali fact-checking" />
      <Field label="Tags" value={String(form.tags)} onChange={(value) => updateForm("tags", value)} placeholder="NLP, PyTorch, Bengali" />
      <ImageField value={String(form.imageUrl)} onChange={(value) => updateForm("imageUrl", value)} />
      <Field label="Live/Demo URL" value={String(form.liveUrl)} onChange={(value) => updateForm("liveUrl", value)} />
      <Field label="GitHub URL" value={String(form.githubUrl)} onChange={(value) => updateForm("githubUrl", value)} />
      <Featured checked={Boolean(form.featured)} onChange={(value) => updateForm("featured", value)} />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium">
      <span className="mb-2 block">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="min-h-11 w-full rounded-lg border border-border bg-background px-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}

function ImageField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [assets, setAssets] = useState<AssetImage[]>([]);

  useEffect(() => {
    const loadAssets = async () => {
      const response = await fetch("/api/admin/assets");

      if (response.ok) {
        const data = await response.json();
        setAssets(data.images || []);
      }
    };

    loadAssets();
  }, []);

  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium">
        <ImageIcon className="h-4 w-4 text-primary" />
        Image
      </div>

      <label className="mb-3 block text-sm font-medium">
        <span className="mb-2 block text-muted-foreground">Browse assets/images</span>
        <select
          value={value.startsWith("/api/assets/") ? value : ""}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-11 w-full rounded-lg border border-border bg-card px-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="">Select image from assets</option>
          {assets.map((asset) => (
            <option key={asset.path} value={asset.url}>
              {asset.path}
            </option>
          ))}
        </select>
      </label>

      <Field
        label="Image URL"
        value={value}
        onChange={onChange}
        placeholder="https://example.com/image.jpg or /api/assets/projects/img-1.png"
      />

      {value && (
        <div className="mt-3 overflow-hidden rounded-lg border border-border bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Selected preview"
            className="h-32 w-full object-cover"
          />
        </div>
      )}
    </div>
  );
}

function PdfField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [files, setFiles] = useState<AssetFile[]>([]);

  useEffect(() => {
    const loadFiles = async () => {
      const response = await fetch("/api/admin/assets?type=pdf");

      if (response.ok) {
        const data = await response.json();
        setFiles(data.files || []);
      }
    };

    loadFiles();
  }, []);

  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium">
        <BookOpen className="h-4 w-4 text-primary" />
        Book PDF (readable as a flip book)
      </div>

      <label className="mb-3 block text-sm font-medium">
        <span className="mb-2 block text-muted-foreground">Browse assets/books</span>
        <select
          value={value.startsWith("/api/assets/") ? value : ""}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-11 w-full rounded-lg border border-border bg-card px-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="">Select PDF from assets</option>
          {files.map((file) => (
            <option key={file.path} value={file.url}>
              {file.path}
            </option>
          ))}
        </select>
      </label>

      <Field
        label="PDF URL"
        value={value}
        onChange={onChange}
        placeholder="https://example.com/book.pdf or /api/assets/books/my-book.pdf"
      />

      <p className="mt-2 text-xs text-muted-foreground">
        When set, the book&apos;s &quot;Read&quot; button opens this PDF as a page-turning flip book
        instead of a plain download.
      </p>
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium">
      <span className="mb-2 block">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        rows={4}
        className="w-full resize-none rounded-lg border border-border bg-background px-3 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}

function Featured({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-primary"
      />
      Featured
    </label>
  );
}

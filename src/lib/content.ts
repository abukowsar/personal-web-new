import { ObjectId, type Document } from "mongodb";
import { getDatabase } from "@/lib/mongodb";

export const contentConfig = {
  projects: {
    collection: "projects",
    required: ["title", "description"],
    defaults: {
      tags: [],
      imageUrl: "",
      category: "General",
      year: String(new Date().getFullYear()),
      status: "Live",
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
  },
  blog: {
    collection: "blog_posts",
    required: ["title", "excerpt"],
    defaults: {
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
  },
  books: {
    collection: "books",
    required: ["title", "description"],
    defaults: {
      subtitle: "",
      author: "Abu Kowsar",
      category: "General",
      rating: 4.8,
      reviews: 0,
      pages: 0,
      language: "English",
      publishYear: String(new Date().getFullYear()),
      price: "$0.00",
      imageUrl: "",
      color: "bg-blue-500",
      icon: "Book",
      downloadUrl: "#",
      previewUrl: "#",
      featured: true,
    },
  },
} as const;

export type ContentType = keyof typeof contentConfig;

export function isContentType(value: string): value is ContentType {
  return value in contentConfig;
}

export async function getContentCollection(type: ContentType) {
  const db = await getDatabase();
  const collection = db.collection(contentConfig[type].collection);

  await collection.createIndex({ createdAt: -1 });
  await collection.createIndex({ featured: -1, createdAt: -1 });

  return collection;
}

export function sanitizeContentInput(type: ContentType, input: Document) {
  const defaults = contentConfig[type].defaults;
  const sanitized: Document = { ...defaults };

  for (const key of Object.keys(defaults)) {
    const value = input[key];

    if (Array.isArray(defaults[key as keyof typeof defaults])) {
      sanitized[key] = Array.isArray(value)
        ? value.map(String).map((item) => item.trim()).filter(Boolean)
        : String(value || "")
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
    } else if (typeof defaults[key as keyof typeof defaults] === "boolean") {
      sanitized[key] = Boolean(value);
    } else if (typeof defaults[key as keyof typeof defaults] === "number") {
      sanitized[key] = Number(value) || 0;
    } else {
      sanitized[key] = String(value ?? defaults[key as keyof typeof defaults]).trim();
    }
  }

  sanitized.title = String(input.title || "").trim();

  if (type === "blog") {
    sanitized.excerpt = String(input.excerpt || "").trim();
  } else {
    sanitized.description = String(input.description || "").trim();
  }

  return sanitized;
}

export function validateContentInput(type: ContentType, input: Document) {
  const missingField = contentConfig[type].required.find((field) => !input[field]);

  if (missingField) {
    return `${missingField} is required`;
  }

  if (
    input.imageUrl &&
    !/^https?:\/\//.test(String(input.imageUrl)) &&
    !String(input.imageUrl).startsWith("/api/assets/")
  ) {
    return "Image URL must start with http://, https://, or /api/assets/";
  }

  return null;
}

export function mapContentItem(item: Document) {
  const mapped: Document = {
    ...item,
    id: item._id.toString(),
    createdAt: item.createdAt?.toISOString?.(),
    updatedAt: item.updatedAt?.toISOString?.(),
  };

  delete mapped._id;
  return mapped;
}

export function toObjectId(id: string) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return new ObjectId(id);
}

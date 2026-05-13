import type { Document } from "mongodb";
import { getDatabase } from "@/lib/mongodb";

export type ProjectInput = {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  category: string;
  year: string;
  status: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
};

export type ProjectRecord = ProjectInput & {
  id: string;
  createdAt?: string;
  updatedAt?: string;
};

export function sanitizeProjectInput(input: Partial<ProjectInput>) {
  return {
    title: String(input.title || "").trim(),
    description: String(input.description || "").trim(),
    tags: Array.isArray(input.tags)
      ? input.tags.map(String).map((tag) => tag.trim()).filter(Boolean)
      : String(input.tags || "")
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
    imageUrl: String(input.imageUrl || "").trim(),
    category: String(input.category || "General").trim(),
    year: String(input.year || new Date().getFullYear()).trim(),
    status: String(input.status || "Live").trim(),
    liveUrl: String(input.liveUrl || "#").trim(),
    githubUrl: String(input.githubUrl || "#").trim(),
    featured: Boolean(input.featured),
  };
}

export function validateProjectInput(input: ProjectInput) {
  if (!input.title || !input.description) {
    return "Project title and description are required";
  }

  if (
    input.imageUrl &&
    !/^https?:\/\//.test(input.imageUrl) &&
    !input.imageUrl.startsWith("/api/assets/")
  ) {
    return "Image URL must start with http://, https://, or /api/assets/";
  }

  return null;
}

export async function getProjectsCollection() {
  const db = await getDatabase();
  const collection = db.collection("projects");

  await collection.createIndex({ createdAt: -1 });
  await collection.createIndex({ featured: -1, createdAt: -1 });

  return collection;
}

export function mapProject(project: Document): ProjectRecord {
  return {
    id: project._id.toString(),
    title: project.title,
    description: project.description,
    tags: project.tags || [],
    imageUrl: project.imageUrl || "",
    category: project.category || "General",
    year: project.year || "",
    status: project.status || "Live",
    liveUrl: project.liveUrl || "#",
    githubUrl: project.githubUrl || "#",
    featured: Boolean(project.featured),
    createdAt: project.createdAt?.toISOString?.(),
    updatedAt: project.updatedAt?.toISOString?.(),
  };
}

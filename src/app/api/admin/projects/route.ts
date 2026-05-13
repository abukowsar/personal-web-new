import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  getProjectsCollection,
  mapProject,
  sanitizeProjectInput,
  validateProjectInput,
} from "@/lib/projects";

export const runtime = "nodejs";

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  return null;
}

export async function GET() {
  const unauthorized = await requireAdmin();

  if (unauthorized) {
    return unauthorized;
  }

  const collection = await getProjectsCollection();
  const projects = await collection.find({}).sort({ createdAt: -1 }).toArray();

  return NextResponse.json({ projects: projects.map(mapProject) });
}

export async function POST(req: Request) {
  const unauthorized = await requireAdmin();

  if (unauthorized) {
    return unauthorized;
  }

  const input = sanitizeProjectInput(await req.json());
  const error = validateProjectInput(input);

  if (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 400 }
    );
  }

  const now = new Date();
  const collection = await getProjectsCollection();
  const result = await collection.insertOne({
    ...input,
    createdAt: now,
    updatedAt: now,
  });

  return NextResponse.json({
    success: true,
    project: mapProject({ _id: result.insertedId, ...input, createdAt: now }),
  });
}

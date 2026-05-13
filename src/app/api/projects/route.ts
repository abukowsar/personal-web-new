import { NextResponse } from "next/server";
import { getProjectsCollection, mapProject } from "@/lib/projects";

export const runtime = "nodejs";

export async function GET() {
  try {
    const collection = await getProjectsCollection();
    const projects = await collection
      .find({})
      .sort({ featured: -1, createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json({ projects: projects.map(mapProject) });
  } catch (error) {
    console.error("Projects fetch error:", error);
    return NextResponse.json({ projects: [] }, { status: 500 });
  }
}

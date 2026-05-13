import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getProjectsCollection } from "@/lib/projects";

export const runtime = "nodejs";

export async function DELETE(
  _req: Request,
  context: { params: Promise<unknown> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = (await context.params) as { id: string };

  if (!ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, message: "Invalid project id" },
      { status: 400 }
    );
  }

  const collection = await getProjectsCollection();
  await collection.deleteOne({ _id: new ObjectId(id) });

  return NextResponse.json({ success: true });
}

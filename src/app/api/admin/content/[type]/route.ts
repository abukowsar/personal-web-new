import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  getContentCollection,
  isContentType,
  mapContentItem,
  sanitizeContentInput,
  validateContentInput,
} from "@/lib/content";

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

export async function GET(
  _req: Request,
  context: { params: Promise<unknown> }
) {
  const unauthorized = await requireAdmin();

  if (unauthorized) {
    return unauthorized;
  }

  const { type } = (await context.params) as { type: string };

  if (!isContentType(type)) {
    return NextResponse.json(
      { success: false, message: "Unknown content type" },
      { status: 404 }
    );
  }

  const collection = await getContentCollection(type);
  const items = await collection.find({}).sort({ createdAt: -1 }).toArray();

  return NextResponse.json({ items: items.map(mapContentItem) });
}

export async function POST(
  req: Request,
  context: { params: Promise<unknown> }
) {
  const unauthorized = await requireAdmin();

  if (unauthorized) {
    return unauthorized;
  }

  const { type } = (await context.params) as { type: string };

  if (!isContentType(type)) {
    return NextResponse.json(
      { success: false, message: "Unknown content type" },
      { status: 404 }
    );
  }

  const input = sanitizeContentInput(type, await req.json());
  const error = validateContentInput(type, input);

  if (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 400 }
    );
  }

  const now = new Date();
  const collection = await getContentCollection(type);
  const result = await collection.insertOne({
    ...input,
    createdAt: now,
    updatedAt: now,
  });

  return NextResponse.json({
    success: true,
    item: mapContentItem({ _id: result.insertedId, ...input, createdAt: now }),
  });
}

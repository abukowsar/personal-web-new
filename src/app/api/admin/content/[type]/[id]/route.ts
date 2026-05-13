import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  getContentCollection,
  isContentType,
  mapContentItem,
  sanitizeContentInput,
  toObjectId,
  validateContentInput,
} from "@/lib/content";

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

  const { type, id } = (await context.params) as { type: string; id: string };

  if (!isContentType(type)) {
    return NextResponse.json(
      { success: false, message: "Unknown content type" },
      { status: 404 }
    );
  }

  const objectId = toObjectId(id);

  if (!objectId) {
    return NextResponse.json(
      { success: false, message: "Invalid id" },
      { status: 400 }
    );
  }

  const collection = await getContentCollection(type);
  await collection.deleteOne({ _id: objectId });

  return NextResponse.json({ success: true });
}

export async function PUT(
  req: Request,
  context: { params: Promise<unknown> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { type, id } = (await context.params) as { type: string; id: string };

  if (!isContentType(type)) {
    return NextResponse.json(
      { success: false, message: "Unknown content type" },
      { status: 404 }
    );
  }

  const objectId = toObjectId(id);

  if (!objectId) {
    return NextResponse.json(
      { success: false, message: "Invalid id" },
      { status: 400 }
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

  const collection = await getContentCollection(type);
  const updatedAt = new Date();

  await collection.updateOne(
    { _id: objectId },
    {
      $set: {
        ...input,
        updatedAt,
      },
    }
  );

  const item = await collection.findOne({ _id: objectId });

  return NextResponse.json({
    success: true,
    item: item ? mapContentItem(item) : null,
  });
}

import { NextResponse } from "next/server";
import {
  getContentCollection,
  isContentType,
  mapContentItem,
} from "@/lib/content";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  context: { params: Promise<unknown> }
) {
  const { type } = (await context.params) as { type: string };

  if (!isContentType(type)) {
    return NextResponse.json({ items: [] }, { status: 404 });
  }

  try {
    const collection = await getContentCollection(type);
    const items = await collection
      .find({})
      .sort({ featured: -1, createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json({ items: items.map(mapContentItem) });
  } catch (error) {
    console.error(`${type} fetch error:`, error);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}

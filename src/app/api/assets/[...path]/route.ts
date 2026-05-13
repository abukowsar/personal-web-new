import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import { getAssetMimeType, resolveAssetPath } from "@/lib/asset-images";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  context: { params: Promise<unknown> }
) {
  const { path } = (await context.params) as { path: string[] };
  const assetPath = resolveAssetPath(path.join("/"));

  if (!assetPath) {
    return NextResponse.json({ message: "Invalid asset path" }, { status: 400 });
  }

  try {
    const file = await readFile(assetPath);

    return new NextResponse(file, {
      headers: {
        "Content-Type": getAssetMimeType(assetPath),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ message: "Asset not found" }, { status: 404 });
  }
}

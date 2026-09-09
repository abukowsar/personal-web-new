import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { listAssetImages, listAssetPdfs } from "@/lib/asset-images";

export const runtime = "nodejs";

export async function GET(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const type = new URL(req.url).searchParams.get("type");

  if (type === "pdf") {
    const pdfs = await listAssetPdfs();
    return NextResponse.json({ files: pdfs });
  }

  const images = await listAssetImages();

  return NextResponse.json({ images });
}

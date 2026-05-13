import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { listAssetImages } from "@/lib/asset-images";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const images = await listAssetImages();

  return NextResponse.json({ images });
}

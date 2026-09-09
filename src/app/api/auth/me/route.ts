import { NextResponse } from "next/server";
import { getAdminSessionEmail } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  const email = await getAdminSessionEmail();
  return NextResponse.json({ authenticated: email !== null, email });
}

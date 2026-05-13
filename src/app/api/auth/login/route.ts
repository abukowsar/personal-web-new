import { NextResponse } from "next/server";
import { setAdminSession, validateAdminLogin } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!validateAdminLogin(String(email || ""), String(password || ""))) {
    return NextResponse.json(
      { success: false, message: "Invalid email or password" },
      { status: 401 }
    );
  }

  await setAdminSession(email);

  return NextResponse.json({ success: true });
}

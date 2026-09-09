import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getDatabase } from "@/lib/mongodb";
import { mapRecord } from "@/lib/db-records";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const db = await getDatabase();
    const requests = await db
      .collection("schedule_requests")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ requests: requests.map(mapRecord) });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? `Database connection failed: ${error.message}`
            : "Database connection failed",
      },
      { status: 500 }
    );
  }
}

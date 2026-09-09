import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getDatabase } from "@/lib/mongodb";
import { mapRecord, toRecordObjectId } from "@/lib/db-records";

export const runtime = "nodejs";

const allowedStatuses = new Set(["new", "contacted", "scheduled", "completed"]);

export async function PATCH(
  req: Request,
  context: { params: Promise<unknown> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = (await context.params) as { id: string };
  const objectId = toRecordObjectId(id);

  if (!objectId) {
    return NextResponse.json(
      { success: false, message: "Invalid id" },
      { status: 400 }
    );
  }

  const { status } = await req.json();

  if (!allowedStatuses.has(status)) {
    return NextResponse.json(
      { success: false, message: "Invalid status" },
      { status: 400 }
    );
  }

  try {
    const db = await getDatabase();
    const collection = db.collection("consultations");

    await collection.updateOne({ _id: objectId }, { $set: { status } });
    const item = await collection.findOne({ _id: objectId });

    return NextResponse.json({
      success: true,
      consultation: item ? mapRecord(item) : null,
    });
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
  const objectId = toRecordObjectId(id);

  if (!objectId) {
    return NextResponse.json(
      { success: false, message: "Invalid id" },
      { status: 400 }
    );
  }

  try {
    const db = await getDatabase();
    await db.collection("consultations").deleteOne({ _id: objectId });

    return NextResponse.json({ success: true });
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

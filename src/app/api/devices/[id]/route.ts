import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase/admin";

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const db = getAdminDb();
    if (!db) {
      return NextResponse.json({ success: false, message: "Database not configured" }, { status: 500 });
    }

    await db.collection("devices").doc(id).delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting device:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const db = getAdminDb();
    if (!db) {
      return NextResponse.json({ success: false, message: "Database not configured" }, { status: 500 });
    }

    await db.collection("devices").doc(id).update({
      name: body.name,
      type: body.type,
      status: body.status,
      location: body.location
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating device:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase/admin";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = getAdminDb();
    if (!db) {
      return NextResponse.json({ success: false, message: "Database not configured" }, { status: 500 });
    }

    await db.collection("devices").doc(params.id).delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting device:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const db = getAdminDb();
    if (!db) {
      return NextResponse.json({ success: false, message: "Database not configured" }, { status: 500 });
    }

    await db.collection("devices").doc(params.id).update({
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

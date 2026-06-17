import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase/admin";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ success: false, message: "Status is required" }, { status: 400 });
    }

    const db = getAdminDb();
    if (!db) {
      return NextResponse.json({ success: false, message: "Database not configured" }, { status: 500 });
    }

    await db.collection("inquiries").doc(id).update({
      status: status,
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true, message: "Inquiry updated successfully" });
  } catch (error) {
    console.error("Error updating inquiry:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

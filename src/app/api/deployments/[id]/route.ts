import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase/admin";

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const db = getAdminDb();
    if (!db) {
      return NextResponse.json({ success: false, message: "Database not configured" }, { status: 500 });
    }

    await db.collection("deployments").doc(id).delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting deployment:", error);
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

    await db.collection("deployments").doc(id).update({
      clientName: body.clientName,
      serviceType: body.serviceType,
      location: body.location,
      startDate: body.startDate,
      endDate: body.endDate,
      guardsAssigned: body.guardsAssigned,
      status: body.status
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating deployment:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

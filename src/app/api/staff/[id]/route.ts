import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase/admin";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params object for Next.js 15+ compatibility
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ success: false, message: "Missing ID" }, { status: 400 });
    }

    const body = await request.json();
    const db = getAdminDb();
    if (!db) {
      return NextResponse.json({ success: false, message: "Database not configured" }, { status: 500 });
    }

    await db.collection("staff").doc(id).update({
      name: body.name,
      role: body.role,
      experience: body.experience,
      contact: body.contact,
      status: body.status,
      imageUrl: body.imageUrl,
      certifications: body.certifications || [],
      updatedAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true, message: "Staff member updated successfully" });
  } catch (error) {
    console.error("Error updating staff:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params object for Next.js 15+ compatibility
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ success: false, message: "Missing ID" }, { status: 400 });
    }

    const db = getAdminDb();
    if (!db) {
      return NextResponse.json({ success: false, message: "Database not configured" }, { status: 500 });
    }

    await db.collection("staff").doc(id).delete();

    return NextResponse.json({ success: true, message: "Staff member deleted successfully" });
  } catch (error) {
    console.error("Error deleting staff:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

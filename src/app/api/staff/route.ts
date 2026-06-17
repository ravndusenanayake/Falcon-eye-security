import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase/admin";

export async function GET() {
  try {
    const db = getAdminDb();
    if (!db) {
      return NextResponse.json({ success: false, message: "Database not configured" }, { status: 500 });
    }

    const snapshot = await db.collection("staff").get();
    const staffList = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || "Unknown",
        role: data.role || "Guard",
        experience: data.experience || "0 years",
        contact: data.contact || "",
        status: data.status || "Active",
        certifications: data.certifications || []
      };
    });

    return NextResponse.json({ success: true, staff: staffList });
  } catch (error) {
    console.error("Error fetching staff:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = getAdminDb();
    if (!db) {
      return NextResponse.json({ success: false, message: "Database not configured" }, { status: 500 });
    }

    const docRef = await db.collection("staff").add({
      name: body.name,
      role: body.role || "Security Officer",
      experience: body.experience || "1 year",
      contact: body.contact || "",
      status: body.status || "Active",
      certifications: body.certifications || []
    });

    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Error saving staff:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

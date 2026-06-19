import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase/admin";
import * as admin from "firebase-admin";

export async function GET() {
  try {
    const db = getAdminDb();
    if (!db) {
      return NextResponse.json({ success: false, message: "Database not configured" }, { status: 500 });
    }

    const snapshot = await db.collection("incidents").orderBy("createdAt", "desc").get();
    const incidents = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || "Unknown Incident",
        severity: data.severity || "Low",
        status: data.status || "Open",
        location: data.location || "Unknown",
        reportedBy: data.reportedBy || "System",
        time: "Recently" // In a real app we'd format data.createdAt
      };
    });

    return NextResponse.json({ success: true, incidents });
  } catch (error) {
    console.error("Error fetching incidents:", error);
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

    const docRef = await db.collection("incidents").add({
      title: body.title,
      severity: body.severity || "Medium",
      status: body.status || "Open",
      location: body.location || "Unknown",
      reportedBy: body.reportedBy || "System",
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating incident:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

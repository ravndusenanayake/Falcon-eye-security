import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase/admin";
import * as admin from "firebase-admin";

export async function GET() {
  try {
    const db = getAdminDb();
    if (!db) {
      return NextResponse.json({ success: false, message: "Database not configured" }, { status: 500 });
    }

    const snapshot = await db.collection("devices").get();
    const devices = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || "Unknown Asset",
        type: data.type || "Other",
        status: data.status || "Offline",
        location: data.location || "Unknown",
        lastPing: data.lastPing || "Unknown"
      };
    });

    return NextResponse.json({ success: true, devices });
  } catch (error) {
    console.error("Error fetching devices:", error);
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

    const docRef = await db.collection("devices").add({
      name: body.name,
      type: body.type || "Other",
      status: body.status || "Online",
      location: body.location || "Unknown",
      lastPing: body.lastPing || "Just now",
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating device:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

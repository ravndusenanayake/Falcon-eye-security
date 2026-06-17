import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase/admin";
import * as admin from "firebase-admin";

export async function GET() {
  try {
    const db = getAdminDb();
    if (!db) {
      return NextResponse.json({ success: false, message: "Database not configured" }, { status: 500 });
    }

    const snapshot = await db.collection("deployments").get();
    const deployments = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        clientName: data.clientName || "Unknown Client",
        serviceType: data.serviceType || "General Security",
        location: data.location || "Not Specified",
        startDate: data.startDate || "",
        endDate: data.endDate || "",
        guardsAssigned: data.guardsAssigned || [],
        status: data.status || "Scheduled"
      };
    });

    return NextResponse.json({ success: true, deployments });
  } catch (error) {
    console.error("Error fetching deployments:", error);
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

    const docRef = await db.collection("deployments").add({
      clientName: body.clientName,
      serviceType: body.serviceType || "Personal Protection",
      location: body.location || "Colombo",
      startDate: body.startDate,
      endDate: body.endDate,
      guardsAssigned: body.guardsAssigned || [],
      status: body.status || "Scheduled",
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating deployment:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

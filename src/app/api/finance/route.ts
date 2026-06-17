import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase/admin";
import * as admin from "firebase-admin";

export async function GET() {
  try {
    const db = getAdminDb();
    if (!db) {
      return NextResponse.json({ success: false, message: "Database not configured" }, { status: 500 });
    }

    const snapshot = await db.collection("finance").get();
    const invoices = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        invoiceNumber: data.invoiceNumber || "INV-000",
        clientName: data.clientName || "Unknown",
        serviceType: data.serviceType || "Security Services",
        amount: data.amount || 0,
        date: data.date || "",
        status: data.status || "Pending",
        dueDate: data.dueDate || ""
      };
    });

    return NextResponse.json({ success: true, invoices });
  } catch (error) {
    console.error("Error fetching financials:", error);
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

    // Generate unique invoice number sequence
    const count = (await db.collection("finance").count().get()).data().count;
    const invoiceNumber = `INV-${String(count + 101).padStart(4, "0")}`;

    const docRef = await db.collection("finance").add({
      invoiceNumber,
      clientName: body.clientName,
      serviceType: body.serviceType || "Personal Protection",
      amount: Number(body.amount) || 0,
      date: body.date || new Date().toISOString().split('T')[0],
      dueDate: body.dueDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: body.status || "Pending",
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return NextResponse.json({ success: true, id: docRef.id, invoiceNumber }, { status: 201 });
  } catch (error) {
    console.error("Error creating invoice:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

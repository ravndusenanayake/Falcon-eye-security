import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real app, validate body and save to Firebase
    // await adminDb.collection('inquiries').add({
    //   ...body,
    //   status: 'Pending Assessment',
    //   createdAt: admin.firestore.FieldValue.serverTimestamp()
    // });
    
    // Mock email notification
    console.log("New Inquiry Received:", body);
    console.log("Sending confirmation email to:", body.email);
    console.log("Sending alert email to admin.");

    return NextResponse.json({ success: true, message: "Inquiry received" }, { status: 201 });
  } catch (error) {
    console.error("Error processing inquiry:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

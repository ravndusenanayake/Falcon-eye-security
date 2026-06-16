import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Honeypot check: If the hidden 'website' field is filled, it's likely a bot
    if (body.website) {
      console.warn("Bot detected: Honeypot field filled");
      return NextResponse.json({ success: false, message: "Invalid submission" }, { status: 400 });
    }
    
    // Remove honeypot field before processing
    const { website, ...inquiryData } = body;
    // await adminDb.collection('inquiries').add({
    //   ...body,
    //   status: 'Pending Assessment',
    //   createdAt: admin.firestore.FieldValue.serverTimestamp()
    // });
    
    // Mock email notification
    console.log("New Inquiry Received:", inquiryData);
    console.log("Sending confirmation email to:", inquiryData.email);
    console.log("Sending alert email to admin.");

    return NextResponse.json({ success: true, message: "Inquiry received" }, { status: 201 });
  } catch (error) {
    console.error("Error processing inquiry:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

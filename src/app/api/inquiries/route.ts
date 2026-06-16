import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import * as admin from "firebase-admin";

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
    
    // Add to Firestore
    await adminDb.collection('inquiries').add({
      ...inquiryData,
      status: 'New',
      threatLevel: 'Medium', // Default threat level, can be assessed by admin
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
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

export async function GET() {
  try {
    const snapshot = await adminDb.collection('inquiries').orderBy('createdAt', 'desc').get();
    const inquiries = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        client: `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Anonymous',
        service: data.service || 'Not Specified',
        date: data.createdAt ? new Date(data.createdAt.seconds * 1000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        status: data.status || 'New',
        threatLevel: data.threatLevel || 'Medium',
        phone: data.phone || '',
        email: data.email || '',
        details: data.details || ''
      };
    });
    return NextResponse.json({ success: true, inquiries });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}



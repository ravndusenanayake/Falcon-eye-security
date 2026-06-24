import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase/admin";
import * as admin from "firebase-admin";

import nodemailer from "nodemailer";

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
    
    const db = getAdminDb();
    if (!db) {
      console.error("Firebase Admin is not configured. Cannot save inquiry.");
      return NextResponse.json({ success: false, message: "Database connection not configured" }, { status: 500 });
    }
    
    // Add to Firestore
    await db.collection('inquiries').add({
      ...inquiryData,
      status: 'New',
      threatLevel: 'Medium', // Default threat level, can be assessed by admin
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Configure Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 1. Email to Admin (Alert)
    const adminMailOptions = {
      from: `"Falcon Eye Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to the admin's email
      subject: `New Security Inquiry: ${inquiryData.service || 'General'}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #b8860b;">New Security Inquiry Received</h2>
          <p>A new request has been submitted via the website contact form.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Name:</strong> ${inquiryData.firstName || ''} ${inquiryData.lastName || ''}</p>
          <p><strong>Email:</strong> <a href="mailto:${inquiryData.email}">${inquiryData.email}</a></p>
          <p><strong>Phone:</strong> ${inquiryData.phone || 'Not provided'}</p>
          <p><strong>Service Requested:</strong> ${inquiryData.service || 'Not specified'}</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #b8860b; margin-top: 20px;">
            <p style="margin: 0;"><strong>Message:</strong></p>
            <p style="margin-top: 10px; white-space: pre-wrap;">${inquiryData.details || 'No additional details provided.'}</p>
          </div>
          <p style="font-size: 12px; color: #777; margin-top: 30px;">Login to the <a href="https://falconeyesecurity.lk/admin">Admin Dashboard</a> to manage this inquiry.</p>
        </div>
      `,
    };

    // 2. Email to Client (Auto-reply)
    const clientMailOptions = {
      from: `"Falcon Eye Security" <${process.env.EMAIL_USER}>`,
      to: inquiryData.email,
      subject: "We have received your security request",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #b8860b; text-transform: uppercase;">Falcon Eye Security</h2>
          <p>Dear ${inquiryData.firstName || 'Valued Client'},</p>
          <p>Thank you for reaching out to Falcon Eye Security. We have successfully received your inquiry regarding <strong>${inquiryData.service || 'our security services'}</strong>.</p>
          <p>Our executive operations team is currently reviewing your request. Due to the highly discreet and customized nature of our services, a senior security consultant will contact you shortly to discuss your specific requirements in detail.</p>
          <p>If your matter is extremely urgent, please call our 24/7 hotline directly at <strong>076 772 2412</strong>.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="font-size: 12px; color: #777; text-align: center;">
            Falcon Eye Security<br>
            Colombo, Sri Lanka<br>
            <a href="https://falconeyesecurity.lk" style="color: #b8860b;">www.falconeyesecurity.lk</a>
          </p>
        </div>
      `,
    };

    // Send emails only if environment variables are configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_USER !== "your_test_email@gmail.com") {
      try {
        await transporter.sendMail(adminMailOptions);
        if (inquiryData.email) {
          await transporter.sendMail(clientMailOptions);
        }
        console.log("Automated emails sent successfully.");
      } catch (emailError) {
        console.error("Failed to send automated emails:", emailError);
        // We don't fail the API response if emails fail, because the database entry was successful
      }
    } else {
      console.log("Email credentials not configured properly in .env.local. Emails bypassed.");
    }

    return NextResponse.json({ success: true, message: "Inquiry received and processed" }, { status: 201 });
  } catch (error) {
    console.error("Error processing inquiry:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = getAdminDb();
    if (!db) {
      console.warn("Firebase Admin is not configured. Returning empty inquiries.");
      return NextResponse.json({ success: true, inquiries: [] });
    }
    
    const snapshot = await db.collection('inquiries').orderBy('createdAt', 'desc').get();
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




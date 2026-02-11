import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const data = await req.json();
    const { fullName, email, queryRelated, message } = data;

    // 1. Validation
    if (!data) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format." },
        { status: 400 },
      );
    }

    // 2. Save to Strapi
    // Safely handle trailing slashes from environment variables
    const strapiUrl =
      process.env.NEXT_PUBLIC_STRAPI_CLOUD_URL ||
      "https://steadfast-flame-a9e93be747.strapiapp.com" ||
      "http://localhost:1337";
    // const strapiUrl = rawUrl.replace(/\/$/, "");
    console.log(strapiUrl);

    const strapiResponse = await fetch(`${strapiUrl}/api/contact-submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          fullName: data.fullName,
          email: data.email,
          queryRelated: data.queryRelated,
          message: data.message,
          submittedAt: new Date().toISOString(),
        },
      }),
    });

    if (!strapiResponse.ok) {
      const errorData = await strapiResponse.json();
      console.error("Strapi Error:", errorData);
      return NextResponse.json(
        { message: "Failed to save to database." },
        { status: 500 },
      );
    }

    // 3. Send Email
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_PORT == 465, // Use true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `New Contact Form Submission - ${queryRelated}`,
      text: `Full Name: ${fullName}\nEmail: ${email}\nMessage: ${message}`,
    });

    return NextResponse.json(
      { message: "Form submitted successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error handling contact form submission:", error);
    // CRITICAL: You MUST use 'return' here
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 },
    );
  }
}

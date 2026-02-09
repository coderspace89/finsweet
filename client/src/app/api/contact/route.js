import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  const data = await req.json();
  const { fullName, email, queryRelated, message } = data;
  console.log(data);

  // 3. Basic server-side validation
  if (!data) {
    return NextResponse.json(
      { message: "All fields are required." },
      { status: 400 },
    );
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { message: "Invalid email format." },
      { status: 400 },
    );
  }

  try {
    // 4. Process the data (e.g., send email, save to Strapi)
    // For now, we'll just log it and send a success response.
    console.log("Received contact form submission:");
    console.log(`Full Name: ${fullName}`);
    console.log(`Email: ${email}`);
    console.log(`Query Related: ${queryRelated}`);
    console.log(`Message: ${message}`);

    // --- Example: Sending to Strapi (Uncomment and configure if you have a submission type) ---

    const strapiUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const strapiResponse = await fetch(`${strapiUrl}/api/contact-submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${process.env.STRAPI_WRITE_TOKEN}`, // If your Strapi endpoint requires auth
      },
      body: JSON.stringify({
        data: {
          fullName: data.fullName,
          email: data.email,
          queryRelated: data.queryRelated,
          message: data.message,
          submittedAt: new Date().toISOString(), // Add a timestamp
        },
      }),
    });

    if (!strapiResponse.ok) {
      const errorData = await strapiResponse.json();
      console.error("Failed to save to Strapi:", errorData);
      return NextResponse.json(
        { message: "Failed to submit form (Strapi error)." },
        { status: 500 },
      );
    }

    // --- Sending an email (requires external service like Nodemailer, SendGrid, etc.) ---
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: data.email,
      subject: `New Contact Form Submission - ${queryRelated}`,
      text: `
    Full Name: ${fullName}
    Email: ${email}
    Query Related: ${queryRelated}
    Message: ${message}
    `,
    });

    // 5. Send a success response
    return NextResponse.json(
      { message: "Form submitted successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error handling contact form submission:", error);
    NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}

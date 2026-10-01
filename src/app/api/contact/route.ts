import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema, getFieldErrors } from "@/lib/validation";
import { sanitize, sanitizeEmail } from "@/lib/sanitize";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin") || "";
  const isAllowed = origin.includes("localhost") || origin === "https://joelakinlosotu.xyz";
  const headers: Record<string, string> = isAllowed
    ? { "Access-Control-Allow-Origin": origin }
    : {};

  try {
    const body = await request.json();

    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      const errors = getFieldErrors(result.error);
      return NextResponse.json(
        { success: false, error: "Validation failed", errors },
        { status: 400, headers }
      );
    }

    const data = {
      name: sanitize(result.data.name),
      email: sanitizeEmail(result.data.email),
      projectType: result.data.projectType,
      budget: result.data.budget,
      message: sanitize(result.data.message),
      signup: result.data.signup,
    };

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["joelakinlosotu@gmail.com"],
      replyTo: data.email,
      subject: `New project inquiry from ${data.name}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #6B7A3D;">New Project Inquiry</h2>
          <hr style="border: 1px dotted #6B7A3D; margin: 16px 0;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Project Type:</strong> ${data.projectType}</p>
          <p><strong>Budget:</strong> ${data.budget}</p>
          <p><strong>Newsletter:</strong> ${data.signup ? "Yes" : "No"}</p>
          <hr style="border: 1px dotted #6B7A3D; margin: 16px 0;">
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${data.message}</p>
        </div>
      `,
    });

    if (emailError) {
      console.error("Resend error:", emailError);
      return NextResponse.json(
        { success: false, error: "Failed to send email. Please try again." },
        { status: 500, headers }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500, headers }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

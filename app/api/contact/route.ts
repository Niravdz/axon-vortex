import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      businessName,
      email,
      phone,
      website = "",
      interests = [],
      tellUsMore = "",
      type = "contact",
      privacyConsent = false,
    } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Valid business email is required." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 6) {
      return NextResponse.json(
        { success: false, error: "Valid contact phone number is required." },
        { status: 400 }
      );
    }

    if (!businessName || typeof businessName !== "string" || businessName.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Business name or organization is required." },
        { status: 400 }
      );
    }

    if (!privacyConsent) {
      return NextResponse.json(
        { success: false, error: "You must acknowledge the privacy policy to submit." },
        { status: 400 }
      );
    }

    // In a production environment, this would forward to CRM / SendGrid / Slack webhook / Database
    // We log the structured transmission here
    console.log("[INBOUND INTAKE TRANSMISSION]", {
      timestamp: new Date().toISOString(),
      type,
      name: name.trim(),
      businessName: businessName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      website: website.trim(),
      interests: Array.isArray(interests) ? interests : [],
      tellUsMore: tellUsMore.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been logged in our intake queue. An architectural strategist will contact you within 1 business day.",
        referenceId: `AXON-${Date.now().toString(36).toUpperCase()}`,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("[API_CONTACT_ERROR]", err);
    return NextResponse.json(
      { success: false, error: "An unexpected server error occurred while processing your intake." },
      { status: 500 }
    );
  }
}

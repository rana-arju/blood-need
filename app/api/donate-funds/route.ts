import { NextResponse } from "next/server";
import { verifyRecaptcha } from "@/utils/recaptcha";

export async function POST(request: Request) {
  const body = await request.json();
  const { recaptchaToken, ...donationData } = body;

  const isHuman = await verifyRecaptcha(recaptchaToken);

  if (!isHuman) {
    return NextResponse.json(
      { error: "reCAPTCHA verification failed" },
      { status: 400 }
    );
  }

  // Process the donation
  // This is where you would integrate with your payment processor
  console.log("Processing donation:", donationData);

  // For demonstration purposes, we'll just return a success response
  return NextResponse.json(
    { message: "Donation processed successfully" },
    { status: 200 }
  );
}

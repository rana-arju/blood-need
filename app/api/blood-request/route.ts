import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import { verifyRecaptcha } from "@/utils/recaptcha";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { recaptchaToken, ...bloodRequestData } = body;

    const isHuman = await verifyRecaptcha(recaptchaToken);

    if (!isHuman) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed" },
        { status: 400 }
      );
    }

    const bloodRequest = await prisma.bloodRequest.create({
      data: {
        ...bloodRequestData,
        userId: session.user.id,
      },
    });

    return NextResponse.json(
      { message: "Blood request created successfully", bloodRequest },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in blood request:", error);
    return NextResponse.json(
      { message: "An error occurred while creating the blood request" },
      { status: 500 }
    );
  }
}

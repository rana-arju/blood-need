import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, userId } = body;
    

    if (!token || !userId) {
      return NextResponse.json(
        { success: false, message: "Missing token or userId" },
        { status: 400 }
      );
    }

    console.log(
      "[API] Registering device token:",
      token.substring(0, 10) + "..."
    );

    // Forward the request to your backend
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/token/register`;

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userId}`,
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "[API] Error registering token with backend:",
        response.status,
        errorText
      );

      return NextResponse.json(
        {
          success: false,
          message: "Failed to register device with backend",
          error: errorText,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("[API] Error registering device:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

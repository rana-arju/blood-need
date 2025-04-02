import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { token, userId } = await request.json();

    if (!token || !userId) {
      return NextResponse.json(
        { error: "Missing token or userId" },
        { status: 400 }
      );
    }

    // Here you would typically store the token in your database
    // associated with the user ID, checking for duplicates

    // For now, we'll just return success
    // In a real implementation, you would call your backend API
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (backendUrl) {
      try {
        const response = await fetch(
          `${backendUrl}/notifications/token/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userId}`,
            },
            body: JSON.stringify({ token }),
          }
        );

        if (!response.ok) {
          // If the backend returns an error, check if it's because the token is already registered
          const errorData = await response.json();

          // If it's a duplicate token error, we can still return success
          if (errorData.error === "Token already registered") {
            return NextResponse.json({
              success: true,
              message: "Token already registered",
            });
          }

          throw new Error("Failed to register token with backend");
        }
      } catch (error) {
        console.error("Error calling backend:", error);
        throw error;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error registering device:", error);
    return NextResponse.json(
      { error: "Failed to register device" },
      { status: 500 }
    );
  }
}

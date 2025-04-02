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

    // Here you would typically remove the token from your database
    console.log(`Unregistering device token for user ${userId}: ${token}`);

    // For now, we'll just return success
    // In a real implementation, you would call your backend API
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (backendUrl) {
      const response = await fetch(`${backendUrl}/notifications/token/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userId}`,
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error("Failed to unregister token with backend");
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error unregistering device:", error);
    return NextResponse.json(
      { error: "Failed to unregister device" },
      { status: 500 }
    );
  }
}

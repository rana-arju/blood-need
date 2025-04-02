import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // In a real implementation, you would call your backend API
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (backendUrl) {
      const response = await fetch(`${backendUrl}/notifications/check-missed`, {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to check missed notifications");
      }

      const data = await response.json();
      return NextResponse.json(data);
    }

    // Fallback if no backend URL
    return NextResponse.json({
      data: { missedNotifications: 0 },
    });
  } catch (error) {
    console.error("Error checking missed notifications:", error);
    return NextResponse.json(
      { error: "Failed to check missed notifications" },
      { status: 500 }
    );
  }
}

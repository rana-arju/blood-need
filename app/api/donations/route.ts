import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { date, location } = await request.json();

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { donations: true, rewardBadge: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newDonation = await prisma.donation.create({
      data: {
        date,
        location,
        userId: user.id,
        bloodType: "O+", // Replace with actual value
        amount: 1, // Replace with actual value
      },
    });

    // Update user's donation count and check for rewards
    const donationCount = user.donations.length + 1;
    let rewardBadge = user.rewardBadge;

    if (donationCount >= 20) {
      rewardBadge = "Gold Donor";
    } else if (donationCount >= 10) {
      rewardBadge = "Silver Donor";
    } else if (donationCount >= 5) {
      rewardBadge = "Bronze Donor";
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { donationCount, rewardBadge },
    });

    return NextResponse.json({
      message: "Donation recorded successfully",
      donation: newDonation,
      rewardBadge,
    });
  } catch (error) {
    console.error("Error recording donation:", error);
    return NextResponse.json(
      { error: "Failed to record donation" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

// GET all blood drives
export async function GET() {
  try {
    const bloodDrives = await prisma.bloodDrive.findMany();
    return NextResponse.json(bloodDrives);
  } catch (error) {
    console.error("Error fetching blood drives:", error);
    return NextResponse.json(
      { error: "Error fetching blood drives" },
      { status: 500 }
    );
  }
}

// POST a new blood drive
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, date, location, organizer } = body;

    const newBloodDrive = await prisma.bloodDrive.create({
      data: {
        title,
        date: new Date(date),
        location,
        organizer,
      },
    });

    return NextResponse.json(newBloodDrive, { status: 201 });
  } catch (error) {
    console.error("Error creating blood drive:", error);
    return NextResponse.json(
      { error: "Error creating blood drive" },
      { status: 500 }
    );
  }
}

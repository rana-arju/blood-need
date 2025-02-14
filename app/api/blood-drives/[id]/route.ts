import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

// GET a specific blood drive
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const bloodDrive = await prisma.bloodDrive.findUnique({
      where: { id: params.id },
    });

    if (!bloodDrive) {
      return NextResponse.json(
        { error: "Blood drive not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(bloodDrive);
  } catch (error) {
    console.error("Error fetching blood drive:", error);
    return NextResponse.json(
      { error: "Error fetching blood drive" },
      { status: 500 }
    );
  }
}

// PUT (update) a specific blood drive
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, date, location, organizer } = body;

    const updatedBloodDrive = await prisma.bloodDrive.update({
      where: { id: params.id },
      data: {
        title,
        date: new Date(date),
        location,
        organizer,
      },
    });

    return NextResponse.json(updatedBloodDrive);
  } catch (error) {
    console.error("Error updating blood drive:", error);
    return NextResponse.json(
      { error: "Error updating blood drive" },
      { status: 500 }
    );
  }
}

// DELETE a specific blood drive
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.bloodDrive.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Blood drive deleted successfully" });
  } catch (error) {
    console.error("Error deleting blood drive:", error);
    return NextResponse.json(
      { error: "Error deleting blood drive" },
      { status: 500 }
    );
  }
}

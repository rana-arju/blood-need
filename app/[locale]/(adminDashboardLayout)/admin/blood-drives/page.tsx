import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { BloodDriveForm } from "@/components/BloodDriveForm";

export default async function AdminBloodDrivesPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/auth/signin");
  }

  const res = await fetch("http://localhost:5000/api/v1/bloodDrives", {
    method: "GET",
  });
  const bloodDrives = await res.json();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Blood Drives</h1>
      <BloodDriveForm onSuccess={() => {}} />
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Existing Blood Drives</h2>
        {bloodDrives?.map((drive: any) => (
          <div key={drive.id} className="mb-4 p-4 border rounded">
            <h3 className="text-xl font-semibold">{drive.title}</h3>
            <p>Date: {new Date(drive.date).toLocaleDateString()}</p>
            <p>Location: {drive.location}</p>
            <p>Organizer: {drive.organizer}</p>
            <BloodDriveForm bloodDrive={drive} onSuccess={() => {}} />
          </div>
        ))}
      </div>
    </div>
  );
}

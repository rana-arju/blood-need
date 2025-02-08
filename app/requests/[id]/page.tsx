import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Mock function to fetch blood request details
const getBloodRequestDetails = (id: string) => {
  return {
    id,
    patientName: `Patient ${id}`,
    bloodGroup: "A+",
    units: 2,
    hospital: "City General Hospital",
    location: "City Center, Main Street",
    requestDate: new Date().toLocaleDateString(),
    urgency: "High",
    contactPerson: "John Doe",
    contactNumber: "+1234567890",
    additionalInfo: "Patient needs blood for surgery scheduled tomorrow.",
  };
};

export default function BloodRequestDetails({
  params,
}: {
  params: { id: string };
}) {
  const request = getBloodRequestDetails(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Blood Request Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Patient Name</h3>
              <p>{request.patientName}</p>
            </div>
            <div>
              <h3 className="font-semibold">Blood Group</h3>
              <p>{request.bloodGroup}</p>
            </div>
            <div>
              <h3 className="font-semibold">Units Required</h3>
              <p>{request.units}</p>
            </div>
            <div>
              <h3 className="font-semibold">Hospital</h3>
              <p>{request.hospital}</p>
            </div>
            <div>
              <h3 className="font-semibold">Location</h3>
              <p>{request.location}</p>
            </div>
            <div>
              <h3 className="font-semibold">Request Date</h3>
              <p>{request.requestDate}</p>
            </div>
            <div>
              <h3 className="font-semibold">Urgency</h3>
              <p>{request.urgency}</p>
            </div>
            <div>
              <h3 className="font-semibold">Contact Person</h3>
              <p>{request.contactPerson}</p>
            </div>
            <div>
              <h3 className="font-semibold">Contact Number</h3>
              <p>{request.contactNumber}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Additional Information</h3>
            <p>{request.additionalInfo}</p>
          </div>
          <div className="flex justify-end space-x-4">
            <Button asChild>
              <Link href="/blood-requests">Back to List</Link>
            </Button>
            <Button>Respond to Request</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

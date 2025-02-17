import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShareButton } from "@/components/ShareButton";

interface BloodRequestDetailsProps {
  id: string;
}

// This is a mock function to simulate fetching data
// In a real application, you would fetch this data from your API
const getBloodRequestDetails = (id: string) => {
  return {
    id,
    patientName: "John Doe",
    bloodType: "A+",
    units: 2,
    hospital: "City General Hospital",
    location: "123 Main St, Cityville",
    urgency: "High" as const,
    postedAt: new Date().toISOString(),
    contactName: "Jane Doe",
    contactPhone: "+1234567890",
    additionalInfo:
      "Patient needs blood for emergency surgery. Please help if you can.",
  };
};

export function BloodRequestDetails({ id }: BloodRequestDetailsProps) {
  const request = getBloodRequestDetails(id);

  const urgencyColor = {
    Low: "bg-green-500",
    Medium: "bg-yellow-500",
    High: "bg-red-500",
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">
            Blood Request Details
          </CardTitle>
          <ShareButton
            url={`/requests/${id}`}
            title={`Blood Request: ${request.bloodType} needed in ${request.location}`}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">
            Blood Type: {request.bloodType}
          </h3>
          <Badge className={urgencyColor[request.urgency]}>
            {request.urgency} Urgency
          </Badge>
        </div>
        <p>
          <strong>Units Needed:</strong> {request.units}
        </p>
        <p>
          <strong>Hospital:</strong> {request.hospital}
        </p>
        <p>
          <strong>Location:</strong> {request.location}
        </p>
        <p>
          <strong>Posted At:</strong>{" "}
          {new Date(request.postedAt).toLocaleString()}
        </p>
        <p>
          <strong>Contact Person:</strong> {request.contactName}
        </p>
        <p>
          <strong>Contact Phone:</strong> {request.contactPhone}
        </p>
        <p>
          <strong>Additional Information:</strong> {request.additionalInfo}
        </p>
        <Button className="w-full">Respond to Request</Button>
      </CardContent>
    </Card>
  );
}

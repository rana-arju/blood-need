import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Mock function to fetch donor details
const getDonorDetails = (id: string) => {
  return {
    id,
    name: `Donor ${id}`,
    bloodGroup: "B+",
    age: 28,
    gender: "Male",
    location: "City Center, Main Street",
    lastDonationDate: new Date(
      Date.now() - 90 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
    donationCount: 5,
    contactNumber: "+1234567890",
    email: `donor${id}@example.com`,
    medicalConditions: "None",
  };
};

export default function DonorDetails({ params }: { params: { id: string } }) {
  const donor = getDonorDetails(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Donor Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Name</h3>
              <p>{donor.name}</p>
            </div>
            <div>
              <h3 className="font-semibold">Blood Group</h3>
              <p>{donor.bloodGroup}</p>
            </div>
            <div>
              <h3 className="font-semibold">Age</h3>
              <p>{donor.age}</p>
            </div>
            <div>
              <h3 className="font-semibold">Gender</h3>
              <p>{donor.gender}</p>
            </div>
            <div>
              <h3 className="font-semibold">Location</h3>
              <p>{donor.location}</p>
            </div>
            <div>
              <h3 className="font-semibold">Last Donation Date</h3>
              <p>{donor.lastDonationDate}</p>
            </div>
            <div>
              <h3 className="font-semibold">Donation Count</h3>
              <p>{donor.donationCount}</p>
            </div>
            <div>
              <h3 className="font-semibold">Contact Number</h3>
              <p>{donor.contactNumber}</p>
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p>{donor.email}</p>
            </div>
            <div>
              <h3 className="font-semibold">Medical Conditions</h3>
              <p>{donor.medicalConditions}</p>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <Button asChild>
              <Link href="/donors">Back to List</Link>
            </Button>
            <Button>Contact Donor</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

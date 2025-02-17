import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShareButton } from "@/components/ShareButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DonorProfileProps {
  id: string;
}

// This is a mock function to simulate fetching data
// In a real application, you would fetch this data from your API
const getDonorDetails = (id: string) => {
  return {
    id,
    name: "Jane Smith",
    bloodType: "O+",
    age: 28,
    gender: "Female",
    location: "456 Oak St, Townsville",
    lastDonation: "2023-05-15",
    donationCount: 5,
    email: "jane.smith@example.com",
    phone: "+1987654321",
    imageUrl: "/placeholder-avatar.jpg",
    bio: "I'm a regular blood donor committed to helping save lives. I donate every 3 months and encourage others to do the same!",
  };
};

export function DonorProfile({ id }: DonorProfileProps) {
  const donor = getDonorDetails(id);

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">Donor Profile</CardTitle>
          <ShareButton
            url={`/donors/${id}`}
            title={`Blood Donor: ${donor.name} (${donor.bloodType}) in ${donor.location}`}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={donor.imageUrl} alt={donor.name} />
            <AvatarFallback>{donor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold">{donor.name}</h3>
            <Badge>{donor.bloodType}</Badge>
          </div>
        </div>
        <p>
          <strong>Age:</strong> {donor.age}
        </p>
        <p>
          <strong>Gender:</strong> {donor.gender}
        </p>
        <p>
          <strong>Location:</strong> {donor.location}
        </p>
        <p>
          <strong>Last Donation:</strong> {donor.lastDonation}
        </p>
        <p>
          <strong>Total Donations:</strong> {donor.donationCount}
        </p>
        <p>
          <strong>Email:</strong> {donor.email}
        </p>
        <p>
          <strong>Phone:</strong> {donor.phone}
        </p>
        <p>
          <strong>Bio:</strong> {donor.bio}
        </p>
        <Button className="w-full">Contact Donor</Button>
      </CardContent>
    </Card>
  );
}

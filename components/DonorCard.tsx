import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShareButton } from "@/components/ShareButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface DonorCardProps {
  id: string;
  name: string;
  bloodType: string;
  location: string;
  lastDonation: string;
  donationCount: number;
  imageUrl: string;
}

export function DonorCard({
  id,
  name,
  bloodType,
  location,
  lastDonation,
  donationCount,
  imageUrl,
}: DonorCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={imageUrl} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-semibold">{name}</CardTitle>
            <Badge>{bloodType}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-2">Location: {location}</p>
        <p className="text-sm text-gray-600 mb-2">
          Last Donation: {lastDonation}
        </p>
        <p className="text-sm text-gray-600">
          Total Donations: {donationCount}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild>
          <Link href={`/donors/${id}`}>View Profile</Link>
        </Button>
        <ShareButton
          url={`/donors/${id}`}
          title={`Blood Donor: ${name} (${bloodType}) in ${location}`}
        />
      </CardFooter>
    </Card>
  );
}

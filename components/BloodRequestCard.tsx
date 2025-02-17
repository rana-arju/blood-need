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
import Link from "next/link";

interface BloodRequestCardProps {
  id: string;
  bloodType: string;
  location: string;
  urgency: "Low" | "Medium" | "High";
  postedAt: string;
}

export function BloodRequestCard({
  id,
  bloodType,
  location,
  urgency,
  postedAt,
}: BloodRequestCardProps) {
  const urgencyColor = {
    Low: "bg-green-500",
    Medium: "bg-yellow-500",
    High: "bg-red-500",
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">
            Blood Type: {bloodType}
          </CardTitle>
          <Badge className={urgencyColor[urgency]}>{urgency} Urgency</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-2">Location: {location}</p>
        <p className="text-sm text-gray-600">Posted: {postedAt}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild>
          <Link href={`/blood-requests/${id}`}>View Details</Link>
        </Button>
        <ShareButton
          url={`/blood-requests/${id}`}
          title={`Blood Request: ${bloodType} needed in ${location}`}
        />
      </CardFooter>
    </Card>
  );
}

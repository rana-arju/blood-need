"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import { useSession } from "next-auth/react";

interface BloodDrive {
  id: string;
  title: string;
  date: string;
  location: string;
  organizer: string;
}
const fakeDrives: BloodDrive[] = [
  {
    id: "1",
    title: "City Hospital Blood Drive",
    date: "2023-07-15",
    location: "City Hospital, 123 Main St, Cityville",
    organizer: "City Hospital",
  },
  {
    id: "2",
    title: "Community Center Donation Event",
    date: "2023-07-22",
    location: "Community Center, 456 Oak Ave, Townsburg",
    organizer: "Local Red Cross",
  },
  {
    id: "3",
    title: "University Campus Blood Drive",
    date: "2023-08-05",
    location: "University Student Center, 789 College Rd, Eduville",
    organizer: "University Health Services",
  },
  {
    id: "4",
    title: "Corporate Office Blood Donation",
    date: "2023-08-12",
    location: "TechCorp Offices, 101 Innovation Blvd, Techtown",
    organizer: "TechCorp HR Department",
  },
  {
    id: "5",
    title: "Mobile Blood Drive at Shopping Mall",
    date: "2023-08-19",
    location: "Central Mall Parking Lot, 202 Retail Dr, Shopville",
    organizer: "National Blood Services",
  },
  {
    id: "6",
    title: "Fire Department Blood Drive",
    date: "2023-08-26",
    location: "Central Fire Station, 303 Emergency Rd, Safetown",
    organizer: "Safetown Fire Department",
  },
];
export default function UpcomingDrives() {
  
  const { data: session } = useSession();
  /*
  const [drives, setDrives] = useState<BloodDrive[]>([]);
console.log(session);

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    try {
      const response = await fetch("/api/blood-drives");
      if (!response.ok) {
        throw new Error("Failed to fetch blood drives");
      }
      const data = await response.json();
      setDrives(data);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to fetch blood drives. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!session || session.user.role !== "admin") {
      toast({
        title: "Error",
        description: "You are not authorized to delete blood drives.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`/api/blood-drives/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete blood drive");
      }
      toast({
        title: "Success",
        description: "Blood drive deleted successfully.",
      });
      fetchDrives(); // Refresh the list
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to delete blood drive. Please try again.",
        variant: "destructive",
      });
    }
  };
*/
  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Upcoming Blood Drives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fakeDrives.map((drive) => (
            <Card
              key={drive.id}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle>{drive.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{new Date(drive.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{drive.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Organized by {drive.organizer}</span>
                  </div>
                </div>
                <Button className="w-full mb-2">Register to Donate</Button>
                {session && session.user.role === "admin" && (
                  <Button
                    variant="destructive"
                    className="w-full"
                   // onClick={() => handleDelete(drive.id)}
                  >
                    Delete Drive
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

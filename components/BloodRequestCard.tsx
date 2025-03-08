import type React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { MapPin, Calendar, Droplet } from "lucide-react";
import Image from "next/image";
import moment from "moment";

interface BloodRequestCardProps {
  id: string;
  user: {
    image: string;
    name: string;
  };
  patientName: string;
  blood: string;
  hospitalName: string;
  requiredDate: string;
}

const BloodRequestCard: React.FC<BloodRequestCardProps> = ({
  id,
  user,
  patientName,
  blood,
  hospitalName,
  requiredDate,
}) => {
  

  return (
    <Link href={`/requests/${id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-32 bg-gradient-to-r from-red-500 to-red-600">
            <p className="text-white flex justify-center items-center pt-10">
              আমার ব্লাড/রক্ত প্রয়োজন!
            </p>
            <div className="absolute -bottom-6 left-4">
              {user?.image ? (
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white relative">
                  <Image
                    src={user.image}
                    alt={user.name[0]}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <Avatar className="w-20 h-20 border-4 border-white">
                  <AvatarFallback>
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
          <div className="pt-8 px-4 pb-4">
            <h3 className="font-semibold text-lg">{patientName}</h3>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-muted-foreground flex items-center">
                <Droplet className="w-4 h-4 mr-2" />
                Blood Group: {blood}
              </p>
              <p className="text-sm text-muted-foreground flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {hospitalName}
              </p>
              <p className="text-sm text-muted-foreground flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {moment(requiredDate).format("MMM Do YY")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BloodRequestCard;

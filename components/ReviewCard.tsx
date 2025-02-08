import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ReviewCardProps {
  name: string;
  image: string;
  content: string;
  date: string;
}

export function ReviewCard({ name, image, content, date }: ReviewCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="p-6 flex-grow flex flex-col">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-gray-500">{date}</p>
          </div>
        </div>
        <p className="text-gray-700 flex-grow">{content}</p>
      </CardContent>
    </Card>
  );
}

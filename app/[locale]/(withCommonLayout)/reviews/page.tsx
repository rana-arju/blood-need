"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface Review {
  id: string;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ReviewsPage() {
  const t = useTranslations("Reviews");
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Fetch all reviews from your API here
    const fetchReviews = async () => {
      // Replace this with your actual API call
      const mockReviews: Review[] = [
        {
          id: "1",
          userName: "John Doe",
          userImage: "/placeholder.svg?height=40&width=40",
          rating: 5,
          comment:
            "Great experience donating blood. The staff was very friendly and professional.",
          date: "2024-03-01",
        },
        {
          id: "2",
          userName: "Jane Smith",
          userImage: "/placeholder.svg?height=40&width=40",
          rating: 4,
          comment:
            "Easy to use platform. Found a donor quickly when I needed blood for my surgery.",
          date: "2024-02-28",
        },
        {
          id: "3",
          userName: "Mike Johnson",
          userImage: "/placeholder.svg?height=40&width=40",
          rating: 5,
          comment:
            "This platform is saving lives. I'm proud to be a regular donor.",
          date: "2024-02-27",
        },
        // Add more mock reviews as needed
      ];
      setReviews(mockReviews);
    };

    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container px-4 md:px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">{t("title")}</h1>
        <p className="text-xl text-muted-foreground mb-12 text-center">
          {t("subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage
                        src={review.userImage}
                        alt={review.userName}
                      />
                      <AvatarFallback>{review.userName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{review.userName}</h3>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-2">{review.comment}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { getAllReviews } from "@/services/review";
import { Review } from "@/types/reviews";
import moment from "moment";



export default function ReviewsPage() {
  const t = useTranslations("Reviews");
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Fetch all reviews from your API here
    const fetchReviews = async () => {
      const res = await getAllReviews();
      const reviews = res?.data;

      setReviews(reviews);
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
        {
          reviews?.length > 0 ?  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews?.map((review: any, index: number) => (
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
                        src={review.user.image}
                        alt={review.user.name}
                      />
                      <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{review.user.name}</h3>
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
                    {moment(review.createdAt).format("LLL")}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div> : <div>
          <p className="text-gray-500 capitalize text-center text-lg sm:text-xl">There are no review!</p>
        </div>
        }

       
      </div>
    </div>
  );
}

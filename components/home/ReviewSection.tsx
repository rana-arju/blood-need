"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Plus } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import AddReviewModal from "./AddReviewModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
}

export default function ReviewsSection() {
  const t = useTranslations("Home.reviews");
  const { theme } = useTheme();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    // Fetch reviews from your API here
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
        },
        {
          id: "2",
          userName: "Jane Smith",
          userImage: "/placeholder.svg?height=40&width=40",
          rating: 4,
          comment:
            "Easy to use platform. Found a donor quickly when I needed blood for my surgery.",
        },
        {
          id: "3",
          userName: "Mike Johnson",
          userImage: "/placeholder.svg?height=40&width=40",
          rating: 5,
          comment:
            "This platform is saving lives. I'm proud to be a regular donor.",
        },
        {
          id: "4",
          userName: "Emily Brown",
          userImage: "/placeholder.svg?height=40&width=40",
          rating: 5,
          comment:
            "The process was smooth and the staff made me feel comfortable throughout.",
        },
        {
          id: "5",
          userName: "David Lee",
          userImage: "/placeholder.svg?height=40&width=40",
          rating: 4,
          comment:
            "Great initiative! The mobile app makes it easy to schedule donations.",
        },
      ];
      setReviews(mockReviews);
    };

    fetchReviews();
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2x sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{t("title")}</h2>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="w-full mx-auto mb-10 h-[300px]">
          <Swiper
            //effect="cards"
            direction={"vertical"}
            slidesPerView={1}
            spaceBetween={30}
            mousewheel={true}
            pagination={{
              clickable: true,
            }}
            //grabCursor={true}
            modules={[Mousewheel, EffectCards]}
            className="w-full h-full"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <Card
                  className={cn(
                    "h-full max-w-4xl mx-auto",
                    "transition-all duration-300",
                    theme === "dark" ? "bg-card" : "bg-white"
                  )}
                >
                  <CardContent className="p-6 h-full flex flex-col">
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
                    <p className="text-muted-foreground flex-grow">
                      {review.comment}
                    </p>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex justify-center space-x-4">
          <Button onClick={() => setIsReviewModalOpen(true)}>
            <Plus className=" h-4 w-4" />
            {t("addReview")}
          </Button>
          <Button variant="outline" asChild>
            <Link href="/reviews">{t("viewAll")}</Link>
          </Button>
        </div>
      </div>

      <AddReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </section>
  );
}

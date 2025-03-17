"use client";

import { useState, useEffect, useRef } from "react";
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
import { useSession } from "next-auth/react";
import { getAllReviews } from "@/services/review";
import { Review } from "@/types/reviews";

export default function ReviewsSection() {
  const t = useTranslations("Home.reviews");
  const { theme } = useTheme();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    // Fetch reviews from your API here
    const fetchReviews = async () => {
      const res = await getAllReviews();
      const reviews = res?.data;
      setReviews(reviews);
    };

    fetchReviews();
  }, []);
  const sectionRef = useRef<HTMLElement | null>(null);

  const handleScroll = (direction: "next" | "prev") => {
    if (!sectionRef.current) return;
    const sections = document.querySelectorAll("section"); // Get all sections
    const index = Array.from(sections).indexOf(sectionRef.current);

    if (direction === "next" && index < sections.length - 1) {
      sections[index + 1].scrollIntoView({ behavior: "smooth" });
    }
    if (direction === "prev" && index > 0) {
      sections[index - 1].scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className="py-16 bg-background" ref={sectionRef}>
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
            {t("title")}
          </h2>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="w-full mx-auto mb-10 h-[300px]">
          <Swiper
            //effect="cards"
            direction={"vertical"}
            slidesPerView={1}
            spaceBetween={30}
            mousewheel={true}
            onReachEnd={() => handleScroll("next")}
            onReachBeginning={() => handleScroll("prev")}
            pagination={{
              clickable: true,
            }}
            //grabCursor={true}
            modules={[Mousewheel, EffectCards]}
            className="w-full h-full"
          >
            {reviews?.slice(0, 6).map((review) => (
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
                          src={review.user?.image}
                          alt={review?.user?.name}
                        />
                        <AvatarFallback>{review.user?.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{review?.user?.name}</h3>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review?.rating
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
          {session?.user ? (
            <Button onClick={() => setIsReviewModalOpen(true)}>
              <Plus className=" h-4 w-4" />
              {t("addReview")}
            </Button>
          ) : (
            ""
          )}

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

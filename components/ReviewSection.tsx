"use client";

import { useState } from "react";
import { ReviewCard } from "./ReviewCard";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import AddReviewModal from "./home/AddReviewModal";

// Fake data for reviews
const allReviews = [
  {
    id: 1,
    name: "John Doe",
    image: "https://source.unsplash.com/random/100x100?face=1",
    content:
      "Donating blood was a smooth and rewarding experience. The staff was friendly and professional.",
    date: "2023-05-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "https://source.unsplash.com/random/100x100?face=2",
    content:
      "I'm grateful for the blood donors who saved my life. This community is amazing!",
    date: "2023-05-20",
  },
  {
    id: 3,
    name: "Mike Johnson",
    image: "https://source.unsplash.com/random/100x100?face=3",
    content:
      "The donation process was quick and easy. I'll definitely be back to donate again.",
    date: "2023-05-25",
  },
  {
    id: 4,
    name: "Emily Brown",
    image: "https://source.unsplash.com/random/100x100?face=4",
    content:
      "As a regular donor, I can say that this blood bank is one of the best I've visited.",
    date: "2023-05-30",
  },
  {
    id: 5,
    name: "David Wilson",
    image: "https://source.unsplash.com/random/100x100?face=5",
    content:
      "The staff made me feel comfortable during my first donation. Thank you for the great experience!",
    date: "2023-06-04",
  },
  {
    id: 6,
    name: "Sarah Lee",
    image: "https://source.unsplash.com/random/100x100?face=6",
    content:
      "I received blood during an emergency surgery. I'm forever grateful to the donors who saved my life.",
    date: "2023-06-09",
  },
  {
    id: 7,
    name: "Tom Harris",
    image: "https://source.unsplash.com/random/100x100?face=7",
    content:
      "The mobile blood drive at my workplace was convenient and well-organized.",
    date: "2023-06-14",
  },
  {
    id: 8,
    name: "Lisa Chen",
    image: "https://source.unsplash.com/random/100x100?face=8",
    content:
      "I appreciate how the staff always explains the donation process and answers all my questions.",
    date: "2023-06-19",
  },
  {
    id: 9,
    name: "Robert Taylor",
    image: "https://source.unsplash.com/random/100x100?face=9",
    content:
      "Donating platelets takes longer, but knowing it helps cancer patients makes it worth every minute.",
    date: "2023-06-24",
  },
  {
    id: 10,
    name: "Amanda Garcia",
    image: "https://source.unsplash.com/random/100x100?face=10",
    content:
      "The post-donation snacks are great! It's a small thing, but it shows they care about donors' well-being.",
    date: "2023-06-29",
  },
];

export function ReviewSection() {
  const [visibleReviews, setVisibleReviews] = useState(6);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const t = useTranslations("Home.latestRequests");

  const loadMore = () => {
    setVisibleReviews((prev) => Math.min(prev + 3, allReviews.length));
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">
          What Our Community Says
        </h2>
        <div className="mb-10">
          <Button
            onClick={() => setIsReviewModalOpen(true)}
            size="lg"
            variant="outline"
          >
            <Star className="mr-2 h-4 w-4 text-yellow-400" />
            {t("addReviewButton")}
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allReviews?.slice(0, visibleReviews).map((review) => (
            <div key={review.id} className="h-full">
              <ReviewCard
                name={review.name}
                image={review.image}
                content={review.content}
                date={review.date}
              />
            </div>
          ))}
        </div>
        {visibleReviews < allReviews.length && (
          <div className="text-center mt-8">
            <Button onClick={loadMore}>Load More</Button>
          </div>
        )}
      </div>

      <AddReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </section>
  );
}

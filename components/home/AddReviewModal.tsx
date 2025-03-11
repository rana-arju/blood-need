"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  review: z
    .string()
    .min(10, "Review must be at least 10 characters long")
    .max(500, "Review must not exceed 500 characters"),
});

export default function AddReviewModal({
  isOpen,
  onClose,
}: AddReviewModalProps) {
  const t = useTranslations("Home.addReview");
  const [hoveredStar, setHoveredStar] = useState(0);

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      review: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof reviewSchema>) => {
    try {
      // Here you would typically send the review data to your backend
      console.log("Submitting review:", values);
      toast.success(t("successMessage"));
      form.reset();
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error(t("errorMessage"));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("ratingLabel")}</FormLabel>
                  <FormControl>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-6 w-6 cursor-pointer ${
                            star <= (hoveredStar || field.value)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                          onMouseEnter={() => setHoveredStar(star)}
                          onMouseLeave={() => setHoveredStar(0)}
                          onClick={() => field.onChange(star)}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("reviewLabel")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("reviewPlaceholder")}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">{t("submitButton")}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

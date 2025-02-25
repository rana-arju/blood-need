"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const mockReviews = [
  {
    id: 1,
    user: "George Brown",
    rating: 5,
    comment: "Great experience donating blood!",
    date: "2023-06-10",
  },
  {
    id: 2,
    user: "Hannah Lee",
    rating: 4,
    comment: "Friendly staff, but long wait times.",
    date: "2023-06-08",
  },
  // Add more mock reviews as needed
];

export function ReviewsList() {
  const [reviews, setReviews] = useState(mockReviews);
  const [editingReview, setEditingReview] = useState(null);

  const handleDelete = (id: string| number) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  const handleEdit = (review: any) => {
    setEditingReview(review);
  };

  const handleUpdate = (updatedReview: any) => {
    setReviews(
      reviews.map((review) =>
        review.id === updatedReview.id ? updatedReview : review
      )
    );
    setEditingReview(null);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Reviews List</h2>
      <Input placeholder="Search reviews..." className="max-w-sm" />
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>{review.user}</TableCell>
                <TableCell>{review.rating}</TableCell>
                <TableCell>{review.comment}</TableCell>
                <TableCell>{review.date}</TableCell>
                <TableCell>
                  <div className="space-x-2">
                    <Button size="sm" onClick={() => handleEdit(review)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(review.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <EditReviewDialog
        review={editingReview}
        onUpdate={handleUpdate}
        onClose={() => setEditingReview(null)}
      />
    </div>
  );
}

function EditReviewDialog({
  review,
  onUpdate,
  onClose,
}: {
  review: any;
  onUpdate: any;
  onClose: any;
}) {
  const [user, setUser] = useState(review?.user || "");
  const [rating, setRating] = useState(review?.rating || 0);
  const [comment, setComment] = useState(review?.comment || "");
  const [date, setDate] = useState(review?.date || "");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onUpdate({ ...review, user, rating, comment, date });
  };

  return (
    <Dialog open={!!review} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Review</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="user">User</Label>
            <Input
              id="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="rating">Rating</Label>
            <Input
              id="rating"
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <Button type="submit">Update Review</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

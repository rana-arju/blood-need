"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SkeletonCard } from "@/components/SkeletonCard";
import BloodDropLoader from "../BloodDropLoader";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function BlogList() {
  // Simulated loading state
  const isLoading = false;

  if (isLoading) {
    return <BloodDropLoader />
  }

  const posts = [
    {
      id: 1,
      title: "The Importance of Regular Blood Donation",
      excerpt:
        "Learn why regular blood donation is crucial for maintaining a healthy blood supply...",
      image:
        "https://zahrah.creedcreatives.net/donors/wp-content/uploads/sites/31/2025/02/cheerful-young-female-person-visiting-her-doctor-2023-11-27-05-36-14-utc.jpg",
      date: "2024-02-15",
      category: "Health",
      slug: "importance-of-blood-donation",
    },
    // Add more posts
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {posts.map((post) => (
        <motion.div key={post.id} variants={item}>
          <Link href={`/blog/${post.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-primary">
                      {post.category}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {post.date}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
                <Button variant="link" className="mt-4 p-0">
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

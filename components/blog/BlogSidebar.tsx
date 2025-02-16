"use client";

import { Badge } from "@/components/ui/badge";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const recentPosts = [
  {
    title: "The Importance of Iron in Blood Donation",
    slug: "importance-of-iron",
  },
  { title: "How Often Can You Donate Blood?", slug: "donation-frequency" },
  {
    title: "Preparing for Your First Blood Donation",
    slug: "first-time-donor-prep",
  },
];

const tags = [
  "Blood Types",
  "Donation Tips",
  "Health",
  "Community",
  "Plasma",
  "Platelets",
];

export function BlogSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>About the Author</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Dr. Jane Smith" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Dr. Jane Smith</h3>
            <p className="text-sm text-muted-foreground">
              Hematologist & Blood Donation Advocate
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recentPosts.map((post, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm hover:text-primary"
                >
                  {post.title}
                </Link>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <Badge
                    variant="secondary"
                    className="hover:bg-primary hover:text-primary-foreground cursor-pointer"
                  >
                    {tag}
                  </Badge>
                </Link>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
